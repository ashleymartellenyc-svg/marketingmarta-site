"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPortrait() {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -25, rotateX: 8, y: 30, scale: 0.94 }}
      animate={{ opacity: 1, rotateY: -12, rotateX: 6, y: 0, scale: 1 }}
      transition={{
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.6 },
      }}
      style={{ perspective: 900, transformStyle: "preserve-3d" }}
      className="relative inline-block"
    >
      {/* shadow layer */}
      <div
        className="absolute inset-0 rounded-sm"
        style={{
          transform: "translateZ(-8px) translate(10px, 14px)",
          background: "rgba(139,111,71,0.18)",
          filter: "blur(18px)",
        }}
      />
      {/* frame border */}
      <div
        className="relative overflow-hidden rounded-sm"
        style={{
          border: "2px solid rgba(139,111,71,0.25)",
          boxShadow:
            "0 4px 6px rgba(26,22,18,0.06), 0 12px 32px rgba(26,22,18,0.1), inset 0 1px 0 rgba(250,246,240,0.5)",
        }}
      >
        <Image
          src="/images/marta-portrait.jpg"
          alt="Marta"
          width={320}
          height={400}
          className="block object-cover"
          priority
        />
        {/* subtle warm overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(160deg, rgba(250,246,240,0.08) 0%, transparent 60%)",
          }}
        />
      </div>
    </motion.div>
  );
}
