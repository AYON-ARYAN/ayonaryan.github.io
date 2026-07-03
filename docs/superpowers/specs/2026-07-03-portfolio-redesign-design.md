# Portfolio Full Redesign — "Luxury Serif, Reimagined"

**Date:** 2026-07-03
**Repo:** ayonaryan.github.io (GitHub Pages)
**Driver:** Placement season — the site must convert a skimming recruiter in ~15 seconds.

## Goal

Rebuild the portfolio from scratch with a refined dark-navy/gold editorial identity,
current content sourced from the user's LinkedIn profile data, and a new curated
Credentials section. A recruiter should immediately see: who Ayon is, proof of
shipped work, credentials, and a one-click résumé.

## Positioning (single source of truth)

Source: `/Users/ayonaryan/Downloads/LINKEDIN/PROFILE_README.md`

- **Ayon Aryan** — AI Systems & Backend Engineer
- B.Tech (Hons.) CS @ RV University, Bangalore — Major AI/ML, Minor Fintech — expected 2027 — CGPA 7.8/10
- 2 completed industry internships; production legal RAG service; 100+ install Play Store app
- 116 LeetCode solved (64 Medium · 13 Hard)
- Best Project Award (Structural Innovation), RV University; IEEE CCEM 2024 paper presenter
- Contact: ayonaryan5@gmail.com · linkedin.com/in/ayon-aryan-917078238 · github.com/AYON-ARYAN · leetcode.com/u/Ayon_Aryan

## Visual identity

- Evolve (not discard) the current identity: Playfair Display display serif + Inter body.
- Palette: deep navy near-black base, warm gold accent, ivory type, fine hairline rules.
- Editorial spacing, restrained scroll-reveal motion. No gimmicks, no cursor toys unless they cost nothing.
- Rebuild all markup/CSS from scratch. **Drop Bootstrap and unused vendor libs**; vanilla CSS
  (custom properties, grid/flex) + one small JS file (nav, reveal-on-scroll, lightbox if needed).

## Page structure — index.html

1. **Hero** — "Engineering *Intelligence.*" serif display; positioning subtitle; stat strip
   (116 LeetCode · 2 internships · IEEE CCEM '24 · Best Project Award); CTAs: Résumé (PDF) + Selected Work.
2. **About** — portrait (`assets/img/person/myphoto.jpeg`), narrative rewritten from profile, metrics row.
3. **Experience** —
   - **Broadrange AI**, AI Intern, Chicago (Remote), Jun–Aug 2025: legal-domain RAG
     (Flask · ChromaDB · sentence-transformers · SambaNova Llama-4), PromptGuard V2 injection
     defense at request ingress, full ingestion→API pipeline.
   - **Techpuram Technology**, Android Native Intern, Madurai, Feb–Aug 2025: Geo GPS Camera
     (Kotlin · Jetpack Compose · CameraX · Maps SDK), 100+ Play Store installs, zero crash
     regressions, server-side GPS-spoof detection.
   - Internship certificates linked as proof (copied into `assets/credentials/`).
4. **Selected Work** — 6 flagship projects, card grid → detail page + GitHub link:
   | Project | Hook |
   |---|---|
   | DATABASE-MANAGER | NL→SQL across 8 DB engines, dual-LLM routing, RBAC |
   | graph-rag | Hybrid KG-traversal + FAISS retrieval, live D3 viz |
   | LEGAL-AI-LLM | Legal RAG + PromptGuard V2 (internship product) |
   | Image-Resolution-Enhancer | Real-ESRGAN fine-tune, PSNR 29.15→33.95 dB |
   | LLM-Service-MCP | Spring Boot agent, BERT intent routing across tools |
   | PERSONAL_ASSISTANT (Voice AI) | Fully offline Apple-Silicon voice assistant |
   All 8 existing `work/*.html` detail pages restyled to the new design (content refreshed, none deleted).
5. **Credentials (new)** — ~12 curated certificates grouped by theme, PDFs/images copied to
   `assets/credentials/`, open in new tab:
   - **ML & Cloud:** AWS Machine Learning, AWS Course Completion, Coursera ML
   - **Generative AI:** Google Generative AI Fundamentals, Intro to LLMs, Responsible AI
   - **Data Engineering:** IBM Big Data (BD0101/BD0111/BD0211), Hadoop, Spark/SkillsBuild
   - **Professional:** Career Essentials in Business Analysis (Microsoft × LinkedIn)
   - **Community & Research:** IEEE CCEM 2024, GDSC
   Curation rule: strongest-per-category; the full ~45-file archive is NOT published.
6. **Education & Achievements** — RV University B.Tech (Hons) CS details; Best Project Award;
   IEEE CCEM 2024 paper; LeetCode/CodeChef profile links.
7. **Contact / footer** — mailto, LinkedIn, GitHub, LeetCode. No backend form.

## Assets & files

- Résumé: copy `/Users/ayonaryan/Downloads/LINKEDIN/resume_variants/Ayon_Aryan_Resume_Reference.pdf`
  → `assets/img/profile/MyCv.pdf` (keep same path so old links keep working).
- Certificates: copy curated set from `/Users/ayonaryan/Documents/CERTIFRICATES ` (note trailing
  space in dir name) → `assets/credentials/` with clean kebab-case filenames.
- Keep: person photos, project portfolio images, logo, `google96a9f18e8bb485bd.html`.
- Remove from the page: Bootstrap, AOS, GLightbox vendor payloads (delete vendor dirs only if unreferenced after rebuild).

## SEO / meta

- Title: "Ayon Aryan — AI Systems & Backend Engineer | RV University"
- Meta description + keywords targeting AI/ML engineer, RAG, LLM, Android, Bangalore, placement.
- OG tags with a real preview image; canonical `https://ayon-aryan.github.io/ayonaryan.github.io/`
  (match the actual deployed URL); JSON-LD `Person` schema.

## Verification

- Serve locally; browser-check at 375 / 768 / 1440 px widths.
- Lighthouse: Performance, SEO, Accessibility ≥ 90.
- Every nav link, project link, GitHub link, certificate PDF, and résumé PDF resolves.
- Commits local; push to GitHub only on explicit user confirmation.

## Out of scope

- Blog, CMS, backend/contact form, analytics changes, publishing all 45 certificates,
  résumé content rewriting (file is used as-is).
