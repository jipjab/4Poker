'use client'

import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  noindex?: boolean
}

export const SEO = ({
  title,
  description,
  keywords = [],
  canonical,
  ogImage,
  noindex = false,
}: SEOProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://allintimer.com'
  const fullTitle = title ? `${title} | AllInTimer` : 'AllInTimer - Free Poker Tournament Timer'
  const fullDescription = description || 'A free, mobile-friendly poker tournament blind timer with customizable levels, auto-advance, and professional tournament management.'
  const canonicalUrl = canonical || baseUrl
  const imageUrl = ogImage || `${baseUrl}/og-image.png`

  return (
    <>
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta name="description" content={fullDescription} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'AllInTimer',
            applicationCategory: 'EntertainmentApplication',
            operatingSystem: 'Web',
            description: fullDescription,
            url: baseUrl,
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '127',
            },
          }),
        }}
      />
    </>
  )
}

