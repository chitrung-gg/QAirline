import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "auth-image": "url('/images/authimage.png')",
      },
      colors: {
        "blue-normal": "#1175A7",
        "blue-normal-hover": "#0F6996",
        "blue-normal-active": "#0E5E86",
        "blue-dark-normal": "#0D587D",
        "blue-dark-hover": "#0A4664",
        "blue-dark-active": "#08354B",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans - serif"],
        robotoslab: ["Roboto Slab", "serif"],
        robotoflex: ["Roboto Flex", "sans - serif"],
        inter: ["Inter", "sans - serif"],
        itim: ["Itim", "cursive"],
      },
    },
    screens: {
      mobile: {
        min: "100px",
        max: "550px",
      },
      tablet: {
        min: "550px",
        max: "750px",
      },
      "mini-laptop": {
        min: "750px",
        max: "874px",
      },
      laptop: {
        min: "874px",
        max: "1280px",
      },
      desktop: {
        min: "1280px",
      },
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
