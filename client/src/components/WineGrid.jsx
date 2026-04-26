import WineCard from './WineCard'
import { CATEGORIES, CAT_COLORS } from '../data/wines'

export default function WineGrid({ wines, activeCategory, onCategoryChange, onSelectWine }) {
  return (
    <section id="vini" className="py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg,transparent,var(--gold))' }} />
            <span className="font-sans" style={{ color: 'var(--gold)', fontSize: '9px', fontWeight: 700, letterSpacing: '.5em', textTransform: 'uppercase' }}>
              Cantina Teo Costa
            </span>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg,var(--gold),transparent)' }} />
          </div>
          <h2 className="font-display mb-2" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, color: 'var(--cream)', letterSpacing: '.04em' }}>
            Selezione Teo Costa
          </h2>
          <p className="font-display italic mb-5" style={{ color: 'var(--muted)', fontSize: '1rem' }}>
            Castellinaldo d'Alba · Roero e Langhe · Piemonte
          </p>
          <div className="gold-divider mx-auto" style={{ width: 80 }} />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {CATEGORIES.map(cat => {
            const isA = activeCategory === cat.id
            const c = CAT_COLORS[cat.id] || 'var(--gold)'
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className="font-sans transition-all duration-250"
                style={{
                  fontSize: '9px', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase',
                  padding: '8px 18px', cursor: 'pointer', whiteSpace: 'nowrap',
                  border: `1px solid ${isA ? c : 'rgba(201,160,80,.18)'}`,
                  color: isA ? 'var(--bg)' : 'rgba(245,237,214,.45)',
                  background: isA ? c : 'transparent',
                }}
                onMouseEnter={e => { if (!isA) { e.currentTarget.style.borderColor = c; e.currentTarget.style.color = c } }}
                onMouseLeave={e => { if (!isA) { e.currentTarget.style.borderColor = 'rgba(201,160,80,.18)'; e.currentTarget.style.color = 'rgba(245,237,214,.45)' } }}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Count */}
        <div className="text-center mb-8">
          <span className="font-sans" style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '.2em' }}>
            {wines.length} {wines.length === 1 ? 'etichetta' : 'etichette'}
          </span>
        </div>

        {/* Grid */}
        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(248px,1fr))' }}>
          {wines.map((wine, i) => (
            <WineCard key={wine.id} wine={wine} index={i} onClick={onSelectWine} />
          ))}
        </div>
      </div>
    </section>
  )
}
