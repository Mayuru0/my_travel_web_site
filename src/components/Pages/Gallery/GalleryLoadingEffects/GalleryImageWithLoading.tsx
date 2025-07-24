import { X, ZoomIn } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

// Individual Image Loading Component
const GalleryImageWithLoading = ({
  src,
  alt,
  index,
  onClick,
}: {
  src: string
  alt: string
  index: number
  onClick: () => void
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <div
      data-aos="zoom-in"
      data-aos-delay={index * 50} // Staggered animation
      className="relative group cursor-pointer w-full overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white border border-gray-100"
      onClick={onClick}
    >
      <div className="relative w-full h-64 sm:h-72">
        {/* Loading skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_400%] animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-[#004643] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )}

        {/* Error state */}
        {imageError && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                <X className="w-6 h-6" />
              </div>
              <p className="text-sm">Failed to load</p>
            </div>
          </div>
        )}

        {/* Actual image */}
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className={`object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />

        {/* Hover overlay - only show when image is loaded */}
        {imageLoaded && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white bg-opacity-90 p-4 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <ZoomIn size={28} className="text-[#004643]" />
              </div>
            </div>
          </>
        )}

        {/* Loading progress indicator */}
        {!imageLoaded && !imageError && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div className="h-full bg-gradient-to-r from-[#004643] to-green-500 animate-pulse w-full transition-all duration-1000"></div>
          </div>
        )}
      </div>
    </div>
  )
}


export default GalleryImageWithLoading
