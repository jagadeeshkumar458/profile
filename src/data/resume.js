// All resume content lives here. Edit this file (or use the site's ?edit mode
// and "Copy data") and redeploy — the layout updates automatically.
const resume = {
  name: 'K Jagadeesh Kumar',
  title: 'Senior Software Engineer | React JS',
  location: 'Tirupati, Andhra Pradesh, India',
  phone: '+91 90528 40525',
  email: 'jagadeeshkuncham10@gmail.com',
  linkedin: 'linkedin.com/in/jagadeesh-kumar-687147138',

  summary: [
    'Senior Software Engineer with 7+ years of experience architecting and delivering scalable, high-performance web applications using React JS for global enterprise and healthcare clients.',
    'Proven track record leading front-end modernization efforts — including a full class-to-functional component migration — while mentoring engineers and setting coding standards that raised team-wide code quality.',
    'Full-stack fluency across the React ecosystem (Redux, Redux-Saga, Zustand, Hooks, Formik) with TypeScript and Tailwind CSS, paired with ASP.NET middleware and SQL Server/PostgreSQL databases, with hands-on experience integrating complex APIs and shipping multilingual (i18n) products.',
    'Agile-certified practitioner (Avanade Certified Scrum Developer) and Microsoft Azure-certified (AZ-900, PL-900, DP-900), comfortable owning modules end-to-end and communicating directly with clients.',
  ],

  skills: [
    { label: 'Frontend', value: 'React JS, TypeScript, Redux, Redux-Saga, Zustand, React Hooks, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Semantic UI, Formik' },
    { label: 'Backend / Middleware', value: 'ASP.NET, RESTful API Integration' },
    { label: 'Databases', value: 'Microsoft SQL Server, PostgreSQL' },
    { label: 'Tools & Platforms', value: 'Git, Postman, Microsoft Azure, Agile/Scrum' },
    { label: 'Practices', value: 'Internationalization (i18n), Code Reviews, Performance Optimization, Technical Mentoring' },
  ],

  highlights: [
    'Microsoft Certified: Azure Fundamentals (AZ-900), Power Platform Fundamentals (PL-900), Azure Data Fundamentals (DP-900)',
    'P3 Proficiency rating in React JS, Microsoft SQL Server, and ASP.NET — Accenture internal competency assessment',
    'Avanade Certified Scrum Developer',
  ],

  employment: [
    { company: 'Definitive Healthcare, Bangalore', role: 'Senior Software Engineer', period: 'Jan 2025 – Present' },
    { company: 'Accenture, Bangalore', role: 'Application Development Senior Analyst', period: 'Feb 2019 – Jan 2025' },
  ],

  projects: [
    {
      name: 'ESP — Conversational AI Assistant for Analytics',
      period: 'Jul 2026 – Present',
      technologies: 'React JS, TypeScript, Zustand, Tailwind CSS, Server-Sent Events (SSE), REST APIs',
      bullets: [
        "Designed and built the chat interface for ESP's embedded AI assistant — a ChatGPT-style experience scoped to ESP's own analytical data, letting users query it in natural language and view results as charts, graphs, tables, and dashboards.",
        "Integrated real-time response streaming over Server-Sent Events (SSE), rendering the assistant's replies incrementally for a responsive, low-latency chat experience.",
        'Integrated the chat messages API to handle conversation history, message sending, and response rendering within the UI.',
      ],
    },
    {
      name: 'WIZ Admin — Codebase Modernization',
      period: 'Feb 2026 – Jun 2026',
      technologies: 'React JS, Redux, Hooks, Semantic UI',
      bullets: [
        'Led the migration of WIZ Admin — a separate, access-controlled portal for monitoring dashboards, managing user access, and provisioning company licenses — spanning Monitoring, Test Suites, Reports, User Details, and Licenses screens, from class-based to functional components, extending the modernization completed on the core WIZ application.',
        'Led the same two-member development team through the WIZ Admin migration, setting the plan of action and deadlines and reviewing their code to maintain consistency with the standards established during the WIZ migration.',
        'Improved maintainability and performance across all five WIZ Admin modules through the refactor.',
      ],
    },
    {
      name: 'WIZ — Data Analytics Platform for Pharmaceutical Clients',
      period: 'Jan 2025 – Feb 2026',
      technologies: 'React JS, Redux, Hooks, Semantic UI',
      bullets: [
        "Spearheaded the migration of the application's entire codebase from class-based to functional components, aligning it with the latest React standards and improving long-term maintainability.",
        'Led a two-member development team through the transition — setting the plan of action and deadlines, and reviewing their code — to ensure a smooth, low-risk rollout.',
        'Defined and enforced React coding standards across the codebase, improving consistency and application performance.',
      ],
    },
    {
      name: 'InstructGen — GenAI Content Assembly Tool',
      period: 'Mar 2024 – Jan 2025',
      technologies: 'React JS, Redux, Hooks, Redux-Saga, Formik',
      bullets: [
        'Built core UI screens — including the landing page, a dynamic form builder, and an email content generator — enabling GenAI-driven, brand-specific content creation from Excel and PDF inputs.',
        'Engineered reusable component patterns and standardized state management with Redux, Redux-Saga, and Formik, accelerating delivery of future features.',
        'Implemented React coding standards and optimized rendering performance across the tool.',
      ],
    },
    {
      name: 'Nest — Multilingual Project Management Platform',
      period: 'Jan 2022 – Feb 2024',
      technologies: 'React JS, Redux, Hooks, Redux-Saga, Formik, ASP.NET, PostgreSQL',
      bullets: [
        'Delivered key modules — Approval Dashboards, Job Descriptions, Knowledge Management, and Community — using React JS and ASP.NET to support multi-language project tracking.',
        'Built reusable, maintainable UI code with Redux, Redux-Saga, and Formik to ensure consistency across a growing application.',
        'Established React coding standards and improved overall tool performance.',
      ],
    },
    {
      name: 'Standard Quality Framework (SQF)',
      period: 'Jan 2021 – Dec 2021',
      technologies: 'React JS, Redux, ASP.NET, SQL Server, Git',
      bullets: [
        'Extended the SQF platform by developing new high-level modules (PKT, Coaching) and interactive dashboards using React JS and ASP.NET to support transactional quality monitoring and new-hire assessments.',
        'Built reusable code with Redux to maintain consistency, supporting reporting used to track and analyze the supply chain.',
        'Established React coding standards, improving tool performance and long-term maintainability.',
      ],
    },
    {
      name: 'Internationalization of Tools (SQF & PMM)',
      period: 'Mar 2020 – Dec 2020',
      technologies: 'React JS, ASP.NET, SQL Server',
      bullets: [
        'Enabled multi-language support (English, Japanese, Chinese) by revamping existing screens and integrating i18n tags across static text.',
        'Restructured master tables and database schemas to support scalable multilingual UI, resolving downstream functional impacts.',
      ],
    },
    {
      name: 'Process Maturity Measurement (PMM)',
      period: 'Feb 2019 – Feb 2020',
      technologies: 'React JS, ASP.NET, SQL Server',
      bullets: [
        'Revamped existing screens and built standardization graphs/charts to visually benchmark process performance against industry standards.',
        'Served as a direct technical point of contact for clients, resolving issues efficiently during live calls.',
      ],
    },
  ],

  additional: [
    { label: 'Languages', value: 'English, Telugu, Hindi' },
  ],
}

export default resume
