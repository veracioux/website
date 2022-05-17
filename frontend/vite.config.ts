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
    },
    build: {
        write: true,
    },
    proxy: {
        "/api": {
            target: "http://0.0.0.0:8000",
            rewrite: (path) => path.replace(/^\/api/, "")
        },
   }
});
