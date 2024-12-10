module.exports = {
  rootDir: "./",
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "./jest.setup.js",
  ],
  clearMocks: true,
  collectCoverage: true,
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  testTimeout: 5000,
  snapshotSerializers: ["@emotion/jest/serializer"],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};
