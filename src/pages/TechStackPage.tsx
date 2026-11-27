import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, X } from 'lucide-react'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { getProjects } from '../data/projects'
import { useI18n } from '../i18n'
import { PageHeader } from '../components/Section'

const norm = (v: string) => v.toLowerCase().replace(/[^a-z0-9+#]/g, '')

/** A project uses a technology if one of its stack entries is that technology, with or without a version. */
function uses(stack: string[], tech: string) {
  const n = norm(tech)
  return stack.some((s) => {
    const m = norm(s)
    return m === n || (m.startsWith(n) && /^[0-9]/.test(m.slice(n.length))) || norm(s.split(/[\s/(]/)[0]) === n
  })
}

export default function TechStackPage() {
  const { locale, t } = useI18n()
  const s = t.ui.techStack
  const projects = getProjects(locale)
  const [picked, setPicked] = useState<string | null>(null)

  useDocumentMeta({ ...s.meta, path: '/tech-stack' })

  const usage = useMemo(() => {
    const map = new Map<string, number>()
    t.profile.skillGroups.forEach((g) => g.items.forEach((i) => map.set(i, projects.filter((p) => uses(p.stack, i)).length)))
    return map
  }, [t.profile.skillGroups, projects])

  const matching = picked ? projects.filter((p) => uses(p.stack, picked)) : projects

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader crumbs={[{ label: t.ui.common.home, to: '/' }, { label: t.ui.nav.techStack }]} title={s.title} id="stack-title" intro={s.intro} />

      <p className="mb-6 text-sm text-muted" id="stack-hint">{s.filterHint}</p>
      <div role="group" aria-label={s.filterLabel} aria-describedby="stack-hint" className="grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
        {t.profile.skillGroups.map((g) => (
          <section key={g.title} className="bg-canvas p-7 sm:p-8">
            <h2 className="flex items-center gap-3 font-display text-lg font-medium tracking-tight text-ink">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
              {g.title}
            </h2>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {g.items.map((i) => {
                const on = picked === i
                const count = usage.get(i) ?? 0
                return (
                  <li key={i}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => setPicked(on ? null : i)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.85rem] font-medium transition duration-300 ${
                        on
                          ? 'border-accent bg-accent text-accent-ink'
                          : count > 0
                            ? 'border-line-strong text-ink hover:border-accent hover:bg-accent-soft'
                            : 'border-line text-muted hover:border-line-strong hover:text-ink'
                      }`}
                    >
                      {i}
                      {count > 0 && (
                        <span aria-hidden="true" className={`text-xs ${on ? 'text-accent-ink/80' : 'text-muted'}`}>
                          {count}
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>

      <section aria-labelledby="where-used" className="mt-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="where-used" className="display text-[2rem] text-ink sm:text-[2.5rem]">{s.whereUsed}</h2>
            <p aria-live="polite" className="mt-3 min-h-6 text-muted">
              {picked && (
                <>
                  <span className="font-semibold text-ink">{picked}</span>:{' '}
                  {matching.length > 0 ? s.usedIn(String(matching.length)) : s.noMatch}
                </>
              )}
            </p>
          </div>
          {picked && (
            <button type="button" onClick={() => setPicked(null)} className="btn btn-ghost">
              <X size={15} aria-hidden="true" /> {s.clearFilter}
            </button>
          )}
        </div>

        <ul className="grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line">
          <li aria-hidden="true" className="hidden grid-cols-[1.2fr_0.6fr_2fr] gap-6 bg-surface px-6 py-3.5 text-sm text-muted md:grid">
            <span>{s.project}</span>
            <span>{s.category}</span>
            <span>{s.stack}</span>
          </li>
          {projects.map((p) => {
            const hit = !picked || matching.includes(p)
            return (
              <li
                key={p.slug}
                className={`group relative grid gap-3 bg-canvas px-6 py-6 transition-opacity duration-500 md:grid-cols-[1.2fr_0.6fr_2fr] md:gap-6 ${
                  hit ? '' : 'opacity-30'
                }`}
              >
                <Link to={`/projects/${p.slug}`} className="flex items-start justify-between gap-3 font-display text-base font-medium tracking-tight text-ink after:absolute after:inset-0 after:content-['']">
                  <span className="group-hover:text-accent" style={{ transition: 'color 300ms' }}>{p.title}</span>
                  <ArrowUpRight size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:hidden" />
                </Link>
                <span className="text-sm text-muted">
                  <span className="md:hidden">{s.category}: </span>
                  {t.ui.categories[p.category]}
                </span>
                <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted" aria-label={s.stack}>
                  {p.stack.map((tech) => (
                    <li key={tech} className={picked && uses([tech], picked) ? 'font-semibold text-accent' : ''}>
                      {tech}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
