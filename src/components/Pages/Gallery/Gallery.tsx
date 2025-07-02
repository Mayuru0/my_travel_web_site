"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { Destination, GalleryData } from "@/types/index";
import { getGalleryById, getGalleries } from "@/lib/gallery";

import AOS from "aos";
import "aos/dist/aos.css";
interface GalleryProps {
  galleryId: string;
}

const Gallery: React.FC<GalleryProps> = ({ galleryId }) => {
  const [selectedDestinationId, setSelectedDestinationId] =
    useState<string>("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");


 useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    if (!galleryId) return;

    const fetchGallery = async () => {
      setLoading(true);
      try {
        const data = await getGalleryById(galleryId);
        if (!data) {
          setError("Gallery not found");
          return;
        }
        setGalleryData(data);
      } catch (err) {
        setError("Failed to load gallery data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [galleryId]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getGalleries();
        setDestinations(data || []);
      } catch (err) {
        console.error("Failed to load destinations:", err);
      }
    };

    fetchDestinations();
  }, []);

  const galleryImages =
    galleryData?.galleryUrls?.filter((url) => url && typeof url === "string") ||
    [];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = () =>
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );

  const prevImage = () =>
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );

  const otherDestinations = destinations.filter(
    (d) => d.id !== galleryData?.id
  );
  const selectedDestination = otherDestinations.find(
    (d) => d.id === selectedDestinationId
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 ">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004643] mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Loading gallery...
          </h2>
        </div>
      </div>
    );
  }

  if (error || !galleryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            {error || "Destination not found"}
          </h1>
          <p className="text-gray-600 mb-6">
            {error
              ? "Please try again later."
              : "The destination you're looking for doesn't exist."}
          </p>
          <Link
            href="/"
            className="inline-block bg-[#004643] text-white px-6 py-3 rounded-lg hover:bg-[#003a37] transition-colors font-medium"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-[#e6f2e6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Destination Selector */}
        {otherDestinations.length > 0 && (
          <div data-aos="fade-up" className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-4">
              Search My Other Travel Location
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <select
                value={selectedDestinationId}
                onChange={(e) => setSelectedDestinationId(e.target.value)}
                className="w-full md:w-80 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004643] bg-white"
              >
                <option value="">-- Select a Location --</option>
                {otherDestinations.map((dest) => (
                  <option key={dest.id} value={dest.id}>
                    {dest.title}
                  </option>
                ))}
              </select>

              {selectedDestination && (
                <div className="flex flex-col sm:flex-row items-center gap-4 bg-green-200  border-green-800 border-2 p-4 rounded-md">
                  <Image
                    src={selectedDestination.coverImgUrl || "/placeholder.svg"}
                    alt={selectedDestination.title}
                    width={100}
                    height={100}
                    className="rounded-md object-cover w-[150px] h-[100px]"
                  />
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <Link
                      href={`/gallery/${selectedDestination.id}`}
                      className="bg-[#004643] text-white px-5 py-2 rounded-md hover:bg-green-900 transition-colors"
                    >
                      Visit {selectedDestination.title}
                    </Link>
                    <button
                      onClick={() => setSelectedDestinationId("")}
                      className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-700 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div 
          data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
            className="relative h-80 sm:h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={galleryData.coverImgUrl || "/placeholder.svg"}
              alt={galleryData.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-4">
            <h1 
            data-aos="zoom-in-left"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              {galleryData.title}
            </h1>
            <p
            data-aos="zoom-in-left"
            data-aos-delay="200"
            className="text-base sm:text-lg text-[#004643] font-medium">
              {galleryData.date}
            </p>
            <p 
            data-aos="zoom-in-left"
            data-aos-delay="400"
            className="text-base sm:text-lg text-[#004643] font-medium">
              Province: {galleryData.province}
            </p>
            <p
            data-aos="zoom-in-left"
            data-aos-delay="600"
            className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {galleryData.description}
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        {galleryImages.length > 0 ? (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2
              data-aos="zoom-out"
               className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Explore {galleryData.title}
              </h2>
              <p
              data-aos="zoom-out"
              data-aos-delay="200"
              className="text-gray-600">
                Discover the beauty and wonder of this amazing destination
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {galleryImages.map((imageSrc, index) => (
                <div
                  key={index}
                  data-aos="zoom-in"
                  className="relative group cursor-pointer w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative w-full h-64 sm:h-72">
                    <Image
                      src={imageSrc}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        console.error("Image failed to load:", imageSrc);
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-black bg-opacity-50 p-3 rounded-full">
                        <ZoomIn size={28} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Gallery</h2>
            <p className="text-gray-600">
              No gallery images available for this destination.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && galleryImages.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full mx-auto">
            <button
              onClick={closeLightbox}
              className="absolute top-0 -mt-3 right-4 text-white hover:text-gray-300 z-10 bg-red-600 cursor-pointer hover:bg-red-700 bg-opacity-50 rounded-full p-2"
            >
              <X size={24} />
            </button>

            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-blue-600 hover:bg-blue-700 cursor-pointer bg-opacity-50 rounded-full p-2"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-blue-600 hover:bg-blue-700 cursor-pointer bg-opacity-50 rounded-full p-2"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <div className="relative w-full h-[70vh] sm:h-[80vh]">
              <Image
                src={galleryImages[currentImageIndex]}
                alt={`Gallery image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, 80vw"
              />
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-opacity-50 px-4 py-2 rounded-full">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
