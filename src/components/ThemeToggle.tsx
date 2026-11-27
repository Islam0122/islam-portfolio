import { useEffect, useState } from 'react'
import { applyThemePreference, readThemePreference, type ThemeChoice } from '../lib/theme'
import { useI18n } from '../i18n'

/** Cycles: system → light → dark. The aria-label always says what the next state is. */
const NEXT: Record<ThemeChoice, ThemeChoice> = { system: 'light', light: 'dark', dark: 'system' }

function systemDark() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function ThemeToggle() {
  const [choice, setChoice] = useState<ThemeChoice>(() => readThemePreference())
  const [sysDark, setSysDark] = useState(systemDark)
  const { t } = useI18n()
  const label = t.ui.theme[choice]

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setSysDark(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  function cycle() {
    const next = NEXT[choice]
    applyThemePreference(next)
    setChoice(next)
  }

  const isDark = choice === 'dark' || (choice === 'system' && sysDark)

  // A disc that waxes from sun to moon: the inner mask slides across.
  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      title={label}
      className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink transition hover:border-accent"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="overflow-visible">
        <mask id="theme-moon">
          <rect x="-4" y="-4" width="32" height="32" fill="white" />
          <circle
            r="7"
            fill="black"
            cy="7"
            style={{ transition: 'transform 600ms cubic-bezier(0.16,1,0.3,1)', transform: isDark ? 'translate(16px, 0)' : 'translate(32px, -8px)' }}
          />
        </mask>
        <circle
          cx="12"
          cy="12"
          r={isDark ? 8 : 5}
          fill="currentColor"
          mask="url(#theme-moon)"
          style={{ transition: 'r 500ms cubic-bezier(0.16,1,0.3,1)' }}
        />
        <g
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            transformOrigin: '12px 12px',
            transition: 'transform 600ms cubic-bezier(0.16,1,0.3,1), opacity 300ms',
            transform: isDark ? 'rotate(-60deg) scale(0.6)' : 'none',
            opacity: isDark ? 0 : 1,
          }}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1="12" y1="2" x2="12" y2="3.5" transform={`rotate(${i * 45} 12 12)`} />
          ))}
        </g>
      </svg>
    </button>
  )
}
