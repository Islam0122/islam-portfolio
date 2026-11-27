import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'

export interface Crumb {
  label: string
  to?: string
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { t } = useI18n()
  return (
    <nav aria-label={t.ui.common.breadcrumb} className="enter mb-8 sm:mb-10">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex min-w-0 items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="h-px w-4 bg-line-strong" />}
            {item.to ? (
              <Link className="link-draw hover:text-ink" to={item.to}>{item.label}</Link>
            ) : (
              <span className="inline-flex min-w-0 items-center gap-2 break-words text-ink" aria-current="page">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
