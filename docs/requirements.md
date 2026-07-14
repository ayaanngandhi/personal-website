# Personal Website — Requirements

## Overview
Portfolio site for Ayaan Gandhi at ayaanngandhi.in. Static Next.js site deployed to Cloudflare Pages.

## Tech Stack
- Next.js + Tailwind CSS + Framer Motion + Lucide icons
- Dark mode (default) + light mode toggle
- Cloudflare Pages (free hosting)

## Pages

### Home (`/`)
- Hero: name, "Jack of all trades, master of some." highlighted tagline
- Location: Faridabad, India
- Quick links: GitHub, Twitter, Email
- Animated gradient or subtle effect (Framer Motion)

### About (`/about`)
- Bio: self-taught programmer, AI/ML enthusiast, Class 10 student
- Skills list: Python (fluent), TypeScript, React, Next.js, FastAPI, Gemini API, Kotlin
- Timeline (professional only):
  - Started programming (Python)
  - Class 10 CBSE (2026)
  - Built Cellestina — first full-stack project
  - Expanded to Next.js, TypeScript, FastAPI
  - Built VideoBot, CodeVode, EchoFrame (2026)
  - Launched ayaanngandhi.in

### Projects (`/projects`)
Showcase all projects with descriptions. Two categories:

**Local Projects:**
- Cellestina — E-commerce store for bracelets & pendants. Next.js + FastAPI + Gemini chatbot.
- VideoBot — Automated content pipeline for Instagram & YouTube. Reddit story narration + video posting.
- CodeVode — OTP sharing platform. Expo mobile app + FastAPI backend + Supabase.
- EchoFrame — (describe)
- MomoAI — (describe)
- Grocify — (describe)
- Ludo — (describe)
- Android Downloader (Zingy) — Kotlin app to download videos via yt-dlp
- KittenTTS — TTS experiments

**GitHub Projects:**
- api-hunter — JavaScript tool for API discovery
- internal-apis-guide — Guide to reverse-engineering website internal APIs for AI agents
- Zingy-Downloader — Android app + website for video downloads using yt-dlp
- Rustchain — Blockchain protocol with Proof-of-Antiquity consensus
- librepods — AirPods liberated from Apple ecosystem (Kotlin)

### Blog (`/blog`)
- Placeholder section. "Coming soon."

### Contact
- GitHub: github.com/ayaanngandhi
- Twitter/X: x.com/ayaanngandhi
- Email: ayaangandhi2011@gmail.com

## Design
- Developer/terminal aesthetic
- Dark default, light mode toggle
- Framer Motion page transitions + scroll reveals
- Lucide icons
- Responsive
- No personal details in timeline (only career/dev milestones)

## Data
- Static JSON for projects, skills, timeline
- No backend, no database, no auth
