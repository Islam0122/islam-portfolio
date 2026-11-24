import { useEffect, type ReactNode } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ExternalLink, GitBranch } from 'lucide-react'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { getProject } from '../data/projects'
import { useI18n } from '../i18n'
import Breadcrumbs from '../components/Breadcrumbs'
import { Card, Tag } from '../components/Section'
import ProductionBadge from '../components/ProductionBadge'
import OkurmenkidsDiagram from '../components/OkurmenkidsDiagram'
import YouTubeVideo from '../components/YouTubeVideo'
import VideoPlaceholder from '../components/VideoPlaceholder'
import NotFoundPage from './NotFoundPage'

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`${id}-h`} className="mt-12">
      <h2 id={`${id}-h`} className="text-2xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      <div className="mt-4 text-base leading-7 text-muted">{children}</div>
    </section>
  )
}

function BulletList({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  const ListTag = ordered ? 'ol' : 'ul'
  return (
    <ListTag className={`grid gap-3 ${ordered ? 'list-decimal pl-5' : ''}`}>
      {items.map((item) => (
        <li key={item} className={ordered ? 'pl-1' : 'flex gap-3'}>
          {!ordered && <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />}
          <span>{item}</span>
        </li>
      ))}
    </ListTag>
  )
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

  if (!project) return <NotFoundPage />

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16" aria-labelledby="case-title">
      <Breadcrumbs
        items={[
          { label: t.ui.common.home, to: '/' },
          { label: t.ui.nav.projects, to: '/projects' },
          { label: project.title },
        ]}
      />

      <header>
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {t.ui.categories[project.category]} · {project.period}
          </p>
          {project.production && <ProductionBadge label={s.inProduction} />}
        </div>
        <h1 id="case-title" className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">{project.tagline}</p>

        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">{s.myRole}</dt>
            <dd className="mt-1 text-sm font-medium text-ink">{project.role}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">{s.context}</dt>
            <dd className="mt-1 text-sm text-ink">{project.context}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">{s.liveDemo}</dt>
            <dd className="mt-1 text-sm text-ink">
              {project.live ? (
                <a className="break-all font-medium underline-offset-4 hover:underline" href={project.live} target="_blank" rel="noreferrer">
                  {project.live.replace(/^https?:\/\//, '')}
                  <span className="sr-only"> {t.ui.common.opensInNewTab}</span>
                </a>
              ) : (
                s.notAvailable
              )}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-ink hover:opacity-90"
          >
            <GitBranch size={16} aria-hidden="true" /> {s.viewSource}
            <span className="sr-only"> {t.ui.common.opensInNewTab}</span>
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink hover:border-accent"
            >
              <ExternalLink size={16} aria-hidden="true" /> {project.production ? s.openWebsite : s.liveDemoButton}
              <span className="sr-only"> {t.ui.common.opensInNewTab}</span>
            </a>
          )}
        </div>

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={s.technologiesUsed}>
          {project.stack.map((s) => (
            <li key={s}><Tag>{s}</Tag></li>
          ))}
        </ul>
      </header>

      {project.productionLinks.length > 0 && (
        <section aria-labelledby="production-h" className="mt-12">
          <h2 id="production-h" className="text-2xl font-semibold tracking-tight text-ink">{s.productionTitle}</h2>
          <p className="mt-2 text-base leading-7 text-muted">{s.productionIntro}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {project.productionLinks.map((l) => (
              <li key={l.url}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-surface p-5 transition hover:border-accent"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <ExternalLink size={18} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-ink">{l.label}</span>
                    <span className="mt-0.5 block break-all font-mono text-xs text-accent group-hover:underline">
                      {l.url.replace(/^https?:\/\//, '')}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-muted">{l.description}</span>
                    <span className="sr-only"> {t.ui.common.opensInNewTab}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(project.video || project.videoPending) && (
        <section id="video" aria-labelledby="video-h" className="mt-12 scroll-mt-24">
          <h2 id="video-h" className="text-2xl font-semibold tracking-tight text-ink">{s.video}</h2>
          <div className="mt-4">
            {project.video ? (
              <YouTubeVideo id={project.video.youtubeId} title={project.video.title} />
            ) : (
              project.videoPending && <VideoPlaceholder envVar={project.videoPending.envVar} poster={project.images[0]?.src} />
            )}
          </div>
          {project.video && <p className="mt-2 text-xs text-muted">{s.videoNote}</p>}
        </section>
      )}

      {project.images.length > 0 && (
        <div className={`mt-10 grid gap-4 ${project.images.length > 1 ? 'md:grid-cols-2' : ''}`}>
          {project.images.map((img) => (
            <figure key={img.src} className="overflow-hidden rounded-2xl border border-line bg-surface">
              <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="h-auto w-full object-cover" />
            </figure>
          ))}
        </div>
      )}

      <Block id="problem" title={s.problem}>
        <p>{project.problem}</p>
      </Block>
      <Block id="solution" title={s.solution}>
        <p>{project.solution}</p>
      </Block>
      {project.diagram === 'okurmenkids' && (
        <Block id="system-architecture" title={s.diagramTitle}>
          <p className="mb-5">{s.diagramIntro}</p>
          <OkurmenkidsDiagram />
        </Block>
      )}
      {project.capabilities.length > 0 && (
        <Block id="capabilities" title={s.capabilities}>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.capabilities.map((c) => (
              <Card key={c.title}>
                <h3 className="font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{c.body}</p>
              </Card>
            ))}
          </div>
        </Block>
      )}
      <Block id="contribution" title={s.contribution}>
        <p className="mb-4 text-sm">{s.contributionNote}</p>
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
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[520px] text-left text-sm">
              <caption className="sr-only">{s.apiCaption}</caption>
              <thead className="bg-surface-2 text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">{s.method}</th>
                  <th scope="col" className="px-4 py-3 font-medium">{s.path}</th>
                  <th scope="col" className="px-4 py-3 font-medium">{s.purpose}</th>
                </tr>
              </thead>
              <tbody>
                {project.endpoints.map((e) => (
                  <tr key={`${e.method}-${e.path}`} className="border-t border-line">
                    <td className="px-4 py-3 font-mono text-xs text-accent">{e.method}</td>
                    <td className="px-4 py-3 font-mono text-xs text-ink">{e.path}</td>
                    <td className="px-4 py-3 text-muted">{e.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm">{s.apiNote}</p>
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
          <div className="grid gap-4 sm:grid-cols-2">
            {project.metrics.map((m) => (
              <Card key={m.label}>
                <p className="text-3xl font-semibold tracking-tight text-ink">{m.value}</p>
                <p className="mt-2 text-sm text-muted">{m.label}</p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-accent">{s.source(t.ui.metricSources[m.source])}</p>
              </Card>
            ))}
          </div>
        </Block>
      )}
      <Block id="unverified" title={s.unverified}>
        <BulletList items={project.unavailable} />
      </Block>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
        <Link to="/projects" className="text-sm font-medium text-ink underline-offset-4 hover:underline">{s.allProjects}</Link>
        <Link to="/contact" className="text-sm font-medium text-ink underline-offset-4 hover:underline">{s.discuss}</Link>
      </div>
    </article>
  )
}
