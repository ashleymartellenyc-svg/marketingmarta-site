"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* Uses cobe but with a reliable canvas-sizing approach */
export default function GlobeComponent() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(-1.73);
  const globeRef = useRef<{ destroy: () => void } | null>(null);

  const init = useCallback(async () => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const { default: createGlobe } = await import("cobe");
    const s = wrap.getBoundingClientRect().width;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    globeRef.current?.destroy();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globeRef.current = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: s * dpr,
      height: s * dpr,
      phi: phiRef.current,
      theta: 0.28,
      dark: 0,
      diffuse: 1.5,
      mapSamples: 24000,
      mapBrightness: 5.5,
      baseColor: [0.97, 0.93, 0.87] as [number, number, number],
      markerColor: [0.7, 0.22, 0.17] as [number, number, number],
      glowColor: [0.93, 0.88, 0.8] as [number, number, number],
      markers: [{ location: [18.7883, 98.9853] as [number, number], size: 0.09 }],
      onRender(state: Record<string, number>) {
        phiRef.current += 0.0018;
        state.phi = phiRef.current;
        state.width = s * dpr;
        state.height = s * dpr;
      },
    } as any);

    canvas.style.width = `${s}px`;
    canvas.style.height = `${s}px`;
  }, []);

  useEffect(() => {
    const ro = new ResizeObserver(init);
    if (wrapRef.current) ro.observe(wrapRef.current);
    init();
    return () => {
      ro.disconnect();
      globeRef.current?.destroy();
    };
  }, [init]);

  return (
    <div className="flex flex-col items-center gap-5">
      <div ref={wrapRef} className="w-full max-w-[420px] mx-auto aspect-square">
        <canvas ref={canvasRef} className="w-full h-full rounded-full" />
      </div>
      <p className="font-sans font-semibold text-lg text-ink tracking-tight">
        Based in Thailand
      </p>
    </div>
  );
}
