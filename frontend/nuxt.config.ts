import vueJsx from "@vitejs/plugin-vue-jsx";
import { rollupPlugin as asciiMugshotRollupPlugin } from "ascii-mugshot";

import { defineNuxtConfig, type NuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-11-23",
  modules: ["@nuxtjs/google-fonts", "@nuxtjs/tailwindcss"],
  srcDir: "src/",
  runtimeConfig: {
    public: {
      env: process.env.ENV,
    },
  },
  devServer: {
    port: 8080,
  },
  // @ts-expect-error FIXME
  googleFonts: {
    families: {
      "Secular One": true,
      "Roboto Mono": true,
    },
  },
  css: ["@/assets/global.scss"],
  vite: {
    plugins: [vueJsx(), asciiMugshotRollupPlugin()],
    build: {
      write: true,
      assetsDir: process.env.ENV === "staging" ? "stg/static" : "static",
    },
    css: {
      modules: {
        localsConvention: "camelCaseOnly",
      },
    },
  },
}) as NuxtConfig;
