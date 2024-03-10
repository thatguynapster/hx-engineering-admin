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
        primary: "#00AEEF",
        success: "#027A48",
        error: "#B42318",
        warning: "#F79009",
        info: "#0055D6",
        neutral: {
          dark: "#060A0C",
          gray: "#232323",
          "50": "#4F4F4F",
          "40": "#828282",
          "30": "#BDBDBD",
          "20": "#E0E0E0",
          "10": "#F2F2F2",
        },
      },
    },
  },
  plugins: [],
};
export default config;
