import React, { useState } from 'react';
import { RetroWindow } from './RetroWindow';

interface ProjectDoc {
  id: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    techStack: string[];
  };
  metrics: string;
  docs: {
    name: string;
    content: string;
  }[];
}

const PROJECTS_LIST: ProjectDoc[] = [
  {
    id: 'lkh-intranet-saas',
    title: '1. PT Lautan Kencana Hidup: Enterprise Operations & Field Service Portal',
    category: 'Enterprise SaaS & Logistics',
    summary: 'Platform intranet SaaS enterprise terpusat untuk otomatisasi siklus operasional, Work Orders, Two-Stage Inventory Management, dan audit trail berbasis Cryptographic Blockchain Ledger (SHA-256).',
    problem: 'Menghilangkan kecurangan (fraud) pada mutasi inventaris suku cadang, menyinkronkan selisih stok fisik (staging) dengan katalog komersial (production), dan menyediakan jejak audit forensik anti-manipulasi.',
    architecture: {
      frontend: 'React 18, TypeScript (strict typing), Vite, Tailwind CSS, Zustand, TanStack Query v5, React Router DOM (RoleGuard)',
      backend: 'Python 3.11+, FastAPI, SQLAlchemy ORM, Pydantic v2, SlowAPI, SHA-256 Cryptographic Ledger Engine',
      database: 'PostgreSQL (transaksi multi-gudang dan ledger storage berindeks)',
      techStack: ['React 18', 'TypeScript', 'FastAPI', 'Python 3.11+', 'PostgreSQL', 'SQLAlchemy', 'Zustand', 'TanStack Query v5', 'SHA-256 Ledger']
    },
    metrics: 'Integrasi mutasi inventaris zero-discrepancy & Cryptographic Blockchain Ledger (SHA-256 hash-chaining) terverifikasi.',
    docs: [
      {
        name: 'ARCH_OVERVIEW.TXT',
        content: `================================================================================
PT LAUTAN KENCANA HIDUP — SYSTEM ARCHITECTURE OVERVIEW
================================================================================
1. TWO-STAGE INVENTORY PIPELINE:
   - Inbound Staging Buffer: Seluruh pengiriman suku cadang masuk ke staging area 
     ('inventory') sebelum disetujui untuk rilis ke katalog publik.
   - Production Catalog: Hanya barang terverifikasi yang dipetakan ke 'product_catalogs'.

2. WORK ORDER DISPATCH & CONSUMPTION:
   - Teknisi lapangan mencatat konsumsi material secara real-time via mobile-friendly view.
   - Pengurangan stok barang dan penyelesaian tugas dieksekusi dalam transaksi atomik.`
      },
      {
        name: 'BLOCKCHAIN_LEDGER.TXT',
        content: `================================================================================
CRYPTOGRAPHIC BLOCKCHAIN LEDGER SPECIFICATION (SHA-256)
================================================================================
- Engine: Event-driven SHA-256 Hash-Chaining
- Struktur Blok:
  * Block ID / Index
  * Timestamp (UTC)
  * Transaction Payload: { work_order_id, item_sku, qty_delta, operator_id }
  * Previous Block Hash (SHA-256)
  * Current Block Hash = SHA-256(Block_Index + Timestamp + Payload + Prev_Hash)
- Forensic Integrity: Setiap perubahan histori masa lalu merusak validitas rantai blok secara instan.`
      },
      {
        name: 'RBAC_SPEC.TXT',
        content: `================================================================================
ROLE-BASED ACCESS CONTROL (RBAC) MATRIX
================================================================================
- Super-Admin: Otoritas penuh konfigurasi ledger, master katalog, dan audit log.
- Warehouse Supervisor: Otorisasi penerimaan staging barang dan approval purchase request.
- Field Technician: Akses single-pane Work Order, input kode kerusakan, dan konsumsi suku cadang.
- Marketing/Sales: Pemantauan ketersediaan unit aktif dan reservasi pesanan klien.`
      }
    ]
  },
  {
    id: 'windbreaker-ai',
    title: '2. Windbreaker AI: Flight Delay & Dynamic Price Intelligence',
    category: 'Aviation Telemetry & AI',
    summary: 'Platform analitik aviasi real-time berbasis Machine Learning untuk estimasi keterlambatan penerbangan dan dinamika harga tiket pesawat.',
    problem: 'Mengatasi ketidakpastian operasional jadwal penerbangan dan volatilitas harga tiket pesawat bagi analis serta pengguna komersial melalui estimasi berbasis telemetri.',
    architecture: {
      frontend: 'React, Vite, TypeScript, Tailwind CSS, GSAP counters, Lucide Icons',
      backend: 'Python, FastAPI, Uvicorn, Pydantic, stateless JWT authentication',
      database: 'SQLite (windbreaker_users.db) dengan Docker Volume persistence & IP audit logging',
      techStack: ['Python', 'FastAPI', 'React', 'TypeScript', 'XGBoost', 'Scikit-Learn', 'Docker', 'GSAP', 'JWT']
    },
    metrics: 'Inferensi real-time dengan model terpisah: xgb_flight_delay.pkl (akurasi delay) & xgb_price.pkl (estimasi tarif).',
    docs: [
      {
        name: 'TELEMETRY_PIPELINE.TXT',
        content: `================================================================================
WINDBREAKER AI — AVIATION TELEMETRY DATA PIPELINE
================================================================================
1. Feature Extraction:
   - Temporal encoding (sin/cos representation untuk jam & hari penerbangan).
   - Route congestion index & weather metric aggregation.
   - Distance matrix & carrier historical reliability index.

2. Real-Time Inference:
   - REST API endpoint menerima parameter rute dan mengembalikan skor probabilitas delay dalam waktu < 45ms.`
      },
      {
        name: 'XGBOOST_MODELS.TXT',
        content: `================================================================================
MACHINE LEARNING ARTIFACTS SPECIFICATION
================================================================================
- Model 1: 'xgb_flight_delay.pkl'
  * Classifier Gradient Boosting untuk klasifikasi biner status On-Time vs Delayed (>15 menit).
- Model 2: 'xgb_price.pkl'
  * Regressor Gradient Boosting untuk estimasi interval harga wajar tiket berdasarkan ketersediaan kursi.`
      },
      {
        name: 'DOCKER_PERSISTENCE.TXT',
        content: `================================================================================
DOCKER VOLUME & SECURITY ARCHITECTURE
================================================================================
- Container Runtime: Uvicorn ASGI workers di dalam isolated Alpine Linux container.
- Storage Persistence: Docker Named Volume yang dipetakan ke '/app/data' untuk SQLite database.
- Auth: Stateless JWT dengan masa berlaku terkonfigurasi dan IP-based rate limiting.`
      }
    ]
  },
  {
    id: 'tb-detection-ieee',
    title: '3. Riset AI Medis: Deteksi Tuberkulosis (IEEE YESIST12)',
    category: 'Deep Learning Medical Research',
    summary: 'Studi komparatif arsitektur Hybrid CNN (DenseNet-EfficientNetV2-B3) versus Vision Transformers (Swin & DeiT) pada citra Chest X-Ray TBX11K.',
    problem: 'Membantu radiolog melakukan skrining awal Tuberkulosis secara cepat, akurat, dan transparan guna menekan laju transmisi patologi klinis.',
    architecture: {
      frontend: 'Dasbor visualisasi peta atensi Grad-CAM untuk interpretabilitas klinis',
      backend: 'PyTorch, Torchvision, Vision Transformers, OpenCV, Scikit-Learn, Pandas',
      database: 'Dataset TBX11K (750 Train / 150 Test seimbang tanpa augmentasi)',
      techStack: ['PyTorch', 'DenseNet', 'EfficientNetV2-B3', 'Swin Transformer', 'DeiT', 'OpenCV', 'Grad-CAM', 'Computer Vision']
    },
    metrics: '97.0% Overall Accuracy & F1-Score, 100% Recall pada kelas Healthy, dipresentasikan pada forum IEEE YESIST12.',
    docs: [
      {
        name: 'RESEARCH_METRICS.TXT',
        content: `================================================================================
IEEE YESIST12 — CLASSIFICATION BENCHMARK RESULTS
================================================================================
- Overall Accuracy: 97.0%
- Overall F1-Score: 97.0%
- Per-Class Performance:
  * Healthy: 100.0% Recall (Swin Transformer) — Eliminasi false-positive skrining awal.
  * Tuberculosis (TB): 98.0% Recall (Swin & DeiT) — Sensitivitas tinggi deteksi dini.
  * Sick (Non-TB): 98.0% Recall (Hybrid CNN) — Keunggulan ekstraksi fitur tekstur lokal.`
      },
      {
        name: 'GRAD_CAM_EXPLAINABILITY.TXT',
        content: `================================================================================
GRADIENT-WEIGHTED CLASS ACTIVATION MAPPING (GRAD-CAM)
================================================================================
- Mekanisme: Menghitung gradien kelas target terhadap layer konvolusi terakhir.
- Validasi Klinis: Peta panas (heat-map) membuktikan bahwa fokus inferensi model 
  terkonsentrasi tepat pada infiltrat parenkim paru-paru dan kavitas, bukan noise background.`
      },
      {
        name: 'HYBRID_CNN_VS_SWIN.TXT',
        content: `================================================================================
ARCHITECTURAL COMPARISON: CNN VS VISION TRANSFORMERS
================================================================================
- Hybrid CNN (DenseNet-EfficientNetV2-B3):
  * Keunggulan: Ekstraksi fitur lokal resolusi tinggi dengan parameter kompak.
- Swin Transformer:
  * Keunggulan: Hierarchical Shifted Window Attention menangkap korelasi jarak jauh antar-lobus paru.`
      }
    ]
  },
  {
    id: 'imip-recruitment',
    title: '4. PT IMIP: E-Recruitment Corporate Portal',
    category: 'Corporate E-Recruitment Portal',
    summary: 'Sistem rekrutmen terpusat skala enterprise untuk verifikasi berkas massal kandidat dengan integrasi pencarian cerdas AI Search Livewire.',
    problem: 'Mengotomatisasi verifikasi berkas ribuan pelamar kerja dan mereduksi bottleneck administrasi manual pada tim HR kawasan industri.',
    architecture: {
      frontend: 'Laravel Blade Templates, SCSS, Bootstrap, Figma UI/UX tokenization',
      backend: 'Laravel (PHP), validasi dokumen massal, arsitektur RBAC bertingkat',
      database: 'MySQL (relational schema berindeks untuk data puluhan ribu pelamar)',
      techStack: ['Laravel', 'PHP', 'MySQL', 'Livewire AI Search', 'SCSS', 'Bootstrap', 'Figma', 'RBAC']
    },
    metrics: 'Pencarian kandidat instan berbasis AI Search Livewire dan manajemen seleksi multi-tahap.',
    docs: [
      {
        name: 'RECRUITMENT_FLOW.TXT',
        content: `================================================================================
E-RECRUITMENT CANDIDATE PIPELINE FLOW
================================================================================
1. Registrasi & Unggah Dokumen Kependudukan/Ijazah
2. Automated Document Validation Stage (Pengecekan kelengkapan format & ukuran berkas)
3. Technical & Psychometric Test Scheduling
4. HR & Department Interview Evaluation Console
5. Pengumuman Kelulusan & Onboarding Tracking`
      },
      {
        name: 'AI_SEARCH_LIVEWIRE.TXT',
        content: `================================================================================
REACTIVE AI CANDIDATE SEARCH (LIVEWIRE)
================================================================================
- Implementasi: 'app/Livewire/AiSearch.php'
- Fitur: Penyaringan kandidat instan multi-kriteria (kompetensi teknis, jurusan, pengalaman kerja)
  secara asinkron tanpa reload halaman untuk mempercepat seleksi HR.`
      },
      {
        name: 'RBAC_HIERARCHY.TXT',
        content: `================================================================================
ROLE-BASED ACCESS CONTROL (RBAC)
================================================================================
- Administrator: Konfigurasi kuota lowongan, master departemen, dan audit pengguna.
- HR Officer: Evaluasi berkas, penjadwalan interview, dan input nilai seleksi.
- Job Applicant: Dashboard pelacakan status lamaran dan notifikasi tahapan seleksi.`
      }
    ]
  },
  {
    id: 'it-helpdesk',
    title: '5. Intelligent IT Help Desk: Semantic Search & De-duplication',
    category: 'NLP & Enterprise Service',
    summary: 'Arsitektur hybrid monolith + microservice untuk deteksi duplikasi keluhan tiket internal secara otomatis menggunakan semantic vector embeddings.',
    problem: 'Mencegah penumpukan dan duplikasi tiket laporan teknis IT Support yang menyebabkan inefisiensi alokasi engineer.',
    architecture: {
      frontend: 'Laravel Blade / Tailwind CSS responsive client',
      backend: 'Laravel (PHP) transactional monolith + Python/Flask microservice via REST API',
      database: 'MySQL / PostgreSQL (penyimpanan tiket relasional & knowledge base)',
      techStack: ['Laravel', 'Python', 'Flask', 'Hugging Face', 'Semantic Embeddings', 'REST API', 'MySQL']
    },
    metrics: 'Reduksi 40% tiket terduplikasi sebelum tiket resmi masuk ke antrean tim IT Support.',
    docs: [
      {
        name: 'SEMANTIC_PIPELINE.TXT',
        content: `================================================================================
NLP EMBEDDING & SIMILARITY PIPELINE
================================================================================
1. User memasukkan deskripsi kendala teknis pada form tiket baru.
2. Teks dikirim secara asinkron ke microservice Python/Flask.
3. Model Hugging Face menghasilkan representasi vektor semantik teks (dense embedding).
4. Komputasi Cosine Similarity membandingkan embedding tiket dengan arsip knowledge base.`
      },
      {
        name: 'DEDUPLICATION_40PCT.TXT',
        content: `================================================================================
TICKET DEDUPLICATION RESULTS (40% REDUCTION)
================================================================================
- Jika skor kesamaan semantik > 0.85, sistem menyajikan solusi instan ke pengguna.
- Menghilangkan 40% penerbitan tiket yang telah memiliki panduan solusi terverifikasi.
- Menurunkan First Response Time (FRT) tim IT Support secara signifikan.`
      },
      {
        name: 'HYBRID_MICROSERVICE.TXT',
        content: `================================================================================
HYBRID ARCHITECTURE: MONOLITH + MICROSERVICE
================================================================================
- Laravel: Mengelola sesi autentikasi, antrean tiket, dashboard administrasi, dan database transaksi.
- Flask Microservice: Layanan independen komputasi NLP berlatensi rendah dengan caching model.`
      }
    ]
  },
  {
    id: 'telegram-ocr',
    title: '6. Telegram OCR Logistics & Purchasing System',
    category: 'Automation & Computer Vision',
    summary: 'Sistem digitalisasi nota dan invoice fisik lapangan secara instan ke database terpusat melalui bot percakapan Telegram.',
    problem: 'Mempercepat pencatatan kuitansi dan nota belanja operasional lapangan tanpa input data manual berulang yang rawan kesalahan.',
    architecture: {
      frontend: 'Web Admin Dashboard transaksi logistik & verifikasi berkas',
      backend: 'Python / PHP, Telegram Bot API, Task Scheduler',
      database: 'Relational Database Engine (SQLite / MySQL)',
      techStack: ['Python', 'PHP', 'Telegram Bot API', 'OpenCV', 'Tesseract OCR', 'Task Scheduler', 'SQLite']
    },
    metrics: 'Ekstraksi otomatis teks nominal, nomor nota, dan tanggal belanja via bot percakapan Telegram.',
    docs: [
      {
        name: 'VISION_PIPELINE.TXT',
        content: `================================================================================
OPENCV IMAGE PRE-PROCESSING PIPELINE
================================================================================
1. Image Ingestion via Telegram webhook.
2. Grayscale conversion & Gaussian Blur de-noising.
3. Adaptive Thresholding & morphological operations untuk memperjelas kontras teks nota.
4. Perspective transformation / skew correction pada dokumen miring.`
      },
      {
        name: 'TASK_SCHEDULER.TXT',
        content: `================================================================================
AUTOMATED TASK SCHEDULING & DATA SYNC
================================================================================
- Menjalankan antrean pemrosesan dokumen secara teratur tanpa membebani server utama.
- Menghasilkan laporan situasi harian (Daily Briefing) otomatis ke kanal Telegram manajemen.`
      },
      {
        name: 'OCR_ACCURACY.TXT',
        content: `================================================================================
TESSERACT OCR CONFIGURATION
================================================================================
- Mode: Page Segmentation Mode (PSM) 6 & White-list character formatting.
- Output: Format JSON terstruktur { vendor_name, date, invoice_no, total_amount, items[] }.`
      }
    ]
  },
  {
    id: 'portfolio-platform',
    title: '7. Personal Developer Portfolio Platform',
    category: 'Modern Web & Performance',
    summary: 'Platform portofolio developer modern berbasis Static Site Generation (SSG), React Islands, Three.js 3D Canvas, dan Keystatic Git-based CMS.',
    problem: 'Menyajikan rekayasa sistem perangkat lunak dan riset AI secara terstruktur, interaktif, dan berkinerja tinggi tanpa dependensi database eksternal.',
    architecture: {
      frontend: 'Astro SSG, React 18 (.tsx islands), Tailwind CSS, Three.js, GSAP, Framer Motion',
      backend: 'Keystatic CMS (Git-based flat-file Markdown/MDX content collections)',
      database: 'Local Git filesystem / Flat-file content collections',
      techStack: ['Astro SSG', 'React 18', 'TypeScript', 'Tailwind CSS', 'Three.js', 'GSAP', 'Keystatic CMS']
    },
    metrics: 'Zero runtime layout shift, 60 FPS visual rendering, dan isolasi hidrasi parsial efisien.',
    docs: [
      {
        name: 'SSG_ISLANDS.TXT',
        content: `================================================================================
ASTRO STATIC SITE GENERATION & ISLANDS
================================================================================
- Pure Static HTML: Bagian konten statis dirender tanpa menyertakan bundle JavaScript client.
- Partial Hydration: Komponen interaktif (RetroSkillsGrid, RetroProjectsDossier, RetroTerminal) 
  diberikan direktif 'client:visible' untuk memuat JavaScript saat elemen memasuki viewport.`
      },
      {
        name: 'KEYSTATIC_CMS.TXT',
        content: `================================================================================
KEYSTATIC GIT-BASED CONTENT MANAGEMENT
================================================================================
- Local filesystem storage: Mengelola artikel dan profil proyek tanpa server database terpisah.
- Type-Safe Schema: Skema data terdefinisi ketat via 'keystatic.config.js' dan Astro Content Collections.`
      },
      {
        name: 'THREEJS_WEBGL.TXT',
        content: `================================================================================
WEBGL & GSAP PERFORMANCE TUNING
================================================================================
- WebGL Context Optimization: Penggunaan Three.js & Framer Motion yang diakselerasi GPU.
- Graceful Degradation: Dukungan 'prefers-reduced-motion' otomatis untuk aksesibilitas.`
      }
    ]
  }
];

export function RetroProjectsDossier() {
  const [activeProject, setActiveProject] = useState<ProjectDoc>(PROJECTS_LIST[0]);
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'architecture' | 'docs'>('overview');
  const [selectedDocIndex, setSelectedDocIndex] = useState<number>(0);

  return (
    <section className="w-full max-w-4xl mx-auto p-4 mb-8">
      <RetroWindow title="C:\EXPLORER\Project_Explorer.exe" hasMenu={true}>
        <div className="bg-[#C0C0C0] p-2 flex flex-col gap-2 font-[Tahoma,sans-serif] text-black">
          
          {/* Address Bar */}
          <div className="flex items-center gap-2 bg-[#D4D0C8] p-1 win95-sunken text-xs font-mono">
            <span className="text-gray-700 font-bold select-none">Address:</span>
            <span className="bg-white px-2 py-0.5 border border-[#808080] flex-1 text-[11px] truncate text-[#000080] font-semibold">
              C:\Projects\{activeProject.id}\docs\
            </span>
          </div>

          {/* Main Explorer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 min-h-[440px]">
            
            {/* Left Panel: Project Directory (4 cols) */}
            <div className="md:col-span-4 win95-sunken bg-white p-1 overflow-y-auto max-h-[440px]">
              <div className="text-[11px] font-bold text-[#000080] px-2 py-1 border-b border-gray-300 bg-[#dfdfdf] flex items-center gap-1">
                <span>📁</span> PROJECT DIRECTORY (7)
              </div>
              <div className="space-y-0.5 mt-1">
                {PROJECTS_LIST.map((p) => {
                  const isSelected = activeProject.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActiveProject(p);
                        setSelectedDocIndex(0);
                      }}
                      className={`w-full text-left px-2 py-1.5 text-xs flex items-center gap-1.5 transition-none select-none ${
                        isSelected
                          ? 'bg-[#000080] text-white font-bold'
                          : 'text-black hover:bg-[#D4D0C8]'
                      }`}
                    >
                      <span className="text-sm">📁</span>
                      <span className="truncate text-[11px]">{p.title.split(':')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Panel: Subfolder & Documentation Reader (8 cols) */}
            <div className="md:col-span-8 win95-raised p-2 flex flex-col h-[440px] bg-[#c0c0c0]">
              
              {/* Subfolder Navigation Tabs */}
              <div className="flex gap-1 border-b border-gray-400 pb-1 mb-2 text-xs">
                <button
                  onClick={() => setActiveSubTab('overview')}
                  className={`px-3 py-1 font-bold select-none text-[11px] ${
                    activeSubTab === 'overview'
                      ? 'win95-sunken bg-white text-[#000080]'
                      : 'win95-btn text-black'
                  }`}
                >
                  📄 README.MD
                </button>
                <button
                  onClick={() => setActiveSubTab('architecture')}
                  className={`px-3 py-1 font-bold select-none text-[11px] ${
                    activeSubTab === 'architecture'
                      ? 'win95-sunken bg-white text-[#000080]'
                      : 'win95-btn text-black'
                  }`}
                >
                  ⚙️ ARCHITECTURE.SYS
                </button>
                <button
                  onClick={() => setActiveSubTab('docs')}
                  className={`px-3 py-1 font-bold select-none text-[11px] ${
                    activeSubTab === 'docs'
                      ? 'win95-sunken bg-white text-[#000080]'
                      : 'win95-btn text-black'
                  }`}
                >
                  📂 SUBFOLDER_DOCS/ ({activeProject.docs.length})
                </button>
              </div>

              {/* Tab Contents */}
              <div className="flex-1 win95-sunken bg-white p-3 overflow-y-auto text-xs leading-relaxed text-black">
                
                {/* 1. Overview Tab */}
                {activeSubTab === 'overview' && (
                  <div className="space-y-3">
                    <div className="font-bold text-sm text-[#000080] border-b border-gray-300 pb-1.5">
                      {activeProject.title}
                    </div>
                    
                    <div>
                      <span className="font-bold text-gray-600 text-[10px] uppercase block">Kategori Proyek:</span>
                      <span className="font-semibold text-black">{activeProject.category}</span>
                    </div>

                    <div>
                      <span className="font-bold text-red-700 text-[10px] uppercase block mb-1">Context &amp; Business Problem:</span>
                      <div className="win95-sunken bg-[#f9f9f9] p-2 text-gray-800 text-[11px] leading-relaxed">
                        {activeProject.problem}
                      </div>
                    </div>

                    <div>
                      <span className="font-bold text-green-800 text-[10px] uppercase block mb-1">Solution &amp; Implementation:</span>
                      <p className="text-gray-800 text-[11px] leading-relaxed">
                        {activeProject.summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-200">
                      <span className="font-bold text-[#000080] text-[10px] uppercase block mb-1">Quantitative Outcome / Evidence:</span>
                      <div className="win95-sunken bg-[#fffde7] p-2 text-gray-900 font-semibold text-[11px]">
                        ✓ {activeProject.metrics}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Architecture Tab */}
                {activeSubTab === 'architecture' && (
                  <div className="space-y-3">
                    <div className="font-bold text-xs text-[#000080] border-b border-gray-300 pb-1 flex justify-between items-center">
                      <span>SYSTEM ARCHITECTURE SCHEMATIC</span>
                      <span className="font-mono text-[10px] text-gray-600">[SPEC_V2.0]</span>
                    </div>

                    <div>
                      <span className="font-bold text-black text-[10px] uppercase block">Frontend Architecture:</span>
                      <p className="text-gray-800 text-[11px]">{activeProject.architecture.frontend}</p>
                    </div>

                    <div>
                      <span className="font-bold text-black text-[10px] uppercase block">Backend &amp; Microservices:</span>
                      <p className="text-gray-800 text-[11px]">{activeProject.architecture.backend}</p>
                    </div>

                    <div>
                      <span className="font-bold text-black text-[10px] uppercase block">Database &amp; Data Persistence:</span>
                      <p className="text-gray-800 text-[11px]">{activeProject.architecture.database}</p>
                    </div>

                    <div className="pt-2 border-t border-gray-200">
                      <span className="font-bold text-[#000080] text-[10px] uppercase block mb-1.5">Technical Stack Chips:</span>
                      <div className="flex flex-wrap gap-1">
                        {activeProject.architecture.techStack.map(t => (
                          <span key={t} className="win95-raised px-1.5 py-0.5 text-[10px] font-mono font-bold text-black bg-[#dfdfdf]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Subfolder Docs Tab */}
                {activeSubTab === 'docs' && (
                  <div className="h-full flex flex-col">
                    {/* Document selector buttons */}
                    <div className="flex flex-wrap gap-1 mb-2 pb-2 border-b border-gray-300">
                      {activeProject.docs.map((doc, idx) => (
                        <button
                          key={doc.name}
                          onClick={() => setSelectedDocIndex(idx)}
                          className={`px-2 py-1 text-[10px] font-mono select-none ${
                            selectedDocIndex === idx
                              ? 'win95-sunken bg-[#000080] text-white font-bold'
                              : 'win95-btn text-black'
                          }`}
                        >
                          📄 {doc.name}
                        </button>
                      ))}
                    </div>

                    {/* Document content viewer */}
                    <div className="flex-1 win95-sunken bg-[#fdfcf8] p-2.5 font-mono text-[10.5px] text-gray-900 whitespace-pre-wrap overflow-y-auto leading-relaxed border border-gray-400">
                      {activeProject.docs[selectedDocIndex]?.content}
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>
      </RetroWindow>
    </section>
  );
}