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
      role: 'Full Stack разработчик (Python / React)',
      period: 'Янв 2024 — н. в.',
      location: 'Бишкек, Кыргызстан',
      summary:
        'Разработка и поддержка веб-продуктов и внутренних IT-систем образовательной организации: backend и frontend, интеграции и развёртывание.',
      highlights: [
        'LMS: backend-сервисы на Django и DRF, интерфейсы на React для учеников, преподавателей, групп, курсов и учебных материалов, а также инструменты администрирования, аналитика и отчётность.',
        'Платформа онлайн-тестирования: тесты с таймером, автоматический подсчёт баллов, XP, достижения и рейтинги. Проведено более 500 тестовых сессий (резюме).',
        'AI Code Checker: интеграция с GigaChat API и фоновая обработка через Celery и Redis; время проверки домашних заданий сократилось с нескольких часов примерно до 20–30 минут (резюме).',
        'CRM и автоматизация: инструменты управления учениками, административные процессы и уведомления; автоматизировано до 70% рутинных административных операций (резюме).',
        'Certificate Cover Studio: управление шаблонами, бизнес-логика и пользовательские интерфейсы.',
      ],
      projectSlugs: ['okurmenkids', 'okurmen-testing-platform', 'cover-studio'],
    },
    {
      company: 'GEEKSPRO',
      role: 'Python Backend разработчик',
      period: 'Окт 2023 — дек 2023',
      location: 'Бишкек, Кыргызстан',
      summary: 'Backend-разработка WMS для пивоварни «Колос» — системы автоматизации складского и финансового учёта.',
      highlights: [
        'Разработал более 40 эндпоинтов REST API на Django REST Framework.',
        'Реализовал операции с товарами, дистрибьюторами, транзакциями и складом, включая перемещение между статусами «норма» и «брак».',
        'Добавил аудит изменений через django-simple-history и защиту от перебора паролей через Django Axes.',
        'Реализовал генерацию PDF-документов для накладных и возвратов; использовал транзакции БД для целостности финансовых данных.',
        'Оптимизировал запросы к PostgreSQL и Django ORM с помощью select_related, prefetch_related и Q-объектов.',
      ],
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
