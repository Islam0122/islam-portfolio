import { Download } from 'lucide-react'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { SITE } from '../data/site'
import { useI18n } from '../i18n'
import { cssVars } from '../lib/cssVars'
import { trackPointer } from '../lib/usePointerGlow'
import ExperienceTimeline from '../components/ExperienceTimeline'
import { PageHeader } from '../components/Section'

export default function ExperiencePage() {
  const { t } = useI18n()
  const s = t.ui.experience
  const hasCvFigures = t.profile.experience.some((job) => job.results.some((r) => r.source === 'CV'))

  useDocumentMeta({ ...s.meta, path: '/experience', type: 'profile' })

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        crumbs={[{ label: t.ui.common.home, to: '/' }, { label: t.ui.nav.experience }]}
        title={s.title}
        id="exp-title"
        intro={s.intro}
      >
        <div className="enter">
          <dl style={cssVars({ '--i': 4 })} className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-3">
            {s.overview.map((item) => (
              <div key={item.label} className="bg-canvas px-6 py-5">
                <dt className="text-sm text-muted">{item.label}</dt>
                <dd className="mt-1.5 font-display text-base font-medium tracking-tight text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </PageHeader>

      <section aria-labelledby="timeline-h" className="mt-4">
        <h2 id="timeline-h" className="sr-only">
          {s.timelineLabel}
        </h2>
        <ExperienceTimeline jobs={t.profile.experience} />
        {hasCvFigures && <p className="mt-6 pl-8 text-sm leading-6 text-muted sm:pl-12 md:ml-[12.5rem]">{s.resultsNote}</p>}
      </section>

      <div className="mt-24 grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line md:grid-cols-[1.3fr_1fr]">
        <section aria-labelledby="edu-h" className="bg-canvas p-7 sm:p-10">
          <h2 id="edu-h" className="font-display text-2xl font-medium tracking-tight text-ink">{s.educationTitle}</h2>
          <ul className="mt-7 grid gap-6">
            {t.profile.education.map((e) => (
              <li key={e.title} className="grid gap-1 border-l-2 border-accent pl-5">
                <p className="font-medium text-ink">{e.title}</p>
                <p className="text-sm leading-6 text-muted">{e.detail}</p>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="cv-h" className="flex flex-col bg-surface p-7 sm:p-10">
          <h2 id="cv-h" className="font-display text-2xl font-medium tracking-tight text-ink">{s.cvTitle}</h2>
          <p className="mt-4 leading-7 text-muted">{s.cvBody}</p>
          <div className="mt-auto pt-8">
            <a href={SITE.cvPath} download onPointerMove={trackPointer} className="btn btn-primary">
              <Download size={16} aria-hidden="true" /> {s.downloadCvPdf}
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
