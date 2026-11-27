import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin } from 'lucide-react'
import type { ExperienceEntry, ExperienceResult } from '../types'
import { getProject } from '../data/projects'
import { useI18n } from '../i18n'
import { useReveal } from '../lib/useReveal'
import { Tag } from './Section'
import TundukMark from './TundukMark'

function SubHeading({ children }: { children: string }) {
  return <h4 className="text-sm font-semibold text-ink">{children}</h4>
}

function CurrentBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-lake/40 bg-lake-soft px-2.5 py-1 text-xs font-semibold leading-none text-lake">
      <span aria-hidden="true" className="pulse-dot h-1.5 w-1.5 rounded-full bg-lake" />
      {label}
    </span>
  )
}

function Result({ result }: { result: ExperienceResult }) {
  const { t } = useI18n()
  const verified = result.source === 'Repository'
  return (
    <li className="flex flex-col bg-surface p-5">
      <span className="display text-[2.1rem] text-ink">{result.value}</span>
      <span className="mt-2 text-sm leading-6 text-muted">{result.label}</span>
      <span className={`mt-auto pt-4 text-xs font-semibold ${verified ? 'text-lake' : 'text-muted'}`}>
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
              className="group/link flex h-full items-start justify-between gap-3 rounded-2xl border border-line px-4 py-3.5 transition hover:border-accent hover:bg-accent-soft"
            >
              <span className="min-w-0">
                <span className="block text-sm font-medium leading-5 text-ink">{p.title}</span>
                <span className="mt-1 block text-xs text-muted">
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
    <li ref={ref} className={`reveal relative md:grid md:grid-cols-[10.5rem_1fr] md:gap-x-8 ${visible ? 'is-visible' : ''}`}>
      {/* Dates column (tablet and up) */}
      <div className="hidden pt-1 md:block md:text-right"><div className="sticky top-28">
        <p className="font-display text-sm font-medium tracking-tight text-ink">{job.period}</p>
        <p className="mt-1 text-sm text-muted">{job.location}</p>
        {job.employmentType && <p className="mt-1 text-sm text-muted">{job.employmentType}</p>}
        {job.current && (
          <p className="mt-3">
            <CurrentBadge label={s.current} />
          </p>
        )}
      </div></div>

      {/* Rail + card */}
      <div className={`relative pl-8 sm:pl-12 ${isLast ? '' : 'pb-10 sm:pb-12'}`}>
        <span aria-hidden="true" className={`absolute left-[8px] top-6 w-px bg-gradient-to-b from-accent via-line-strong to-line ${isLast ? 'h-0' : 'bottom-0'}`} />
        <span aria-hidden="true" className="absolute left-0 top-4 flex h-[17px] w-[17px] items-center justify-center text-accent">
          <TundukMark size={17} className={job.current ? '' : 'opacity-60'} />
        </span>

        <article
          aria-labelledby={headingId}
          className="group rounded-[1.75rem] border border-line bg-surface p-5 transition duration-500 hover:border-line-strong hover:shadow-[var(--shadow)] sm:p-9"
        >
          <header className="flex items-start gap-3 sm:gap-4">
            <span
              aria-hidden="true"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong font-display text-sm font-medium text-accent transition duration-500 group-hover:rotate-[360deg] group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink sm:h-14 sm:w-14"
            >
              {job.monogram}
            </span>
            <div className="min-w-0 flex-1">
              <h3 id={headingId} className="font-display text-xl font-medium leading-snug tracking-tight text-ink sm:text-[1.65rem]">
                {job.role}
              </h3>
              <p className="mt-1 text-base font-medium text-muted">{job.company}</p>
            </div>
          </header>
          {/* Dates under the header on phones and small tablets */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 text-sm text-muted md:hidden">
            <span className="font-medium text-ink">{job.period}</span>
            <span className="inline-flex items-center gap-1">
              <MapPin size={13} aria-hidden="true" /> {job.location}
            </span>
            {job.employmentType && <span>{job.employmentType}</span>}
            {job.current && <CurrentBadge label={s.current} />}
          </div>

          <p className="prose-measure mt-6 text-[1.0625rem] leading-8 text-muted">{job.summary}</p>

          <div className="mt-7">
            <SubHeading>{s.responsibilities}</SubHeading>
            <ul className="mt-3 grid gap-3">
              {job.responsibilities.map((r) => (
                <li key={r.title} className="flex gap-3 text-[15px] leading-7 text-muted">
                  <span aria-hidden="true" className="mt-[11px] h-[5px] w-[5px] shrink-0 rotate-45 bg-accent" />
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
              <ul className={`mt-3 grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line ${job.results.length > 1 ? 'sm:grid-cols-2' : 'sm:max-w-sm'}`}>
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
