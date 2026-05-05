import { useEffect, useRef, useState } from 'react'
import {
  CheckCircle2, PenLine, Flame, Trophy, CalendarDays, Star,
  TrendingUp, BookOpen, Target, Award, Zap,
  ChevronRight, ArrowUpRight, Clock, BarChart3, Edit3,
  FileText, Layers, Circle, CheckCheck
} from 'lucide-react'

function useInView(threshold = 0.1) {
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

function AnimatedNumber({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const [displayed, setDisplayed] = useState(0)
  const { ref, inView } = useInView()
  useEffect(() => {
    if (!inView) return
    const duration = 1600
    const steps = 60
    const increment = value / steps
    let current = 0
    let step = 0
    const timer = setInterval(() => {
      step++
      current = Math.min(current + increment, value)
      setDisplayed(Math.floor(current))
      if (step >= steps) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, value])
  return <span ref={ref}>{prefix}{displayed.toLocaleString()}{suffix}</span>
}

// ── Dashboard data ──
const STATS = [
  {
    id: 'missions',
    icon: CheckCircle2,
    label: 'Missions Done',
    value: 47,
    suffix: '',
    sub: '3 this week',
    color: 'emerald',
    bgClass: 'bg-emerald-500/10',
    borderClass: 'hover:border-emerald-500/40',
    iconClass: 'text-emerald-400',
    subtextClass: 'text-emerald-500/70',
    trend: '+12%',
    trendUp: true,
  },
  {
    id: 'words',
    icon: PenLine,
    label: 'Words Written',
    value: 124850,
    suffix: '',
    sub: 'Across all projects',
    color: 'blue',
    bgClass: 'bg-blue-500/10',
    borderClass: 'hover:border-blue-500/40',
    iconClass: 'text-blue-400',
    subtextClass: 'text-blue-500/70',
    trend: '+8.4K',
    trendUp: true,
  },
  {
    id: 'streak',
    icon: Flame,
    label: 'Writing Streak',
    value: 21,
    suffix: ' days',
    sub: 'Personal best: 30',
    color: 'orange',
    bgClass: 'bg-orange-500/10',
    borderClass: 'hover:border-orange-500/40',
    iconClass: 'text-orange-400',
    subtextClass: 'text-orange-500/70',
    trend: 'On fire 🔥',
    trendUp: true,
  },
  {
    id: 'challenge',
    icon: Trophy,
    label: 'Challenge Status',
    value: 78,
    suffix: '%',
    sub: '30-day book sprint',
    color: 'gold',
    bgClass: 'bg-gold-500/10',
    borderClass: 'hover:border-gold-500/40',
    iconClass: 'text-gold-400',
    subtextClass: 'text-gold-500/70',
    trend: 'Active',
    trendUp: true,
  },
  {
    id: 'challenge-day',
    icon: CalendarDays,
    label: 'Challenge Day',
    value: 23,
    suffix: ' / 30',
    sub: '7 days remaining',
    color: 'violet',
    bgClass: 'bg-violet-500/10',
    borderClass: 'hover:border-violet-500/40',
    iconClass: 'text-violet-400',
    subtextClass: 'text-violet-500/70',
    trend: 'Day 23',
    trendUp: true,
  },
  {
    id: 'mission-completed',
    icon: Star,
    label: 'Mission Completed',
    value: 12,
    suffix: '',
    sub: 'Major milestones hit',
    color: 'amber',
    bgClass: 'bg-amber-500/10',
    borderClass: 'hover:border-amber-500/40',
    iconClass: 'text-amber-400',
    subtextClass: 'text-amber-500/70',
    trend: 'All on track',
    trendUp: true,
  },
]

interface MissionReport {
  id: string
  title: string
  category: string
  date: string
  words: number
  status: 'published' | 'draft' | 'review'
  progress: number
}

const REPORTS: MissionReport[] = [
  { id: 'r1', title: 'The New C-Suite: CDAIO — Book Launch', category: 'Book', date: 'Jan 2025', words: 52400, status: 'published', progress: 100 },
  { id: 'r2', title: 'Chapter 2: Lead Others in AI Era', category: 'Book', date: 'Mar 2025', words: 8200, status: 'published', progress: 100 },
  { id: 'r3', title: 'AI Leadership Whitepaper', category: 'Research', date: 'Apr 2025', words: 4800, status: 'review', progress: 85 },
  { id: 'r4', title: 'CDAIO Framework Deep Dive', category: 'Article', date: 'Apr 2025', words: 2100, status: 'draft', progress: 60 },
  { id: 'r5', title: 'Keynote: Future of Human-AI', category: 'Speaking', date: 'May 2025', words: 1500, status: 'draft', progress: 40 },
]

const ROADMAP_ITEMS = [
  {
    phase: 'Phase 1',
    title: 'Book 1 Published',
    subtitle: 'The New C-Suite: CDAIO',
    detail: 'Successfully published on Amazon Kindle. Reached 1,000+ readers.',
    status: 'done' as const,
    icon: BookOpen,
    date: 'Jan 2025',
    metrics: ['52K words', '1K+ readers', 'Amazon Kindle'],
  },
  {
    phase: 'Phase 2',
    title: 'Content Expansion',
    subtitle: 'Articles & Thought Leadership',
    detail: 'Growing LinkedIn presence and publishing AI leadership articles.',
    status: 'done' as const,
    icon: Edit3,
    date: 'Feb–Mar 2025',
    metrics: ['20+ articles', '5K followers', 'Speaking invites'],
  },
  {
    phase: 'Phase 3',
    title: '30-Day Writing Sprint',
    subtitle: 'Book 2 Manuscript',
    detail: 'Deep-dive writing challenge targeting 50,000 words for Book 2.',
    status: 'active' as const,
    icon: Flame,
    date: 'Apr 2025',
    metrics: ['Day 23 / 30', '78% complete', '38K words'],
  },
  {
    phase: 'Phase 4',
    title: 'Keynote & Speaking',
    subtitle: 'Global AI Leadership Tour',
    detail: 'Confirmed speaking engagements at leadership & AI conferences.',
    status: 'upcoming' as const,
    icon: Target,
    date: 'Jun–Sep 2025',
    metrics: ['3 events', '2 countries', 'Keynote speaker'],
  },
  {
    phase: 'Phase 5',
    title: 'Book 2 Launch',
    subtitle: 'The CDAIO Playbook',
    detail: 'Full publication and marketing campaign for the second book.',
    status: 'upcoming' as const,
    icon: Award,
    date: 'Oct 2025',
    metrics: ['Target: 100K words', 'Print + Digital', 'Global release'],
  },
  {
    phase: 'Phase 6',
    title: 'CDAIO Academy',
    subtitle: 'Online Learning Platform',
    detail: 'Launching a structured online course for aspiring CDAIO leaders.',
    status: 'planned' as const,
    icon: Layers,
    date: 'Q1 2026',
    metrics: ['10-module course', 'Certification', 'Community'],
  },
]

const WRITING_ACTIVITY = [
  [4, 6, 8, 3, 7, 5, 9],
  [6, 4, 10, 8, 5, 7, 6],
  [8, 9, 6, 7, 10, 8, 5],
  [3, 7, 9, 10, 8, 6, 7],
]

function ActivityGrid() {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className="flex gap-1.5 flex-wrap">
      {WRITING_ACTIVITY.flat().map((level, i) => (
        <div
          key={i}
          className={`w-4 h-4 rounded-sm transition-all duration-300`}
          style={{
            transitionDelay: `${i * 20}ms`,
            background: inView
              ? level >= 9 ? 'rgba(232,146,10,0.95)'
                : level >= 7 ? 'rgba(232,146,10,0.65)'
                : level >= 5 ? 'rgba(232,146,10,0.35)'
                : level >= 3 ? 'rgba(232,146,10,0.15)'
                : 'rgba(255,255,255,0.05)'
              : 'rgba(255,255,255,0.05)',
          }}
          title={`${level * 500} words`}
        />
      ))}
    </div>
  )
}

const STATUS_BADGE: Record<string, string> = {
  published: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  draft: 'bg-stone-800 text-stone-400 border-stone-700',
  review: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
}

export default function AuthorDashboard() {
  const [activeReport, setActiveReport] = useState<string | null>(null)
  const heroSection = useInView()
  const statsSection = useInView()
  const reportSection = useInView()
  const roadmapSection = useInView()

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HEADER ── */}
        <div ref={heroSection.ref} className={`transition-all duration-700 ${heroSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="section-label">Author Dashboard</span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-stone-100">
                Mission <em className="gold-gradient not-italic">Control</em>
              </h1>
              <p className="mt-2 text-stone-400 text-base">
                Tracking Roja's writing journey, milestones & authorship roadmap
              </p>
            </div>

            <div className="glass-card p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-slate-950 font-display font-bold">
                RM
              </div>
              <div>
                <p className="text-stone-200 font-medium text-sm">Roja Ramani Metta</p>
                <p className="text-stone-500 text-xs mt-0.5">CDAIO · Author · Strategist</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Flame size={11} className="text-orange-400" />
                  <span className="text-xs text-orange-400 font-mono">21-day streak</span>
                </div>
              </div>
            </div>
          </div>

          {/* Writing activity heatmap */}
          <div className="glass-card p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 size={16} className="text-gold-500" />
                <span className="text-stone-300 text-sm font-medium">Writing Activity — Last 28 Days</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-500">
                <span>Less</span>
                {['bg-gold-500/10', 'bg-gold-500/25', 'bg-gold-500/50', 'bg-gold-500/75', 'bg-gold-500'].map((c, i) => (
                  <div key={i} className={`w-3.5 h-3.5 rounded-sm ${c}`} />
                ))}
                <span>More</span>
              </div>
            </div>
            <ActivityGrid />
          </div>
        </div>

        {/* ── 6 STAT TILES ── */}
        <div ref={statsSection.ref}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {STATS.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.id}
                  className={`stat-tile ${stat.borderClass} transition-all duration-500 ${
                    statsSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl ${stat.bgClass} flex items-center justify-center`}>
                      <Icon size={22} className={stat.iconClass} />
                    </div>
                    <span className={`text-xs font-mono px-2 py-1 rounded-full border ${
                      stat.trendUp
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                        : 'bg-red-500/10 text-red-400 border-red-500/25'
                    }`}>
                      {stat.trendUp ? '↑' : '↓'} {stat.trend}
                    </span>
                  </div>

                  {/* Value */}
                  <div className="mb-1">
                    <span className="font-display text-3xl font-bold text-stone-50">
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </span>
                  </div>

                  {/* Label */}
                  <p className="text-stone-300 text-sm font-medium mb-1">{stat.label}</p>
                  <p className={`text-xs ${stat.subtextClass || 'text-stone-500'}`}>{stat.sub}</p>

                  {/* Progress bar for challenge status */}
                  {stat.id === 'challenge' && (
                    <div className="mt-4">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: statsSection.inView ? '78%' : '0%' }}
                        />
                      </div>
                    </div>
                  )}
                  {stat.id === 'challenge-day' && (
                    <div className="mt-4">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 30 }).map((_, j) => (
                          <div
                            key={j}
                            className={`h-1.5 flex-1 rounded-sm transition-all duration-300 ${
                              j < 23 ? 'bg-violet-500' : j === 23 ? 'bg-violet-300 animate-pulse' : 'bg-stone-800'
                            }`}
                            style={{ transitionDelay: `${j * 30}ms` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Quick insights row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="glass-card p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                <TrendingUp size={18} className="text-gold-500" />
              </div>
              <div>
                <p className="text-stone-400 text-xs">Avg. words/day</p>
                <p className="text-stone-100 font-display text-xl font-bold">
                  <AnimatedNumber value={4452} />
                </p>
              </div>
            </div>
            <div className="glass-card p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                <Clock size={18} className="text-gold-500" />
              </div>
              <div>
                <p className="text-stone-400 text-xs">Writing sessions</p>
                <p className="text-stone-100 font-display text-xl font-bold">
                  <AnimatedNumber value={89} />
                </p>
              </div>
            </div>
            <div className="glass-card p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                <Zap size={18} className="text-gold-500" />
              </div>
              <div>
                <p className="text-stone-400 text-xs">Productivity score</p>
                <p className="text-stone-100 font-display text-xl font-bold shimmer-text">
                  <AnimatedNumber value={94} suffix="%" />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── MISSION REPORTS ── */}
        <div ref={reportSection.ref} className={`mb-16 transition-all duration-700 ${reportSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="section-label">Reports</span>
              <h2 className="mt-1 font-display text-3xl font-bold text-stone-100">
                Mission <em className="gold-gradient not-italic">Reports</em>
              </h2>
            </div>
            <button className="btn-outline text-sm py-2 px-4">
              <FileText size={14} />
              All Reports
            </button>
          </div>

          <div className="space-y-3">
            {REPORTS.map((report, i) => (
              <div
                key={report.id}
                onClick={() => setActiveReport(activeReport === report.id ? null : report.id)}
                className={`glass-card p-5 cursor-pointer transition-all duration-300 hover:border-stone-700/60 hover:bg-stone-900/60 ${
                  activeReport === report.id ? 'border-gold-500/30 bg-gold-500/3' : ''
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center flex-shrink-0">
                    <FileText size={18} className="text-stone-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-stone-200 font-medium text-sm truncate">{report.title}</h3>
                      <span className={`tag text-xs border ${STATUS_BADGE[report.status]}`}>
                        {report.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-stone-500 text-xs font-mono">{report.date}</span>
                      <span className="text-stone-500 text-xs">{report.words.toLocaleString()} words</span>
                      <span className="tag-stone text-xs">{report.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="hidden sm:flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-stone-800 rounded-full">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
                          style={{ width: `${report.progress}%` }}
                        />
                      </div>
                      <span className="text-stone-500 text-xs font-mono w-8">{report.progress}%</span>
                    </div>
                    <ChevronRight
                      size={16}
                      className={`text-stone-600 transition-transform ${activeReport === report.id ? 'rotate-90' : ''}`}
                    />
                  </div>
                </div>

                {activeReport === report.id && (
                  <div className="mt-4 pt-4 border-t border-stone-800/60">
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-stone-500 text-xs mb-1">Word count</p>
                        <p className="text-stone-200 font-mono text-sm">{report.words.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-stone-500 text-xs mb-1">Progress</p>
                        <div className="progress-bar mt-1.5">
                          <div className="progress-fill" style={{ width: `${report.progress}%` }} />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="btn-outline text-xs py-1.5 px-3">
                          <Edit3 size={12} />
                          View
                        </button>
                        {report.status === 'published' && (
                          <button className="text-xs text-gold-500 hover:text-gold-300 flex items-center gap-1 transition-colors">
                            <ArrowUpRight size={12} />
                            Open
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── MISSION ROADMAP ── */}
        <div ref={roadmapSection.ref} className={`transition-all duration-700 ${roadmapSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="section-label">The Big Picture</span>
              <h2 className="mt-1 font-display text-3xl font-bold text-stone-100">
                Mission <em className="gold-gradient not-italic">Roadmap</em>
              </h2>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-stone-400">
                <CheckCheck size={12} className="text-emerald-400" /> Done
              </span>
              <span className="flex items-center gap-1.5 text-stone-400">
                <Flame size={12} className="text-orange-400" /> Active
              </span>
              <span className="flex items-center gap-1.5 text-stone-400">
                <Circle size={12} className="text-stone-600" /> Upcoming
              </span>
            </div>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500/60 via-gold-500/20 to-transparent" />

            <div className="space-y-4">
              {ROADMAP_ITEMS.map((item, i) => {
                const Icon = item.icon
                const isDone = item.status === 'done'
                const isActive = item.status === 'active'
                const isUpcoming = item.status === 'upcoming'

                return (
                  <div
                    key={item.phase}
                    className={`transition-all duration-500 ${roadmapSection.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="flex gap-5">
                      {/* Node */}
                      <div className="flex-shrink-0 relative z-10">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                          isDone ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' :
                          isActive ? 'bg-gold-500 border-gold-400 text-slate-950 shadow-lg shadow-gold-500/30 animate-glow' :
                          isUpcoming ? 'bg-stone-900 border-stone-700 text-stone-500' :
                          'bg-stone-900 border-stone-800 text-stone-600'
                        }`}>
                          {isDone ? <CheckCheck size={20} /> : <Icon size={20} />}
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`flex-1 glass-card p-5 mb-1 transition-all ${
                        isActive ? 'border-gold-500/30 bg-gold-500/4' :
                        isDone ? 'border-emerald-500/20' :
                        'border-stone-800/40 opacity-75'
                      }`}>
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="font-mono text-xs text-stone-500">{item.phase}</span>
                              {isActive && (
                                <span className="flex items-center gap-1 text-xs text-gold-400">
                                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                                  In Progress
                                </span>
                              )}
                              {isDone && (
                                <span className="text-xs text-emerald-400 flex items-center gap-1">
                                  <CheckCircle2 size={11} />
                                  Complete
                                </span>
                              )}
                            </div>
                            <h3 className="font-display text-lg font-bold text-stone-100">{item.title}</h3>
                            <p className="text-gold-400/80 text-sm font-medium mb-2">{item.subtitle}</p>
                            <p className="text-stone-400 text-sm leading-relaxed">{item.detail}</p>
                          </div>
                          <span className="font-mono text-xs text-stone-500 whitespace-nowrap">{item.date}</span>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.metrics.map(metric => (
                            <span key={metric} className={`tag text-xs border ${
                              isActive ? 'bg-gold-500/10 border-gold-500/25 text-gold-400' :
                              isDone ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400' :
                              'bg-stone-800/50 border-stone-700/50 text-stone-500'
                            }`}>
                              {metric}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Summary bar */}
          <div className="mt-12 glass-card p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-xl font-bold text-stone-100">Overall Journey Progress</h3>
                <p className="text-stone-400 text-sm mt-1">2 phases complete · 1 active · 3 upcoming</p>
              </div>
              <div className="w-full sm:w-64">
                <div className="flex justify-between mb-2">
                  <span className="text-stone-500 text-xs">Progress</span>
                  <span className="text-gold-400 font-mono text-xs">38%</span>
                </div>
                <div className="progress-bar h-2">
                  <div className="progress-fill" style={{ width: roadmapSection.inView ? '38%' : '0%' }} />
                </div>
                <div className="flex justify-between mt-2 text-xs text-stone-600 font-mono">
                  <span>Start</span>
                  <span>CDAIO Academy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
