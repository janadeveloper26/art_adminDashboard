"use client";

import React from "react";
import { useUploadContext, UploadState } from "../contexts/UploadContext";
import { Video, Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui";

function UploadCard({
  upload,
  onCancel,
  onClear,
}: {
  upload: UploadState;
  onCancel: (id: string) => void;
  onClear: (id: string) => void;
}) {
  const { id, status, progress, fileName, error } = upload;
  const canDismiss = status === "error" || status === "done";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 32, scale: 0.96 }}
      className="w-80 bg-card border border-border shadow-2xl rounded-2xl p-4 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          {status === "uploading" && (
            <Video size={18} className="text-primary shrink-0" />
          )}
          {status === "saving" && (
            <Loader2 size={18} className="text-primary animate-spin shrink-0" />
          )}
          {status === "done" && (
            <CheckCircle2 size={18} className="text-green-500 shrink-0" />
          )}
          {status === "error" && (
            <AlertCircle size={18} className="text-destructive shrink-0" />
          )}
          <span className="font-semibold text-sm truncate">
            {fileName || "Video Upload"}
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground shrink-0"
          onClick={() => (canDismiss ? onClear(id) : onCancel(id))}
        >
          <X size={14} />
        </Button>
      </div>

      {status === "uploading" && (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Uploading to S3...</span>
            <span className="font-bold text-primary">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.2 }}
            />
          </div>
        </div>
      )}

      {status === "saving" && (
        <div className="text-xs text-muted-foreground">
          Saving metadata to server...
        </div>
      )}

      {status === "done" && (
        <div className="text-xs text-green-500 font-medium">
          Upload completed successfully!
        </div>
      )}

      {status === "error" && (
        <div className="text-xs text-destructive font-medium line-clamp-2">
          {error || "An error occurred during upload."}
        </div>
      )}
    </motion.div>
  );
}

export function GlobalUploadProgress() {
  const { uploads, cancel, clear } = useUploadContext();
  const uploadList = Object.values(uploads);

  if (uploadList.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-3">
      <AnimatePresence initial={false}>
        {uploadList.map((upload) => (
          <UploadCard
            key={upload.id}
            upload={upload}
            onCancel={cancel}
            onClear={clear}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
