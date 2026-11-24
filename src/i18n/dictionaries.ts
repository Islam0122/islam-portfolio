import type { Locale } from './config'
import type { Dictionary } from './types'
import en from './locales/en'
import ru from './locales/ru'

export const DICTIONARIES: Record<Locale, Dictionary> = { en, ru }
