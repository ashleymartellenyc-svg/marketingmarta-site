"use client";

import { motion } from "framer-motion";

const shapes = [
  { x: "8%",  y: "20%", size: 14, dur: 18, delay: 0 },
  { x: "85%", y: "35%", size: 10, dur: 22, delay: 3 },
  { x: "65%", y: "70%", size: 8,  dur: 26, delay: 6 },
];

export default function DriftingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {shapes.map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-cherry select-none"
          style={{
            left: s.x,
            top: s.y,
            fontSize: s.size,
            opacity: 0.07,
          }}
          animate={{ y: [0, -16, 0] }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✶
        </motion.span>
      ))}
    </div>
  );
}
