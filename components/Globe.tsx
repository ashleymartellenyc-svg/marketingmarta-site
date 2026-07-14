"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState(360);

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      setSize(w < 640 ? Math.min(w - 48, 320) : 360);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Thailand (Chiang Mai) longitude ≈ 99°E → phi ≈ -1.73 rad
    let phi = -1.73;
    let animationId: ReturnType<typeof requestAnimationFrame>;

    const globeOptions = {
      devicePixelRatio: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1,
      width: size * 2,
      height: size * 2,
      phi,
      theta: 0.28,
      dark: 0,
      diffuse: 1.4,
      mapSamples: 20000,
      mapBrightness: 5,
      baseColor: [0.97, 0.93, 0.87] as [number, number, number],
      markerColor: [0.7, 0.22, 0.17] as [number, number, number],
      glowColor: [0.92, 0.87, 0.80] as [number, number, number],
      markers: [{ location: [18.7883, 98.9853] as [number, number], size: 0.07 }],
      onRender: (state: Record<string, number>) => {
        phi += 0.002;
        state.phi = phi;
        state.width = size * 2;
        state.height = size * 2;
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globe = createGlobe(canvasRef.current, globeOptions as any);

    return () => globe.destroy();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  return (
    <div className="flex flex-col items-center gap-5">
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        className="rounded-full"
      />
      <p className="font-serif text-xl text-ink">Based in Thailand</p>
    </div>
  );
}
