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
      provider: 'istanbul',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@modules': path.resolve(__dirname, './src/modules'),
    },
  },
});
