/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "./tsconfig.json" }],
  },

  /* ──────────── Helpers de reset BDD ──────────── */
  globalSetup: "<rootDir>/src/tests/helpers/prismaTestEnv.ts",
  setupFilesAfterEnv: ["<rootDir>/src/tests/helpers/prismaTestEnv.ts"],

  /* ──────────── Couverture ────────────────────── */
  coveragePathIgnorePatterns: ["/node_modules/", "/src/tests/"],
  collectCoverageFrom: ["src/**/*.ts", "!src/tests/**", "!src/**/*.d.ts"],

  moduleFileExtensions: ["ts", "js", "json"],
};
