import About from "@/components/Pages/About";

import TravelGalleryCarosal from "@/components/Pages/Gallery/TravelGalleryTravelGalleryContainer";
import Contact from "@/components/Pages/Contact";
import Hero from "@/components/Pages/Hero";
import FeaturedVideos from "@/components/Pages/Vlogs/featured-videos";
import Head from "next/head";


export default function Home() {
  return (
    <div>
      <Head>
        <title>Madhuranga Travel Vlogs | Explore Sri Lanka</title>
        <meta name="description" content="Explore breathtaking vlogs of Sri Lanka's hidden gems by Mayuru Madhuranga. Cultural journeys, trekking adventures, and more!" />
        <meta name="keywords" content="Sri Lanka travel, vlog, Mayuru Madhuranga, trekking, cultural tours" />
        <meta name="author" content="Mayuru Madhuranga" />
        <meta property="og:title" content="Madhuranga Travel Vlogs" />
        <meta property="og:description" content="Explore breathtaking vlogs of Sri Lanka with Mayuru." />
        <meta property="og:image" content="/thumbnail.jpg" />
        <meta property="og:url" content="https://madhuranga-travel-blog.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
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
