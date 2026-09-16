import fs from 'node:fs'
import path from 'node:path'

const DATA_DIR = process.env.DATA_DIR 
  ? path.resolve(process.env.DATA_DIR) 
  : path.resolve(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'progress.json')

export function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(DATA_FILE)) {
    const initial = { tools: {}, tasks: {}, updatedAt: Date.now() }
    fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf8')
  }
}

export function readProgress() {
  try {
    ensureDataFile()
    const content = fs.readFileSync(DATA_FILE, 'utf8')
    return JSON.parse(content)
  } catch (err) {
    console.error('Failed reading progress file:', err)
    return { tools: {}, tasks: {}, updatedAt: Date.now() }
  }
}

export function writeProgress(data) {
  try {
    ensureDataFile()
    const current = readProgress()
    const merged = {
      tools: data.tools !== undefined ? data.tools : (current.tools || {}),
      tasks: data.tasks !== undefined ? data.tasks : (current.tasks || {}),
      updatedAt: Date.now()
    }
    const tempFile = `${DATA_FILE}.tmp`
    fs.writeFileSync(tempFile, JSON.stringify(merged, null, 2), 'utf8')
    fs.renameSync(tempFile, DATA_FILE)
    return merged
  } catch (err) {
    console.error('Failed writing progress file:', err)
    throw err
  }
}
