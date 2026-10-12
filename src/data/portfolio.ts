/**
 * Shared portfolio data and type definitions.
 * Pure TypeScript module with no Astro virtual module dependencies.
 */

export interface ProfileData {
  name: string;
  handle: string;
  role: string;
  bio: string;
  avatar: string;
  avatarFallback: string;
  cvUrl: string;
}

export interface SkillItem {
  name: string;
  slug: string;
  color: string;
  category: 'Backend & Database' | 'Frontend & Web' | 'AI/ML & Vision' | 'DevOps & Tools';
  projectContext: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  date: string;
  description: string;
  tags: string[];
}

export interface ContactData {
  email: string;
  github: string;
  linkedin: string;
}

export interface ProjectSummary {
  id: string;
  slug: string;
  title: string;
  name?: string;
  type?: string;
  badge?: string;
  summary: string;
  excerpt: string;
  tags: string[];
  tech: string[];
  date?: string;
  coverImage?: string;
  gallery: string[];
  githubUrl: string;
  metrics: string[];
  featuredOrder: number;
}

export const PROFILE_DATA: ProfileData = {
  name: 'Jonathan Axl Wibowo',
  handle: 'JONATHAN_AXL_WIBOWO',
  role: 'Full-Stack Engineer & Applied Deep Learning Researcher',
  bio: 'Hi! I am a full-stack engineer and applied deep learning researcher specializing in building high-performance web applications and production-ready machine learning solutions. Experienced in architecting robust backend microservices, database optimization, and crafting responsive, interactive user experiences.',
  avatar: '/images/me.jpg',
  avatarFallback: '/images/me 2.png',
  cvUrl: '/cv.pdf',
};

export const CONTACT_DATA: ContactData = {
  // Rendered provisional address in RetroTerminal
  email: 'vinny.jonathan.axl@gmail.com',
  github: 'https://github.com/Crazyrenan',
  linkedin: 'https://www.linkedin.com/in/jonathan-axl',
};

export const SKILL_CATEGORIES = [
  'Backend & Database',
  'Frontend & Web',
  'AI/ML & Vision',
  'DevOps & Tools',
] as const;

export const SKILLS_DATA: SkillItem[] = [
  // Backend & Database
  {
    name: 'Python 3.11+',
    slug: 'python',
    color: '3776AB',
    category: 'Backend & Database',
    projectContext: 'PT LKH (FastAPI), Windbreaker AI, Telegram OCR Bot, IT Help Desk (Flask)',
    description: 'Primary programming language for asynchronous backend microservices, data analytics pipelines, and deep learning / computer vision research.',
  },
  {
    name: 'FastAPI',
    slug: 'fastapi',
    color: '009688',
    category: 'Backend & Database',
    projectContext: 'PT Lautan Kencana Hidup & Windbreaker AI',
    description: 'High-performance asynchronous API framework utilizing Pydantic v2 validation, SlowAPI rate limiting, and stateless JWT authentication.',
  },
  {
    name: 'PostgreSQL',
    slug: 'postgresql',
    color: '4169E1',
    category: 'Backend & Database',
    projectContext: 'PT Lautan Kencana Hidup (SaaS Intranet) & IT Help Desk',
    description: 'Primary relational database for financial transactions, multi-stage inventory staging, and indexed ledger storage.',
  },
  {
    name: 'Laravel',
    slug: 'laravel',
    color: 'FF2D20',
    category: 'Backend & Database',
    projectContext: 'PT IMIP E-Recruitment Portal & IT Help Desk Monolith',
    description: 'Enterprise MVC framework powering applicant tracking pipelines, RBAC authorization middleware, and reactive Livewire search.',
  },
  {
    name: 'PHP',
    slug: 'php',
    color: '777BB4',
    category: 'Backend & Database',
    projectContext: 'PT IMIP E-Recruitment & IT Help Desk',
    description: 'Server-side scripting engine for resilient monolithic architecture and structured relational database transactions.',
  },
  {
    name: 'MySQL',
    slug: 'mysql',
    color: '4479A1',
    category: 'Backend & Database',
    projectContext: 'PT IMIP E-Recruitment Portal',
    description: 'High-capacity relational data store handling thousands of candidate registrations, file validation, and indexing.',
  },
  {
    name: 'SQLAlchemy',
    slug: 'sqlalchemy',
    color: 'D71F00',
    category: 'Backend & Database',
    projectContext: 'PT Lautan Kencana Hidup',
    description: 'Enterprise Python ORM for atomic transactions, Work Order lifecycles, and inventory state transitions.',
  },
  {
    name: 'SQLite',
    slug: 'sqlite',
    color: '003B57',
    category: 'Backend & Database',
    projectContext: 'Windbreaker AI & Telegram OCR Bot',
    description: 'Lightweight embedded database with Docker Volume persistence and low-latency task queue state caching.',
  },

  // Frontend & Web
  {
    name: 'React 18',
    slug: 'react',
    color: '61DAFB',
    category: 'Frontend & Web',
    projectContext: 'PT Lautan Kencana Hidup, Windbreaker AI, Portfolio Islands',
    description: 'Modern component-driven UI library leveraging concurrent rendering, custom hooks, and modular UI architectures.',
  },
  {
    name: 'TypeScript',
    slug: 'typescript',
    color: '3178C6',
    category: 'Frontend & Web',
    projectContext: 'PT LKH, Windbreaker AI, Portfolio SSG',
    description: 'Strict type safety ensuring robust API contract validation, predictable state flows, and runtime error prevention.',
  },
  {
    name: 'Astro SSG',
    slug: 'astro',
    color: 'BC52EE',
    category: 'Frontend & Web',
    projectContext: 'AXL_OS Portfolio SSG Architecture',
    description: 'Content-first Static Site Generation engine outputting zero-JS HTML by default with selective client hydration islands.',
  },
  {
    name: 'Tailwind CSS',
    slug: 'tailwindcss',
    color: '06B6D4',
    category: 'Frontend & Web',
    projectContext: 'Across all web applications & enterprise dashboards',
    description: 'Utility-first styling system used for strict design-token implementations, high-contrast states, and responsive viewports.',
  },
  {
    name: 'Vite',
    slug: 'vite',
    color: '646CFF',
    category: 'Frontend & Web',
    projectContext: 'PT LKH & Portfolio Build Tooling',
    description: 'Modern frontend bundler enabling instant Hot Module Replacement (HMR) and optimized Rollup production asset chunking.',
  },
  {
    name: 'TanStack Query',
    slug: 'reactquery',
    color: 'FF4154',
    category: 'Frontend & Web',
    projectContext: 'PT Lautan Kencana Hidup (SaaS Intranet)',
    description: 'Declarative asynchronous server-state management library handling optimistic updates, caching, and automatic refetching.',
  },
  {
    name: 'Zustand',
    slug: 'zustand',
    color: '443E38',
    category: 'Frontend & Web',
    projectContext: 'PT Lautan Kencana Hidup',
    description: 'Minimalistic un-opinionated state store utilizing atomic selectors to eliminate unnecessary React re-renders.',
  },
  {
    name: 'Livewire',
    slug: 'livewire',
    color: 'FB70A9',
    category: 'Frontend & Web',
    projectContext: 'PT IMIP E-Recruitment Portal',
    description: 'Full-stack framework for Laravel enabling dynamic real-time DOM diffing and instant search without custom JavaScript APIs.',
  },

  // AI/ML & Vision
  {
    name: 'PyTorch',
    slug: 'pytorch',
    color: 'EE4C2C',
    category: 'AI/ML & Vision',
    projectContext: 'IEEE YESIST12 Tuberculosis Comparative Research',
    description: 'Deep learning framework used to fine-tune Vision Transformers, construct Hybrid CNN architectures, and run GPU model inference.',
  },
  {
    name: 'Vision Transformers',
    slug: 'huggingface',
    color: 'FFD21E',
    category: 'AI/ML & Vision',
    projectContext: 'IEEE YESIST12 Medical AI Research',
    description: 'Self-attention based neural network architectures (Swin Transformer & Data-efficient Image Transformers) for medical image classification.',
  },
  {
    name: 'Swin-T & DeiT',
    slug: 'transformers',
    color: '8A2BE2',
    category: 'AI/ML & Vision',
    projectContext: 'IEEE YESIST12 TB Research',
    description: 'Shifted-window hierarchical ViT and distillation token models evaluated against benchmark chest radiography datasets.',
  },
  {
    name: 'OpenCV',
    slug: 'opencv',
    color: '5C3EE8',
    category: 'AI/ML & Vision',
    projectContext: 'IEEE Research (Heatmaps) & Telegram OCR Bot',
    description: 'Computer vision library for adaptive image preprocessing, morphological filtering, and Grad-CAM activation heatmap blending.',
  },
  {
    name: 'Tesseract OCR',
    slug: 'tesseract',
    color: '4285F4',
    category: 'AI/ML & Vision',
    projectContext: 'Telegram Logistics Intelligence Bot',
    description: 'Optical Character Recognition engine configured with custom page segmentation modes (PSM) for automated document ingestion.',
  },
  {
    name: 'XGBoost',
    slug: 'xgboost',
    color: '159957',
    category: 'AI/ML & Vision',
    projectContext: 'Windbreaker AI Telemetry Predictor',
    description: 'Gradient boosted decision tree algorithm trained on tabular flight delay metrics with hyperparameter tuning.',
  },
  {
    name: 'Grad-CAM',
    slug: 'gradcam',
    color: 'E91E63',
    category: 'AI/ML & Vision',
    projectContext: 'IEEE YESIST12 Tuberculosis Study',
    description: 'Gradient-weighted Class Activation Mapping for visual explanations of CNN & ViT decisions, providing clinical interpretability.',
  },
  {
    name: 'Pandas & NumPy',
    slug: 'pandas',
    color: '150458',
    category: 'AI/ML & Vision',
    projectContext: 'Across all machine learning data preparation pipelines',
    description: 'High-performance vector computation and data wrangling libraries for telemetry normalization and clinical dataset cleaning.',
  },

  // DevOps & Tools
  {
    name: 'Docker',
    slug: 'docker',
    color: '2496ED',
    category: 'DevOps & Tools',
    projectContext: 'PT LKH (Compose), Windbreaker AI, Telegram Bot',
    description: 'Multi-stage containerization packaging FastAPI backends, React applications, and PostgreSQL databases for reproducible deployment.',
  },
  {
    name: 'Git & GitHub',
    slug: 'github',
    color: '181717',
    category: 'DevOps & Tools',
    projectContext: 'Version control across all software engineering projects',
    description: 'Systematic branch management, semantic commit conventions, pull request code reviews, and automated CI/CD pipeline triggers.',
  },
  {
    name: 'Postman',
    slug: 'postman',
    color: 'FF6C37',
    category: 'DevOps & Tools',
    projectContext: 'API validation for PT LKH & Windbreaker AI',
    description: 'REST API endpoint testing, automated request collections, and Bearer token environment variable mocking.',
  },
  {
    name: 'Linux / Bash',
    slug: 'gnubash',
    color: '4EAA25',
    category: 'DevOps & Tools',
    projectContext: 'Production server operations and automated scripts',
    description: 'POSIX shell scripting, automated Cron tasks, service process supervision with systemd, and server telemetry inspection.',
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'lkh',
    company: 'PT Lautan Kencana Hidup',
    role: 'Full-Stack Engineer (Intern)',
    date: '2026 - Present',
    description: 'Architected and developed an enterprise SaaS intranet platform featuring Two-Stage Inventory Management, automated Work Orders, and an anti-fraud cryptographic audit trail using SHA-256 hash chaining to guarantee transaction integrity.',
    tags: ['Enterprise SaaS', 'FastAPI', 'PostgreSQL', 'React 18', 'Zustand', 'TanStack Query', 'SHA-256 Ledger'],
  },
  {
    id: 'ieee',
    company: 'IEEE YESIST12 — Medical AI Research',
    role: 'AI / Deep Learning Researcher',
    date: '2026',
    description: 'Conducted comparative clinical AI research on pulmonary Tuberculosis detection evaluating Vision Transformers (Swin-T & DeiT) against Hybrid CNNs. Achieved 97.0% classification accuracy and F1-Score with 100% recall on healthy cases, augmented with Grad-CAM activation heatmaps for physician explainability.',
    tags: ['PyTorch', 'Vision Transformers', 'Swin Transformer', 'DeiT', 'Hybrid CNN', 'Grad-CAM', 'Medical AI'],
  },
  {
    id: 'imip',
    company: 'PT Indonesia Morowali Industrial Park (IMIP)',
    role: 'Full-Stack Software Developer (Intern)',
    date: '2025 - 2026',
    description: 'Engineered a high-throughput corporate E-Recruitment portal handling thousands of concurrent applicants with automated document validation workflows, granular multi-tier RBAC security, and interactive candidate search.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Livewire AI Search', 'SCSS', 'Bootstrap', 'RBAC Security'],
  },
  {
    id: 'umn',
    company: 'Universitas Multimedia Nusantara',
    role: 'B.S. in Information Systems (GPA 3.78 / 4.00)',
    date: '2022 - 2026',
    description: 'Graduated with high distinction specializing in scalable software engineering, distributed database design, and applied machine learning. Engineered multiple production systems including Intelligent IT Help Desk (40% duplicate ticket reduction), Telegram OCR Bot, and Windbreaker AI.',
    tags: ['Academic', 'GPA 3.78', 'Software Engineering', 'Applied AI', 'Data Architecture'],
  },
];

/**
 * Reconciled metadata from RetroProjectsDossier to enrich Markdown collections.
 */
interface DossierReconciliationMeta {
  type: string;
  badge: string;
  metrics: string[];
  featuredOrder: number;
  displayName?: string;
}

const DOSSIER_META: Record<string, DossierReconciliationMeta> = {
  'tb-detection-comparative-study': {
    type: 'AI Research',
    badge: '97% Accuracy',
    metrics: ['Hybrid CNN', 'Grad-CAM', 'Medical AI'],
    featuredOrder: 1,
    displayName: 'IEEE YESIST12 TB Detection',
  },
  'lkh-internal-platform': {
    type: 'Enterprise SaaS',
    badge: 'Production',
    metrics: ['Two-Stage Inventory', 'RBAC Security', 'SHA-256 Ledger'],
    featuredOrder: 2,
    displayName: 'PT LKH Enterprise Platform',
  },
  'imip-recruitment': {
    type: 'Web Portal',
    badge: 'High Traffic',
    metrics: ['Thousands of Applicants', 'Multi-Tier RBAC', 'Live Search'],
    featuredOrder: 3,
    displayName: 'IMIP E-Recruitment Portal',
  },
  'windbreaker-ai': {
    type: 'ML Platform',
    badge: 'Predictive ML',
    metrics: ['XGBoost Models', 'Stateless JWT', 'Real-time Telemetry'],
    featuredOrder: 4,
    displayName: 'Windbreaker AI Telemetry',
  },
  'optical-intel-ocr': {
    type: 'Automation Bot',
    badge: 'Computer Vision',
    metrics: ['Automated Extraction', 'OCR Pipeline', 'Telegram API'],
    featuredOrder: 5,
    displayName: 'Telegram OCR Intelligence Bot',
  },
  'help-desk-ai': {
    type: 'Internal Tool',
    badge: '-40% Duplicates',
    metrics: ['40% Duplicate Reduction', 'SLA Tracking', 'Role Management'],
    featuredOrder: 6,
    displayName: 'Intelligent IT Help Desk',
  },
  'field-service-pro': {
    type: 'Operations App',
    badge: 'Audit Trail',
    metrics: ['Real-time Dispatch', 'Parts Tracking', 'Digital Reports'],
    featuredOrder: 7,
    displayName: 'Field Service Logistics Pro',
  },
  'personal-developer-portfolio': {
    type: 'Portfolio Architecture',
    badge: 'Zero-JS SSG',
    metrics: ['Astro SSG', 'React Islands', 'Keystatic CMS'],
    featuredOrder: 8,
    displayName: 'Personal Developer Portfolio',
  },
};

/**
 * Pure function to normalize a project entry from raw markdown frontmatter.
 */
export function normalizeProjectSummary(raw: any, slug: string): ProjectSummary {
  const meta = DOSSIER_META[slug] || {
    type: 'Software Project',
    badge: 'Verified',
    metrics: raw.tags || [],
    featuredOrder: 99,
  };

  const title = String(raw.title || slug);
  const excerpt = String(raw.excerpt || raw.summary || '');
  const tags: string[] = Array.isArray(raw.tags) ? raw.tags : [];
  const gallery: string[] = Array.isArray(raw.gallery) ? raw.gallery : [];
  const githubUrl = String(raw.githubUrl || 'https://github.com/Crazyrenan');
  const coverImage = raw.coverImage ? String(raw.coverImage) : undefined;
  const dateStr = raw.date ? (typeof raw.date === 'string' ? raw.date : raw.date instanceof Date ? raw.date.toISOString().split('T')[0] : String(raw.date)) : undefined;

  return {
    id: slug,
    slug,
    title,
    name: meta.displayName || title,
    type: meta.type,
    badge: meta.badge,
    summary: excerpt,
    excerpt,
    tags,
    tech: tags,
    date: dateStr,
    coverImage,
    gallery,
    githubUrl,
    metrics: meta.metrics,
    featuredOrder: meta.featuredOrder,
  };
}
