"use client";

import { useState, useEffect } from "react";

const DIGITS = "0123456789";

export function useScramble(target: string, trigger: boolean, duration = 900): string {
  const [output, setOutput] = useState(target);

  useEffect(() => {
    if (!trigger) return;

    let frameId: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const result = target
        .split("")
        .map((char, i) => {
          const resolveAt = (i + 1) / target.replace(/[^0-9]/g, "x").length;
          if (!DIGITS.includes(char)) return char;
          if (progress >= resolveAt) return char;
          return DIGITS[Math.floor(Math.random() * DIGITS.length)];
        })
        .join("");

      setOutput(result);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setOutput(target);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [trigger, target, duration]);

  return output;
}
