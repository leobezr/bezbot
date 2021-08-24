module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transformIgnorePatterns: ["node_modules/(?!vue-router|@babel|vuetify)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  preset: "ts-jest/presets/js-with-babel",
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
    crypto: require("crypto"),
  },
};
