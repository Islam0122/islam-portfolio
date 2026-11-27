import { Link } from 'react-router-dom'
import { ArrowUpRight, GitBranch, Play } from 'lucide-react'
import type { Project } from '../types'
import { useI18n } from '../i18n'
import { useReveal } from '../lib/useReveal'
import { Tag } from './Section'
import ProductionBadge from './ProductionBadge'
import ProjectPlate from './ProjectPlate'
import { projectCover } from '../lib/projectCover'

/** Actions for projects with a demo video (published or pending): GitHub and the demo section. */
export function ShowcaseActions({ project }: { project: Project }) {
  const { t } = useI18n()
  const s = t.ui.projectCard
  if (project.video === null && project.videoPending === null) return null
  return (
    // z-10 lifts the actions above the card-wide link overlay
    <div className="relative z-10 flex flex-wrap gap-2">
      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        aria-label={`${s.githubLabel(project.title)} ${t.ui.common.opensInNewTab}`}
        className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line-strong px-3.5 py-1.5 text-sm font-medium text-ink transition hover:border-accent hover:bg-accent-soft"
      >
        <GitBranch size={15} aria-hidden="true" /> {s.github}
      </a>
      <Link
        to={`/projects/${project.slug}#video`}
        aria-label={s.watchDemoLabel(project.title)}
        className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-sm font-semibold text-accent-ink transition hover:bg-accent-bright"
      >
        <Play size={14} fill="currentColor" aria-hidden="true" /> {s.watchDemo}
      </Link>
    </div>
  )
}

/**
 * Editorial project card: a large cover panel and the text set beneath it, without a box around the text.
 * `wide` lays the cover and text side by side (used for the first project on the projects page).
 */
export default function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  const { t } = useI18n()
  const s = t.ui.projectCard
  const { ref, visible } = useReveal<HTMLElement>()
  const cover = projectCover(project)

  return (
    <article
      ref={ref}
      className={`reveal group relative ${visible ? 'is-visible' : ''} ${wide ? 'grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center' : 'flex flex-col'}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-line bg-surface-2">
        {cover ? (
          <img
            src={cover}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-[1200ms] ease-out-expo group-hover:scale-[1.04]"
          />
        ) : (
          <ProjectPlate project={project} className="h-full w-full transition duration-[1200ms] ease-out-expo group-hover:scale-[1.04]" />
        )}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        {project.video && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
            <Play size={11} fill="currentColor" aria-hidden="true" /> {s.videoBadge}
          </span>
        )}
        <span
          aria-hidden="true"
          className="absolute bottom-4 right-4 inline-flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-accent text-accent-ink opacity-0 transition duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight size={20} />
        </span>
      </div>

      <div className={wide ? '' : 'pt-6'}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
          <span className="font-medium text-ink">{t.ui.categories[project.category]}</span>
          <span aria-hidden="true" className="h-px w-5 bg-line-strong" />
          <span>{project.period}</span>
          {project.production && <ProductionBadge label={s.inProduction} />}
        </div>
        <h3 className={`mt-3 font-display font-medium tracking-tight text-ink ${wide ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
          <Link
            to={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
            style={{ transition: 'color 300ms' }}
          >
            {project.title}
          </Link>
        </h3>
        <p className="prose-measure mt-3 text-[0.98rem] leading-7 text-muted">{project.tagline}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={s.technologies}>
          {project.stack.slice(0, 6).map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
          {project.stack.length > 6 && (
            <li>
              <Tag>+{project.stack.length - 6}</Tag>
            </li>
          )}
        </ul>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <ShowcaseActions project={project} />
          <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
            {s.readCaseStudy}
            <ArrowUpRight size={16} aria-hidden="true" className="transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </p>
        </div>
      </div>
    </article>
  )
}
