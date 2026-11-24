import type { ProfileContent } from '../../types'

const profile: ProfileContent = {
  name: 'Islam Duishobaev',
  shortName: 'Islam D.',
  role: 'Full Stack Developer · Python Backend',
  location: 'Bishkek, Kyrgyzstan',
  availability: 'Open to remote Full Stack and Python Backend roles (Remote / International / CIS)',
  tagline:
    'I build backend systems in Python and Django, REST APIs, background pipelines, and the React interfaces around them.',
  summary:
    'Full Stack developer with about three years of experience building web applications, business systems, educational platforms and AI-assisted tools. Main focus: backend development in Python with Django, Django REST Framework and FastAPI, plus React and TypeScript on the front end.',
  portraitAlt: 'Islam Duishobaev, arms crossed, in front of a branded backdrop',
  facts: [
    { label: 'Focus', value: 'Python backend · Django · DRF · FastAPI' },
    { label: 'Front end', value: 'React · TypeScript · Vite' },
    { label: 'Experience', value: 'About 3 years (CV)' },
    { label: 'Based in', value: 'Bishkek, Kyrgyzstan' },
    { label: 'Languages', value: 'Russian C2 · English B1 · Kyrgyz native' },
    { label: 'Status', value: 'Open to remote roles' },
  ],
  workingPrinciples: [
    'Clear boundaries between services, and simple designs that are easy to change.',
    'Slow work moved to background jobs, so the product stays fast for the user.',
    'Measured performance: query tuning with select_related, prefetch_related and Q objects, not guesswork.',
    'Code that is tested, observable and easy to hand over. Consistency is a practice, not a mood.',
  ],
  experience: [
    {
      company: 'OKURMEN IT',
      role: 'Full Stack Developer (Python / React)',
      period: 'Jan 2024 – present',
      location: 'Bishkek, Kyrgyzstan',
      summary:
        'Development and maintenance of web products and internal IT systems for an educational organisation. Backend and front-end work, integrations and deployment.',
      highlights: [
        'LMS: backend services on Django and DRF, React interfaces for students, teachers, groups, courses and materials, plus admin tooling, analytics and reporting.',
        'Online testing platform: timed tests, automatic scoring, XP, achievements and ratings. More than 500 test sessions run (CV).',
        'AI Code Checker: GigaChat API integration with background processing through Celery and Redis; cut homework check time from several hours to roughly 20–30 minutes (CV).',
        'CRM and automation: student management tools, administrative workflows and notifications; automated up to 70% of routine administrative operations (CV).',
        'Certificate Cover Studio: template management, business logic and user interfaces.',
      ],
      projectSlugs: ['okurmenkids', 'okurmen-testing-platform', 'cover-studio'],
    },
    {
      company: 'GEEKSPRO',
      role: 'Python Backend Developer',
      period: 'Oct 2023 – Dec 2023',
      location: 'Bishkek, Kyrgyzstan',
      summary: 'Backend development for the Kolos Brewery WMS, a warehouse and finance automation system.',
      highlights: [
        'Built more than 40 REST API endpoints with Django REST Framework.',
        'Implemented product, distributor, transaction and warehouse operations, including moves between “normal” and “defect” stock statuses.',
        'Added change auditing with django-simple-history and brute-force protection with Django Axes.',
        'Generated PDF documents for invoices and returns; used database transactions for financial integrity.',
        'Optimised PostgreSQL and Django ORM queries with select_related, prefetch_related and Q objects.',
      ],
      projectSlugs: [],
    },
  ],
  skillGroups: [
    {
      title: 'Backend',
      items: ['Python', 'Django', 'Django REST Framework', 'FastAPI', 'Flask', 'REST API design', 'Django ORM', 'SQL', 'WebSockets', 'JWT'],
    },
    {
      title: 'Frontend',
      items: ['React', 'TypeScript', 'JavaScript', 'Zustand', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite'],
    },
    {
      title: 'Data & async',
      items: ['PostgreSQL', 'Redis', 'SQLite', 'Celery', 'Celery Beat', 'Background jobs'],
    },
    {
      title: 'DevOps & tooling',
      items: ['Docker', 'Nginx', 'Gunicorn', 'Git', 'GitHub Actions', 'CI/CD', 'Railway', 'Postman'],
    },
    {
      title: 'Integrations',
      items: ['Telegram Bot API', 'Aiogram', 'Telethon', 'OpenAI API', 'GigaChat API'],
    },
    {
      title: 'Testing',
      items: ['pytest', 'pytest-django'],
    },
  ],
  education: [
    {
      title: 'International University of Kyrgyzstan',
      detail: 'Bachelor’s degree, Software Engineering. Expected graduation: 2029.',
    },
    {
      title: 'OKURMEN IT Academy',
      detail: 'Front-end development (React), 2024.',
    },
    {
      title: 'Geeks IT Academy',
      detail: 'Back-end development (Python, Django, DRF), 2023.',
    },
  ],
  languages: [
    { name: 'Kyrgyz', level: 'Native' },
    { name: 'Russian', level: 'C2' },
    { name: 'English', level: 'B1 (intermediate)' },
  ],
}

export default profile
