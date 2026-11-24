import { Download } from 'lucide-react'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { SITE } from '../data/site'
import { useI18n } from '../i18n'
import Breadcrumbs from '../components/Breadcrumbs'
import ExperienceTimeline from '../components/ExperienceTimeline'
import { Card } from '../components/Section'

export default function ExperiencePage() {
  const { t } = useI18n()
  const s = t.ui.experience
  const hasCvFigures = t.profile.experience.some((job) => job.results.some((r) => r.source === 'CV'))

  useDocumentMeta({ ...s.meta, path: '/experience', type: 'profile' })

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs items={[{ label: t.ui.common.home, to: '/' }, { label: t.ui.nav.experience }]} />

      <header className="max-w-3xl">
        <p className="fade-in font-mono text-xs uppercase tracking-[0.18em] text-accent">{s.eyebrow}</p>
        <h1 id="exp-title" className="fade-in fade-in-delay-1 mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {s.title}
        </h1>
        <p className="fade-in fade-in-delay-2 mt-5 text-lg leading-8 text-muted">{s.intro}</p>
      </header>

      <dl className="fade-in fade-in-delay-2 mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
        {s.overview.map((item) => (
          <div key={item.label} className="bg-surface px-5 py-4">
            <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">{item.label}</dt>
            <dd className="mt-1 text-[15px] font-medium text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="timeline-h" className="mt-14 sm:mt-16">
        <h2 id="timeline-h" className="sr-only">
          {s.timelineLabel}
        </h2>
        <ExperienceTimeline jobs={t.profile.experience} />
        {hasCvFigures && <p className="mt-6 pl-6 text-xs leading-5 text-muted sm:pl-10 md:ml-[13rem]">{s.resultsNote}</p>}
      </section>

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
          <p className="mt-3 text-sm text-muted">{s.cvBody}</p>
          <a
            href={SITE.cvPath}
            download
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition hover:opacity-90"
          >
            <Download size={16} aria-hidden="true" /> {s.downloadCvPdf}
          </a>
        </Card>
      </div>
    </div>
  )
}
