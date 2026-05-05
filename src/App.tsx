import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AccoladesPage from './pages/AccoladesPage'
import AuthorDashboard from './pages/AuthorDashboard'

export type Tab = 'home' | 'accolades' | 'dashboard'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeTab])

  return (
    <div className="min-h-screen">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} scrolled={scrolled} />
      <main>
        {activeTab === 'home' && <HomePage setActiveTab={setActiveTab} />}
        {activeTab === 'accolades' && <AccoladesPage />}
        {activeTab === 'dashboard' && <AuthorDashboard />}
      </main>
    </div>
  )
}

export default App
