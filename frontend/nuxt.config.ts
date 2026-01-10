import vueJsx from "@vitejs/plugin-vue-jsx";
import { rollupPlugin as asciiMugshotRollupPlugin } from "@veracioux/ascii-mugshot";

import { type NuxtConfig } from "nuxt/config";

const config: NuxtConfig = {
  compatibilityDate: "2025-11-23",
  modules: ["@nuxtjs/google-fonts", "@nuxtjs/tailwindcss"],
  nitro: {
    preset: "static",
  },
  srcDir: "src/",
  devServer: {
    port: 8080,
  },
  // @ts-expect-error FIXME
  googleFonts: {
    families: {
      "Secular One": true,
    },
  },
  css: ["@/assets/global.scss"],
  alias: {
    "@lib": "../lib/src",
  },
  vite: {
    plugins: [vueJsx(), asciiMugshotRollupPlugin()],
    build: {
      write: true,
    },
    css: {
      modules: {
        localsConvention: "camelCaseOnly",
      },
    },
  },
};

export default config;
