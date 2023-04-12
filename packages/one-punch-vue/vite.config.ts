/// <reference types="vitest" />
import { defineConfig } from "vite"
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from "@vitejs/plugin-vue"

export default defineConfig({
    plugins: [
        vue(),
        vueJsx({}),
    ],
    build: {
        target: 'esnext',
        minify: false,
        lib: {
            entry: "./components/main.ts",
            name: "OnePunchVue",
            fileName: "one-punch-vue",
            formats: ["es", "umd"]
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue"
                }
            }
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        transformMode: {
          web: [/.[tj]sx$/],
        }
    },
})
