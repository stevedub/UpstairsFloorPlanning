import express from 'express'
import compression from 'compression'
import path from 'node:path'
import { readProgress, writeProgress } from './src/server/progressHandler.js'

const app = express()
const PORT = parseInt(process.env.PORT || '80', 10)
const DIST_DIR = path.resolve(process.cwd(), 'dist')

// 1. Hide server technology details
app.disable('x-powered-by')

// 2. Restrict to safe HTTP methods
app.use((req, res, next) => {
  if (!['GET', 'HEAD', 'POST', 'OPTIONS'].includes(req.method)) {
    res.setHeader('Allow', 'GET, HEAD, POST, OPTIONS')
    return res.status(405).type('text/plain').send('Method Not Allowed')
  }
  next()
})

// 3. Security & Privacy Headers Middleware
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

// 4. Rate Limiting Middleware (in-memory sliding window)
const ipRequestMap = new Map()

// Cleanup expired rate records every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of ipRequestMap.entries()) {
    if (now > record.resetTime) {
      ipRequestMap.delete(ip)
    }
  }
}, 300000).unref()

function rateLimiter(limitPerMinute, method = 'ALL') {
  return (req, res, next) => {
    if (method !== 'ALL' && req.method !== method) return next()

    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown'
    const now = Date.now()
    const key = `${ip}:${method}`
    const record = ipRequestMap.get(key) || { count: 0, resetTime: now + 60000 }

    if (now > record.resetTime) {
      record.count = 1
      record.resetTime = now + 60000
    } else {
      record.count++
    }
    ipRequestMap.set(key, record)

    if (record.count > limitPerMinute) {
      res.setHeader('Retry-After', '30')
      return res.status(429).json({ error: 'Too many requests. Please slow down.' })
    }
    next()
  }
}

// 5. Gzip & Deflate compression
app.use(compression())

// 6. Strict payload size limitation on JSON body (prevents memory exhaustion)
app.use(express.json({ limit: '64kb', strict: true }))

// 7. Shared Progress API with rate limiting
app.get('/api/progress', rateLimiter(120, 'GET'), (req, res) => {
  const data = readProgress()
  res.json(data)
})

app.post('/api/progress', rateLimiter(60, 'POST'), async (req, res) => {
  try {
    const updated = await writeProgress(req.body)
    res.json({ success: true, ...updated })
  } catch (err) {
    res.status(400).json({ error: 'Invalid progress data structure' })
  }
})

// Block access to dotfiles or sensitive extensions in static serving
app.use((req, res, next) => {
  if (req.path.startsWith('/.') || /\.(bak|conf|config|dist|fla|in[ci]|log|psd|sh|sql|sw[op]|py|rb|md|ya?ml)$/i.test(req.path)) {
    return res.status(404).send('Not Found')
  }
  next()
})

// 8. Serve static build assets with immutable caching
app.use(express.static(DIST_DIR, {
  maxAge: '6M',
  immutable: true,
  index: false,
  dotfiles: 'ignore'
}))

// 9. SPA fallback with safe pathing
app.use((req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'))
})

// 10. Start Server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Production Server] Upstairs Flooring Planner running on port ${PORT}`)
})

// Graceful shutdown
function shutdown() {
  console.log('Shutting down server gracefully...')
  server.close(() => {
    process.exit(0)
  })
}
process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
