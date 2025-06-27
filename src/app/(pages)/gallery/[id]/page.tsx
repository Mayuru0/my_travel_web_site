// app/gallery/[id]/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Gallery from '@/components/Pages/Gallery/Gallery';
import { destinations } from '@/data/destinations';

const Page = () => {
  const { id } = useParams<{ id: string }>();

  const destination = destinations.find((d) => d.id.toString() === id);

  if (!destination) {
    return <div className="p-4 text-red-500">Destination not found</div>;
  }

  return (
    <Gallery id={destination.id.toString()} name={destination.name} image={destination.image} gallery={destination.gallery}  description={destination.description}           />
  );
};

export default Page;
