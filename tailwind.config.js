const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        main: "#A860F6",
        sub: "#D4B7F4",
        bg: "#F8F6EE",
        black: "#191D26",
        gray: "#625D5D",
        white: "#F8FAFF",
        "zinc-300": "#D1D5DB",
        "zinc-200": "#E5E7EB",
        "gray-700": "#374151",
        "yellow-400": "#facc15",
        "yellow-300": "#fde047",
        "green-500": "#10B981",
        "green-400": "#34D399",
        "zinc-100": "#F4F5F7",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant("progress-unfilled", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `progress-unfilled${separator}${className}`,
          )}::-webkit-progress-bar, .${e(
            `progress-unfilled${separator}${className}`,
          )}`;
        });
      });
      addVariant("progress-filled", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `progress-filled${separator}${className}`,
          )}::-webkit-progress-value, .${e(
            `progress-filled${separator}${className}`,
          )}::-moz-progress-bar, .${e(
            `progress-filled${separator}${className}`,
          )}`;
        });
      });
    }),
  ],
};
