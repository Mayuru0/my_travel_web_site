"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { moreDestinations } from "@/data/destinations";
import plusIcon from "../../../../public/octicon_feed-plus-16.svg";
import Link from "next/link";
import {MoreDestination } from"@/type/index"

const TravelGalleryCard: React.FC<{ moreDestinations: MoreDestination }> = ({ moreDestinations }) => (

  
  <div className="flex items-center justify-center w-full">
    <div className="w-full">
      <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl rounded-lg">
        <div className="h-[200px] sm:h-[220px] md:h-[250px] lg:h-[280px] w-full">
          <Image 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
            src={moreDestinations.image || "/placeholder.svg"} 
            alt={moreDestinations.name}
            width={280}
            height={280}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent group-hover:from-black/70 group-hover:via-black/60"></div>
        <div className="absolute inset-0 rounded-xl flex bg-black-50 translate-y-[59%] flex-col items-center justify-center px-4 sm:px-6 md:px-9 text-center transition-all duration-500 group-hover:translate-y-0">
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-[-35%]">{moreDestinations.name}</h1>
          <div className="mt-[10%]">
          <Link href={`/gallery/${moreDestinations.id}`}>

       <Image src={plusIcon || "/placeholder.svg"} alt="plusIcon" className="cursor-pointer" />
        </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

type DestinationCarouselProps = {
  moreDestinations: MoreDestination[];
};

const TravelGalleryCarousel: React.FC<DestinationCarouselProps> = ({
  moreDestinations,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);

  // Update visible items based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setVisibleItems(5);
      } else if (window.innerWidth >= 1024) {
        setVisibleItems(4);
      } else if (window.innerWidth >= 768) {
        setVisibleItems(3);
      } else if (window.innerWidth >= 640) {
        setVisibleItems(2);
      } else {
        setVisibleItems(1);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxStartIndex = Math.max(0, moreDestinations.length - visibleItems);

  const nextSlide = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, maxStartIndex));
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight sm:leading-[63.98px] text-left text-[#004643] mb-4 sm:mb-6 font-playfair"
        style={{ fontFamily: "Playfair Display" }}
      >
        Travel Gallery
      </h2>

      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {moreDestinations
            .slice(startIndex, startIndex + visibleItems)
            .map((destination, index) => (
              <TravelGalleryCard key={index} moreDestinations={destination} />
            ))}
        </div>
        
        <button
          onClick={prevSlide}
          disabled={startIndex === 0}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-md z-10 ${
            startIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeftIcon size={20} className="sm:w-6 sm:h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          disabled={startIndex >= maxStartIndex}
          className={`absolute right-0  top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-md z-10 ${
            startIndex >= maxStartIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
          }`}
          aria-label="Next slide"
        >
          <ChevronRightIcon size={20} className="sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
};

export default TravelGalleryCarousel;
