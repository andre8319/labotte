import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import winesRouter from './routes/wines.js'
import articlesRouter from './routes/articles.js'
import authRouter from './routes/auth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// API routes
app.use('/api/wines',    winesRouter)
app.use('/api/articles', articlesRouter)
app.use('/api/auth',     authRouter)

// Serve built React app in production
app.use(express.static(path.join(__dirname, 'public')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`✅ La Botte server running on http://localhost:${PORT}`)
  console.log(`   API:    http://localhost:${PORT}/api`)
  console.log(`   Client: http://localhost:5173  (npm run dev)`)
})
