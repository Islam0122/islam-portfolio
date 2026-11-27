import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { SITE } from '../data/site'
import { useI18n } from '../i18n'
import { EmptyState, PageHeader } from '../components/Section'

export default function BlogPage() {
  const { t } = useI18n()
  const s = t.ui.blog
  const newTab = t.ui.common.opensInNewTab

  useDocumentMeta({ ...s.meta, path: '/blog' })

  const links = [
    { title: s.notesTitle, body: s.notesBody, label: 'django-architecture-lab', href: 'https://github.com/Islam0122/django-architecture-lab', external: true },
    { title: s.caseStudiesTitle, body: s.caseStudiesBody, label: s.browseProjects, href: '/projects', external: false },
    { title: s.githubTitle, body: s.githubBody, label: `github.com/${SITE.githubHandle}`, href: SITE.github, external: true },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <PageHeader crumbs={[{ label: t.ui.common.home, to: '/' }, { label: t.ui.nav.blog }]} title={s.title} id="blog-title" intro={s.intro} />

      <EmptyState title={s.emptyTitle}>{s.emptyBody}</EmptyState>

      <ul className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line md:grid-cols-3">
        {links.map((l) => {
          const inner = (
            <>
              <h2 className="font-display text-lg font-medium tracking-tight text-ink">{l.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{l.body}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-ink">
                <span className="link-draw">{l.label}</span>
                {l.external ? (
                  <ArrowUpRight size={15} aria-hidden="true" className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                ) : (
                  <ArrowRight size={15} aria-hidden="true" className="transition group-hover:translate-x-1" />
                )}
                {l.external && <span className="sr-only"> {newTab}</span>}
              </span>
            </>
          )
          const cls = 'group flex h-full flex-col bg-canvas p-7 transition-colors duration-300 hover:bg-surface'
          return (
            <li key={l.title}>
              {l.external ? (
                <a className={cls} href={l.href} target="_blank" rel="noreferrer">{inner}</a>
              ) : (
                <Link className={cls} to={l.href}>{inner}</Link>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
