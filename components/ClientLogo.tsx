"use client";

import Image from "next/image";

interface ClientLogoProps {
  src: string;
  alt: string;
  hazeColor: string;
  width?: number;
  height?: number;
  maxHeight?: string;
  imgClassName?: string;
  onError?: () => void;
}

export default function ClientLogo({
  src,
  alt,
  hazeColor,
  width = 180,
  height = 60,
  maxHeight = "56px",
  imgClassName = "",
  onError,
}: ClientLogoProps) {
  return (
    <div className="relative inline-flex items-center justify-center" style={{ padding: "20px 24px" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-20px",
          background: `radial-gradient(ellipse at center, ${hazeColor} 0%, transparent 65%)`,
          filter: "blur(25px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div className="relative" style={{ zIndex: 1 }}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`object-contain ${imgClassName}`}
          style={{ maxHeight }}
          onError={onError}
        />
      </div>
    </div>
  );
}
