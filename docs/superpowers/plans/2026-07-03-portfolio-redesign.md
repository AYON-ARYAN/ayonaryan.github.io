# Portfolio Full Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild ayonaryan.github.io from scratch as a recruiter-ready portfolio — dark-navy/gold editorial design, refreshed content, new Credentials section — for placement season.

**Architecture:** Static site on GitHub Pages. One `index.html` (7 sections) + 8 existing `work/*.html` case-study pages restyled via a shared, fully rewritten `assets/css/main.css`. Zero frameworks: vanilla CSS (custom properties, grid) + one small `assets/js/main.js` (nav toggle, scroll reveal). Bootstrap/AOS/GLightbox are removed.

**Tech Stack:** HTML5, vanilla CSS, vanilla JS, Google Fonts (Playfair Display + Inter), GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-07-03-portfolio-redesign-design.md`

## Global Constraints

- Work on branch `redesign-2026-07`; never commit to `main`/`master` directly; **do not push** unless the user explicitly confirms.
- Fonts: `Playfair Display` (display serif) + `Inter` (body) only.
- Palette tokens (exact values, defined once in Task 2): bg `#0b1120`, panel `#111a30`, ink `#ede8dc`, ink-dim `#a8a294`, gold `#c9a35c`, gold-bright `#e3c98f`, hairline `rgba(201,163,92,.18)`.
- No Bootstrap, AOS, GLightbox, or jQuery anywhere in final HTML.
- Résumé must remain at `assets/img/profile/MyCv.pdf` (old shared links must keep working).
- Keep `google96a9f18e8bb485bd.html` and `.gitattributes` untouched.
- Canonical site URL: `https://ayon-aryan.github.io/ayonaryan.github.io/`
- Contact info (exact): `ayonaryan5@gmail.com` · `+91 7991126269` · `https://www.linkedin.com/in/ayon-aryan-917078238/` · `https://github.com/AYON-ARYAN` · `https://leetcode.com/u/Ayon_Aryan/`
- The certificates source directory has a **trailing space**: `/Users/ayonaryan/Documents/CERTIFRICATES /` — always quote it.
- Local preview for verification: `cd <repo> && python3 -m http.server 8080` then browse `http://localhost:8080/`. Verify each page visually (screenshot) and check the browser console for errors before every commit.

---

### Task 1: Branch + asset preparation

**Files:**
- Create: `assets/credentials/` (15 copied files, renamed)
- Modify: `assets/img/profile/MyCv.pdf` (replaced with latest résumé)

**Interfaces:**
- Produces: the exact credential file paths listed below, referenced verbatim by Tasks 4 and 5.

- [ ] **Step 1: Create branch**

```bash
cd "/Volumes/BLACK_SHARK/Personal Website/ayonaryan.github.io"
git checkout -b redesign-2026-07
```

- [ ] **Step 2: Copy latest résumé over the existing CV path**

```bash
cp "/Users/ayonaryan/Downloads/LINKEDIN/resume_variants/Ayon_Aryan_Resume_Reference.pdf" \
   "assets/img/profile/MyCv.pdf"
```

- [ ] **Step 3: Copy + rename curated certificates**

```bash
mkdir -p assets/credentials
SRC="/Users/ayonaryan/Documents/CERTIFRICATES "
cp "$SRC/MACHINE LEARNING AWS.pdf"                                                        assets/credentials/aws-machine-learning.pdf
cp "$SRC/223_3_5164016_1725545004_AWS Course Completion Certificate.pdf"                  assets/credentials/aws-cloud-course.pdf
cp "$SRC/COURSERA ml.pdf"                                                                 assets/credentials/coursera-machine-learning.pdf
cp "$SRC/GENERATIVE AI FUNDAMENTALS.png"                                                  assets/credentials/google-generative-ai-fundamentals.png
cp "$SRC/INTRODUCTION TO LARGE LANGUAGE MODELS BADGE.png"                                 assets/credentials/google-intro-llms.png
cp "$SRC/INTRODUCTION TO RESPONSIBLE AI.png"                                              assets/credentials/google-responsible-ai.png
cp "$SRC/IBM BD0101EN Certificate _ IBM SkillsBuild.pdf"                                  assets/credentials/ibm-big-data-101.pdf
cp "$SRC/BigDataUniversity BD0211EN Certificate _ IBM SkillsBuild.pdf"                    assets/credentials/ibm-spark-bd0211.pdf
cp "$SRC/hadoop.pdf"                                                                      assets/credentials/ibm-hadoop.pdf
cp "$SRC/CertificateOfCompletion_Career Essentials in Business Analysis by Microsoft and LinkedIn.pdf" assets/credentials/microsoft-linkedin-business-analysis.pdf
cp "$SRC/SCALER DSA.png"                                                                  assets/credentials/scaler-dsa.png
cp "$SRC/AYON ARYAN_GDSC.pdf"                                                             assets/credentials/gdsc-google-developer.pdf
cp "$SRC/IEEE CCEM 2024 Participation Certificate  PaperID 92.pdf"                        assets/credentials/ieee-ccem-2024.pdf
cp "$SRC/INTERNSHIPS/Broadrange_AI_Intership_Certficate_Ayonaryan.pdf"                    assets/credentials/internship-broadrange-ai.pdf
cp "$SRC/INTERNSHIPS/AyonAryan Techpuram.pdf"                                             assets/credentials/internship-techpuram.pdf
```

Note: the IEEE filename has **two spaces** before `PaperID`. If any `cp` fails, `ls` the source dir and match the name exactly — do not skip a file silently.

- [ ] **Step 4: Verify all 15 credential files + résumé exist and are non-empty**

```bash
ls -la assets/credentials/ | wc -l   # expect 15 files (+ . .. = 17 lines incl. total)
find assets/credentials -size -10k   # expect empty output (no truncated copies)
ls -la assets/img/profile/MyCv.pdf   # expect ~138 KB
```

- [ ] **Step 5: Commit**

```bash
git add assets/credentials assets/img/profile/MyCv.pdf
git commit -m "feat: add curated credential PDFs and latest résumé"
```

---

### Task 2: New CSS foundation + JS (tokens, base, nav, buttons, primitives)

**Files:**
- Rewrite: `assets/css/main.css` (full replacement)
- Rewrite: `assets/js/main.js` (full replacement)

**Interfaces:**
- Produces (used by every later task): CSS classes `.navbar .navbar-inner .nav-logo .nav-links .nav-cta .nav-toggle`, `.container`, `.section .section-dark .section-eyebrow .section-title .body-text`, `.btn-gold .btn-ghost`, `.reveal` (JS-driven scroll reveal), `.footer`; JS behaviors: nav toggle, `.reveal` IntersectionObserver, navbar `.scrolled` class.

- [ ] **Step 1: Write `assets/js/main.js` (complete file)**

```js
(() => {
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
      })
    );
  }

  const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
```

- [ ] **Step 2: Write the foundation of `assets/css/main.css` (complete replacement — later tasks append section blocks to this file)**

```css
/* ===== Ayon Aryan — portfolio ===== */
:root {
  --bg: #0b1120;
  --bg-2: #0e1528;
  --panel: #111a30;
  --ink: #ede8dc;
  --ink-dim: #a8a294;
  --gold: #c9a35c;
  --gold-bright: #e3c98f;
  --line: rgba(201, 163, 92, 0.18);
  --serif: "Playfair Display", Georgia, serif;
  --sans: "Inter", system-ui, -apple-system, sans-serif;
  --container: 1140px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--sans);
  font-weight: 300;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; display: block; }
a { color: var(--gold); text-decoration: none; transition: color .25s; }
a:hover { color: var(--gold-bright); }
::selection { background: var(--gold); color: var(--bg); }

.container { max-width: var(--container); margin-inline: auto; padding-inline: 24px; }

/* --- reveal on scroll --- */
.reveal { opacity: 0; transform: translateY(28px); transition: opacity .8s ease, transform .8s ease; }
.reveal.visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
  html { scroll-behavior: auto; }
}

/* --- navbar --- */
.navbar {
  position: fixed; inset: 0 0 auto 0; z-index: 100;
  transition: background .3s, border-color .3s;
  border-bottom: 1px solid transparent;
}
.navbar.scrolled {
  background: rgba(11, 17, 32, 0.85);
  backdrop-filter: blur(12px);
  border-bottom-color: var(--line);
}
.navbar-inner {
  max-width: var(--container); margin-inline: auto; padding: 18px 24px;
  display: flex; align-items: center; gap: 32px;
}
.nav-logo { font-family: var(--serif); font-size: 1.35rem; color: var(--ink); letter-spacing: .02em; }
.nav-links { list-style: none; display: flex; gap: 28px; margin-left: auto; }
.nav-links a {
  color: var(--ink-dim); font-size: .82rem; letter-spacing: .14em; text-transform: uppercase;
}
.nav-links a:hover { color: var(--gold-bright); }
.nav-cta {
  border: 1px solid var(--gold); padding: 8px 22px; font-size: .8rem;
  letter-spacing: .14em; text-transform: uppercase; color: var(--gold);
  transition: background .25s, color .25s;
}
.nav-cta:hover { background: var(--gold); color: var(--bg); }
.nav-toggle { display: none; background: none; border: 0; cursor: pointer; width: 28px; }
.nav-toggle span { display: block; height: 2px; background: var(--ink); margin: 6px 0; transition: transform .3s, opacity .3s; }
.nav-toggle.open span:first-child { transform: translateY(4px) rotate(45deg); }
.nav-toggle.open span:last-child { transform: translateY(-4px) rotate(-45deg); }

@media (max-width: 820px) {
  .nav-toggle { display: block; margin-left: auto; }
  .nav-links {
    position: fixed; inset: 62px 0 auto 0; flex-direction: column; gap: 0;
    background: var(--bg-2); border-bottom: 1px solid var(--line);
    max-height: 0; overflow: hidden; transition: max-height .35s ease;
  }
  .nav-links.open { max-height: 60vh; }
  .nav-links li { padding: 16px 24px; border-top: 1px solid var(--line); }
  .nav-cta { display: none; }
}

/* --- sections --- */
.section { padding: 110px 0; }
.section-dark { background: var(--bg-2); border-block: 1px solid var(--line); }
.section-eyebrow {
  font-size: .78rem; letter-spacing: .3em; text-transform: uppercase;
  color: var(--gold); margin-bottom: 18px;
}
.section-title {
  font-family: var(--serif); font-weight: 500; line-height: 1.15;
  font-size: clamp(2rem, 4.2vw, 3.2rem); margin-bottom: 28px;
}
.section-title em { font-style: italic; color: var(--gold-bright); }
.body-text { color: var(--ink-dim); max-width: 62ch; margin-bottom: 18px; }
.text-center { text-align: center; }
.text-center .body-text { margin-inline: auto; }

/* --- buttons --- */
.btn-gold, .btn-ghost {
  display: inline-block; padding: 14px 36px; font-size: .82rem;
  letter-spacing: .16em; text-transform: uppercase; transition: all .25s;
}
.btn-gold { background: var(--gold); color: var(--bg); border: 1px solid var(--gold); }
.btn-gold:hover { background: var(--gold-bright); border-color: var(--gold-bright); color: var(--bg); }
.btn-ghost { border: 1px solid var(--line); color: var(--ink); }
.btn-ghost:hover { border-color: var(--gold); color: var(--gold-bright); }

/* --- footer --- */
.footer {
  border-top: 1px solid var(--line); padding: 36px 0;
  display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between;
  color: var(--ink-dim); font-size: .85rem;
}
.footer-links { display: flex; gap: 22px; }
```

- [ ] **Step 3: Verify CSS parses and JS has no syntax errors**

```bash
node --check assets/js/main.js    # expect no output (success)
```

- [ ] **Step 4: Commit**

```bash
git add assets/css/main.css assets/js/main.js
git commit -m "feat: new CSS foundation and vanilla JS (drop Bootstrap/AOS)"
```

---

### Task 3: index.html — head/SEO, nav, hero, about

**Files:**
- Rewrite: `index.html` (this task writes head + nav + hero + about; Tasks 4–5 append the remaining sections before `</main>`)
- Modify: `assets/css/main.css` (append hero/about blocks)

**Interfaces:**
- Consumes: Task 2 classes and `main.js` behaviors.
- Produces: section ids `#hero #about` used by nav; the page skeleton Tasks 4–5 insert into.

- [ ] **Step 1: Write the new `index.html` (complete file at this stage)**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="google-site-verification" content="0oYCWAyUAsLWA2L19VKVPn12bXHJsbfHqNH-ahwrtyw" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ayon Aryan — AI Systems & Backend Engineer | RV University</title>
  <meta name="description" content="Ayon Aryan builds production AI systems — LLM pipelines, hybrid-retrieval RAG, MCP tool servers and native Android apps. CS (AI/ML) @ RV University, Bangalore. 2 industry internships, IEEE CCEM 2024 presenter." />
  <meta name="author" content="Ayon Aryan" />
  <link rel="canonical" href="https://ayon-aryan.github.io/ayonaryan.github.io/" />

  <meta property="og:title" content="Ayon Aryan — AI Systems & Backend Engineer" />
  <meta property="og:description" content="Production AI infrastructure: RAG pipelines, LLM orchestration, MCP servers, native Android. RV University '27." />
  <meta property="og:image" content="https://ayon-aryan.github.io/ayonaryan.github.io/assets/img/person/myphoto.jpeg" />
  <meta property="og:url" content="https://ayon-aryan.github.io/ayonaryan.github.io/" />
  <meta property="og:type" content="website" />

  <link href="assets/img/profile/logo.png" rel="icon" />
  <link href="assets/img/profile/logo.png" rel="apple-touch-icon" />
  <link href="https://fonts.googleapis.com" rel="preconnect" />
  <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <link href="assets/css/main.css" rel="stylesheet" />

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ayon Aryan",
    "jobTitle": "AI Systems & Backend Engineer",
    "email": "mailto:ayonaryan5@gmail.com",
    "url": "https://ayon-aryan.github.io/ayonaryan.github.io/",
    "image": "https://ayon-aryan.github.io/ayonaryan.github.io/assets/img/person/myphoto.jpeg",
    "alumniOf": { "@type": "CollegeOrUniversity", "name": "RV University" },
    "knowsAbout": ["Artificial Intelligence", "Machine Learning", "Retrieval-Augmented Generation", "Large Language Models", "Backend Engineering", "Android Development"],
    "sameAs": [
      "https://www.linkedin.com/in/ayon-aryan-917078238/",
      "https://github.com/AYON-ARYAN",
      "https://leetcode.com/u/Ayon_Aryan/"
    ]
  }
  </script>
</head>
<body>
  <nav class="navbar" id="navbar">
    <div class="navbar-inner">
      <a href="#hero" class="nav-logo">Ayon Aryan</a>
      <ul class="nav-links" id="navLinks">
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#work">Work</a></li>
        <li><a href="#credentials">Credentials</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <a href="assets/img/profile/MyCv.pdf" class="nav-cta" target="_blank">Résumé</a>
      <button class="nav-toggle" id="navToggle" aria-label="Menu"><span></span><span></span></button>
    </div>
  </nav>

  <main>
    <!-- ===== HERO ===== -->
    <section id="hero" class="hero">
      <div class="container">
        <div class="hero-content reveal">
          <p class="hero-eyebrow">AI Systems &amp; Backend Engineer</p>
          <h1 class="hero-title">Engineering<br /><em>Intelligence.</em></h1>
          <p class="hero-subtitle">
            I build local-first LLM pipelines, hybrid-retrieval RAG systems and MCP tool
            servers — and ship them as real products. CS (AI/ML) @ RV University, Bangalore.
          </p>
          <div class="hero-actions">
            <a href="assets/img/profile/MyCv.pdf" target="_blank" class="btn-gold">Résumé</a>
            <a href="#work" class="btn-ghost">Selected Work</a>
          </div>
          <ul class="hero-stats">
            <li><strong>116</strong> LeetCode solved</li>
            <li><strong>2</strong> industry internships</li>
            <li><strong>IEEE</strong> CCEM 2024 presenter</li>
            <li><strong>Best Project</strong> Award, RV University</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ===== ABOUT ===== -->
    <section id="about" class="section">
      <div class="container">
        <div class="about-grid">
          <div class="about-portrait reveal">
            <img src="assets/img/person/myphoto.jpeg" alt="Ayon Aryan" loading="lazy" />
          </div>
          <div class="reveal">
            <p class="section-eyebrow">About</p>
            <h2 class="section-title">Systems that ship,<br /><em>end to end.</em></h2>
            <p class="body-text">
              I'm a Computer Science undergraduate at RV University, Bangalore — majoring in
              AI/ML with a minor in Fintech (B.Tech Hons., expected 2027). I like owning the
              full path of an AI system: ingestion → embeddings → retrieval → generation →
              guardrails → REST API.
            </p>
            <p class="body-text">
              At <strong>Broadrange AI</strong> (Chicago, remote) I architected a legal-domain
              RAG service with prompt-injection defense at the request ingress. At
              <strong>Techpuram Technology</strong> I shipped a tamper-evident GPS camera app
              to 100+ Play Store installs. Strong foundations in DSA, OOP and DBMS.
            </p>
            <div class="about-metrics">
              <div class="metric"><span class="metric-value">7.8</span><span class="metric-label">CGPA / 10</span></div>
              <div class="metric"><span class="metric-value">15+</span><span class="metric-label">Systems Built</span></div>
              <div class="metric"><span class="metric-value">2</span><span class="metric-label">Internships</span></div>
              <div class="metric"><span class="metric-value">2027</span><span class="metric-label">B.Tech (Hons)</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <script src="assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Append hero + about CSS to `assets/css/main.css`**

```css
/* --- hero --- */
.hero { min-height: 100vh; display: flex; align-items: center; padding: 140px 0 80px;
  background:
    radial-gradient(1100px 500px at 80% -10%, rgba(201,163,92,.10), transparent 60%),
    radial-gradient(800px 400px at -10% 110%, rgba(201,163,92,.06), transparent 60%),
    var(--bg);
}
.hero-eyebrow { font-size: .8rem; letter-spacing: .34em; text-transform: uppercase; color: var(--gold); margin-bottom: 22px; }
.hero-title { font-family: var(--serif); font-weight: 500; font-size: clamp(3rem, 8.5vw, 6.4rem); line-height: 1.04; margin-bottom: 26px; }
.hero-title em { font-style: italic; color: var(--gold-bright); }
.hero-subtitle { color: var(--ink-dim); font-size: 1.05rem; max-width: 58ch; margin-bottom: 36px; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 54px; }
.hero-stats { list-style: none; display: flex; flex-wrap: wrap; gap: 14px 40px; border-top: 1px solid var(--line); padding-top: 26px; color: var(--ink-dim); font-size: .88rem; }
.hero-stats strong { color: var(--gold-bright); font-weight: 600; margin-right: 6px; }

/* --- about --- */
.about-grid { display: grid; grid-template-columns: 2fr 3fr; gap: 64px; align-items: center; }
@media (max-width: 900px) { .about-grid { grid-template-columns: 1fr; gap: 40px; } }
.about-portrait { border: 1px solid var(--line); padding: 14px; }
.about-portrait img { filter: saturate(.9) contrast(1.03); }
.about-metrics { display: flex; flex-wrap: wrap; gap: 20px 44px; border-top: 1px solid var(--line); margin-top: 30px; padding-top: 26px; }
.metric-value { display: block; font-family: var(--serif); font-size: 2rem; color: var(--gold-bright); }
.metric-label { font-size: .74rem; letter-spacing: .16em; text-transform: uppercase; color: var(--ink-dim); }
```

- [ ] **Step 3: Verify in browser**

Run: `python3 -m http.server 8080` in repo root; open `http://localhost:8080/`.
Expected: hero and about render in navy/gold, nav sticks + blurs on scroll, mobile toggle works at 375 px, zero console errors.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat: rebuild index head/SEO, nav, hero, about"
```

---

### Task 4: index.html — experience + selected work sections

**Files:**
- Modify: `index.html` (insert both sections before `</main>`, after the about section)
- Modify: `assets/css/main.css` (append experience/work blocks)

**Interfaces:**
- Consumes: `.section*`, `.reveal`, `.body-text` from Task 2; credential paths from Task 1.
- Produces: ids `#experience #work`; card link targets must match the existing files `work/database-manager.html`, `work/graphrag.html`, `work/legal-ai.html`, `work/super-resolution.html`, `work/intellichat.html`, `work/voice-ai.html`.

- [ ] **Step 1: Insert the Experience section HTML**

```html
    <!-- ===== EXPERIENCE ===== -->
    <section id="experience" class="section section-dark">
      <div class="container">
        <p class="section-eyebrow reveal">Career</p>
        <h2 class="section-title reveal">Proof of <em>shipping.</em></h2>
        <div class="xp-list">
          <article class="xp-item reveal">
            <div class="xp-meta">
              <span class="xp-dates">Jun — Aug 2025</span>
              <span class="xp-loc">Chicago · Remote</span>
            </div>
            <div class="xp-body">
              <h3 class="xp-role">AI Intern — <strong>Broadrange AI</strong></h3>
              <ul class="xp-points">
                <li>Architected a legal-domain RAG pipeline: Flask · ChromaDB · sentence-transformers · SambaNova Llama-4.</li>
                <li>Added <strong>PromptGuard V2</strong> at the request ingress to block prompt-injection before any LLM call.</li>
                <li>Delivered the full path end-to-end: ingestion → embeddings → retrieval → generation → validation → REST API.</li>
              </ul>
              <a class="xp-proof" href="assets/credentials/internship-broadrange-ai.pdf" target="_blank">Internship certificate ↗</a>
            </div>
          </article>
          <article class="xp-item reveal">
            <div class="xp-meta">
              <span class="xp-dates">Feb — Aug 2025</span>
              <span class="xp-loc">Madurai</span>
            </div>
            <div class="xp-body">
              <h3 class="xp-role">Android Native Intern — <strong>Techpuram Technology</strong></h3>
              <ul class="xp-points">
                <li>Shipped <strong>Geo GPS Camera</strong> — a tamper-evident, location-tagged camera app (Kotlin · Jetpack Compose · CameraX · Maps SDK).</li>
                <li><strong>100+ Play Store installs</strong> with zero crash regressions.</li>
                <li>Built server-side spoof / fake-GPS detection.</li>
              </ul>
              <a class="xp-proof" href="assets/credentials/internship-techpuram.pdf" target="_blank">Internship certificate ↗</a>
            </div>
          </article>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Insert the Selected Work section HTML (6 cards; image files already exist)**

```html
    <!-- ===== WORK ===== -->
    <section id="work" class="section">
      <div class="container">
        <p class="section-eyebrow text-center reveal">Portfolio</p>
        <h2 class="section-title text-center reveal">Selected <em>systems.</em></h2>
        <div class="work-grid">
          <a class="work-card reveal" href="work/database-manager.html">
            <img src="assets/img/portfolio/proj-dbmanager.png" alt="Database Manager" loading="lazy" />
            <div class="work-card-body">
              <h3>Database Manager</h3>
              <p>Natural-language → SQL gateway across 8 database engines with dual-LLM routing, RBAC and encrypted credentials.</p>
              <span class="work-tags">Python · SQLAlchemy · Ollama</span>
            </div>
          </a>
          <a class="work-card reveal" href="work/graphrag.html">
            <img src="assets/img/portfolio/proj-graphrag.png" alt="GraphRAG" loading="lazy" />
            <div class="work-card-body">
              <h3>GraphRAG</h3>
              <p>Hybrid retrieval — knowledge-graph traversal + FAISS vector search with live D3.js graph visualisation.</p>
              <span class="work-tags">NetworkX · FAISS · Groq · D3</span>
            </div>
          </a>
          <a class="work-card reveal" href="work/legal-ai.html">
            <img src="assets/img/portfolio/proj-legalai.png" alt="Legal AI" loading="lazy" />
            <div class="work-card-body">
              <h3>Legal-AI LLM</h3>
              <p>Legal-domain RAG with PromptGuard V2 injection defense — built during the Broadrange AI internship.</p>
              <span class="work-tags">Flask · ChromaDB · Llama-4</span>
            </div>
          </a>
          <a class="work-card reveal" href="work/super-resolution.html">
            <img src="assets/img/portfolio/proj-superres.png" alt="Image Super-Resolution" loading="lazy" />
            <div class="work-card-body">
              <h3>Image Super-Resolution</h3>
              <p>Fine-tuned Real-ESRGAN via transfer learning — PSNR 29.15 → 33.95 dB (SSIM 0.90).</p>
              <span class="work-tags">PyTorch · OpenCV</span>
            </div>
          </a>
          <a class="work-card reveal" href="work/intellichat.html">
            <img src="assets/img/portfolio/proj-intellichat.png" alt="LLM Service MCP" loading="lazy" />
            <div class="work-card-body">
              <h3>LLM-Service MCP</h3>
              <p>Microservice AI agent — BERT intent classifier routes prompts across RAG, web-search and chat tools.</p>
              <span class="work-tags">Java · Spring Boot · BERT</span>
            </div>
          </a>
          <a class="work-card reveal" href="work/voice-ai.html">
            <img src="assets/img/portfolio/proj-voiceai.png" alt="Offline Voice Assistant" loading="lazy" />
            <div class="work-card-body">
              <h3>Offline Voice Assistant</h3>
              <p>Fully offline Apple-Silicon voice assistant: Whisper.cpp + Ollama + Piper — zero cloud APIs.</p>
              <span class="work-tags">Python · C++ · Whisper</span>
            </div>
          </a>
        </div>
        <p class="text-center reveal" style="margin-top:44px">
          <a class="btn-ghost" href="https://github.com/AYON-ARYAN" target="_blank">All repositories on GitHub</a>
        </p>
      </div>
    </section>
```

- [ ] **Step 3: Append experience + work CSS**

```css
/* --- experience --- */
.xp-list { display: grid; gap: 0; }
.xp-item { display: grid; grid-template-columns: 220px 1fr; gap: 40px; padding: 44px 0; border-top: 1px solid var(--line); }
.xp-item:last-child { border-bottom: 1px solid var(--line); }
@media (max-width: 820px) { .xp-item { grid-template-columns: 1fr; gap: 14px; } }
.xp-dates { display: block; color: var(--gold-bright); font-size: .85rem; letter-spacing: .08em; }
.xp-loc { display: block; color: var(--ink-dim); font-size: .8rem; margin-top: 6px; }
.xp-role { font-family: var(--serif); font-weight: 500; font-size: 1.45rem; margin-bottom: 14px; }
.xp-role strong { color: var(--gold-bright); font-weight: 500; }
.xp-points { list-style: none; color: var(--ink-dim); display: grid; gap: 10px; margin-bottom: 16px; }
.xp-points li { padding-left: 22px; position: relative; }
.xp-points li::before { content: "—"; position: absolute; left: 0; color: var(--gold); }
.xp-proof { font-size: .82rem; letter-spacing: .12em; text-transform: uppercase; }

/* --- work --- */
.work-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 24px; }
@media (max-width: 1000px) { .work-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px)  { .work-grid { grid-template-columns: 1fr; } }
.work-card { border: 1px solid var(--line); background: var(--panel); display: block; color: var(--ink); transition: transform .3s, border-color .3s; }
.work-card:hover { transform: translateY(-6px); border-color: var(--gold); color: var(--ink); }
.work-card img { aspect-ratio: 16/10; object-fit: cover; filter: saturate(.85); }
.work-card-body { padding: 22px; }
.work-card-body h3 { font-family: var(--serif); font-weight: 500; font-size: 1.25rem; margin-bottom: 10px; }
.work-card-body p { color: var(--ink-dim); font-size: .92rem; margin-bottom: 14px; }
.work-tags { font-size: .74rem; letter-spacing: .12em; text-transform: uppercase; color: var(--gold); }
```

- [ ] **Step 4: Verify in browser** — both sections render, all 6 cards link to existing pages (click each), certificate proof links open the PDFs, responsive at 375/768/1440 px, zero console errors.

- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat: experience and selected work sections"
```

---

### Task 5: index.html — credentials, education & achievements, contact, footer

**Files:**
- Modify: `index.html` (insert three sections + footer before `</body>`; footer goes after `</main>`)
- Modify: `assets/css/main.css` (append credentials/education/contact blocks)

**Interfaces:**
- Consumes: credential file paths from Task 1 (exact names below).
- Produces: ids `#credentials #contact` referenced by nav.

- [ ] **Step 1: Insert the Credentials section HTML**

```html
    <!-- ===== CREDENTIALS ===== -->
    <section id="credentials" class="section section-dark">
      <div class="container">
        <p class="section-eyebrow text-center reveal">Credentials</p>
        <h2 class="section-title text-center reveal">Certified <em>foundations.</em></h2>
        <div class="cred-grid">
          <div class="cred-group reveal">
            <h3 class="cred-group-title">Machine Learning &amp; Cloud</h3>
            <ul class="cred-list">
              <li><a href="assets/credentials/aws-machine-learning.pdf" target="_blank">Machine Learning Foundations — AWS Academy ↗</a></li>
              <li><a href="assets/credentials/aws-cloud-course.pdf" target="_blank">Cloud Foundations — AWS Academy ↗</a></li>
              <li><a href="assets/credentials/coursera-machine-learning.pdf" target="_blank">Machine Learning — Coursera ↗</a></li>
            </ul>
          </div>
          <div class="cred-group reveal">
            <h3 class="cred-group-title">Generative AI</h3>
            <ul class="cred-list">
              <li><a href="assets/credentials/google-generative-ai-fundamentals.png" target="_blank">Generative AI Fundamentals — Google ↗</a></li>
              <li><a href="assets/credentials/google-intro-llms.png" target="_blank">Introduction to Large Language Models — Google ↗</a></li>
              <li><a href="assets/credentials/google-responsible-ai.png" target="_blank">Introduction to Responsible AI — Google ↗</a></li>
            </ul>
          </div>
          <div class="cred-group reveal">
            <h3 class="cred-group-title">Data Engineering</h3>
            <ul class="cred-list">
              <li><a href="assets/credentials/ibm-big-data-101.pdf" target="_blank">Big Data 101 — IBM ↗</a></li>
              <li><a href="assets/credentials/ibm-spark-bd0211.pdf" target="_blank">Spark Fundamentals — IBM ↗</a></li>
              <li><a href="assets/credentials/ibm-hadoop.pdf" target="_blank">Hadoop 101 — IBM ↗</a></li>
            </ul>
          </div>
          <div class="cred-group reveal">
            <h3 class="cred-group-title">Professional &amp; Community</h3>
            <ul class="cred-list">
              <li><a href="assets/credentials/microsoft-linkedin-business-analysis.pdf" target="_blank">Career Essentials in Business Analysis — Microsoft × LinkedIn ↗</a></li>
              <li><a href="assets/credentials/scaler-dsa.png" target="_blank">Data Structures &amp; Algorithms — Scaler ↗</a></li>
              <li><a href="assets/credentials/gdsc-google-developer.pdf" target="_blank">Google Developer Student Clubs — Member ↗</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Insert the Education & Achievements section HTML**

```html
    <!-- ===== EDUCATION & ACHIEVEMENTS ===== -->
    <section id="education" class="section">
      <div class="container">
        <div class="edu-grid">
          <div class="reveal">
            <p class="section-eyebrow">Education</p>
            <h2 class="section-title">RV <em>University.</em></h2>
            <p class="body-text">
              <strong>B.Tech (Hons.) Computer Science</strong> — Major in AI/ML, Minor in
              Fintech. Bangalore, India · Expected 2027 · CGPA 7.8/10.
            </p>
            <p class="body-text">Core strengths: Data Structures &amp; Algorithms, OOP, DBMS, Operating Systems.</p>
          </div>
          <div class="reveal">
            <p class="section-eyebrow">Achievements</p>
            <ul class="ach-list">
              <li><strong>Best Project Award</strong> (Structural Innovation) — RV University</li>
              <li><strong>IEEE CCEM 2024</strong> — paper presenter
                <a href="assets/credentials/ieee-ccem-2024.pdf" target="_blank">certificate ↗</a></li>
              <li><strong>116 LeetCode problems</strong> solved — 64 Medium · 13 Hard
                <a href="https://leetcode.com/u/Ayon_Aryan/" target="_blank">profile ↗</a></li>
              <li><strong>Geo GPS Camera</strong> — 100+ installs on Google Play</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 3: Insert the Contact section + footer HTML (contact inside `<main>`, footer after `</main>`)**

```html
    <!-- ===== CONTACT ===== -->
    <section id="contact" class="section section-dark">
      <div class="container text-center">
        <p class="section-eyebrow reveal">Contact</p>
        <h2 class="section-title reveal">Let's build<br /><em>something real.</em></h2>
        <p class="body-text reveal">
          Open to internship and new-grad opportunities in AI/ML engineering, backend and
          Android. Fastest way to reach me is email.
        </p>
        <div class="contact-actions reveal">
          <a class="btn-gold" href="mailto:ayonaryan5@gmail.com">ayonaryan5@gmail.com</a>
          <a class="btn-ghost" href="tel:+917991126269">+91 79911 26269</a>
        </div>
        <div class="contact-links reveal">
          <a href="https://www.linkedin.com/in/ayon-aryan-917078238/" target="_blank">LinkedIn</a>
          <a href="https://github.com/AYON-ARYAN" target="_blank">GitHub</a>
          <a href="https://leetcode.com/u/Ayon_Aryan/" target="_blank">LeetCode</a>
        </div>
      </div>
    </section>
```

```html
  <footer class="container">
    <div class="footer">
      <span>© 2026 Ayon Aryan — Bangalore, India</span>
      <div class="footer-links">
        <a href="assets/img/profile/MyCv.pdf" target="_blank">Résumé</a>
        <a href="mailto:ayonaryan5@gmail.com">Email</a>
        <a href="https://github.com/AYON-ARYAN" target="_blank">GitHub</a>
      </div>
    </div>
  </footer>
```

- [ ] **Step 4: Append credentials/education/contact CSS**

```css
/* --- credentials --- */
.cred-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; margin-top: 24px; }
@media (max-width: 820px) { .cred-grid { grid-template-columns: 1fr; } }
.cred-group { border: 1px solid var(--line); background: var(--panel); padding: 30px; }
.cred-group-title { font-family: var(--serif); font-weight: 500; font-size: 1.2rem; color: var(--gold-bright); margin-bottom: 18px; }
.cred-list { list-style: none; display: grid; gap: 12px; }
.cred-list a { color: var(--ink-dim); font-size: .95rem; }
.cred-list a:hover { color: var(--gold-bright); }

/* --- education & achievements --- */
.edu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
@media (max-width: 900px) { .edu-grid { grid-template-columns: 1fr; gap: 40px; } }
.ach-list { list-style: none; display: grid; gap: 16px; color: var(--ink-dim); }
.ach-list strong { color: var(--ink); font-weight: 500; }
.ach-list a { font-size: .85rem; margin-left: 8px; }

/* --- contact --- */
.contact-actions { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; margin: 36px 0 28px; }
.contact-links { display: flex; gap: 28px; justify-content: center; font-size: .85rem; letter-spacing: .14em; text-transform: uppercase; }
```

- [ ] **Step 5: Verify in browser** — full page scroll top-to-bottom: all 7 sections render, every credential link opens its file, nav anchors land on the right sections, mobile menu covers all 5 links, zero console errors.

- [ ] **Step 6: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat: credentials, education, contact sections and footer"
```

---

### Task 6: Restyle the 8 work/*.html case-study pages

**Files:**
- Modify: `work/brain-tumor.html`, `work/database-manager.html`, `work/geo-gps.html`, `work/graphrag.html`, `work/intellichat.html`, `work/legal-ai.html`, `work/super-resolution.html`, `work/voice-ai.html`
- Modify: `assets/css/main.css` (append `case-*` styles)

**Interfaces:**
- Consumes: nav/section/button classes from Task 2. Work pages already use `case-hero`, `case-title`, `case-subtitle`, `case-meta`, `case-meta-item`, `case-meta-label`, `case-meta-value`, `back-link`, `section-eyebrow` — the new CSS must style these same class names so page content is preserved.

- [ ] **Step 1: Strip vendor references from all 8 pages**

In every `work/*.html`, delete these elements (exact matches to find):
- `<link>` tags referencing `../assets/vendor/bootstrap/`, `../assets/vendor/bootstrap-icons/`, `../assets/vendor/aos/`, `../assets/vendor/glightbox/`
- `<script>` tags referencing any `../assets/vendor/` path and any inline `AOS.init` blocks
- Replace any `<i class="bi bi-arrow-left"></i>` inside `.back-link` with the text `←`
- Update the nav block in each page to match the Task 3 nav (with `../index.html#...` prefixes for anchors and `../assets/img/profile/MyCv.pdf` for the CTA), and ensure `<script src="../assets/js/main.js"></script>` is the only script before `</body>`.
- Add `class="reveal"` is NOT required on work pages — remove `data-aos` attributes wherever they appear (`data-aos="fade-up"` etc.); leave the elements themselves intact.

Use `grep -rn 'vendor\|data-aos\|AOS\.' work/` afterwards — expected: no matches.

- [ ] **Step 2: Append case-study CSS to `assets/css/main.css`**

```css
/* --- case studies (work/*.html) --- */
.case-hero { padding: 170px 0 70px; border-bottom: 1px solid var(--line);
  background: radial-gradient(900px 400px at 80% -10%, rgba(201,163,92,.10), transparent 60%), var(--bg); }
.back-link { display: inline-block; margin-bottom: 30px; font-size: .82rem; letter-spacing: .14em; text-transform: uppercase; color: var(--ink-dim); }
.back-link:hover { color: var(--gold-bright); }
.case-title { font-family: var(--serif); font-weight: 500; font-size: clamp(2.4rem, 6vw, 4.4rem); line-height: 1.08; margin-bottom: 20px; }
.case-subtitle { color: var(--ink-dim); font-size: 1.05rem; max-width: 62ch; margin-bottom: 40px; }
.case-meta { display: flex; flex-wrap: wrap; gap: 20px 56px; border-top: 1px solid var(--line); padding-top: 26px; }
.case-meta-label { display: block; font-size: .72rem; letter-spacing: .2em; text-transform: uppercase; color: var(--gold); margin-bottom: 6px; }
.case-meta-value { color: var(--ink); font-size: .95rem; }
.case-meta-value a { color: var(--gold-bright); }
/* generic content blocks used inside case pages */
.case-hero + .section h2, main .section h2 { font-family: var(--serif); font-weight: 500; font-size: 1.7rem; margin: 34px 0 14px; }
main .section p, main .section li { color: var(--ink-dim); }
main .section ul { padding-left: 20px; margin-bottom: 16px; }
main .section img { border: 1px solid var(--line); margin: 20px 0; }
```

After appending, open every one of the 8 pages locally and fix any page-specific class that renders unstyled or broken (inspect with DevTools; add a minimal CSS rule for any orphan class you find — do not delete page content).

- [ ] **Step 3: Verify** — open all 8 work pages at `http://localhost:8080/work/<name>.html`: nav works, back-link returns to `index.html#work`, typography matches the new identity, no console errors, `grep -rn 'vendor\|data-aos' work/` returns nothing.

- [ ] **Step 4: Commit**

```bash
git add work/ assets/css/main.css
git commit -m "feat: restyle case-study pages to new identity, drop vendor libs"
```

---

### Task 7: Vendor cleanup + full verification pass

**Files:**
- Delete: `assets/vendor/` (only if unreferenced), `assets/scss/`, unused images
- Verify: whole site

- [ ] **Step 1: Confirm vendor dirs are unreferenced, then delete**

```bash
grep -rn "vendor" index.html work/ assets/js/ assets/css/   # expected: no matches
git rm -r assets/vendor assets/scss
```

If grep finds matches, fix those references first — do not delete while referenced.

- [ ] **Step 2: Link + asset audit**

```bash
# every local href/src in index.html and work pages must exist on disk
grep -ohE '(href|src)="[^"#]*"' index.html work/*.html \
  | sed -E 's/(href|src)="//; s/"$//' \
  | grep -v '^https\?://' | grep -v '^mailto:' | grep -v '^tel:' | sort -u \
  | while read -r p; do
      base="${p#../}"
      [ -f "$base" ] || echo "MISSING: $p"
    done
```

Expected output: nothing. (Run from repo root; `work/*.html` paths are `../`-relative, hence the strip.)

- [ ] **Step 3: Browser verification matrix**

Using Chrome DevTools MCP or Playwright against `http://localhost:8080/`:
- index.html at 375, 768, 1440 px — screenshot each; no horizontal scroll, no overlap.
- Every nav anchor scrolls to the right section; mobile menu opens/closes.
- Résumé opens `assets/img/profile/MyCv.pdf`; all 15 credential links open.
- All 6 work cards navigate; all 8 work pages render clean.
- Console: zero errors on every page.

- [ ] **Step 4: Lighthouse audit**

Run Lighthouse (Chrome DevTools MCP `lighthouse_audit`) on `http://localhost:8080/`.
Expected: Performance ≥ 90, SEO ≥ 90, Accessibility ≥ 90. Fix flagged issues (missing alt text, contrast, unsized images) and re-run until met.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove unused vendor libraries; verification fixes"
```

- [ ] **Step 6: Present to user**

Show the user before/after screenshots and the Lighthouse scores. Ask explicitly whether to merge `redesign-2026-07` into the default branch and push to GitHub Pages. **Do not push without confirmation.**
