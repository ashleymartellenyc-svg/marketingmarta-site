"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";

const BARS = [
  { label: "Jan", max: 40 },
  { label: "Mar", max: 62 },
  { label: "May", max: 55 },
  { label: "Jul", max: 78 },
  { label: "Sep", max: 91 },
  { label: "Nov", max: 100 },
];

function useCountUp(target: number, duration: number, running: boolean) {
  const [val, setVal] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!running) { setVal(0); startRef.current = null; return; }
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const p = Math.min((now - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running, target, duration]);

  return val;
}

function BarChart({ progress }: { progress: number }) {
  return (
    <div className="flex items-end gap-[5px] h-[72px] mt-1">
      {BARS.map((b, i) => {
        const delay = i / BARS.length;
        const localP = Math.max(0, Math.min(1, (progress - delay * 0.5) / 0.7));
        const height = Math.round(localP * b.max);
        return (
          <div key={b.label} className="flex flex-col items-center gap-[3px] flex-1">
            <div
              style={{
                height: `${height}%`,
                maxHeight: "60px",
                minHeight: localP > 0 ? 3 : 0,
                background: i === BARS.length - 1
                  ? "#B33A2C"
                  : `rgba(179,58,44,${0.3 + i * 0.12})`,
                borderRadius: "2px 2px 0 0",
                transition: "height 0.05s linear",
                width: "100%",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function HeroPhone3D() {
  const [phase, setPhase] = useState(0); // 0–1 within each loop cycle
  const startRef = useRef<number | null>(null);
  const CYCLE = 3200; // ms per loop

  useAnimationFrame((t) => {
    if (startRef.current === null) startRef.current = t;
    const elapsed = (t - startRef.current) % CYCLE;
    setPhase(elapsed / CYCLE);
  });

  const revenue = useCountUp(250000, CYCLE * 0.75, phase < 0.75);
  const arrowProgress = Math.min(1, phase / 0.65);

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 6, rotateX: -3, y: 20 }}
      animate={{ opacity: 1, rotateY: 4, rotateX: -2, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200, transformStyle: "preserve-3d", paddingLeft: 12 }}
      className="relative select-none"
    >
      {/* phone shadow */}
      <div
        className="absolute inset-x-4 bottom-0 h-12 rounded-full"
        style={{
          background: "rgba(26,22,18,0.18)",
          filter: "blur(20px)",
          transform: "translateY(16px)",
        }}
      />

      {/* phone frame */}
      <div
        style={{
          width: 220,
          borderRadius: 32,
          background: "#1A1612",
          padding: "10px 6px",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px rgba(26,22,18,0.45)",
          position: "relative",
        }}
      >
        {/* notch */}
        <div
          style={{
            width: 64,
            height: 16,
            borderRadius: 8,
            background: "#1A1612",
            margin: "0 auto 6px",
            position: "relative",
            zIndex: 2,
          }}
        />

        {/* screen */}
        <div
          style={{
            borderRadius: 22,
            background: "#FAF6F0",
            clipPath: "inset(0 round 22px)",
            padding: "14px 18px 18px",
            minHeight: 320,
          }}
        >
          {/* screen header */}
          <p style={{ fontSize: 9, color: "#8B6F47", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
            Performance
          </p>

          {/* revenue counter */}
          <div style={{ marginBottom: 12, textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#B33A2C", lineHeight: 1, letterSpacing: "-0.02em" }}>
              ${revenue.toLocaleString()}
            </div>
            <div style={{ fontSize: 9, color: "#8B6F47", letterSpacing: "0.06em", marginTop: 3 }}>
              AD SPEND / MONTH
            </div>
          </div>

          {/* bar chart */}
          <BarChart progress={phase} />

          {/* month labels */}
          <div style={{ display: "flex", gap: 5, marginTop: 3 }}>
            {BARS.map((b) => (
              <div key={b.label} style={{ flex: 1, textAlign: "center", fontSize: 7, color: "#8B6F47" }}>
                {b.label}
              </div>
            ))}
          </div>

          {/* arrow trend line */}
          <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                flex: 1,
                height: 2,
                borderRadius: 1,
                background: "rgba(139,111,71,0.15)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: `${arrowProgress * 100}%`,
                  background: "linear-gradient(90deg, #C8807A, #B33A2C)",
                  borderRadius: 1,
                  transition: "width 0.05s linear",
                }}
              />
            </div>
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontSize: 14, color: "#B33A2C" }}
            >
              →
            </motion.div>
          </div>

          {/* stat pills */}
          <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
            {[
              { label: "ROAS", val: "4.4×" },
              { label: "CTR", val: "1.6%" },
              { label: "CPC", val: "$0.20" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  flex: 1,
                  background: "rgba(179,58,44,0.06)",
                  borderRadius: 8,
                  padding: "6px 4px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: "#B33A2C" }}>{s.val}</div>
                <div style={{ fontSize: 7, color: "#8B6F47", letterSpacing: "0.06em", marginTop: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* home indicator */}
        <div
          style={{
            width: 60,
            height: 4,
            borderRadius: 2,
            background: "rgba(255,255,255,0.25)",
            margin: "8px auto 0",
          }}
        />
      </div>
    </motion.div>
  );
}
