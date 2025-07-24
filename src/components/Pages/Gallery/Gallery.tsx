"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, Calendar, Search } from "lucide-react";
import type { CategoryType, GalleryData } from "@/types/index";
import { getCategoryById, getCategories } from "@/lib/category";

import AOS from "aos";
import "aos/dist/aos.css";
import { getGalleries } from "@/lib/gallery";
import GalleryGridSkeleton from "./GalleryLoadingEffects/GalleryGridSkeleton";
import GalleryImageWithLoading from "./GalleryLoadingEffects/GalleryImageWithLoading";

interface GalleryProps {
  categoryId: string;
}

const Gallery: React.FC<GalleryProps> = ({ categoryId }) => {
  const [selectedDestinationId, setSelectedDestinationId] =
    useState<string>("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryData, setGalleryData] = useState<CategoryType | null>(null);
  const [galleryImage, setGalleryImage] = useState<GalleryData | null>(null);
  const [destinations, setDestinations] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isGalleryLoading, setIsGalleryLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    found: boolean;
    message: string;
    imageCount: number;
  } | null>(null);

  const imageGridRef = React.useRef<HTMLDivElement | null>(null);

  // Pagination
 const scrollToImageGrid = () => {
  // Only scroll for screens less than or equal to 1024px (mobile + tablet)
  if (typeof window !== "undefined" && window.innerWidth <= 1024) {
    if (imageGridRef.current) {
      imageGridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
};


  const handlePrevPage = () => {
    setCurrentPage((p) => Math.max(1, p - 1));
    scrollToImageGrid();
  };

  const handleNextPage = () => {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
    scrollToImageGrid();
  };

  const handleSetPage = (page: number) => {
    setCurrentPage(page);
    scrollToImageGrid();
  };

  // Pagination state
  const imagesPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Fetch gallery data
  useEffect(() => {
    if (!categoryId) return;

    const fetchGallery = async () => {
      setLoading(true);
      try {
        const data = await getCategoryById(categoryId);
        console.log(categoryId);
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
  }, [categoryId]);

  // Fetch destinations
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getCategories();
        setDestinations(data || []);
      } catch (err) {
        console.error("Failed to load destinations:", err);
      }
    };

    fetchDestinations();
  }, []);

  // Fetch gallery by title
  // Fetch gallery by title
  useEffect(() => {
    const fetchGalleryData = async () => {
      setIsGalleryLoading(true);
      try {
        const allGalleries = await getGalleries();
        const relatedGalleries = allGalleries.filter(
          (gallery) =>
            gallery.title.toLowerCase() === galleryData?.title?.toLowerCase()
        );
        const uniqueDates = Array.from(
          new Set(relatedGalleries.map((g) => g.date))
        );
        setAvailableDates(uniqueDates);

        // Add delay for better loading effect
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (relatedGalleries.length > 0) {
          setGalleryImage(relatedGalleries[0]);
          setSelectedDate(relatedGalleries[0].date); // <-- Add this line to set default selected date
          console.log("Matched Gallery Loaded:", relatedGalleries[0]);
        } else {
          console.log("No gallery found for title:", galleryData?.title);
          setGalleryImage(null);
        }
      } catch (err) {
        console.error("Error fetching gallery or dates:", err);
      } finally {
        setIsGalleryLoading(false);
      }
    };
    if (galleryData?.title) {
      fetchGalleryData();
    }
  }, [galleryData?.title]);

  //serchby date

  // useEffect(() => {
  //   const fetchDates = async () => {
  //     try {
  //       const allGalleries = await getGalleries();
  //       const uniqueDates = Array.from(new Set(allGalleries.map(g => g.date)));
  //       setAvailableDates(uniqueDates);
  //     } catch (err) {
  //       console.error("Failed to load gallery dates:", err);
  //     }
  //   };

  //   fetchDates();
  // }, []);

  const handleSearchByDate = async () => {
    if (!selectedDate) return;

    setIsSearching(true);
    setIsGalleryLoading(true);
    setSearchResults(null);

    // Add a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const allGalleries = await getGalleries();
      const matchedGallery = allGalleries.find(
        (gallery) => gallery.date.toLowerCase() === selectedDate.toLowerCase()
      );

      // Additional delay for gallery loading effect
      await new Promise((resolve) => setTimeout(resolve, 1200));

      if (matchedGallery) {
        setGalleryImage(matchedGallery);
        setCurrentPage(1); // Reset to first page when new gallery is loaded
        setSearchResults({
          found: true,
          message: `Gallery found for ${selectedDate}`,
          imageCount: matchedGallery.galleryUrls?.length || 0,
        });
        console.log("Matched Gallery Loaded by Date:", matchedGallery);
      } else {
        setGalleryImage(null);
        setSearchResults({
          found: false,
          message: `No gallery found for ${selectedDate}`,
          imageCount: 0,
        });
        console.log("No matching gallery found for date:", selectedDate);
      }
    } catch (err) {
      setSearchResults({
        found: false,
        message: "Error occurred while searching",
        imageCount: 0,
      });
      console.log("Error fetching gallery by date:", err);
    } finally {
      setIsSearching(false);
      setIsGalleryLoading(false);
    }
  };

  const galleryImages =
    galleryImage?.galleryUrls?.filter(
      (url) => url && typeof url === "string"
    ) || [];

  // Pagination logic
  const totalPages = Math.ceil(galleryImages.length / imagesPerPage);
  const paginatedImages = galleryImages.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index + (currentPage - 1) * imagesPerPage);
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
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
        {/* Other Destinations */}
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
                <div className="flex flex-col sm:flex-row items-center gap-4 bg-green-200 border-green-800 border-2 p-4 rounded-md">
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

        {/* Destination Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div
            data-aos="fade-right"
            className="relative h-80 sm:h-96 rounded-xl overflow-hidden shadow-lg"
          >
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
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900"
            >
              {galleryData.title}
            </h1>
            {/* <p
              data-aos="zoom-in-left"
              data-aos-delay="200"
              className="text-base sm:text-lg text-[#004643] font-medium"
            >
              {galleryData.date}
            </p> */}
            <p
              data-aos="zoom-in-left"
              data-aos-delay="400"
              className="text-base sm:text-lg text-[#004643] font-medium"
            >
              Province: {galleryData.province}
            </p>
            <p
              data-aos="zoom-in-left"
              data-aos-delay="600"
              className="text-sm sm:text-base text-gray-700 leading-relaxed"
            >
              {galleryData.description}
            </p>
          </div>
        </div>

        {/* Enhanced Search By Date Section with Loading Effects */}
        <div data-aos="fade-up" className="mb-12 px-4 sm:px-6">
          <div className="rounded-2xl shadow-xl p-6 sm:p-8 border border-green-100 backdrop-blur-sm relative overflow-hidden">
            {/* Loading Overlay */}
            {isSearching && (
              <div className="absolute inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl px-4">
                <div className="text-center">
                  <div className="relative">
                    {/* Animated Search Icon */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 relative">
                      <div className="absolute inset-0 border-4 border-[#004643] border-t-transparent rounded-full animate-spin"></div>
                      <div className="absolute inset-2 border-4 border-green-300 border-b-transparent rounded-full animate-spin animate-reverse"></div>
                      <Search className="absolute inset-0 m-auto w-5 h-5 text-[#004643] animate-pulse" />
                    </div>
                    {/* Loading Text */}
                    <div className="space-y-2 px-2">
                      <h3 className="text-base sm:text-lg font-semibold text-[#004643] animate-pulse">
                        Searching Gallery...
                      </h3>
                      <p className="text-sm text-gray-600 break-words">
                        Looking for images from {selectedDate}
                      </p>
                      <div className="w-40 sm:w-48 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#004643] to-green-500 rounded-full animate-pulse loading-bar"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center mb-6 sm:mb-8 text-center ">
              <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-[#004643] mr-2 sm:mr-3" />
              <h2 className="text-xl sm:text-3xl font-bold text-gray-800 bg-gradient-to-r from-[#004643] to-green-600 bg-clip-text text-transparent">
                Search Gallery by Date
              </h2>
            </div>

            <div className="max-w-2xl mx-auto w-full">
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-stretch sm:items-end">
                {/* Date Select */}
                <div className="flex-1 w-full">
                  <label
                    htmlFor="date-select"
                    className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3  "
                  >
                    Select Visit Date
                  </label>
                  <div className="relative">
                    {/* Icon */}
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Calendar
                        className={`w-5 h-5 transition-colors duration-200 ${
                          isSearching ? "text-gray-300" : "text-gray-400"
                        }`}
                      />
                    </div>

                    {/* Select Input */}
                    <select
                      id="date-select"
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setSearchResults(null);
                      }}
                      disabled={isSearching}
                      className={`w-full pl-11 pr-4 py-3 sm:py-4 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004643] focus:border-transparent bg-white text-gray-700 font-medium transition-all duration-200 ${
                        isSearching
                          ? "border-gray-200 cursor-not-allowed opacity-50"
                          : "border-gray-200 hover:border-[#004643]"
                      }`}
                    >
                      <option value="">-- Select a Date --</option>
                      {availableDates.map((date, index) => (
                        <option key={index} value={date}>
                          {date}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearchByDate}
                  disabled={!selectedDate || isSearching}
                  className={`w-full md:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 transform shadow-lg flex items-center justify-center gap-2 ${
                    !selectedDate || isSearching
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#004643] to-green-700 text-white hover:from-green-800 hover:to-[#004643] shadow-xl hover:scale-105 cursor-pointer"
                  }`}
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span className="animate-pulse text-sm sm:text-base">
                        Searching...
                      </span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span className="text-sm sm:text-base">
                        Search Gallery
                      </span>
                    </>
                  )}
                </button>
              </div>

              {/* Search Results Display */}
              {searchResults && !isSearching && (
                <div
                  className={`mt-6 p-4 rounded-xl border-2 transition-all duration-500 ${
                    searchResults.found
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3">
                    {searchResults.found ? (
                      <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                        <X className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="text-sm">
                      <p
                        className={`font-semibold ${
                          searchResults.found
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        {searchResults.message}
                      </p>
                      {searchResults.found && searchResults.imageCount > 0 && (
                        <p className="text-xs text-green-600 mt-1">
                          Found {searchResults.imageCount} image
                          {searchResults.imageCount !== 1 ? "s" : ""} in this
                          gallery
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Available Dates Info */}
              {availableDates.length > 0 && (
                <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200 text-sm sm:text-base">
                  <p className="text-green-700 font-medium">
                    <span className="font-semibold">
                      {availableDates.length}
                    </span>{" "}
                    date
                    {availableDates.length !== 1 ? "s" : ""} available for this
                    destination
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Image Gallery with Enhanced Loading */}
        {isGalleryLoading ? (
          <div className="mb-12">
            <div className="text-center mb-12">
              <div className="animate-pulse">
                <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto mb-4"></div>
                <div className="h-6 bg-gray-100 rounded w-64 mx-auto"></div>
              </div>
            </div>
            <GalleryGridSkeleton />
          </div>
        ) : galleryImages.length > 0 ? (
          <div className="mb-12">
            <div className="text-center mb-12">
              <h2
                data-aos="zoom-out"
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-[#004643] to-green-600 bg-clip-text "
              >
                Explore {galleryData.title}
              </h2>
              <p
                data-aos="zoom-out"
                data-aos-delay="200"
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                Discover the beauty and wonder of this amazing destination
                through our curated gallery
              </p>
              {galleryImage?.date && (
                <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 rounded-full border border-green-200">
                  <Calendar className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-green-700 font-medium">
                    Visited on {galleryImage.date}
                  </span>
                </div>
              )}
            </div>

            <div
              ref={imageGridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {paginatedImages.map((imageSrc, index) => {
                const actualIndex = (currentPage - 1) * imagesPerPage + index;
                return (
                  <GalleryImageWithLoading
                    key={actualIndex}
                    src={imageSrc}
                    alt={`Gallery image ${actualIndex + 1}`}
                    index={index}
                    onClick={() => openLightbox(index)}
                  />
                );
              })}
            </div>

            {/* Enhanced Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-8 sm:mt-12">
                {/* Previous Button */}
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-md flex justify-center items-center gap-2 ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-[#004643] hover:bg-[#004643] hover:text-white border-2 border-[#004643]"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex flex-wrap justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handleSetPage(page)}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                          currentPage === page
                            ? "bg-[#004643] text-white shadow-lg"
                            : "bg-white text-[#004643] hover:bg-gray-100 border border-gray-200"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-md flex justify-center items-center gap-2 ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-[#004643] hover:bg-[#004643] hover:text-white border-2 border-[#004643]"
                  }`}
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="mb-12 text-center bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                No Gallery Found
              </h2>
              <p className="text-gray-600 text-lg">
                No gallery images available for the selected date. Try selecting
                a different date or check back later.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Lightbox */}
      {lightboxOpen && galleryImages.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full mx-auto">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-red-600 hover:bg-red-700 rounded-full p-3 transition-all duration-200 transform hover:scale-110 shadow-lg"
            >
              <X size={24} />
            </button>

            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform-translate-y-1/2 text-white hover:text-gray-300 z-10 bg-blue-600 hover:bg-blue-700 rounded-full p-3 transition-all duration-200 transform hover:scale-110 shadow-lg"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform-translate-y-1/2 text-white hover:text-gray-300 z-10 bg-blue-600 hover:bg-blue-700 rounded-full p-3 transition-all duration-200 transform hover:scale-110 shadow-lg"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <div className="relative w-full h-[70vh] sm:h-[80vh] rounded-2xl overflow-hidden">
              <Image
                src={galleryImages[currentImageIndex] || "/placeholder.svg"}
                alt={`Gallery image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, 80vw"
              />
            </div>

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-6 py-3 rounded-full backdrop-blur-sm">
              <span className="font-medium">
                {currentImageIndex + 1} / {galleryImages.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles for Loading Animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes loading-bar {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes loading-progress {
          0% {
            width: 0%;
          }
          50% {
            width: 60%;
          }
          100% {
            width: 100%;
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out;
        }

        .loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }

        .animate-reverse {
          animation-direction: reverse;
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-loading-progress {
          animation: loading-progress 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Gallery;
