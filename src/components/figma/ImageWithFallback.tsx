/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const defaultFallback = "https://via.placeholder.com/400x225?text=No+Image";

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = defaultFallback,
  ...props
}: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = React.useState<string | undefined>(
    typeof src === "string" ? src : undefined,
  );

  React.useEffect(() => {
    if (typeof src === "string") {
      setCurrentSrc(src);
    }
  }, [src]);

  return (
    <img
      src={currentSrc ?? fallbackSrc}
      alt={alt}
      onError={() => setCurrentSrc(fallbackSrc)}
      {...props}
    />
  );
}
