import { defineConfig } from "vite"
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
    plugins: [
        vueJsx({}),
    ],
    build: {
        lib: {
            entry: "./components/main.ts",
            name: "one-punch-vue",
            formats: ["es"]
        },
        rollupOptions: {
            external: ["vue"]
        }
    }
})
