module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:storybook/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "@tanstack/query"],
  rules: {
    "@tanstack/query/exhaustive-deps": "error",
    "@tanstack/query/stable-query-client": "error",
    "react/react-in-jsx-scope": "off",
  },
};
