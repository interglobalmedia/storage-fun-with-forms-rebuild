import { defineConfig } from 'vite';
import path from 'path'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
  },
  test: {
    setupFiles: ['vitest-localstorage-mock'],
    globals: true,
    environment: "jsdom",
    coverage: {
      // provider: 'istanbul',
      provider: 'v8',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@modules': path.resolve(__dirname, './src/modules'),
    },
  },
});
