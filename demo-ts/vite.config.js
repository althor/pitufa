/// <reference types="vitest" />
import { defineConfig } from 'vitest/config.js';
// import path, { resolve } from 'path';
// import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    // resolve: {
    //     alias: {
    //         '@': path.resolve(__dirname, './src'),
    //     },
    // },

    //
    // plugins: [tsconfigPaths()],
    test: {
        include: ['**/*.test.ts'],
        globals: true,
    },
});
