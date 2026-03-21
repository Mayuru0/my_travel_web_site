"use client";
import React, { useState, useEffect } from "react";
import { Destination } from "@/types/index";
import TravelGalleryCard from "./TravelGalleryCard";
import AOS from "aos";
import "aos/dist/aos.css";

interface TravelGalleryCarouselProps {
  destinations: Destination[];
  pauseOnHover?: boolean;
  speed?: number; // seconds per item (lower = faster)
}

const TravelGalleryCarousel: React.FC<TravelGalleryCarouselProps> = ({
  destinations,
  pauseOnHover = true,
  speed = 0.6,
}) => {
  const [visibleItems, setVisibleItems] = useState(4);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setVisibleItems(4);
      else if (window.innerWidth >= 1024) setVisibleItems(3);
      else if (window.innerWidth >= 640) setVisibleItems(2);
      else setVisibleItems(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  if (!destinations.length) return null;

  // Duplicate the list — animate from 0 to -50% for seamless loop
  const doubled = [...destinations, ...destinations];
  const duration = destinations.length * speed;

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16">
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      {/* Section header */}
      <div className="mb-10" data-aos="fade-up">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-0.5 bg-[#004643]" />
          <span className="text-[#004643] text-xs font-semibold tracking-[0.2em] uppercase">
            Explore
          </span>
        </div>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#004643] leading-tight"
          style={{ fontFamily: "Playfair Display" }}
        >
          Travel Gallery
        </h2>
        <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-md">
          Discover breathtaking destinations captured through the lens
        </p>
      </div>

      {/* Conveyor belt */}
      <div
        className="overflow-hidden"
        onMouseEnter={() => pauseOnHover && setIsHovered(true)}
        onMouseLeave={() => pauseOnHover && setIsHovered(false)}
      >
        <div
          className="flex"
          style={{
            animation: `marquee-scroll ${duration}s linear infinite`,
            animationPlayState: isHovered ? "paused" : "running",
          }}
        >
          {doubled.map((destination, index) => (
            <div
              key={index}
              style={{ flex: `0 0 calc(100% / ${visibleItems})` }}
            >
              <TravelGalleryCard destination={destination} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelGalleryCarousel;
