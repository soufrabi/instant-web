import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
        boxShadow: {
        "customhovereffect": "inset 0 0 100rem rgba(0,0,0,0.05), 0 0 100rem rgba(0,0,0,0.5)"
      }

    },
  },
  plugins: [],
  darkMode: ["selector"]
};
export default config;
