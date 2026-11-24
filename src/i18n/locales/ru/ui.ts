import type { UiStrings } from '../../types'

const ui: UiStrings = {
  common: {
    skipToContent: 'Перейти к содержанию',
    loading: 'Загрузка…',
    opensInNewTab: '(откроется в новой вкладке)',
    breadcrumb: 'Навигационная цепочка',
    home: 'Главная',
  },
  nav: {
    home: 'Главная',
    projects: 'Проекты',
    experience: 'Опыт',
    techStack: 'Стек',
    architecture: 'Архитектура',
    about: 'Обо мне',
    blog: 'Статьи',
    contact: 'Контакты',
    primaryLabel: 'Основная навигация',
    mobileLabel: 'Мобильная навигация',
    footerLabel: 'Навигация в подвале',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    homeAriaLabel: (name) => `${name}, на главную`,
  },
  language: {
    groupLabel: 'Язык',
    switchTo: (languageName) => `Переключить на ${languageName}`,
  },
  theme: {
    system: 'Тема: как в системе. Переключить на светлую.',
    light: 'Тема: светлая. Переключить на тёмную.',
    dark: 'Тема: тёмная. Переключить на системную.',
  },
  footer: {
    copyright: (year, name) => `© ${year} ${name}. Сделано на React, TypeScript, Vite и Tailwind CSS.`,
  },
  categories: {
    Professional: 'Коммерческий',
    Personal: 'Личный',
    Learning: 'Учебный',
  },
  metricSources: {
    CV: 'Резюме',
    Repository: 'Репозиторий',
  },
  home: {
    meta: {
      title: 'Ислам Дуйшобаев — Full Stack и Python Backend разработчик',
      description:
        'Python backend и full stack разработчик из Бишкека: Django, DRF, FastAPI, React и TypeScript. Избранные проекты, архитектура и контакты.',
    },
    viewProjects: 'Смотреть проекты',
    downloadCvPdf: 'Скачать резюме (PDF)',
    profilesLabel: 'Профили',
    featuredEyebrow: 'Избранные работы',
    featuredTitle: 'Ключевые проекты',
    featuredIntro:
      'Проекты, в которых видны проектирование backend, фоновая обработка задач и разработка интерфейсов. В каждом кейсе указано, что подтверждено, а что нет.',
    skillsEyebrow: 'Ключевые навыки',
    skillsTitle: 'С чем я работаю каждый день',
    seeFullStack: 'Весь стек технологий',
    experienceLink: 'Опыт работы',
  },
  projectCard: {
    technologies: 'Технологии',
    readCaseStudy: 'Читать кейс',
    videoBadge: 'Видео',
    videoPendingBadge: 'Видео · скоро',
  },
  projects: {
    meta: {
      title: 'Проекты — Ислам Дуйшобаев',
      description:
        'Кейсы реальных проектов: платформа онлайн-тестирования с AI-проверкой, API контроля доступа на RBAC, Telegram-сервис поиска вакансий и редактор сертификатов.',
    },
    eyebrow: 'Работы',
    title: 'Проекты и кейсы',
    intro:
      'В каждом кейсе мой вклад отделён от работы команды, а утверждения, которые нельзя проверить по репозиторию, отмечены отдельно.',
    filterLabel: 'Фильтр проектов по категории',
    all: 'Все',
    emptyTitle: 'В этой категории пока нет проектов.',
    emptyBody: 'Выберите «Все», чтобы увидеть все кейсы.',
  },
  project: {
    metaTitle: (projectTitle) => `${projectTitle} — Кейс — Ислам Дуйшобаев`,
    notFoundMeta: {
      title: 'Проект не найден — Ислам Дуйшобаев',
      description: 'Такого кейса не существует.',
    },
    overview: 'Обзор',
    services: 'Продакшен-сервисы',
    servicesIntro: 'Все пять сервисов работают. Каждая ссылка открывается в новой вкладке.',
    video: 'Видеообзор',
    videoIntro: '6-минутный обзор пяти продакшен-сервисов, API и архитектуры деплоя.',
    playVideo: (projectTitle) => `Смотреть видео: ${projectTitle}`,
    videoFrameTitle: (projectTitle) => `${projectTitle} — видеообзор (YouTube)`,
    videoPrivacy: 'Плеер загружается с youtube-nocookie.com только после нажатия на кнопку воспроизведения.',
    watchOnYouTube: 'Смотреть на YouTube',
    videoPendingTitle: 'Видео скоро появится',
    videoPendingBody: 'Видеообзор готов и появится здесь после публикации на YouTube.',
    myRole: 'Моя роль',
    context: 'Контекст',
    liveDemo: 'Демо',
    notAvailable: 'Недоступно',
    viewSource: 'Исходный код на GitHub',
    liveDemoButton: 'Открыть демо',
    technologiesUsed: 'Используемые технологии',
    problem: 'Задача',
    solution: 'Решение',
    contribution: 'Мой вклад',
    contributionNote:
      'Пункты с пометкой «по резюме» указаны со слов кандидата; пункты с пометкой «по репозиторию» видны в коде.',
    architecture: 'Архитектура',
    dataFlow: 'Поток данных',
    database: 'Структура базы данных',
    api: 'Примеры API',
    apiCaption: 'Избранные эндпоинты API',
    method: 'Метод',
    path: 'Путь',
    purpose: 'Назначение',
    apiNote: 'Пути взяты из файлов urls.py репозитория. Тела запросов и ответов здесь не описаны.',
    challenges: 'Инженерные задачи',
    results: 'Результаты',
    source: (source) => `Источник: ${source}`,
    unverified: 'Что не подтверждено в этом описании',
    allProjects: '← Все проекты',
    discuss: 'Обсудить проект →',
  },
  experience: {
    meta: {
      title: 'Опыт работы — Ислам Дуйшобаев',
      description:
        'Опыт работы: Full Stack разработчик в OKURMEN IT (с 2024 года) и Python Backend разработчик в GEEKSPRO (2023). Обязанности и результаты по данным резюме.',
    },
    eyebrow: 'Опыт',
    title: 'Где я работал',
    intro: 'Результаты с пометкой «(резюме)» — собственные данные кандидата, независимо они не проверялись.',
    relatedCaseStudies: 'Связанные кейсы:',
    educationTitle: 'Образование и курсы',
    cvTitle: 'Полное резюме',
    cvBody: 'В полном резюме (PDF, на русском) — вся история работы, навыки и контакты.',
    downloadCvPdf: 'Скачать резюме (PDF)',
  },
  techStack: {
    meta: {
      title: 'Стек технологий — Ислам Дуйшобаев',
      description:
        'Технологии, с которыми я работаю: Python, Django, DRF, FastAPI, Celery, Redis, PostgreSQL, React, TypeScript, Docker — со ссылками на проекты, где они применялись.',
    },
    eyebrow: 'Стек',
    title: 'Инструменты и технологии',
    intro: 'Сгруппированы так, как я их использую. В таблице ниже — где каждая технология применялась на практике.',
    whereUsed: 'Где применялось',
    project: 'Проект',
    category: 'Категория',
    stack: 'Стек',
  },
  architecture: {
    meta: {
      title: 'Архитектура — Ислам Дуйшобаев',
      description:
        'Как устроены системы, которые я разрабатывал: путь запроса, фоновые задачи, Redis и Celery, проверки RBAC и конвейеры сбора данных — по материалам репозиториев.',
    },
    eyebrow: 'Системы',
    title: 'Как устроены системы',
    intro:
      'Схемы показывают пути, которые действительно есть в коде, и ссылаются на соответствующие исходники. Это не схемы продакшн-инфраструктуры.',
    stepsLabel: (flowTitle) => `${flowTitle}: этапы`,
    source: 'Источник:',
    principlesTitle: 'Принципы проектирования',
    principles: [
      'Тонкий слой обработки запросов: представления и сериализаторы вызывают сервисы, а бизнес-правила живут в сервисах.',
      'Медленные и ненадёжные операции (AI-запросы, парсинг, отчёты) — в Celery, с повторными попытками и ограничением по времени.',
      'Явная авторизация: именованное правило на каждый ресурс и действие, а не разрозненные проверки.',
      'Результаты фоновых задач сохраняются, чтобы сбои были видны и задачу можно было перезапустить.',
    ],
    writeupsTitle: 'Заметки об архитектуре',
    writeupsBody:
      'В отдельном репозитории — три заметки об архитектуре Django-проектов, написанные при изучении слоистой архитектуры и DDD: облегчённая структура, структура средней строгости и вариант DDD-lite. Для каждой есть скрипт развёртывания.',
    writeupsLink: 'Открыть django-architecture-lab',
    flows: [
      {
        title: 'Платформа тестирования Okurmen: проверка ответов',
        note: 'Запрос обрабатывается быстро: медленная AI-проверка выполняется фоновой задачей и записывает результат обратно в ответ.',
        steps: [
          { label: 'React-клиент', detail: 'Ученик отправляет ответ' },
          { label: 'Django REST API', detail: 'Эндпоинт attempt/answer' },
          { label: 'Сервисный слой', detail: 'Сохраняет ответ, ставит проверку в очередь' },
          { label: 'Брокер Redis', detail: 'Очередь Celery' },
          { label: 'Воркер Celery', detail: 'grade_answer_task → GigaChat' },
          { label: 'PostgreSQL', detail: 'Сохраняются балл и уверенность' },
        ],
        source: {
          label: 'backend/apps/testing/tasks.py и services/',
          href: 'https://github.com/Islam0122/OkurmenKidsTEST',
        },
      },
      {
        title: 'Система контроля доступа: авторизация запроса',
        note: 'Аутентификация и авторизация — отдельные шаги. Проверка RBAC читает правила ролей для конкретного бизнес-элемента и действия.',
        steps: [
          { label: 'Клиент', detail: 'Bearer JWT' },
          { label: 'JWT-аутентификация', detail: 'Класс на основе SimpleJWT' },
          { label: 'Проверка прав', detail: 'Роли → AccessRolesRules' },
          { label: 'Бизнес-представление', detail: 'Mock-товары, заказы, магазины' },
        ],
        source: {
          label: 'apps/core и apps/access',
          href: 'https://github.com/Islam0122/AccessControlSystem',
        },
      },
      {
        title: 'JobPulse: сбор вакансий и уведомления',
        note: 'Сбор данных идёт периодическими задачами, поэтому парсинг не блокирует бота. Каждый запуск журналируется.',
        steps: [
          { label: 'Клиент Telethon', detail: 'Читает каналы с вакансиями' },
          { label: 'Парсер hh.ru', detail: 'Собирает объявления' },
          { label: 'Хранилище вакансий', detail: 'ParsingLog на каждый запуск' },
          { label: 'Уведомления', detail: 'сразу / ежедневно / еженедельно' },
          { label: 'Telegram-бот', detail: 'Доставляет пользователю' },
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
      title: 'Обо мне — Ислам Дуйшобаев',
      description:
        'Full Stack разработчик из Бишкека: около трёх лет создаю backend на Python, REST API и интерфейсы на React.',
    },
    eyebrow: 'Обо мне',
    title: 'Backend в приоритете, frontend — на том же уровне',
    howIWork: 'Как я работаю',
    education: 'Образование',
    languages: 'Языки',
    languagesNote: 'Портфолио доступно на русском и английском. Полное резюме — на русском языке.',
    downloadCv: 'Скачать резюме (PDF, на русском)',
    seeExperience: 'Опыт работы',
  },
  blog: {
    meta: {
      title: 'Статьи — Ислам Дуйшобаев',
      description:
        'Статьи и технические заметки Ислама Дуйшобаева. Опубликованных статей пока нет; заметки об архитектуре и исходный код доступны на GitHub.',
    },
    eyebrow: 'Статьи',
    title: 'Статьи и технические заметки',
    intro:
      'На этом сайте я пока не публиковал статей. До тех пор самые подробные технические материалы находятся в репозиториях.',
    emptyTitle: 'Статей пока нет.',
    emptyBody: 'Новые публикации появятся здесь, когда будут готовы. Заметки об архитектуре и код проектов уже открыты.',
    notesTitle: 'Заметки об архитектуре',
    notesBody: 'Три разбора архитектуры Django-проектов со скриптами развёртывания.',
    caseStudiesTitle: 'Кейсы',
    caseStudiesBody: 'Подробные описания реальных проектов — с указанием, что подтверждено, а что нет.',
    browseProjects: 'Смотреть проекты',
    githubTitle: 'Следите за работой на GitHub',
    githubBody: 'Код и коммиты — самый актуальный источник того, над чем я работаю.',
  },
  contact: {
    meta: {
      title: 'Контакты — Ислам Дуйшобаев',
      description:
        'Свяжитесь со мной по поводу вакансий Full Stack или Python Backend либо чтобы обсудить проект. Email, телефон, Telegram, LinkedIn и GitHub.',
    },
    eyebrow: 'Контакты',
    title: 'Давайте обсудим',
    intro:
      'Рассматриваю удалённую работу на позициях Full Stack и Python Backend, в том числе в международных компаниях и компаниях из СНГ. Быстрее всего со мной можно связаться по email или в Telegram.',
    email: 'Email',
    phone: 'Телефон',
    preferDocument: 'Удобнее документом?',
    cvNote: 'Резюме доступно в формате PDF (на русском).',
    downloadCv: 'Скачать резюме',
    noForm: 'Формы обратной связи на сайте нет. Пишите напрямую по email, звоните или пишите в Telegram.',
  },
  notFound: {
    meta: {
      title: 'Страница не найдена — Ислам Дуйшобаев',
      description: 'Такой страницы нет. Вернитесь на главную или посмотрите проекты.',
    },
    eyebrow: 'Ошибка 404',
    title: 'Такой страницы нет',
    body: 'Возможно, ссылка устарела или в адресе опечатка. Эти страницы на месте:',
    suggestedLabel: 'Рекомендуемые страницы',
  },
}

export default ui
