'use client'

import Link from 'next/link'
import { AdPlacement } from '@/components/AdPlacement'
import { PokerHand } from '@/components/PokerCard'
import { LogoTimerChip } from '@/components/Logo'

export default function HandRankingsPage() {
  return (
    <main className="min-h-screen p-2 sm:p-3 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3 mb-2 flex-shrink-0">
          <Link
            href="/"
            className="cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-md"
            aria-label="Go to home page"
            tabIndex={0}
          >
            <div className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-600 rounded-lg">
              {/* Slit border decorative corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-blue-500 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-blue-500 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-blue-500 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-blue-500 rounded-br-lg"></div>
              
              <LogoTimerChip size="sm" className="flex-shrink-0" />
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
                  <span className="text-white">All</span><span className="text-blue-400">in</span><span className="text-white">Timer</span>
                </h1>
                <p className="text-xs text-gray-400">
                  Free Poker Tournament Timer
                </p>
              </div>
            </div>
          </Link>
          <div className="flex gap-2 sm:gap-3 items-center">
            <Link
              href="/"
              className="px-2 sm:px-3 py-1.5 sm:py-2 min-h-[36px] sm:min-h-[40px] bg-gray-600 hover:bg-gray-600 active:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-xs flex items-center justify-center"
              aria-label="Go to home page"
              tabIndex={0}
            >
              Home
            </Link>
            <Link
              href="/rules"
              className="px-2 sm:px-3 py-1.5 sm:py-2 min-h-[36px] sm:min-h-[40px] bg-gray-600 hover:bg-gray-600 active:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-xs flex items-center justify-center"
              aria-label="View poker rules"
              tabIndex={0}
            >
              Rules
            </Link>
            <Link
              href="/hand-rankings"
              className="px-2 sm:px-3 py-1.5 sm:py-2 min-h-[36px] sm:min-h-[40px] bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 text-xs flex items-center justify-center"
              aria-label="View hand rankings"
              tabIndex={0}
            >
              Hand Rankings
            </Link>
          </div>
        </header>

        {/* Page Title */}
        <div className="mb-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
            Texas Hold&apos;Em Hand Rankings
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm">
            Understand the winning hands in poker, from Royal Flush to High Card.
          </p>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-xl p-3 sm:p-4 border border-gray-700 shadow-xl">
          <p className="text-gray-300 leading-relaxed text-xs sm:text-sm mb-4">
            Hands are ranked from highest to lowest. If two players have the same type of hand, 
            the hand with the higher-ranked cards wins. In Texas Hold&apos;Em, you can use both, 
            one, or neither of your hole cards in combination with the five community cards to make your best hand.
          </p>

          <div className="space-y-2">
            <div className="bg-gradient-to-r from-yellow-900/30 to-yellow-800/20 rounded-lg p-3 sm:p-4 border border-yellow-700/50">
              <div className="flex items-start gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-yellow-400 flex-shrink-0">1</span>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-1">Royal Flush</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-2">
                    A, K, Q, J, 10, all of the same suit. This is the highest possible hand in poker.
                  </p>
                  <div className="mt-2">
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

            <div className="bg-gradient-to-r from-red-900/30 to-red-800/20 rounded-lg p-3 sm:p-4 border border-red-700/50">
              <div className="flex items-start gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-red-400 flex-shrink-0">2</span>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-red-400 mb-2">Straight Flush</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-2">
                    Five consecutive cards of the same suit. The highest straight flush wins in ties.
                  </p>
                  <div className="mt-2">
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

            <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/20 rounded-lg p-3 sm:p-4 border border-purple-700/50">
              <div className="flex items-start gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-purple-400 flex-shrink-0">3</span>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-purple-400 mb-2">Four of a Kind</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-2">
                    Four cards of the same rank. The higher rank wins in ties. Also known as &quot;Quads.&quot;
                  </p>
                  <div className="mt-2">
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

            <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 rounded-lg p-3 sm:p-4 border border-blue-700/50">
              <div className="flex items-start gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-blue-400 flex-shrink-0">4</span>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-2">Full House</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-2">
                    Three cards of one rank and two cards of another rank. The three-of-a-kind determines the winner in ties.
                  </p>
                  <div className="mt-2">
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

            <div className="bg-gradient-to-r from-green-900/30 to-green-800/20 rounded-lg p-3 sm:p-4 border border-green-700/50">
              <div className="flex items-start gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-green-400 flex-shrink-0">5</span>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-green-400 mb-2">Flush</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-2">
                    Any five cards of the same suit, not in sequence. The highest card determines the winner in ties.
                  </p>
                  <div className="mt-2">
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

            <div className="bg-gradient-to-r from-indigo-900/30 to-indigo-800/20 rounded-lg p-3 sm:p-4 border border-indigo-700/50">
              <div className="flex items-start gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-indigo-400 flex-shrink-0">6</span>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-indigo-400 mb-2">Straight</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-2">
                    Five consecutive cards of different suits. The highest top card wins in ties. An Ace can be used as high (A-K-Q-J-10) or low (5-4-3-2-A).
                  </p>
                  <div className="mt-2">
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

            <div className="bg-gradient-to-r from-pink-900/30 to-pink-800/20 rounded-lg p-3 sm:p-4 border border-pink-700/50">
              <div className="flex items-start gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-pink-400 flex-shrink-0">7</span>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-pink-400 mb-2">Three of a Kind</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-2">
                    Three cards of the same rank. Also known as &quot;Trips&quot; or &quot;Set.&quot; The highest rank wins in ties.
                  </p>
                  <div className="mt-2">
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

            <div className="bg-gradient-to-r from-teal-900/30 to-teal-800/20 rounded-lg p-3 sm:p-4 border border-teal-700/50">
              <div className="flex items-start gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-teal-400 flex-shrink-0">8</span>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-teal-400 mb-2">Two Pair</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-2">
                    Two cards of one rank and two cards of another rank. The highest pair determines the winner in ties. If the highest pairs are equal, the second pair breaks the tie.
                  </p>
                  <div className="mt-2">
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

            <div className="bg-gradient-to-r from-orange-900/30 to-orange-800/20 rounded-lg p-3 sm:p-4 border border-orange-700/50">
              <div className="flex items-start gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-orange-400 flex-shrink-0">9</span>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-orange-400 mb-2">One Pair</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-2">
                    Two cards of the same rank. The highest pair wins in ties. If pairs are equal, the highest remaining card (kicker) breaks the tie.
                  </p>
                  <div className="mt-2">
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

            <div className="bg-gray-900/50 rounded-lg p-3 sm:p-4 border border-gray-700">
              <div className="flex items-start gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-gray-400 flex-shrink-0">10</span>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-400 mb-1">High Card</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-2">
                    If no player has a pair or better, the player with the highest card wins. If the highest cards tie, 
                    the next highest card is compared, and so on until a winner is determined.
                  </p>
                  <div className="mt-2">
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

        {/* Footer Banner Ad */}
        <footer className="mt-2 space-y-1 flex-shrink-0">
          <AdPlacement size="banner" className="max-w-4xl mx-auto" />
          
          {/* Footer Info */}
          <div className="text-center space-y-1 pb-1">
            <div className="text-xs text-gray-400">
              <p>
                Tournament: <span className="font-semibold text-gray-300">Hand Rankings</span>
              </p>
            </div>
            
            {/* Copyright */}
            <div className="pt-1 border-t border-gray-800">
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} AllInTimer. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}

