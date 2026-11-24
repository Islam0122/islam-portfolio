import { Link } from 'react-router-dom'
import { NAV_ITEMS, SITE } from '../data/site'
import { useI18n } from '../i18n'

const FOOTER_LINKS = NAV_ITEMS.filter((item) => item.to !== '/' && item.to !== '/blog')

export default function Footer() {
  const { t } = useI18n()
  const { name, role, location } = t.profile
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-ink">{name}</p>
          <p className="mt-2 max-w-xs text-sm text-muted">{role}. {location}.</p>
        </div>
        <nav aria-label={t.ui.nav.footerLabel} className="grid grid-cols-2 gap-2 text-sm">
          {FOOTER_LINKS.map((item) => (
            <Link key={item.to} className="text-muted hover:text-ink" to={item.to}>{t.ui.nav[item.key]}</Link>
          ))}
        </nav>
        <div className="flex flex-col gap-2 text-sm">
          <a className="text-muted hover:text-ink" href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a className="text-muted hover:text-ink" href={SITE.github} target="_blank" rel="noreferrer">GitHub · {SITE.githubHandle}</a>
          <a className="text-muted hover:text-ink" href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="text-muted hover:text-ink" href={SITE.telegramUrl} target="_blank" rel="noreferrer">Telegram · @{SITE.telegram}</a>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted sm:px-6">
          {t.ui.footer.copyright(year, name)}
        </p>
      </div>
    </footer>
  )
}
