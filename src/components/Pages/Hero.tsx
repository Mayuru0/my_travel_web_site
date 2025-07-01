"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/vlog");
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <Image
        src="/hero/11.JPG"
        alt="cover"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay with blur and animation */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4"
        >
          Welcome to My Travel Blog
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-white max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl"
        >
          &quot;Travel is life, one adventure at a time.&quot; It’s not just
          where we go, but who we share the journey with. Let’s wander together!
        </motion.p>

        <motion.button
          onClick={handleNavigate}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 px-6 py-3 text-sm sm:text-base md:text-lg bg-white text-black rounded-lg hover:bg-gray-200 transition duration-300 cursor-pointer"
        >
          Watch My Videos
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
