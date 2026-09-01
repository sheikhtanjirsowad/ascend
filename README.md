# Ascend

An **evidence-based** appearance-improvement guide and toolkit (softmaxxing). English only. No pseudoscience, no dangerous trend promotion — everything is cited.

## What it does
- **Assessment** — enter basic stats (sex/age/height/weight/face shape) → BMI, an estimated body-fat range, a face-shape read, and an **ordered action plan** built from the evidence-backed fundamentals.
- **Research guides** — 6 in-depth, cited guides (skin, body composition, sleep/hydration, posture, hair/grooming, nutrition). Each marks claims as Evidence-backed / Uncertain / Debunked.
- **Dangerous & debunked trends** — bonesmashing, adult "mewing," DIY procedures, miracle supplements, fake "ascension scores." Explicitly warned against with reasons.
- **Tools** — Face Shape wizard, Facial Proportion reference (with ethnicity caveat), suggested AM/PM routine.
- **Progress tracker** — daily check-off of the evidence-based habits with a streak counter (localStorage only).
- **Safety & mental health** — body dysmorphic disorder awareness, crisis resources, healthy-relationship framing.

## Data honesty
This site intentionally does **two things rare in this niche**:
1. It cites **real, published sources** for every claim (Mayo Clinic, Cleveland Clinic, AAO, Frontiers in Psychology, Springer/Nature/PMC orthodontics & psychology studies, Healthline).
2. It explicitly **debunks** popular-but-unsupported or dangerous methods instead of promoting them. There are **zero** fabricated "ascension scores," fake tiers, or miracle guarantees.

Nothing here is medical, dental, or surgical advice.

## Files
- `index.html` — structure & content
- `style.css` — theme system (light/dark) + components
- `content.js` — all researched content (guides, debunked, sources, face shapes)
- `app.js` — logic: assessment, calculators, plan generator, modals, progress tracker
- `.nojekyll` — GitHub Pages helper

## Deploy
Static site — no build step. Open `index.html`, or host on any static host (GitHub Pages / Netlify / Vercel). This is the same flow you used for BiduytTracker: upload `index.html`, `style.css`, `script.js` equivalents, `content.js`, `app.js`, `.nojekyll`.

## Roadmap
- Wrap into an Android APK (Capacitor/WebView) after the web build is live.