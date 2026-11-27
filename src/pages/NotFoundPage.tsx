import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { NAV_ITEMS } from '../data/site'
import { useI18n } from '../i18n'
import { cssVars } from '../lib/cssVars'

/** A hub with one broken spoke: the address does not lead anywhere. */
function BrokenHub() {
  return (
    <svg aria-hidden="true" viewBox="-120 -120 240 240" className="mx-auto h-44 w-44 sm:h-56 sm:w-56">
      <circle r="100" fill="none" className="stroke-line-strong" strokeDasharray="2 6" />
      {Array.from({ length: 8 }, (_, i) => {
        const broken = i === 1
        return (
          <g key={i} transform={`rotate(${i * 45})`}>
            <line y1="-34" y2={broken ? -58 : -100} className={broken ? 'stroke-accent' : 'stroke-line-strong'} strokeWidth="2" strokeLinecap="round" />
            {broken ? (
              <circle cy="-82" r="6" fill="none" className="stroke-accent" strokeWidth="2" strokeDasharray="3 3" />
            ) : (
              <circle cy="-100" r="5" className="fill-canvas stroke-ink" strokeWidth="1.5" />
            )}
          </g>
        )
      })}
      <circle r="30" className="fill-accent" />
    </svg>
  )
}

export default function NotFoundPage() {
  const { t } = useI18n()
  const s = t.ui.notFound

  useDocumentMeta({ ...s.meta, path: '/404', noindex: true })

  return (
    <div className="enter mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
      <div style={cssVars({ '--i': 0 })}>
        <BrokenHub />
      </div>
      <p style={cssVars({ '--i': 1 })} className="mt-8 text-sm font-medium text-accent">{s.eyebrow}</p>
      <h1 style={cssVars({ '--i': 2 })} className="display mt-3 text-4xl text-ink sm:text-6xl">{s.title}</h1>
      <p style={cssVars({ '--i': 3 })} className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted">{s.body}</p>
      <nav style={cssVars({ '--i': 4 })} aria-label={s.suggestedLabel} className="mt-10">
        <ul className="flex flex-wrap justify-center gap-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="inline-flex rounded-full border border-line-strong px-4 py-2 text-sm text-ink transition hover:border-accent hover:bg-accent-soft">
                {t.ui.nav[item.key]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
