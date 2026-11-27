import type { Project } from '../types'
import { useI18n } from '../i18n'
import { flowForProject } from '../lib/stack'
import { cssVars } from '../lib/cssVars'

/** Faint tunduk ring used as texture in the corner of every generated cover. */
function Ring() {
  return (
    <svg viewBox="-100 -100 200 200" className="absolute -bottom-[62%] -right-[8%] h-[105%] text-accent opacity-[0.12]">
      <circle r="96" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle r="60" fill="none" stroke="currentColor" strokeWidth="1" />
      {Array.from({ length: 16 }, (_, i) => (
        <line key={i} y1="-60" y2="-96" stroke="currentColor" strokeWidth="1" transform={`rotate(${i * 22.5})`} />
      ))}
      <circle r="22" fill="currentColor" />
    </svg>
  )
}

/**
 * Generated cover for projects without screenshots.
 * When the project has an architecture flow (same repository), the cover draws that real pipeline,
 * so each cover is specific to its project; otherwise it falls back to the stack arranged around a core.
 * Decorative: the title and stack are always shown next to it, so it is hidden from assistive tech.
 */
export default function ProjectPlate({ project, className = '' }: { project: Project; className?: string }) {
  const { t } = useI18n()
  const flow = flowForProject(t.ui.architecture.flows, project)

  if (flow) {
    const steps = flow.steps
    const n = steps.length
    return (
      <div aria-hidden="true" className={`@container relative overflow-hidden bg-surface-2 ${className}`}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(80% 100% at 15% 0%, var(--accent-soft), transparent 60%)' }} />
        <Ring />
        <div className="absolute inset-x-[7%] top-1/2 -translate-y-1/2">
          {/* Track and travelling packet */}
          <div className="absolute left-[6px] right-[6px] top-1/2 h-px -translate-y-1/2 bg-line-strong">
            <span className="packet absolute top-1/2 h-[max(8px,1.1cqw)] w-[max(8px,1.1cqw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_4px_var(--accent-soft)]" style={cssVars({ '--dur': `${n * 0.9}s` })} />
          </div>
          <ol className="relative flex justify-between">
            {steps.map((s, i) => {
              const edge = i === 0 || i === n - 1
              const above = i % 2 === 0
              return (
                <li key={s.label} className="relative flex h-[max(12px,1.5cqw)] w-[max(12px,1.5cqw)] items-center justify-center">
                  <span className={`h-full w-full rounded-full border-2 ${edge ? 'border-accent bg-accent' : 'border-ink/50 bg-surface-2'}`} />
                  <span
                    className={`absolute w-[max(7rem,16cqw)] font-display text-[max(0.68rem,1.55cqw)] font-medium leading-tight tracking-tight text-ink/90 ${above ? 'bottom-[max(1.4rem,3cqw)]' : 'top-[max(1.4rem,3cqw)]'} ${
                      i === 0 ? 'left-0 text-left' : i === n - 1 ? 'right-0 text-right' : 'left-1/2 -translate-x-1/2 text-center'
                    }`}
                  >
                    {s.label}
                    <span className="mt-1 hidden font-sans text-[max(0.7rem,1.05cqw)] font-normal leading-snug tracking-normal text-muted @[52rem]:block">
                      {s.detail}
                    </span>
                  </span>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }

  const items = project.stack.slice(0, 6)
  return (
    <div aria-hidden="true" className={`@container relative overflow-hidden bg-surface-2 ${className}`}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(70% 90% at 70% 40%, var(--accent-soft), transparent 70%)' }} />
      <Ring />
      <ul className="absolute bottom-4 left-5 top-4 flex flex-col justify-center gap-1.5">
        {items.map((tech) => (
          <li key={tech} className="font-display text-[max(0.85rem,2cqw)] font-medium tracking-tight text-ink/80">
            {tech}
          </li>
        ))}
      </ul>
    </div>
  )
}
