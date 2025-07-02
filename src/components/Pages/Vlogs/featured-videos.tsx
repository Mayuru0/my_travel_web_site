"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import Link from "next/link";
import { Vlog } from "@/types/index";
import { getVlogs } from "@/lib/vlog";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FeaturedVideos() {
  const [vlogs, setVlogs] = useState<Vlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVlogs = async () => {
      try {
        const data = await getVlogs();
        setVlogs(data);
      } catch (error) {
        console.error("Failed to fetch vlogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVlogs();
  }, []);

  const handlePlayVideo = (url: string) => {
    window.open(url, "_blank");
  };

  const lastThreeVlogs = vlogs.slice(0, 3);

  return (
    <div className="w-full py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-bold text-[#4a3f35] mb-8"
        >
          Featured Videos
        </motion.h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-300 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                </div>
                <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lastThreeVlogs.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div
                  className="relative w-full aspect-video rounded-md overflow-hidden cursor-pointer scale-100 hover:scale-105 transition-transform duration-300 ease-in-out"
                  onClick={() => handlePlayVideo(video.url)}
                >
                  <Image
                    src={video.thumbnailUrl || "/placeholder.svg"}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/30 rounded-full p-3 backdrop-blur-sm">
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                  </div>
                </div>
                <p className="text-center text-[#4a3f35] mt-2 font-medium">
                  {video.title}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* See More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mt-6"
        >
          <Link
            href="/vlog"
            className="bg-[#4a3f35] text-white px-6 py-2 rounded-md hover:bg-[#3b322b] transition"
          >
            See More Videos
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
