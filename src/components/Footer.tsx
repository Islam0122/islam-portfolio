import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { NAV_ITEMS, SITE } from '../data/site'
import { useI18n } from '../i18n'
import { useCopy } from '../lib/useCopy'
import { trackPointer } from '../lib/usePointerGlow'
import TundukMark from './TundukMark'

const FOOTER_LINKS = NAV_ITEMS.filter((item) => item.to !== '/')

export function CopyEmailButton({ className = '', compact = false }: { className?: string; compact?: boolean }) {
  const { t } = useI18n()
  const { copied, copy } = useCopy()
  if (compact) {
    return (
      <button
        type="button"
        onClick={() => copy(SITE.email)}
        aria-label={copied ? t.ui.home.emailCopied : t.ui.home.copyEmail}
        title={t.ui.home.copyEmail}
        className={`group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-muted transition hover:border-accent hover:text-ink ${className}`}
      >
        <Copy size={14} aria-hidden="true" className={`absolute transition duration-300 ${copied ? 'scale-50 opacity-0' : ''}`} />
        <Check size={15} aria-hidden="true" className={`absolute text-lake transition duration-300 ${copied ? '' : 'scale-50 opacity-0'}`} />
        <span
          aria-live="polite"
          className={`pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-xs font-medium text-canvas transition duration-300 ${
            copied ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0'
          }`}
        >
          {copied ? t.ui.home.emailCopied : ''}
        </span>
      </button>
    )
  }
  return (
    <button
      type="button"
      onClick={() => copy(SITE.email)}
      className={`btn btn-ghost ${className}`}
      aria-live="polite"
      aria-label={copied ? t.ui.home.emailCopied : t.ui.home.copyEmail}
    >
      <span className="relative inline-flex h-4 w-4">
        <Copy size={16} aria-hidden="true" className={`absolute inset-0 transition duration-300 ${copied ? 'scale-50 opacity-0' : ''}`} />
        <Check size={16} aria-hidden="true" className={`absolute inset-0 text-lake transition duration-300 ${copied ? '' : 'scale-50 opacity-0'}`} />
      </span>
      {copied ? t.ui.home.emailCopied : t.ui.home.copyEmail}
    </button>
  )
}

export default function Footer() {
  const { t } = useI18n()
  const { pathname } = useLocation()
  const { name, role, location } = t.profile
  const s = t.ui.home
  const year = new Date().getFullYear()
  const showInvite = pathname !== '/contact'

  return (
    <footer className="relative mt-28 overflow-hidden border-t border-line sm:mt-36">
      {showInvite && (
        <section aria-labelledby="footer-invite" className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 id="footer-invite" className="display text-[2.2rem] text-ink sm:text-6xl lg:text-[4.5rem]">
                {s.closingTitle}
              </h2>
              <p className="prose-measure mt-6 text-lg leading-8 text-muted">{s.closingBody}</p>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <a
                href={`mailto:${SITE.email}`}
                onPointerMove={trackPointer}
                className="group font-display text-lg font-medium tracking-tight text-ink sm:text-2xl"
              >
                <span className="link-draw break-all">{SITE.email}</span>
              </a>
              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${SITE.email}`} onPointerMove={trackPointer} className="btn btn-primary">
                  {s.writeEmail} <ArrowUpRight size={17} aria-hidden="true" />
                </a>
                <CopyEmailButton />
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="border-t border-line">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
          <div className="flex items-start gap-4">
            <TundukMark size={36} className="shrink-0 text-accent" />
            <div>
              <p className="font-display text-base font-medium tracking-tight text-ink">{name}</p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-muted">
                {role}. {location}.
              </p>
            </div>
          </div>
          <nav aria-label={t.ui.nav.footerLabel}>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              {FOOTER_LINKS.map((item) => (
                <li key={item.to}>
                  <Link className="link-draw text-muted hover:text-ink" to={item.to}>
                    {t.ui.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="grid gap-2.5 text-sm">
            <li>
              <a className="link-draw text-muted hover:text-ink" href={SITE.github} target="_blank" rel="noreferrer">
                GitHub <span className="text-muted/70">/{SITE.githubHandle}</span>
                <span className="sr-only"> {t.ui.common.opensInNewTab}</span>
              </a>
            </li>
            <li>
              <a className="link-draw text-muted hover:text-ink" href={SITE.linkedin} target="_blank" rel="noreferrer">
                LinkedIn<span className="sr-only"> {t.ui.common.opensInNewTab}</span>
              </a>
            </li>
            <li>
              <a className="link-draw text-muted hover:text-ink" href={SITE.telegramUrl} target="_blank" rel="noreferrer">
                Telegram <span className="text-muted/70">@{SITE.telegram}</span>
                <span className="sr-only"> {t.ui.common.opensInNewTab}</span>
              </a>
            </li>
            <li>
              <a className="link-draw text-muted hover:text-ink" href={`tel:${SITE.phoneTel}`}>
                {SITE.phone}
              </a>
            </li>
          </ul>
        </div>
        <p className="mx-auto max-w-7xl px-4 pb-8 text-xs leading-5 text-muted sm:px-6 lg:px-8">{t.ui.footer.copyright(year, name)}</p>
      </div>

      {/* Finale: the name set as a horizon, fading into the ground, with the mark rising behind it. */}
      <div aria-hidden="true" className="pointer-events-none relative select-none overflow-hidden">
        <svg viewBox="-100 -100 200 200" className="spin-slow absolute left-1/2 top-[18%] w-[46vw] max-w-[40rem] -translate-x-1/2 text-accent opacity-[0.12]">
          <circle r="96" fill="none" stroke="currentColor" strokeWidth="0.8" />
          {Array.from({ length: 36 }, (_, i) => (
            <line key={i} y1="-96" y2={i % 3 === 0 ? -86 : -91} stroke="currentColor" strokeWidth="0.8" transform={`rotate(${i * 10})`} />
          ))}
        </svg>
        <p
          className="display relative -mb-[0.2em] whitespace-nowrap text-center text-[16.5vw] leading-none text-transparent"
          style={{
            backgroundImage: 'linear-gradient(to bottom, var(--surface-2) 15%, var(--canvas) 85%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
        >
          {t.profile.shortName}
        </p>
      </div>
    </footer>
  )
}
