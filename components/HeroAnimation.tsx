"use client";

export default function HeroAnimation() {
  return (
    <video
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
