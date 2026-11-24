import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { applyDocumentLocale, readLocalePreference, saveLocalePreference, type Locale } from './config'
import { DICTIONARIES } from './dictionaries'
import { I18nContext, type I18nContextValue } from './context'

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readLocalePreference())

  useEffect(() => {
    applyDocumentLocale(locale)
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    saveLocalePreference(next)
    setLocaleState(next)
  }, [])

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t: DICTIONARIES[locale] }),
    [locale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
