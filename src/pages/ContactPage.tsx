import { Download, Mail, Phone, Send } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { SITE } from '../data/site'
import { useI18n } from '../i18n'
import Breadcrumbs from '../components/Breadcrumbs'
import { SectionHeading } from '../components/Section'

interface Channel {
  label: string
  value: string
  href: string
  icon: LucideIcon
  external?: boolean
}

export default function ContactPage() {
  const { t } = useI18n()
  const s = t.ui.contact

  useDocumentMeta({ ...s.meta, path: '/contact' })

  const channels: Channel[] = [
    { label: s.email, value: SITE.email, href: `mailto:${SITE.email}`, icon: Mail },
    { label: s.phone, value: SITE.phone, href: `tel:${SITE.phoneTel}`, icon: Phone },
    { label: 'Telegram', value: `@${SITE.telegram}`, href: SITE.telegramUrl, icon: Send, external: true },
    { label: 'LinkedIn', value: SITE.linkedinHandle, href: SITE.linkedin, icon: Send, external: true },
    { label: 'GitHub', value: SITE.githubHandle, href: SITE.github, icon: Send, external: true },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs items={[{ label: t.ui.common.home, to: '/' }, { label: t.ui.nav.contact }]} />
      <SectionHeading level={1} eyebrow={s.eyebrow} title={s.title} id="contact-title">
        {s.intro}
      </SectionHeading>

      <ul className="grid gap-3 sm:grid-cols-2">
        {channels.map((c) => {
          const Icon = c.icon
          return (
            <li key={c.href}>
              <a
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noreferrer' : undefined}
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition hover:border-accent"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wider text-muted">{c.label}</span>
                  <span className="block truncate font-medium text-ink">{c.value}</span>
                  {c.external && <span className="sr-only"> {t.ui.common.opensInNewTab}</span>}
                </span>
              </a>
            </li>
          )
        })}
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface p-6">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-ink">{s.preferDocument}</p>
          <p className="text-sm text-muted">{s.cvNote}</p>
        </div>
        <a
          href={SITE.cvPath}
          download
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-ink hover:opacity-90"
        >
          <Download size={16} aria-hidden="true" /> {s.downloadCv}
        </a>
      </div>

      <p className="mt-8 text-sm text-muted">{s.noForm}</p>
    </div>
  )
}
