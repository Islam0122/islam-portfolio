import { ArrowUpRight, Download } from 'lucide-react'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { SITE } from '../data/site'
import { useI18n } from '../i18n'
import { trackPointer } from '../lib/usePointerGlow'
import { useReveal } from '../lib/useReveal'
import { PageHeader } from '../components/Section'
import { CopyEmailButton } from '../components/Footer'

interface Channel {
  label: string
  value: string
  href: string
  external?: boolean
}

export default function ContactPage() {
  const { t } = useI18n()
  const s = t.ui.contact
  const { ref, visible } = useReveal<HTMLUListElement>()

  useDocumentMeta({ ...s.meta, path: '/contact' })

  const channels: Channel[] = [
    { label: s.email, value: SITE.email, href: `mailto:${SITE.email}` },
    { label: 'Telegram', value: `@${SITE.telegram}`, href: SITE.telegramUrl, external: true },
    { label: s.phone, value: SITE.phone, href: `tel:${SITE.phoneTel}` },
    { label: 'LinkedIn', value: SITE.linkedinHandle, href: SITE.linkedin, external: true },
    { label: 'GitHub', value: SITE.githubHandle, href: SITE.github, external: true },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <PageHeader crumbs={[{ label: t.ui.common.home, to: '/' }, { label: t.ui.nav.contact }]} title={s.title} id="contact-title" intro={s.intro} />

      <ul ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
        {channels.map((c) => (
          <li key={c.href} className="border-t border-line last:border-b">
            <a
              href={c.href}
              target={c.external ? '_blank' : undefined}
              rel={c.external ? 'noreferrer' : undefined}
              className="group grid items-center gap-1 py-6 sm:grid-cols-[10rem_1fr_auto] sm:gap-6 sm:py-8"
            >
              <span className="text-sm text-muted">{c.label}</span>
              <span className="min-w-0 break-all font-display text-xl font-medium tracking-tight text-ink transition-[color,transform] duration-500 ease-out-expo group-hover:translate-x-2 group-hover:text-accent sm:text-3xl lg:text-[2.4rem]">
                {c.value}
              </span>
              <span
                aria-hidden="true"
                className="hidden h-12 w-12 items-center justify-center rounded-full border border-line-strong text-ink transition duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink sm:inline-flex"
              >
                <ArrowUpRight size={20} />
              </span>
              {c.external && <span className="sr-only"> {t.ui.common.opensInNewTab}</span>}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <CopyEmailButton />
      </div>

      <div className="mt-16 flex flex-wrap items-center gap-6 rounded-[2rem] border border-line bg-surface p-7 sm:p-10">
        <div className="min-w-0 flex-1">
          <p className="font-display text-xl font-medium tracking-tight text-ink">{s.preferDocument}</p>
          <p className="mt-2 text-muted">{s.cvNote}</p>
        </div>
        <a href={SITE.cvPath} download onPointerMove={trackPointer} className="btn btn-primary">
          <Download size={16} aria-hidden="true" /> {s.downloadCv}
        </a>
      </div>

      <p className="mt-8 text-sm leading-6 text-muted">{s.noForm}</p>
    </div>
  )
}
