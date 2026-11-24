import { Link } from 'react-router-dom'
import { ArrowUpRight, GitBranch, Play } from 'lucide-react'
import type { Project } from '../types'
import { useI18n } from '../i18n'
import { Tag } from './Section'
import ProductionBadge from './ProductionBadge'

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useI18n()
  const s = t.ui.projectCard
  // Projects with a demo video (published or pending) get a showcase card: poster + GitHub / demo actions.
  const showcase = project.video !== null || project.videoPending !== null
  const poster = project.video?.poster ?? project.videoPending?.poster ?? (showcase ? project.images[0]?.src : undefined)
  return (
    <article className="group relative flex flex-col rounded-2xl border border-line bg-surface p-6 transition hover:border-accent">
      {poster && (
        <div className="relative -mx-6 -mt-6 mb-5 aspect-video overflow-hidden rounded-t-2xl border-b border-line bg-surface-2">
          <img src={poster} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
          {project.video && (
            <>
              <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white ring-2 ring-white/40 backdrop-blur transition group-hover:bg-accent group-hover:text-accent-ink">
                  <Play size={20} fill="currentColor" className="translate-x-0.5" />
                </span>
              </span>
              <span className="absolute right-3 top-3 rounded-full bg-black/65 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-white">
                {s.videoBadge}
              </span>
            </>
          )}
        </div>
      )}
      <div className="flex items-center justify-between gap-3">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-accent">{t.ui.categories[project.category]}</span>
          {project.production && <ProductionBadge label={s.inProduction} />}
        </span>
        <span className="text-xs text-muted">{project.period}</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold text-ink">
        <Link to={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-6 text-muted">{project.tagline}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={s.technologies}>
        {project.stack.slice(0, 6).map((tech) => (
          <li key={tech}>
            <Tag>{tech}</Tag>
          </li>
        ))}
        {project.stack.length > 6 && <li><Tag>+{project.stack.length - 6}</Tag></li>}
      </ul>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
        {showcase && (
          // z-10 lifts the actions above the card-wide link overlay
          <div className="relative z-10 flex flex-wrap gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${s.githubLabel(project.title)} ${t.ui.common.opensInNewTab}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-2 text-sm font-medium text-ink transition hover:border-accent"
            >
              <GitBranch size={15} aria-hidden="true" /> {s.github}
            </a>
            <Link
              to={`/projects/${project.slug}#video`}
              aria-label={s.watchDemoLabel(project.title)}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-2 text-sm font-semibold text-accent-ink transition hover:opacity-90"
            >
              <Play size={15} aria-hidden="true" /> {s.watchDemo}
            </Link>
          </div>
        )}
        <p className="flex items-center gap-1 text-sm font-medium text-ink">
          {s.readCaseStudy} <ArrowUpRight size={16} aria-hidden="true" className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </p>
      </div>
    </article>
  )
}
