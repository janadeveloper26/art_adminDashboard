"use client";

import React from "react";
import { UploadProvider } from "../contexts/UploadContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UploadProvider>
      {children}
    </UploadProvider>
  );
}
