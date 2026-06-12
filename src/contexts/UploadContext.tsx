"use client";

import React, { createContext, useContext, useRef, useState } from "react";

export type UploadStatus = "idle" | "uploading" | "saving" | "done" | "error";

export interface UploadState {
  id: string;
  progress: number;
  status: UploadStatus;
  error?: string;
  lesson?: Record<string, unknown>;
  fileName?: string;
}

export interface UploadOptions {
  sectionId: string;
  title: string;
  order?: number;
  isPreview?: boolean;
}

export type UploadsState = Record<string, UploadState>;

export interface UploadContextType {
  uploads: UploadsState;
  upload: (file: File, opts: UploadOptions) => Promise<any>;
  cancel: (id: string) => void;
  clear: (id: string) => void;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://192.168.29.72:8000/api/v1";

function createUploadId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function UploadProvider({ children }: { children: React.ReactNode }) {
  const [uploads, setUploads] = useState<UploadsState>({});
  const xhrRefs = useRef<Record<string, XMLHttpRequest>>({});
  const clearTimeoutRefs = useRef<
    Record<string, ReturnType<typeof setTimeout>>
  >({});

  function patchUpload(id: string, patch: Partial<UploadState>) {
    setUploads((current) => {
      const existing = current[id];
      if (!existing) return current;

      return {
        ...current,
        [id]: { ...existing, ...patch },
      };
    });
  }

  function clear(id: string) {
    const timeout = clearTimeoutRefs.current[id];
    if (timeout) {
      clearTimeout(timeout);
      delete clearTimeoutRefs.current[id];
    }

    delete xhrRefs.current[id];
    setUploads((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  function cancel(id: string) {
    xhrRefs.current[id]?.abort();
    clear(id);
  }

  async function upload(file: File, opts: UploadOptions) {
    const id = createUploadId();

    setUploads((current) => ({
      ...current,
      [id]: {
        id,
        progress: 0,
        status: "uploading",
        fileName: file.name,
      },
    }));

    try {
      const token = localStorage.getItem("access_token");
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const presignRes = await fetch(
        `${API_BASE}/courses/presigned-url?` +
          new URLSearchParams({ filename: file.name, content_type: file.type }),
        { headers },
      );
      if (!presignRes.ok) throw new Error("Could not get upload URL");
      const {
        data: { upload_url, s3_key },
      } = await presignRes.json();

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhrRefs.current[id] = xhr;
        xhr.upload.addEventListener("progress", (event) => {
          if (!event.lengthComputable) return;

          patchUpload(id, {
            progress: Math.round((event.loaded / event.total) * 100),
          });
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
      delete xhrRefs.current[id];

      patchUpload(id, { status: "saving" });
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

      patchUpload(id, { progress: 100, status: "done", lesson });

      clearTimeoutRefs.current[id] = setTimeout(() => {
        clear(id);
      }, 3000);

      return lesson;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Upload failed";
      delete xhrRefs.current[id];
      patchUpload(id, { progress: 0, status: "error", error: message });
    }
  }

  return (
    <UploadContext.Provider value={{ uploads, upload, cancel, clear }}>
      {children}
    </UploadContext.Provider>
  );
}

export function useUploadContext() {
  const context = useContext(UploadContext);
  if (context === undefined) {
    throw new Error("useUploadContext must be used within an UploadProvider");
  }
  return context;
}
