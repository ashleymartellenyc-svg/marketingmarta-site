import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  ...(isProd && { output: "export" }),
  trailingSlash: true,
  images: { unoptimized: true },
  transpilePackages: ["lenis", "cobe", "react-globe.gl", "three-globe", "globe.gl", "react-simple-maps"],
};

export default nextConfig;
