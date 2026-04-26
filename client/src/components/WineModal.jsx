import { useEffect } from 'react'
import { CAT_COLORS, CAT_META } from '../data/wines'

function Row({ label, value }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-0.5 py-2.5" style={{ borderBottom: '1px solid rgba(201,160,80,.08)' }}>
      <span className="font-sans" style={{ color: 'var(--muted)', fontSize: '8px', letterSpacing: '.28em', textTransform: 'uppercase', fontWeight: 700 }}>{label}</span>
      <span className="font-body" style={{ color: 'var(--cream)', fontSize: '.87rem', lineHeight: 1.5 }}>{value}</span>
    </div>
  )
}

export default function WineModal({ wine, onClose }) {
  const color = CAT_COLORS[wine.category] || '#c9a050'
  const meta  = CAT_META[wine.category]  || { icon: '🍷', label: '' }

  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div
      className="modal-backdrop"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal-box" style={{ border: `1px solid ${color}28`, boxShadow: `0 0 70px ${color}12, 0 40px 80px rgba(0,0,0,.85)` }}>

        {/* Top bar */}
        <div style={{ height: 3, background: `linear-gradient(90deg,${color},${color}50,transparent)`, flexShrink: 0 }} />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 flex items-center justify-center transition-all duration-200"
          style={{ width: 34, height: 34, border: '1px solid rgba(201,160,80,.25)', color: 'var(--muted)', fontSize: 22, background: 'rgba(5,2,5,.85)', cursor: 'pointer' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,160,80,.25)'; e.currentTarget.style.color = 'var(--muted)' }}
        >×</button>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1">

          {/* 
            FIXED mobile layout:
            - flex-col on mobile: bottle panel full-width centered on top, details below
            - flex-row on md+: bottle left, details right
          */}
          <div className="flex flex-col md:flex-row">

            {/* ── Left: bottle panel ── */}
            <div
              className="flex-shrink-0 flex flex-col items-center w-full md:w-56"
              style={{
                background: `linear-gradient(180deg,${color}0a 0%,transparent 55%)`,
                borderBottom: '1px solid rgba(201,160,80,.1)',
                padding: '28px 20px 24px',
              }}
            >
              {/* Category badge */}
              <span className="font-sans mb-5"
                style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--bg)', background: `linear-gradient(135deg,${color}cc,${color})`, padding: '2px 12px' }}>
                {meta.icon} {meta.label}
              </span>

              {/* Bottle — centered, fixed width container */}
              <div
                className="relative flex justify-center items-end mb-5"
                style={{ height: 200, width: '100%' }}
              >
                {/* Ground glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                  style={{ width: 90, height: 45, background: 'radial-gradient(ellipse,rgba(255,245,220,.13) 0%,transparent 70%)', borderRadius: '50%' }} />

                {wine.imageKey ? (
                  <img
                    src={`/images/bottles/${wine.imageKey}.png`}
                    alt={wine.name}
                    className="bottle-glow bottle-float relative z-10"
                    style={{ height: 185, width: 76, objectFit: 'contain' }}
                    onError={e => { e.currentTarget.style.display = 'none' }}
                  />
                ) : (
                  <div className="relative z-10 flex items-center justify-center"
                    style={{ width: 60, height: 185, background: `linear-gradient(180deg,${color}28,${color}08)`, borderRadius: '3px 3px 30px 30px', fontSize: 28 }}>
                    {meta.icon}
                  </div>
                )}
              </div>

              {/* Quick stats */}
              <div className="w-full" style={{ maxWidth: 200 }}>
                {[
                  { l: 'Alcol',         v: wine.alcohol,    gold: true },
                  { l: 'Servizio',      v: wine.serving },
                  { l: 'Conservazione', v: wine.bestBefore },
                ].filter(x => x.v).map(({ l, v, gold }) => (
                  <div key={l} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid rgba(201,160,80,.08)' }}>
                    <span className="font-sans" style={{ color: 'var(--muted)', fontSize: '8px', letterSpacing: '.15em', textTransform: 'uppercase' }}>{l}</span>
                    <span className="font-sans" style={{ color: gold ? 'var(--gold)' : 'var(--cream)', fontSize: '11px', fontWeight: gold ? 600 : 400 }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-1.5 mt-4 justify-center">
                {wine.highlights?.map(h => (
                  <span key={h} className="font-sans"
                    style={{ fontSize: '7px', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color, background: `${color}12`, padding: '2px 7px', border: `1px solid ${color}28` }}>
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Right: details ── */}
            <div className="flex-1 overflow-y-auto p-7 md:p-9">
              <p className="font-sans mb-1" style={{ color, fontSize: '9px', fontWeight: 700, letterSpacing: '.35em', textTransform: 'uppercase' }}>
                {wine.classification}
              </p>
              <h2 className="font-display mb-1" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 600, color: 'var(--cream)', lineHeight: 1.05 }}>
                {wine.name}
              </h2>
              <p className="font-display italic mb-5" style={{ color: 'var(--muted)', fontSize: '1rem' }}>
                {wine.subtitle}
              </p>

              <div className="gold-divider mb-5" />

              <p className="font-body mb-6"
                style={{ color: 'rgba(245,237,214,.7)', fontSize: '.9rem', lineHeight: 1.85, fontStyle: 'italic', borderLeft: `2px solid ${color}50`, paddingLeft: 14 }}>
                {wine.description}
              </p>

              <h4 className="font-sans mb-2" style={{ color: 'var(--gold)', fontSize: '8px', fontWeight: 700, letterSpacing: '.45em', textTransform: 'uppercase' }}>
                Scheda Tecnica
              </h4>
              <Row label="Vitigno"                value={wine.grape} />
              <Row label="Colore"                 value={wine.colorDesc} />
              <Row label="Profumo"                value={wine.nose} />
              <Row label="Sapore"                 value={wine.palate} />
              <Row label="Affinamento"            value={wine.aging} />
              <Row label="Terreno e posizione"    value={wine.terrain} />
              <Row label="Temperatura di servizio" value={wine.serving} />
              <Row label="Periodo ottimale"       value={wine.bestBefore} />
              <Row label="Abbinamenti"            value={wine.pairings} />
              <Row label="Bottiglia"              value={wine.bottle} />

              <div className="mt-6">
                <button
                  onClick={onClose}
                  className="font-sans transition-all duration-250"
                  style={{ background: `linear-gradient(135deg,${color},${color}aa)`, color: 'var(--bg)', fontSize: '9px', fontWeight: 700, letterSpacing: '.25em', textTransform: 'uppercase', padding: '12px 28px', border: 'none', cursor: 'pointer', boxShadow: `0 4px 20px ${color}35` }}>
                  ← Torna ai Vini
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
