import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin } from 'lucide-react'
import type { ExperienceEntry, ExperienceResult } from '../types'
import { getProject } from '../data/projects'
import { useI18n } from '../i18n'
import { useReveal } from '../lib/useReveal'
import { Tag } from './Section'

function SubHeading({ children }: { children: string }) {
  return <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted">{children}</h4>
}

function CurrentBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent-soft px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-accent">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
      {label}
    </span>
  )
}

function Result({ result }: { result: ExperienceResult }) {
  const { t } = useI18n()
  const verified = result.source === 'Repository'
  return (
    <li className="flex flex-col rounded-xl border border-line bg-surface-2/60 p-4">
      <span className="text-2xl font-semibold tracking-tight text-ink">{result.value}</span>
      <span className="mt-1 text-sm leading-6 text-muted">{result.label}</span>
      <span
        className={`mt-3 self-start rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
          verified ? 'border-accent/40 text-accent' : 'border-line text-muted'
        }`}
      >
        {t.ui.project.source(t.ui.metricSources[result.source])}
      </span>
    </li>
  )
}

function RelatedProjects({ slugs }: { slugs: ExperienceEntry['projectSlugs'] }) {
  const { locale, t } = useI18n()
  const s = t.ui.experience
  const projects = slugs.map((slug) => getProject(locale, slug)).filter((p) => p !== undefined)
  if (projects.length === 0) return null

  return (
    <div className="mt-8">
      <SubHeading>{s.relatedProjects}</SubHeading>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link
              to={`/projects/${p.slug}`}
              aria-label={s.openCaseStudy(p.title)}
              className="group/link flex h-full items-start justify-between gap-3 rounded-xl border border-line px-4 py-3 transition hover:border-accent hover:bg-accent-soft"
            >
              <span className="min-w-0">
                <span className="block text-sm font-medium leading-5 text-ink">{p.title}</span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-muted">
                  {t.ui.categories[p.category]}
                </span>
              </span>
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-muted transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-accent"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TimelineItem({ job, isLast }: { job: ExperienceEntry; isLast: boolean }) {
  const { t } = useI18n()
  const s = t.ui.experience
  const { ref, visible } = useReveal<HTMLLIElement>()
  const headingId = `job-${job.monogram.toLowerCase()}`

  return (
    <li ref={ref} className={`reveal relative md:grid md:grid-cols-[10.5rem_1fr] md:gap-x-10 ${visible ? 'is-visible' : ''}`}>
      {/* Dates column (tablet and up) */}
      <div className="hidden pt-1 md:block md:text-right">
        <p className="font-mono text-sm font-medium text-ink">{job.period}</p>
        <p className="mt-1 text-sm text-muted">{job.location}</p>
        {job.employmentType && <p className="mt-1 text-sm text-muted">{job.employmentType}</p>}
        {job.current && (
          <p className="mt-3">
            <CurrentBadge label={s.current} />
          </p>
        )}
      </div>

      {/* Rail + card */}
      <div className={`relative pl-6 sm:pl-10 ${isLast ? '' : 'pb-10 sm:pb-12'}`}>
        <span aria-hidden="true" className={`absolute left-[5px] top-3 w-px bg-line ${isLast ? 'h-0' : 'bottom-0'}`} />
        <span aria-hidden="true" className="absolute left-0 top-2.5 flex h-[11px] w-[11px] items-center justify-center">
          {job.current && <span className="absolute h-full w-full animate-ping rounded-full bg-accent opacity-40 motion-reduce:hidden" />}
          <span
            className={`relative h-[11px] w-[11px] rounded-full border-2 ${
              job.current ? 'border-accent bg-accent' : 'border-accent bg-canvas'
            }`}
          />
        </span>

        <article
          aria-labelledby={headingId}
          className="group rounded-2xl border border-line bg-surface p-5 shadow-[0_1px_2px_rgba(20,32,51,0.04)] transition duration-300 hover:border-accent/50 hover:shadow-[0_12px_32px_-18px_rgba(20,32,51,0.25)] max-sm:p-4 sm:p-8"
        >
          <header className="flex items-start gap-3 sm:gap-4">
            <span
              aria-hidden="true"
              className="inline-flex h-10 w-10 shrink-0 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-line bg-surface-2 font-mono text-sm font-semibold tracking-wider text-accent transition duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink"
            >
              {job.monogram}
            </span>
            <div className="min-w-0 flex-1">
              <h3 id={headingId} className="text-xl font-semibold leading-snug tracking-tight text-ink sm:text-2xl">
                {job.role}
              </h3>
              <p className="mt-1 text-base font-medium text-muted">{job.company}</p>
            </div>
          </header>
          {/* Dates under the header on phones and small tablets */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 text-sm text-muted md:hidden">
            <span className="font-mono text-ink">{job.period}</span>
            <span className="inline-flex items-center gap-1">
              <MapPin size={13} aria-hidden="true" /> {job.location}
            </span>
            {job.employmentType && <span>{job.employmentType}</span>}
            {job.current && <CurrentBadge label={s.current} />}
          </div>

          <p className="mt-5 text-base leading-7 text-muted">{job.summary}</p>

          <div className="mt-7">
            <SubHeading>{s.responsibilities}</SubHeading>
            <ul className="mt-3 grid gap-3">
              {job.responsibilities.map((r) => (
                <li key={r.title} className="flex gap-3 text-[15px] leading-7 text-muted">
                  <span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>
                    <span className="font-medium text-ink">{r.title}.</span> {r.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {job.results.length > 0 && (
            <div className="mt-8">
              <SubHeading>{s.results}</SubHeading>
              <ul className={`mt-3 grid gap-3 ${job.results.length > 1 ? 'sm:grid-cols-2' : 'sm:max-w-sm'}`}>
                {job.results.map((r) => (
                  <Result key={r.label} result={r} />
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8">
            <SubHeading>{s.stack}</SubHeading>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {job.stack.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>
          </div>

          <RelatedProjects slugs={job.projectSlugs} />
        </article>
      </div>
    </li>
  )
}

export default function ExperienceTimeline({ jobs }: { jobs: ExperienceEntry[] }) {
  return (
    <ol className="relative">
      {jobs.map((job, i) => (
        <TimelineItem key={job.company + job.period} job={job} isLast={i === jobs.length - 1} />
      ))}
    </ol>
  )
}
