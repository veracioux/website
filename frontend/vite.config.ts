import {fileURLToPath, URL} from "url";

import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// @ts-ignore
import {rollupPlugin} from "ascii-mugshot";

import {VitePluginFonts} from "vite-plugin-fonts";

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        rollupPlugin(),
        VitePluginFonts({
            google: {
                families: ["Secular One", "Roboto Mono"],
            },
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    server: {
        port: Number(process.env.WEB_PORT ?? 3000),
        proxy: {
            "/api": {
                target: `http://0.0.0.0:${process.env.BACKEND_PORT ?? 8000}`,
                changeOrigin: true,
            },
        },
    },
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
});

process.env.VITE_ENVIRONMENT = process.env.ENVIRONMENT;
process.env.VITE_MACHINE = process.env.MACHINE;
