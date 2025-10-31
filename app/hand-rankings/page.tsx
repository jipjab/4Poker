'use client'

import Link from 'next/link'
import { AdPlacement } from '@/components/AdPlacement'
import { PokerHand } from '@/components/PokerCard'

export default function HandRankingsPage() {
  return (
    <main className="min-h-screen p-3 sm:p-4 md:p-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <Link
              href="/"
              className="cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-md"
              aria-label="Go to home page"
              tabIndex={0}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                AllInTimer
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-1">
                Free Poker Tournament Timer
              </p>
            </Link>
          </div>
          <div className="flex gap-2 sm:gap-3 items-center">
            <Link
              href="/"
              className="px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] sm:min-h-[44px] bg-gray-600 hover:bg-gray-600 active:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-xs sm:text-sm flex items-center justify-center"
              aria-label="Go to home page"
              tabIndex={0}
            >
              Home
            </Link>
            <Link
              href="/rules"
              className="px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] sm:min-h-[44px] bg-gray-600 hover:bg-gray-600 active:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-xs sm:text-sm flex items-center justify-center"
              aria-label="View poker rules"
              tabIndex={0}
            >
              Rules
            </Link>
            <Link
              href="/hand-rankings"
              className="px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] sm:min-h-[44px] bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 text-xs sm:text-sm flex items-center justify-center"
              aria-label="View hand rankings"
              tabIndex={0}
            >
              Hand Rankings
            </Link>
          </div>
        </header>

        {/* Page Title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            Texas Hold&apos;Em Hand Rankings
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Understand the winning hands in poker, from Royal Flush to High Card.
          </p>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-xl p-6 sm:p-8 border border-gray-700 shadow-xl">
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-8">
            Hands are ranked from highest to lowest. If two players have the same type of hand, 
            the hand with the higher-ranked cards wins. In Texas Hold&apos;Em, you can use both, 
            one, or neither of your hole cards in combination with the five community cards to make your best hand.
          </p>

          <div className="space-y-3">
            <div className="bg-gradient-to-r from-yellow-900/30 to-yellow-800/20 rounded-lg p-5 sm:p-6 border border-yellow-700/50">
              <div className="flex items-start gap-4">
                <span className="text-3xl sm:text-4xl font-bold text-yellow-400 flex-shrink-0">1</span>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">Royal Flush</h3>
                  <p className="text-gray-300 text-sm sm:text-base mb-3">
                    A, K, Q, J, 10, all of the same suit. This is the highest possible hand in poker.
                  </p>
                  <div className="mt-4">
                    <PokerHand cards={[
                      { rank: 'A', suit: '♠' },
                      { rank: 'K', suit: '♠' },
                      { rank: 'Q', suit: '♠' },
                      { rank: 'J', suit: '♠' },
                      { rank: '10', suit: '♠' }
                    ]} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-900/30 to-red-800/20 rounded-lg p-5 sm:p-6 border border-red-700/50">
              <div className="flex items-start gap-4">
                <span className="text-3xl sm:text-4xl font-bold text-red-400 flex-shrink-0">2</span>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-red-400 mb-2">Straight Flush</h3>
                  <p className="text-gray-300 text-sm sm:text-base mb-3">
                    Five consecutive cards of the same suit. The highest straight flush wins in ties.
                  </p>
                  <div className="mt-4">
                    <PokerHand cards={[
                      { rank: '7', suit: '♥' },
                      { rank: '8', suit: '♥' },
                      { rank: '9', suit: '♥' },
                      { rank: '10', suit: '♥' },
                      { rank: 'J', suit: '♥' }
                    ]} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/20 rounded-lg p-5 sm:p-6 border border-purple-700/50">
              <div className="flex items-start gap-4">
                <span className="text-3xl sm:text-4xl font-bold text-purple-400 flex-shrink-0">3</span>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-purple-400 mb-2">Four of a Kind</h3>
                  <p className="text-gray-300 text-sm sm:text-base mb-3">
                    Four cards of the same rank. The higher rank wins in ties. Also known as &quot;Quads.&quot;
                  </p>
                  <div className="mt-4">
                    <PokerHand cards={[
                      { rank: 'K', suit: '♠' },
                      { rank: 'K', suit: '♥' },
                      { rank: 'K', suit: '♦' },
                      { rank: 'K', suit: '♣' },
                      { rank: '7', suit: '♠' }
                    ]} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 rounded-lg p-5 sm:p-6 border border-blue-700/50">
              <div className="flex items-start gap-4">
                <span className="text-3xl sm:text-4xl font-bold text-blue-400 flex-shrink-0">4</span>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-2">Full House</h3>
                  <p className="text-gray-300 text-sm sm:text-base mb-3">
                    Three cards of one rank and two cards of another rank. The three-of-a-kind determines the winner in ties.
                  </p>
                  <div className="mt-4">
                    <PokerHand cards={[
                      { rank: 'Q', suit: '♠' },
                      { rank: 'Q', suit: '♥' },
                      { rank: 'Q', suit: '♦' },
                      { rank: '5', suit: '♣' },
                      { rank: '5', suit: '♠' }
                    ]} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/30 to-green-800/20 rounded-lg p-5 sm:p-6 border border-green-700/50">
              <div className="flex items-start gap-4">
                <span className="text-3xl sm:text-4xl font-bold text-green-400 flex-shrink-0">5</span>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-green-400 mb-2">Flush</h3>
                  <p className="text-gray-300 text-sm sm:text-base mb-3">
                    Any five cards of the same suit, not in sequence. The highest card determines the winner in ties.
                  </p>
                  <div className="mt-4">
                    <PokerHand cards={[
                      { rank: 'A', suit: '♠' },
                      { rank: '9', suit: '♠' },
                      { rank: '7', suit: '♠' },
                      { rank: '4', suit: '♠' },
                      { rank: '2', suit: '♠' }
                    ]} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-900/30 to-indigo-800/20 rounded-lg p-5 sm:p-6 border border-indigo-700/50">
              <div className="flex items-start gap-4">
                <span className="text-3xl sm:text-4xl font-bold text-indigo-400 flex-shrink-0">6</span>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-indigo-400 mb-2">Straight</h3>
                  <p className="text-gray-300 text-sm sm:text-base mb-3">
                    Five consecutive cards of different suits. The highest top card wins in ties. An Ace can be used as high (A-K-Q-J-10) or low (5-4-3-2-A).
                  </p>
                  <div className="mt-4">
                    <PokerHand cards={[
                      { rank: '5', suit: '♠' },
                      { rank: '6', suit: '♥' },
                      { rank: '7', suit: '♦' },
                      { rank: '8', suit: '♣' },
                      { rank: '9', suit: '♠' }
                    ]} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-900/30 to-pink-800/20 rounded-lg p-5 sm:p-6 border border-pink-700/50">
              <div className="flex items-start gap-4">
                <span className="text-3xl sm:text-4xl font-bold text-pink-400 flex-shrink-0">7</span>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-pink-400 mb-2">Three of a Kind</h3>
                  <p className="text-gray-300 text-sm sm:text-base mb-3">
                    Three cards of the same rank. Also known as &quot;Trips&quot; or &quot;Set.&quot; The highest rank wins in ties.
                  </p>
                  <div className="mt-4">
                    <PokerHand cards={[
                      { rank: '7', suit: '♠' },
                      { rank: '7', suit: '♥' },
                      { rank: '7', suit: '♦' },
                      { rank: 'K', suit: '♣' },
                      { rank: '4', suit: '♠' }
                    ]} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-900/30 to-teal-800/20 rounded-lg p-5 sm:p-6 border border-teal-700/50">
              <div className="flex items-start gap-4">
                <span className="text-3xl sm:text-4xl font-bold text-teal-400 flex-shrink-0">8</span>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-teal-400 mb-2">Two Pair</h3>
                  <p className="text-gray-300 text-sm sm:text-base mb-3">
                    Two cards of one rank and two cards of another rank. The highest pair determines the winner in ties. If the highest pairs are equal, the second pair breaks the tie.
                  </p>
                  <div className="mt-4">
                    <PokerHand cards={[
                      { rank: 'A', suit: '♠' },
                      { rank: 'A', suit: '♥' },
                      { rank: '9', suit: '♦' },
                      { rank: '9', suit: '♣' },
                      { rank: '5', suit: '♠' }
                    ]} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-900/30 to-orange-800/20 rounded-lg p-5 sm:p-6 border border-orange-700/50">
              <div className="flex items-start gap-4">
                <span className="text-3xl sm:text-4xl font-bold text-orange-400 flex-shrink-0">9</span>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-orange-400 mb-2">One Pair</h3>
                  <p className="text-gray-300 text-sm sm:text-base mb-3">
                    Two cards of the same rank. The highest pair wins in ties. If pairs are equal, the highest remaining card (kicker) breaks the tie.
                  </p>
                  <div className="mt-4">
                    <PokerHand cards={[
                      { rank: 'J', suit: '♠' },
                      { rank: 'J', suit: '♥' },
                      { rank: '9', suit: '♦' },
                      { rank: '5', suit: '♣' },
                      { rank: '2', suit: '♠' }
                    ]} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-5 sm:p-6 border border-gray-700">
              <div className="flex items-start gap-4">
                <span className="text-3xl sm:text-4xl font-bold text-gray-400 flex-shrink-0">10</span>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-400 mb-2">High Card</h3>
                  <p className="text-gray-300 text-sm sm:text-base mb-3">
                    If no player has a pair or better, the player with the highest card wins. If the highest cards tie, 
                    the next highest card is compared, and so on until a winner is determined.
                  </p>
                  <div className="mt-4">
                    <PokerHand cards={[
                      { rank: 'A', suit: '♠' },
                      { rank: 'K', suit: '♥' },
                      { rank: '9', suit: '♦' },
                      { rank: '5', suit: '♣' },
                      { rank: '2', suit: '♠' }
                    ]} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Advertisement */}
        <footer className="mt-8 space-y-4">
          <AdPlacement size="banner" className="max-w-6xl mx-auto" />
          
          {/* Footer Info */}
          <div className="text-center space-y-3 pb-6">
            <div className="pt-4 border-t border-gray-800">
              <p className="text-xs sm:text-sm text-gray-500">
                © {new Date().getFullYear()} AllInTimer. All rights reserved.
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Free poker tournament timer for home games, tournaments, and poker clubs.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}

