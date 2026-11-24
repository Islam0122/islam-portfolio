import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { NAV_ITEMS } from '../data/site'
import { useI18n } from '../i18n'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { t } = useI18n()
  const { name } = t.profile

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-line glass">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight text-ink" aria-label={t.ui.nav.homeAriaLabel(name)}>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-ink text-sm font-bold" aria-hidden="true">
            ID
          </span>
          <span className="hidden sm:inline lg:hidden xl:inline">{name}</span>
        </Link>

        <nav aria-label={t.ui.nav.primaryLabel} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `rounded-full px-3 py-2 text-sm transition ${
                      isActive ? 'bg-accent-soft text-ink font-medium' : 'text-muted hover:text-ink'
                    }`
                  }
                >
                  {t.ui.nav[item.key]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.ui.nav.closeMenu : t.ui.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label={t.ui.nav.mobileLabel} className="border-t border-line bg-canvas lg:hidden">
          <ul className="mx-auto grid max-w-6xl gap-1 px-4 py-3 sm:px-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-3 text-base ${isActive ? 'bg-accent-soft text-ink font-medium' : 'text-muted'}`
                  }
                >
                  {t.ui.nav[item.key]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
