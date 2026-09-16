import express from 'express'
import compression from 'compression'
import path from 'node:path'
import { readProgress, writeProgress } from './src/server/progressHandler.js'

const app = express()
const PORT = process.env.PORT || 80
const DIST_DIR = path.resolve(process.cwd(), 'dist')

// Security & Privacy Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'no-referrer')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), screen-wake-lock=(), accelerometer=(), gyroscope=(), magnetometer=()')
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none';")
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin')
  next()
})

// Enable Gzip / Deflate compression
app.use(compression())

// Parse JSON body for API
app.use(express.json({ limit: '1mb' }))

// Shared Progress API
app.get('/api/progress', (req, res) => {
  const data = readProgress()
  res.json(data)
})

app.post('/api/progress', (req, res) => {
  try {
    const updated = writeProgress(req.body)
    res.json({ success: true, ...updated })
  } catch (err) {
    res.status(500).json({ error: 'Failed saving progress' })
  }
})

// Serve static build assets
app.use(express.static(DIST_DIR, {
  maxAge: '6M',
  immutable: true,
  index: 'index.html'
}))

// SPA fallback
app.use((req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'))
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Production Server] Upstairs Flooring Planner running on port ${PORT}`)
})
