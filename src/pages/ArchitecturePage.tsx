import { ArrowUpRight } from 'lucide-react'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { useI18n } from '../i18n'
import type { ArchitectureFlow } from '../types'
import { cssVars } from '../lib/cssVars'
import { useReveal } from '../lib/useReveal'
import { PageHeader } from '../components/Section'

/**
 * One flow drawn as a pipeline: stations on a track, with a request packet travelling the path.
 * Horizontal on wide screens, vertical on phones.
 */
function FlowDiagram({ flow, index }: { flow: ArchitectureFlow; index: number }) {
  const { t } = useI18n()
  const { ref, visible } = useReveal<HTMLElement>()
  const n = flow.steps.length
  const dur = `${n * 1.1}s`

  return (
    <section ref={ref} aria-labelledby={`flow-${index}`} className={`reveal rounded-[2rem] border border-line bg-surface p-6 sm:p-10 ${visible ? 'is-visible' : ''}`}>
      <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <h2 id={`flow-${index}`} className="font-display text-2xl font-medium tracking-tight text-ink sm:text-[1.75rem]">
          {flow.title}
        </h2>
        <p className="leading-7 text-muted">{flow.note}</p>
      </div>

      <div className="relative mt-10">
        {/* Track (desktop) */}
        <div aria-hidden="true" className="absolute left-[calc(100%/var(--n)/2)] right-[calc(100%/var(--n)/2)] top-[9px] hidden h-px bg-line-strong lg:block" style={cssVars({ '--n': n })}>
          <span className="packet absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_5px_var(--accent-soft)]" style={cssVars({ '--dur': dur })} />
        </div>
        {/* Track (phones and tablets) */}
        <div aria-hidden="true" className="absolute bottom-6 left-[9px] top-2 w-px bg-line-strong lg:hidden">
          <span className="packet-y absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_5px_var(--accent-soft)]" style={cssVars({ '--dur': dur })} />
        </div>

        <ol
          aria-label={t.ui.architecture.stepsLabel(flow.title)}
          className="relative grid gap-6 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))] lg:gap-4"
          style={cssVars({ '--n': n })}
        >
            {flow.steps.map((step, i) => (
              <li key={step.label} className="relative flex gap-4 lg:flex-col lg:items-center lg:gap-5 lg:text-center">
                <span
                  aria-hidden="true"
                  className={`relative z-10 mt-0.5 inline-flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full border-2 bg-surface lg:mt-0 ${
                    i === 0 || i === n - 1 ? 'border-accent' : 'border-line-strong'
                  }`}
                >
                  <span className={`h-[7px] w-[7px] rounded-full ${i === 0 || i === n - 1 ? 'bg-accent' : 'bg-line-strong'}`} />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-[0.95rem] font-medium leading-snug tracking-tight text-ink">{step.label}</p>
                  <p className="mt-1.5 text-sm leading-6 text-muted [overflow-wrap:anywhere]">{step.detail}</p>
                </div>
              </li>
            ))}
        </ol>
      </div>

      <p className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line pt-5 text-sm text-muted">
        {t.ui.architecture.source}
        <a className="group inline-flex items-center gap-1 font-medium text-ink" href={flow.source.href} target="_blank" rel="noreferrer">
          <span className="link-draw">{flow.source.label}</span>
          <ArrowUpRight size={14} aria-hidden="true" className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          <span className="sr-only"> {t.ui.common.opensInNewTab}</span>
        </a>
      </p>
    </section>
  )
}

export default function ArchitecturePage() {
  const { t } = useI18n()
  const s = t.ui.architecture

  useDocumentMeta({ ...s.meta, path: '/architecture' })

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader crumbs={[{ label: t.ui.common.home, to: '/' }, { label: t.ui.nav.architecture }]} title={s.title} id="arch-title" intro={s.intro} />

      <div className="grid gap-6">
        {s.flows.map((f, i) => (
          <FlowDiagram key={f.source.href} flow={f} index={i} />
        ))}
      </div>

      <section aria-labelledby="principles" className="mt-24 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 id="principles" className="display text-[2rem] text-ink sm:text-[2.5rem]">{s.principlesTitle}</h2>
          <div className="mt-8 rounded-[1.5rem] border border-line p-6 sm:p-7">
            <h3 className="font-display text-lg font-medium tracking-tight text-ink">{s.writeupsTitle}</h3>
            <p className="mt-3 text-[0.95rem] leading-7 text-muted">{s.writeupsBody}</p>
            <a
              href="https://github.com/Islam0122/django-architecture-lab"
              target="_blank"
              rel="noreferrer"
              className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
            >
              <span className="link-draw">{s.writeupsLink}</span>
              <ArrowUpRight size={15} aria-hidden="true" className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="sr-only"> {t.ui.common.opensInNewTab}</span>
            </a>
          </div>
        </div>
        <ul className="grid content-start">
          {s.principles.map((p) => (
            <li key={p} className="flex gap-5 border-t border-line py-6 text-lg leading-8 text-ink last:border-b">
              <span aria-hidden="true" className="mt-3 h-[6px] w-[6px] shrink-0 rotate-45 bg-accent" />
              {p}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
