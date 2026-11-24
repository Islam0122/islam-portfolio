import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { getProjects } from '../data/projects'
import { useI18n } from '../i18n'
import Breadcrumbs from '../components/Breadcrumbs'
import { Card, SectionHeading, Tag } from '../components/Section'

export default function TechStackPage() {
  const { locale, t } = useI18n()
  const s = t.ui.techStack

  useDocumentMeta({ ...s.meta, path: '/tech-stack' })

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs items={[{ label: t.ui.common.home, to: '/' }, { label: t.ui.nav.techStack }]} />
      <SectionHeading level={1} eyebrow={s.eyebrow} title={s.title} id="stack-title">
        {s.intro}
      </SectionHeading>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {t.profile.skillGroups.map((g) => (
          <Card key={g.title}>
            <h2 className="font-semibold text-ink">{g.title}</h2>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {g.items.map((i) => (
                <li key={i}><Tag>{i}</Tag></li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <section aria-labelledby="where-used" className="mt-16">
        <h2 id="where-used" className="text-2xl font-semibold tracking-tight text-ink">{s.whereUsed}</h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-surface-2 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">{s.project}</th>
                <th scope="col" className="px-4 py-3 font-medium">{s.category}</th>
                <th scope="col" className="px-4 py-3 font-medium">{s.stack}</th>
              </tr>
            </thead>
            <tbody>
              {getProjects(locale).map((p) => (
                <tr key={p.slug} className="border-t border-line align-top">
                  <th scope="row" className="px-4 py-4 font-medium text-ink">
                    <Link className="underline-offset-4 hover:underline" to={`/projects/${p.slug}`}>{p.title}</Link>
                  </th>
                  <td className="px-4 py-4 text-muted">{t.ui.categories[p.category]}</td>
                  <td className="px-4 py-4 text-muted">{p.stack.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
