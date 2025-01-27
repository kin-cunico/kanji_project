import { defineConfig } from "vite";

export default defineConfig ({
    base: '/',
    build: {
        assetsInclude: ['**/*.json'],
        outDir: "dist"
    }
})