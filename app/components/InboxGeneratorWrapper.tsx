'use client'

import dynamic from 'next/dynamic'

// Load InboxGenerator client-side only to prevent hydration issues
const InboxGenerator = dynamic(() => import('./InboxGenerator'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-lg">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-gray-200 shadow-2xl">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
          <div className="h-12 bg-gray-300 rounded-2xl"></div>
        </div>
      </div>
    </div>
  )
})

export default function InboxGeneratorWrapper() {
  return <InboxGenerator />
} 