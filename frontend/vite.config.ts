import {fileURLToPath, URL} from "url";

import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
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
