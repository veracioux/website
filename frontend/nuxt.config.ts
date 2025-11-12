import vueJsx from "@vitejs/plugin-vue-jsx";
// @ts-ignore
import {rollupPlugin} from "ascii-mugshot";

import {defineNuxtConfig, NuxtConfig} from "nuxt/config";

export default defineNuxtConfig({
    modules: ["@nuxtjs/proxy"],
    buildModules: ["@nuxtjs/google-fonts"],
    runtimeConfig: {
        public: {
            env: process.env.ENV,
        },
    },
    googleFonts: {
        families: {
            "Secular One": true,
            "Roboto Mono": true,
        }
    },
    /* TODO investigate: causes an error when running `nuxt dev`
    proxy: {
        "/api": {
            target: `http://0.0.0.0:${process.env.BACKEND_PORT ?? 8000}`,
            changeOrigin: true,
        },
    },
     */
    css: ["@/assets/global.scss"],
    vite: {
        plugins: [
            vueJsx(),
            rollupPlugin(),
        ],
        build: {
            write: true,
            assetsDir:
                process.env.ENV === "staging" ? "stg/static" : "static",
        },
        css: {
            modules: {
                localsConvention: "camelCaseOnly",
            },
        },
    }
}) as NuxtConfig;
