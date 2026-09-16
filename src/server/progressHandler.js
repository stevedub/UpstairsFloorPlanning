import fs from 'node:fs'
import path from 'node:path'

const DATA_DIR = process.env.DATA_DIR 
  ? path.resolve(process.env.DATA_DIR) 
  : path.resolve(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'progress.json')

const SAFE_TASK_KEY_REGEX = /^[a-zA-Z0-9_\-\.]{1,120}$/
const FORBIDDEN_KEYS = new Set(['__proto__', 'constructor', 'prototype'])

// Verify DATA_FILE doesn't escape DATA_DIR
if (!DATA_FILE.startsWith(DATA_DIR)) {
  throw new Error('Invalid data file path configuration')
}

export function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true, mode: 0o750 })
  }
  if (!fs.existsSync(DATA_FILE)) {
    const initial = { tools: {}, tasks: {}, updatedAt: Date.now() }
    fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf8')
  }
}

export function sanitizePayload(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Payload must be a valid JSON object')
  }

  const sanitized = {}

  if (data.tools !== undefined) {
    if (typeof data.tools !== 'object' || data.tools === null || Array.isArray(data.tools)) {
      throw new Error('Invalid tools structure')
    }
    const cleanTools = {}
    const entries = Object.entries(data.tools)
    if (entries.length > 200) {
      throw new Error('Tools count exceeds allowed threshold (max 200)')
    }
    for (const [key, val] of entries) {
      if (FORBIDDEN_KEYS.has(key)) continue
      // Key must be reasonable length, non-empty, and value must be strictly boolean
      if (typeof key === 'string' && key.trim().length > 0 && key.length <= 200 && typeof val === 'boolean') {
        cleanTools[key.trim()] = val
      }
    }
    sanitized.tools = cleanTools
  }

  if (data.tasks !== undefined) {
    if (typeof data.tasks !== 'object' || data.tasks === null || Array.isArray(data.tasks)) {
      throw new Error('Invalid tasks structure')
    }
    const cleanTasks = {}
    const entries = Object.entries(data.tasks)
    if (entries.length > 500) {
      throw new Error('Tasks count exceeds allowed threshold (max 500)')
    }
    for (const [key, val] of entries) {
      if (FORBIDDEN_KEYS.has(key)) continue
      if (SAFE_TASK_KEY_REGEX.test(key) && typeof val === 'boolean') {
        cleanTasks[key] = val
      }
    }
    sanitized.tasks = cleanTasks
  }

  return sanitized
}

export function readProgress() {
  try {
    ensureDataFile()
    const content = fs.readFileSync(DATA_FILE, 'utf8')
    const parsed = JSON.parse(content)
    return {
      tools: parsed.tools || {},
      tasks: parsed.tasks || {},
      updatedAt: typeof parsed.updatedAt === 'number' ? parsed.updatedAt : Date.now()
    }
  } catch (err) {
    console.error('Failed reading progress file:', err.message)
    return { tools: {}, tasks: {}, updatedAt: Date.now() }
  }
}

// Queue writes to prevent race conditions during concurrent requests
let writeQueue = Promise.resolve()

export async function writeProgress(data) {
  const sanitized = sanitizePayload(data)

  writeQueue = writeQueue.then(async () => {
    ensureDataFile()
    const current = readProgress()
    const merged = {
      tools: sanitized.tools !== undefined ? sanitized.tools : current.tools,
      tasks: sanitized.tasks !== undefined ? sanitized.tasks : current.tasks,
      updatedAt: Date.now()
    }

    const tempFile = path.join(
      DATA_DIR,
      `.progress.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp`
    )

    try {
      fs.writeFileSync(tempFile, JSON.stringify(merged, null, 2), { encoding: 'utf8', mode: 0o640 })
      fs.renameSync(tempFile, DATA_FILE)
      return merged
    } catch (writeErr) {
      if (fs.existsSync(tempFile)) {
        try { fs.unlinkSync(tempFile) } catch {}
      }
      throw writeErr
    }
  })

  return writeQueue
}
