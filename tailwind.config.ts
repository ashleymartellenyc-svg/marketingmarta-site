import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF6F0",
        ink: "#1A1612",
        cherry: "#B33A2C",
        brown: "#8B6F47",
      },
      fontFamily: {
        sans: ['"General Sans"', "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2rem, 5.5vw, 4.5rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(1.75rem, 4vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.4rem, 2.8vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },
    },
  },
  plugins: [],
};

export default config;
