"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import Link from "next/link";

export default function FeaturedVideos() {
  const videos = [
    {
      id: 1,
      title:
        "රිවස්ටන් වල නැරඹිය යුතුම ස්ථාන📸 | රිවස්ටන් | Riverston Matale | Srilanka | 4K | Vlog#10",
      thumbnail: "/thumbnail/Untitled-1.png",
      url: "https://youtu.be/K1UIHUqavuI?si=lf89Ll_nQDu749kz",
    },
    {
      id: 2,
      title:
        "සිරිපා කරුණාව 2025🙏| රත්නපුර පලාබද්දල රජමාවත ඔස්සේ | Ratnapura Palabaddala Trail to Adam's peak🙏❤️",
      thumbnail: "/thumbnail/11.png",
      url: "https://youtu.be/vl7f1mO7PLw?si=Ko6yDOI_UW0MIg-Y",
    },
    {
      id: 3,
      title:
        "නුවරඑළිය සිට පට්ටිපොළ හරහා හෝර්ටන්තැන්නට 🥶❤| NuwaraEliya To Horton Plains Srilanka | Vlog #08",
      thumbnail: "/thumbnail/maxresdefault.webp",
      url: "https://youtu.be/VHekbVZAw98?si=qNYxwM4laUTX-VtL",
    },
  ];

  const handlePlayVideo = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="w-full py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-bold text-[#4a3f35] mb-8">
          Featured Videos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div key={video.id} className="flex flex-col items-center">
              <div
                className="relative w-full aspect-video rounded-md overflow-hidden cursor-pointer"
                onClick={() => handlePlayVideo(video.url)}
              >
                <Image
                  src={video.thumbnail || "/placeholder.svg"}
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
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center mt-6">
          <Link
            href="/mavoga"
            className="bg-[#4a3f35] text-white px-6 py-2 rounded-md hover:bg-[#3b322b] transition"
          >
            See More Videos
          </Link>
        </div>
      </div>
    </div>
  );
}
