import { useState } from 'react'
import { DEFAULT_ARTICLES } from '../data/wines'
import { useArticles } from '../hooks/useApi'

const CAT_ICONS = { Abbinamenti: '🍽️', Degustazione: '👃', Guide: '📖', Spumanti: '🥂', Curiosità: '✨' }

function ArticleCard({ art }) {
  const [open, setOpen] = useState(false)
  const icon = CAT_ICONS[art.category] || '📰'

  return (
    <div
      className="flex flex-col overflow-hidden transition-all duration-350 cursor-pointer"
      style={{ border: '1px solid rgba(201,160,80,.13)', background: 'rgba(16,6,12,.7)' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,160,80,.4)'; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,.5)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,160,80,.13)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
      onClick={() => setOpen(v => !v)}
    >
      {/* Thumb */}
      <div className="relative flex items-center justify-center overflow-hidden" style={{ height: 130, background: 'linear-gradient(135deg,rgba(60,15,30,.9),rgba(20,8,16,.9))' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 40%,rgba(201,160,80,.06),transparent 60%)' }} />
        <span style={{ fontSize: 38, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.5))' }}>{icon}</span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="font-sans" style={{ color: 'var(--gold)', fontSize: '8px', fontWeight: 700, letterSpacing: '.25em', textTransform: 'uppercase' }}>{art.category}</span>
          <span className="font-sans" style={{ color: 'var(--muted)', fontSize: '8px' }}>{art.readTime}</span>
        </div>
        <h3 className="font-display mb-2" style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--cream)', lineHeight: 1.2 }}>{art.title}</h3>
        <p className="font-body italic flex-1" style={{ color: 'rgba(245,237,214,.45)', fontSize: '.79rem', lineHeight: 1.6 }}>{art.excerpt}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="font-sans" style={{ color: 'var(--muted)', fontSize: '8px' }}>{art.date}</span>
          <span className="font-sans" style={{ color: 'var(--gold)', fontSize: '9px', fontWeight: 700, letterSpacing: '.15em' }}>
            {open ? 'Chiudi ↑' : 'Leggi →'}
          </span>
        </div>
      </div>

      {/* Expanded */}
      {open && (
        <div className="px-5 pb-5" style={{ borderTop: '1px solid rgba(201,160,80,.1)' }}>
          <div className="gold-divider my-4" />
          {art.content?.split('\n\n').map((para, i) => {
            const isBold = para.startsWith('**')
            const text = para.replace(/\*\*(.*?)\*\*/g, '$1')
            return (
              <p key={i} className="font-body mb-3"
                style={{ color: 'rgba(245,237,214,.72)', fontSize: '.85rem', lineHeight: 1.85, fontWeight: isBold ? 600 : 400, fontStyle: isBold ? 'normal' : 'italic' }}>
                {text}
              </p>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function NewsletterSection() {
  const { customArticles } = useArticles()
  const allArticles = [...DEFAULT_ARTICLES, ...customArticles]
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = () => {
    if (email.includes('@')) { setSent(true); setEmail('') }
  }

  return (
    <section id="newsletter" className="py-24 px-4 md:px-8 relative" style={{ borderTop: '1px solid rgba(201,160,80,.1)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 50%,rgba(30,10,20,.8) 0%,transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg,transparent,var(--gold))' }} />
            <span className="font-sans" style={{ color: 'var(--gold)', fontSize: '9px', fontWeight: 700, letterSpacing: '.5em', textTransform: 'uppercase' }}>Dal Mondo del Vino</span>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg,var(--gold),transparent)' }} />
          </div>
          <h2 className="font-display mb-3" style={{ fontSize: 'clamp(2.2rem,4.5vw,3.5rem)', fontWeight: 300, color: 'var(--cream)', letterSpacing: '.04em' }}>
            Newsletter
          </h2>
          <div className="gold-divider mx-auto mb-4" style={{ width: 70 }} />
          <p className="font-body italic mx-auto" style={{ color: 'rgba(245,237,214,.45)', fontSize: '.93rem', maxWidth: 500, lineHeight: 1.8 }}>
            Guide all'abbinamento, consigli di degustazione e storie dal mondo del vino piemontese.
          </p>
        </div>

        {/* Articles grid */}
        <div className="grid gap-5 mb-16" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))' }}>
          {allArticles.map(art => <ArticleCard key={art.id} art={art} />)}
        </div>

        {/* Email signup */}
        <div className="mx-auto text-center relative overflow-hidden p-10 md:p-12"
          style={{ maxWidth: 520, border: '1px solid rgba(201,160,80,.15)', background: 'rgba(12,5,10,.7)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(201,160,80,.05) 0%,transparent 60%)' }} />
          <div className="relative z-10">
            <h3 className="font-display mb-2" style={{ fontSize: '1.8rem', fontWeight: 300, color: 'var(--cream)', letterSpacing: '.05em' }}>
              Rimani Informato
            </h3>
            <p className="font-body italic mb-6" style={{ color: 'rgba(245,237,214,.45)', fontSize: '.85rem', lineHeight: 1.7 }}>
              Inserisci la tua email e riceverai aggiornamenti sulle nuove selezioni e consigli dal mondo del vino.
            </p>
            {sent ? (
              <p className="font-display italic" style={{ color: 'var(--gold)', fontSize: '1.1rem' }}>✓ Grazie! Sei iscritto alla newsletter.</p>
            ) : (
              <div className="flex flex-wrap gap-2 justify-center">
                <input
                  type="email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && submit()}
                  placeholder="la-tua@email.it"
                  className="flex-1 px-4 py-3 text-sm"
                  style={{ minWidth: 190, background: 'rgba(5,2,5,.9)', border: '1px solid rgba(201,160,80,.3)', color: 'var(--cream)', fontFamily: 'Raleway,sans-serif' }}
                />
                <button
                  onClick={submit}
                  className="font-sans transition-all duration-300"
                  style={{ padding: '12px 24px', background: 'linear-gradient(135deg,var(--gold),var(--gold-dark))', color: 'var(--bg)', fontSize: '10px', fontWeight: 700, letterSpacing: '.25em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,160,80,.4)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  Iscriviti
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
