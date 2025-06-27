'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { destinations } from '@/data/destinations';

type GalleryProps = {
  id: string;
  name: string;
  image: StaticImageData;
  gallery: { image1: StaticImageData; image2: StaticImageData };
  description: string
};

const Gallery: React.FC<GalleryProps> = ({ id, name, image, gallery,description }) => {
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>('');

  // Filter out the current destination from the list
  const otherDestinations = destinations.filter(d => d.id.toString() !== id);

  // Get the selected destination object based on selectedDestinationId
  const selectedDestination = otherDestinations.find(dest => dest.id.toString() === selectedDestinationId);

  return (
    <div className=" space-y-6  bg-[#e6f2e6]">
  <div className="relative text-4xl font-bold text-center bg-[#E8E8E8] min-h-80">
        <Image
          src="/hero/new11.png"
          alt="cover"
          fill
          style={{ objectFit: "cover" }}
          priority
        />

        <div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-center -mt-2 px-4">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-0">Gallery</h1>
        </div>
      </div>
<div className='container mx-auto h-screen'>
    <div className=" p-6 rounded-lg shadow-lg border border-gray-300 mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-[#004643]">Search My Other Travel Location</h2>

        <select
          value={selectedDestinationId}
          onChange={(e) => setSelectedDestinationId(e.target.value)}
          className="w-full max-w-md p-3 border border-gray-300 rounded-md shadow-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[#004643] focus:border-transparent"
        >
          <option value="">-- Select a Location --</option>
          {otherDestinations.map((dest) => (
            <option key={dest.id} value={dest.id.toString()}>
              {dest.name}
            </option>
          ))}
        </select>

        {selectedDestination ? (
          <div className="mt-4">
            <Link
              href={`/gallery/${selectedDestination.id}`}
              className="inline-flex items-center px-4 py-2 bg-[#004643] text-white rounded-md hover:bg-[#004643]/90 transition-colors"
            >
              Visit {selectedDestination.name}
            </Link>
          </div>
        ) : (
          <p className="text-gray-500">Please select a destination to explore.</p>
        )}
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 rounded-lg shadow-lg border border-gray-300 p-4">
  <div className="  w-full aspect-video rounded-md overflow-hidden cursor-pointer scale-100 hover:scale-105 transition-transform duration-300 ease-in-out">
    <Image
      src={gallery.image1}
      alt={name}
      
      className="object-cover absolute right-72"
    />
  </div>

  <div className="absolute text-center ml-[35%] flex flex-col p-4 space-y-2">
    <h1 className="text-3xl font-bold text-[#004643]">{name}</h1>
    <p className="text-lg text-gray-600 mt-2">
      <span className="font-semibold">Location:</span> {name}
    </p>
    <p className="text-base text-gray-700 mt-4">{description}</p>
  </div>
</div>

      
      </div>
    </div>
  );
};

export default Gallery;
