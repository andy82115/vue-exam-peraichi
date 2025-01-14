import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  prettier,
  {
    plugins: { prettier: pluginPrettier },
    rules: { "prettier/prettier": "error" },
  },
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    globals: {
      useRuntimeConfig: "readonly",
    },
  },
  {
    files: ["**/*.stories.{js,ts,vue}"],
    rules: {
      "no-unused-vars": "off",
      "no-console": "off",
      "vue/no-unused-components": "off",
    },
  },
];
