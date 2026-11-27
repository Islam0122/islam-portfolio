import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../types'
import { useI18n } from '../i18n'
import { useReducedMotion } from '../lib/useReducedMotion'
import { useReveal } from '../lib/useReveal'
import { Tag } from './Section'
import ProductionBadge from './ProductionBadge'
import ProjectPlate from './ProjectPlate'
import { ShowcaseActions } from './ProjectCard'
import { projectCover } from '../lib/projectCover'

function Row({ project, onEnter }: { project: Project; onEnter: () => void }) {
  const { t } = useI18n()
  const s = t.ui.projectCard
  const { ref, visible } = useReveal<HTMLLIElement>()
  const cover = projectCover(project)

  return (
    <li ref={ref} className={`reveal border-t border-line last:border-b ${visible ? 'is-visible' : ''}`} onPointerEnter={onEnter}>
      <article className="group relative grid gap-6 py-8 transition-colors duration-500 sm:py-10 md:grid-cols-[1fr_auto] md:items-center md:gap-10 lg:px-4 lg:hover:bg-surface/60">
        {/* Phones and tablets see the cover inline; desktops get the floating preview instead. */}
        <div className="overflow-hidden rounded-2xl border border-line lg:hidden">
          {cover ? (
            <img src={cover} alt="" loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
          ) : (
            <ProjectPlate project={project} className="aspect-[16/9] w-full" />
          )}
        </div>

        <div className="min-w-0 lg:max-w-[38rem]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
            <span className="font-medium text-ink">{t.ui.categories[project.category]}</span>
            <span aria-hidden="true" className="h-px w-5 bg-line-strong" />
            <span>{project.period}</span>
            {project.production && <ProductionBadge label={s.inProduction} />}
          </div>
          <h3 className="mt-3 font-display text-[1.7rem] font-medium leading-[1.1] tracking-tight text-ink transition-transform duration-700 ease-out-expo sm:text-[2.35rem] lg:group-hover:translate-x-2">
            <Link to={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {project.title}
            </Link>
          </h3>
          <p className="prose-measure mt-3 text-[0.98rem] leading-7 text-muted lg:max-w-[52ch]">{project.tagline}</p>
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={s.technologies}>
            {project.stack.slice(0, 5).map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
            {project.stack.length > 5 && (
              <li>
                <Tag>+{project.stack.length - 5}</Tag>
              </li>
            )}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 empty:hidden md:flex-col md:items-end">
          <span
            aria-hidden="true"
            className="order-2 hidden h-14 w-14 items-center md:inline-flex justify-center rounded-full border border-line-strong text-ink transition duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink md:order-1"
          >
            <ArrowUpRight size={22} />
          </span>
          <div className="order-1 md:order-2">
            <ShowcaseActions project={project} />
          </div>
        </div>
      </article>
    </li>
  )
}

/**
 * The home page's project list: large rows; on desktop a cover image floats after the pointer.
 */
export default function ProjectIndex({ projects }: { projects: Project[] }) {
  const wrap = useRef<HTMLDivElement>(null)
  const preview = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const frame = useRef<number | undefined>(undefined)
  const [active, setActive] = useState<number | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => () => cancelAnimationFrame(frame.current ?? 0), [])

  function loop() {
    const p = pos.current
    const tg = target.current
    p.x += (tg.x - p.x) * 0.14
    p.y += (tg.y - p.y) * 0.14
    if (preview.current) preview.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`
    if (Math.abs(tg.x - p.x) > 0.3 || Math.abs(tg.y - p.y) > 0.3) frame.current = requestAnimationFrame(loop)
    else frame.current = undefined
  }

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse' || !wrap.current) return
    const r = wrap.current.getBoundingClientRect()
    // The preview lives in the clear column between the text and the actions; it follows the pointer vertically
    // and drifts only slightly sideways, so it never covers the title being read.
    const x = e.clientX - r.left
    target.current = { x: r.width * 0.715 + (x - r.width * 0.5) * 0.06, y: e.clientY - r.top }
    if (reduced) {
      pos.current = { ...target.current }
    }
    if (frame.current === undefined) frame.current = requestAnimationFrame(loop)
  }

  return (
    <div ref={wrap} className="relative" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
      <ol>
        {projects.map((p, i) => (
          <Row key={p.slug} project={p} onEnter={() => setActive(i)} />
        ))}
      </ol>

      <div
        ref={preview}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 hidden w-[19rem] lg:block xl:w-[22rem]"
        style={{ transform: 'translate3d(-999px, -999px, 0)' }}
      >
        <div
          className={`relative aspect-[16/10] overflow-hidden rounded-2xl border border-line shadow-[var(--shadow)] transition duration-500 ease-out-expo ${
            active === null ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          {projects.map((p, i) => {
            const cover = projectCover(p)
            return (
              <div
                key={p.slug}
                className="absolute inset-0 transition-[opacity,clip-path] duration-700 ease-out-expo"
                style={{
                  opacity: active === i ? 1 : 0,
                  clipPath: active === i ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
                }}
              >
                {cover ? (
                  <img src={cover} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                ) : (
                  <ProjectPlate project={p} className="h-full w-full" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
