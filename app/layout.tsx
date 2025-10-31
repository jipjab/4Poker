import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PokerTimer - Free Poker Tournament Timer',
  description: 'A free, mobile-friendly poker tournament blind timer with customizable levels, auto-advance, and professional tournament management.',
  keywords: ['poker timer', 'tournament timer', 'blind timer', 'poker tournament', 'blind levels'],
  authors: [{ name: 'PokerTimer' }],
  openGraph: {
    title: 'PokerTimer - Free Poker Tournament Timer',
    description: 'Manage your poker tournaments with ease. Customizable blind levels, automatic progression, and mobile-friendly design.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  )
}

