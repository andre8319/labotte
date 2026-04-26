export default function Footer() {
  return (
    <footer id="footer" className="py-16 px-6 relative overflow-hidden" style={{ borderTop: '1px solid rgba(201,160,80,.1)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 100%,rgba(201,160,80,.03) 0%,transparent 55%)' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h3 className="gold-text font-display mb-1" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 300, letterSpacing: '.1em' }}>
            La Botte
          </h3>
          <p className="font-body italic" style={{ color: 'var(--muted)', fontSize: '.85rem' }}>
            Vino · Birra Menabrea · Grappe · Liquori · Confezioni Regalo
          </p>
        </div>

        <div className="gold-divider mb-10" style={{ opacity: .5 }} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 text-center md:text-left">
          <div>
            <h4 className="font-sans mb-4" style={{ color: 'var(--gold)', fontSize: '8px', fontWeight: 700, letterSpacing: '.4em', textTransform: 'uppercase' }}>Dove Siamo</h4>
            {/* FIXED: Chiavazza, Biella */}
            <p className="font-sans" style={{ color: 'rgba(245,237,214,.42)', fontSize: '.82rem', lineHeight: 1.7 }}>
              Chiavazza · Biella<br />Piemonte, Italia
            </p>
          </div>
          <div>
            <h4 className="font-sans mb-4" style={{ color: 'var(--gold)', fontSize: '8px', fontWeight: 700, letterSpacing: '.4em', textTransform: 'uppercase' }}>La Selezione</h4>
            <p className="font-sans" style={{ color: 'rgba(245,237,214,.42)', fontSize: '.82rem', lineHeight: 1.7 }}>
              Vini Rossi · Bianchi · Rosati<br />
              Spumanti · Metodo Classico<br />
              Vitidautunno · Senza Solfiti
            </p>
          </div>
          <div>
            <h4 className="font-sans mb-4" style={{ color: 'var(--gold)', fontSize: '8px', fontWeight: 700, letterSpacing: '.4em', textTransform: 'uppercase' }}>Formati Speciali</h4>
            <p className="font-sans" style={{ color: 'rgba(245,237,214,.42)', fontSize: '.82rem', lineHeight: 1.7 }}>
              Mezze Bottiglie (0,375 L)<br />
              Magnum (1,5 L)<br />
              Solo su prenotazione
            </p>
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="font-display italic" style={{ color: 'rgba(245,237,214,.22)', fontSize: 'clamp(.85rem,1.8vw,1.1rem)', maxWidth: 520, margin: '0 auto' }}>
            "Nel vino c'è la verità, nella scelta c'è l'arte."
          </p>
        </div>

        <div className="gold-divider mb-5" style={{ opacity: .3 }} />

        <div className="flex flex-wrap justify-between items-center gap-3">
          {/* FIXED: Chiavazza, Biella */}
          <p className="font-sans" style={{ color: 'rgba(245,237,214,.18)', fontSize: '9px', letterSpacing: '.15em' }}>
            © {new Date().getFullYear()} La Botte · Chiavazza, Biella. Tutti i diritti riservati.
          </p>
          <p className="font-sans" style={{ color: 'rgba(245,237,214,.14)', fontSize: '9px', letterSpacing: '.1em' }}>
            L'abuso di alcol è dannoso per la salute. Vietato ai minori di 18 anni.
          </p>
        </div>
      </div>
    </footer>
  )
}
