# Plan: Retro Certificate Gallery, Tone of Voice Re-balancing & Full Mobile Responsiveness

> **Task Slug:** `cert-gallery-responsive`  
> **Status:** Draft / Awaiting User Approval  
> **Primary Agents:** `project-planner` (Lead), `frontend-specialist`, `test-engineer`  
> **Target Framework:** Astro 5 (SSG) + React 19 Islands + Tailwind CSS + Framer Motion  

---

## 1. Executive Summary & User Alignment

Berdasarkan sketsa visual yang diberikan oleh user dan hasil konfirmasi melalui Socratic Gate:
1. **Sidebar Galeri Sertifikat (Desktop):** Membangun panel/sidebar kecil yang scrollable di sisi kanan layar desktop (`w-72` / `max-w-xs`), berpenampilan Windows 95/98 (`Cert_Vault.exe` / `win95-raised`). Berisi daftar sertifikat yang dapat di-scroll vertikal, menampilkan thumbnail, nama sertifikat, penerbit, dan tag keahlian.
2. **Perilaku Zoom/Klik (Pilihan A2):** Saat kartu sertifikat diklik, langsung membuka file gambar sertifikat resolusi penuh di tab baru browser (`target="_blank"`), disertai tautan verifikasi kredensial.
3. **Adaptasi Mobile Drawer (Pilihan A1):** Di layar mobile (< 768px / < 1024px), sidebar desktop disembunyikan dan digantikan dengan **Floating Retro Toggle Badge** di sudut kanan layar (ikon `📜 Certs (5)`). Ketika ditekan, muncul *Slide-out Retro Drawer / Sheet* beranimasi mulus dari sisi kanan/bawah yang memuat seluruh kartu sertifikat.
4. **Copywriting & Tone of Voice (Pilihan A3):** Menulis ulang seluruh teks di `DesktopManager`, `PixelHero`, `RetroSkillsGrid`, `RetroTimeline`, dan `RetroTerminal` dari yang tadinya sangat kaku, birokratis, dan tidak wajar ("rekayasa perangkat lunak enterprise", "audit trail anti-fraud cryptographic ledger") menjadi **kasual, conversational, dan ramah ala developer modern** (seperti portfolio personal Silicon Valley / startup tech: lugas, percaya diri, dan mudah dipahami recruiter).
5. **Full Mobile Responsiveness Audit & Fix:** Memperbaiki seluruh bottleneck tampilan mobile pada semua komponen (menghilangkan overflow horizontal, menyesuaikan grid skills, memperbaiki layout avatar di Hero, serta merapikan bottom taskbar agar tidak menumpuk di layar kecil).
6. **Data Awal Sertifikat (Pilihan A4):** Menyediakan struktur data modular `src/data/certificates.ts` dengan 5 sertifikat terverifikasi (IEEE YESIST12 AI Research, Deep Learning & Vision, Full-Stack Enterprise, PostgreSQL Data Architecture, dan Cloud/DevOps) lengkap dengan visual preview retro siap pakai.

---

## 2. Arsitektur Komponen & Alur Data

### 2.1 File & Struktur Baru
* `src/data/certificates.ts`:
  * Data terstruktur berisi `id`, `title`, `issuer`, `date`, `category`, `image`, `credentialUrl`, `skills`.
* `src/components/retro/RetroCertificateGallery.tsx`:
  * Komponen React Island yang menangani dua mode:
    * **Desktop Docked Sidebar:** Tampil di sisi kanan konten `main` sesuai sketsa user (`fixed right-4 top-4 bottom-14 hidden lg:flex flex-col w-72`).
    * **Mobile Floating Badge & Drawer:** Tampil di mobile sebagai tombol floating retro `win95-btn` dengan badge counter, dan membuka modal drawer retro saat di-tap.

### 2.2 File yang Dimodifikasi
* `src/components/retro/DesktopManager.tsx`:
  * Mengintegrasikan `<RetroCertificateGallery />`.
  * Merapikan copywriting pada banner inisial desktop (*"AXL_OS v98.4"*).
  * Menyempurnakan layout wrapper agar responsive terhadap lebar sidebar kanan pada desktop lebar.
* `src/components/retro/PixelHero.tsx`:
  * Menulis ulang teks bio: lebih natural, engaging, dan mengalir santai.
  * Memperbaiki tata letak mobile: avatar dan tools palette agar fleksibel dan tidak pecah pada resolusi 360px - 430px.
* `src/components/retro/RetroSkillsGrid.tsx`:
  * Merapikan grid agar responsif di mobile (1 kolom / 2 kolom proporsional), memperbaiki scroll container agar tidak terpotong.
  * Memperhalus deskripsi driver stack menjadi bahasa yang santai dan to-the-point.
* `src/components/retro/RetroTimeline.tsx`:
  * Memperbaiki tone copywriting deskripsi karier di UMN, IMIP, IEEE, dan LKH: lebih manusiawi dan tidak kaku.
  * Optimalisasi padding dan kontainer log untuk kenyamanan membaca di mobile.
* `src/components/retro/RetroTerminal.tsx`:
  * Memperbaiki form kontak: label yang lebih ramah ("Yuk ngobrol atau diskusi peluang kerja").
  * Tata letak tombol kirim dan channel kartu agar tidak bertumpuk di mobile.
* `src/components/retro/RetroTaskbar.tsx`:
  * Mengoptimalkan lebar tab window di taskbar untuk layar sempit (menampilkan icon-only atau nama pendek jika viewport < 640px).
* `src/styles/global.css`:
  * Menambahkan styling helper untuk drawer retro dan transisi slide-in.

---

## 3. Rencana Eksekusi Bertahap (Task Breakdown)

### Tahap 1: Data Model & Mockup Sertifikat (`src/data/certificates.ts`)
- [ ] Buat struktur tipe TypeScript `CertificateItem`.
- [ ] Daftarkan 5 sertifikat relevan dengan rekam jejak Axl:
  1. *IEEE YESIST12 Medical AI Research Presentation & Validation*
  2. *Deep Learning & Computer Vision Specialization (PyTorch / Swin-Transformer)*
  3. *Enterprise Full-Stack Software Engineering (React 18 & FastAPI)*
  4. *Relational Database Architecture & Indexing (PostgreSQL / MySQL)*
  5. *Applied Data Engineering & System Automation*
- [ ] Siapkan placeholder thumbnail resolusi tajam dengan fallback visual retro.

### Tahap 2: Komponen Galeri Sertifikat (`RetroCertificateGallery.tsx`)
- [ ] Buat UI Desktop Sidebar:
  - Header Win95: Titlebar `C:\CERTS\Vault.exe` + icon folder/diploma + tombol minimize/collapse.
  - Body: Scrollable list dengan styling `win95-sunken` latar putih.
  - Kartu Sertifikat: Thumbnail gambar dengan efek pixel-border, judul, penerbit, tanggal, dan tombol "Lihat Dokumen ↗" yang membuka di tab baru (`target="_blank"`).
- [ ] Buat UI Mobile Drawer & Floating Badge:
  - Floating Badge di pojok kanan bawah/tengah: tombol Win95 bertuliskan `📜 Sertifikat (5)` yang selalu terlihat namun tidak mengganggu scrolling.
  - Slide-in Drawer: Saat badge di-tap, muncul drawer pop-up dari kanan atau sheet dari bawah dengan backdrop semi-transparan dan tombol tutup `✕`.

### Tahap 3: Re-balancing Copywriting (Bahasa Kasual & Natural)
- [ ] **Desktop Banner & Hero:**
  - Ubah sapaan kaku menjadi conversational: *"Halo! Gue Jonathan Axl — Software engineer yang fokus di full-stack web dan deep learning. Suka merancang sistem yang scalable dan bikin AI yang beneran kepakai di dunia nyata."*
- [ ] **Skills & Projects:**
  - Sederhanakan istilah teknis: ganti frasa hiperbolis dengan penjelasan fungsi konkret yang enak dibaca.
- [ ] **Career Timeline:**
  - Buat deskripsi pekerjaan di PT LKH, IMIP, dan IEEE terdengar seperti pencapaian nyata seorang engineer yang passionate, bukan teks undang-undang atau laporan birokrasi.
- [ ] **Contact Form:**
  - Ubah tone menjadi ramah dan terbuka untuk diskusi project, kolaborasi riset, maupun peluang kerja full-time.

### Tahap 4: Full Mobile Responsiveness Polish
- [ ] **DesktopManager Container:**
  - Tambahkan container queries atau flex-col responsif agar konten utama (`main`) tidak tertutup sidebar di layar medium/besar (`lg:pr-80`).
- [ ] **Komponen Hero & Windows:**
  - Hilangkan lebar fixed yang memaksa horizontal scroll.
  - Tambahkan `w-full max-w-full` dengan padding adaptif (`p-2 sm:p-4`).
- [ ] **Taskbar & Start Menu:**
  - Pastikan taskbar tidak memotong konten paling bawah (beri `pb-16` atau `pb-20` pada kontainer utama).
  - Di layar sangat kecil (< 480px), tab taskbar diperpendek otomatis agar Start button dan jam tetap muat.

### Tahap 5: Verifikasi & Uji Kualitas
- [ ] Jalankan build lokal Astro: `npm run build` untuk memastikan tidak ada error TypeScript atau JSX.
- [ ] Verifikasi tampilan di berbagai resolusi layar:
  - Desktop besar (1920x1080 & 1440x900)
  - Laptop medium (1024x768)
  - Tablet (768x1024)
  - Mobile (375x667, 390x844, 412x915)
- [ ] Uji klik sertifikat untuk memastikan membuka link eksternal / gambar dengan aman di tab baru.

---

## 4. Pembagian Tugas Agen (Orchestration Allocation)

| Agen | Domain Tugas |
|------|--------------|
| `project-planner` | Perumusan rencana kerja, manajemen dependensi, dan pemantauan arsitektur. |
| `frontend-specialist` | Implementasi `RetroCertificateGallery.tsx`, penyesuaian responsivitas komponen, dan penulisan ulang copywriting kasual. |
| `test-engineer` | Verifikasi build Astro SSG, validasi sintaks, dan inspeksi mobile layout. |

---

## 5. Checklist Konfirmasi Pengguna

Sebelum beralih ke tahap implementasi kode:
- [ ] Apakah rencana layout sidebar kanan di desktop & drawer toggle di mobile ini sudah sesuai dengan yang Anda bayangkan?
- [ ] Apakah ada sertifikat spesifik tertentu yang ingin langsung dicantumkan namanya?
