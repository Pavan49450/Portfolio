import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: { DEFAULT: "var(--background)" },
        foreground: { DEFAULT: "var(--foreground)" },
        primary: { DEFAULT: "var(--primary)" },
        "primary-foreground": { DEFAULT: "var(--primary-foreground)" },
        accent: { DEFAULT: "var(--accent)" },
        "accent-foreground": { DEFAULT: "var(--accent-foreground)" },
        ring: { DEFAULT: "var(--ring)" },
        card: { DEFAULT: "var(--card)" },
        muted: { DEFAULT: "var(--muted)" },
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        gradient: "gradient 6s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
