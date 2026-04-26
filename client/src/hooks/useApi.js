import { useState, useEffect, useCallback } from 'react'

const API = '/api'

export function useWines() {
  const [customWines, setCustomWines] = useState([])
  const [loading, setLoading] = useState(true)

  const fetch_ = useCallback(async () => {
    try {
      const res = await fetch(`${API}/wines`)
      if (res.ok) setCustomWines(await res.json())
    } catch { /* server not running – fine in prod-static mode */ }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetch_() }, [fetch_])

  const addWine = async (wine) => {
    try {
      const res = await fetch(`${API}/wines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wine),
      })
      if (res.ok) { const w = await res.json(); setCustomWines(p => [...p, w]) }
    } catch (e) { console.error(e) }
  }

  const deleteWine = async (id) => {
    try {
      await fetch(`${API}/wines/${id}`, { method: 'DELETE' })
      setCustomWines(p => p.filter(w => w.id !== id))
    } catch (e) { console.error(e) }
  }

  return { customWines, loading, addWine, deleteWine, refetch: fetch_ }
}

export function useArticles() {
  const [customArticles, setCustomArticles] = useState([])

  useEffect(() => {
    fetch(`${API}/articles`)
      .then(r => r.ok ? r.json() : [])
      .then(setCustomArticles)
      .catch(() => {})
  }, [])

  const addArticle = async (article) => {
    try {
      const res = await fetch(`${API}/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      })
      if (res.ok) { const a = await res.json(); setCustomArticles(p => [...p, a]) }
    } catch (e) { console.error(e) }
  }

  const deleteArticle = async (id) => {
    try {
      await fetch(`${API}/articles/${id}`, { method: 'DELETE' })
      setCustomArticles(p => p.filter(a => a.id !== id))
    } catch (e) { console.error(e) }
  }

  return { customArticles, addArticle, deleteArticle }
}

export async function verifyAdminPassword(password) {
  try {
    const res = await fetch(`${API}/auth/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    return res.ok
  } catch { return false }
}
