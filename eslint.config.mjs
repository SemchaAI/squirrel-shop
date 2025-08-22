import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
// import pluginJest from "eslint-plugin-jest";
// import pluginJestDom from "eslint-plugin-jest-dom";
// import pluginTestingLibrary from "eslint-plugin-testing-library";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:jest/recommended",
    "plugin:jest-dom/recommended",
    "plugin:testing-library/react",
  ),
  // {
  //   files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  //   plugins: {
  //     jest: pluginJest,
  //     "jest-dom": pluginJestDom,
  //     "testing-library": pluginTestingLibrary,
  //   },
  //   rules: {
  //     ...pluginJest.configs.recommended.rules,
  //     ...pluginJestDom.configs.recommended.rules,
  //     // You can override/add rules here:
  //     "jest/expect-expect": "warn",
  //   },
  //   languageOptions: {
  //     globals: {
  //       jest: "readonly",
  //       describe: "readonly",
  //       it: "readonly",
  //       test: "readonly",
  //       expect: "readonly",
  //       beforeEach: "readonly",
  //       afterEach: "readonly",
  //     },
  //   },
  // },
];

export default eslintConfig;
