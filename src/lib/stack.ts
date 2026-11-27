import type { ArchitectureFlow, Project } from '../types'

const norm = (v: string) => v.toLowerCase().replace(/[^a-z0-9+#]/g, '')

/** A project uses a technology if one of its stack entries is that technology, with or without a version. */
export function usesTech(stack: string[], tech: string): boolean {
  const n = norm(tech)
  return stack.some((s) => {
    const m = norm(s)
    return m === n || (m.startsWith(n) && /^[0-9]/.test(m.slice(n.length))) || norm(s.split(/[\s/(]/)[0]) === n
  })
}

/** Number of projects whose stack contains the technology. */
export function countProjectsUsing(projects: Project[], tech: string): number {
  return projects.filter((p) => usesTech(p.stack, tech)).length
}

/** The architecture flow drawn from the same repository as the project, if there is one. */
export function flowForProject(flows: ArchitectureFlow[], project: Project): ArchitectureFlow | undefined {
  const repo = project.github.replace(/\/$/, '').toLowerCase()
  return flows.find((f) => f.source.href.replace(/\/$/, '').toLowerCase() === repo)
}
