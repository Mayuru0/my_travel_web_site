import React from 'react'

// Skeleton Loading Component for Gallery Grid
const GalleryGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="relative w-full overflow-hidden rounded-2xl shadow-lg bg-white border border-gray-100 animate-pulse"
        >
          <div className="relative w-full h-64 sm:h-72 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200">
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>

            {/* Placeholder icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse flex items-center justify-center">
                <div className="w-6 h-6 bg-gray-400 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Loading text */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="h-3 bg-gray-300 rounded animate-pulse mb-2"></div>
              <div className="h-2 bg-gray-200 rounded animate-pulse w-2/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


export default GalleryGridSkeleton
