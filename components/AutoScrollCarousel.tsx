"use client";

import { useRef, useEffect, useCallback } from "react";

export type CarouselItem = { type: "static" | "video"; src: string };

interface AutoScrollCarouselProps {
  items: CarouselItem[];
}

export default function AutoScrollCarousel({ items }: AutoScrollCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const translateRef = useRef(0);
  const speedRef = useRef(1.0);
  const targetSpeedRef = useRef(1.0);
  const halfWidthRef = useRef(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        halfWidthRef.current = trackRef.current.scrollWidth / 2;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items]);

  useEffect(() => {
    if (items.length === 0) return;
    let lastTime = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const dt = Math.min(now - lastTime, 50) / 1000;
      lastTime = now;

      if (halfWidthRef.current > 0) {
        speedRef.current += (targetSpeedRef.current - speedRef.current) * Math.min(dt * 5, 1);
        const pxPerSec = (halfWidthRef.current / 60) * speedRef.current;
        translateRef.current -= pxPerSec * dt;

        if (translateRef.current < -halfWidthRef.current) {
          translateRef.current += halfWidthRef.current;
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${translateRef.current}px)`;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [items]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;

    if (x < 0.2) {
      const t = x / 0.2;
      targetSpeedRef.current = 0.7 + 0.3 * t;
    } else if (x > 0.8) {
      const t = (x - 0.8) / 0.2;
      targetSpeedRef.current = 1.0 + 0.5 * t;
    } else {
      targetSpeedRef.current = 1.0;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetSpeedRef.current = 1.0;
  }, []);

  if (items.length === 0) return null;

  const doubled = [...items, ...items];

  return (
    <>
      <style>{`
        .carousel-card-video {
          width: 180px;
          aspect-ratio: 9 / 16;
        }
        .carousel-card-static {
          width: 180px;
          aspect-ratio: 4 / 5;
        }
        @media (min-width: 768px) {
          .carousel-card-video { width: 260px; }
          .carousel-card-static { width: 260px; }
        }
      `}</style>

      <div
        className="relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10"
          style={{ width: 80, background: "linear-gradient(to right, #FAF6F0, transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10"
          style={{ width: 80, background: "linear-gradient(to left, #FAF6F0, transparent)" }}
        />

        <div
          ref={trackRef}
          className="flex gap-3 items-center"
          style={{ width: "max-content", willChange: "transform" }}
        >
          {doubled.map((item, index) => (
            <CarouselCard key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

function CarouselCard({ item }: { item: CarouselItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [item.type]);

  const handleMouseEnter = () => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {
        if (videoRef.current) videoRef.current.muted = true;
      });
    }
  };

  const handleMouseLeave = () => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  const cardClass = item.type === "video" ? "carousel-card-video" : "carousel-card-static";

  return (
    <div
      className={`${cardClass} relative shrink-0 overflow-hidden`}
      style={{
        borderRadius: 8,
        border: "1px solid rgba(139,111,71,0.15)",
        background: "rgba(139,111,71,0.08)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.type === "video" ? (
        <video
          ref={videoRef}
          src={item.src}
          muted
          playsInline
          loop
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      )}
    </div>
  );
}
