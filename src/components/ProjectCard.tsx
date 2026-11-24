import { Link } from 'react-router-dom'
import { ArrowUpRight, GitBranch, Play } from 'lucide-react'
import type { Project } from '../types'
import { useI18n } from '../i18n'
import { Tag } from './Section'
import ProductionBadge from './ProductionBadge'

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useI18n()
  const s = t.ui.projectCard
  // Projects with a demo video (published or pending) get a showcase card: screenshot + GitHub / demo actions.
  const showcase = project.video !== null || project.videoPending !== null
  const cover = showcase ? project.images[0] : undefined
  return (
    <article className="group relative flex flex-col rounded-2xl border border-line bg-surface p-6 transition hover:border-accent">
      {cover && (
        <div className="-mx-2 -mt-2 mb-5 aspect-[16/9] overflow-hidden rounded-xl border border-line bg-surface-2">
          <img
            src={cover.src}
            alt={cover.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
          />
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
