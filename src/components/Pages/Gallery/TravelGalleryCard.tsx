"use client"
import type React from "react"
import Image from "next/image"
import Link from "next/link"
import type { Destination } from "@/types/index"
import { MapPin, ArrowRight } from "lucide-react"

interface TravelGalleryCardProps {
  destination: Destination
}

const TravelGalleryCard: React.FC<TravelGalleryCardProps> = ({ destination }) => (
  <div className="w-full px-2">
    <Link href={`/gallery/${destination.id}`}>
      <div className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500">
        {/* Image */}
        <div className="relative h-[300px] sm:h-[340px] lg:h-[380px] w-full">
          <Image
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            src={destination.coverImgUrl || "/placeholder.svg"}
            alt={destination.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Base gradient — always visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

          {/* Hover tint */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Province badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/20">
            <MapPin size={11} />
            <span>{destination.province}</span>
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold text-lg leading-snug font-playfair drop-shadow-sm">
              {destination.title}
            </h3>

            {/* Subtitle — visible on hover */}
            <p className="text-white/70 text-xs mt-1 line-clamp-2 max-h-0 overflow-hidden group-hover:max-h-10 transition-all duration-500 ease-in-out">
              {destination.subtitle || destination.description}
            </p>

            {/* CTA row */}
            <div className="flex items-center gap-1 text-white text-xs font-semibold mt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
              <span className="tracking-wide uppercase text-[11px]">View Gallery</span>
              <ArrowRight size={13} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
)

export default TravelGalleryCard
