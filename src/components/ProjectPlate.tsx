import type { Project } from '../types'

/**
 * Generated cover for projects without screenshots: the project's own stack arranged around a tunduk core.
 * Decorative (the title is always shown next to it), so hidden from assistive tech.
 */
export default function ProjectPlate({ project, className = '' }: { project: Project; className?: string }) {
  const items = project.stack.slice(0, 6)
  return (
    <div aria-hidden="true" className={`relative overflow-hidden bg-surface-2 ${className}`}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(70% 90% at 70% 40%, var(--accent-soft), transparent 70%)' }} />
      <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <g transform="translate(270 112)">
          <circle r="150" fill="none" className="stroke-line-strong" strokeDasharray="2 8" />
          <circle r="96" fill="none" className="stroke-line-strong" />
          {items.map((_, i) => {
            const a = ((-90 + (i * 360) / items.length) * Math.PI) / 180
            return (
              <g key={i}>
                <line x1={Math.cos(a) * 36} y1={Math.sin(a) * 36} x2={Math.cos(a) * 96} y2={Math.sin(a) * 96} className="stroke-line-strong" />
                <circle cx={Math.cos(a) * 96} cy={Math.sin(a) * 96} r="4.5" className="fill-canvas stroke-accent" strokeWidth="1.5" />
              </g>
            )
          })}
          <circle r="34" className="fill-accent" />
          <g className="stroke-accent-ink" strokeWidth="1.25" opacity="0.6">
            <path d="M-12 -31v62M12 -31v62M-31 -12h62M-31 12h62" />
          </g>
        </g>
      </svg>
      <ul className="absolute bottom-4 left-4 top-4 flex flex-col justify-center gap-1.5 sm:left-6">
        {items.map((tech) => (
          <li key={tech} className="font-mono text-[11px] leading-4 text-muted sm:text-xs">
            {tech}
          </li>
        ))}
      </ul>
    </div>
  )
}
