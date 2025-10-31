'use client'

interface LogoProps {
  variant?: 'full' | 'icon' | 'compact'
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Logo component for AllInTimer
 * 
 * Design Concept: Poker chip with timer/clock elements
 * - Represents both poker and timing
 * - Works well on dark backgrounds
 * - Scalable and recognizable
 */

const sizeClasses = {
  sm: { width: 32, height: 32, strokeWidth: 1.5 },
  md: { width: 40, height: 40, strokeWidth: 2 },
  lg: { width: 48, height: 48, strokeWidth: 2.5 },
}

export const Logo = ({ variant = 'icon', className = '', size = 'md' }: LogoProps) => {
  const dimensions = sizeClasses[size]

  // Icon variant: Just the logo icon
  if (variant === 'icon') {
    return (
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="AllInTimer Logo"
      >
        {/* Outer chip circle */}
        <circle cx="24" cy="24" r="22" fill="#1F2937" stroke="#3B82F6" strokeWidth={dimensions.strokeWidth} />
        
        {/* Inner circle for timer effect */}
        <circle cx="24" cy="24" r="16" fill="none" stroke="#60A5FA" strokeWidth={dimensions.strokeWidth} opacity="0.5" />
        
        {/* Clock hands / Timer indicator */}
        <line
          x1="24"
          y1="24"
          x2="24"
          y2="12"
          stroke="#60A5FA"
          strokeWidth={dimensions.strokeWidth}
          strokeLinecap="round"
        />
        <line
          x1="24"
          y1="24"
          x2="30"
          y2="20"
          stroke="#60A5FA"
          strokeWidth={dimensions.strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Card suit accent (A for "All In") */}
        <text
          x="24"
          y="32"
          fontSize="14"
          fill="#60A5FA"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="serif"
        >
          A
        </text>
      </svg>
    )
  }

  // Compact variant: Icon + text on same line
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Logo variant="icon" size={size} />
        <span className="font-bold text-white text-xl">AllInTimer</span>
      </div>
    )
  }

  // Full variant: Icon on top, text below
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <Logo variant="icon" size={size} />
      <span className="font-bold text-white text-sm">AllInTimer</span>
    </div>
  )
}

// Alternative Logo Designs - you can switch between these

/**
 * Alternative Design 1: Poker Chip with Timer Ring
 */
export const LogoChipTimer = ({ className = '', size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) => {
  const dimensions = sizeClasses[size]
  
  return (
    <svg
      width={dimensions.width}
      height={dimensions.height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AllInTimer Logo"
    >
      {/* Poker chip base */}
      <circle cx="24" cy="24" r="20" fill="#374151" stroke="#4B5563" strokeWidth="1" />
      <circle cx="24" cy="24" r="16" fill="#1F2937" stroke="#60A5FA" strokeWidth={dimensions.strokeWidth} />
      
      {/* Timer ring (progress indicator) */}
      <circle
        cx="24"
        cy="24"
        r="18"
        fill="none"
        stroke="#3B82F6"
        strokeWidth={dimensions.strokeWidth}
        strokeDasharray="28 8"
        strokeDashoffset="0"
        opacity="0.6"
      />
      
      {/* Center A */}
      <text
        x="24"
        y="30"
        fontSize="18"
        fill="#60A5FA"
        textAnchor="middle"
        fontWeight="bold"
        fontFamily="serif"
      >
        A
      </text>
    </svg>
  )
}

/**
 * Alternative Design 2: Playing Card with Clock
 */
export const LogoCardClock = ({ className = '', size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) => {
  const dimensions = sizeClasses[size]
  
  return (
    <svg
      width={dimensions.width}
      height={dimensions.height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AllInTimer Logo"
    >
      {/* Card background */}
      <rect x="8" y="4" width="32" height="40" rx="4" fill="#FFFFFF" />
      <rect x="8" y="4" width="32" height="40" rx="4" stroke="#3B82F6" strokeWidth={dimensions.strokeWidth} />
      
      {/* Clock in center */}
      <circle cx="24" cy="24" r="10" fill="none" stroke="#1F2937" strokeWidth={dimensions.strokeWidth} />
      <line x1="24" y1="24" x2="24" y2="16" stroke="#1F2937" strokeWidth={dimensions.strokeWidth} strokeLinecap="round" />
      <line x1="24" y1="24" x2="30" y2="24" stroke="#1F2937" strokeWidth={dimensions.strokeWidth} strokeLinecap="round" />
      
      {/* A in corner */}
      <text x="14" y="20" fontSize="12" fill="#DC2626" textAnchor="middle" fontWeight="bold" fontFamily="serif">A</text>
      <text x="34" y="40" fontSize="12" fill="#DC2626" textAnchor="middle" fontWeight="bold" fontFamily="serif">A</text>
    </svg>
  )
}

/**
 * Alternative Design 3: Stacked Chips
 */
export const LogoStacked = ({ className = '', size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) => {
  const dimensions = sizeClasses[size]
  
  return (
    <svg
      width={dimensions.width}
      height={dimensions.height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AllInTimer Logo"
    >
      {/* Bottom chip */}
      <ellipse cx="24" cy="28" rx="14" ry="6" fill="#374151" />
      <circle cx="24" cy="28" r="12" fill="#1F2937" stroke="#4B5563" strokeWidth="1" />
      
      {/* Middle chip */}
      <ellipse cx="24" cy="20" rx="14" ry="6" fill="#4B5563" />
      <circle cx="24" cy="20" r="12" fill="#374151" stroke="#60A5FA" strokeWidth={dimensions.strokeWidth} />
      
      {/* Top chip with timer */}
      <ellipse cx="24" cy="12" rx="14" ry="6" fill="#60A5FA" opacity="0.3" />
      <circle cx="24" cy="12" r="12" fill="#1F2937" stroke="#60A5FA" strokeWidth={dimensions.strokeWidth} />
      <circle cx="24" cy="12" r="8" fill="none" stroke="#60A5FA" strokeWidth={dimensions.strokeWidth} opacity="0.5" />
      
      {/* Clock hand */}
      <line x1="24" y1="12" x2="24" y2="6" stroke="#60A5FA" strokeWidth={dimensions.strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

/**
 * Alternative Design 4: "AI" Monogram with Timer Circle
 */
export const LogoAIMonogram = ({ className = '', size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) => {
  const dimensions = sizeClasses[size]
  
  return (
    <svg
      width={dimensions.width}
      height={dimensions.height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AllInTimer Logo"
    >
      {/* Outer timer ring */}
      <circle cx="24" cy="24" r="22" fill="none" stroke="#3B82F6" strokeWidth={dimensions.strokeWidth} />
      <circle cx="24" cy="24" r="18" fill="none" stroke="#60A5FA" strokeWidth={dimensions.strokeWidth} opacity="0.5" />
      
      {/* Timer segments (progress indicator) */}
      <circle
        cx="24"
        cy="24"
        r="20"
        fill="none"
        stroke="#60A5FA"
        strokeWidth={dimensions.strokeWidth}
        strokeDasharray="12 4"
        opacity="0.6"
      />
      
      {/* Bold "AI" text */}
      <text
        x="24"
        y="32"
        fontSize="20"
        fill="#60A5FA"
        textAnchor="middle"
        fontWeight="bold"
        fontFamily="sans-serif"
        letterSpacing="2"
      >
        AI
      </text>
    </svg>
  )
}

/**
 * Alternative Design 5: Clean Poker Chip with Timer
 */
export const LogoTimerChip = ({ className = '', size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) => {
  const dimensions = sizeClasses[size]
  
  return (
    <svg
      width={dimensions.width}
      height={dimensions.height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AllInTimer Logo"
    >
      {/* Main circular timer background */}
      <circle cx="24" cy="24" r="20" fill="#1F2937" stroke="#3B82F6" strokeWidth={dimensions.strokeWidth} />
      
      {/* Inner circle */}
      <circle cx="24" cy="24" r="14" fill="#374151" />
      
      {/* Timer marks around the circle */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180)
        const x1 = 24 + Math.cos(angle) * 18
        const y1 = 24 + Math.sin(angle) * 18
        const x2 = 24 + Math.cos(angle) * 20
        const y2 = 24 + Math.sin(angle) * 20
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#60A5FA"
            strokeWidth={dimensions.strokeWidth}
            strokeLinecap="round"
          />
        )
      })}
      
      {/* Clock hands */}
      <line
        x1="24"
        y1="24"
        x2="24"
        y2="14"
        stroke="#60A5FA"
        strokeWidth={dimensions.strokeWidth}
        strokeLinecap="round"
      />
      <line
        x1="24"
        y1="24"
        x2="28"
        y2="24"
        stroke="#60A5FA"
        strokeWidth={dimensions.strokeWidth}
        strokeLinecap="round"
      />
      
      {/* Poker chip accent in corner */}
      <circle cx="32" cy="16" r="5" fill="#374151" stroke="#60A5FA" strokeWidth="1.5" />
      <circle cx="32" cy="16" r="3" fill="#1F2937" />
      <text
        x="32"
        y="19"
        fontSize="8"
        fill="#60A5FA"
        textAnchor="middle"
        fontWeight="bold"
        fontFamily="serif"
      >
        A
      </text>
    </svg>
  )
}

/**
 * Alternative Design 6: Minimalist "A" with Timer Progress
 */
export const LogoMinimalist = ({ className = '', size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) => {
  const dimensions = sizeClasses[size]
  
  return (
    <svg
      width={dimensions.width}
      height={dimensions.height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AllInTimer Logo"
    >
      {/* Circular background */}
      <circle cx="24" cy="24" r="22" fill="#1F2937" stroke="#60A5FA" strokeWidth={dimensions.strokeWidth} />
      
      {/* Progress arc (timer indicator) */}
      <path
        d="M 24 2 A 22 22 0 0 1 38 8"
        fill="none"
        stroke="#3B82F6"
        strokeWidth={dimensions.strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M 24 2 A 22 22 0 0 1 10 8"
        fill="none"
        stroke="#60A5FA"
        strokeWidth={dimensions.strokeWidth * 0.5}
        strokeLinecap="round"
        opacity="0.6"
      />
      
      {/* Bold "A" */}
      <text
        x="24"
        y="34"
        fontSize="28"
        fill="#60A5FA"
        textAnchor="middle"
        fontWeight="bold"
        fontFamily="serif"
      >
        A
      </text>
      
      {/* Small timer dots */}
      <circle cx="18" cy="14" r="1.5" fill="#60A5FA" opacity="0.8" />
      <circle cx="30" cy="14" r="1.5" fill="#60A5FA" opacity="0.8" />
    </svg>
  )
}

/**
 * Alternative Design 7: Chip Stack with Timer Ring
 */
export const LogoChipStack = ({ className = '', size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) => {
  const dimensions = sizeClasses[size]
  
  return (
    <svg
      width={dimensions.width}
      height={dimensions.height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AllInTimer Logo"
    >
      {/* Outer timer ring */}
      <circle cx="24" cy="24" r="20" fill="none" stroke="#3B82F6" strokeWidth={dimensions.strokeWidth} />
      
      {/* Timer progress segments */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 - 90) * (Math.PI / 180)
        const x = 24 + Math.cos(angle) * 20
        const y = 24 + Math.sin(angle) * 20
        return (
          <circle key={i} cx={x} cy={y} r="1.5" fill="#60A5FA" opacity={i < 6 ? 1 : 0.4} />
        )
      })}
      
      {/* Stacked chips in center */}
      <ellipse cx="24" cy="26" rx="10" ry="4" fill="#4B5563" />
      <circle cx="24" cy="26" r="8" fill="#374151" stroke="#60A5FA" strokeWidth="1" />
      
      <ellipse cx="24" cy="22" rx="10" ry="4" fill="#60A5FA" opacity="0.3" />
      <circle cx="24" cy="22" r="8" fill="#1F2937" stroke="#60A5FA" strokeWidth={dimensions.strokeWidth} />
      
      {/* "A" on top chip */}
      <text
        x="24"
        y="26"
        fontSize="14"
        fill="#60A5FA"
        textAnchor="middle"
        fontWeight="bold"
        fontFamily="serif"
      >
        A
      </text>
    </svg>
  )
}

