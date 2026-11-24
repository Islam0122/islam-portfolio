import { Link } from 'react-router-dom'
import { Download } from 'lucide-react'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { SITE } from '../data/site'
import { getProject } from '../data/projects'
import { useI18n } from '../i18n'
import Breadcrumbs from '../components/Breadcrumbs'
import { Card, SectionHeading } from '../components/Section'

export default function ExperiencePage() {
  const { locale, t } = useI18n()
  const s = t.ui.experience

  useDocumentMeta({ ...s.meta, path: '/experience' })

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs items={[{ label: t.ui.common.home, to: '/' }, { label: t.ui.nav.experience }]} />
      <SectionHeading level={1} eyebrow={s.eyebrow} title={s.title} id="exp-title">
        {s.intro}
      </SectionHeading>

      <ol className="relative grid gap-8 border-l border-line pl-6 sm:pl-8">
        {t.profile.experience.map((job) => (
          <li key={job.company + job.period} className="relative">
            <span aria-hidden="true" className="absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-accent sm:-left-[39px]" />
            <article>
              <p className="font-mono text-xs uppercase tracking-wider text-accent">{job.period} · {job.location}</p>
              <h2 className="mt-2 text-2xl font-semibold text-ink">{job.role}</h2>
              <p className="text-base font-medium text-muted">{job.company}</p>
              <p className="mt-4 text-base leading-7 text-muted">{job.summary}</p>
              <ul className="mt-5 grid gap-3">
                {job.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-base leading-7 text-muted">
                    <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
              {job.projectSlugs.length > 0 && (
                <p className="mt-5 text-sm text-muted">
                  {s.relatedCaseStudies}{' '}
                  {job.projectSlugs.map((slug, i) => {
                    const p = getProject(locale, slug)
                    if (!p) return null
                    return (
                      <span key={slug}>
                        {i > 0 && ', '}
                        <Link className="font-medium text-ink underline-offset-4 hover:underline" to={`/projects/${p.slug}`}>{p.title}</Link>
                      </span>
                    )
                  })}
                </p>
              )}
            </article>
          </li>
        ))}
      </ol>

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold text-ink">{s.educationTitle}</h2>
          <ul className="mt-4 grid gap-4">
            {t.profile.education.map((e) => (
              <li key={e.title}>
                <p className="font-medium text-ink">{e.title}</p>
                <p className="text-sm text-muted">{e.detail}</p>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold text-ink">{s.cvTitle}</h2>
          <p className="mt-3 text-sm text-muted">
            {s.cvBody}
          </p>
          <a
            href={SITE.cvPath}
            download
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-ink hover:opacity-90"
          >
            <Download size={16} aria-hidden="true" /> {s.downloadCvPdf}
          </a>
        </Card>
      </div>
    </div>
  )
}
