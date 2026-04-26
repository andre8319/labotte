import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWines, useArticles, verifyAdminPassword } from '../hooks/useApi'
import { CATEGORIES } from '../data/wines'

const gold = '#c9a050'
const bg   = '#050205'

/* ── reusable field styles ── */
const inputCls = {
  width: '100%', padding: '10px 14px', marginBottom: 10,
  background: 'rgba(5,2,5,.85)', border: '1px solid rgba(201,160,80,.25)',
  color: '#f5edd6', fontFamily: 'Raleway,sans-serif', fontSize: 13,
}
const labelCls = {
  display: 'block', color: '#8a7060', fontSize: '8px', fontWeight: 700,
  letterSpacing: '.25em', textTransform: 'uppercase', marginBottom: 4,
  fontFamily: 'Raleway,sans-serif',
}
const tabBtn = (active) => ({
  padding: '9px 18px',
  border: `1px solid ${active ? gold : 'rgba(201,160,80,.2)'}`,
  background: active ? gold : 'transparent',
  color: active ? bg : '#8a7060',
  fontSize: '9px', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase',
  cursor: 'pointer', fontFamily: 'Raleway,sans-serif', transition: 'all .2s',
})

/* ── Wine form defaults ── */
const WINE_DEFAULTS = {
  name: '', subtitle: '', classification: 'DOC', category: 'rosso', cantina: 'Teo Costa',
  alcohol: '', grape: '', nose: '', palate: '', serving: '', aging: '',
  bestBefore: '', description: '', pairings: '', highlights: '', imageKey: '',
}
/* ── Article form defaults ── */
const ART_DEFAULTS = {
  title: '', category: 'Guide', excerpt: '', content: '', readTime: '4 min',
}

/* ────────────────────────────────────────────────────────────── */
export default function Admin() {
  const navigate = useNavigate()
  const [auth,   setAuth]   = useState(false)
  const [pwd,    setPwd]    = useState('')
  const [err,    setErr]    = useState('')
  const [tab,    setTab]    = useState('wines')
  const [flash,  setFlash_] = useState('')

  const { customWines, loading: wLoading, addWine, deleteWine } = useWines()
  const { customArticles, addArticle, deleteArticle } = useArticles()

  const [wForm, setWForm] = useState(WINE_DEFAULTS)
  const [aForm, setAForm] = useState(ART_DEFAULTS)

  const showFlash = (msg) => { setFlash_(msg); setTimeout(() => setFlash_(''), 3000) }

  /* ── Password check ── */
  const handleLogin = async () => {
    const ok = await verifyAdminPassword(pwd)
    if (ok) { setAuth(true); setErr('') }
    else setErr('Password errata')
  }

  /* ── Add wine ── */
  const submitWine = async () => {
    if (!wForm.name) { showFlash('❌ Inserisci almeno il nome'); return }
    const wine = {
      ...wForm,
      highlights: wForm.highlights.split(',').map(h => h.trim()).filter(Boolean),
    }
    await addWine(wine)
    setWForm(WINE_DEFAULTS)
    showFlash('✓ Vino aggiunto con successo!')
  }

  /* ── Add article ── */
  const submitArticle = async () => {
    if (!aForm.title) { showFlash('❌ Inserisci il titolo'); return }
    await addArticle(aForm)
    setAForm(ART_DEFAULTS)
    showFlash('✓ Articolo pubblicato!')
  }

  /* ────── Login screen ────── */
  if (!auth) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: bg, padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 380, border: '1px solid rgba(201,160,80,.2)', background: 'rgba(12,4,10,.95)', padding: '44px 36px', textAlign: 'center' }}>
        <div style={{ height: 2, background: `linear-gradient(90deg,transparent,${gold},transparent)`, marginBottom: 32 }} />
        <h2 className="gold-text font-display" style={{ fontSize: '2rem', fontWeight: 300, marginBottom: 6 }}>La Botte</h2>
        <p className="font-sans" style={{ color: '#8a7060', fontSize: '9px', letterSpacing: '.35em', textTransform: 'uppercase', marginBottom: 28 }}>Area Amministrativa</p>

        <input
          type="password" value={pwd}
          onChange={e => setPwd(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          placeholder="Password admin"
          style={{ ...inputCls, textAlign: 'center', marginBottom: 12 }}
        />
        <button
          onClick={handleLogin}
          className="font-sans w-full"
          style={{ padding: '13px', background: `linear-gradient(135deg,${gold},#a8803a)`, color: bg, fontSize: '10px', fontWeight: 700, letterSpacing: '.3em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', marginBottom: 12 }}>
          Accedi
        </button>
        {err && <p style={{ color: '#e05050', fontSize: 12, fontFamily: 'Raleway,sans-serif', marginBottom: 8 }}>{err}</p>}

        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#8a7060', fontSize: '10px', cursor: 'pointer', fontFamily: 'Raleway,sans-serif', letterSpacing: '.15em', marginTop: 4 }}>
          ← Torna al sito
        </button>
      </div>
    </div>
  )

  /* ────── Admin dashboard ────── */
  return (
    <div style={{ minHeight: '100vh', background: bg, color: '#f5edd6' }}>

      {/* Top bar */}
      <div style={{ borderBottom: '1px solid rgba(201,160,80,.15)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(8,3,10,.97)', position: 'sticky', top: 0, zIndex: 10 }}>
        <span className="gold-text font-display" style={{ fontSize: '1.35rem', fontWeight: 600 }}>Admin – La Botte</span>
        <button onClick={() => navigate('/')}
          style={{ background: 'none', border: '1px solid rgba(201,160,80,.3)', color: '#8a7060', fontSize: '9px', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', padding: '7px 14px', cursor: 'pointer', fontFamily: 'Raleway,sans-serif' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = gold }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,160,80,.3)'; e.currentTarget.style.color = '#8a7060' }}>
          ← Torna al Sito
        </button>
      </div>

      <div style={{ maxWidth: 1020, margin: '0 auto', padding: '32px 20px' }}>

        {/* Flash message */}
        {flash && (
          <div style={{ marginBottom: 20, padding: '10px 16px', border: `1px solid ${flash.startsWith('✓') ? 'rgba(60,180,60,.4)' : 'rgba(220,60,60,.4)'}`, color: flash.startsWith('✓') ? '#80e080' : '#e08080', fontSize: 13, fontFamily: 'Raleway,sans-serif' }}>
            {flash}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
          {[
            ['wines',       '🍷 Vini Personalizzati'],
            ['add_wine',    '+ Aggiungi Vino'],
            ['articles',    '📰 Articoli Newsletter'],
            ['add_article', '+ Nuovo Articolo'],
          ].map(([id, lbl]) => (
            <button key={id} onClick={() => setTab(id)} style={tabBtn(tab === id)}>{lbl}</button>
          ))}
        </div>

        {/* ──── Tab: List wines ──── */}
        {tab === 'wines' && (
          <div>
            <h3 className="font-display mb-4" style={{ color: '#f5edd6', fontSize: '1.5rem', fontWeight: 300 }}>
              Vini personalizzati ({customWines.length})
            </h3>
            {wLoading && <p className="font-body italic" style={{ color: '#8a7060' }}>Caricamento…</p>}
            {!wLoading && customWines.length === 0 && (
              <p className="font-body italic" style={{ color: '#8a7060' }}>
                Nessun vino personalizzato. Usa "Aggiungi Vino" per aggiungerne uno.
              </p>
            )}
            {customWines.map(w => (
              <div key={w.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid rgba(201,160,80,.15)', marginBottom: 8, background: 'rgba(12,5,10,.6)' }}>
                <div>
                  <span className="font-sans" style={{ color: '#f5edd6', fontWeight: 600, fontSize: 13 }}>{w.name}</span>
                  <span className="font-sans" style={{ color: '#8a7060', fontSize: 11, marginLeft: 10 }}>
                    {w.cantina} · {CATEGORIES.find(c => c.id === w.category)?.label || w.category}
                  </span>
                </div>
                <button
                  onClick={() => { if (window.confirm(`Eliminare "${w.name}"?`)) deleteWine(w.id) }}
                  style={{ background: 'none', border: '1px solid rgba(220,60,60,.3)', color: '#e08080', fontSize: '9px', fontWeight: 700, letterSpacing: '.15em', padding: '5px 10px', cursor: 'pointer', fontFamily: 'Raleway,sans-serif' }}>
                  Elimina
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ──── Tab: Add wine ──── */}
        {tab === 'add_wine' && (
          <div>
            <h3 className="font-display mb-5" style={{ color: '#f5edd6', fontSize: '1.5rem', fontWeight: 300 }}>Aggiungi un Vino</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '0 20px' }}>
              {[
                ['name',           'Nome vino *'],
                ['subtitle',       'Sottotitolo (es. Langhe Dolcetto)'],
                ['cantina',        'Cantina (es. Teo Costa, oppure nuova)'],
                ['classification', 'Denominazione (DOC, DOCG, ecc.)'],
                ['alcohol',        'Alcol (es. 13,5%)'],
                ['grape',          'Vitigno (es. Nebbiolo 100%)'],
                ['serving',        'Temperatura di servizio'],
                ['aging',          'Affinamento'],
                ['bestBefore',     'Periodo ottimale'],
                ['pairings',       'Abbinamenti consigliati'],
                ['imageKey',       'Nome immagine senza .png (es. trifulot)'],
              ].map(([k, lbl]) => (
                <div key={k}>
                  <label style={labelCls}>{lbl}</label>
                  <input value={wForm[k]} onChange={e => setWForm(f => ({ ...f, [k]: e.target.value }))} style={inputCls} />
                </div>
              ))}

              <div>
                <label style={labelCls}>Categoria</label>
                <select value={wForm.category} onChange={e => setWForm(f => ({ ...f, category: e.target.value }))}
                  style={{ ...inputCls, cursor: 'pointer' }}>
                  {CATEGORIES.slice(1).map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>

              <div>
                <label style={labelCls}>Highlights (separate da virgola)</label>
                <input value={wForm.highlights} onChange={e => setWForm(f => ({ ...f, highlights: e.target.value }))}
                  placeholder="es. DOCG, Longevo, Elegante" style={inputCls} />
              </div>
            </div>

            <div style={{ marginTop: 4 }}>
              <label style={labelCls}>Descrizione</label>
              <textarea value={wForm.description} onChange={e => setWForm(f => ({ ...f, description: e.target.value }))}
                rows={3} style={{ ...inputCls, resize: 'vertical' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              <div>
                <label style={labelCls}>Profumo</label>
                <input value={wForm.nose} onChange={e => setWForm(f => ({ ...f, nose: e.target.value }))} style={inputCls} />
              </div>
              <div>
                <label style={labelCls}>Sapore</label>
                <input value={wForm.palate} onChange={e => setWForm(f => ({ ...f, palate: e.target.value }))} style={inputCls} />
              </div>
            </div>

            <div style={{ marginTop: 8, padding: '12px 16px', background: 'rgba(201,160,80,.06)', border: '1px solid rgba(201,160,80,.15)', marginBottom: 16 }}>
              <p className="font-sans" style={{ color: '#8a7060', fontSize: '11px', lineHeight: 1.6 }}>
                💡 <strong style={{ color: gold }}>Nuova cantina?</strong> Scrivi il nome della cantina nel campo "Cantina" (es. "Cantina XYZ").
                Apparirà automaticamente raggruppata nella griglia vini.
                Per aggiungere l'immagine della bottiglia, copia il file <code style={{ color: gold }}>nomefile.png</code> nella cartella
                <code style={{ color: gold }}> client/public/images/bottles/</code> e scrivi <code style={{ color: gold }}>nomefile</code> nel campo "Nome immagine".
              </p>
            </div>

            <button onClick={submitWine}
              style={{ padding: '13px 36px', background: `linear-gradient(135deg,${gold},#a8803a)`, color: bg, fontSize: '10px', fontWeight: 700, letterSpacing: '.3em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'Raleway,sans-serif' }}>
              + Aggiungi Vino
            </button>
          </div>
        )}

        {/* ──── Tab: List articles ──── */}
        {tab === 'articles' && (
          <div>
            <h3 className="font-display mb-4" style={{ color: '#f5edd6', fontSize: '1.5rem', fontWeight: 300 }}>
              Articoli personalizzati ({customArticles.length})
            </h3>
            {customArticles.length === 0 ? (
              <p className="font-body italic" style={{ color: '#8a7060' }}>Nessun articolo aggiunto. Usa "Nuovo Articolo".</p>
            ) : customArticles.map(a => (
              <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid rgba(201,160,80,.15)', marginBottom: 8, background: 'rgba(12,5,10,.6)' }}>
                <div>
                  <span className="font-sans" style={{ color: '#f5edd6', fontWeight: 600, fontSize: 13 }}>{a.title}</span>
                  <span className="font-sans" style={{ color: '#8a7060', fontSize: 11, marginLeft: 10 }}>{a.category} · {a.date}</span>
                </div>
                <button
                  onClick={() => { if (window.confirm(`Eliminare "${a.title}"?`)) deleteArticle(a.id) }}
                  style={{ background: 'none', border: '1px solid rgba(220,60,60,.3)', color: '#e08080', fontSize: '9px', fontWeight: 700, letterSpacing: '.15em', padding: '5px 10px', cursor: 'pointer', fontFamily: 'Raleway,sans-serif' }}>
                  Elimina
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ──── Tab: Add article ──── */}
        {tab === 'add_article' && (
          <div>
            <h3 className="font-display mb-5" style={{ color: '#f5edd6', fontSize: '1.5rem', fontWeight: 300 }}>Nuovo Articolo Newsletter</h3>

            <label style={labelCls}>Titolo *</label>
            <input value={aForm.title} onChange={e => setAForm(f => ({ ...f, title: e.target.value }))} style={inputCls} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              <div>
                <label style={labelCls}>Categoria</label>
                <select value={aForm.category} onChange={e => setAForm(f => ({ ...f, category: e.target.value }))}
                  style={{ ...inputCls, cursor: 'pointer' }}>
                  {['Abbinamenti', 'Degustazione', 'Guide', 'Spumanti', 'Curiosità'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelCls}>Tempo di lettura</label>
                <input value={aForm.readTime} onChange={e => setAForm(f => ({ ...f, readTime: e.target.value }))}
                  placeholder="es. 4 min" style={inputCls} />
              </div>
            </div>

            <label style={labelCls}>Estratto (breve descrizione)</label>
            <input value={aForm.excerpt} onChange={e => setAForm(f => ({ ...f, excerpt: e.target.value }))} style={inputCls} />

            <label style={labelCls}>Contenuto completo (doppio invio = nuovo paragrafo · **testo** = grassetto)</label>
            <textarea value={aForm.content} onChange={e => setAForm(f => ({ ...f, content: e.target.value }))}
              rows={10} style={{ ...inputCls, resize: 'vertical' }} />

            <button onClick={submitArticle}
              style={{ marginTop: 8, padding: '13px 36px', background: `linear-gradient(135deg,${gold},#a8803a)`, color: bg, fontSize: '10px', fontWeight: 700, letterSpacing: '.3em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'Raleway,sans-serif' }}>
              + Pubblica Articolo
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
