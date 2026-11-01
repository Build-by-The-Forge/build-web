import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  // The site's own CSS (app/globals.css) already sets its resets,
  // so Tailwind's preflight is off to avoid changing the design.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: { brand: "#1f5fff", moss: "#4b7a29", leaf: "#8dba50" },
      fontFamily: {
        display: ["var(--font-jost)", "Futura", "sans-serif"],
        body: ["var(--font-archivo)", "Helvetica Neue", "sans-serif"],
        mono: ["var(--font-mono)", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
