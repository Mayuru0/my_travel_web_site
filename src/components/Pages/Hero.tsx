"use client";

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'


const Hero = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/vlog'); 
  };

  return (
    <section className="relative w-full h-screen">
      <Image src="/hero/11.JPG" alt="cover" fill style={{ objectFit: "cover" }} priority />

      <div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4">
          Welcome to My Travel Blog
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          &quot;Travel is life, one adventure at a time.&quot; It’s not just where we go, but who we share the journey with. Let’s wander together!
        </p>
        <button
          onClick={handleNavigate}
          className="mt-6 px-6 py-3 text-sm sm:text-base md:text-lg bg-white text-black rounded-lg hover:bg-gray-200 transition duration-300 cursor-pointer"
        >
          Watch My Videos
        </button>
      </div>
    </section>
  );
};

export default Hero;
