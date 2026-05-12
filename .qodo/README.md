# Richard Miruka — NYC 2026 Campaign Website

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Custom CSS
- **Fonts**: Bebas Neue (display), Playfair Display (serif), DM Sans (body)
- **Deployment**: Vercel (static export)

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploy to Vercel

### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel              # follow prompts
vercel --prod       # production deploy
```

### Option 2: GitHub + Vercel Dashboard
1. Push this repo to GitHub
2. Go to vercel.com → New Project → Import your repo
3. Vercel auto-detects Next.js — click Deploy
4. Done in ~2 minutes

## Connect Your Domain
1. In Vercel Dashboard → your project → Settings → Domains
2. Add `richardmiruka.co.ke` (or your domain)
3. Update your domain DNS: add a CNAME record pointing to `cname.vercel-dns.com`
4. SSL is automatic

## Update Testimonial Videos
In `app/page.tsx`, find the `TESTIMONIALS` array.
Replace each `videoUrl: "https://drive.google.com/your-video-link-N"` with your real Google Drive share links.

## Update Contact Details
In `app/page.tsx`, update:
- Phone number in the Contact section
- Social media handles (Twitter/X, Instagram, TikTok)
- Email address

## Add Manifesto PDF
Place your manifesto PDF at `public/manifesto.pdf`
The download button will automatically work.

## Build for Production
```bash
npm run build      # generates /out folder
```
