import { useEffect, useRef } from 'react'

const HERO_STATS = [
  { v: '16+',     l: 'Etichette Selezionate' },
  { v: 'DOC·DOCG', l: 'Denominazioni' },
  { v: 'Biella',   l: 'Chiavazza, Piemonte' },
  { v: 'Regalo',   l: 'Confezioni' },
]

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    let w = cv.width = window.innerWidth
    let h = cv.height = window.innerHeight
    let animId

    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.22,
      vy: -Math.random() * 0.38 - 0.08,
      a: Math.random() * 0.42 + 0.08,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w }
        if (p.x < -5) p.x = w + 5
        if (p.x > w + 5) p.x = -5
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,160,80,${p.a})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => { w = cv.width = window.innerWidth; h = cv.height = window.innerHeight }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
  }, [])

  const scrollToVini = () => document.getElementById('vini')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToPren = () => document.getElementById('prenotazione')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '100vh' }}>

      {/* Background */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 90% 70% at 50% 45%,rgba(55,8,25,.85) 0%,transparent 65%),linear-gradient(160deg,#060106 0%,#0e0508 35%,#140810 65%,#080306 100%)',
      }} />

      {/* Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: .65 }} />

      {/* Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: .04 }}>
        <defs><pattern id="g" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M 80 0 L 0 0 0 80" fill="none" stroke="#c9a050" strokeWidth=".4" /></pattern></defs>
        <rect width="100%" height="100%" fill="url(#g)" />
      </svg>

      {/* Decorative rings */}
      {[700, 510, 340].map((s, i) => (
        <div key={s} className="absolute pointer-events-none" style={{ width: s, height: s, border: `1px solid rgba(201,160,80,${.04 + i * .02})`, borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        {/* Eyebrow — FIXED: CHIAVAZZA - BIELLA */}
        <div className="anim-fade-up delay-1 flex items-center justify-center gap-4 mb-6">
          <div style={{ width: 50, height: 1, background: 'linear-gradient(90deg,transparent,var(--gold))' }} />
          <span className="font-sans" style={{ color: 'var(--gold)', fontSize: '9px', fontWeight: 700, letterSpacing: '.5em', textTransform: 'uppercase' }}>
            CHIAVAZZA - BIELLA
          </span>
          <div style={{ width: 50, height: 1, background: 'linear-gradient(90deg,var(--gold),transparent)' }} />
        </div>

        {/* Title */}
        <h1 className="anim-fade-up delay-2 gold-text font-display" style={{ fontSize: 'clamp(4rem,10vw,8.5rem)', fontWeight: 300, letterSpacing: '.08em', lineHeight: .95, marginBottom: '.15em' }}>
          La Botte
        </h1>

        {/* Tagline */}
        <p className="anim-fade-up delay-3 font-display" style={{ color: 'rgba(245,237,214,.5)', fontSize: 'clamp(1rem,2.5vw,1.4rem)', fontStyle: 'italic', fontWeight: 300, letterSpacing: '.12em', marginBottom: '1.8rem' }}>
          Vino · Birra Menabrea · Grappe · Liquori · Confezioni Regalo
        </p>

        <div className="anim-fade-up delay-3 gold-divider mx-auto mb-7" style={{ width: 100 }} />

        {/* Description — FIXED: nel cuore di Chiavazza */}
        <p className="anim-fade-up delay-4 font-body mx-auto" style={{ color: 'rgba(245,237,214,.48)', fontSize: 'clamp(.85rem,1.5vw,1rem)', lineHeight: 1.95, maxWidth: 540, fontStyle: 'italic' }}>
          Un negozio di eccellenza nel cuore di Chiavazza. Selezioni curate di vini piemontesi,
          bollicine, grappe e liquori per ogni occasione. Dove la tradizione incontra il gusto.
        </p>

        {/* Stats — FIXED: relevant to La Botte */}
        <div className="anim-fade-up delay-5 flex items-center justify-center flex-wrap mt-10" style={{ gap: 'clamp(20px,5vw,40px)' }}>
          {HERO_STATS.map(({ v, l }) => (
            <div key={l} className="flex flex-col items-center gap-1">
              <span className="gold-text font-display" style={{ fontSize: 'clamp(1.2rem,2.5vw,1.7rem)', fontWeight: 600 }}>{v}</span>
              <span className="font-sans" style={{ color: 'var(--muted)', fontSize: '8px', fontWeight: 700, letterSpacing: '.25em', textTransform: 'uppercase' }}>{l}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="anim-fade-up delay-6 flex items-center justify-center flex-wrap gap-4 mt-10">
          <button
            onClick={scrollToVini}
            className="font-sans transition-all duration-300"
            style={{ background: 'linear-gradient(135deg,var(--gold),var(--gold-dark))', color: 'var(--bg)', fontSize: '10px', fontWeight: 700, letterSpacing: '.3em', textTransform: 'uppercase', padding: '14px 36px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 30px rgba(201,160,80,.3)' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 40px rgba(201,160,80,.5)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 30px rgba(201,160,80,.3)'}
          >
            Scopri la Selezione
          </button>
          <button
            onClick={scrollToPren}
            className="font-sans transition-all duration-300"
            style={{ border: '1px solid rgba(201,160,80,.35)', color: 'var(--cream)', background: 'transparent', fontSize: '10px', fontWeight: 700, letterSpacing: '.3em', textTransform: 'uppercase', padding: '14px 36px', cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,160,80,.35)'; e.currentTarget.style.color = 'var(--cream)' }}
          >
            ★ Magnum & Prenotazioni
          </button>
        </div>
      </div>

      {/* Scroll indicator — FIXED: bottom-right, vertical, readable */}
      <div
        className="absolute pointer-events-none flex flex-col items-center gap-2"
        style={{ bottom: 32, right: 32, animation: 'pulse 2.5s ease-in-out infinite' }}
      >
        <span className="font-sans" style={{
          color: 'rgba(201,160,80,.6)', fontSize: '8px', letterSpacing: '.4em', textTransform: 'uppercase',
          writingMode: 'vertical-rl', textOrientation: 'mixed',
        }}>
          Scorri
        </span>
        <div style={{ width: 1, height: 48, background: 'linear-gradient(180deg,rgba(201,160,80,.6),transparent)' }} />
      </div>
    </section>
  )
}
