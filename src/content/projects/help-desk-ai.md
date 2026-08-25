---
title: "Intelligent Help Desk & Ticket De-duplication"
date: 2025-10-15
tags:
  - laravel
  - python
  - flask
  - php
  - tailwind
  - mysql
coverImage: /images/projects/intelligent-help-desk/coverImage.png
gallery:
  - /images/projects/intelligent-help-desk/gallery/0.png
  - /images/projects/intelligent-help-desk/gallery/1.png
githubUrl: https://github.com/Crazyrenan/it-helpdesk-demo
excerpt: >-
  Sistem prevensi tiket duplikat cerdas berbasis semantic search NLP untuk memfilter issue IT support secara otomatis sebelum diteruskan ke tim engineer.
---

## Mission Briefing

Untuk mengurangi beban operasional tim IT support internal, sistem ini memvalidasi pengajuan tiket baru secara preventif dengan "membaca" konten keluhan pengguna sebelum tiket resmi diterbitkan.

### Tactical Approach

- **Hybrid Architecture:** Aplikasi utama berjalan di atas **Laravel**, sedangkan validasi kesamaan teks dan pencarian semantik dikirim ke microservice terpisah berbasis **Python/Flask**.
- **Semantic Engine:** Memanfaatkan model Natural Language Processing (NLP) untuk membandingkan tiket baru terhadap basis pengetahuan (*knowledge base*) permasalahan yang telah terselesaikan, memberikan rekomendasi solusi instan kepada pengguna.
