"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { MoreDestination } from "../../../data/destinations";
import plusIcon from "../../../../public/octicon_feed-plus-16.svg"

type DestinationCardProps = {
  moreDestinations: MoreDestination;
};

const TravelGalleryCard: React.FC<DestinationCardProps> = ({ moreDestinations }) => (
<div className="flex items-center justify-center ">
  <div className="grid grid-cols-1 gap-5 ">
    <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl rounded-lg">
      <div className="h-[280px] w-[280px]">
        <Image className="h-full w-full object-cover transition-transform duration-500  group-hover:scale-110" src={moreDestinations.image} alt={moreDestinations.name} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent group-hover:from-black/70 group-hover:via-black/60"></div>
      <div className="absolute inset-0 rounded-xl flex bg-black-50 translate-y-[59%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
        <h1 className=" text-2xl font-bold text-white mt-[-35%]">{moreDestinations.name}</h1>
        <div className=" mt-[10%]"><Image src={plusIcon} alt="plusIcon"/></div>
      </div>
    </div>

  </div>
 
</div>
);

type DestinationCarouselProps = {
  moreDestinations: MoreDestination[];
};

const TravelGalleryCarosal: React.FC<DestinationCarouselProps> = ({
  moreDestinations,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % (moreDestinations.length - 3));
  };

  const prevSlide = () => {
    setStartIndex(
      (prevIndex) =>
        (prevIndex - 1 + moreDestinations.length - 3) % (moreDestinations.length - 3)
    );
  };

  return (
    <div className="container mx-auto px-4">
      <h2
        className="text-4xl font-bold leading-[63.98px] text-left text-[#004643] mb-4 font-playfair"
        style={{ fontFamily: "Playfair Display" }}
      >Travel Gallery
      </h2>

      <div className="relative">
      <div className="flex space-x-4 justify-center  ">
          {moreDestinations
            .slice(startIndex, startIndex + 5)
            .map((moreDestinations, index) => (
              <TravelGalleryCard key={index} moreDestinations={moreDestinations} />
            ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        >
          <ChevronLeftIcon size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        >
          <ChevronRightIcon size={24} />
        </button>
      </div>
    </div>
  );
};

export default TravelGalleryCarosal;
