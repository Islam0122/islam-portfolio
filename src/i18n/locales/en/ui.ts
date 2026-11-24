import type { UiStrings } from '../../types'

const ui: UiStrings = {
  common: {
    skipToContent: 'Skip to content',
    loading: 'Loading…',
    opensInNewTab: '(opens in a new tab)',
    breadcrumb: 'Breadcrumb',
    home: 'Home',
  },
  nav: {
    home: 'Home',
    projects: 'Projects',
    experience: 'Experience',
    techStack: 'Tech Stack',
    architecture: 'Architecture',
    about: 'About',
    blog: 'Writing',
    contact: 'Contact',
    primaryLabel: 'Primary',
    mobileLabel: 'Mobile',
    footerLabel: 'Footer',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    homeAriaLabel: (name) => `${name}, home`,
  },
  language: {
    groupLabel: 'Language',
    switchTo: (languageName) => `Switch to ${languageName}`,
  },
  theme: {
    system: 'Theme: follows system. Switch to light theme.',
    light: 'Theme: light. Switch to dark theme.',
    dark: 'Theme: dark. Switch to system theme.',
  },
  footer: {
    copyright: (year, name) => `© ${year} ${name}. Built with React, TypeScript, Vite and Tailwind CSS.`,
  },
  categories: {
    Professional: 'Professional',
    Personal: 'Personal',
    Learning: 'Learning',
  },
  metricSources: {
    CV: 'CV',
    Repository: 'Repository',
  },
  home: {
    meta: {
      title: 'Islam Duishobaev — Full Stack & Python Backend Developer',
      description:
        'Python backend and full stack developer from Bishkek: Django, DRF, FastAPI, React and TypeScript. Featured projects, architecture and contact.',
    },
    viewProjects: 'View projects',
    downloadCvPdf: 'Download CV (PDF)',
    profilesLabel: 'Profiles',
    featuredEyebrow: 'Selected work',
    featuredTitle: 'Featured projects',
    featuredIntro:
      'Projects that show backend design, background processing and front-end delivery. Each case study states what is verified and what is not.',
    skillsEyebrow: 'Core skills',
    skillsTitle: 'What I work with day to day',
    seeFullStack: 'See the full stack',
    experienceLink: 'Experience',
  },
  projectCard: {
    technologies: 'Technologies',
    readCaseStudy: 'Read case study',
    videoBadge: 'Video',
    videoPendingBadge: 'Video · coming soon',
  },
  projects: {
    meta: {
      title: 'Projects — Islam Duishobaev',
      description:
        'Case studies of real projects: an online testing platform with AI grading, an RBAC access-control API, a Telegram job finder and a certificate editor.',
    },
    eyebrow: 'Work',
    title: 'Projects and case studies',
    intro:
      'Each case study separates what I contributed from what the team did, and labels any claim that is not verified in the repository.',
    filterLabel: 'Filter projects by category',
    all: 'All',
    emptyTitle: 'No projects in this category yet.',
    emptyBody: 'Choose “All” to see every case study.',
  },
  project: {
    metaTitle: (projectTitle) => `${projectTitle} — Case study — Islam Duishobaev`,
    notFoundMeta: {
      title: 'Project not found — Islam Duishobaev',
      description: 'This project case study does not exist.',
    },
    overview: 'Overview',
    services: 'Production services',
    servicesIntro: 'All five services are live. Each link opens in a new tab.',
    video: 'Video walkthrough',
    videoIntro: 'A 6-minute tour of the five production services, the API and the deployment architecture.',
    playVideo: (projectTitle) => `Play the ${projectTitle} video`,
    videoFrameTitle: (projectTitle) => `${projectTitle} — video walkthrough (YouTube)`,
    videoPrivacy: 'The player loads from youtube-nocookie.com only after you press play.',
    watchOnYouTube: 'Watch on YouTube',
    videoPendingTitle: 'Video coming soon',
    videoPendingBody: 'The walkthrough is produced and will appear here once it is published on YouTube.',
    myRole: 'My role',
    context: 'Context',
    liveDemo: 'Live demo',
    notAvailable: 'Not available',
    viewSource: 'View source on GitHub',
    liveDemoButton: 'Live demo',
    technologiesUsed: 'Technologies used',
    problem: 'Problem',
    solution: 'Solution',
    contribution: 'My contribution',
    contributionNote:
      'Items marked “per CV” are candidate-reported; items marked “repository-based” are visible in the code.',
    architecture: 'Architecture',
    dataFlow: 'Data flow',
    database: 'Database design',
    api: 'API examples',
    apiCaption: 'Selected API endpoints',
    method: 'Method',
    path: 'Path',
    purpose: 'Purpose',
    apiNote: 'Paths are taken from the repository’s urls.py files. Request and response bodies are not documented here.',
    challenges: 'Engineering challenges',
    results: 'Results',
    source: (source) => `Source: ${source}`,
    unverified: 'Not verified in this write-up',
    allProjects: '← All projects',
    discuss: 'Discuss this project →',
  },
  experience: {
    meta: {
      title: 'Experience — Islam Duishobaev',
      description:
        'Work history: Full Stack developer at OKURMEN IT (2024–present) and Python Backend developer at GEEKSPRO (2023). Responsibilities and outcomes as stated on the CV.',
    },
    eyebrow: 'Experience',
    title: 'Where I have worked',
    intro: 'Outcomes marked “(CV)” are the candidate’s own figures and have not been independently checked.',
    relatedCaseStudies: 'Related case studies:',
    educationTitle: 'Education & courses',
    cvTitle: 'Full CV',
    cvBody: 'The full CV (Russian, PDF) has the complete work history, skills and contact details.',
    downloadCvPdf: 'Download CV (PDF)',
  },
  techStack: {
    meta: {
      title: 'Tech Stack — Islam Duishobaev',
      description:
        'Technologies I use: Python, Django, DRF, FastAPI, Celery, Redis, PostgreSQL, React, TypeScript, Docker. Each one linked to the projects where it is used.',
    },
    eyebrow: 'Stack',
    title: 'Tools and technologies',
    intro:
      'Grouped the way I use them. The table below shows where each technology was applied in practice.',
    whereUsed: 'Where it was applied',
    project: 'Project',
    category: 'Category',
    stack: 'Stack',
  },
  architecture: {
    meta: {
      title: 'Architecture — Islam Duishobaev',
      description:
        'How the systems I built are structured: request paths, background jobs, Redis and Celery, RBAC checks and ingestion pipelines, drawn from the repositories.',
    },
    eyebrow: 'Systems',
    title: 'How the systems are put together',
    intro:
      'These diagrams show the paths that exist in the code. Each one links to the source it describes. They are not production topology diagrams.',
    stepsLabel: (flowTitle) => `${flowTitle}: steps`,
    source: 'Source:',
    principlesTitle: 'Design principles I apply',
    principles: [
      'Keep request handling thin: views and serializers call services; services own the rules.',
      'Move slow or unreliable work (AI calls, parsing, reports) to Celery with retries and time limits.',
      'Make authorisation explicit: a named rule per resource and action, not scattered checks.',
      'Record background-job outcomes so failures can be seen and re-run.',
    ],
    writeupsTitle: 'Architecture write-ups',
    writeupsBody:
      'A separate repository holds three Django architecture notes I wrote while studying layered and domain-driven designs: a lighter layout, a middle-strength layout, and a DDD-lite variant. Each has a setup script.',
    writeupsLink: 'Open django-architecture-lab',
    flows: [
      {
        title: 'Okurmen testing platform: grading path',
        note: 'The request path stays fast; slow AI grading runs as a background job and writes its result back to the answer.',
        steps: [
          { label: 'React client', detail: 'Student submits an answer' },
          { label: 'Django REST API', detail: 'attempt/answer endpoint' },
          { label: 'Service layer', detail: 'Stores the answer, queues grading' },
          { label: 'Redis broker', detail: 'Celery queue' },
          { label: 'Celery worker', detail: 'grade_answer_task → GigaChat' },
          { label: 'PostgreSQL', detail: 'Score and confidence saved' },
        ],
        source: {
          label: 'backend/apps/testing/tasks.py and services/',
          href: 'https://github.com/Islam0122/OkurmenKidsTEST',
        },
      },
      {
        title: 'Access control system: request authorisation',
        note: 'Authentication and authorisation are separate steps. The RBAC check reads role rules per business element and action.',
        steps: [
          { label: 'Client', detail: 'Bearer JWT' },
          { label: 'JWT authentication', detail: 'SimpleJWT-based class' },
          { label: 'Permission check', detail: 'Roles → AccessRolesRules' },
          { label: 'Business view', detail: 'Mock products, orders, stores' },
        ],
        source: {
          label: 'apps/core and apps/access',
          href: 'https://github.com/Islam0122/AccessControlSystem',
        },
      },
      {
        title: 'JobPulse: ingestion and notification',
        note: 'Ingestion runs as periodic jobs, so the bot is not blocked by parsing. Each run is recorded for traceability.',
        steps: [
          { label: 'Telethon client', detail: 'Reads vacancy channels' },
          { label: 'hh.ru parser', detail: 'Collects postings' },
          { label: 'Vacancy store', detail: 'ParsingLog per run' },
          { label: 'Notifications', detail: 'instant / daily / weekly' },
          { label: 'Telegram bot', detail: 'Delivers to the user' },
        ],
        source: {
          label: 'backend/apps/vacancies',
          href: 'https://github.com/Islam0122/JobPulse',
        },
      },
    ],
  },
  about: {
    meta: {
      title: 'About — Islam Duishobaev',
      description:
        'Who I am: a Full Stack developer from Bishkek with about three years of building Python backends, REST APIs and React interfaces.',
    },
    eyebrow: 'About',
    title: 'Backend-first, with the front end to match',
    howIWork: 'How I work',
    education: 'Education',
    languages: 'Languages',
    languagesNote: 'This portfolio is available in English and Russian. The full CV is in Russian.',
    downloadCv: 'Download CV (PDF, Russian)',
    seeExperience: 'See experience',
  },
  blog: {
    meta: {
      title: 'Writing — Islam Duishobaev',
      description:
        'Articles and technical notes by Islam Duishobaev. Currently no published articles; architecture notes and source code are available on GitHub.',
    },
    eyebrow: 'Writing',
    title: 'Articles and technical notes',
    intro:
      'I have not published articles on this site yet. Until then, the most detailed technical material is in the repositories.',
    emptyTitle: 'No articles published yet.',
    emptyBody: 'New posts will appear here when they are ready. Architecture notes and project code are already public.',
    notesTitle: 'Architecture notes',
    notesBody: 'Three Django architecture write-ups with setup scripts.',
    caseStudiesTitle: 'Case studies',
    caseStudiesBody: 'Longer write-ups of real projects, with what is verified and what is not.',
    browseProjects: 'Browse projects',
    githubTitle: 'Follow along on GitHub',
    githubBody: 'Code and commits are the most current record of what I am working on.',
  },
  contact: {
    meta: {
      title: 'Contact — Islam Duishobaev',
      description:
        'Get in touch about Full Stack or Python Backend roles, or to discuss a project. Email, phone, Telegram, LinkedIn and GitHub.',
    },
    eyebrow: 'Contact',
    title: 'Let’s talk',
    intro:
      'I am open to remote Full Stack and Python Backend roles, including international and CIS companies. The fastest way to reach me is email or Telegram.',
    email: 'Email',
    phone: 'Phone',
    preferDocument: 'Prefer a document?',
    cvNote: 'The CV is available as a PDF (Russian).',
    downloadCv: 'Download CV',
    noForm: 'This site has no contact form. Reach me directly by email, phone or Telegram above.',
  },
  notFound: {
    meta: {
      title: 'Page not found — Islam Duishobaev',
      description: 'The page you are looking for does not exist. Return to the home page or browse projects.',
    },
    eyebrow: 'Error 404',
    title: 'This page does not exist',
    body: 'The link may be outdated, or the address may contain a typo. These pages are still here:',
    suggestedLabel: 'Suggested pages',
  },
}

export default ui
