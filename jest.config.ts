import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "./coverage/",
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageProvider: "v8",
  coverageReporters: ["json", "text", "lcov", "clover"],
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  modulePathIgnorePatterns: [],
  roots: ["<rootDir>"],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!@radix-ui|clsx)"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^context": "<rootDir>/src/context/$1",
    "^@lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@actions/(.*)$": "<rootDir>/src/actions/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
  },
};

export default createJestConfig(config);
