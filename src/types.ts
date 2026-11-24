export type ProjectCategory = 'Professional' | 'Personal' | 'Learning'

export type ProjectSlug = 'okurmen-testing-platform' | 'access-control-system' | 'jobpulse' | 'cover-studio'

export type MetricSource = 'CV' | 'Repository'

export interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  note: string
}

export interface ProjectImage {
  src: string
  alt: string
}

export interface ProjectMetric {
  value: string
  label: string
  source: MetricSource
}

/** Language-neutral project facts: identifiers, links, technologies, file paths. */
export interface ProjectBase {
  slug: ProjectSlug
  category: ProjectCategory
  featured: boolean
  stack: string[]
  endpoints: Omit<Endpoint, 'note'>[]
  github: string
  live: string | null
  images: Omit<ProjectImage, 'alt'>[]
}

/** Everything about a project that is written for the reader, per language. */
export interface ProjectText {
  title: string
  tagline: string
  /** Context of the work, exactly as far as the source material supports it. */
  context: string
  role: string
  period: string
  problem: string
  solution: string
  contribution: string[]
  architecture: string[]
  dataFlow: string[]
  database: string[]
  /** One note per entry of ProjectBase.endpoints, in the same order. */
  endpointNotes: string[]
  challenges: string[]
  /** Metrics are shown only when the source (CV or repository) states them. */
  metrics: ProjectMetric[]
  /** Things that could not be verified from the sources, shown to the reader. */
  unavailable: string[]
  /** One alt text per entry of ProjectBase.images, in the same order. */
  imageAlts: string[]
}

/** A project as rendered: base facts merged with the texts of the active language. */
export interface Project {
  slug: ProjectSlug
  title: string
  tagline: string
  category: ProjectCategory
  context: string
  role: string
  period: string
  featured: boolean
  stack: string[]
  problem: string
  solution: string
  contribution: string[]
  architecture: string[]
  dataFlow: string[]
  database: string[]
  endpoints: Endpoint[]
  challenges: string[]
  metrics: ProjectMetric[]
  unavailable: string[]
  github: string
  live: string | null
  images: ProjectImage[]
}

export interface ExperienceEntry {
  company: string
  role: string
  period: string
  location: string
  summary: string
  highlights: string[]
  projectSlugs: ProjectSlug[]
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface EducationEntry {
  title: string
  detail: string
}

export interface LanguageSkill {
  name: string
  level: string
}

export interface ArchitectureFlow {
  title: string
  note: string
  steps: { label: string; detail: string }[]
  source: { label: string; href: string }
}
