import type { ReactNode } from 'react'
import { cssVars } from '../lib/cssVars'
import Breadcrumbs, { type Crumb } from './Breadcrumbs'

/**
 * Section heading. level={1} for a page's main heading; the default h2 is for sections within a page.
 * `eyebrow` is accepted for compatibility but intentionally not rendered: breadcrumbs carry page context.
 */
export function SectionHeading({
  title,
  children,
  id,
  level = 2,
  aside,
}: {
  eyebrow?: string
  title: string
  children?: ReactNode
  id?: string
  level?: 1 | 2
  aside?: ReactNode
}) {
  const Heading = level === 1 ? 'h1' : 'h2'
  return (
    <header className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 sm:mb-14">
      <div className="max-w-3xl">
        <Heading id={id} className="display text-[2rem] text-ink sm:text-[2.75rem]">
          {title}
        </Heading>
        {children && <div className="prose-measure mt-5 text-[1.0625rem] leading-7 text-muted">{children}</div>}
      </div>
      {aside}
    </header>
  )
}

/** Splits a headline into lines that rise out of a mask, one after another. */
export function SplitHeadline({ lines, className = '', id }: { lines: string[]; className?: string; id?: string }) {
  return (
    <h1 id={id} className={`display ${className}`}>
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="split-line" style={cssVars({ '--i': i })}>
          <span>{line}</span>
        </span>
      ))}
    </h1>
  )
}

/** Header for inner pages: breadcrumbs, a large animated title and an intro paragraph. */
export function PageHeader({
  crumbs,
  title,
  id,
  intro,
  children,
}: {
  crumbs: Crumb[]
  title: string
  id: string
  intro?: ReactNode
  children?: ReactNode
}) {
  return (
    <header className="relative pb-12 pt-10 sm:pb-16 sm:pt-16">
      <Breadcrumbs items={crumbs} />
      <SplitHeadline id={id} lines={[title]} className="max-w-5xl text-[2.35rem] text-ink sm:text-6xl lg:text-[4.75rem]" />
      {intro && (
        <div className="enter">
          <p style={cssVars({ '--i': 3 })} className="prose-measure mt-7 text-lg leading-8 text-muted sm:text-xl sm:leading-9">
            {intro}
          </p>
        </div>
      )}
      {children}
    </header>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[1.5rem] border border-line bg-surface p-6 sm:p-7 ${className}`}>{children}</div>
}

export function Tag({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'accent' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-[0.3rem] text-[0.78rem] font-medium leading-none ${
        tone === 'accent' ? 'border-accent/40 bg-accent-soft text-accent' : 'border-line bg-surface-2/70 text-muted'
      }`}
    >
      {children}
    </span>
  )
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div role="status" className="relative overflow-hidden rounded-[2rem] border border-dashed border-line-strong px-6 py-16 text-center sm:py-20">
      <svg aria-hidden="true" viewBox="-100 -100 200 200" className="spin-slow mx-auto mb-6 h-20 w-20 text-accent">
        <circle r="70" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 8" />
        <circle r="16" fill="currentColor" opacity="0.9" />
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1="0" y1="-28" x2="0" y2="-58" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" transform={`rotate(${i * 45})`} />
        ))}
      </svg>
      <p className="font-display text-xl font-medium tracking-tight text-ink">{title}</p>
      {children && <div className="mx-auto mt-3 max-w-md text-[0.95rem] leading-7 text-muted">{children}</div>}
    </div>
  )
}
