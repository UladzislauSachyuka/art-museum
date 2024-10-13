export {};
module.exports = {
  preset: "ts-jest",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!**/vendor/**"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    ".(ts|tsx)": "ts-jest",
  },

  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/coverage",
    "package.json",
    "package-lock.json",
    "reportWebVitals.ts",
    "setupTests.ts",
    "index.tsx",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "\\.svg$": "<rootDir>/__mocks__/svgMock.js",
  },
};
