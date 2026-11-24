import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { LOCALES } from '../i18n/config'
import { DICTIONARIES } from '../i18n/dictionaries'
import { PROJECT_BASES, getProject, getProjects, parseYouTubeId } from './projects'

const PUBLIC_DIR = join(process.cwd(), 'public')

describe('project base data', () => {
  it('has unique slugs', () => {
    const slugs = PROJECT_BASES.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('links every project to a GitHub repository', () => {
    for (const p of PROJECT_BASES) {
      expect(p.github, p.slug).toMatch(/^https:\/\/github\.com\/Islam0122\//)
    }
  })

  it('points every image at a file that exists in public/', () => {
    for (const p of PROJECT_BASES) {
      for (const img of p.images) {
        expect(existsSync(join(PUBLIC_DIR, img.src)), `${p.slug}: ${img.src}`).toBe(true)
      }
    }
  })

  it('only lists endpoints that begin with a known API prefix', () => {
    for (const p of PROJECT_BASES) {
      for (const e of p.endpoints) {
        expect(e.path, `${p.slug}: ${e.path}`).toMatch(/^\/(api|testing1)\//)
      }
    }
  })
})

describe.each(LOCALES)('project content (%s)', (locale) => {
  const projects = getProjects(locale)
  const texts = DICTIONARIES[locale].projects

  it('has a text entry for every project and no extras', () => {
    expect(Object.keys(texts).sort()).toEqual(PROJECT_BASES.map((p) => p.slug).sort())
  })

  it('has unique titles', () => {
    expect(new Set(projects.map((p) => p.title)).size).toBe(projects.length)
  })

  it('has one endpoint note per endpoint and one alt text per image', () => {
    for (const base of PROJECT_BASES) {
      const text = texts[base.slug]
      expect(text.endpointNotes.length, `${base.slug}: endpoint notes`).toBe(base.endpoints.length)
      expect(text.imageAlts.length, `${base.slug}: image alts`).toBe(base.images.length)
    }
    for (const p of projects) {
      for (const e of p.endpoints) expect(e.note.length, `${p.slug}: ${e.path}`).toBeGreaterThan(0)
      for (const img of p.images) expect(img.alt.length, `${p.slug}: alt text`).toBeGreaterThan(10)
    }
  })

  it('has a label and description for every production URL', () => {
    for (const base of PROJECT_BASES) {
      const links = texts[base.slug].productionLinks ?? []
      expect(links.length, `${base.slug}: production links`).toBe(base.productionUrls?.length ?? 0)
      for (const l of links) {
        expect(l.label.length).toBeGreaterThan(0)
        expect(l.description.length).toBeGreaterThan(0)
      }
    }
  })

  it('shows OkurmenKIDS as a production platform with all five live URLs', () => {
    const p = getProject(locale, 'okurmenkids')
    expect(p?.production).toBe(true)
    expect(p?.diagram).toBe('okurmenkids')
    expect(p?.video?.youtubeId).toBe('dAkMQGZ9_4o')
    expect(p?.productionLinks.map((l) => l.url)).toEqual([
      'https://okurmenkids.com',
      'https://lms.okurmenkids.com',
      'https://training.okurmenkids.com',
      'https://api.okurmenkids.com',
      'https://api.okurmenkids.com/admin/',
    ])
    expect(p?.capabilities.length).toBeGreaterThan(0)
    expect(p?.operations.length).toBeGreaterThan(0)
  })

  it('states a source for every metric and never leaves a metric without a label', () => {
    for (const p of projects) {
      for (const m of p.metrics) {
        expect(['CV', 'Repository']).toContain(m.source)
        expect(m.label.length).toBeGreaterThan(0)
      }
    }
  })

  it('keeps unverified information visible for the case studies that need it', () => {
    expect(getProject(locale, 'okurmen-testing-platform')?.unavailable.length).toBeGreaterThan(0)
    expect(getProject(locale, 'jobpulse')?.unavailable.length).toBeGreaterThan(0)
  })

  it('returns undefined for an unknown slug', () => {
    expect(getProject(locale, 'does-not-exist')).toBeUndefined()
    expect(getProject(locale, undefined)).toBeUndefined()
  })
})

describe('project translations', () => {
  it('keeps the same metric sources in every language', () => {
    const [first, ...rest] = LOCALES
    for (const base of PROJECT_BASES) {
      const expected = DICTIONARIES[first].projects[base.slug].metrics.map((m) => m.source)
      for (const locale of rest) {
        expect(DICTIONARIES[locale].projects[base.slug].metrics.map((m) => m.source), `${locale}: ${base.slug}`).toEqual(expected)
      }
    }
  })

  it('mentions that JobPulse has no automated tests in every language', () => {
    expect(getProject('en', 'jobpulse')?.unavailable.join(' ')).toMatch(/No automated tests/)
    expect(getProject('ru', 'jobpulse')?.unavailable.join(' ')).toMatch(/Автотестов нет/)
  })
})

describe('demo videos', () => {
  it('accepts only well-formed YouTube ids', () => {
    expect(parseYouTubeId('abJjnBRLFW8')).toBe('abJjnBRLFW8')
    expect(parseYouTubeId('  abJjnBRLFW8 ')).toBe('abJjnBRLFW8')
    expect(parseYouTubeId('')).toBeUndefined()
    expect(parseYouTubeId(undefined)).toBeUndefined()
    expect(parseYouTubeId('VIDEO_ID')).toBeUndefined()
    expect(parseYouTubeId('https://youtu.be/abJjnBRLFW8')).toBeUndefined()
  })

  it.each(LOCALES)('embeds the published Cover Studio presentation (%s)', (locale) => {
    const p = getProject(locale, 'cover-studio')
    const expected = parseYouTubeId(import.meta.env.VITE_COVER_STUDIO_VIDEO_ID) ?? '4GcK-EKd5XA'
    expect(p?.video).toEqual({
      youtubeId: expected,
      title: DICTIONARIES[locale].projects['cover-studio'].videoTitle,
      poster: '/img/cover-studio-youtube-thumbnail.jpg',
    })
    expect(p?.videoPending).toBeNull()
  })

  it('never shows a placeholder for a project without a configured video variable', () => {
    for (const p of getProjects('en')) {
      if (p.slug !== 'cover-studio') expect(p.videoPending, p.slug).toBeNull()
    }
  })
})
