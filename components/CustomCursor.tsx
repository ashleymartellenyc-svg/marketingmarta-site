"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isZoom, setIsZoom] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const zoomEl = el.closest("[data-cursor='zoom']");
      const pointerEl = el.closest(
        "a, button, [role='button'], input, select, textarea, label, [data-cursor]"
      );
      setIsZoom(!!zoomEl);
      setIsPointer(!zoomEl && !!pointerEl);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [x, y]);

  if (isTouch) return null;

  const pulse = isPointer || isZoom;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ x, y }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.1 }}
    >
      <motion.div
        style={{ marginLeft: -4, marginTop: -4 }}
        animate={pulse ? { opacity: [1, 0.25, 1] } : { opacity: 1 }}
        transition={
          pulse
            ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.15 }
        }
      >
        {isZoom ? (
          /* Magnifying glass */
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="7.5" stroke="#B33A2C" strokeWidth="2.2" />
            <line
              x1="16.8"
              y1="16.8"
              x2="25"
              y2="25"
              stroke="#B33A2C"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          /* Hand-drawn arrow */
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27 27 C21 19 13 11 4 4"
              stroke="#B33A2C"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M4 4 L10 2.5"
              stroke="#B33A2C"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M4 4 L5.5 10"
              stroke="#B33A2C"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        )}
      </motion.div>
    </motion.div>
  );
}
