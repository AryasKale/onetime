'use client'

import dynamic from 'next/dynamic'

// Load InboxGenerator client-side only to prevent hydration issues
const InboxGenerator = dynamic(() => import('./InboxGenerator'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-lg">
      <div className="ios-safe-card bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-gray-200 shadow-2xl">
        <div className="animate-pulse">
          {/* Match the description paragraph height */}
          <div className="h-6 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-4/5 mb-6 md:mb-8"></div>
          {/* Match the button height */}
          <div className="h-16 md:h-20 bg-gray-300 rounded-2xl"></div>
        </div>
      </div>
    </div>
  )
})

export default function InboxGeneratorWrapper() {
  return <InboxGenerator />
} 
