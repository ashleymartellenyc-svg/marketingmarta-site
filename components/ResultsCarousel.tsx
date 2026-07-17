"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Repeat2, Target, BarChart3, FileSpreadsheet, type LucideIcon } from "lucide-react";

export interface Result {
  Icon: LucideIcon;
  text: string;
}

function ResultCard({ result, isCenter }: { result: Result; isCenter: boolean }) {
  const { Icon, text } = result;
  return (
    <div
      className={`rounded-sm p-5 md:p-6 flex gap-4 items-start w-full transition-colors duration-300 ${
        isCenter ? "bg-cream border border-cherry/20 shadow-sm" : "bg-brown/5"
      }`}
    >
      <Icon
        size={18}
        className={`shrink-0 mt-0.5 transition-colors duration-300 ${
          isCenter ? "text-cherry" : "text-brown/40"
        }`}
      />
      <p
        className={`font-sans leading-relaxed transition-all duration-300 ${
          isCenter ? "text-sm text-ink font-medium" : "text-xs text-brown/50"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

const SNAP_COOLDOWN = 450;

export default function ResultsCarousel({ results }: { results: Result[] }) {
  const [center, setCenter] = useState(0);
  const lastSnapRef = useRef<number>(0);
  const n = results.length;
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
  const getRotateY = (offset: number) => offset * -5;
  const getZ = (offset: number) => 10 - Math.abs(offset) * 2;

  return (
    <div>
      {/* Desktop — 3D perspective carousel */}
      <div className="hidden md:block relative overflow-x-hidden" style={{ perspective: "1200px", minHeight: 240 }}>
        {results.map((result, i) => {
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
                rotateY: getRotateY(offset),
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
              <ResultCard result={result} isCenter={isCenter} />
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
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <ResultCard result={results[center]} isCenter />
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
        {results.map((_, i) => (
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
