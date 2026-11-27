import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Project } from '../types'
import { getProjects } from '../data/projects'
import { useI18n } from '../i18n'
import { projectCover } from '../lib/projectCover'
import { useReveal } from '../lib/useReveal'
import { Tag } from './Section'
import ProjectPlate from './ProjectPlate'

const COLLAPSED = 8

/** Stack list that shows the first few technologies and expands on request. */
export function TechList({ items, label }: { items: string[]; label: string }) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const hidden = items.length - COLLAPSED
  const shown = open || hidden <= 0 ? items : items.slice(0, COLLAPSED)
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <ul id="case-stack" className="contents" aria-label={label}>
        {shown.map((tech) => (
          <li key={tech}>
            <Tag>{tech}</Tag>
          </li>
        ))}
      </ul>
      {hidden > 0 && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls="case-stack"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center rounded-full px-2.5 py-[0.3rem] text-[0.78rem] font-semibold leading-none text-accent transition hover:bg-accent-soft"
        >
          {open ? t.ui.project.showFewerTech : t.ui.project.showAllTech(String(items.length))}
        </button>
      )}
    </div>
  )
}

/** Thin apricot line under the header that fills as the case study is read. */
export function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-[4.25rem] z-40 h-[2px]">
      <div ref={bar} className="h-full origin-left bg-accent" style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}

/** A large invitation to the following case study (wrapping to the first after the last). */
export function NextProject({ current }: { current: Project }) {
  const { locale, t } = useI18n()
  const { ref, visible } = useReveal<HTMLElement>()
  const all = getProjects(locale)
  const next = all[(all.findIndex((p) => p.slug === current.slug) + 1) % all.length]
  if (!next || next.slug === current.slug) return null
  const cover = projectCover(next)

  return (
    <section ref={ref} aria-labelledby="next-h" className={`reveal mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8 ${visible ? 'is-visible' : ''}`}>
      <Link
        to={`/projects/${next.slug}`}
        className="group grid overflow-hidden rounded-[2rem] border border-line bg-surface transition duration-500 hover:border-accent md:grid-cols-[1fr_1.1fr]"
      >
        <div className="flex flex-col justify-between gap-10 p-7 sm:p-10">
          <p className="flex items-center gap-3 text-sm font-semibold text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent transition-all duration-500 group-hover:w-14" />
            {t.ui.project.nextProject}
          </p>
          <div>
            <h2 id="next-h" className="display text-3xl text-ink sm:text-[2.6rem]">
              {next.title}
            </h2>
            <p className="mt-4 max-w-md leading-7 text-muted">{next.tagline}</p>
          </div>
          <span
            aria-hidden="true"
            className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-ink transition duration-500 ease-out-expo group-hover:translate-x-2"
          >
            <ArrowRight size={22} />
          </span>
        </div>
        <div className="relative min-h-56 overflow-hidden border-t border-line md:border-l md:border-t-0">
          {cover ? (
            <img src={cover} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] ease-out-expo group-hover:scale-105" />
          ) : (
            <ProjectPlate project={next} className="absolute inset-0 h-full w-full transition duration-[1400ms] ease-out-expo group-hover:scale-105" />
          )}
        </div>
      </Link>
    </section>
  )
}
