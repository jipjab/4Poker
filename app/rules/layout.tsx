import { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://allintimer.com'

export const metadata: Metadata = {
  title: 'Texas Hold\'Em Poker Rules',
  description: 'Learn the basics of Texas Hold\'Em poker including setup, betting rounds, showdown rules, and hand rankings. Comprehensive guide for beginners and experienced players.',
  keywords: [
    'texas holdem rules',
    'poker rules',
    'how to play poker',
    'poker betting rules',
    'texas holdem guide',
    'poker hand rankings',
    'poker basics',
  ],
  openGraph: {
    title: 'Texas Hold\'Em Poker Rules | AllInTimer',
    description: 'Learn the basics of Texas Hold\'Em poker. Complete guide covering setup, betting rounds, showdown, and hand rankings.',
    url: `${baseUrl}/rules`,
    type: 'article',
  },
  alternates: {
    canonical: `${baseUrl}/rules`,
  },
}

export default function RulesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

