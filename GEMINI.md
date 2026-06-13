# GEMINI.md — Richard Miruka NYC 2026 Campaign Website

This file provides instructional context for Gemini CLI when working with this repository.

## Project Overview
A high-performance, visually polished campaign website for **Richard Miruka's National Youth Council (NYC) 2026** candidacy. 

- **Framework**: Next.js 14 (App Router)
- **Architecture**: Single Page Application (SPA) with static export.
- **Styling**: Tailwind CSS + Framer Motion for animations.
- **Type**: TypeScript
- **Deployment**: Vercel (Static Export to `/out`)

## Building and Running
| Command | Action |
| :--- | :--- |
| `npm install` | Install all dependencies. |
| `npm run dev` | Start the development server at `http://localhost:3000`. |
| `npm run build` | Generate a static production build in the `/out` directory. |
| `npm run lint` | Run ESLint to check for code quality issues. |
| `npm run start` | Start a production server (standard Next.js behavior, though static export is preferred). |

## Development Conventions

### Architecture & State
- **Main Entry Point**: Most of the site's content and logic resides in `app/page.tsx`. 
- **Content Management**: Update the constants at the top of `app/page.tsx` (e.g., `NAV_LINKS`, `STATS`, `PILLARS`, `TESTIMONIALS`) to change site content.
- **Client Components**: `app/page.tsx` is a client component (`"use client"`) to support Framer Motion and intersection observers.
- **Layout**: `app/layout.tsx` handles global metadata, viewport settings, and the base HTML/Body structure.

### Styling & UI
- **Custom Theme**: Use the brand colors defined in `tailwind.config.ts`:
  - `navy`: `#0D1B40` (Primary background)
  - `green-deep`: `#1A5C38` (Secondary background/accent)
  - `gold`: `#D4A017` (Primary accent/shimmer)
- **Fonts**:
  - `display`: Bebas Neue (Headings)
  - `serif`: Playfair Display (Quotes/Vision)
  - `sans`: DM Sans (Body text)
- **Icons**: Use `lucide-react`.

### Static Assets
- **Manifesto**: The campaign manifesto is served from `public/manifesto.pdf`.
- **Images**: Profile images and logos are located in `public/`.
- **Fonts**: Custom Geist font files are in `app/fonts/`.

### Deployment Flow
- The project uses `output: 'export'` in `next.config.mjs`.
- Vercel deployment is configured via `vercel.json` to handle the static output and routing.

## Key Files
- `app/page.tsx`: The "everything" file for the landing page.
- `app/globals.css`: Global styles, including the "noise" overlay and flag stripes.
- `tailwind.config.ts`: Defines the brand identity system.
- `next.config.mjs`: Configures the static export.
- `README.md`: Contains basic setup and deployment instructions.
- `CLAUDE.md`: Similar context for other AI assistants.
