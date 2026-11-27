import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { useReducedMotion } from '../lib/useReducedMotion'
import { cssVars } from '../lib/cssVars'

/** Technologies on the orbit. Names are language-neutral, taken from the projects on this site. */
const NODES = ['Django', 'PostgreSQL', 'Celery', 'Redis', 'React', 'TypeScript', 'FastAPI', 'Docker'] as const

const ORBIT = 200
const LABEL = 234
const CORE = 64
const LATTICE = 118

function polar(r: number, deg: number) {
  const a = (deg * Math.PI) / 180
  return { x: +(r * Math.cos(a)).toFixed(2), y: +(r * Math.sin(a)).toFixed(2) }
}

/**
 * The signature figure: a tunduk lattice at the centre acting as the API, with spokes to the stack around it.
 * Request packets travel out along the spokes; the active spoke cycles on its own and follows hover.
 * Purely illustrative, so it is exposed to assistive tech as one image with a text alternative.
 */
export default function Hub({ label, centre = 'API', sub = 'Django REST' }: { label: string; centre?: string; sub?: string }) {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced || hovered !== null) return
    const id = window.setInterval(() => setActive((a) => (a + 1) % NODES.length), 2200)
    return () => window.clearInterval(id)
  }, [reduced, hovered])

  const current = hovered ?? active

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType !== 'mouse' || !wrap.current) return
    const r = wrap.current.getBoundingClientRect()
    wrap.current.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
    wrap.current.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
  }
  function onLeave() {
    wrap.current?.style.setProperty('--px', '0')
    wrap.current?.style.setProperty('--py', '0')
    setHovered(null)
  }

  const layer = (depth: number) =>
    cssVars({}, {
      transform: `translate(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px))`,
      transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
    })

  const chords = [-2, -1, 0, 1, 2].map((k) => k * 40)

  return (
    <div ref={wrap} onPointerMove={onMove} onPointerLeave={onLeave} className="relative aspect-square w-full select-none">
      {/* Warm light behind the core */}
      <div
        aria-hidden="true"
        className="absolute inset-[18%] rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--accent-soft), transparent 70%)' }}
      />
      <svg role="img" aria-label={label} viewBox="-320 -320 640 640" className="relative h-full w-full overflow-visible">
        {/* Outer measuring ring, slowly turning */}
        <g style={layer(-10)}>
          <g className="spin-slow">
            <circle r="292" fill="none" className="stroke-line-strong" strokeWidth="1" strokeDasharray="2 10" />
            {Array.from({ length: 72 }, (_, i) => (
              <line
                key={i}
                y1={-300}
                y2={i % 6 === 0 ? -314 : -306}
                className={i % 6 === 0 ? 'stroke-accent' : 'stroke-line-strong'}
                strokeWidth={i % 6 === 0 ? 2 : 1}
                transform={`rotate(${i * 5})`}
              />
            ))}
          </g>
        </g>

        {/* Orbit and spokes */}
        <g style={layer(6)}>
          <circle r={ORBIT} fill="none" className="stroke-line-strong draw" strokeWidth="1.25" style={cssVars({ '--len': 1260, '--d': '200ms' })} />
          {NODES.map((_, i) => {
            const deg = -90 + i * (360 / NODES.length)
            const a = polar(CORE + 6, deg)
            const b = polar(ORBIT, deg)
            const on = i === current
            return (
              <g key={i}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  className={`draw ${on ? 'stroke-accent' : 'stroke-line-strong'}`}
                  strokeWidth={on ? 2.5 : 1.25}
                  style={cssVars({ '--len': 140, '--d': `${400 + i * 60}ms` }, { transition: 'stroke 300ms, stroke-width 300ms' })}
                />
                {!reduced && (
                  <circle r="3" className="fill-lake" opacity="0.55">
                    <animateMotion dur={`${2.6 + (i % 3) * 0.7}s`} begin={`${i * 0.35}s`} repeatCount="indefinite" path={`M${a.x},${a.y} L${b.x},${b.y}`} />
                  </circle>
                )}
                {on && !reduced && (
                  <circle key={`p-${current}`} r="6" className="fill-accent">
                    <animateMotion dur="1.1s" repeatCount="indefinite" path={`M${a.x},${a.y} L${b.x},${b.y}`} />
                  </circle>
                )}
              </g>
            )
          })}
        </g>

        {/* Nodes and labels */}
        <g style={layer(12)}>
          {NODES.map((name, i) => {
            const deg = -90 + i * (360 / NODES.length)
            const n = polar(ORBIT, deg)
            const l = polar(LABEL, deg)
            const cos = Math.cos((deg * Math.PI) / 180)
            const anchor = cos > 0.3 ? 'start' : cos < -0.3 ? 'end' : 'middle'
            const on = i === current
            return (
              <g
                key={name}
                onPointerEnter={() => setHovered(i)}
                className="cursor-default"
                style={{ transition: 'opacity 300ms' }}
              >
                <circle cx={n.x} cy={n.y} r="26" fill="transparent" />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={on ? 11 : 7}
                  className={on ? 'fill-accent stroke-accent' : 'fill-canvas stroke-ink'}
                  strokeWidth="2"
                  style={{ transition: 'r 400ms cubic-bezier(0.16,1,0.3,1), fill 300ms' }}
                />
                {on && <circle cx={n.x} cy={n.y} r="20" fill="none" className="stroke-accent" strokeWidth="1" opacity="0.5" />}
                <text
                  x={l.x}
                  y={l.y + 6}
                  textAnchor={anchor}
                  data-on={on}
                  className={`hub-label ${on ? 'fill-ink' : 'fill-muted'}`}
                >
                  {name}
                </text>
              </g>
            )
          })}
        </g>

        {/* The tunduk: a lattice crown that is also the API core */}
        <g style={layer(2)}>
          <circle r={LATTICE} className="fill-surface stroke-accent" strokeWidth="2" />
          <clipPath id="tunduk-clip">
            <circle r={LATTICE - 1} />
          </clipPath>
          <g clipPath="url(#tunduk-clip)" className="stroke-accent" strokeWidth="1.5" opacity="0.55">
            {chords.map((c, i) => (
              <g key={c}>
                <line x1={c} y1={-LATTICE} x2={c} y2={LATTICE} className="draw" style={cssVars({ '--len': 240, '--d': `${700 + i * 70}ms` })} />
                <line x1={-LATTICE} y1={c} x2={LATTICE} y2={c} className="draw" style={cssVars({ '--len': 240, '--d': `${760 + i * 70}ms` })} />
              </g>
            ))}
          </g>
          <circle r={CORE} className="fill-accent" />
          <text y="4" textAnchor="middle" className="fill-accent-ink" style={{ font: '600 30px var(--font-display)', letterSpacing: '-0.02em' }}>
            {centre}
          </text>
          <text y="28" textAnchor="middle" className="fill-accent-ink" opacity="0.8" style={{ font: '500 12.5px var(--font-sans)' }}>
            {sub}
          </text>
        </g>
      </svg>
    </div>
  )
}
