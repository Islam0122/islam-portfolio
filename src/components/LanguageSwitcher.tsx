import { LOCALES, LOCALE_META, useI18n } from '../i18n'

/** Segmented RU / EN control. Switching re-renders the app in place; the choice is saved to localStorage. */
export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale, t } = useI18n()

  return (
    <div
      role="group"
      aria-label={t.ui.language.groupLabel}
      className={`inline-flex h-10 items-center rounded-full border border-line p-1 ${className}`}
    >
      {LOCALES.map((code) => {
        const meta = LOCALE_META[code]
        const active = code === locale
        return (
          <button
            key={code}
            type="button"
            lang={meta.htmlLang}
            aria-pressed={active}
            aria-label={active ? meta.nativeName : t.ui.language.switchTo(meta.nativeName)}
            title={active ? meta.nativeName : t.ui.language.switchTo(meta.nativeName)}
            onClick={() => !active && setLocale(code)}
            className={`inline-flex h-8 min-w-9 items-center justify-center rounded-full px-2.5 font-mono text-xs font-semibold tracking-wider transition ${
              active ? 'bg-accent text-accent-ink' : 'text-muted hover:text-ink'
            }`}
          >
            {meta.label}
          </button>
        )
      })}
    </div>
  )
}
