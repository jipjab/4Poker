import type { Metadata } from 'next'
import './globals.css'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://allintimer.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'AllInTimer - Free Poker Tournament Timer',
    template: '%s | AllInTimer',
  },
  description: 'A free, mobile-friendly poker tournament blind timer with customizable levels, auto-advance, breaks, level jumps, and professional tournament management. Perfect for home games, tournaments, and poker clubs.',
  keywords: [
    'poker timer',
    'tournament timer',
    'blind timer',
    'poker tournament',
    'blind levels',
    'texas holdem timer',
    'poker clock',
    'tournament clock',
    'free poker timer',
    'poker blind structure',
  ],
  authors: [{ name: 'AllInTimer' }],
  creator: 'AllInTimer',
  publisher: 'AllInTimer',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'AllInTimer',
    title: 'AllInTimer - Free Poker Tournament Timer',
    description: 'Manage your poker tournaments with ease. Customizable blind levels, automatic progression, breaks, and mobile-friendly design. Perfect for home games and tournaments.',
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'AllInTimer - Free Poker Tournament Timer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AllInTimer - Free Poker Tournament Timer',
    description: 'Free, mobile-friendly poker tournament timer with customizable blind levels and automatic progression.',
    images: [`${baseUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes when you set up Google Search Console
    // google: 'your-google-verification-code',
  },
  alternates: {
    canonical: baseUrl,
  },
  category: 'entertainment',
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

