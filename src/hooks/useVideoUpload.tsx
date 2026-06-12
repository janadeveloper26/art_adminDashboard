import { useState, useRef } from "react";

export type UploadStatus = "idle" | "uploading" | "saving" | "done" | "error";

interface UploadState {
  progress: number;
  status: UploadStatus;
  error?: string;
  lesson?: Record<string, unknown>;
}

interface UploadOptions {
  sectionId: string;
  title: string;
  order?: number;
  isPreview?: boolean;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://192.168.29.72:8000/api/v1";

export function useVideoUpload() {
  const [state, setState] = useState<UploadState>({
    progress: 0,
    status: "idle",
  });
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  function cancel() {
    xhrRef.current?.abort();
    setState({ progress: 0, status: "idle" });
  }

  async function upload(file: File, opts: UploadOptions) {
    setState({ progress: 0, status: "uploading" });

    try {
      const token = localStorage.getItem("access_token");
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      // Step 1 — get presigned URL from Django
      const presignRes = await fetch(
        `${API_BASE}/courses/presigned-url?` +
          new URLSearchParams({ filename: file.name, content_type: file.type }),
        { headers },
      );
      if (!presignRes.ok) throw new Error("Could not get upload URL");
      const {
        data: { upload_url, s3_key },
      } = await presignRes.json();

      // Step 2 — upload directly to S3 (progress tracked via XHR)
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhrRef.current = xhr;
        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable)
            setState((s) => ({
              ...s,
              progress: Math.round((e.loaded / e.total) * 100),
            }));
        });
        xhr.addEventListener("load", () =>
          xhr.status < 300
            ? resolve()
            : reject(new Error(`S3 error ${xhr.status}`)),
        );
        xhr.addEventListener("error", () =>
          reject(new Error("Network error during upload")),
        );
        xhr.addEventListener("abort", () =>
          reject(new Error("Upload cancelled")),
        );
        xhr.open("PUT", upload_url);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });

      // Step 3 — save lesson metadata to Django
      setState((s) => ({ ...s, status: "saving" }));
      const saveRes = await fetch(`${API_BASE}/courses/lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({
          section_id: opts.sectionId,
          title: opts.title,
          s3_key,
          file_size: file.size,
          order: opts.order ?? 0,
          is_preview: opts.isPreview ?? false,
        }),
      });
      if (!saveRes.ok) throw new Error("Failed to save lesson");
      const { data: lesson } = await saveRes.json();

      setState({ progress: 100, status: "done", lesson });
      return lesson;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setState({ progress: 0, status: "error", error: message });
    }
  }

  return { ...state, upload, cancel };
}
