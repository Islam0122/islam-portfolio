import { useMemo, useState } from 'react'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { getProjects } from '../data/projects'
import { useI18n } from '../i18n'
import type { ProjectCategory } from '../types'
import ProjectCard from '../components/ProjectCard'
import Breadcrumbs from '../components/Breadcrumbs'
import { EmptyState, SectionHeading } from '../components/Section'

type Filter = 'All' | ProjectCategory

const FILTERS: Filter[] = ['All', 'Professional', 'Personal', 'Learning']

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>('All')
  const { locale, t } = useI18n()
  const s = t.ui.projects

  useDocumentMeta({ ...s.meta, path: '/projects' })

  const visible = useMemo(() => {
    const projects = getProjects(locale)
    return filter === 'All' ? projects : projects.filter((p) => p.category === filter)
  }, [filter, locale])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs items={[{ label: t.ui.common.home, to: '/' }, { label: t.ui.nav.projects }]} />
      <SectionHeading level={1} eyebrow={s.eyebrow} title={s.title} id="projects-title">
        {s.intro}
      </SectionHeading>

      <div role="group" aria-label={s.filterLabel} className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              filter === f
                ? 'border-accent bg-accent-soft font-medium text-ink'
                : 'border-line text-muted hover:text-ink'
            }`}
          >
            {f === 'All' ? s.all : t.ui.categories[f]}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {visible.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      ) : (
        <EmptyState title={s.emptyTitle}>{s.emptyBody}</EmptyState>
      )}
    </div>
  )
}
