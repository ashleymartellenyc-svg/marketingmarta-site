"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AdCreativeCarouselProps {
  items: string[];
}

function isVideo(url: string) {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
}

function CreativeModal({ url, onClose }: { url: string; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div
      className="fixed inset-0 z-[900] flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          background: "rgba(26,22,18,0.6)",
        }}
      />
      <motion.div
        className="relative z-10 flex items-center justify-center"
        style={{ maxHeight: "90vh", maxWidth: "min(400px, 90vw)" }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo(url) ? (
          <video
            ref={videoRef}
            src={url}
            controls
            autoPlay
            playsInline
            className="rounded-sm"
            style={{ maxHeight: "85vh", aspectRatio: "9/16", background: "#1A1612" }}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt="Ad creative"
            className="rounded-sm"
            style={{ maxHeight: "85vh", aspectRatio: "9/16", objectFit: "contain" }}
          />
        )}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-ink text-cream flex items-center justify-center font-sans text-sm hover:bg-cherry transition-colors duration-200"
          aria-label="Close"
        >
          ×
        </button>
      </motion.div>
    </motion.div>
  );
}

function CreativeCard({ url, index }: { url: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    setHovered(true);
    if (isVideo(url) && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleLeave = () => {
    setHovered(false);
    if (isVideo(url) && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="relative shrink-0 rounded-sm overflow-hidden cursor-pointer group"
      style={{ width: 180, aspectRatio: "9/16", background: "#1A1612" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {isVideo(url) ? (
        <video
          ref={videoRef}
          src={url}
          muted
          playsInline
          loop
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={`Creative ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {/* Play overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${hovered ? "opacity-0" : "opacity-100"}`}
        style={{ background: "rgba(26,22,18,0.35)" }}
      >
        <div className="w-10 h-10 rounded-full bg-cream/90 flex items-center justify-center">
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
            <path d="M2 1.5L12.5 8L2 14.5V1.5Z" fill="#1A1612" />
          </svg>
        </div>
      </div>
      {/* Hover label */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 px-3 py-2"
        style={{ background: "linear-gradient(to top, rgba(26,22,18,0.8) 0%, transparent 100%)" }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <span className="font-sans text-xs text-cream/80">Click to expand</span>
      </motion.div>
    </div>
  );
}

export default function AdCreativeCarousel({ items }: AdCreativeCarouselProps) {
  const [modalUrl, setModalUrl] = useState<string | null>(null);

  if (items.length === 0) return null;

  return (
    <div>
      {/* Horizontal scroll rail */}
      <div
        className="flex gap-4 overflow-x-auto pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {items.map((url, i) => (
          <div key={url} onClick={() => setModalUrl(url)}>
            <CreativeCard url={url} index={i} />
          </div>
        ))}
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

      <AnimatePresence>
        {modalUrl && (
          <CreativeModal url={modalUrl} onClose={() => setModalUrl(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
