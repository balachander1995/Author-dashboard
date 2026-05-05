import { useEffect, useRef, useState } from 'react'
import {
  BookOpen, ArrowRight, Star, Users, Zap, Target,
  Mail, Linkedin, MapPin, ExternalLink, Play, ChevronDown,
  Award, TrendingUp, Brain
} from 'lucide-react'
import type { Tab } from '../App'

interface HomePageProps {
  setActiveTab: (tab: Tab) => void
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView()
  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const step = end / (duration / 16)
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + step, end)
      setCount(Math.floor(current))
      if (current >= end) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end])
  return <span ref={ref}>{count}{suffix}</span>
}

const ROADMAP_STEPS = [
  { step: '01', title: 'Self-Leadership First', desc: 'Master your inner world, silence self-doubt, and find your purpose before leading others.', status: 'complete', tag: 'Foundation' },
  { step: '02', title: 'Lead Others', desc: 'Build trust and inspire teams in a digital-first environment with empathy and clarity.', status: 'complete', tag: 'Leadership' },
  { step: '03', title: 'AI Integration', desc: 'Practical ways to leverage digital tools to amplify — not replace — human impact.', status: 'active', tag: 'Technology' },
  { step: '04', title: 'CDAIO Mastery', desc: 'Become a Chief Digital, AI, and Innovation Officer leading transformation at scale.', status: 'upcoming', tag: 'Executive' },
]

const FEATURES = [
  { icon: Brain, title: 'Manage the Unmanaged', desc: 'AI & Human Ingenuity working together in perfect synergy.' },
  { icon: Target, title: 'CDAIO Framework', desc: 'The emerging C-Suite role combining Digital & AI leadership.' },
  { icon: TrendingUp, title: 'Practical Reinvention', desc: 'Concrete steps to reinvent yourself for an ever-evolving world.' },
]

export default function HomePage({ setActiveTab }: HomePageProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const [heroVisible, setHeroVisible] = useState(false)
  const aboutSection = useInView()
  const bookSection = useInView()
  const roadmapSection = useInView()

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="overflow-hidden">
      {/* ── HERO ── */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background texture */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold-600/4 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(232,146,10,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(232,146,10,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Label */}
          <div
            className={`transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <span className="section-label">Leader · Author · CDAIO Strategist</span>
          </div>

          {/* Main headline */}
          <h1
            className={`mt-6 font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none tracking-tight transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '250ms' }}
          >
            <span className="block text-stone-100">Roja Ramani</span>
            <span className="block gold-gradient">Metta</span>
          </h1>

          {/* Tagline */}
          <p
            className={`mt-8 max-w-2xl mx-auto text-stone-400 text-lg sm:text-xl leading-relaxed font-body font-light transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '400ms' }}
          >
            Passionate about the intersection of AI, leadership, and human ingenuity.
            Helping organisations navigate the future with clarity, courage, and purpose.
          </p>

          {/* CTAs */}
          <div
            className={`mt-10 flex flex-wrap items-center justify-center gap-4 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '550ms' }}
          >
            <a
              href="https://www.amazon.in/New-C-Suite-Unmanaged-Leadership-Ingenuity-ebook/dp/B0G8XZYNCN/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              <BookOpen size={18} />
              Get the Book
              <ExternalLink size={14} />
            </a>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="btn-outline"
            >
              <Star size={16} />
              Author Dashboard
            </button>
          </div>

          {/* Stats row */}
          <div
            className={`mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-16 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '700ms' }}
          >
            {[
              { value: 10, suffix: '+', label: 'Years Experience' },
              { value: 1, suffix: '', label: 'Published Book' },
              { value: 100, suffix: '%', label: 'Dedication' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl sm:text-4xl font-bold gold-gradient">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-stone-500 text-sm font-body">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll cue */}
          <div
            className={`mt-16 flex justify-center transition-all duration-700 ${heroVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '900ms' }}
          >
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-stone-600 hover:text-gold-500 transition-colors animate-bounce"
            >
              <ChevronDown size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 relative">
        <div ref={aboutSection.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div className={`transition-all duration-700 ${aboutSection.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <span className="section-label">About Me</span>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-stone-100 leading-tight">
                Building Excellence<br />
                <em className="gold-gradient not-italic">Through Innovation</em>
              </h2>
              <div className="mt-6 divider-gold" />
              <p className="mt-6 text-stone-400 text-base leading-relaxed">
                With a strong foundation in leadership and strategic thinking, I bring a unique blend of creativity
                and analytical expertise to every project. My passion lies in transforming ideas into reality and
                driving positive change.
              </p>
              <p className="mt-4 text-stone-400 text-base leading-relaxed">
                I believe in continuous learning, collaborative teamwork, and maintaining the highest standards
                of professional excellence — distilled into my first book, <em className="text-gold-400">The New C-Suite: CDAIO</em>.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { icon: Award, label: 'Leadership', desc: 'Strategic vision and team empowerment' },
                  { icon: Brain, label: 'AI Strategy', desc: 'Practical AI integration' },
                  { icon: Zap, label: 'Execution', desc: 'Delivering results with precision' },
                  { icon: Users, label: 'Communication', desc: 'Clear, effective engagement' },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="glass-card p-4 hover:border-gold-700/40 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center">
                        <Icon size={16} className="text-gold-500" />
                      </div>
                      <span className="text-stone-200 font-medium text-sm">{label}</span>
                    </div>
                    <p className="text-stone-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual card */}
            <div className={`transition-all duration-700 delay-200 ${aboutSection.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="gold-border-card p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-slate-950 font-display font-bold text-xl shadow-xl shadow-gold-500/20">
                    RM
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-stone-100">Roja Ramani Metta</h3>
                    <p className="text-stone-400 text-sm mt-0.5">Leader · Author · CDAIO Strategist</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin size={12} className="text-gold-500" />
                      <span className="text-stone-500 text-xs">Bengaluru, India</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Leadership Excellence', value: 95 },
                    { label: 'AI Strategy', value: 90 },
                    { label: 'Author & Communicator', value: 88 },
                    { label: 'Innovation Mindset', value: 92 },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-stone-400 text-xs font-body">{label}</span>
                        <span className="text-gold-500 text-xs font-mono">{value}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: aboutSection.inView ? `${value}%` : '0%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-stone-800/60 flex items-center justify-between">
                  <span className="text-stone-500 text-xs">Connect with Roja</span>
                  <div className="flex gap-3">
                    <a href="mailto:roseramani@gmail.com" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-gold-500/20 flex items-center justify-center text-stone-400 hover:text-gold-400 transition-all">
                      <Mail size={14} />
                    </a>
                    <a href="https://linkedin.com/in/rojaramanimetta" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-gold-500/20 flex items-center justify-center text-stone-400 hover:text-gold-400 transition-all">
                      <Linkedin size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOK ── */}
      <section id="book" className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-500/3 to-transparent pointer-events-none" />
        <div ref={bookSection.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-700 ${bookSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="section-label">Published Work</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-stone-100">
              The New <em className="gold-gradient not-italic">C-Suite: CDAIO</em>
            </h2>
            <p className="mt-4 text-stone-400 max-w-xl mx-auto">
              Managing the Unmanaged: AI, Leadership & Human Ingenuity
            </p>
          </div>

          <div className={`mt-16 grid lg:grid-cols-2 gap-12 items-start transition-all duration-700 delay-200 ${bookSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Book card */}
            <div className="gold-border-card p-8">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-20 h-28 rounded-xl bg-gradient-to-br from-gold-500 to-gold-800 flex items-center justify-center shadow-2xl shadow-gold-500/20 flex-shrink-0 animate-float">
                  <BookOpen size={32} className="text-slate-950" />
                </div>
                <div>
                  <div className="tag-gold mb-2">Now on Amazon Kindle</div>
                  <h3 className="font-display text-2xl font-bold text-stone-100">The New C-Suite: CDAIO</h3>
                  <p className="text-stone-400 text-sm mt-1">By Roja Ramani Metta</p>
                </div>
              </div>

              <blockquote className="border-l-2 border-gold-500 pl-4 mb-6">
                <p className="text-stone-300 italic text-sm leading-relaxed">
                  "Human mind, heart, and courage are the true differentiators in an AI-driven future."
                </p>
              </blockquote>

              <ul className="space-y-3 mb-8">
                {[
                  'Manage the Unmanaged: AI & Human Ingenuity working together',
                  'CDAIO — the emerging C-Suite role combining Digital & AI leadership',
                  'Practical steps to reinvent yourself for an ever-evolving world',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                    </div>
                    <span className="text-stone-400 text-sm">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-3">
                <a
                  href="https://www.amazon.in/New-C-Suite-Unmanaged-Leadership-Ingenuity-ebook/dp/B0G8XZYNCN/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold text-sm py-2.5"
                >
                  <BookOpen size={15} />
                  Get on Kindle
                </a>
                <a
                  href="https://www.youtube.com/watch?v=gfhz13K2JOs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm py-2.5"
                >
                  <Play size={14} />
                  Watch Trailer
                </a>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="glass-card p-6 hover:border-gold-700/40 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors">
                      <Icon size={22} className="text-gold-500" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-semibold text-stone-100">{title}</h4>
                      <p className="mt-1 text-stone-400 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="glass-card p-6 bg-gradient-to-br from-gold-500/8 to-transparent border-gold-700/30">
                <p className="text-stone-300 text-sm mb-2 font-medium">Perfect for:</p>
                <div className="flex flex-wrap gap-2">
                  {['Young Professionals', 'Mid-Career Leaders', 'Students', 'Executives', 'AI Enthusiasts'].map(tag => (
                    <span key={tag} className="tag-gold text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section id="work" className="py-28">
        <div ref={roadmapSection.ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-700 ${roadmapSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="section-label">The Human–AI Partnership</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-stone-100">
              Leadership <em className="gold-gradient not-italic">Roadmap</em>
            </h2>
          </div>

          <div className="mt-16 space-y-6">
            {ROADMAP_STEPS.map((step, i) => (
              <div
                key={step.step}
                className={`transition-all duration-700 ${roadmapSection.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className={`glass-card p-6 flex items-start gap-5 ${
                  step.status === 'active' ? 'border-gold-500/40 bg-gold-500/5' :
                  step.status === 'complete' ? 'border-stone-700/60' : 'border-stone-800/40 opacity-60'
                }`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold ${
                    step.status === 'active' ? 'bg-gold-500 text-slate-950' :
                    step.status === 'complete' ? 'bg-stone-800 text-gold-500' : 'bg-stone-900 text-stone-600'
                  }`}>
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-display text-lg font-semibold text-stone-100">{step.title}</h3>
                      <span className={`tag text-xs ${step.status === 'active' ? 'tag-gold' : 'tag-stone'}`}>{step.tag}</span>
                      {step.status === 'active' && (
                        <span className="flex items-center gap-1.5 text-xs text-gold-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="text-stone-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-12 text-center transition-all duration-700 delay-600 ${roadmapSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <button
              onClick={() => {}}
              className="btn-outline group"
            >
              View Full Author Dashboard
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gold-500/4 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-label">Let's Connect</span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-stone-100">
            Start a <em className="gold-gradient not-italic">Conversation</em>
          </h2>
          <p className="mt-4 text-stone-400 leading-relaxed">
            Open to discussions about leadership, AI strategy, speaking engagements,
            or simply a conversation about shared interests.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:roseramani@gmail.com"
              className="btn-gold"
            >
              <Mail size={18} />
              roseramani@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/rojaramanimetta"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <Linkedin size={16} />
              LinkedIn
              <ExternalLink size={13} />
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-stone-500 text-sm">
            <MapPin size={14} className="text-gold-500" />
            Bengaluru, India
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-600 text-sm">© 2025 Roja Ramani Metta. All rights reserved.</p>
          <p className="text-stone-600 text-sm">
            <em className="text-stone-500">The New C-Suite: CDAIO</em> available on{' '}
            <a
              href="https://www.amazon.in/New-C-Suite-Unmanaged-Leadership-Ingenuity-ebook/dp/B0G8XZYNCN/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-600 hover:text-gold-400 transition-colors"
            >
              Amazon Kindle
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
