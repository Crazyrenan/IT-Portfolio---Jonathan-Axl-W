---
title: Intelligent Help Desk
date: 2025-09-29
excerpt: A duplicate-prevention system using semantic search to filter IT support tickets.
tags: 
  - Laravel
  - Python
  - Semantic Search
  - NLP
---

## Mission Briefing
To reduce the workload on IT support staff, this system prevents duplicate ticket submissions by "reading" the user's issue before they submit it.

### Tactical Approach
* **Hybrid Architecture:** The main app runs on **Laravel**, but validation requests are sent to a separate **Python/Flask** microservice.
* **Semantic Engine:** Uses a Natural Language Processing (NLP) model to compare the new ticket against a database of solved issues, suggesting existing solutions immediately.