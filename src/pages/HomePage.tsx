import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Download, Mail } from 'lucide-react'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { SITE } from '../data/site'
import { getFeaturedProjects } from '../data/projects'
import { useI18n } from '../i18n'
import { cssVars } from '../lib/cssVars'
import { trackPointer } from '../lib/usePointerGlow'
import { useReveal } from '../lib/useReveal'
import { SectionHeading, SplitHeadline } from '../components/Section'
import Hub from '../components/Hub'
import ProjectIndex from '../components/ProjectIndex'

function Facts() {
  const { t } = useI18n()
  const { ref, visible } = useReveal<HTMLDListElement>()
  return (
    <dl
      ref={ref}
      className={`reveal grid grid-cols-2 gap-px border-y border-line bg-line sm:grid-cols-3 xl:grid-cols-6 ${visible ? 'is-visible' : ''}`}
    >
      {t.profile.facts.map((f) => (
        <div key={f.label} className="bg-canvas px-4 py-6 sm:px-5">
          <dt className="text-sm text-muted">{f.label}</dt>
          <dd className="mt-1.5 text-[0.98rem] font-medium leading-6 text-ink">{f.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Skills() {
  const { t } = useI18n()
  const s = t.ui.home
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={`reveal grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line md:grid-cols-3 ${visible ? 'is-visible' : ''}`}>
      {t.profile.skillGroups.slice(0, 3).map((g, gi) => (
        <section key={g.title} aria-labelledby={`skill-${gi}`} className="bg-canvas p-7 sm:p-9">
          <h3 id={`skill-${gi}`} className="flex items-center gap-3 font-display text-lg font-medium tracking-tight text-ink">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
            {g.title}
          </h3>
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2.5 text-[1.05rem] text-ink/85">
            {g.items.map((i) => (
              <li key={i} className="whitespace-nowrap">{i}</li>
            ))}
          </ul>
        </section>
      ))}
      <p className="flex flex-wrap items-center gap-x-8 gap-y-3 bg-canvas px-7 py-6 text-sm md:col-span-3 sm:px-9">
        <Link className="group inline-flex items-center gap-1.5 font-semibold text-ink" to="/tech-stack">
          <span className="link-draw">{s.seeFullStack}</span>
          <ArrowRight size={15} aria-hidden="true" className="transition group-hover:translate-x-1" />
        </Link>
        <Link className="group inline-flex items-center gap-1.5 font-semibold text-ink" to="/experience">
          <span className="link-draw">{s.experienceLink}</span>
          <ArrowRight size={15} aria-hidden="true" className="transition group-hover:translate-x-1" />
        </Link>
      </p>
    </div>
  )
}

export default function HomePage() {
  const { locale, t } = useI18n()
  const { profile } = t
  const s = t.ui.home
  const [first, ...rest] = profile.name.split(' ')

  useDocumentMeta({ ...s.meta, path: '/', image: SITE.portrait })

  return (
    <>
      <section aria-labelledby="hero-title" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 pb-14 pt-10 sm:pt-16 lg:min-h-[calc(100svh-4.25rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-16 lg:pt-6">
          <div className="relative z-10 min-w-0">
            <div className="enter">
              <p
                style={cssVars({ '--i': 0 })}
                className="inline-flex max-w-full items-start gap-2.5 rounded-2xl border border-line bg-surface/70 py-1.5 pl-2.5 pr-4 text-sm leading-6 text-muted sm:items-center sm:rounded-full"
              >
                <span aria-hidden="true" className="pulse-dot mt-2 h-2 w-2 shrink-0 rounded-full bg-lake sm:mt-0" />
                <span>{profile.availability}</span>
              </p>
            </div>

            <SplitHeadline
              id="hero-title"
              lines={[first, rest.join(' ')]}
              className="mt-8 text-[clamp(2.6rem,10.5vw,6.25rem)] text-ink lg:text-[clamp(3.5rem,6.3vw,6.25rem)]"
            />

            <div className="enter">
              <p style={cssVars({ '--i': 3 })} className="mt-6 font-display text-base font-normal tracking-tight text-accent sm:text-lg">
                {profile.role}
              </p>
              <p style={cssVars({ '--i': 4 })} className="mt-5 max-w-[34rem] text-lg leading-8 text-muted sm:text-xl sm:leading-9">
                {profile.tagline}
              </p>
              <div style={cssVars({ '--i': 5 })} className="mt-9 flex flex-wrap gap-3">
                <Link to="/projects" onPointerMove={trackPointer} className="btn btn-primary">
                  {s.viewProjects} <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <a href={SITE.cvPath} download className="btn btn-ghost">
                  <Download size={16} aria-hidden="true" /> {s.downloadCvPdf}
                </a>
                <a href={`mailto:${SITE.email}`} className="btn btn-ghost max-sm:w-full max-sm:justify-center">
                  <Mail size={16} aria-hidden="true" /> <span className="truncate">{SITE.email}</span>
                </a>
              </div>
              <nav style={cssVars({ '--i': 6 })} aria-label={s.profilesLabel} className="mt-7 flex flex-wrap gap-6 text-sm">
                {[
                  { label: 'GitHub', href: SITE.github },
                  { label: 'LinkedIn', href: SITE.linkedin },
                  { label: 'Telegram', href: SITE.telegramUrl },
                ].map((l) => (
                  <a key={l.label} className="group inline-flex items-center gap-1 text-muted hover:text-ink" href={l.href} target="_blank" rel="noreferrer">
                    <span className="link-draw">{l.label}</span>
                    <ArrowUpRight size={14} aria-hidden="true" className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    <span className="sr-only"> {t.ui.common.opensInNewTab}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <figure className="enter relative mx-auto w-full max-w-[34rem] lg:max-w-none">
            <div style={cssVars({ '--i': 2 })} className="lg:-mr-8 lg:scale-[1.04]">
              <Hub label={s.hubLabel} />
            </div>
            <figcaption style={cssVars({ '--i': 6 })} className="mx-auto mt-4 max-w-sm text-center text-sm leading-6 text-muted">
              {s.hubCaption}
            </figcaption>
          </figure>
        </div>

        <Facts />
      </section>

      <section aria-labelledby="featured-title" className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8">
        <SectionHeading
          title={s.featuredTitle}
          id="featured-title"
          aside={
            <Link to="/projects" className="group inline-flex items-center gap-2 text-sm font-semibold text-ink">
              <span className="link-draw">{s.viewProjects}</span>
              <ArrowRight size={16} aria-hidden="true" className="transition group-hover:translate-x-1" />
            </Link>
          }
        >
          {s.featuredIntro}
        </SectionHeading>
        <ProjectIndex projects={getFeaturedProjects(locale)} />
      </section>

      <section aria-labelledby="skills-title" className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8">
        <SectionHeading title={s.skillsTitle} id="skills-title" />
        <Skills />
      </section>
    </>
  )
}
