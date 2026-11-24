import { describe, expect, it } from 'vitest'
import { DEFAULT_LOCALE, LOCALES, LOCALE_META, isLocale } from './config'
import { DICTIONARIES } from './dictionaries'

type Shape = string | number | boolean | null | Shape[] | { [key: string]: Shape }

/** Collects structural differences: missing keys, different array lengths, different value types, empty strings. */
function diff(a: unknown, b: unknown, path: string, out: string[]) {
  if (typeof a !== typeof b) {
    out.push(`${path}: ${typeof a} vs ${typeof b}`)
    return
  }
  if (typeof a === 'string') {
    if (!a.trim() || !(b as string).trim()) out.push(`${path}: empty string`)
    return
  }
  if (typeof a === 'function') {
    const fa = a as (...args: unknown[]) => unknown
    const fb = b as (...args: unknown[]) => unknown
    if (fa.length !== fb.length) out.push(`${path}: arity ${fa.length} vs ${fb.length}`)
    else if (typeof fa('x', 'y') !== 'string' || typeof fb('x', 'y') !== 'string') out.push(`${path}: must return a string`)
    return
  }
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
      out.push(`${path}: array length ${Array.isArray(a) ? a.length : '-'} vs ${Array.isArray(b) ? b.length : '-'}`)
      return
    }
    a.forEach((item, i) => diff(item, b[i], `${path}[${i}]`, out))
    return
  }
  if (a && typeof a === 'object') {
    const ka = Object.keys(a as object).sort()
    const kb = Object.keys(b as object).sort()
    for (const k of new Set([...ka, ...kb])) {
      if (!ka.includes(k) || !kb.includes(k)) out.push(`${path}.${k}: missing in one locale`)
      else diff((a as Record<string, Shape>)[k], (b as Record<string, Shape>)[k], `${path}.${k}`, out)
    }
  }
}

describe('dictionaries', () => {
  it('registers a dictionary and metadata for every locale', () => {
    for (const locale of LOCALES) {
      expect(DICTIONARIES[locale], locale).toBeDefined()
      expect(LOCALE_META[locale], locale).toBeDefined()
    }
    expect(LOCALES).toContain(DEFAULT_LOCALE)
  })

  it('defaults to English', () => {
    expect(DEFAULT_LOCALE).toBe('en')
  })

  it.each(LOCALES.filter((l) => l !== DEFAULT_LOCALE))('%s has the same structure as the default locale', (locale) => {
    const problems: string[] = []
    diff(DICTIONARIES[DEFAULT_LOCALE], DICTIONARIES[locale], locale, problems)
    expect(problems).toEqual([])
  })

  it('keeps language-neutral references identical across locales', () => {
    const ref = DICTIONARIES[DEFAULT_LOCALE]
    for (const locale of LOCALES) {
      const d = DICTIONARIES[locale]
      expect(d.profile.experience.map((e) => e.projectSlugs), locale).toEqual(ref.profile.experience.map((e) => e.projectSlugs))
      expect(d.ui.architecture.flows.map((f) => f.source.href), locale).toEqual(ref.ui.architecture.flows.map((f) => f.source.href))
    }
  })

  it('validates locale codes', () => {
    expect(isLocale('en')).toBe(true)
    expect(isLocale('ru')).toBe(true)
    expect(isLocale('de')).toBe(false)
    expect(isLocale(null)).toBe(false)
  })
})
