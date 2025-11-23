import vueJsx from "@vitejs/plugin-vue-jsx";
import {rollupPlugin} from "ascii-mugshot";

import {defineNuxtConfig, type NuxtConfig} from "nuxt/config";

export default defineNuxtConfig({
    // buildModules: ["@nuxtjs/google-fonts"],
    modules: ["@nuxtjs/google-fonts"],
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
        plugins: [vueJsx(), rollupPlugin()],
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
