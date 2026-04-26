import { useRef, useEffect, useState } from 'react'
import { PRENOTAZIONE_ITEMS } from '../data/wines'

function PrenCard({ item, index }) {
  const [vis, setVis] = useState(false)
  const ref = useRef(null)
  const isMag = item.format === '1,5 L'

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center relative"
      style={{
        padding: '28px 16px 22px',
        border: '1px solid rgba(201,160,80,.12)',
        background: 'rgba(15,6,18,.6)',
        transition: 'all .3s',
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${index * 0.05}s`,
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,160,80,.4)'; e.currentTarget.style.background = 'rgba(20,8,24,.85)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,160,80,.12)'; e.currentTarget.style.background = 'rgba(15,6,18,.6)' }}
    >
      <span className="absolute top-2 left-2 font-sans"
        style={{
          fontSize: '8px', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase',
          padding: '2px 8px',
          color: isMag ? 'var(--bg)' : 'var(--cream)',
          background: isMag ? 'linear-gradient(135deg,var(--gold),var(--gold-dark))' : 'rgba(201,160,80,.12)',
          border: isMag ? 'none' : '1px solid rgba(201,160,80,.25)',
        }}>
        {item.format}
      </span>

      <div className="relative flex justify-center items-end mb-3" style={{ height: 118, width: '100%' }}>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: 60, height: 30, background: 'radial-gradient(ellipse,rgba(255,245,220,.09) 0%,transparent 70%)', borderRadius: '50%' }} />
        {item.imageKey ? (
          <img src={`/images/bottles/${item.imageKey}.png`} alt={item.name}
            className="bottle-glow relative z-10"
            style={{ height: 108, width: 44, objectFit: 'contain' }}
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        ) : (
          <div style={{ width: 36, height: 108, background: 'linear-gradient(180deg,rgba(201,160,80,.2),rgba(201,160,80,.05))', borderRadius: '2px 2px 18px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🍷</div>
        )}
      </div>

      <h4 className="font-display mb-1" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--cream)', lineHeight: 1.2 }}>{item.name}</h4>
      <p className="font-display italic" style={{ color: 'var(--muted)', fontSize: '.72rem' }}>{item.type}</p>
    </div>
  )
}

export default function PrenotazioneSection() {
  return (
    <section id="prenotazione" className="py-24 px-4 md:px-8 relative" style={{ borderTop: '1px solid rgba(201,160,80,.1)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%,rgba(201,160,80,.04) 0%,transparent 60%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg,transparent,var(--gold))' }} />
            <span className="font-sans" style={{ color: 'var(--gold)', fontSize: '9px', fontWeight: 700, letterSpacing: '.5em', textTransform: 'uppercase' }}>Formati Esclusivi</span>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg,var(--gold),transparent)' }} />
          </div>
          <h2 className="font-display mb-3" style={{ fontSize: 'clamp(2.2rem,4.5vw,3.5rem)', fontWeight: 300, color: 'var(--cream)', letterSpacing: '.04em' }}>
            Solo su Prenotazione
          </h2>
          <div className="gold-divider mx-auto mb-5" style={{ width: 70 }} />
          <p className="font-body italic mx-auto" style={{ color: 'rgba(245,237,214,.45)', fontSize: '.93rem', maxWidth: 560, lineHeight: 1.8 }}>
            Mezze Bottiglie (0,375 L) per momenti intimi, Magnum (1,5 L) per le grandi occasioni.
            Perfetti come confezioni regalo.
          </p>
        </div>

        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(155px,1fr))' }}>
          {PRENOTAZIONE_ITEMS.map((item, i) => <PrenCard key={item.name} item={item} index={i} />)}
        </div>

        <div className="text-center mt-12">
          <p className="font-body italic mb-3" style={{ color: 'rgba(245,237,214,.35)', fontSize: '.88rem' }}>
            Disponibilità stagionale · ideali per confezioni regalo · visita il negozio
          </p>
          <span className="gold-text font-display" style={{ fontSize: '1.1rem', fontWeight: 600 }}>
            La Botte · Chiavazza, Biella
          </span>
        </div>
      </div>
    </section>
  )
}
