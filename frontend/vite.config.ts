import {fileURLToPath, URL} from "url";

import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// @ts-ignore
import {rollupPlugin} from "ascii-mugshot";

export default defineConfig({
    plugins: [vue(), vueJsx(), rollupPlugin()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    server: {
        port: 3000,
        proxy: {
            "/api": {
                target: "http://0.0.0.0:8000",
                changeOrigin: true,
            },
        },
    },
    build: {
        write: true,
        assetsDir: "static",
    },
    css: {
        modules: {
            localsConvention: "camelCaseOnly",
        },
    },
});
