import type {
  ArchitectureFlow,
  EducationEntry,
  ExperienceEntry,
  LanguageSkill,
  MetricSource,
  ProjectCategory,
  ProjectSlug,
  ProjectText,
  SkillGroup,
} from '../types'

export type NavKey = 'home' | 'projects' | 'experience' | 'techStack' | 'architecture' | 'about' | 'blog' | 'contact'

export interface PageMeta {
  title: string
  description: string
}

/** Localized personal details. Language-neutral contacts live in src/data/site.ts. */
export interface ProfileContent {
  name: string
  shortName: string
  role: string
  location: string
  availability: string
  tagline: string
  summary: string
  portraitAlt: string
  facts: { label: string; value: string }[]
  workingPrinciples: string[]
  experience: ExperienceEntry[]
  skillGroups: SkillGroup[]
  education: EducationEntry[]
  languages: LanguageSkill[]
}

/** UI strings. Functions are used where a phrase wraps a value. */
export interface UiStrings {
  common: {
    skipToContent: string
    loading: string
    opensInNewTab: string
    home: string
    breadcrumb: string
  }
  nav: Record<NavKey, string> & {
    primaryLabel: string
    mobileLabel: string
    footerLabel: string
    openMenu: string
    closeMenu: string
    homeAriaLabel: (name: string) => string
  }
  language: {
    groupLabel: string
    switchTo: (languageName: string) => string
  }
  theme: {
    system: string
    light: string
    dark: string
  }
  footer: {
    copyright: (year: number, name: string) => string
  }
  categories: Record<ProjectCategory, string>
  metricSources: Record<MetricSource, string>
  home: {
    meta: PageMeta
    viewProjects: string
    downloadCvPdf: string
    profilesLabel: string
    featuredEyebrow: string
    featuredTitle: string
    featuredIntro: string
    skillsEyebrow: string
    skillsTitle: string
    seeFullStack: string
    experienceLink: string
  }
  projectCard: {
    technologies: string
    readCaseStudy: string
    inProduction: string
    videoBadge: string
  }
  projects: {
    meta: PageMeta
    eyebrow: string
    title: string
    intro: string
    filterLabel: string
    all: string
    emptyTitle: string
    emptyBody: string
  }
  project: {
    metaTitle: (projectTitle: string) => string
    notFoundMeta: PageMeta
    myRole: string
    context: string
    liveDemo: string
    notAvailable: string
    viewSource: string
    liveDemoButton: string
    technologiesUsed: string
    problem: string
    solution: string
    contribution: string
    contributionNote: string
    architecture: string
    dataFlow: string
    database: string
    api: string
    apiCaption: string
    method: string
    path: string
    purpose: string
    apiNote: string
    challenges: string
    results: string
    source: (source: string) => string
    unverified: string
    allProjects: string
    discuss: string
    inProduction: string
    productionTitle: string
    productionIntro: string
    openWebsite: string
    video: string
    playVideo: (title: string) => string
    videoNote: string
    diagramTitle: string
    diagramIntro: string
    capabilities: string
    operations: string
  }
  diagram: {
    ariaLabel: string
    clientsLabel: string
    backendLabel: string
    dataLabel: string
    website: { label: string; detail: string }
    lms: { label: string; detail: string }
    training: { label: string; detail: string }
    admin: { label: string; detail: string }
    api: { label: string; detail: string }
    postgres: { label: string; detail: string }
    jobs: { label: string; detail: string }
    hosting: string[]
    note: string
  }
  experience: {
    meta: PageMeta
    eyebrow: string
    title: string
    intro: string
    overview: { label: string; value: string }[]
    timelineLabel: string
    current: string
    responsibilities: string
    results: string
    resultsNote: string
    stack: string
    relatedProjects: string
    openCaseStudy: (projectTitle: string) => string
    educationTitle: string
    cvTitle: string
    cvBody: string
    downloadCvPdf: string
  }
  techStack: {
    meta: PageMeta
    eyebrow: string
    title: string
    intro: string
    whereUsed: string
    project: string
    category: string
    stack: string
  }
  architecture: {
    meta: PageMeta
    eyebrow: string
    title: string
    intro: string
    stepsLabel: (flowTitle: string) => string
    source: string
    principlesTitle: string
    principles: string[]
    writeupsTitle: string
    writeupsBody: string
    writeupsLink: string
    flows: ArchitectureFlow[]
  }
  about: {
    meta: PageMeta
    eyebrow: string
    title: string
    howIWork: string
    education: string
    languages: string
    languagesNote: string
    downloadCv: string
    seeExperience: string
  }
  blog: {
    meta: PageMeta
    eyebrow: string
    title: string
    intro: string
    emptyTitle: string
    emptyBody: string
    notesTitle: string
    notesBody: string
    caseStudiesTitle: string
    caseStudiesBody: string
    browseProjects: string
    githubTitle: string
    githubBody: string
  }
  contact: {
    meta: PageMeta
    eyebrow: string
    title: string
    intro: string
    email: string
    phone: string
    preferDocument: string
    cvNote: string
    downloadCv: string
    noForm: string
  }
  notFound: {
    meta: PageMeta
    eyebrow: string
    title: string
    body: string
    suggestedLabel: string
  }
}

export interface Dictionary {
  ui: UiStrings
  profile: ProfileContent
  projects: Record<ProjectSlug, ProjectText>
}
