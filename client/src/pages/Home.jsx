import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import WineGrid from '../components/WineGrid'
import PrenotazioneSection from '../components/PrenotazioneSection'
import NewsletterSection from '../components/NewsletterSection'
import WineModal from '../components/WineModal'
import Footer from '../components/Footer'
import { BASE_WINES } from '../data/wines'
import { useWines } from '../hooks/useApi'

export default function Home() {
  const [selectedWine, setSelectedWine]   = useState(null)
  const [activeCategory, setActiveCategory] = useState('tutti')
  const { customWines } = useWines()

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedWine ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedWine])

  const allWines = [...BASE_WINES, ...customWines]
  const filtered = activeCategory === 'tutti'
    ? allWines
    : allWines.filter(w => w.category === activeCategory)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar onCategoryClick={cat => setActiveCategory(cat)} />
      <Hero />
      <WineGrid
        wines={filtered}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onSelectWine={setSelectedWine}
      />
      <PrenotazioneSection />
      <NewsletterSection />
      <Footer />

      {selectedWine && (
        <WineModal wine={selectedWine} onClose={() => setSelectedWine(null)} />
      )}
    </div>
  )
}
