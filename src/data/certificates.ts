export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'Data & Analytics' | 'Database' | 'DevOps & Tools';
  image: string;
  credentialUrl: string;
  skills: string[];
  description: string;
}

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 'pasas-data-vis',
    title: 'Certified International Specialist in Data Visualization',
    issuer: 'PASAS Institute, Singapore',
    date: 'Okt 2025',
    category: 'Data & Analytics',
    image: '/certificates/1760059600175.jpg',
    credentialUrl: '/certificates/1760059600175.jpg',
    skills: ['Data Visualization', 'Analytics', 'PASAS Institute', 'BI'],
    description: 'Sertifikasi spesialis internasional dalam visualisasi data analitik dan business intelligence oleh PASAS Institute Singapore (No. CISDV15364).'
  },
  {
    id: 'datacamp-github',
    title: 'GitHub Foundations',
    issuer: 'DataCamp',
    date: 'Agu 2026',
    category: 'DevOps & Tools',
    image: '/certificates/1787658358929.jpg',
    credentialUrl: '/certificates/1787658358929.jpg',
    skills: ['Git', 'GitHub', 'Version Control', 'CI/CD'],
    description: 'Sertifikasi kompetensi pengelolaan version control sistematis, branch workflows, pull request, dan kolaborasi repositori modern di GitHub.'
  },
  {
    id: 'dqlab-sql-join-union',
    title: 'Fundamental SQL Using INNER JOIN & UNION',
    issuer: 'DQLab / Xeratic / UMN',
    date: 'Feb 2023',
    category: 'Database',
    image: '/certificates/1730380705507.jpg',
    credentialUrl: '/certificates/1730380705507.jpg',
    skills: ['SQL', 'INNER JOIN', 'UNION', 'Relational DB'],
    description: 'Penguasaan manipulasi data relasional tingkat lanjut, penggabungan multi-tabel, dan agregasi data tabular menggunakan SQL.'
  },
  {
    id: 'dqlab-sql-function-groupby',
    title: 'Fundamental SQL Using FUNCTION & GROUP BY',
    issuer: 'DQLab / Xeratic / UMN',
    date: 'Feb 2023',
    category: 'Database',
    image: '/certificates/1730380488871.jpg',
    credentialUrl: '/certificates/1730380488871.jpg',
    skills: ['SQL', 'Aggregate Functions', 'GROUP BY', 'Analytics'],
    description: 'Pemrosesan agregasi data analitik, fungsi skalar dan matematis, serta pengelompokan subset data untuk pelaporan terstruktur.'
  },
  {
    id: 'dqlab-sql-select',
    title: 'Fundamental SQL Using SELECT Statement',
    issuer: 'DQLab / Xeratic / UMN',
    date: 'Feb 2023',
    category: 'Database',
    image: '/certificates/1730380612803.jpg',
    credentialUrl: '/certificates/1730380612803.jpg',
    skills: ['SQL', 'Data Querying', 'SELECT Filtering'],
    description: 'Fondasi ekstraksi data tabular, penyaringan kondisi WHERE, pengurutan ORDER BY, dan manipulasi query dasar basis data relasional.'
  },
  {
    id: 'dqlab-r-stats',
    title: 'Statistics using R for Data Science',
    issuer: 'DQLab / Xeratic / UMN',
    date: 'Feb 2023',
    category: 'Data & Analytics',
    image: '/certificates/1730379995242.jpg',
    credentialUrl: '/certificates/1730379995242.jpg',
    skills: ['R Language', 'Statistics', 'Data Science', 'Data Analysis'],
    description: 'Penerapan metodologi statistika deskriptif, uji distribusi probabilitas, dan komputasi analitik data sains menggunakan bahasa pemrograman R.'
  }
];
