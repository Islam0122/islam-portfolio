import type { ProjectSlug, ProjectText } from '../../../types'

/*
 * Every fact below comes from one of two sources:
 *  - the CV (CV) — claims made by the candidate, not independently verified here
 *  - the repository code/README (Repository) — checked in the source tree
 * Anything not present in those sources is listed under `unavailable`.
 * Language-neutral fields (stack, links, endpoint paths, image files) live in src/data/projects.ts.
 */

const projects: Record<ProjectSlug, ProjectText> = {
  okurmenkids: {
    title: 'OkurmenKIDS — Multi-Application Academy Platform',
    tagline:
      'A production platform for an IT academy: a public website, an LMS, a training portal and Django Admin, all served by one Django REST API with PostgreSQL and background jobs.',
    context:
      'Commercial production system built at OKURMEN IT for the Okurmen Kids academy. Monorepo Islam0122/OkurmenKIDS with four deployable applications, live on okurmenkids.com and its subdomains. Repository history runs from September 2026 to the present.',
    role: 'Full Stack Developer: backend, frontend integration, deployment',
    period: 'Sep 2026 – present',
    problem:
      'The academy serves very different audiences: visitors and parents on the public website, staff running day-to-day work (groups, schedule, attendance, homework, billing, payroll, HR, marketing), students preparing for exams without an account, and administrators managing reference data. Each audience needs its own interface, but they all work with the same students, groups, lessons and payments. The data has to live in one place, behind strict role-based access.',
    solution:
      'One Django REST API on Railway is the single source of truth, backed by PostgreSQL. Three independent React applications, each with its own Vercel project and domain, call the API: the public website, the LMS and the training portal. Django Admin runs on the API host for back-office data. Recurring work (billing runs, accountant notifications, closing staff check-ins, operations reminders, statistics snapshots) is defined as Celery Beat tasks. With a Redis broker they run in workers; without one they run synchronously, and a Railway cron service runs the scheduled commands every 30 minutes.',
    contribution: [
      'Built the Django REST backend: 28 domain apps under one flat /api/v1/ namespace, with JWT auth, role-based permissions, public read-only endpoints and an OpenAPI schema (repository-based).',
      'Connected three React 19 + TypeScript frontends to the same API, each with its own API client, error handling and environment configuration (repository-based).',
      'Set up deployment: a Docker image for the API, an entrypoint that runs collectstatic, migrations under a PostgreSQL advisory lock and gunicorn, a Railway cron service, and three Vercel projects (repository-based).',
      'Moved the platform to okurmenkids.com: api., lms. and training. subdomains, exact ALLOWED_HOSTS, CORS and CSRF origins in place of wildcards, and a health check exempt from the SSL redirect (documented in PRODUCTION_DOMAIN_MIGRATION.md).',
      'Production maintenance: a read-only production audit, a fix for the www ↔ apex redirect loop, and a fix for the CORS failure on the training portal after the domain move (documented in the repository).',
      'Automated tests across the stack: 3,681 backend test functions and 109 frontend test files (repository count).',
    ],
    architecture: [
      'Monorepo with four deployable apps: backend/ (Django), frontend/ (LMS), okurmen-public-website/ and training-portal/.',
      'Django project with split settings (base, development, production, testing, cors) and 28 domain apps in backend/apps: academy, testing, training, billing, accounting, scholarships, recruitment, marketing, website, push, staff_attendance, reports, operations and others.',
      'One flat /api/v1/ namespace. Staff authenticate with SimpleJWT (30-minute access tokens, 7-day rotating refresh tokens); public endpoints live under /api/v1/public/ with per-IP throttles; training attempts use signed per-attempt tokens.',
      'Request middleware isolates the accounting and student/parent areas and records the acting user for trainer history.',
      'LMS: React 19, Vite, TanStack Query and axios with a single shared token-refresh call on 401; an installable PWA with an offline page and Web Push. The same build also serves the public schedule, leaderboard, statistics and launcher sites through VITE_APP_MODE.',
      'Public website: React 19 SPA with TanStack Query, RU / KY / EN routes, SEO prerendering, a sitemap built from the API and Vercel middleware for social-media previews.',
      'Training portal: React 19 with plain fetch, one API module per resource and a separate exam layout.',
      'API documentation from drf-spectacular at /api/docs/.',
    ],
    dataFlow: [
      'A visitor opens okurmenkids.com. The home page loads in one request from /api/v1/public/site/home/, and the enrollment form posts a lead to the API.',
      'A staff member signs in at lms.okurmenkids.com and receives JWT tokens. On a 401, the client refreshes once and retries.',
      'An administrator generates a group’s lessons from its course plan. Trainers mark attendance, homework and grades, and KPI dashboards and parent reports read the same records.',
      'Scheduled billing tasks process completed lessons, update invoices, mark overdue ones and notify accountants.',
      'A student at training.okurmenkids.com enters a name and starts an attempt with a signed token. Answers are autosaved, and the server enforces the deadline and grades the attempt on submit.',
      'Administrators manage reference data and records in Django Admin at api.okurmenkids.com/admin/.',
    ],
    database: [
      'PostgreSQL in production (dj-database-url). 132 migrations across the 28 apps.',
      'Academy core: Course, CourseLessonPlan, Group, GroupTeacher (a teaching program: trainer, subject, schedule and lesson plan), GroupSchedule, Lesson, Room, Student, Attendance, Homework, HomeworkResult.',
      'Testing and training: Test, Question, QuestionOption, TestSession, StudentAttempt, Answer, plus PortalSettings, TrainingVideo and TrainingLink for the public portal.',
      'Billing: BillingPlan with versions, StudentBillingProfile, LessonPackage, LessonConsumption, Invoice and discount and absence policies.',
      'users.User with a role field: administrator, trainer, team lead, assistant, accountant, director, operations director, HR, sales, marketing and student/parent.',
    ],
    endpointNotes: [
      'Staff sign-in; returns JWT access and refresh tokens.',
      'Rotate the refresh token and issue a new access token.',
      'Generate a group’s lessons from its course plan (admin only, idempotent).',
      'Public website home page in one request: hero, stats, CMS blocks, featured content.',
      'Enrollment request from the public website (throttled per IP).',
      'Public read-only schedule with a closed list of fields.',
      'Start a training attempt by name; returns a signed attempt token.',
      'Submit an attempt; the server grades it and returns the result.',
      'Staff check-in after scanning the office QR code.',
      'Health check used by the hosting platform.',
    ],
    challenges: [
      'Serving several frontends from one API safely: exact CORS and CSRF origin lists per application, no wildcard trust and no localhost origins in production.',
      'Keeping exams fair in a browser: fullscreen, tab-switch tracking and copy/paste blocking are reported to the server, which counts violations and can end the attempt. The deadline and grading never depend on the client.',
      'Running migrations safely on deploy: one replica applies them under a PostgreSQL advisory lock while the others wait, always before gunicorn starts.',
      'Billing that is safe to re-run: Beat only triggers the checks, and locks and unique keys in the services prevent duplicates.',
      'Moving a live system to a new domain without breaking existing users: legacy *.vercel.app origins stay allowed during the rollout, and the redirect loop and CORS gap found after the move were fixed.',
    ],
    metrics: [
      { value: '5', label: 'production URLs: public website, LMS, training portal, API and Django Admin', source: 'Repository' },
      { value: '28', label: 'Django apps in backend/apps', source: 'Repository' },
      { value: '3,681', label: 'backend test functions', source: 'Repository' },
      { value: '109', label: 'frontend test files across the three React apps', source: 'Repository' },
    ],
    unavailable: [
      'User, student and traffic numbers are not published here: the repository does not contain them.',
      'Whether production runs a Redis broker and Celery workers is not verified. The repository’s own audit marks it as not verified; the code falls back to synchronous tasks and a 30-minute cron.',
      'The repository has no CI pipeline; tests run locally.',
      'Admin, LMS and training portal content behind sign-in is not shown publicly.',
    ],
    imageAlts: [
      'okurmenkids.com: the public website’s home page with the hero section and enrollment buttons',
      'OkurmenKIDS Schedule: the public day view with lessons by room and trainer',
      'training.okurmenkids.com: the training portal home page with training tests by subject',
      'OkurmenKIDS LMS: a completed lesson with attendance, homework and lesson details in the trainer’s cabinet',
      'Architecture slide: three Vercel frontends and Django Admin connected to the Django REST API on Railway with PostgreSQL, a media volume, Celery tasks and a cron service',
    ],
    productionLinks: [
      { label: 'Public website', description: 'okurmenkids.com: courses, projects, events, news and enrollment' },
      { label: 'LMS', description: 'lms.okurmenkids.com: staff cabinets, schedule, attendance, exams, finance' },
      { label: 'Training portal', description: 'training.okurmenkids.com: exam preparation without an account' },
      { label: 'REST API', description: 'api.okurmenkids.com: the central Django REST API' },
      { label: 'Django Admin', description: 'api.okurmenkids.com/admin/: back office (sign-in required)' },
    ],
    capabilities: [
      {
        title: 'LMS and academy operations',
        body: 'Groups, teaching programs (trainer, subject, schedule, lesson plan), idempotent lesson generation from course plans, attendance, homework and grades, a monthly attendance matrix, academic progress and a KPI dashboard with period comparison.',
      },
      {
        title: 'Exams and the training portal',
        body: 'Exam mode in the LMS, live monitoring for trainers and a public training portal: attempts by name, autosave, instant answer checks with explanations, a leaderboard, videos and links. Exam lock mode with fullscreen, tab-switch tracking and copy/paste blocking.',
      },
      {
        title: 'Billing, accounting and scholarships',
        body: 'Tuition billing by lesson packages with invoices, credit, overdue tracking and accountant notifications; a payroll and payout module for accountants; scholarships.',
      },
      {
        title: 'Role-based staff cabinets',
        body: 'Separate workspaces for administrators, trainers, a read-only team lead, assistants, accountants, directors, HR (vacancies, candidates, interviews, a public careers site) and marketing (content plan and the website CMS). Staff check in and out with an office QR code.',
      },
      {
        title: 'Parents and students',
        body: 'Parent reports built from LMS data: a 1600×1100 PNG rendered from a Django template in headless Chromium (Playwright), plus a ready WhatsApp text. A student/parent cabinet and Web Push notifications in the installed PWA.',
      },
      {
        title: 'Public website and CMS',
        body: 'Courses, student projects, achievements, news, events with registration, team, testimonials and an enrollment form in Russian, Kyrgyz and English. All content is managed in the marketing cabinet, with signed draft-preview links.',
      },
    ],
    operations: [
      'API image: python:3.12-slim with headless Chromium for report rendering, running as an unprivileged user.',
      'Railway: the API service with PostgreSQL and a media volume, plus a cron service that runs scheduled commands every 30 minutes.',
      'Vercel: three separate projects (public website, LMS, training portal), each with its own build, SPA rewrites and headers.',
      'Domains on okurmenkids.com: apex for the website, lms., training. and api. subdomains with TLS; www → apex redirect configured in Vercel Domains.',
      'Hardening: no default superuser, an exact CSRF_TRUSTED_ORIGINS list, CORS credentials off by default, HSTS, secure cookies, X-Frame-Options DENY and DRF throttling.',
      'Maintenance: a documented production audit, the redirect-loop fix and the training-portal CORS fix after the domain migration.',
    ],
    videoTitle: 'OkurmenKIDS platform video',
  },
  'okurmen-testing-platform': {
    title: 'Okurmen Kids Testing & Grading Platform',
    tagline: 'Timed online tests, automatic scoring and AI-assisted grading for an educational organisation.',
    context:
      'Professional work at OKURMEN IT (Full Stack Developer, Jan 2024 – present). Team project. The repository is public on GitHub and contains the Django backend and a React learning front end.',
    role: 'Full Stack Developer (Python / React)',
    period: 'Jan 2024 – present',
    problem:
      'Checking test answers and homework by hand took hours per batch, and an online test needs timers, session control and reliable scoring when many students sit it at once.',
    solution:
      'A Django REST backend organises tests into sessions and attempts. Scoring happens in the service layer, and free-text answers are graded asynchronously through Celery tasks that call the GigaChat API. Periodic tasks expire stale sessions and retry pending regrades. Session reports go out through a Telegram integration, and questions can be imported and exported as Excel files.',
    contribution: [
      'Backend services on Django / DRF for students, teachers, groups, courses and study materials (per CV).',
      'Timed test flow: sessions, attempts, automatic result calculation, XP, achievements and ratings (per CV).',
      'Integration of AI answer checking through GigaChat with background processing via Celery and Redis (per CV).',
      'React interfaces for the learning platform (per CV). Repository contains a Vite + React 19 app with exam, quest, badge and progress-store modules.',
      'Administrative tooling, analytics and reporting (per CV).',
    ],
    architecture: [
      'Django project with domain apps: testing (models, services, API, analytics, admin tooling).',
      'Layered flow: API views and serializers → services/ (session, grading, Excel import, Telegram reports) → models.',
      'Celery workers and Beat run the asynchronous jobs; the broker and result backend are Redis (CELERY_BROKER_URL is set from the Redis URL in settings).',
      'Deployment scripts for gunicorn, the Celery worker and beat (backend/deployment/).',
    ],
    dataFlow: [
      'A student enters a test session with a key and starts an attempt.',
      'Each answer is stored through the service layer; free-text answers are queued for grading.',
      'A Celery task (grade_answer_task) calls the GigaChat checker and persists the score and confidence on the Answer.',
      'A periodic task (regrade_pending_answers_task) re-queues answers still pending.',
      'A periodic task (expire_stale_sessions_task) closes sessions that are no longer valid.',
      'send_session_report_task produces the session report that the Telegram reporting service delivers.',
    ],
    database: [
      'Test, Question, QuestionOption: the question bank, with question types, difficulty and programming language.',
      'TestSession: a time-bounded session, with a status and an access key.',
      'StudentAttempt: one student’s attempt in a session, with a status.',
      'Answer: the stored response with AI score and confidence fields (added in migration 0005).',
      'Teacher and TeacherAccess: teacher accounts and which tests they can access.',
      'Six migrations are in the repository (0001–0006).',
    ],
    endpointNotes: [
      'List tests (POST creates one).',
      'Create a test session for a test.',
      'Enter a session with its key.',
      'Start a student attempt.',
      'Submit one answer.',
      'Finish an attempt.',
      'Leaderboard endpoint (v2).',
      'Upload questions from a spreadsheet for preview.',
    ],
    challenges: [
      'Keeping slow AI grading out of the request cycle: grading runs in Celery tasks with acks_late, reject_on_worker_lost and a soft time limit, plus a periodic regrade job for answers still pending.',
      'Avoiding lost grades: _persist_grade writes the result back to the Answer record once the task completes.',
      'Making question authoring practical for teachers through Excel import with a preview step before confirmation.',
    ],
    metrics: [
      { value: '500+', label: 'test sessions run (reported on CV)', source: 'CV' },
      { value: '~70%', label: 'routine admin operations automated (reported on CV, Okurmen CRM work)', source: 'CV' },
      { value: '20–30 min', label: 'homework check time after AI checker, previously several hours (reported on CV)', source: 'CV' },
    ],
    unavailable: [
      'Live demo URL is not confirmed; no public link is included.',
      'The exact split of work between team members is not documented in the repository.',
      'No automated test-coverage figure is available for this codebase.',
      'The repository’s backend/.env is tracked in git. Its values are not reproduced here, and the file should be removed and its secrets rotated.',
    ],
    imageAlts: ['The Okurmen Kids learning platform open on a laptop in a development workspace'],
  },
  'access-control-system': {
    title: 'Access Control System (RBAC API)',
    tagline: 'Authentication with email OTP and JWT, plus role-based access control for a Django REST API.',
    context:
      'Personal project. Public repository. Built to practise authentication and authorization design, not as a commercial product.',
    role: 'Backend developer (author)',
    period: 'Not stated in the repository',
    problem:
      'Most CRUD APIs either have no permission model or bolt one on in each view. The project explores a single RBAC model that decides who can do what to which business objects.',
    solution:
      'Users register and confirm their email with a one-time code (OTP), then sign in with JWT. Roles are attached to users, and access rules are stored per business element and per action (read, create, update, delete), with separate rules for “own” and “all” objects. An admin API assigns and revokes roles. Mock business endpoints for products, orders and stores exercise the rules.',
    contribution: [
      'Designed and implemented the authentication flow, RBAC models and permission checks (repository-based).',
      'Wrote the pytest suites for authentication and RBAC permissions (64 test functions in the repository).',
      'Packaged the project with Docker and docker-compose, with a Makefile for common commands.',
    ],
    architecture: [
      'apps/users: custom User model, Role and UserRole, registration, OTP verification, login/logout, profile and soft delete.',
      'apps/access: BusinessElement and AccessRolesRules models, plus admin endpoints for roles and permission checks.',
      'apps/core: JWT authentication class and middleware, shared services and utilities.',
      'apps/business: mock product, order and store endpoints used to demonstrate enforcement.',
      'Settings split into base, development, production and testing modules.',
    ],
    dataFlow: [
      'Register → an OTP is generated with an expiry time → the user verifies it → the account is activated.',
      'Login issues a JWT; the custom authentication class resolves the user on each request.',
      'A protected endpoint checks the user’s roles against AccessRolesRules for the target business element.',
    ],
    database: [
      'User: custom auth model with otp_code and otp_expires_at for email verification.',
      'Role and UserRole: many-to-many assignment of roles to users.',
      'BusinessElement: a protected resource type (for example products or orders).',
      'AccessRolesRules: which role may perform which action on which element, including “own” vs “all” scope.',
    ],
    endpointNotes: [
      'Register a user; an OTP is sent.',
      'Confirm the email with the OTP.',
      'Obtain JWT tokens.',
      'End the session.',
      'Update the profile.',
      'Soft-delete the account.',
      'Assign a role (admin).',
      'Show the current user’s permissions.',
      'Mock business endpoint protected by RBAC.',
    ],
    challenges: [
      'Separating “own objects” from “all objects” permissions so that one rule set can answer both.',
      'Keeping OTP verification and expiry explicit in the data model rather than in ad-hoc views.',
    ],
    metrics: [
      { value: '64', label: 'pytest test functions across the authentication and RBAC suites', source: 'Repository' },
    ],
    unavailable: [
      'No public deployment or live demo.',
      'Project timeline is not stated in the repository.',
      'The business endpoints are mock objects by design, not a real commerce domain.',
    ],
    imageAlts: [],
  },
  jobpulse: {
    title: 'JobPulse — Telegram Job Finder',
    tagline:
      'A Django backend and Telegram bot that gather vacancies from channels and job boards and deliver them to users.',
    context: 'Personal project. Public repository. The README is written in Russian and English.',
    role: 'Backend developer (author)',
    period: 'Not stated in the repository',
    problem:
      'Job seekers miss relevant vacancies scattered across Telegram channels and job boards, and have no feedback loop for what they have already seen.',
    solution:
      'A Telethon parser reads vacancy channels and an hh.ru parser collects postings. Vacancies are stored with parsing logs, and users get notified in instant, daily or weekly modes. Users can react to, favourite and comment on vacancies, and the admin side manages required channels and broadcasts.',
    contribution: [
      'Backend data models and parsing pipeline for vacancies, channels, notifications and reactions (repository-based).',
      'Celery and Redis configuration for asynchronous parsing and notification jobs (repository-based).',
      'Docker-based setup for development and production (per the README).',
    ],
    architecture: [
      'Django apps: users, vacancies, channels, review, resume_analysis, broadcastprompt.',
      'vacancies/services_/telethon_parser: Telegram channel client, extractor and parser.',
      'Separate configuration modules for Redis and Telethon in config/settings.',
      'A bot/ client that talks to the backend.',
    ],
    dataFlow: [
      'Telethon reads configured channels; the hh.ru parser fetches listings.',
      'Parsed content becomes Vacancy records and each run is written to ParsingLog.',
      'Matching and notification records (VacancyNotification) feed the delivery modes (instant, daily, weekly).',
    ],
    database: [
      'Vacancy: the central job record.',
      'VacancyNotification and ParsingLog: delivery and parser-run history.',
      'VacancyReaction and FavoriteVacancy: user feedback on vacancies.',
      'RequiredChannel: channels users must subscribe to; BroadcastMessage: admin broadcasts.',
      'ResumeAnalysis and Comment: profile analysis and feedback records.',
    ],
    endpointNotes: [],
    challenges: [
      'Parsing external sources that change structure: ParsingLog keeps a per-run trail so failures are visible.',
      'Keeping Telegram parsing and bot delivery decoupled through background jobs.',
    ],
    metrics: [],
    unavailable: [
      'No automated tests: the app test modules currently contain zero test functions.',
      'No public deployment or live bot link is included.',
      'The public API surface is not documented in this portfolio because it was not verified in this pass.',
    ],
    imageAlts: [],
  },
  'cover-studio': {
    title: 'Cover Studio — Certificate & Cover Editor',
    tagline:
      'A browser-based design tool for A4 covers, certificates, reports and title slides: parametric templates, a Fabric.js canvas editor and print-quality PDF/PNG export.',
    context: 'Professional work at OKURMEN IT, listed on the CV as “Certificate Cover Studio”. Public repository.',
    role: 'Front-end and business-logic developer',
    period: 'Not stated in the repository',
    problem:
      'Teachers and staff needed certificates, coursework title pages, covers and reports in a consistent brand style, without laying out every document by hand in a graphics editor or asking a designer each time.',
    solution:
      'Users pick one of the parametric templates, enter the content once (topic, author, supervisor, institution) and the layout is composed for them. A three-column editor built on a Fabric.js canvas in exact A4 proportions lets them fine-tune any element, recolour the whole document with theme presets, add a logo, stamp or hand-drawn signature, and export a PDF or PNG at up to 384 DPI. Projects autosave in the browser.',
    contribution: [
      'Template management, business logic and user interfaces for the certificate module (per CV).',
      'Template catalogue with 12 templates in six categories, search and orientation filter (repository README).',
    ],
    architecture: [
      'React 19 single-page app (TypeScript, Vite, Tailwind CSS 4) with React Router: Home, Templates and Projects pages plus a lazily loaded Editor route.',
      'Template definitions (src/templates) are parametric: each layout is a function of the page size, so switching portrait ↔ landscape rebuilds the composition instead of stretching it.',
      'Document model (src/types/template.ts): text holds {{field}} placeholders, colours are theme tokens such as $primary and fonts are $heading / $body, so the data form and colour presets update every element at once.',
      'Zustand stores: editorStore (open document, selection, undo/redo history, zoom, preview), projectStore (projects persisted to LocalStorage), brandStore (logo, stamp and signature kit) and assetStore (uploaded images stored once and referenced as asset:<id>).',
      'One Fabric.js renderer (utils/renderer.ts) draws the editor canvas, the gallery thumbnails and the exported files, and re-creates only the objects whose content changed.',
      'Export utilities: exportImage.ts (PNG) and exportPdf.ts (jsPDF, imported on demand; the page is embedded as a 300+ DPI raster so Cyrillic text and Google Fonts look identical).',
    ],
    dataFlow: [
      'A template is chosen in the gallery; a document is built from its layout and default fields, and a project is created in projectStore.',
      'Form inputs, canvas transforms and property edits go through editorStore.commit(), which records the undo history.',
      'The renderer synchronises the Fabric.js canvas with the document, re-creating only elements that changed, so the selection is kept.',
      'useAutosave writes the document back to its project (debounced 500 ms and on page unload); the project list is persisted to LocalStorage.',
      'Export renders the same document at 192, 300 or 384 DPI and downloads a PNG or a jsPDF document.',
    ],
    database: [],
    endpointNotes: [],
    challenges: [
      'Keeping the downloaded file identical to the screen: the canvas, thumbnails and export share one renderer.',
      'Keeping an exact A4 canvas responsive across screen sizes while preserving print proportions.',
      'Removing paper backgrounds from uploaded stamps and signature scans so they sit cleanly on templates.',
      'Staying within the LocalStorage quota: uploaded images are compressed, stored once and removed when no project uses them.',
    ],
    metrics: [
      { value: '12', label: 'templates in six categories (repository README)', source: 'Repository' },
      { value: '384 DPI', label: 'highest export preset (192 / 300 / 384 DPI in exportImage.ts)', source: 'Repository' },
    ],
    unavailable: [
      'No backend or database: all state lives in the browser.',
      'The exact division of work on the team is not documented.',
      'No production URL is published in the repository, so no live demo link is shown.',
    ],
    imageAlts: [
      'Cover Studio editor with an A4 certificate on the canvas and the left-hand data panel',
      'Cover Studio template gallery with category filters',
      'Cover Studio editor with the layers panel and a hand-drawn signature and stamp on the certificate',
      'Cover Studio download dialog with PDF and PNG formats, A4 orientation and 192 / 300 / 384 DPI quality options',
    ],
    capabilities: [
      {
        title: 'Template gallery',
        body: '12 templates in six categories — university, school, IT projects, certificates, reports and presentations — with search by name, description and tags, and a portrait / landscape filter. Thumbnails are drawn by the editor’s own renderer.',
      },
      {
        title: 'Three-column editor',
        body: 'Data, template and style panel on the left; a Fabric.js canvas in exact A4 proportions in the centre (select, drag, resize, rotate, edit text, zoom, fit, preview); element properties and layers on the right.',
      },
      {
        title: 'Design tools',
        body: 'Add text, rectangles, ellipses, lines, images and technology logos. Layers can be reordered, hidden and locked; elements can be duplicated or deleted, with undo / redo (Ctrl+Z / Ctrl+Shift+Z).',
      },
      {
        title: 'Themes and backgrounds',
        body: 'Colour presets recolour the whole document because templates use theme tokens. Heading and body fonts, and a solid, gradient or photo background.',
      },
      {
        title: 'Brand kit',
        body: 'Built-in OkurmenKids logo, stamp and signature slots. The paper background of uploaded stamps and scans is removed automatically; a signature can be drawn on screen. The kit is reused in new projects.',
      },
      {
        title: 'Export and projects',
        body: 'PNG and PDF, A4 portrait or landscape, at 192, 300 or 384 DPI. Projects autosave to LocalStorage and can be reopened, duplicated or deleted on the My Projects page.',
      },
    ],
    operations: [
      'Vercel: npm run build → dist/; vercel.json rewrites every route to index.html.',
      'Netlify: public/_redirects provides the same single-page-app fallback.',
      'GitHub Pages and other hosts without rewrites: npm run build:static switches to hash routing with a relative base path.',
    ],
    videoTitle: 'Cover Studio — product walkthrough',
  },
}

export default projects
