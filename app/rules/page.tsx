'use client'

import Link from 'next/link'
import { AdPlacement } from '@/components/AdPlacement'

export default function RulesPage() {
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
                PokerTimer
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
              className="px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] sm:min-h-[44px] bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 text-xs sm:text-sm flex items-center justify-center"
              aria-label="View poker rules"
              tabIndex={0}
            >
              Rules
            </Link>
            <Link
              href="/hand-rankings"
              className="px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] sm:min-h-[44px] bg-gray-600 hover:bg-gray-600 active:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-xs sm:text-sm flex items-center justify-center"
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
            Texas Hold&apos;Em Poker Rules
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Learn the basics of Texas Hold&apos;Em poker
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 sm:space-y-8">
          {/* Overview */}
          <section className="bg-gray-800 rounded-xl p-6 sm:p-8 border border-gray-700 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Game Overview
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Texas Hold&apos;Em is the most popular form of poker. Each player receives two private cards (hole cards) 
              and shares five community cards with all players. The goal is to make the best five-card hand using 
              any combination of your two hole cards and the five community cards, or by betting in a way that 
              makes all opponents fold.
            </p>
          </section>

          {/* Setup */}
          <section className="bg-gray-800 rounded-xl p-6 sm:p-8 border border-gray-700 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Setup
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Players</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Texas Hold&apos;Em can be played with 2 to 10 players at a single table.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Blinds</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-2">
                  Before each hand, two forced bets are posted:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base ml-4">
                  <li><span className="font-semibold text-white">Small Blind:</span> Posted by the player to the left of the dealer, typically half the minimum bet.</li>
                  <li><span className="font-semibold text-white">Big Blind:</span> Posted by the player to the left of the small blind, equal to the minimum bet.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Dealer Button</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  A marker (dealer button) rotates clockwise after each hand, indicating the dealer position. 
                  The blinds are posted relative to this button position.
                </p>
              </div>
            </div>
          </section>

          {/* Betting Rounds */}
          <section className="bg-gray-800 rounded-xl p-6 sm:p-8 border border-gray-700 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Betting Rounds
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  1. Pre-Flop
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-2">
                  After receiving two hole cards (dealt face down), the first betting round begins. Action starts 
                  with the player to the left of the big blind and proceeds clockwise.
                </p>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Players can <span className="font-semibold text-white">fold</span> (discard their hand), 
                  <span className="font-semibold text-white"> call</span> (match the big blind), or 
                  <span className="font-semibold text-white"> raise</span> (increase the bet).
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-xl font-semibold text-green-400 mb-2">
                  2. The Flop
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  After the pre-flop betting round, the dealer burns one card (removes it from play) and deals 
                  three community cards face up in the center of the table. This is called &quot;the flop.&quot; Another 
                  betting round follows, starting with the player to the left of the dealer button.
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-xl font-semibold text-blue-400 mb-2">
                  3. The Turn
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  After the flop betting round, the dealer burns another card and deals a fourth community card 
                  (the &quot;turn&quot; or &quot;fourth street&quot;). A third betting round follows.
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-xl font-semibold text-purple-400 mb-2">
                  4. The River
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  After the turn betting round, the dealer burns one more card and deals the fifth and final 
                  community card (the &quot;river&quot; or &quot;fifth street&quot;). The final betting round follows.
                </p>
              </div>
            </div>
          </section>

          {/* Showdown */}
          <section className="bg-gray-800 rounded-xl p-6 sm:p-8 border border-gray-700 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Showdown
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
              If more than one player remains after the final betting round, a showdown occurs. All remaining 
              players reveal their hole cards, and the player with the best five-card hand wins the pot.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Players can use both, one, or neither of their hole cards in combination with the five community 
              cards to make their best hand.
            </p>
          </section>

          {/* Hand Rankings */}
          <section className="bg-gray-800 rounded-xl p-6 sm:p-8 border border-gray-700 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Hand Rankings
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-6">
              Hands are ranked from highest to lowest. If two players have the same type of hand, the hand with 
              the higher-ranked cards wins. The ranking order is: Royal Flush, Straight Flush, Four of a Kind, 
              Full House, Flush, Straight, Three of a Kind, Two Pair, One Pair, and High Card.
            </p>
            <div className="flex justify-center">
              <Link
                href="/hand-rankings"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 active:scale-95"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                View Complete Hand Rankings
              </Link>
            </div>
          </section>

          {/* Additional Rules */}
          <section className="bg-gray-800 rounded-xl p-6 sm:p-8 border border-gray-700 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Additional Rules
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">Betting Limits</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Texas Hold&apos;Em can be played with no limit (players can bet all their chips), pot limit (maximum 
                  bet equals the pot size), or fixed limit (betting amounts are predetermined).
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">All-In</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  If a player bets all their remaining chips, they are &quot;all-in.&quot; Other players can still bet, 
                  but side pots may be created if not all players have enough chips to match the bet.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">Tournament Play</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  In tournaments, blinds increase at regular intervals. Players are eliminated when they lose all 
                  their chips. The tournament continues until one player has all the chips.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Footer with Advertisement */}
        <footer className="mt-8 space-y-4">
          <AdPlacement size="banner" className="max-w-6xl mx-auto" />
          
          {/* Footer Info */}
          <div className="text-center space-y-3 pb-6">
            <div className="pt-4 border-t border-gray-800">
              <p className="text-xs sm:text-sm text-gray-500">
                © {new Date().getFullYear()} PokerTimer. All rights reserved.
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

