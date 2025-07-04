"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon } from "lucide-react";
import { Destination } from "@/types/index";
import TravelGalleryCard from "./TravelGalleryCard";
import AOS from "aos";
import "aos/dist/aos.css";

interface TravelGalleryCarouselProps {
  destinations: Destination[];
  autoPlayInterval?: number; // Auto-play interval in milliseconds (default: 3000)
  pauseOnHover?: boolean; // Whether to pause on hover (default: true)
}

const TravelGalleryCarousel: React.FC<TravelGalleryCarouselProps> = ({
  destinations,
  autoPlayInterval = 3000,
  pauseOnHover = true,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxStartIndex = Math.max(0, destinations.length - visibleItems);

  const nextSlide = () => {
    setStartIndex((prevIndex) => {
      // Loop back to beginning when reaching the end
      if (prevIndex >= maxStartIndex) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) => {
      // Loop to end when going back from beginning
      if (prevIndex <= 0) {
        return maxStartIndex;
      }
      return prevIndex - 1;
    });
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isHovered && destinations.length > visibleItems) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, isHovered, autoPlayInterval, destinations.length, visibleItems]);

  // Handle manual navigation (pause auto-play temporarily)
  const handleManualNavigation = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      nextSlide();
    } else {
      prevSlide();
    }
    
    // Temporarily pause auto-play for 2 seconds after manual navigation
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 2000);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Handle mouse enter/leave for pause on hover
  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsHovered(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight sm:leading-[63.98px] text-left text-[#004643] font-playfair"
          style={{ fontFamily: "Playfair Display" }}
        >
          Travel Gallery
        </h2>
        
        {/* Auto-play toggle button */}
        <button
          onClick={toggleAutoPlay}
          className="flex items-center gap-2 bg-[#004643] text-white px-3 py-2 rounded-full hover:bg-[#005855] transition-colors hidden"
          aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
        >
          {isAutoPlaying ? (
            <PauseIcon size={16} />
          ) : (
            <PlayIcon size={16} />
          )}
          <span className="text-sm font-medium">
            {isAutoPlaying ? "Pause" : "Play"}
          </span>
        </button>
      </div>

      <div 
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {destinations
            .slice(startIndex, startIndex + visibleItems)
            .map((destination, index) => (
              <TravelGalleryCard
                key={destination.id || index}
                destination={destination}
              />
            ))}
        </div>

        {/* Navigation buttons */}
        <button
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          onClick={() => handleManualNavigation('prev')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-md z-10 cursor-pointer hover:bg-gray-100 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon size={20} className="sm:w-6 sm:h-6" />
        </button>

        <button
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          onClick={() => handleManualNavigation('next')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-md z-10 cursor-pointer hover:bg-gray-100 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRightIcon size={20} className="sm:w-6 sm:h-6" />
        </button>

        {/* Progress indicators */}
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: Math.ceil(destinations.length / visibleItems) }).map((_, index) => {
            const isActive = Math.floor(startIndex / visibleItems) === index;
            return (
              <button
                key={index}
                onClick={() => setStartIndex(index * visibleItems)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  isActive ? "bg-[#004643]" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide group ${index + 1}`}
              />
            );
          })}
        </div>
{/* 
        Auto-play status indicator */}
        {pauseOnHover && isHovered && (
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm lg:hidden">
            Paused
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelGalleryCarousel;