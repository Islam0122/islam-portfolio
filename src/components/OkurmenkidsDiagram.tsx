import { AppWindow, Database, GraduationCap, Globe, Layers, Server, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useI18n } from '../i18n'

function Node({ icon: Icon, label, detail, strong = false }: { icon: LucideIcon; label: string; detail: string; strong?: boolean }) {
  // "host · tech · tech" → host on its own line, the rest below it.
  const [first, ...rest] = detail.split(' · ')
  return (
    <div
      className={`relative z-10 flex h-full items-center gap-3 rounded-xl border px-3 py-3 lg:px-4 ${
        strong ? 'border-accent bg-accent-soft' : 'border-line bg-surface-2'
      }`}
    >
      <span
        aria-hidden="true"
        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          strong ? 'bg-accent text-accent-ink' : 'bg-surface text-accent'
        }`}
      >
        <Icon size={18} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-ink">{label}</span>
        <span className="block font-mono text-[11px] leading-4 text-muted [overflow-wrap:anywhere]">{first}</span>
        {rest.length > 0 && <span className="block font-mono text-[11px] leading-4 text-muted">{rest.join(' · ')}</span>}
      </span>
    </div>
  )
}

/** Vertical bracket that joins the centres of N equal rows to one horizontal stub. */
function Bracket({ rows, side }: { rows: number; side: 'left' | 'right' }) {
  const edge = `${50 / rows}%`
  return (
    <div aria-hidden="true" className="relative hidden md:block">
      <span className="absolute left-1/2 w-px -translate-x-1/2 bg-accent" style={{ top: edge, bottom: edge }} />
      {Array.from({ length: rows }, (_, i) => (
        <span
          key={i}
          className={`absolute h-px w-1/2 bg-accent ${side === 'left' ? 'left-0' : 'right-0'}`}
          style={{ top: `${((i + 0.5) / rows) * 100}%` }}
        />
      ))}
      <span className={`absolute top-1/2 h-px w-1/2 bg-accent ${side === 'left' ? 'right-0' : 'left-0'}`} />
    </div>
  )
}

function DownArrow() {
  return (
    <span aria-hidden="true" className="py-2 text-center font-mono text-accent md:hidden">
      ↓
    </span>
  )
}

/** Public Website / LMS / Training / Admin ─┬─ Django REST API ─┬─ PostgreSQL, Redis / Celery */
export default function OkurmenkidsDiagram() {
  const { t } = useI18n()
  const d = t.ui.diagram
  const clients = [
    { icon: Globe, ...d.website },
    { icon: AppWindow, ...d.lms },
    { icon: GraduationCap, ...d.training },
    { icon: ShieldCheck, ...d.admin },
  ]

  return (
    <figure className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
      <div role="img" aria-label={d.ariaLabel}>
        <div aria-hidden="true" className="mb-3 hidden font-mono text-[11px] uppercase tracking-wider text-muted md:grid md:grid-cols-[1.3fr_2rem_1fr_2rem_1fr] lg:grid-cols-[1.25fr_2.5rem_1fr_2.5rem_1fr]">
          <span>{d.clientsLabel}</span>
          <span />
          <span>{d.backendLabel}</span>
          <span />
          <span>{d.dataLabel}</span>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-[1.3fr_2rem_1fr_2rem_1fr] lg:grid-cols-[1.25fr_2.5rem_1fr_2.5rem_1fr]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 md:grid-rows-4">
            {clients.map((c) => (
              <div key={c.label} className="py-1.5 sm:px-1 md:px-0">
                <Node icon={c.icon} label={c.label} detail={c.detail} />
              </div>
            ))}
          </div>
          <Bracket rows={4} side="left" />
          <DownArrow />
          <div className="flex items-center">
            <div className="w-full">
              <Node icon={Server} label={d.api.label} detail={d.api.detail} strong />
            </div>
          </div>
          <Bracket rows={2} side="right" />
          <DownArrow />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 md:grid-rows-2">
            {[
              { icon: Database, ...d.postgres },
              { icon: Layers, ...d.jobs },
            ].map((n) => (
              <div key={n.label} className="flex items-stretch py-1.5 sm:px-1 md:items-center md:px-0">
                <div className="w-full">
                  <Node icon={n.icon} label={n.label} detail={n.detail} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-5 border-t border-line pt-4">
        <ul className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-accent">
          {d.hosting.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <p className="mt-3 text-xs leading-5 text-muted">{d.note}</p>
      </figcaption>
    </figure>
  )
}
