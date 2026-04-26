import { Router } from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.join(__dirname, '../data/articles.json')
const router = Router()

const read  = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
const write = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))

router.get('/', (req, res) => {
  try { res.json(read()) }
  catch { res.json([]) }
})

router.post('/', (req, res) => {
  try {
    const articles = read()
    const article = {
      ...req.body,
      id: `custom_${Date.now()}`,
      date: new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' }),
    }
    articles.push(article)
    write(articles)
    res.status(201).json(article)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.delete('/:id', (req, res) => {
  try {
    const articles = read().filter(a => a.id !== req.params.id)
    write(articles)
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router
