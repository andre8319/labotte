import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../data/wines'

const NAV_CATS = CATEGORIES.slice(1) // skip "tutti"

export default function Navbar({ onCategoryClick }) {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [ddOpen, setDdOpen]       = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  const scrollTo = (id) => {
    navigate('/')
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100)
    setMenuOpen(false)
    setDdOpen(false)
  }

  const handleCategory = (catId) => {
    onCategoryClick?.(catId)
    scrollTo('vini')
  }

  // Nav always has solid bg when menu is open (mobile fix)
  const solidBg = scrolled || menuOpen

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: solidBg ? 'rgba(5,2,5,0.98)' : 'transparent',
        backdropFilter: solidBg ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,160,80,0.12)' : 'none',
        padding: scrolled ? '10px 0' : '18px 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">

        {/* ── Logo ── */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex flex-col items-start bg-transparent border-none cursor-pointer"
        >
          <span className="gold-text font-display" style={{ fontSize: '1.45rem', fontWeight: 600, letterSpacing: '.06em', lineHeight: 1 }}>
            La Botte
          </span>
          <span className="font-sans" style={{ color: 'var(--muted)', fontSize: '8px', letterSpacing: '.35em', fontWeight: 700, textTransform: 'uppercase' }}>
            Vino · Birra · Grappe · Liquori
          </span>
        </button>

        {/* ── Desktop nav ── */}
        <div className="hidden md:flex items-center gap-7">

          {/* Selezione Teo Costa dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDdOpen(true)}
            onMouseLeave={() => setDdOpen(false)}
          >
            <button
              onClick={() => scrollTo('vini')}
              className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer font-sans transition-colors duration-200"
              style={{
                color: ddOpen ? 'var(--gold)' : 'var(--muted)',
                fontSize: '10px', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase',
              }}
            >
              Selezione Teo Costa
              <svg width="8" height="5" fill="none" style={{ transition: 'transform .2s', transform: ddOpen ? 'rotate(180deg)' : 'none' }}>
                <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Dropdown */}
            <div
              className="absolute top-full left-1/2 pt-3"
              style={{
                transform: 'translateX(-50%)',
                opacity: ddOpen ? 1 : 0,
                pointerEvents: ddOpen ? 'all' : 'none',
                transition: 'opacity .18s ease',
                minWidth: 210,
              }}
            >
              <div style={{ background: 'rgba(8,3,10,.98)', border: '1px solid rgba(201,160,80,.2)', backdropFilter: 'blur(16px)', boxShadow: '0 24px 48px rgba(0,0,0,.7)' }}>
                {NAV_CATS.map((cat, i) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategory(cat.id)}
                    className="w-full text-left bg-transparent border-none cursor-pointer font-sans transition-all duration-150"
                    style={{
                      padding: '12px 20px',
                      color: 'rgba(245,237,214,.6)',
                      fontSize: '10px', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase',
                      borderBottom: i < NAV_CATS.length - 1 ? '1px solid rgba(201,160,80,.07)' : 'none',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.background = 'rgba(201,160,80,.05)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,237,214,.6)'; e.currentTarget.style.background = 'transparent' }}
                  >
                    {cat.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollTo('prenotazione')}
                  className="w-full text-left bg-transparent border-none cursor-pointer font-sans transition-all duration-150"
                  style={{ padding: '12px 20px', color: 'var(--gold)', fontSize: '10px', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', borderTop: '1px solid rgba(201,160,80,.15)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,160,80,.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  ★ Solo su Prenotazione
                </button>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <button
            onClick={() => scrollTo('newsletter')}
            className="bg-transparent border-none cursor-pointer font-sans transition-colors duration-200"
            style={{ color: 'var(--muted)', fontSize: '10px', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
          >
            Newsletter
          </button>

          {/* CTA */}
          <button
            onClick={() => scrollTo('prenotazione')}
            className="font-sans transition-all duration-300"
            style={{ border: '1px solid var(--gold)', color: 'var(--gold)', background: 'transparent', fontSize: '9px', fontWeight: 700, letterSpacing: '.25em', textTransform: 'uppercase', padding: '8px 18px', cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--bg)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)' }}
          >
            ★ Su Prenotazione
          </button>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: 24, height: 1, background: 'var(--gold)', transition: 'all .3s',
              transform: menuOpen && i === 0 ? 'rotate(45deg) translate(5px,5px)' : menuOpen && i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* ── Mobile menu — FIXED: always solid dark background ── */}
      <div
        className="md:hidden overflow-hidden transition-all duration-350"
        style={{
          maxHeight: menuOpen ? '500px' : '0',
          // solid background regardless of scroll position
          background: 'rgba(5,2,5,0.99)',
        }}
      >
        <div style={{ padding: '16px 24px 20px', borderTop: '1px solid rgba(201,160,80,.12)', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <button onClick={() => scrollTo('hero')} className="text-left bg-transparent border-none cursor-pointer font-sans font-bold" style={{ color: 'var(--cream)', fontSize: '11px', letterSpacing: '.3em', textTransform: 'uppercase', padding: '8px 0' }}>
            La Botte
          </button>

          <div style={{ height: 1, background: 'rgba(201,160,80,.1)', margin: '6px 0' }} />

          <p className="font-sans" style={{ color: 'var(--muted)', fontSize: '8px', letterSpacing: '.3em', textTransform: 'uppercase', marginBottom: 4 }}>
            Selezione Teo Costa
          </p>

          {NAV_CATS.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategory(cat.id)}
              className="text-left bg-transparent border-none cursor-pointer font-sans font-bold"
              style={{ color: 'rgba(245,237,214,.55)', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', padding: '7px 0 7px 12px' }}
            >
              — {cat.label}
            </button>
          ))}

          <div style={{ height: 1, background: 'rgba(201,160,80,.1)', margin: '6px 0' }} />

          <button onClick={() => scrollTo('newsletter')} className="text-left bg-transparent border-none cursor-pointer font-sans font-bold" style={{ color: 'rgba(245,237,214,.55)', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', padding: '7px 0' }}>
            Newsletter
          </button>

          <button onClick={() => scrollTo('prenotazione')} className="text-left bg-transparent border-none cursor-pointer font-sans font-bold" style={{ color: 'var(--gold)', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', padding: '8px 0' }}>
            ★ Solo su Prenotazione
          </button>
        </div>
      </div>
    </nav>
  )
}
