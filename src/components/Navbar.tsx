import { useState } from 'react'
import { Menu, X, BookOpen, LayoutDashboard, ExternalLink, Award } from 'lucide-react'
import type { Tab } from '../App'

interface NavbarProps {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
  scrolled: boolean
}

const NAV_SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'book', label: 'Book' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ activeTab, setActiveTab, scrolled }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSectionNav = (sectionId: string) => {
    if (activeTab !== 'home') {
      setActiveTab('home')
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-stone-800/60 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => { setActiveTab('home'); handleSectionNav('home') }}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-slate-950 font-display font-bold text-sm shadow-lg shadow-gold-500/20 group-hover:shadow-gold-500/40 transition-shadow">
              RM
            </div>
            <span className="font-display text-stone-200 text-lg hidden sm:block group-hover:text-gold-400 transition-colors">
              Roja Ramani Metta
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSectionNav(s.id)}
                className="nav-link px-3 py-2 rounded-lg hover:bg-stone-900/50"
              >
                {s.label}
              </button>
            ))}
            <div className="w-px h-4 bg-stone-700 mx-2" />
            <button
              onClick={() => setActiveTab('accolades')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === 'accolades'
                  ? 'bg-gold-500/15 text-gold-400 border border-gold-500/30'
                  : 'text-stone-400 hover:text-gold-400 hover:bg-stone-900/50'
              }`}
            >
              <Award size={15} />
              Accolades
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === 'dashboard'
                  ? 'bg-gold-500/15 text-gold-400 border border-gold-500/30'
                  : 'text-stone-400 hover:text-gold-400 hover:bg-stone-900/50'
              }`}
            >
              <LayoutDashboard size={15} />
              Author Dashboard
            </button>
            <a
              href="https://www.amazon.in/New-C-Suite-Unmanaged-Leadership-Ingenuity-ebook/dp/B0G8XZYNCN/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold ml-2 text-sm py-2 px-4"
            >
              <BookOpen size={14} />
              Buy Book
              <ExternalLink size={12} />
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-stone-400 hover:text-stone-200"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden mt-2 mx-4 rounded-2xl bg-stone-900/95 backdrop-blur-md border border-stone-800/60 overflow-hidden">
          <nav className="p-4 space-y-1">
            {NAV_SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSectionNav(s.id)}
                className="w-full text-left px-4 py-3 text-stone-300 hover:text-gold-400 hover:bg-stone-800/50 rounded-xl transition-colors text-sm"
              >
                {s.label}
              </button>
            ))}
            <div className="border-t border-stone-800 my-2" />
            <button
              onClick={() => { setActiveTab('accolades'); setMobileOpen(false) }}
              className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-colors ${
                activeTab === 'accolades'
                  ? 'text-gold-400 bg-gold-500/10'
                  : 'text-stone-300 hover:text-gold-400 hover:bg-stone-800/50'
              }`}
            >
              <Award size={15} />
              Accolades
            </button>
            <button
              onClick={() => { setActiveTab('dashboard'); setMobileOpen(false) }}
              className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-colors ${
                activeTab === 'dashboard'
                  ? 'text-gold-400 bg-gold-500/10'
                  : 'text-stone-300 hover:text-gold-400 hover:bg-stone-800/50'
              }`}
            >
              <LayoutDashboard size={15} />
              Author Dashboard
            </button>
            <a
              href="https://www.amazon.in/New-C-Suite-Unmanaged-Leadership-Ingenuity-ebook/dp/B0G8XZYNCN/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gold-400 hover:text-gold-300 transition-colors"
            >
              <BookOpen size={15} />
              Buy on Amazon
              <ExternalLink size={12} />
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
