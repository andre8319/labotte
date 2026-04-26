import { useState, useEffect, useRef } from 'react'
import { CAT_COLORS, CAT_META } from '../data/wines'

export default function WineCard({ wine, onClick, index }) {
  const [vis, setVis] = useState(false)
  const ref = useRef(null)
  const color = CAT_COLORS[wine.category] || '#c9a050'
  const meta  = CAT_META[wine.category]  || { icon: '🍷', label: '' }

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true) },
      { threshold: 0.08 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      onClick={() => onClick(wine)}
      className="glass-card cursor-pointer relative overflow-hidden flex flex-col group"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity .55s ${index * 0.06}s ease, transform .55s ${index * 0.06}s ease`,
      }}
    >
      {/* Top accent */}
      <div style={{ height: 2, background: `linear-gradient(90deg,${color},${color}40,transparent)` }} />

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 25%,${color}12 0%,transparent 65%)` }} />

      {/* Classification badge */}
      <span className="absolute top-3 right-3 z-10 font-sans"
        style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', padding: '2px 8px', color: 'var(--bg)', background: `linear-gradient(135deg,${color}dd,${color})` }}>
        {wine.classification}
      </span>

      {/* Bottle image — images served from /images/bottles/ */}
      <div className="relative flex justify-center items-end pt-7 pb-2" style={{ minHeight: 210 }}>
        {/* Ground glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: 90, height: 50, background: 'radial-gradient(ellipse,rgba(255,245,220,.1) 0%,transparent 70%)', borderRadius: '50%' }} />

        {wine.imageKey ? (
          <img
            src={`/images/bottles/${wine.imageKey}.png`}
            alt={wine.name}
            className="bottle-glow relative z-10"
            style={{ height: 178, width: 73, objectFit: 'contain' }}
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        ) : (
          <div className="relative z-10 flex items-center justify-center"
            style={{ width: 55, height: 178, background: `linear-gradient(180deg,${color}25,${color}08)`, borderRadius: '3px 3px 28px 28px', fontSize: 24 }}>
            {meta.icon}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-5 pt-3 pb-6 flex flex-col flex-1">
        <span className="font-sans mb-2"
          style={{ color, fontSize: '8px', fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase' }}>
          {meta.icon} {meta.label}
        </span>

        <h3 className="font-display mb-0.5 transition-colors"
          style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--cream)', lineHeight: 1.1, letterSpacing: '.02em' }}>
          {wine.name}
        </h3>
        <p className="font-display italic mb-3" style={{ color: 'var(--muted)', fontSize: '.8rem' }}>
          {wine.subtitle}
        </p>

        <div className="gold-divider mb-3" style={{ opacity: .3 }} />

        <div className="flex flex-col gap-1.5 mb-3">
          {[
            { l: 'Vitigno',  v: wine.grape },
            { l: 'Alcol',    v: wine.alcohol, gold: true },
            { l: 'Servizio', v: wine.serving },
          ].map(({ l, v, gold }) => (
            <div key={l} className="flex justify-between items-start gap-2">
              <span className="font-sans shrink-0"
                style={{ color: 'var(--muted)', fontSize: '8px', letterSpacing: '.18em', textTransform: 'uppercase', paddingTop: 1 }}>
                {l}
              </span>
              <span className="font-sans text-right"
                style={{ color: gold ? 'var(--gold)' : 'var(--cream)', fontSize: '11px', fontWeight: gold ? 600 : 400 }}>
                {v}
              </span>
            </div>
          ))}
        </div>

        <p className="font-body italic line-clamp-2 mb-4"
          style={{ color: 'rgba(245,237,214,.38)', fontSize: '.74rem', lineHeight: 1.55 }}>
          "{wine.nose}"
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5 flex-1">
          {wine.highlights?.map(h => (
            <span key={h} className="font-sans"
              style={{ fontSize: '7px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color, background: `${color}12`, padding: '2px 7px', border: `1px solid ${color}28` }}>
              {h}
            </span>
          ))}
        </div>

        <button
          className="w-full font-sans transition-all duration-250"
          style={{ border: `1px solid ${color}40`, color, background: 'transparent', fontSize: '9px', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', padding: '10px', cursor: 'pointer' }}
          onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.color = 'var(--bg)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = color }}
        >
          Scopri di più →
        </button>
      </div>
    </div>
  )
}
