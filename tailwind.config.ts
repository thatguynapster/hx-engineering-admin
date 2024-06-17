import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
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
  plugins: [
    function ({ addBase, theme }: { addBase: any; theme: any }) {
      function hexToRgb(hex: string) {
        const value = hex.charAt(0) === "#" ? hex.substring(1, 7) : hex;

        return [
          parseInt(value.substring(0, 2), 16),
          parseInt(value.substring(2, 4), 16),
          parseInt(value.substring(4, 6), 16),
        ].join(",");
      }

      function extractColorVars(colorObj: string, colorGroup = "") {
        return Object.keys(colorObj).reduce((vars, colorKey: any) => {
          const value = colorObj[colorKey];
          const cssVariable =
            colorKey === "DEFAULT"
              ? `--color${colorGroup}`
              : `--color${colorGroup}-${colorKey}`;

          const newVars: any =
            typeof value === "string"
              ? {
                  [cssVariable]: value,
                  [`${cssVariable}-rgb`]: hexToRgb(value),
                }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ":root": extractColorVars(theme("colors")),
      });
    },
  ],
};
export default config;
