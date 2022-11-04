import {fileURLToPath, URL} from "url";

import vueJsx from "@vitejs/plugin-vue-jsx";
// @ts-ignore
import {rollupPlugin} from "ascii-mugshot";

import {defineNuxtConfig} from "nuxt/config";

export default defineNuxtConfig({
    modules: ["@nuxtjs/proxy"],
    buildModules: ["@nuxtjs/google-fonts"],
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
    devServer: {
        // NOTE: a nuxt bug causes this to be ignored
        port: Number(process.env.WEB_PORT ?? 3000),
    },
    css: ["@/assets/global.scss"],
    vite: {
        plugins: [
            vueJsx(),
            rollupPlugin(),
        ],
        build: {
            write: true,
            assetsDir:
                process.env.ENVIRONMENT === "staging" ? "stg/static" : "static",
        },
        css: {
            modules: {
                localsConvention: "camelCaseOnly",
            },
        },
    }
})
