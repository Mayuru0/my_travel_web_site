// components/Hero.tsx
import Image from "next/image";
import React from "react";

const GalleryHero = () => {
  return (
    <div className="relative text-4xl font-bold text-center bg-[#E8E8E8] min-h-80">
      <Image
        src="/hero/new11.png"
        alt="cover"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-center -mt-2 px-4">
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-0 animate-bounce">Gallery</h1>
      </div>
    </div>
  );
};

export default React.memo(GalleryHero);
