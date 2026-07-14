"use client";

import { useRef, useState } from "react";
import { motion, useInView, useAnimationFrame, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/useLocale";
import { t } from "@/lib/t";

/* ─── Thai flag SVG ──────────────────────────────────────────────── */
function ThaiFlag({ waveOffset }: { waveOffset: number }) {
  const amp = 4;
  const freq = 1.8;
  const stripes = [
    { color: "#A51931", h: 14 },
    { color: "#F4F5F0", h: 10 },
    { color: "#2D2A4A", h: 20 },
    { color: "#F4F5F0", h: 10 },
    { color: "#A51931", h: 14 },
  ];
  const totalH = stripes.reduce((s, r) => s + r.h, 0);
  const W = 100;

  const paths = stripes.map((stripe, si) => {
    const yStart = stripes.slice(0, si).reduce((s, r) => s + r.h, 0);
    const y0 = yStart;
    const y1 = yStart + stripe.h;
    const steps = 8;
    const points: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * W;
      const dy = Math.sin((i / steps) * Math.PI * freq + waveOffset) * amp * (x / W);
      points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${(y0 + dy).toFixed(1)}`);
    }
    for (let i = steps; i >= 0; i--) {
      const x = (i / steps) * W;
      const dy = Math.sin((i / steps) * Math.PI * freq + waveOffset) * amp * (x / W);
      points.push(`L${x.toFixed(1)},${(y1 + dy).toFixed(1)}`);
    }
    points.push("Z");
    return { path: points.join(" "), color: stripe.color };
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${totalH}`}
      width={80}
      height={54}
      style={{ display: "block", overflow: "visible" }}
    >
      {paths.map((p, i) => (
        <path key={i} d={p.path} fill={p.color} />
      ))}
    </svg>
  );
}

/* ─── Flag stuck into plaque (upper-right corner) ───────────────── */
function StuckFlag() {
  const [waveOffset, setWaveOffset] = useState(0);
  useAnimationFrame((elapsed) => {
    setWaveOffset((elapsed / 600) % (Math.PI * 2));
  });

  return (
    <div
      style={{
        position: "absolute",
        top: -24,
        right: 28,
        display: "flex",
        alignItems: "flex-start",
        gap: 0,
        transform: "rotate(12deg)",
        transformOrigin: "bottom center",
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: 3,
          height: 90,
          background: "linear-gradient(180deg, #C8A96E 0%, #8B6F47 100%)",
          borderRadius: 2,
          flexShrink: 0,
          boxShadow: "1px 0 3px rgba(0,0,0,0.18)",
        }}
      />
      <div style={{ marginTop: 8 }}>
        <ThaiFlag waveOffset={waveOffset} />
      </div>
    </div>
  );
}

/* ─── Social handle with hover image preview ─────────────────────── */
function SocialHandle({ handle, imageSrc, href }: { handle: string; imageSrc: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); setHovered((h) => !h); }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: 12,
          color: hovered ? "#B33A2C" : "#8B6F47",
          letterSpacing: "0.04em",
          fontWeight: 500,
          cursor: "pointer",
          textDecoration: hovered ? "underline" : "none",
          textShadow: hovered ? "0 0 12px rgba(179,58,44,0.35)" : "none",
          transition: "color 0.2s ease, text-shadow 0.2s ease",
          display: "block",
        }}
      >
        {handle}
      </a>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 10px)",
              top: "auto",
              left: "50%",
              transform: "translateX(-50%)",
              width: 220,
              height: 300,
              borderRadius: 12,
              boxShadow: "0 12px 36px rgba(26,22,18,0.22), 0 4px 10px rgba(26,22,18,0.1)",
              zIndex: 50,
              background: "#FAF6F0",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc} alt={handle} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── 3D Plaque ──────────────────────────────────────────────────── */
function Plaque({ children, visible }: { children: React.ReactNode; visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={visible ? { opacity: 1, y: 0, rotateX: 2 } : { opacity: 0, y: 40, rotateX: 8 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 800, position: "relative" }}
    >
      {/* Thai flag stuck into upper-right corner */}
      <StuckFlag />

      <div
        style={{
          background: "linear-gradient(160deg, #FFFFFF 0%, #FAF6F0 60%, #F0E8DC 100%)",
          borderRadius: 20,
          padding: "48px 56px 56px",
          boxShadow:
            "0 2px 0 rgba(255,255,255,0.8) inset, 0 -2px 0 rgba(139,111,71,0.15) inset, 0 8px 0 rgba(139,111,71,0.12), 0 12px 0 rgba(139,111,71,0.08), 0 20px 40px rgba(26,22,18,0.14), 0 4px 12px rgba(26,22,18,0.08)",
          border: "1px solid rgba(139,111,71,0.2)",
          position: "relative",
          transformStyle: "preserve-3d",
          maxWidth: 680,
          width: "100%",
          textAlign: "center",
          overflow: "visible",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 40%, rgba(139,111,71,0.06) 100%)",
            pointerEvents: "none",
          }}
        />
        {children}
      </div>
    </motion.div>
  );
}

/* ─── Main export ────────────────────────────────────────────────── */
export default function SponsoredContentSection() {
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  useInView(ref, { once: true, margin: "-100px" });
  const inView = true;

  return (
    <section ref={ref} style={{ position: "relative", padding: "80px 0", overflow: "visible" }}>
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Plaque visible={inView}>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
            style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B33A2C", marginBottom: 20, fontWeight: 600 }}
          >
            {t("ugc.sponsored_title", locale)}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 600, color: "#1A1612", lineHeight: 1.4, letterSpacing: "-0.01em", maxWidth: 520, margin: "0 auto 16px" }}
          >
            {t("ugc.sponsored_heading", locale)}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", color: "#8B6F47", lineHeight: 1.65, maxWidth: 480, margin: "0 auto 12px" }}
          >
            {t("ugc.sponsored_p1", locale)}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.65 }}
            style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", color: "#8B6F47", lineHeight: 1.65, maxWidth: 480, margin: "0 auto 36px" }}
          >
            {t("ugc.sponsored_p2", locale)}
          </motion.p>

          {/* social handles with hover previews */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}
          >
            <SocialHandle handle="@nomadicmarta · Instagram" imageSrc="/images/instagram-profile.png" href="https://instagram.com/nomadicmarta" />
            <SocialHandle handle="@nomadicmarta · TikTok" imageSrc="/images/tiktok-profile.png" href="https://tiktok.com/@nomadicmarta" />
          </motion.div>
        </Plaque>
      </div>
    </section>
  );
}
