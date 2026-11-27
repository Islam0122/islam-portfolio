import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { SITE } from '../data/site'
import { getFeaturedProjects, getProjects } from '../data/projects'
import { useI18n } from '../i18n'
import { cssVars } from '../lib/cssVars'
import { countProjectsUsing } from '../lib/stack'
import { trackPointer } from '../lib/usePointerGlow'
import { useReveal } from '../lib/useReveal'
import { SectionHeading, SplitHeadline } from '../components/Section'
import Hub from '../components/Hub'
import Portrait from '../components/Portrait'
import ProjectIndex from '../components/ProjectIndex'
import { CopyEmailButton } from '../components/Footer'

function ArrowLink({ to, children }: { to: string; children: string }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-2 text-sm font-semibold text-ink">
      <span className="link-draw">{children}</span>
      <ArrowRight size={16} aria-hidden="true" className="transition group-hover:translate-x-1" />
    </Link>
  )
}

/** Who this is: the portrait, the one-paragraph summary and the recruiter facts, in one band. */
function Brief() {
  const { t } = useI18n()
  const { profile } = t
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    <section aria-labelledby="brief-title" className="relative border-y border-line bg-surface">
      <div ref={ref} className={`reveal mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[minmax(0,21rem)_1fr] lg:gap-24 lg:px-8 ${visible ? 'is-visible' : ''}`}>
        <div className="mx-auto w-full max-w-[17rem] sm:max-w-xs lg:mx-0 lg:max-w-none lg:pt-4">
          <Portrait alt={profile.portraitAlt} />
        </div>
        <div className="min-w-0">
          <h2 id="brief-title" className="display text-[2.1rem] text-ink sm:text-5xl lg:text-[3.4rem]">
            {t.ui.about.title}
          </h2>
          <p className="prose-measure mt-7 text-lg leading-8 text-muted sm:text-xl sm:leading-9">{profile.summary}</p>
          <dl className="mt-12 grid gap-x-10 sm:grid-cols-2">
            {profile.facts.map((f) => (
              <div key={f.label} className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-line py-4 sm:grid-cols-[6.5rem_1fr]">
                <dt className="pt-px text-sm text-muted">{f.label}</dt>
                <dd className="font-medium leading-6 text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <ArrowLink to="/about">{t.ui.home.aboutLink}</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Skills as evidence: each technology carries the number of case studies on this site that use it. */
function Skills() {
  const { locale, t } = useI18n()
  const s = t.ui.home
  const projects = getProjects(locale)
  const { ref, visible } = useReveal<HTMLUListElement>()
  return (
    <ul ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
      {t.profile.skillGroups.map((g) => (
        <li key={g.title} className="group grid gap-4 border-b border-line py-7 first:border-t sm:py-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
          <h3 className="flex items-center gap-3 font-display text-lg font-medium tracking-tight text-ink">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-line-strong transition-colors duration-500 group-hover:bg-accent" />
            {g.title}
          </h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
            {g.items.map((item) => {
              const count = countProjectsUsing(projects, item)
              return (
                <li key={item} className={`text-lg leading-7 sm:text-xl ${count > 0 ? 'text-ink' : 'text-muted'}`}>
                  {item}
                  {count > 0 && (
                    <>
                      <sup aria-hidden="true" className="ml-1 font-display text-[0.7rem] font-medium text-accent">
                        {count}
                      </sup>
                      <span className="sr-only"> ({s.caseStudyCount(String(count))})</span>
                    </>
                  )}
                </li>
              )
            })}
          </ul>
        </li>
      ))}
    </ul>
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
        <div className="grid items-center gap-10 pb-16 pt-10 sm:pt-16 lg:min-h-[calc(100svh-4.25rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-12 lg:pt-4">
          <div className="relative z-10 min-w-0">
            <div className="enter">
              <p
                style={cssVars({ '--i': 0 })}
                className="inline-flex max-w-full items-start gap-2.5 text-sm leading-6 text-muted sm:items-center"
              >
                <span aria-hidden="true" className="pulse-dot mt-2 h-2 w-2 shrink-0 rounded-full bg-lake sm:mt-0" />
                <span>{profile.availability}</span>
              </p>
            </div>

            <SplitHeadline
              id="hero-title"
              lines={[first, rest.join(' ')]}
              className="mt-7 text-[clamp(2.6rem,10.5vw,6rem)] text-ink lg:text-[clamp(3.25rem,5.2vw,5.6rem)]"
            />

            <div className="enter">
              <p style={cssVars({ '--i': 3 })} className="mt-6 font-display text-base font-normal tracking-tight text-accent sm:text-lg">
                {profile.role}
              </p>
              <p style={cssVars({ '--i': 4 })} className="mt-5 max-w-[33rem] text-lg leading-8 text-muted sm:text-xl sm:leading-9">
                {profile.tagline}
              </p>
              <div style={cssVars({ '--i': 5 })} className="mt-9 flex flex-wrap gap-3">
                <Link to="/projects" onPointerMove={trackPointer} className="btn btn-primary">
                  {s.viewProjects} <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <a href={SITE.cvPath} download className="btn btn-ghost">
                  <Download size={16} aria-hidden="true" /> {s.downloadCvPdf}
                </a>
              </div>
              <div style={cssVars({ '--i': 6 })} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-line pt-6 text-sm">
                <span className="inline-flex min-w-0 items-center gap-3">
                  <a href={`mailto:${SITE.email}`} className="link-draw min-w-0 truncate font-medium text-ink">
                    {SITE.email}
                  </a>
                  <CopyEmailButton compact />
                </span>
                <nav aria-label={s.profilesLabel} className="flex flex-wrap gap-5 sm:ml-auto">
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
      </section>

      <Brief />

      <section aria-labelledby="featured-title" className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8">
        <SectionHeading title={s.featuredTitle} id="featured-title" aside={<ArrowLink to="/projects">{s.viewProjects}</ArrowLink>}>
          {s.featuredIntro}
        </SectionHeading>
        <ProjectIndex projects={getFeaturedProjects(locale)} />
      </section>

      <section aria-labelledby="skills-title" className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8">
        <SectionHeading
          title={s.skillsTitle}
          id="skills-title"
          aside={
            <span className="flex flex-wrap gap-x-8 gap-y-3">
              <ArrowLink to="/tech-stack">{s.seeFullStack}</ArrowLink>
              <ArrowLink to="/experience">{s.experienceLink}</ArrowLink>
            </span>
          }
        >
          {s.skillsIntro}
        </SectionHeading>
        <Skills />
      </section>
    </>
  )
}
