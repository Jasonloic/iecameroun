/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        1: "#201f22",
        "milestone-webflow-html-website-template-webflow-io-1440x761-default-1-nero":
          "#fff",
        "milestone-webflow-html-website-template-webflow-io-1440x761-default-1-black":
          "#000",
        "general-color-3": "#fff",
        "gray-600": "#52525b",
        "natural-black": "#212121",
      },
    },
    screens: {},
  },
  corePlugins: {
    preflight: false,
  },
};
