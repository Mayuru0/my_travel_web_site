"use client"
import type React from "react"
import Image from "next/image"
import Link from "next/link"
import type { Destination } from "@/types/index"
import { Eye } from "lucide-react"

interface TravelGalleryCardProps {
  destination: Destination
}

const TravelGalleryCard: React.FC<TravelGalleryCardProps> = ({ destination }) => (
  <div className="flex items-center justify-center w-full">
    <div className="w-full">
      <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl rounded-lg">
        {/* Image Container */}
        <div
          //data-aos="zoom-in"
          className="h-[200px] sm:h-[220px] md:h-[250px] lg:h-[280px] w-full"
        >
          <Image
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            src={destination.coverImgUrl || "/placeholder.svg"}
            alt={destination.title}
            width={280}
            height={280}
          />
        </div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-opacity-50 transition-all duration-300"></div>
        {/* Text and Button */}
        <div
          className="absolute inset-0 rounded-xl flex flex-col items-center justify-center px-4 sm:px-6 md:px-9 text-center transition-all duration-500 
                        translate-y-0 sm:translate-y-[59%] group-hover:translate-y-0"
        >
          <h1
            className="text-xl sm:text-xl font-bold text-gray-100 drop-shadow-md
                         mt-0 sm:mt-[-35%]"
          >
            {destination.title}
          </h1>
          <div className="mt-4 sm:mt-[10%]">
            <Link href={`/gallery/${destination.id}`}>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                <Eye className="w-5 h-5 text-gray-700" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default TravelGalleryCard
