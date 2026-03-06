import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    target: 'es2021',
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8001',
    },
  },
  build: {
    target: 'es2021',
    outDir: 'dist',
  },
})
