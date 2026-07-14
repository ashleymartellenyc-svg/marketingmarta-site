"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export interface Testimonial {
  name: string;
  company: string;
  stars: number;
  quote: string;
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} fill="#B33A2C" className="text-cherry" />
      ))}
    </div>
  );
}

function TestCard({ t, isCenter }: { t: Testimonial; isCenter: boolean }) {
  return (
    <div
      className={`rounded-sm p-5 md:p-6 flex flex-col w-full transition-colors duration-300 ${
        isCenter ? "bg-cream border border-cherry/20 shadow-sm" : "bg-brown/5"
      }`}
    >
      <StarRating count={t.stars} />
      <p
        className={`font-sans leading-relaxed mb-4 transition-all duration-300 ${
          isCenter ? "text-sm text-ink" : "text-xs text-brown/50"
        }`}
      >
        "{t.quote}"
      </p>
      <div className="mt-auto">
        <p
          className={`font-sans font-semibold text-xs transition-colors duration-300 ${
            isCenter ? "text-ink" : "text-brown/40"
          }`}
        >
          {t.name}
        </p>
        <p
          className={`font-sans text-xs transition-colors duration-300 ${
            isCenter ? "text-brown" : "text-brown/30"
          }`}
        >
          {t.company}
        </p>
      </div>
    </div>
  );
}

const SNAP_COOLDOWN = 450;

export default function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [center, setCenter] = useState(0);
  const lastSnapRef = useRef<number>(0);
  const n = testimonials.length;
  const mod = (x: number) => ((x % n) + n) % n;

  const getOffset = (i: number): number => {
    const fwd = (i - center + n) % n;
    const bwd = (center - i + n) % n;
    const raw = fwd <= bwd ? fwd : -bwd;
    return Math.max(-2, Math.min(2, raw));
  };

  const getX = (offset: number) => offset * 310;
  const getScale = (offset: number) =>
    offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.72 : 0.52;
  const getOpacity = (offset: number) =>
    offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.5 : 0.22;
  const getZ = (offset: number) => 10 - Math.abs(offset) * 2;

  return (
    <div>
      {/* Desktop — 3D perspective carousel */}
      <div
        className="hidden md:block relative overflow-hidden"
        style={{ perspective: "1200px", height: 680 }}
      >
        {testimonials.map((t, i) => {
          const offset = getOffset(i);
          const isCenter = offset === 0;
          const isAdj = Math.abs(offset) === 1;
          return (
            <motion.div
              key={i}
              className="absolute top-0"
              style={{
                left: "50%",
                width: 290,
                marginLeft: -145,
                pointerEvents: isAdj ? "auto" : "none",
                cursor: isAdj ? "pointer" : "default",
              }}
              animate={{
                x: getX(offset),
                scale: getScale(offset),
                opacity: getOpacity(offset),
                rotateY: offset * -4,
                zIndex: getZ(offset),
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => {
                if (isAdj) {
                  const now = Date.now();
                  if (now - lastSnapRef.current >= SNAP_COOLDOWN) {
                    lastSnapRef.current = now;
                    setCenter(i);
                  }
                }
              }}
            >
              <TestCard t={t} isCenter={isCenter} />
            </motion.div>
          );
        })}
      </div>

      {/* Mobile — single card + buttons */}
      <div className="md:hidden">
        <motion.div
          key={center}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <TestCard t={testimonials[center]} isCenter />
        </motion.div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setCenter(mod(center - 1))}
            className="flex-1 py-2 text-sm font-medium text-brown border border-brown/20 rounded"
          >
            ← Prev
          </button>
          <button
            onClick={() => setCenter(mod(center + 1))}
            className="flex-1 py-2 text-sm font-medium text-brown border border-brown/20 rounded"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === center ? "w-6 bg-cherry" : "w-2 bg-brown/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
