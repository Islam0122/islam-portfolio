import { Link } from 'react-router-dom'
import { Download } from 'lucide-react'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { SITE } from '../data/site'
import { useI18n } from '../i18n'
import { Card, SectionHeading } from '../components/Section'
import Breadcrumbs from '../components/Breadcrumbs'

export default function AboutPage() {
  const { t } = useI18n()
  const { profile } = t
  const s = t.ui.about

  useDocumentMeta({ ...s.meta, path: '/about', image: SITE.portrait })

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs items={[{ label: t.ui.common.home, to: '/' }, { label: t.ui.nav.about }]} />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr]">
        <figure className="mx-auto w-full max-w-xs lg:mx-0">
          <img
            src={SITE.portrait}
            alt={profile.portraitAlt}
            width={960}
            height={958}
            className="aspect-square w-full rounded-2xl border border-line object-cover"
            loading="eager"
            decoding="async"
          />
          <figcaption className="mt-3 text-sm text-muted">{profile.location}</figcaption>
        </figure>

        <div>
          <SectionHeading level={1} eyebrow={s.eyebrow} title={s.title} id="about-title">
            {profile.summary}
          </SectionHeading>

          <h2 className="text-xl font-semibold text-ink">{s.howIWork}</h2>
          <ul className="mt-4 grid gap-3">
            {profile.workingPrinciples.map((p) => (
              <li key={p} className="flex gap-3 text-base leading-7 text-muted">
                <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Card>
              <h2 className="text-lg font-semibold text-ink">{s.education}</h2>
              <ul className="mt-4 grid gap-4">
                {profile.education.map((e) => (
                  <li key={e.title}>
                    <p className="font-medium text-ink">{e.title}</p>
                    <p className="text-sm text-muted">{e.detail}</p>
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h2 className="text-lg font-semibold text-ink">{s.languages}</h2>
              <ul className="mt-4 grid gap-3">
                {profile.languages.map((l) => (
                  <li key={l.name} className="flex justify-between gap-4 text-sm">
                    <span className="font-medium text-ink">{l.name}</span>
                    <span className="text-muted">{l.level}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted">{s.languagesNote}</p>
            </Card>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={SITE.cvPath}
              download
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-ink hover:opacity-90"
            >
              <Download size={16} aria-hidden="true" /> {s.downloadCv}
            </a>
            <Link to="/experience" className="inline-flex items-center rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink hover:border-accent">
              {s.seeExperience}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
