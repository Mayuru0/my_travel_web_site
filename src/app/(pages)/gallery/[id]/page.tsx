"use client";
import React from 'react'
import { useParams } from "next/navigation";
import Gallery from '@/components/Pages/Gallery/Gallery';
import GalleryHero from '@/components/Pages/Gallery/GalleryHero';
const page = () => {
    const { id } = useParams<{ id: string }>();
  return (
    <div>
      <GalleryHero />
      <Gallery galleryId={id} />
    </div>
  )
}

export default page
