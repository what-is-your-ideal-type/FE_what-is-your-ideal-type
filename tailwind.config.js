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
  plugins: [],
};
