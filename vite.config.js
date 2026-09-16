import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readProgress, writeProgress } from './src/server/progressHandler.js'

function apiProgressPlugin() {
  return {
    name: 'api-progress-plugin',
    configureServer(server) {
      server.middlewares.use('/api/progress', (req, res, next) => {
        if (req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(readProgress()))
          return
        }
        if (req.method === 'POST') {
          let body = ''
          req.on('data', (chunk) => { body += chunk })
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}')
              const updated = writeProgress(data)
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, ...updated }))
            } catch (err) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Failed saving progress' }))
            }
          })
          return
        }
        next()
      })
    }
  }
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    apiProgressPlugin()
  ],
  server: {
    host: true,
    port: 3000
  },
  preview: {
    host: true,
    port: 3000
  }
})
