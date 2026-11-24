import type { ProfileContent } from '../../types'

const profile: ProfileContent = {
  name: 'Ислам Дуйшобаев',
  shortName: 'Ислам Д.',
  role: 'Full Stack разработчик · Python Backend',
  location: 'Бишкек, Кыргызстан',
  availability: 'Открыт к удалённой работе: Full Stack и Python Backend (удалённо / международные компании / СНГ)',
  tagline:
    'Разрабатываю backend-системы на Python и Django: REST API, фоновые конвейеры обработки данных и интерфейсы на React вокруг них.',
  summary:
    'Full Stack разработчик с опытом около трёх лет: веб-приложения, бизнес-системы, образовательные платформы и инструменты с AI. Основная специализация — backend на Python (Django, Django REST Framework, FastAPI), на frontend — React и TypeScript.',
  portraitAlt: 'Ислам Дуйшобаев со скрещёнными руками на фоне брендированного баннера',
  facts: [
    { label: 'Специализация', value: 'Python backend · Django · DRF · FastAPI' },
    { label: 'Frontend', value: 'React · TypeScript · Vite' },
    { label: 'Опыт', value: 'Около 3 лет (по резюме)' },
    { label: 'Локация', value: 'Бишкек, Кыргызстан' },
    { label: 'Языки', value: 'Русский C2 · Английский B1 · Кыргызский — родной' },
    { label: 'Статус', value: 'Открыт к удалённой работе' },
  ],
  workingPrinciples: [
    'Чёткие границы между сервисами и простые решения, которые легко менять.',
    'Медленные операции выносятся в фоновые задачи, чтобы продукт оставался быстрым для пользователя.',
    'Производительность измеряется, а не угадывается: оптимизация запросов через select_related, prefetch_related и Q-объекты.',
    'Код покрыт тестами, наблюдаем и легко передаётся другим. Последовательность — это практика, а не настроение.',
  ],
  experience: [
    {
      company: 'OKURMEN IT',
      monogram: 'OK',
      role: 'Full Stack разработчик (Python / React)',
      period: 'Янв 2024 — н. в.',
      location: 'Бишкек, Кыргызстан',
      current: true,
      summary:
        'Веб-продукты и внутренние IT-системы образовательной организации: backend и frontend, интеграции и развёртывание.',
      responsibilities: [
        {
          title: 'Платформа OkurmenKIDS',
          text: 'Публичный сайт, LMS, тренировочный портал и Django Admin на одном Django REST API с PostgreSQL и задачами Celery. Развёрнута на Railway и Vercel и переведена на okurmenkids.com с поддоменами api., lms. и training.',
        },
        {
          title: 'LMS',
          text: 'Backend-сервисы на Django и DRF, интерфейсы на React для учеников, преподавателей, групп, курсов и учебных материалов, а также инструменты администрирования, аналитика и отчётность.',
        },
        {
          title: 'Онлайн-тестирование',
          text: 'Тесты с таймером, автоматический подсчёт баллов, XP, достижения и рейтинги, AI-проверка ответов.',
        },
        {
          title: 'AI Code Checker',
          text: 'Интеграция с GigaChat API и фоновая обработка через Celery и Redis.',
        },
        {
          title: 'CRM и автоматизация',
          text: 'Инструменты управления учениками, административные процессы и уведомления.',
        },
        {
          title: 'Certificate Cover Studio',
          text: 'Управление шаблонами, бизнес-логика и пользовательские интерфейсы.',
        },
      ],
      results: [
        { value: '5', label: 'продакшн-адресов платформы OkurmenKIDS на одном API', source: 'Repository' },
        { value: '500+', label: 'тестовых сессий проведено на платформе тестирования', source: 'CV' },
        { value: '20–30 мин', label: 'на проверку домашних заданий с AI-проверкой вместо нескольких часов', source: 'CV' },
        { value: 'до 70%', label: 'рутинных административных операций автоматизировано', source: 'CV' },
      ],
      stack: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'Celery', 'Redis', 'GigaChat API', 'React', 'TypeScript', 'Docker', 'Railway', 'Vercel'],
      projectSlugs: ['okurmenkids', 'okurmen-testing-platform', 'cover-studio'],
    },
    {
      company: 'GEEKSPRO',
      monogram: 'GP',
      role: 'Python Backend разработчик',
      period: 'Окт 2023 — дек 2023',
      location: 'Бишкек, Кыргызстан',
      current: false,
      summary: 'Backend WMS для пивоварни «Колос» — системы автоматизации складского и финансового учёта.',
      responsibilities: [
        {
          title: 'Складские операции',
          text: 'Товары, дистрибьюторы, транзакции и складские операции, включая перемещение между статусами «норма» и «брак».',
        },
        {
          title: 'Безопасность и аудит',
          text: 'История изменений через django-simple-history и защита от перебора паролей через Django Axes.',
        },
        {
          title: 'Финансовые документы',
          text: 'PDF-накладные и возвраты; транзакции БД для целостности финансовых операций.',
        },
        {
          title: 'Производительность запросов',
          text: 'Оптимизация запросов к PostgreSQL и Django ORM через select_related, prefetch_related и Q-объекты.',
        },
      ],
      results: [{ value: '40+', label: 'эндпоинтов REST API на Django REST Framework', source: 'CV' }],
      stack: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'django-simple-history', 'Django Axes'],
      projectSlugs: [],
    },
  ],
  skillGroups: [
    {
      title: 'Backend',
      items: ['Python', 'Django', 'Django REST Framework', 'FastAPI', 'Flask', 'Проектирование REST API', 'Django ORM', 'SQL', 'WebSockets', 'JWT'],
    },
    {
      title: 'Frontend',
      items: ['React', 'TypeScript', 'JavaScript', 'Zustand', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite'],
    },
    {
      title: 'Данные и асинхронность',
      items: ['PostgreSQL', 'Redis', 'SQLite', 'Celery', 'Celery Beat', 'Фоновые задачи'],
    },
    {
      title: 'DevOps и инструменты',
      items: ['Docker', 'Nginx', 'Gunicorn', 'Git', 'GitHub Actions', 'CI/CD', 'Railway', 'Postman'],
    },
    {
      title: 'Интеграции',
      items: ['Telegram Bot API', 'Aiogram', 'Telethon', 'OpenAI API', 'GigaChat API'],
    },
    {
      title: 'Тестирование',
      items: ['pytest', 'pytest-django'],
    },
  ],
  education: [
    {
      title: 'Международный университет Кыргызстана',
      detail: 'Бакалавриат, программная инженерия. Ожидаемый год выпуска: 2029.',
    },
    {
      title: 'OKURMEN IT Academy',
      detail: 'Frontend-разработка (React), 2024.',
    },
    {
      title: 'Geeks IT Academy',
      detail: 'Backend-разработка (Python, Django, DRF), 2023.',
    },
  ],
  languages: [
    { name: 'Кыргызский', level: 'Родной' },
    { name: 'Русский', level: 'C2' },
    { name: 'Английский', level: 'B1 (средний)' },
  ],
}

export default profile
