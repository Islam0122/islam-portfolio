import type { Project, ProjectBase } from '../types'
import type { Locale } from '../i18n/config'
import { DICTIONARIES } from '../i18n/dictionaries'

/*
 * Language-neutral project facts. Reader-facing texts (titles, descriptions, endpoint notes, image alt text,
 * metrics) are per language in src/i18n/locales/<lang>/projects.ts and merged in by getProjects().
 * scripts/generate-sitemap.mjs reads the `slug:` lines of this file.
 */
export const PROJECT_BASES: ProjectBase[] = [
  {
    slug: 'okurmenkids',
    category: 'Professional',
    featured: true,
    production: true,
    productionUrls: [
      'https://okurmenkids.com',
      'https://lms.okurmenkids.com',
      'https://training.okurmenkids.com',
      'https://api.okurmenkids.com',
      'https://api.okurmenkids.com/admin/',
    ],
    youtubeId: 'dAkMQGZ9_4o',
    videoPoster: '/img/okurmenkids-youtube-thumbnail.jpg',
    diagram: 'okurmenkids',
    stack: [
      'Python',
      'Django 6.1',
      'Django REST Framework',
      'SimpleJWT',
      'drf-spectacular',
      'PostgreSQL',
      'Celery',
      'Redis',
      'Gunicorn',
      'WhiteNoise',
      'Playwright',
      'Web Push',
      'React 19',
      'TypeScript',
      'Vite',
      'TanStack Query',
      'Tailwind CSS',
      'Docker',
      'Railway',
      'Vercel',
    ],
    endpoints: [
      { method: 'POST', path: '/api/v1/auth/login/' },
      { method: 'POST', path: '/api/v1/auth/refresh/' },
      { method: 'POST', path: '/api/v1/groups/{id}/generate-lessons/' },
      { method: 'GET', path: '/api/v1/public/site/home/' },
      { method: 'POST', path: '/api/v1/public/site/leads/' },
      { method: 'GET', path: '/api/v1/public/schedule/' },
      { method: 'POST', path: '/api/v1/training/attempts/' },
      { method: 'POST', path: '/api/v1/training/attempts/{id}/submit/' },
      { method: 'POST', path: '/api/v1/staff-attendance/me/check-in/' },
      { method: 'GET', path: '/api/v1/' },
    ],
    github: 'https://github.com/Islam0122/OkurmenKIDS',
    live: 'https://okurmenkids.com',
    images: [
      { src: '/img/okurmenkids-website.jpg' },
      { src: '/img/okurmenkids-lms-schedule.jpg' },
      { src: '/img/okurmenkids-training-portal.jpg' },
      { src: '/img/okurmenkids-lms-lesson.png' },
      { src: '/img/okurmenkids-architecture.jpg' },
    ],
  },
  {
    slug: 'okurmen-testing-platform',
    category: 'Professional',
    featured: true,
    stack: [
      'Python',
      'Django',
      'Django REST Framework',
      'Celery',
      'Redis',
      'PostgreSQL',
      'GigaChat API',
      'Telegram Bot API',
      'pandas / openpyxl',
      'React 19',
      'Vite',
      'Zustand',
    ],
    endpoints: [
      { method: 'GET', path: '/api/v1/tests/' },
      { method: 'POST', path: '/api/v1/sessions/create' },
      { method: 'POST', path: '/api/v1/sessions/enter' },
      { method: 'POST', path: '/api/v1/attempt/start' },
      { method: 'POST', path: '/api/v1/attempt/answer' },
      { method: 'POST', path: '/api/v1/attempt/finish' },
      { method: 'GET', path: '/api/v2/leaderboard/' },
      { method: 'POST', path: '/testing1/import/' },
    ],
    github: 'https://github.com/Islam0122/OkurmenKidsTEST',
    live: null,
    images: [{ src: '/img/okurmen-platform-laptop.jpg' }],
  },
  {
    slug: 'access-control-system',
    category: 'Personal',
    featured: true,
    stack: ['Python', 'Django', 'Django REST Framework', 'SimpleJWT', 'pytest / pytest-django', 'Docker', 'docker-compose'],
    endpoints: [
      { method: 'POST', path: '/api/register/' },
      { method: 'POST', path: '/api/verify-otp/' },
      { method: 'POST', path: '/api/login/' },
      { method: 'POST', path: '/api/logout/' },
      { method: 'PUT', path: '/api/profile/update/' },
      { method: 'DELETE', path: '/api/profile/delete/' },
      { method: 'POST', path: '/api/assign-role/' },
      { method: 'GET', path: '/api/my-permissions/' },
      { method: 'GET', path: '/api/products/' },
    ],
    github: 'https://github.com/Islam0122/AccessControlSystem',
    live: null,
    images: [],
  },
  {
    slug: 'jobpulse',
    category: 'Personal',
    featured: true,
    stack: ['Python', 'Django', 'Celery', 'Redis', 'Telethon', 'PostgreSQL', 'Docker', 'Telegram bot'],
    endpoints: [],
    github: 'https://github.com/Islam0122/JobPulse',
    live: null,
    images: [],
  },
  {
    slug: 'cover-studio',
    category: 'Professional',
    featured: true,
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'Zustand', 'Fabric.js 7', 'jsPDF', 'React Router 7', 'Lucide React'],
    endpoints: [],
    github: 'https://github.com/Islam0122/cover-studio-okurmenkids',
    live: null,
    images: [{ src: '/img/cover-studio-editor.png' }, { src: '/img/cover-studio-gallery.png' }],
  },
]

const cache = new Map<Locale, Project[]>()

/** All projects with texts in the given language. Results are cached per locale. */
export function getProjects(locale: Locale): Project[] {
  const cached = cache.get(locale)
  if (cached) return cached

  const texts = DICTIONARIES[locale].projects
  const projects = PROJECT_BASES.map((base): Project => {
    const { productionUrls = [], youtubeId, videoPoster, diagram, production, ...facts } = base
    const { endpointNotes, imageAlts, productionLinks = [], capabilities = [], operations = [], videoTitle, ...text } =
      texts[base.slug]
    return {
      ...facts,
      ...text,
      endpoints: base.endpoints.map((e, i) => ({ ...e, note: endpointNotes[i] ?? '' })),
      images: base.images.map((img, i) => ({ ...img, alt: imageAlts[i] ?? '' })),
      production: production ?? false,
      productionLinks: productionUrls.map((url, i) => ({
        url,
        label: productionLinks[i]?.label ?? url,
        description: productionLinks[i]?.description ?? '',
      })),
      capabilities,
      operations,
      video: youtubeId ? { youtubeId, title: videoTitle ?? text.title, poster: videoPoster ?? null } : null,
      diagram: diagram ?? null,
    }
  })
  cache.set(locale, projects)
  return projects
}

export function getFeaturedProjects(locale: Locale): Project[] {
  return getProjects(locale).filter((p) => p.featured)
}

export function getProject(locale: Locale, slug: string | undefined): Project | undefined {
  return getProjects(locale).find((p) => p.slug === slug)
}
