"use client";
import Image from 'next/image'
import React from 'react'
import { Play } from "lucide-react";
import {videos} from "../../../data/video";
const Vlogs = () => {
 


  const handlePlayVideo = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <div className='h-screen  '>
      <div className=' relative text-4xl font-bold text-center  bg-[#E8E8E8] min-h-80'>
     
        <Image src="/hero/new11.png" alt="cover" fill
        style={{ objectFit: "cover" }}
        priority
        />

        <div   className='absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center text-center -mt-2 px-4'>
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">Vlogs</h1>
        </div>


      </div>
      
      <div className='flex justify-center container mx-auto mt-10'>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div key={video.id} className="flex flex-col items-center">
              <div
                className="relative w-full aspect-video rounded-md overflow-hidden cursor-pointer scale-100 hover:scale-105 transition-transform duration-300 ease-in-out"
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
      </div>
     
    </div>
  )
}

export default Vlogs
