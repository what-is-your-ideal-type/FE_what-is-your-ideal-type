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
