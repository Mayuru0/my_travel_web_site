"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Destination } from "@/types/index";

interface TravelGalleryCardProps {
  destination: Destination;
}

const TravelGalleryCard: React.FC<TravelGalleryCardProps> = ({ destination }) => (
  <div className="flex items-center justify-center w-full">
    <div className="w-full">
      <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl rounded-lg">

        {/* Image Container */}
        <div
          data-aos="zoom-in"
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
        <div className="absolute inset-0 bg-black/20  group-hover:bg-opacity-50 transition-all duration-300"></div>

        {/* Text and Button */}
        <div className="absolute inset-0 rounded-xl flex translate-y-[59%] flex-col items-center justify-center px-4 sm:px-6 md:px-9 text-center transition-all duration-500 group-hover:translate-y-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-100 mt-[-35%] drop-shadow-md">
            {destination.title}
          </h1>

          <div className="mt-[10%]">
            <Link href={`/gallery/${destination.id}`}>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 3V13M3 8H13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TravelGalleryCard;
