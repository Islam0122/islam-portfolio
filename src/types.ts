export type ProjectCategory = 'Professional' | 'Personal' | 'Learning'

export type ProjectSlug =
  | 'okurmenkids'
  | 'okurmen-testing-platform'
  | 'access-control-system'
  | 'jobpulse'
  | 'cover-studio'

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

/** A live production address, with its reader-facing label and description per language. */
export interface ProductionLink {
  url: string
  label: string
  description: string
}

/** Optional architecture diagrams rendered by dedicated components. */
export type ProjectDiagram = 'okurmenkids'

/** Language-neutral project facts: identifiers, links, technologies, file paths. */
export interface ProjectBase {
  slug: ProjectSlug
  category: ProjectCategory
  featured: boolean
  /** Running in production, with live URLs listed in productionUrls. */
  production?: boolean
  productionUrls?: string[]
  /** YouTube video id. */
  youtubeId?: string
  /**
   * Build-time environment variable that supplies the YouTube id (e.g. VITE_COVER_STUDIO_VIDEO_ID).
   * While it is empty, the project shows a video placeholder instead of the player.
   */
  videoEnvVar?: string
  diagram?: ProjectDiagram
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
  /** One label + description per entry of ProjectBase.productionUrls, in the same order. */
  productionLinks?: { label: string; description: string }[]
  /** Implemented functionality grouped by area. */
  capabilities?: { title: string; body: string }[]
  /** Deployment, domains and production maintenance. */
  operations?: string[]
  videoTitle?: string
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
  production: boolean
  productionLinks: ProductionLink[]
  capabilities: { title: string; body: string }[]
  operations: string[]
  video: { youtubeId: string; title: string } | null
  /** A demo video is planned but its id is not configured yet: render a placeholder. */
  videoPending: { envVar: string; title: string } | null
  diagram: ProjectDiagram | null
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
