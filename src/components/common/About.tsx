import React from "react";
import { Youtube, Instagram, Twitter } from "lucide-react";

const About = () => {
  return (
    <div className="bg-[#f5f1e6] text-[#333]">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[400px] flex flex-col justify-center items-center text-white text-center" style={{ backgroundImage: "url('/hero-image.jpg')" }}>
        <h1 className="text-4xl sm:text-5xl font-bold mb-2">MAYURU MADHURANGA</h1>
        <p className="text-lg sm:text-2xl mb-4">Exploring the Rich Heritage</p>
        <button className="bg-orange-600 px-6 py-2 rounded-full text-white hover:bg-orange-700 transition">WATCH MY VIDEOS</button>
      </section>

      {/* About Me Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        <img src="/profile.jpg" alt="Mayuru Madhuranga" className="rounded-full w-48 h-48 object-cover mx-auto md:mx-0" />
        <div>
          <h2 className="text-3xl font-semibold mb-4">About Me</h2>
          <p className="text-gray-700 mb-4">
            I'm a travel enthusiast with a passion for exploring the rich cultural heritage and breathtaking landscapes of the world. Join me on my journeys as I uncover the stories of our planet.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-orange-600"><Youtube size={24} /></a>
            <a href="#" className="hover:text-orange-600"><Instagram size={24} /></a>
            <a href="#" className="hover:text-orange-600"><Twitter size={24} /></a>
          </div>
        </div>
      </section>

      {/* Featured Videos Section */}
      <section className="bg-[#e7dec8] py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Featured Videos</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              <img src="/video1.jpg" alt="Exploring Ancient Temples" className="w-full h-40 object-cover" />
              <div className="p-4 text-center">Exploring Ancient Temples</div>
            </div>
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              <img src="/video2.jpg" alt="Hiking Through Lush Forests" className="w-full h-40 object-cover" />
              <div className="p-4 text-center">Hiking Through Lush Forests</div>
            </div>
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              <img src="/video3.jpg" alt="Cultural Adventures in Sri Lanka" className="w-full h-40 object-cover" />
              <div className="p-4 text-center">Cultural Adventures in Sri Lanka</div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Gallery Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Travel Gallery</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <img src="/gallery1.jpg" alt="Gallery Image 1" className="rounded-lg object-cover w-full h-40" />
            <img src="/gallery2.jpg" alt="Gallery Image 2" className="rounded-lg object-cover w-full h-40" />
            <img src="/gallery3.jpg" alt="Gallery Image 3" className="rounded-lg object-cover w-full h-40" />
            <img src="/gallery4.jpg" alt="Gallery Image 4" className="rounded-lg object-cover w-full h-40" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;