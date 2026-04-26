import { Router } from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.join(__dirname, '../data/custom_wines.json')
const router = Router()

const read  = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
const write = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))

// GET all custom wines
router.get('/', (req, res) => {
  try { res.json(read()) }
  catch { res.json([]) }
})

// POST new wine
router.post('/', (req, res) => {
  try {
    const wines = read()
    const wine = { ...req.body, id: `custom_${Date.now()}` }
    wines.push(wine)
    write(wines)
    res.status(201).json(wine)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// DELETE wine by id
router.delete('/:id', (req, res) => {
  try {
    const wines = read().filter(w => w.id !== req.params.id)
    write(wines)
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// PUT update wine (future use)
router.put('/:id', (req, res) => {
  try {
    const wines = read()
    const idx = wines.findIndex(w => w.id === req.params.id)
    if (idx === -1) return res.status(404).json({ error: 'Not found' })
    wines[idx] = { ...wines[idx], ...req.body }
    write(wines)
    res.json(wines[idx])
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router
