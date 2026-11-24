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
      monogram: 'OK',
      role: 'Full Stack Developer (Python / React)',
      period: 'Jan 2024 – present',
      location: 'Bishkek, Kyrgyzstan',
      current: true,
      summary:
        'Web products and internal IT systems for an educational organisation: backend and front-end development, integrations and deployment.',
      responsibilities: [
        {
          title: 'OkurmenKIDS platform',
          text: 'A public website, an LMS, a training portal and Django Admin on one Django REST API with PostgreSQL and Celery jobs. Deployed on Railway and Vercel and moved to okurmenkids.com with its api., lms. and training. subdomains.',
        },
        {
          title: 'LMS',
          text: 'Backend services on Django and DRF, React interfaces for students, teachers, groups, courses and study materials, plus admin tooling, analytics and reporting.',
        },
        {
          title: 'Online testing',
          text: 'Timed tests, automatic scoring, XP, achievements and ratings, with AI-assisted answer checking.',
        },
        {
          title: 'AI Code Checker',
          text: 'GigaChat API integration with background processing through Celery and Redis.',
        },
        {
          title: 'CRM and automation',
          text: 'Student management tools, administrative workflows and notifications.',
        },
        {
          title: 'Certificate Cover Studio',
          text: 'Template management, business logic and user interfaces.',
        },
      ],
      results: [
        { value: '5', label: 'production URLs of the OkurmenKIDS platform served by one API', source: 'Repository' },
        { value: '500+', label: 'test sessions run on the testing platform', source: 'CV' },
        { value: '20–30 min', label: 'homework check time with the AI checker, down from several hours', source: 'CV' },
        { value: 'up to 70%', label: 'of routine administrative operations automated', source: 'CV' },
      ],
      stack: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'Celery', 'Redis', 'GigaChat API', 'React', 'TypeScript', 'Docker', 'Railway', 'Vercel'],
      projectSlugs: ['okurmenkids', 'okurmen-testing-platform', 'cover-studio'],
    },
    {
      company: 'GEEKSPRO',
      monogram: 'GP',
      role: 'Python Backend Developer',
      period: 'Oct 2023 – Dec 2023',
      location: 'Bishkek, Kyrgyzstan',
      current: false,
      summary: 'Backend for the Kolos Brewery WMS, a warehouse and finance automation system.',
      responsibilities: [
        {
          title: 'Warehouse operations',
          text: 'Products, distributors, transactions and stock operations, including moves between “normal” and “defect” stock statuses.',
        },
        {
          title: 'Security and auditing',
          text: 'Change history with django-simple-history and brute-force protection with Django Axes.',
        },
        {
          title: 'Financial documents',
          text: 'PDF invoices and returns; database transactions to keep financial operations consistent.',
        },
        {
          title: 'Query performance',
          text: 'PostgreSQL and Django ORM queries optimised with select_related, prefetch_related and Q objects.',
        },
      ],
      results: [{ value: '40+', label: 'REST API endpoints built with Django REST Framework', source: 'CV' }],
      stack: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'django-simple-history', 'Django Axes'],
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
