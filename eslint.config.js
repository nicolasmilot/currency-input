import eslintPluginPrettier from "eslint-plugin-prettier";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";

const commonPlugins = {
  prettier: eslintPluginPrettier,
};

const commonRules = {
  ...prettierRecommended.rules,
  "prettier/prettier": "error",
};

export default [
  {
    ignores: ["node_modules", "dist", "sandbox"],
  },
  ...tseslint.config({
    files: ["**/*.ts", "**/*.d.ts"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      parser: tsParser,
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      ...commonPlugins,
    },
    rules: {
      ...commonRules,
    },
  }),
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        window: true,
        document: true,
        console: true,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      ...commonPlugins,
    },
    rules: {
      ...commonRules,
    },
  },
];
