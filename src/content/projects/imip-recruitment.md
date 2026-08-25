---
title: "IMIP E-Recruitment Portal"
date: 2025-12-01
tags:
  - laravel
  - python
  - fastAPI
  - php
  - tailwind
  - scss
  - figma
coverImage: /images/projects/imip-e-recruitment/coverImage.png
gallery:
  - /images/projects/imip-e-recruitment/gallery/0.png
  - /images/projects/imip-e-recruitment/gallery/1.png
githubUrl: https://github.com/Crazyrenan/e-recruitment-imip
excerpt: >-
  Portal e-recruitment skala enterprise untuk PT IMIP, menggabungkan desain modular responsif, AI-assisted candidate screening, dan manajemen akses berbasis peran (RBAC).
---

## System Architecture

Proyek ini dibangun di atas arsitektur MVC (*Model-View-Controller*) dengan pengamanan data pelamar tingkat enterprise dan integrasi modul pencarian cerdas untuk mempercepat screening ribuan kandidat.

### Tactical Capabilities

1. **AI-Assisted Candidate Search**
   * Menggunakan modul pencarian cerdas untuk memfilter kandidat potensial secara instan, mempercepat proses seleksi tim HR.
2. **Role-Based Access Control (RBAC)**
   * Pemisahan hak akses ketat antara HR Officer, Administrator, dan Pelamar Umum melalui middleware keamanan berlapis.
3. **Job Vacancy & Pipeline Management**
   * Dashboard interaktif untuk publikasi, manajemen kuota, dan monitoring status pelamar secara real-time.
4. **Custom SCSS & UI Tokenization**
   * Penerjemahan desain Figma ke komponen Blade modular dengan arsitektur SCSS kustom yang responsif di seluruh perangkat.

```scss
// app.scss - Tokenized Architecture
$primary-color: #0d6efd;
$secondary-color: #6c757d;

.dashboard-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
}
```
