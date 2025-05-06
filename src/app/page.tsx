import About from "@/components/Pages/About";

import TravelGalleryCarosal from "@/components/Pages/Gallery/TravelGalleryCarosal";
import Contact from "@/components/Pages/Contact";
import Hero from "@/components/Pages/Hero";
import FeaturedVideos from "@/components/Pages/Vlogs/featured-videos";


export default function Home() {
  return (
    <div>
      <Hero/>

      <About/>

     
      <div className="bg-[#e6f2e6] ">
      <FeaturedVideos/>
     
      <TravelGalleryCarosal/>
     
      
      <Contact/>
      </div>
    </div>
  );
}
