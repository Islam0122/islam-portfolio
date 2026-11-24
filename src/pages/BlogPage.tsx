import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { SITE } from '../data/site'
import { useI18n } from '../i18n'
import Breadcrumbs from '../components/Breadcrumbs'
import { Card, EmptyState, SectionHeading } from '../components/Section'

export default function BlogPage() {
  const { t } = useI18n()
  const s = t.ui.blog
  const newTab = t.ui.common.opensInNewTab

  useDocumentMeta({ ...s.meta, path: '/blog' })

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs items={[{ label: t.ui.common.home, to: '/' }, { label: t.ui.nav.blog }]} />
      <SectionHeading level={1} eyebrow={s.eyebrow} title={s.title} id="blog-title">
        {s.intro}
      </SectionHeading>

      <EmptyState title={s.emptyTitle}>{s.emptyBody}</EmptyState>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-semibold text-ink">{s.notesTitle}</h2>
          <p className="mt-2 text-sm text-muted">{s.notesBody}</p>
          <a className="mt-4 inline-flex text-sm font-medium text-ink underline-offset-4 hover:underline" href="https://github.com/Islam0122/django-architecture-lab" target="_blank" rel="noreferrer">
            django-architecture-lab <span className="sr-only">{newTab}</span>
          </a>
        </Card>
        <Card>
          <h2 className="font-semibold text-ink">{s.caseStudiesTitle}</h2>
          <p className="mt-2 text-sm text-muted">{s.caseStudiesBody}</p>
          <Link className="mt-4 inline-flex text-sm font-medium text-ink underline-offset-4 hover:underline" to="/projects">{s.browseProjects}</Link>
        </Card>
        <Card className="md:col-span-2">
          <h2 className="font-semibold text-ink">{s.githubTitle}</h2>
          <p className="mt-2 text-sm text-muted">{s.githubBody}</p>
          <a className="mt-4 inline-flex text-sm font-medium text-ink underline-offset-4 hover:underline" href={SITE.github} target="_blank" rel="noreferrer">
            github.com/{SITE.githubHandle} <span className="sr-only">{newTab}</span>
          </a>
        </Card>
      </div>
    </div>
  )
}
