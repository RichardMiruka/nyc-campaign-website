# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 14 (App Router)** static campaign website for Richard Miruka's National Youth Council 2026 candidacy. The site exports as static files for Vercel deployment.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + custom CSS variables
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Bebas Neue (display), Playfair Display (serif), DM Sans (body)
- **Deployment**: Vercel (static export via `vercel.json`)

## Common Commands

```bash
npm install          # Install dependencies
npm run dev         # Start dev server at http://localhost:3000
npm run build       # Build static export to /out folder
npm run lint        # Run ESLint
npm run start       # Start production server
```

## Architecture

This is a **single-page application** with all content in `app/page.tsx`. The structure is straightforward:

- `app/layout.tsx` - Root layout with metadata
- `app/page.tsx` - Main campaign page (all sections)
- `app/globals.css` - Global styles and CSS variables
- `app/fonts/` - Self-hosted font files (Geist)
- `public/` - Static assets (manifesto.pdf, images)
- `tailwind.config.ts` - Custom colors (green-deep, green-mid, gold, navy) and fonts

## Key Content Areas

The main page contains these sections (defined as constants in `page.tsx`):
- **HERO** - Campaign branding with headline and call-to-action
- **ABOUT** - Candidate biography
- **MANIFESTO** - Policy priorities with PDF download
- **EVENTS** - Campaign events schedule
- **TESTIMONIALS** - Video testimonials with Google Drive links
- **CONTACT** - Contact information and social media

## Updating Content

To modify campaign content, edit the constants in `app/page.tsx`:
- `CANDIDATE_INFO` - Name, tagline, biography
- `MANIFESTO_ITEMS` - Policy priorities
- `EVENTS` - Campaign events
- `TESTIMONIALS` - Video URLs (Google Drive share links)
- Contact details in the Contact section

The manifesto PDF is located at `public/manifesto.pdf`.

## Static Export Configuration

The `vercel.json` configures static export for Vercel deployment. The site builds to the `/out` directory.