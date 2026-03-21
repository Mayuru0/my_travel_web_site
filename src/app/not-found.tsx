"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Compass, MapPin, ArrowLeft } from "lucide-react";

const Custom404 = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <Image
        src="/hero/abc.JPG"
        alt="lost in travel"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center px-4">

        {/* Spinning compass */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="mb-6 text-yellow-400"
        >
          <Compass size={72} strokeWidth={1.2} />
        </motion.div>

        {/* 404 number */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10rem] font-extrabold leading-none text-white/10 select-none"
          style={{ textShadow: "0 0 80px rgba(255,255,255,0.15)" }}
        >
          404
        </motion.h1>

        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="-mt-8 mb-4"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <MapPin size={20} className="text-yellow-400" />
            <span className="text-yellow-400 text-sm font-semibold uppercase tracking-widest">
              Location Not Found
            </span>
            <MapPin size={20} className="text-yellow-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            You&apos;re Off the Map!
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            Looks like this destination doesn&apos;t exist on our travel map.
            Even the best explorers get lost sometimes — let&apos;s get you back on track.
          </p>
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-6 px-8 py-3 rounded-full bg-yellow-400 text-black font-bold text-base sm:text-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-yellow-400/40"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-10 text-white/40 text-sm italic"
        >
          &quot;Not all those who wander are lost — but this page is.&quot;
        </motion.p>
      </div>
    </div>
  );
};

export default Custom404;
