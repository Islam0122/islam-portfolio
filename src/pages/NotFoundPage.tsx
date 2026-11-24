import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { NAV_ITEMS } from '../data/site'
import { useI18n } from '../i18n'

export default function NotFoundPage() {
  const { t } = useI18n()
  const s = t.ui.notFound

  useDocumentMeta({ ...s.meta, path: '/404', noindex: true })

  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <p className="font-mono text-sm uppercase tracking-[0.18em] text-accent">{s.eyebrow}</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{s.title}</h1>
      <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted">{s.body}</p>
      <nav aria-label={s.suggestedLabel} className="mt-8">
        <ul className="flex flex-wrap justify-center gap-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="inline-flex rounded-full border border-line px-4 py-2 text-sm text-ink hover:border-accent">
                {t.ui.nav[item.key]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
