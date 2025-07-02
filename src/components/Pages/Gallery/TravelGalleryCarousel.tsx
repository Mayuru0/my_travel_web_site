"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Destination } from "@/types/index";
import TravelGalleryCard from "./TravelGalleryCard";
import AOS from "aos";
import "aos/dist/aos.css";
interface TravelGalleryCarouselProps {
  destinations: Destination[]; // Changed from moreDestinations to destinations
}

const TravelGalleryCarousel: React.FC<TravelGalleryCarouselProps> = ({
  destinations,
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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxStartIndex = Math.max(0, destinations.length - visibleItems);

  const nextSlide = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, maxStartIndex));
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
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
      <h2
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
        className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight sm:leading-[63.98px] text-left text-[#004643] mb-4 sm:mb-6 font-playfair"
        style={{ fontFamily: "Playfair Display" }}
      >
        Travel Gallery
      </h2>

      <div className="relative">
        <div
          
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {destinations
            .slice(startIndex, startIndex + visibleItems)
            .map((destination, index) => (
              <TravelGalleryCard
                key={destination.id || index}
                destination={destination}
              />
            ))}
        </div>

        <button
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          onClick={prevSlide}
          disabled={startIndex === 0}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-md z-10 ${
            startIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeftIcon size={20} className="sm:w-6 sm:h-6" />
        </button>

        <button
          data-aos="fade-left"
          data-aos-anchor="#example-anchor"
          data-aos-offset="500"
          data-aos-duration="500"
          onClick={nextSlide}
          disabled={startIndex >= maxStartIndex}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-md z-10 ${
            startIndex >= maxStartIndex
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
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
