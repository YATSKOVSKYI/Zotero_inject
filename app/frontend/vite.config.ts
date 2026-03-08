import { defineConfig } from 'vite'
import { resolve } from 'node:path'

function devRouteRewrite() {
  return {
    name: 'dev-route-rewrite',
    configureServer(server: any) {
      server.middlewares.use((req: any, _res: any, next: any) => {
        if (!req?.url) return next()
        if (req.method !== 'GET' && req.method !== 'HEAD') return next()

        const [path, query] = req.url.split('?')
        const suffix = query ? `?${query}` : ''

        if (path === '/') {
          req.url = `/landing.html${suffix}`
          return next()
        }
        if (path === '/app' || path === '/app/') {
          req.url = `/index.html${suffix}`
          return next()
        }

        return next()
      })
    },
  }
}

export default defineConfig({
  plugins: [devRouteRewrite()],
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
    rollupOptions: {
      input: {
        app: resolve(__dirname, 'index.html'),
        landing: resolve(__dirname, 'landing.html'),
      },
    },
  },
})
