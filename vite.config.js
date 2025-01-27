import { defineConfig } from "vite";

export default defineConfig ({
    base: '/kanji_project',
    build: {
        assetsInclude: ['**/*.json'],
        outDir: "dist"
    }
})
