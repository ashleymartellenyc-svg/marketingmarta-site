"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Sphere,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const WORLD = { scale: 290, rotateLng: 10, rotateLat: 48 };
const THAILAND = { scale: 2000, rotateLng: 100.5, rotateLat: 14 };

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function WorldMap2D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animKey, setAnimKey] = useState(0);
  const [pinVisible, setPinVisible] = useState(false);
  const [proj, setProj] = useState({
    scale: WORLD.scale,
    rotateLng: WORLD.rotateLng,
    rotateLat: WORLD.rotateLat,
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimKey((k) => k + 1);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (animKey === 0) return;
    setProj({ scale: WORLD.scale, rotateLng: WORLD.rotateLng, rotateLat: WORLD.rotateLat });
    setPinVisible(false);

    // 1.5s static world view, then 4s zoom to Thailand
    const timeout = setTimeout(() => {
      const begin = performance.now();
      const ZOOM_DURATION = 4000;
      let raf: number;
      const tick = (now: number) => {
        const t = Math.min((now - begin) / ZOOM_DURATION, 1);
        const e = easeInOut(t);
        setProj({
          scale: lerp(WORLD.scale, THAILAND.scale, e),
          rotateLng: lerp(WORLD.rotateLng, THAILAND.rotateLng, e),
          rotateLat: lerp(WORLD.rotateLat, THAILAND.rotateLat, e),
        });
        if (t >= 0.85) setPinVisible(true);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [animKey]);

  // 4-sided dissolve mask
  const maskImage = [
    "linear-gradient(to right, transparent 0px, black 80px, black calc(100% - 80px), transparent 100%)",
    "linear-gradient(to bottom, transparent 0px, black 80px, black calc(100% - 80px), transparent 100%)",
  ].join(", ");

  return (
    <div ref={sectionRef} className="flex flex-col items-center w-full">
      <div
        className="relative w-full mx-auto"
        style={{
          maxWidth: 600,
          maskImage,
          WebkitMaskImage: maskImage,
          maskComposite: "intersect",
          WebkitMaskComposite: "destination-in",
        }}
      >
        <ComposableMap
          projection="geoOrthographic"
          projectionConfig={{
            scale: proj.scale,
            rotate: [-proj.rotateLng, -proj.rotateLat, 0],
          }}
          style={{ width: "100%", height: "auto" }}
          viewBox="0 0 800 800"
        >
          <defs>
            {/* Force sphere shape at all zoom levels */}
            <clipPath id="globe-sphere-clip">
              <circle cx="400" cy="400" r="396" />
            </clipPath>
          </defs>

          {/* Everything clipped to sphere circle */}
          <g clipPath="url(#globe-sphere-clip)">
            {/* Ocean — cream to blend flat */}
            <Sphere id="ocean" fill="#EDE6D8" stroke="none" strokeWidth={0} />

            {/* Land */}
            <g>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const isThailand = geo.properties?.name === "Thailand";
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={isThailand ? "#E0D0B8" : "#E8DDC8"}
                        stroke={isThailand ? "#9E2E20" : "#8B6F47"}
                        strokeWidth={isThailand ? 1.8 : 0.8}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </g>

            {/* Thailand pin */}
            <Marker coordinates={[98.9853, 18.7883]}>
              {/* Fast radial pulse glow */}
              <motion.circle
                r={6}
                fill="rgba(179,58,44,0.0)"
                stroke="#B33A2C"
                strokeWidth={1.5}
                animate={pinVisible ? {
                  r: [6, 22],
                  opacity: [0.7, 0],
                  strokeWidth: [1.5, 0.5],
                } : { opacity: 0 }}
                transition={pinVisible ? {
                  duration: 0.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  repeatDelay: 0.05,
                } : {}}
              />
              {/* Second pulse offset */}
              <motion.circle
                r={6}
                fill="rgba(179,58,44,0.0)"
                stroke="#B33A2C"
                strokeWidth={1.5}
                animate={pinVisible ? {
                  r: [6, 22],
                  opacity: [0.5, 0],
                } : { opacity: 0 }}
                transition={pinVisible ? {
                  duration: 0.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.25,
                  repeatDelay: 0.05,
                } : {}}
              />
              {/* Soft background glow */}
              <motion.circle
                r={10}
                fill="rgba(179,58,44,0.18)"
                stroke="none"
                animate={pinVisible ? { opacity: [0.3, 0.7, 0.3] } : { opacity: 0 }}
                transition={pinVisible ? {
                  duration: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                } : {}}
              />
              {/* Pin dot */}
              <motion.circle
                r={4.5}
                fill="#B33A2C"
                stroke="#FAF6F0"
                strokeWidth={1}
                animate={{ opacity: pinVisible ? 1 : 0, scale: pinVisible ? 1 : 0.3 }}
                transition={{ duration: 0.35 }}
              />
              {/* Label */}
              <g style={{ opacity: pinVisible ? 1 : 0, transition: "opacity 0.5s ease" }}>
                <text
                  x="12"
                  y="-5"
                  fontFamily="'General Sans', system-ui, sans-serif"
                  fontSize="20"
                  fontWeight="600"
                  fill="#1A1612"
                >
                  I&apos;m here! 👋
                </text>
                <text
                  x="12"
                  y="14"
                  fontFamily="'General Sans', system-ui, sans-serif"
                  fontSize="12"
                  fill="#6B5040"
                >
                  GMT+7
                </text>
              </g>
            </Marker>
          </g>

          {/* Sphere border ring on top (unclipped so it's always visible) */}
          <circle
            cx="400"
            cy="400"
            r="396"
            fill="none"
            stroke="#8B6F47"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />
        </ComposableMap>
      </div>
    </div>
  );
}
