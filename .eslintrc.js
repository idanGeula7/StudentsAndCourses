module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "brace-style": ["error", "1tbs"],
    "no-undef": "off",
    "no-var": "error",
    //indent: ["error", 4],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-console": "off", // Switch to "error" before submitting
    "no-unused-vars": "off" // Switch to "error" before submitting
  }
};