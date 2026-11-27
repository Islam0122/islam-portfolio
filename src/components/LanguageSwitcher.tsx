import { LOCALES, LOCALE_META, useI18n } from '../i18n'

/** Segmented RU / EN control. Switching re-renders the app in place; the choice is saved to localStorage. */
export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale, t } = useI18n()
  const index = LOCALES.indexOf(locale)

  return (
    <div
      role="group"
      aria-label={t.ui.language.groupLabel}
      className={`relative inline-grid h-10 items-center rounded-full border border-line-strong p-1 ${className}`}
      style={{ gridTemplateColumns: `repeat(${LOCALES.length}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden="true"
        className="absolute bottom-1 top-1 rounded-full bg-ink transition-transform duration-500 ease-out-expo"
        style={{ left: 4, width: `calc((100% - 8px) / ${LOCALES.length})`, transform: `translateX(${index * 100}%)` }}
      />
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
            className={`relative z-10 inline-flex h-8 min-w-9 items-center justify-center rounded-full px-2.5 text-xs font-semibold tracking-wide transition-colors duration-300 ${
              active ? 'text-canvas' : 'text-muted hover:text-ink'
            }`}
          >
            {meta.label}
          </button>
        )
      })}
    </div>
  )
}
