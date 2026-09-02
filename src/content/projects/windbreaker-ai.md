---
title: "Windbreaker AI — Aviation Telemetry Platform"
date: 2026-03-10
category: enterprise
role: "Full-Stack & Machine Learning Engineer"
tags:
  - XGBoost
  - FastAPI
  - Python
  - JWT
  - Docker
  - GSAP
coverImage: ""
gallery: []
githubUrl: https://github.com/Crazyrenan/windbreaker-ai
excerpt: >-
  Platform telemetri penerbangan cerdas dengan inferensi XGBoost real-time untuk prediksi keterlambatan penerbangan dan estimasi harga tiket pesawat.
problem: >-
  Industri penerbangan memerlukan prediksi delay penerbangan dan estimasi harga tiket secara real-time berdasarkan data telemetri.
solution: >-
  Membangun platform telemetri penerbangan dengan model XGBoost real-time (xgb_flight_delay.pkl, xgb_price.pkl), arsitektur FastAPI stateless JWT authentication, Docker persistence, dan GSAP animated counters untuk dashboard.
outcome: >-
  Prediksi real-time delay penerbangan dan harga tiket dengan model ML teroptimasi.
---

## Gambaran Proyek

**Windbreaker AI** adalah platform telemetri penerbangan tingkat lanjut yang dirancang untuk menganalisis data operasional penerbangan dan memberikan prediksi keterlambatan (*flight delay*) serta estimasi harga tiket secara *real-time*.

### Arsitektur & Fitur Utama

1. **Model Machine Learning Real-Time (XGBoost)**
   * Memanfaatkan model terlatih `xgb_flight_delay.pkl` untuk estimasi probabilitas keterlambatan dan `xgb_price.pkl` untuk estimasi dinamis harga tiket berdasarkan variabel telemetri penerbangan.
2. **Backend Berkinerja Tinggi (FastAPI & Stateless JWT)**
   * Layanan REST API asinkron dengan otentikasi stateless berbasis JSON Web Tokens (JWT) untuk performa inferensi rendah latensi (*low latency*).
3. **Infrastruktur & Kontainerisasi (Docker)**
   * Orkestrasi lingkungan runtime yang konsisten dengan persistensi data menggunakan Docker volume dan deployment terstandar.
4. **Dashboard Telemetri Interaktif (GSAP)**
   * Visualisasi analitik metrik penerbangan dengan animasi penghitung numerik halus (*smooth animated counters*) menggunakan GSAP.
