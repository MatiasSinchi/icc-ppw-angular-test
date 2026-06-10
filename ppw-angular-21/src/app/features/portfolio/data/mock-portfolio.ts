import { Developer, Project, Service } from '../models/portfolio.models';

// Fallback local — se usa cuando Strapi no está disponible.
// Permite que el portafolio se vea completo aún sin levantar el CMS.

export const MOCK_DEVELOPERS: Developer[] = [
  {
    id: 'matias',
    slug: 'matias-sinchi',
    fullName: 'Matias Sinchi',
    role: 'Software Engineer · Frontend & Cloud',
    shortBio:
      'Ingeniero de software especializado en aplicaciones Angular y arquitecturas en la nube.',
    fullBio:
      'Construyo productos web escalables con Angular, TypeScript y servicios serverless. Me apasiona la calidad del código, la experiencia del usuario y la automatización de despliegues. Actualmente colaboro en proyectos integradores en la UPS y en clientes freelance enfocados en plataformas educativas y dashboards.',
    photoUrl:
      'https://api.dicebear.com/9.x/avataaars/svg?seed=Matias&backgroundColor=b6e3f4',
    email: 'matiassinchi88@gmail.com',
    github: 'https://github.com/matias-sinchi',
    linkedin: 'https://linkedin.com/in/matias-sinchi',
    website: 'https://matias-sinchi.dev',
    active: true,
  },
  {
    id: 'david',
    slug: 'david-larriva',
    fullName: 'David Larriva',
    role: 'Software Engineer · Backend & Data',
    shortBio:
      'Desarrollador backend con foco en APIs REST, bases de datos y CMS Headless.',
    fullBio:
      'Diseño APIs robustas con Node.js, Strapi y bases de datos relacionales y no relacionales. Disfruto modelar dominios complejos y exponer endpoints limpios para que el frontend brille. He liderado integraciones con Firebase, PostgreSQL y servicios externos.',
    photoUrl:
      'https://api.dicebear.com/9.x/avataaars/svg?seed=David&backgroundColor=c0aede',
    email: 'david.larriva@example.com',
    github: 'https://github.com/david-larriva',
    linkedin: 'https://linkedin.com/in/david-larriva',
    active: true,
  },
];

export const MOCK_SERVICES: Service[] = [
  {
    id: 1,
    title: 'Desarrollo Frontend',
    description:
      'Aplicaciones SPA modernas con Angular, signals, TypeScript estricto y diseño responsive.',
    icon: '🎨',
  },
  {
    id: 2,
    title: 'Desarrollo Backend',
    description:
      'APIs REST con Node.js, integraciones serverless y arquitecturas event-driven.',
    icon: '⚙️',
  },
  {
    id: 3,
    title: 'Diseño de Interfaces',
    description:
      'UI accesibles, sistemas de diseño con Tailwind + DaisyUI y prototipado en Figma.',
    icon: '✨',
  },
  {
    id: 4,
    title: 'Cloud & DevOps',
    description:
      'Despliegues en Firebase, Vercel y GitHub Actions con CI/CD automatizado.',
    icon: '☁️',
  },
  {
    id: 5,
    title: 'CMS Headless',
    description:
      'Modelado de contenido en Strapi, Sanity y Contentful para sitios manejables sin código.',
    icon: '📦',
  },
  {
    id: 6,
    title: 'Mentoría Técnica',
    description:
      'Acompañamiento a equipos en buenas prácticas, code review y arquitectura limpia.',
    icon: '🚀',
  },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    slug: 'plataforma-academica-ups',
    name: 'Plataforma Académica UPS',
    shortDescription:
      'Portal interactivo para gestión de proyectos y estudiantes en la Universidad Politécnica Salesiana.',
    fullDescription:
      'Plataforma web construida en Angular 21 con autenticación Firebase y contenido administrado vía Strapi. Permite a estudiantes y docentes coordinar entregables, ver rúbricas y enviar solicitudes de asesoría.',
    imageUrl:
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=70',
    type: 'academico',
    technologies: ['Angular', 'Firebase', 'Strapi', 'Tailwind'],
    repoUrl: 'https://github.com/matias-sinchi/plataforma-ups',
    demoUrl: 'https://plataforma-ups.web.app',
    featured: true,
    developerSlugs: ['matias-sinchi', 'david-larriva'],
  },
  {
    id: 2,
    slug: 'simpsons-explorer',
    name: 'Simpsons Explorer',
    shortDescription:
      'Catálogo SPA que consume la API pública de Los Simpsons con búsqueda y favoritos.',
    fullDescription:
      'Demo de Angular con rutas dinámicas, paginación, lazy loading y persistencia en localStorage. Sirve como laboratorio para mostrar buenas prácticas en consumo de APIs REST.',
    imageUrl:
      'https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&w=1200&q=70',
    type: 'personal',
    technologies: ['Angular', 'RxJS', 'Signals'],
    repoUrl: 'https://github.com/matias-sinchi/simpsons-explorer',
    demoUrl: 'https://simpsons.matias-sinchi.dev',
    featured: true,
    developerSlugs: ['matias-sinchi'],
  },
  {
    id: 3,
    slug: 'cms-portafolio-strapi',
    name: 'CMS Portafolio Strapi',
    shortDescription:
      'Modelado de contenido en Strapi v5 con tipos relacionales para programadores y proyectos.',
    fullDescription:
      'CMS Headless con autenticación basada en roles, endpoints REST y GraphQL. Diseñado para alimentar este mismo portafolio y otras webs corporativas. Incluye media library en Cloudinary.',
    imageUrl:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=70',
    type: 'laboral',
    technologies: ['Strapi', 'PostgreSQL', 'Docker', 'Cloudinary'],
    repoUrl: 'https://github.com/david-larriva/cms-portafolio',
    featured: true,
    developerSlugs: ['david-larriva'],
  },
  {
    id: 4,
    slug: 'dashboard-ventas-realtime',
    name: 'Dashboard de Ventas Realtime',
    shortDescription:
      'Tablero en vivo con Firebase Firestore y Chart.js para una pyme local.',
    fullDescription:
      'Dashboard administrativo con métricas en tiempo real, filtros por sucursal y exportación a CSV. Implementa Cloud Functions para agregaciones diarias.',
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=70',
    type: 'laboral',
    technologies: ['Angular', 'Firestore', 'Chart.js', 'Cloud Functions'],
    demoUrl: 'https://dashboard-demo.web.app',
    featured: false,
    developerSlugs: ['matias-sinchi', 'david-larriva'],
  },
  {
    id: 5,
    slug: 'api-biblioteca-mongo',
    name: 'API Biblioteca MongoDB',
    shortDescription:
      'API REST de gestión bibliotecaria con autenticación JWT y modelado NoSQL.',
    fullDescription:
      'API en Node.js + Express + MongoDB. Diseñada como ejercicio académico para Fundamentos de Bases de Datos, incluye paginación, filtros y testing con Jest.',
    imageUrl:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=70',
    type: 'academico',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    repoUrl: 'https://github.com/david-larriva/api-biblioteca',
    featured: false,
    developerSlugs: ['david-larriva'],
  },
  {
    id: 6,
    slug: 'landing-startup-edutech',
    name: 'Landing Startup EduTech',
    shortDescription:
      'Sitio de aterrizaje optimizado para SEO con animaciones suaves y formularios.',
    fullDescription:
      'Landing page para una startup educativa con foco en conversión, animaciones GSAP, integración con HubSpot y métricas con Google Analytics 4.',
    imageUrl:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=70',
    type: 'simulado',
    technologies: ['Angular', 'GSAP', 'Tailwind', 'HubSpot'],
    demoUrl: 'https://edutech-landing.vercel.app',
    featured: false,
    developerSlugs: ['matias-sinchi'],
  },
];
