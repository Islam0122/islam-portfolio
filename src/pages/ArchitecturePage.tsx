import { useDocumentMeta } from '../lib/useDocumentMeta'
import { useI18n } from '../i18n'
import type { ArchitectureFlow } from '../types'
import Breadcrumbs from '../components/Breadcrumbs'
import { Card, SectionHeading } from '../components/Section'

function FlowDiagram({ flow }: { flow: ArchitectureFlow }) {
  const { t } = useI18n()
  return (
    <Card className="p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-ink">{flow.title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{flow.note}</p>
      <ol className="mt-6 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-stretch md:gap-0" aria-label={t.ui.architecture.stepsLabel(flow.title)}>
        {flow.steps.map((step, i) => (
          <li key={step.label} className="flex flex-col md:flex-row md:items-center">
            <div className="flex-1 rounded-xl border border-line bg-surface-2 px-4 py-3 md:min-w-[150px]">
              <p className="text-sm font-semibold text-ink">{step.label}</p>
              <p className="mt-1 text-xs leading-5 text-muted">{step.detail}</p>
            </div>
            {i < flow.steps.length - 1 && (
              <span aria-hidden="true" className="px-2 py-1 text-center font-mono text-accent md:px-3 md:py-0">
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </ol>
      <p className="mt-6 text-xs text-muted">
        {t.ui.architecture.source}{' '}
        <a className="font-medium text-ink underline-offset-4 hover:underline" href={flow.source.href} target="_blank" rel="noreferrer">
          {flow.source.label}
          <span className="sr-only"> {t.ui.common.opensInNewTab}</span>
        </a>
      </p>
    </Card>
  )
}

export default function ArchitecturePage() {
  const { t } = useI18n()
  const s = t.ui.architecture

  useDocumentMeta({ ...s.meta, path: '/architecture' })

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs items={[{ label: t.ui.common.home, to: '/' }, { label: t.ui.nav.architecture }]} />
      <SectionHeading level={1} eyebrow={s.eyebrow} title={s.title} id="arch-title">
        {s.intro}
      </SectionHeading>

      <div className="grid gap-6">
        {s.flows.map((f) => (
          <FlowDiagram key={f.source.href} flow={f} />
        ))}
      </div>

      <section aria-labelledby="principles" className="mt-16 grid gap-5 md:grid-cols-2">
        <Card>
          <h2 id="principles" className="text-lg font-semibold text-ink">{s.principlesTitle}</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted">
            {s.principles.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold text-ink">{s.writeupsTitle}</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            {s.writeupsBody}
          </p>
          <a
            href="https://github.com/Islam0122/django-architecture-lab"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex text-sm font-semibold text-ink underline-offset-4 hover:underline"
          >
            {s.writeupsLink}
            <span className="sr-only"> {t.ui.common.opensInNewTab}</span>
          </a>
        </Card>
      </section>
    </div>
  )
}
