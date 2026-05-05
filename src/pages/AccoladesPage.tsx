import { Award, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react'

export default function AccoladesPage() {
  const certificates = [
    {
      title: 'AI Leadership Certification',
      issuer: 'Global Leadership Institute',
      date: 'March 2026',
      description: 'Completed an advanced program focused on AI-driven leadership, strategic decision-making, and human-centered innovation.',
      highlights: ['AI strategy', 'Change leadership', 'Ethical decision-making'],
      imageUrl: '/ppc-certificate.jpg',
      imageAlt: 'PPC Certificate',
    },
    {
      title: 'Executive Writing & Publishing Certificate',
      issuer: 'Professional Author Academy',
      date: 'April 2026',
      description: 'Recognised for excellence in executive writing, storytelling, and publishing leadership insights for senior audiences.',
      highlights: ['Thought leadership', 'Book publishing', 'Stakeholder storytelling'],
      imageUrl: '/success-certificate.jpg',
      imageAlt: 'Success Certificate',
    },
  ]

  return (
    <section className="min-h-screen py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">Accolades</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-stone-50">
            Certificates & Recognition
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-stone-400 text-base leading-7">
            Showcasing the certifications and achievements that support my work as a leader, author, and CDAIO strategist.
          </p>
        </div>

        <div className="grid gap-8">
          {certificates.map((cert) => (
            <article key={cert.title} className="glass-card overflow-hidden rounded-[2rem] border-stone-800/70 shadow-sm shadow-black/10">
              <div className="overflow-hidden rounded-t-[1.85rem] bg-slate-950/80">
                <img
                  src={cert.imageUrl}
                  alt={cert.imageAlt}
                  className="h-100 w-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] font-mono text-gold-500">Certificate</p>
                    <h2 className="mt-3 text-2xl font-semibold text-stone-100">{cert.title}</h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/10 text-gold-300">
                    <Award size={24} />
                  </div>
                </div>
                <p className="text-stone-400 leading-7">{cert.description}</p>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-stone-300 text-sm font-medium">
                  <CheckCircle2 size={16} className="text-gold-400" />
                  <span>{cert.issuer}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-400 text-sm">
                  <Sparkles size={16} className="text-gold-400" />
                  <span>{cert.date}</span>
                </div>
              </div>
              <div className="mt-8 grid gap-3">
                {cert.highlights.map((item) => (
                  <div key={item} className="inline-flex items-center gap-2 rounded-full border border-stone-700/70 bg-stone-950/60 px-3 py-2 text-sm text-stone-300">
                    <ShieldCheck size={14} className="text-gold-400" />
                    {item}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
