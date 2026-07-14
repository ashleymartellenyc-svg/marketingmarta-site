"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 4 phases, each 2.5s = 10s loop
const PHASE_DURATION = 2500;
const TOTAL = PHASE_DURATION * 4;

// Feed rows used in phase 0
const FEED_ROWS = Array.from({ length: 10 }, (_, i) => ({
  wide: i % 3 !== 2,
  height: [72, 56, 80, 64, 72][i % 5],
}));

// Dollar positions that fly out in phase 2
const MONEY = [
  { x: -30, y: -70, delay: 0, emoji: "💸" },
  { x: 10, y: -85, delay: 0.15, emoji: "💰" },
  { x: -50, y: -55, delay: 0.25, emoji: "💵" },
  { x: 30, y: -75, delay: 0.1, emoji: "💸" },
];

export default function HeroIllustration() {
  const [phase, setPhase] = useState(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = (now - startRef.current) % TOTAL;
      const p = Math.floor(elapsed / PHASE_DURATION);
      setPhase(p);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="relative select-none"
      style={{ width: 220, height: 400 }}
      aria-hidden="true"
    >
      {/* Phone frame SVG — slightly imperfect to look hand-drawn */}
      <svg
        width="220"
        height="400"
        viewBox="0 0 220 400"
        fill="none"
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 10 }}
      >
        {/* Body */}
        <path
          d="M28 26 C26 18 32 12 44 11 L176 10 C188 9 194 15 193 24 L196 376 C196 388 188 393 176 393 L44 393 C32 393 25 387 26 376 Z"
          fill="#FAF6F0"
          stroke="#1A1612"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Dynamic Island */}
        <rect x="82" y="20" width="56" height="14" rx="7" fill="#1A1612" />
        {/* Home indicator bar */}
        <rect x="88" y="378" width="44" height="3.5" rx="1.75" fill="#1A1612" opacity="0.25" />
        {/* Side buttons (left) */}
        <path d="M26 95 L24 95 C22 95 22 110 24 110 L26 110" stroke="#1A1612" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M26 120 L24 120 C22 120 22 140 24 140 L26 140" stroke="#1A1612" strokeWidth="1.5" strokeLinecap="round" />
        {/* Side button (right) */}
        <path d="M194 105 L196 105 C198 105 198 130 196 130 L194 130" stroke="#1A1612" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {/* Screen content */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: 30,
          top: 42,
          width: 160,
          height: 330,
          borderRadius: 12,
          background: "#0f1117",
          zIndex: 5,
        }}
      >
        {/* Phase 0 — scrolling feed */}
        <AnimatePresence>
          {phase === 0 && (
            <motion.div
              key="feed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 overflow-hidden"
            >
              <motion.div
                className="absolute w-full"
                animate={{ y: [0, -320] }}
                transition={{ duration: 2.5, ease: "linear" }}
              >
                {FEED_ROWS.map((row, i) => (
                  <div key={i} className="px-2.5 pt-2.5">
                    {/* Avatar + name row */}
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-5 h-5 rounded-full bg-white/20 shrink-0" />
                      <div className="h-1.5 rounded-full bg-white/20" style={{ width: row.wide ? 56 : 40 }} />
                    </div>
                    {/* Image placeholder */}
                    <div
                      className="w-full rounded bg-white/10 mb-1.5"
                      style={{ height: row.height }}
                    />
                    {/* Caption lines */}
                    <div className="h-1.5 w-20 rounded bg-white/12 mb-1" />
                    <div className="h-1.5 w-14 rounded bg-white/8 mb-2" />
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 1 — talking head stops scrolling */}
        <AnimatePresence>
          {phase === 1 && (
            <motion.div
              key="talking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2"
              style={{ background: "#0f1117" }}
            >
              {/* Talking head circle */}
              <div className="relative">
                <div
                  className="rounded-full flex flex-col items-center justify-center"
                  style={{ width: 72, height: 72, background: "rgba(255,255,255,0.12)" }}
                >
                  {/* Eyes */}
                  <div className="flex gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-white" />
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  {/* Animated mouth */}
                  <motion.div
                    animate={{ scaleY: [1, 0.3, 1, 0.3, 1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="rounded-full bg-white/60"
                    style={{ width: 20, height: 6, transformOrigin: "center" }}
                  />
                </div>
                {/* LIVE badge */}
                <div
                  className="absolute -top-1 -right-1 flex items-center gap-1 px-1.5 py-0.5 rounded"
                  style={{ background: "#B33A2C" }}
                >
                  <div className="w-1 h-1 rounded-full bg-white" />
                  <span className="font-sans text-white leading-none" style={{ fontSize: 7 }}>LIVE</span>
                </div>
              </div>

              {/* Captions bar at bottom */}
              <div
                className="absolute bottom-6 left-3 right-3 flex flex-col gap-1 px-2 py-2 rounded"
                style={{ background: "rgba(0,0,0,0.6)" }}
              >
                <div className="h-1.5 w-full rounded bg-white/30" />
                <div className="h-1.5 w-3/4 rounded bg-white/20" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 2 — money flies out */}
        <AnimatePresence>
          {phase === 2 && (
            <motion.div
              key="money"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "#0a0f1a" }}
            >
              {/* App icon / phone graphic in center */}
              <div
                className="rounded-2xl flex items-center justify-center"
                style={{ width: 64, height: 64, background: "#B33A2C" }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 6 L16 26 M8 14 L16 6 L24 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Flying money */}
              {MONEY.map((m, i) => (
                <motion.span
                  key={i}
                  className="absolute"
                  style={{ fontSize: 18 }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                  animate={{
                    x: m.x,
                    y: m.y,
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1.1, 0.9],
                  }}
                  transition={{
                    duration: 1.6,
                    delay: m.delay,
                    ease: "easeOut",
                  }}
                >
                  {m.emoji}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 3 — fade to black / reset */}
        <AnimatePresence>
          {phase === 3 && (
            <motion.div
              key="reset"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, times: [0, 0.1, 0.7, 1] }}
              className="absolute inset-0"
              style={{ background: "#0f1117" }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
