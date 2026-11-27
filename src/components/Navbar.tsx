import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_ITEMS } from '../data/site'
import { useI18n } from '../i18n'
import { cssVars } from '../lib/cssVars'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import TundukMark from './TundukMark'

const DESKTOP_ITEMS = NAV_ITEMS.filter((item) => item.to !== '/')

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [marker, setMarker] = useState<{ left: number; width: number } | null>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const { pathname } = useLocation()
  // The menu is open for one route only, so navigating anywhere closes it.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const setOpen = (next: boolean | ((v: boolean) => boolean)) =>
    setOpenOn((prev) => ((typeof next === 'function' ? next(prev === pathname) : next) ? pathname : null))
  const { t, locale } = useI18n()
  const { name } = t.profile

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenOn(null)
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  // The active-page node slides under the current link.
  useLayoutEffect(() => {
    const measure = () => {
      const el = listRef.current?.querySelector<HTMLElement>('a[aria-current="page"]')
      setMarker(el ? { left: el.offsetLeft + el.offsetWidth / 2, width: el.offsetWidth } : null)
    }
    measure()
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure).catch(() => undefined)
    return () => window.removeEventListener('resize', measure)
  }, [pathname, locale])

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color,box-shadow] duration-500 ${
        // backdrop-filter would trap the fixed mobile menu inside the header, so the open state uses a solid fill.
        open ? 'border-b border-line bg-canvas' : scrolled ? 'glass border-b border-line' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex items-center gap-3 font-display text-[0.95rem] font-medium tracking-tight text-ink"
          aria-label={t.ui.nav.homeAriaLabel(name)}
        >
          <TundukMark size={30} className="text-accent transition-transform duration-700 ease-out group-hover:rotate-[135deg]" />
          <span className="hidden sm:inline">{name}</span>
        </Link>

        <nav aria-label={t.ui.nav.primaryLabel} className="hidden lg:block">
          <ul ref={listRef} className="relative flex items-center gap-0.5">
            {DESKTOP_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `relative block rounded-full px-3.5 py-2 text-[0.9rem] transition-colors ${
                      isActive ? 'text-ink' : 'text-muted hover:text-ink'
                    }`
                  }
                >
                  {t.ui.nav[item.key]}
                </NavLink>
              </li>
            ))}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent transition-[left,opacity] duration-500 ease-out-expo"
              style={{ left: marker?.left ?? 0, opacity: marker ? 1 : 0 }}
            />
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.ui.nav.closeMenu : t.ui.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="relative block h-3 w-4">
              <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 h-[1.5px] w-4 bg-current transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label={t.ui.nav.mobileLabel}
          className="fixed inset-x-0 bottom-0 top-[4.25rem] overflow-y-auto bg-canvas lg:hidden"
        >
          <ul className="enter mx-auto grid max-w-7xl gap-1 px-4 py-6 sm:px-6">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.to} style={cssVars({ '--i': i })}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between border-b border-line py-4 font-display text-[1.65rem] font-medium tracking-tight ${
                      isActive ? 'text-accent' : 'text-ink'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {t.ui.nav[item.key]}
                      {isActive && <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-accent" />}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
