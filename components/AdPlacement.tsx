'use client'

interface AdPlacementProps {
  size?: 'banner' | 'sidebar' | 'rectangle' | 'small'
  className?: string
  placeholder?: boolean
}

export const AdPlacement = ({
  size = 'rectangle',
  className = '',
  placeholder = true,
}: AdPlacementProps) => {
  const sizeClasses = {
    banner: 'w-full h-24 md:h-28', // 728x90 standard banner
    sidebar: 'w-full h-[250px] md:h-[600px]', // 300x250 rectangle or 300x600 skyscraper
    rectangle: 'w-full h-48 md:h-64', // 300x250 medium rectangle
    small: 'w-full h-20', // Small horizontal ad
  }

  return (
    <div className={`bg-gray-700 border border-gray-600 rounded-lg overflow-hidden ${className}`}>
      {placeholder ? (
        <div
          className={`${sizeClasses[size]} flex items-center justify-center text-gray-400 text-xs md:text-sm`}
        >
          {/* Placeholder for ad content */}
          <div className="text-center p-2">
            <div className="mb-1">Advertisement</div>
            <div className="text-gray-500 text-xs">
              {size === 'banner' && '728 × 90'}
              {size === 'sidebar' && '300 × 600'}
              {size === 'rectangle' && '300 × 250'}
              {size === 'small' && '320 × 50'}
            </div>
          </div>
        </div>
      ) : (
        <div className={sizeClasses[size]}>
          {/* Replace this with your actual ad code (Google AdSense, etc.) */}
          {/* Example:
          <div id="ad-slot-id" />
          <script async src="..."></script>
          */}
        </div>
      )}
    </div>
  )
}

