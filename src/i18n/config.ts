/**
 * Locale registry. To add a language:
 *  1. add its code to LOCALES and its metadata to LOCALE_META;
 *  2. create src/i18n/locales/<code>/ typed as `Dictionary`;
 *  3. register it in src/i18n/dictionaries.ts.
 * TypeScript then reports every missing key, and the parity test checks the structure.
 */
export const LOCALES = ['ru', 'en'] as const // also the order shown in the switcher

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

export const LOCALE_STORAGE_KEY = 'locale-preference'

export interface LocaleMeta {
  /** Short label shown in the switcher. */
  label: string
  /** The language's own name, used for accessible labels. */
  nativeName: string
  /** Value for <html lang>. */
  htmlLang: string
  /** Value for og:locale. */
  ogLocale: string
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: { label: 'EN', nativeName: 'English', htmlLang: 'en', ogLocale: 'en_US' },
  ru: { label: 'RU', nativeName: 'Русский', htmlLang: 'ru', ogLocale: 'ru_RU' },
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
}

export function readLocalePreference(): Locale {
  try {
    const value = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    if (isLocale(value)) return value
  } catch {
    // Storage can be unavailable (private mode, blocked site data). Fall back to the default.
  }
  return DEFAULT_LOCALE
}

export function saveLocalePreference(locale: Locale): void {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {
    // Ignore: the preference simply will not persist.
  }
}

export function applyDocumentLocale(locale: Locale): void {
  document.documentElement.lang = LOCALE_META[locale].htmlLang
}
