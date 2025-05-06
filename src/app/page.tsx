import About from "@/components/Pages/About";

import TravelGalleryCarosal from "@/components/Pages/Gallery/TravelGalleryCarosal";
import Contact from "@/components/Pages/Contact";
import Hero from "@/components/Pages/Hero";
import FeaturedVideos from "@/components/Pages/Vlogs/featured-videos";


export default function Home() {
  return (
    <div>
       <section id="home">
      <Hero/>
      </section>
       <section id="about">
      <About/>
      </section>
      <section id="vlogs" className="bg-[#e6f2e6] ">
      
      <FeaturedVideos/>
      </section>

      <section id="gallery" className="bg-[#e6f2e6] ">
      <TravelGalleryCarosal/>
      </section>
      <section id="contact" className="bg-[#e6f2e6] ">
      <Contact/>
     </section>
    </div>
  );
}
