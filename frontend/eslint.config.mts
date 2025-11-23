import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import vueEslintParser from "vue-eslint-parser";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import {defineConfig} from "eslint/config";

export default defineConfig([
    {
        ignores: [".nuxt/**", "dist/**", ".output/**", "node_modules/**"],
    },
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        plugins: {js},
        extends: ["js/recommended"],
        languageOptions: {globals: globals.browser},
    },
    tseslint.configs.recommended,
    {
        files: ["**/*.vue"],
        extends: [pluginVue.configs["flat/essential"]],
        languageOptions: {
            parser: vueEslintParser,
            parserOptions: {parser: tseslint.parser},
        },
    },
    {
        files: ["**/*.json"],
        plugins: {json},
        language: "json/json",
        extends: ["json/recommended"],
    },
    {
        files: ["**/*.jsonc"],
        plugins: {json},
        language: "json/jsonc",
        extends: ["json/recommended"],
    },
    {
        files: ["**/*.json5"],
        plugins: {json},
        language: "json/json5",
        extends: ["json/recommended"],
    },
    {
        files: ["**/*.md"],
        plugins: {markdown},
        language: "markdown/gfm",
        extends: ["markdown/recommended"],
    },
    {
        files: ["**/*.css"],
        plugins: {css},
        language: "css/css",
        extends: ["css/recommended"],
    },
]);
