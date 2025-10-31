import { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://allintimer.com'

export const metadata: Metadata = {
  title: 'Texas Hold\'Em Hand Rankings',
  description: 'Complete guide to poker hand rankings from Royal Flush to High Card. Learn the winning hands in Texas Hold\'Em with visual card examples and detailed descriptions.',
  keywords: [
    'poker hand rankings',
    'hand rankings',
    'poker hands',
    'royal flush',
    'straight flush',
    'poker hand hierarchy',
    'winning poker hands',
  ],
  openGraph: {
    title: 'Texas Hold\'Em Hand Rankings | AllInTimer',
    description: 'Complete guide to poker hand rankings. Learn Royal Flush, Straight Flush, Four of a Kind, and all poker hands with visual examples.',
    url: `${baseUrl}/hand-rankings`,
    type: 'article',
  },
  alternates: {
    canonical: `${baseUrl}/hand-rankings`,
  },
}

export default function HandRankingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

