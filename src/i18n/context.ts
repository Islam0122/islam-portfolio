import { createContext, useContext } from 'react'
import type { Locale } from './config'
import type { Dictionary } from './types'

export interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  /** The active dictionary: UI strings and localized profile content. */
  t: Dictionary
}

export const I18nContext = createContext<I18nContextValue | null>(null)

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <LanguageProvider>')
  return ctx
}
