---
title: "Hybrid DenseNet–EfficientNetV2-B3 & Vision Transformers for TB Detection"
date: 2026-06-20
tags:
  - PyTorch
  - Vision Transformers
  - Swin-Transformer
  - DeiT
  - Grad-CAM
  - Medical AI
  - Research
coverImage: ""
gallery: []
githubUrl: https://github.com/Crazyrenan/TBC-Prediction-Website
excerpt: >-
  Penelitian komparatif arsitektur CNN Hibrida vs. Vision Transformers (Swin & DeiT) untuk deteksi Tuberkulosis pada citra Chest X-Ray TBX11K, mencapai 97% akurasi dengan interpretabilitas Grad-CAM.
---

## Executive Summary

Studi komparatif komprehensif mengevaluasi performa ekstraksi fitur lokal (CNN) dibandingkan mekanisme atensi global (*Vision Transformers*) dalam mendeteksi Tuberkulosis (TB), kondisi Sick (Non-TB), dan Healthy pada citra radiografi dada (*Chest X-Rays*).

## Key Research Highlights

* **Arsitektur yang Dievaluasi:**
  * **Hybrid CNN (ComNet):** Fokus pada representasi spasial lokal (tekstur dan pola halus).
  * **Data-efficient Image Transformer (DeiT-Small):** Menangkap relasi kontekstual global secara holistik.
  * **Swin Transformer:** Arsitektur hierarkis berbasis *shifted window attention* untuk pemodelan fitur lokal-global secara simultan.

* **Benchmark Performa Kunci:**
  * **97.0% Overall Accuracy & F1-Score** dicapai oleh Swin Transformer dan Hybrid CNN.
  * **100% Recall pada kelas Healthy** dicapai oleh Swin Transformer (eliminasi *false positives* skrining awal).
  * **98.0% Recall pada kelas TB** oleh Swin Transformer dan DeiT (sensitivitas tinggi untuk mencegah transmisi).
  * **98.0% Recall pada kelas Sick (Non-TB)** oleh Hybrid CNN (keunggulan ekstraksi fitur lokal).

* **Interpretabilitas Klinis (Grad-CAM):**
  * Memvisualisasikan peta atensi model pada area patologis paru-paru untuk menjamin transparansi keputusan diagnostik sebelum masuk evaluasi radiolog.
