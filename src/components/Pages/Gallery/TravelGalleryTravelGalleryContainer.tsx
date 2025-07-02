"use client";
import React, { useState, useEffect } from "react";
import TravelGalleryCarousel from "./TravelGalleryCarousel";
import { getGalleries } from "@/lib/gallery"; // Your Firebase functions
import { Destination } from "@/types/index";

export default function TravelGalleryContainer() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const data = await getGalleries();
        setDestinations(data as Destination[]);
      } catch (err) {
        setError("Failed to fetch gallery data");
        console.error("Error fetching galleries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading gallery...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-left text-[#004643] mb-4 sm:mb-6 font-playfair">
          Travel Gallery
        </h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-500">No destinations found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <TravelGalleryCarousel destinations={destinations} />
    </div>
  );
}