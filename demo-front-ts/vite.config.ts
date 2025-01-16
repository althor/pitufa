/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import path, { resolve } from 'path';
// import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                main1: resolve(__dirname, 'pages/page1.html'),
                main2: resolve(__dirname, 'page2/index.html'),
                about: resolve(__dirname, 'about/index.html'),
            },
        },
    },
    //
    // plugins: [tsconfigPaths()],
    test: {
        include: ['**/*.test.ts'],
        globals: true,
    },
});
