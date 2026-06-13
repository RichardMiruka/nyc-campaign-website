import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Richard Miruka | National Youth Council 2026',
  description: 'Richard Miruka for National Youth Council 2026. Software Engineer, ICT Instructor and Youth Leader running from Makina Ward, Kibra. Youth Voice. Youth Power. Better Tomorrow.',
  keywords: ['Richard Miruka', 'National Youth Council', 'NYC 2026', 'Makina Ward', 'Kibra', 'Youth Kenya'],
  openGraph: {
    title: 'Richard Miruka | National Youth Council 2026',
    description: 'Youth Voice. Youth Power. Better Tomorrow. — Richard Miruka for NYC 2026',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0D1B40',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="noise-overlay">
      <body className="bg-[#0D1B40]">{children}</body>
    </html>
  )
}