'use client'

interface PokerCardProps {
  rank: string
  suit: string
  className?: string
}

const suitSymbols: Record<string, { symbol: string; color: string }> = {
  '♠': { symbol: '♠', color: 'text-gray-900' },
  '♥': { symbol: '♥', color: 'text-red-600' },
  '♦': { symbol: '♦', color: 'text-red-600' },
  '♣': { symbol: '♣', color: 'text-gray-900' },
}

export const PokerCard = ({ rank, suit, className = '' }: PokerCardProps) => {
  const suitInfo = suitSymbols[suit] || { symbol: suit, color: 'text-gray-900' }

  return (
    <div
      className={`flex flex-col items-center justify-center bg-white rounded-lg shadow-lg border-2 border-gray-300 w-16 h-20 sm:w-20 sm:h-28 md:w-24 md:h-32 ${className}`}
    >
      <div className={`text-lg sm:text-xl md:text-2xl font-bold ${suitInfo.color}`}>
        {rank}
      </div>
      <div className={`text-xl sm:text-2xl md:text-3xl ${suitInfo.color}`}>
        {suitInfo.symbol}
      </div>
    </div>
  )
}

interface PokerHandProps {
  cards: Array<{ rank: string; suit: string }>
  className?: string
}

export const PokerHand = ({ cards, className = '' }: PokerHandProps) => {
  return (
    <div className={`flex gap-2 sm:gap-3 md:gap-4 flex-wrap items-center ${className}`}>
      {cards.map((card, index) => (
        <PokerCard key={index} rank={card.rank} suit={card.suit} />
      ))}
    </div>
  )
}

