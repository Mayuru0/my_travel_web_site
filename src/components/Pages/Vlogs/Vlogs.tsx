"use client"
import Image from "next/image"
import React, { useState, useMemo } from "react"
import { Play, Search, Filter } from "lucide-react"
import { videos } from "@/data/video"

type FilterType = "all" | "cinematic" | "vlog"

const Vlogs = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const videosPerPage = 6

  const handlePlayVideo = (url: string) => {
    window.open(url, "_blank")
  }

  // Filter and search logic
  const filteredVideos = useMemo(() => {
    let filtered = videos

    // Apply category filter
    if (activeFilter !== "all") {
      filtered = filtered.filter((video) => video.category === activeFilter)
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          video.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return filtered
  }, [searchTerm, activeFilter])

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, activeFilter])

  // Pagination logic with filtered videos
  const indexOfLastVideo = currentPage * videosPerPage
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo)
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage)

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter)
  }

  const clearSearch = () => {
    setSearchTerm("")
  }

  return (
    <div className="bg-[#e6f2e6] ">
      {/* Hero Section */}
      <div className="relative text-4xl font-bold text-center bg-[#E8E8E8] min-h-80">
        <Image src="/hero/new11.png" alt="cover" fill style={{ objectFit: "cover" }} priority />
        <div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-center -mt-2 px-4">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">Videos</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center items-center gap-2 flex-wrap">
            <Filter className="h-5 w-5 text-gray-600" />
            <div className="flex gap-2">
              {[
                { key: "all", label: "All Videos" },
                { key: "cinematic", label: "Cinematic" },
                { key: "vlog", label: "Vlogs" },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => handleFilterChange(filter.key as FilterType)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilter === filter.key
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Info */}
          <div className="text-center text-gray-600">
            {searchTerm || activeFilter !== "all" ? (
              <p>
                Showing {filteredVideos.length} result{filteredVideos.length !== 1 ? "s" : ""}
                {searchTerm && ` for "${searchTerm}"`}
                {activeFilter !== "all" && ` in ${activeFilter === "cinematic" ? "Cinematic" : "Vlogs"}`}
              </p>
            ) : (
              <p>Showing all {videos.length} videos</p>
            )}
          </div>
        </div>

        {/* Videos Grid */}
        {currentVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentVideos.map((video) => (
              <div key={video.id} className="flex flex-col">
                <div
                  className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => handlePlayVideo(video.url)}
                >
                  <Image
                    src={video.thumbnail || "/placeholder.svg?height=200&width=350"}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/30 transition-colors duration-300">
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        video.category === "cinematic" ? "bg-purple-600 text-white" : "bg-green-600 text-white"
                      }`}
                    >
                      {video.category === "cinematic" ? "Cinematic" : "Vlog"}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-[#4a3f35] line-clamp-2">{video.title}</h3>
                  {video.description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{video.description}</p>}
                  {video.duration && <p className="text-xs text-gray-500 mt-2">Duration: {video.duration}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No videos found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search terms or filters</p>
            {(searchTerm || activeFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("")
                  setActiveFilter("all")
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg transition-colors duration-200 ${
                      currentPage === pageNum
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Vlogs
