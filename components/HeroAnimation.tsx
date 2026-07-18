"use client";

import { useEffect, useRef } from "react";

export default function HeroAnimation() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    ref.current?.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      src="/videos/hero-animation.mp4"
      autoPlay
      muted
      playsInline
      loop
      style={{
        display: "block",
        width: "100%",
        height: "auto",
      }}
    />
  );
}
