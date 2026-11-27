import { useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, GitBranch } from 'lucide-react'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { getProject } from '../data/projects'
import { useI18n } from '../i18n'
import { cssVars } from '../lib/cssVars'
import { trackPointer } from '../lib/usePointerGlow'
import { SplitHeadline } from '../components/Section'
import { NextProject, ReadingProgress, TechList } from '../components/CaseStudyParts'
import ProjectPlate from '../components/ProjectPlate'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductionBadge from '../components/ProductionBadge'
import OkurmenkidsDiagram from '../components/OkurmenkidsDiagram'
import YouTubeVideo from '../components/YouTubeVideo'
import VideoPlaceholder from '../components/VideoPlaceholder'
import NotFoundPage from './NotFoundPage'

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="mt-16 scroll-mt-28 border-t border-line pt-10 first:mt-0 first:border-t-0 first:pt-0">
      <h2 id={`${id}-h`} className="font-display text-2xl font-medium tracking-tight text-ink sm:text-[1.75rem]">
        {title}
      </h2>
      <div className="mt-6 text-[1.0625rem] leading-8 text-muted">{children}</div>
    </section>
  )
}

function BulletList({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  if (ordered) {
    // Data flow is a real sequence, so it gets numbered steps on a rail.
    return (
      <ol className="relative grid gap-5 before:absolute before:bottom-4 before:left-[15px] before:top-4 before:w-px before:bg-line-strong">
        {items.map((item, i) => (
          <li key={item} className="relative flex gap-5">
            <span
              aria-hidden="true"
              className="relative z-10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent bg-canvas font-display text-xs font-medium text-accent"
            >
              {i + 1}
            </span>
            <span className="pt-0.5">{item}</span>
          </li>
        ))}
      </ol>
    )
  }
  return (
    <ul className="grid gap-4">
      {items.map((item) => (
        <li key={item} className="flex gap-4">
          <span aria-hidden="true" className="mt-[0.8rem] h-[5px] w-[5px] shrink-0 rotate-45 bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Highlights the section currently in view in the table of contents. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join('|')
  useEffect(() => {
    const els = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (els.length === 0 || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-20% 0px -65% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])
  return active
}

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const { locale, t } = useI18n()
  const s = t.ui.project
  const project = getProject(locale, slug)
  const { hash } = useLocation()

  // Deep links such as /projects/cover-studio#video (the "Watch demo" button) scroll to their section.
  useEffect(() => {
    if (!hash) return
    const frame = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' }))
    return () => cancelAnimationFrame(frame)
  }, [hash, slug])

  useDocumentMeta({
    title: project ? s.metaTitle(project.title) : s.notFoundMeta.title,
    description: project ? project.tagline : s.notFoundMeta.description,
    path: project ? `/projects/${project.slug}` : '/projects',
    noindex: !project,
    type: 'article',
  })

  const sections: { id: string; title: string }[] = project
    ? [
        project.productionLinks.length > 0 && { id: 'production', title: s.productionTitle },
        (project.video || project.videoPending) && { id: 'video', title: s.video },
        { id: 'problem', title: s.problem },
        { id: 'solution', title: s.solution },
        project.diagram === 'okurmenkids' && { id: 'system-architecture', title: s.diagramTitle },
        project.capabilities.length > 0 && { id: 'capabilities', title: s.capabilities },
        { id: 'contribution', title: s.contribution },
        { id: 'architecture', title: s.architecture },
        { id: 'data-flow', title: s.dataFlow },
        project.database.length > 0 && { id: 'database', title: s.database },
        project.endpoints.length > 0 && { id: 'api', title: s.api },
        project.operations.length > 0 && { id: 'operations', title: s.operations },
        { id: 'challenges', title: s.challenges },
        project.metrics.length > 0 && { id: 'results', title: s.results },
        { id: 'unverified', title: s.unverified },
      ].filter((x): x is { id: string; title: string } => Boolean(x))
    : []
  const active = useActiveSection(sections.map((x) => x.id))

  if (!project) return <NotFoundPage />

  // The video section shows the poster, so the gallery starts with the screenshots.
  const [lead, ...gallery] = project.images

  return (
    <article aria-labelledby="case-title">
      <ReadingProgress />
      <header className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:px-8">
        <Breadcrumbs
          items={[
            { label: t.ui.common.home, to: '/' },
            { label: t.ui.nav.projects, to: '/projects' },
            { label: project.title },
          ]}
        />
        <div className="enter flex flex-wrap items-center gap-3 text-sm text-muted">
          <span style={cssVars({ '--i': 0 })} className="font-medium text-ink">{t.ui.categories[project.category]}</span>
          <span style={cssVars({ '--i': 0 })} aria-hidden="true" className="h-px w-5 bg-line-strong" />
          <span style={cssVars({ '--i': 1 })}>{project.period}</span>
          {project.production && (
            <span style={cssVars({ '--i': 1 })}>
              <ProductionBadge label={s.inProduction} />
            </span>
          )}
        </div>
        <SplitHeadline id="case-title" lines={[project.title]} className="mt-5 max-w-6xl text-[2.2rem] text-ink sm:text-6xl lg:text-[4.5rem]" />

        <div className="enter mt-8 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div style={cssVars({ '--i': 3 })}>
            <p className="prose-measure text-xl leading-9 text-muted">{project.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={project.github} target="_blank" rel="noreferrer" onPointerMove={trackPointer} className="btn btn-primary">
                <GitBranch size={16} aria-hidden="true" /> {s.viewSource}
                <span className="sr-only"> {t.ui.common.opensInNewTab}</span>
              </a>
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  <ExternalLink size={16} aria-hidden="true" /> {project.production ? s.openWebsite : s.liveDemoButton}
                  <span className="sr-only"> {t.ui.common.opensInNewTab}</span>
                </a>
              )}
            </div>
            <div className="mt-10 border-t border-line pt-6">
              <TechList items={project.stack} label={s.technologiesUsed} />
            </div>
          </div>
          <dl style={cssVars({ '--i': 4 })} className="grid content-start gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line">
            <div className="bg-surface px-5 py-4">
              <dt className="text-sm text-muted">{s.myRole}</dt>
              <dd className="mt-1 font-medium leading-6 text-ink">{project.role}</dd>
            </div>
            <div className="bg-surface px-5 py-4">
              <dt className="text-sm text-muted">{s.context}</dt>
              <dd className="mt-1 leading-6 text-ink">{project.context}</dd>
            </div>
            <div className="bg-surface px-5 py-4">
              <dt className="text-sm text-muted">{s.liveDemo}</dt>
              <dd className="mt-1 leading-6 text-ink">
                {project.live ? (
                  <a className="link-draw break-all font-mono text-sm text-accent" href={project.live} target="_blank" rel="noreferrer">
                    {project.live.replace(/^https?:\/\//, '')}
                    <span className="sr-only"> {t.ui.common.opensInNewTab}</span>
                  </a>
                ) : (
                  s.notAvailable
                )}
              </dd>
            </div>
          </dl>
        </div>

      </header>

      {project.video || project.videoPending ? (
        <section id="video" aria-labelledby="video-h" className="mx-auto max-w-7xl scroll-mt-24 px-4 sm:px-6 lg:px-8">
          <h2 id="video-h" className="sr-only">{s.video}</h2>
          {project.video ? (
            <YouTubeVideo id={project.video.youtubeId} title={project.video.title} poster={project.video.poster} />
          ) : (
            project.videoPending && <VideoPlaceholder envVar={project.videoPending.envVar} poster={project.videoPending.poster ?? lead?.src} />
          )}
          {project.video && <p className="mt-3 text-sm text-muted">{s.videoNote}</p>}
        </section>
      ) : lead ? (
        <figure className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <img src={lead.src} alt={lead.alt} loading="eager" decoding="async" className="w-full rounded-[2rem] border border-line object-cover shadow-[var(--shadow)]" />
        </figure>
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProjectPlate project={project} className="aspect-[21/9] w-full rounded-[2rem] border border-line max-sm:aspect-[4/3]" />
        </div>
      )}

      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16 lg:px-8 xl:grid-cols-[15rem_minmax(0,1fr)]">
        <nav aria-label={project.title} className="hidden lg:block">
          <ol className="sticky top-28 grid gap-0.5 border-l border-line">
            {sections.map((sec) => (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  className={`-ml-px block border-l py-1.5 pl-4 text-sm leading-5 transition-colors ${
                    active === sec.id ? 'border-accent font-medium text-ink' : 'border-transparent text-muted hover:text-ink'
                  }`}
                >
                  {sec.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0 max-w-4xl">
          {project.productionLinks.length > 0 && (
            <Block id="production" title={s.productionTitle}>
              <p>{s.productionIntro}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {project.productionLinks.map((l) => (
                  <li key={l.url}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex h-full flex-col rounded-[1.25rem] border border-line bg-surface p-5 transition duration-300 hover:-translate-y-0.5 hover:border-accent"
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="font-display text-base font-medium tracking-tight text-ink">{l.label}</span>
                        <ArrowUpRight size={18} aria-hidden="true" className="shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                      </span>
                      <span className="mt-1 block break-all font-mono text-xs text-accent">{l.url.replace(/^https?:\/\//, '')}</span>
                      <span className="mt-3 block text-sm leading-6 text-muted">{l.description}</span>
                      <span className="sr-only"> {t.ui.common.opensInNewTab}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {(project.video || project.videoPending ? project.images : gallery).length > 0 && (
            <div className="mt-16 grid gap-4 sm:grid-cols-2">
              {(project.video || project.videoPending ? project.images : gallery).map((img, i, arr) => (
                <figure
                  key={img.src}
                  className={`overflow-hidden rounded-[1.25rem] border border-line bg-surface ${arr.length % 2 === 1 && i === 0 ? 'sm:col-span-2' : ''}`}
                >
                  <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </figure>
              ))}
            </div>
          )}

          <div className="mt-16 grid grid-cols-1">
            <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line md:grid-cols-2">
              <section id="problem" aria-labelledby="problem-h" className="scroll-mt-28 bg-surface p-7 sm:p-9">
                <h2 id="problem-h" className="flex items-center gap-3 font-display text-xl font-medium tracking-tight text-ink">
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full border-2 border-muted" />
                  {s.problem}
                </h2>
                <p className="mt-5 text-[1.0625rem] leading-8 text-muted">{project.problem}</p>
              </section>
              <section id="solution" aria-labelledby="solution-h" className="scroll-mt-28 bg-surface p-7 sm:p-9" style={{ backgroundImage: 'linear-gradient(160deg, var(--accent-soft), transparent 55%)' }}>
                <h2 id="solution-h" className="flex items-center gap-3 font-display text-xl font-medium tracking-tight text-ink">
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-accent" />
                  {s.solution}
                </h2>
                <p className="mt-5 text-[1.0625rem] leading-8 text-ink/85">{project.solution}</p>
              </section>
            </div>
            {project.diagram === 'okurmenkids' && (
              <Block id="system-architecture" title={s.diagramTitle}>
                <p className="prose-measure mb-6">{s.diagramIntro}</p>
                <OkurmenkidsDiagram />
              </Block>
            )}
            {project.capabilities.length > 0 && (
              <Block id="capabilities" title={s.capabilities}>
                <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2">
                  {project.capabilities.map((c) => (
                    <div key={c.title} className="bg-canvas p-6">
                      <h3 className="font-display text-base font-medium tracking-tight text-ink">{c.title}</h3>
                      <p className="mt-2 text-[0.95rem] leading-7 text-muted">{c.body}</p>
                    </div>
                  ))}
                </div>
              </Block>
            )}
            <Block id="contribution" title={s.contribution}>
              <p className="mb-6 rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-6">{s.contributionNote}</p>
              <BulletList items={project.contribution} />
            </Block>
            <Block id="architecture" title={s.architecture}>
              <BulletList items={project.architecture} />
            </Block>
            <Block id="data-flow" title={s.dataFlow}>
              <BulletList items={project.dataFlow} ordered />
            </Block>
            {project.database.length > 0 && (
              <Block id="database" title={s.database}>
                <BulletList items={project.database} />
              </Block>
            )}
            {project.endpoints.length > 0 && (
              <Block id="api" title={s.api}>
                <div className="overflow-x-auto rounded-[1.25rem] border border-line bg-surface">
                  <table className="w-full min-w-[560px] text-left text-sm">
                    <caption className="sr-only">{s.apiCaption}</caption>
                    <thead className="text-muted">
                      <tr className="border-b border-line">
                        <th scope="col" className="px-5 py-3.5 font-medium">{s.method}</th>
                        <th scope="col" className="px-5 py-3.5 font-medium">{s.path}</th>
                        <th scope="col" className="px-5 py-3.5 font-medium">{s.purpose}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.endpoints.map((e) => (
                        <tr key={`${e.method}-${e.path}`} className="border-t border-line transition-colors first:border-t-0 hover:bg-surface-2/60">
                          <td className="px-5 py-3.5">
                            <span
                              className={`inline-flex rounded-md px-2 py-0.5 font-mono text-[11px] font-medium ${
                                e.method === 'GET' ? 'bg-lake-soft text-lake' : 'bg-accent-soft text-accent'
                              }`}
                            >
                              {e.method}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 font-mono text-xs text-ink">{e.path}</td>
                          <td className="px-5 py-3.5 leading-6 text-muted">{e.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm leading-6">{s.apiNote}</p>
              </Block>
            )}
            {project.operations.length > 0 && (
              <Block id="operations" title={s.operations}>
                <BulletList items={project.operations} />
              </Block>
            )}
            <Block id="challenges" title={s.challenges}>
              <BulletList items={project.challenges} />
            </Block>
            {project.metrics.length > 0 && (
              <Block id="results" title={s.results}>
                <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="bg-canvas p-6 sm:p-7">
                      <p className="display text-[2.6rem] text-ink">{m.value}</p>
                      <p className="mt-3 text-[0.95rem] leading-6 text-muted">{m.label}</p>
                      <p className={`mt-4 text-xs font-semibold ${m.source === 'Repository' ? 'text-lake' : 'text-muted'}`}>
                        {s.source(t.ui.metricSources[m.source])}
                      </p>
                    </div>
                  ))}
                </div>
              </Block>
            )}
            <Block id="unverified" title={s.unverified}>
              <BulletList items={project.unavailable} />
            </Block>
          </div>

          <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8 text-sm font-semibold">
            <Link to="/projects" className="group inline-flex items-center gap-2 text-ink">
              <ArrowLeft size={16} aria-hidden="true" className="transition group-hover:-translate-x-1" />
              <span className="link-draw">{s.allProjects.replace(/^←\s*/, '')}</span>
            </Link>
            <Link to="/contact" className="group inline-flex items-center gap-2 text-ink">
              <span className="link-draw">{s.discuss.replace(/\s*→$/, '')}</span>
              <ArrowRight size={16} aria-hidden="true" className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      <NextProject current={project} />
    </article>
  )
}
