import { useMemo, useState } from 'react'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { getProjects } from '../data/projects'
import { useI18n } from '../i18n'
import type { ProjectCategory } from '../types'
import ProjectCard from '../components/ProjectCard'
import { EmptyState, PageHeader } from '../components/Section'

type Filter = 'All' | ProjectCategory

const FILTERS: Filter[] = ['All', 'Professional', 'Personal', 'Learning']

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>('All')
  const { locale, t } = useI18n()
  const s = t.ui.projects

  useDocumentMeta({ ...s.meta, path: '/projects' })

  const all = getProjects(locale)
  const counts = useMemo(() => {
    const c: Record<Filter, number> = { All: all.length, Professional: 0, Personal: 0, Learning: 0 }
    all.forEach((p) => (c[p.category] += 1))
    return c
  }, [all])
  const visible = filter === 'All' ? all : all.filter((p) => p.category === filter)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        crumbs={[{ label: t.ui.common.home, to: '/' }, { label: t.ui.nav.projects }]}
        title={s.title}
        id="projects-title"
        intro={s.intro}
      />

      <div
        role="group"
        aria-label={s.filterLabel}
        className="no-scrollbar -mx-4 mb-12 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {FILTERS.map((f) => {
          const on = filter === f
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f)}
              className={`inline-flex shrink-0 items-center gap-2.5 rounded-full border py-2 pl-4 pr-2 text-sm font-medium transition duration-300 ${
                on ? 'border-ink bg-ink text-canvas' : 'border-line-strong text-muted hover:border-ink hover:text-ink'
              }`}
            >
              {f === 'All' ? s.all : t.ui.categories[f]}
              <span
                aria-hidden="true"
                className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs ${
                  on ? 'bg-accent text-accent-ink' : 'bg-surface-2 text-muted'
                }`}
              >
                {counts[f]}
              </span>
            </button>
          )
        })}
      </div>

      {visible.length > 0 ? (
        <div key={filter} className="grid gap-x-10 gap-y-20 md:grid-cols-2">
          {visible.map((p, i) => (
            <div key={p.slug} className={i === 0 ? 'md:col-span-2' : ''}>
              <ProjectCard project={p} wide={i === 0} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title={s.emptyTitle}>{s.emptyBody}</EmptyState>
      )}
    </div>
  )
}
