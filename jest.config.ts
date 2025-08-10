import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  clearMocks: true,
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverageFrom: [
    "**/components/**/*.{ts,tsx}", // компоненты
    "**/utils/**/*.{ts,tsx}", // утилиты
    "**/app/**/*.{ts,tsx}", // страницы (опционально)
    "!**/index.{ts,tsx}", // исключаем index.ts файлы
    "!**/*.d.ts", // исключаем типы
  ],

  coveragePathIgnorePatterns: ["/node_modules/", "/.next/", "/__tests__/"],

  moduleNameMapper: {
    // Handle @/ imports
    "^@/(.*)$": "<rootDir>/$1",
  },

  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
