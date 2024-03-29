module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  extensionsToTreatAsEsm: [".ts"],
  bail: 1,
  verbose: true,

  moduleNameMapper: {
    "\\.(css|less|scss|png)$": "<rootDir>/__mocks__/styleMock.js",
  },
};
