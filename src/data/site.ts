import type { NavKey } from '../i18n/types'

/**
 * Language-neutral contact details and assets.
 * Localized profile text (name, role, summary, experience…) lives in src/i18n/locales/<lang>/profile.ts.
 */
export const SITE = {
  email: 'duishobaevislam01@gmail.com',
  phone: '+996 552 325 295',
  phoneTel: '+996552325295',
  telegram: 'islam_duishobaev',
  telegramUrl: 'https://t.me/islam_duishobaev',
  github: 'https://github.com/Islam0122',
  githubHandle: 'Islam0122',
  linkedin: 'https://www.linkedin.com/in/islam-duishobaev-492858356',
  linkedinHandle: 'islam-duishobaev',
  cvPath: '/cv/Islam-Duishobaev-CV.pdf',
  portrait: '/img/islam-portrait.jpg',
  /** Optional: set VITE_SITE_URL at build time to enable canonical URLs and OG URLs. */
  siteUrl: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ?? '',
} as const

/** Routes in navigation order; labels come from the active dictionary (ui.nav[key]). */
export const NAV_ITEMS: readonly { to: string; key: NavKey }[] = [
  { to: '/', key: 'home' },
  { to: '/projects', key: 'projects' },
  { to: '/experience', key: 'experience' },
  { to: '/tech-stack', key: 'techStack' },
  { to: '/architecture', key: 'architecture' },
  { to: '/about', key: 'about' },
  { to: '/blog', key: 'blog' },
  { to: '/contact', key: 'contact' },
]
