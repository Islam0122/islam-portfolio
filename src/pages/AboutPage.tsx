import { Link } from 'react-router-dom'
import { ArrowRight, Download } from 'lucide-react'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { SITE } from '../data/site'
import { useI18n } from '../i18n'
import { cssVars } from '../lib/cssVars'
import { trackPointer } from '../lib/usePointerGlow'
import Breadcrumbs from '../components/Breadcrumbs'
import { SplitHeadline } from '../components/Section'
import Portrait from '../components/Portrait'

export default function AboutPage() {
  const { t } = useI18n()
  const { profile } = t
  const s = t.ui.about

  useDocumentMeta({ ...s.meta, path: '/about', image: SITE.portrait })

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-16 lg:px-8">
      <Breadcrumbs items={[{ label: t.ui.common.home, to: '/' }, { label: t.ui.nav.about }]} />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
        <figure className="enter relative mx-auto w-full max-w-sm lg:sticky lg:top-28 lg:mx-0 lg:max-w-none lg:self-start">
          <div style={cssVars({ '--i': 1 })}>
            <Portrait alt={profile.portraitAlt} eager />
          </div>
          <figcaption style={cssVars({ '--i': 2 })} className="mt-8 flex items-center justify-center gap-2 text-sm text-muted lg:justify-start">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            {profile.location}
          </figcaption>
        </figure>

        <div>
          <SplitHeadline id="about-title" lines={[s.title]} className="text-[2.35rem] text-ink sm:text-6xl lg:text-[4.25rem]" />
          <div className="enter">
            <p style={cssVars({ '--i': 3 })} className="prose-measure mt-8 text-xl leading-9 text-ink/90 sm:text-[1.4rem] sm:leading-10">
              {profile.summary}
            </p>
          </div>

          <section aria-labelledby="how-h" className="mt-16">
            <h2 id="how-h" className="font-display text-2xl font-medium tracking-tight text-ink">{s.howIWork}</h2>
            <ul className="mt-6">
              {profile.workingPrinciples.map((p) => (
                <li key={p} className="flex gap-5 border-t border-line py-5 text-[1.0625rem] leading-8 text-muted last:border-b">
                  <span aria-hidden="true" className="mt-3 h-[6px] w-[6px] shrink-0 rotate-45 bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-16 grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line md:grid-cols-2">
            <section aria-labelledby="edu-h" className="bg-canvas p-7">
              <h2 id="edu-h" className="font-display text-lg font-medium tracking-tight text-ink">{s.education}</h2>
              <ul className="mt-5 grid gap-5">
                {profile.education.map((e) => (
                  <li key={e.title}>
                    <p className="font-medium leading-6 text-ink">{e.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">{e.detail}</p>
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="lang-h" className="bg-canvas p-7">
              <h2 id="lang-h" className="font-display text-lg font-medium tracking-tight text-ink">{s.languages}</h2>
              <ul className="mt-5 grid gap-1">
                {profile.languages.map((l) => (
                  <li key={l.name} className="flex items-baseline justify-between gap-4 border-b border-dashed border-line py-2.5">
                    <span className="font-medium text-ink">{l.name}</span>
                    <span className="text-sm text-muted">{l.level}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-6 text-muted">{s.languagesNote}</p>
            </section>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href={SITE.cvPath} download onPointerMove={trackPointer} className="btn btn-primary">
              <Download size={16} aria-hidden="true" /> {s.downloadCv}
            </a>
            <Link to="/experience" className="btn btn-ghost group">
              {s.seeExperience} <ArrowRight size={16} aria-hidden="true" className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
