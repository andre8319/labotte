import { Router } from 'express'

const router = Router()

// Store in env var for production — for now hardcoded
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'labotte2024'

router.post('/verify', (req, res) => {
  const { password } = req.body
  if (password === ADMIN_PASSWORD) {
    res.status(200).json({ ok: true })
  } else {
    res.status(401).json({ ok: false, error: 'Password errata' })
  }
})

export default router
