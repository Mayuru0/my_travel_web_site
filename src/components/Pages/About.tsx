import Image from "next/image";
import React from "react";
import { FaYoutube, FaInstagram, FaTwitter, FaFacebook, FaTiktok, FaLinkedin } from "react-icons/fa";

const About = () => {
  const Social = [
    { name: "Youtube", icon: <FaYoutube size={24} />, link: "https://www.youtube.com/@0_madhuranga_0" },
    { name: "Facebook", icon: <FaFacebook size={24} />, link: "https://web.facebook.com/profile.php?id=100080722121368" },
    { name: "Instagram", icon: <FaInstagram size={24} />, link: "https://www.instagram.com/_mayuru_madhuranga_/" },
    { name: "Tiktok", icon: <FaTiktok size={24} />, link: "https://www.tiktok.com/@0_madhuranga_0?is_from_webapp=1&sender_device=pc" },
    { name: "Linkedin", icon: <FaLinkedin size={24} />, link: "https://www.linkedin.com/in/mayuru-madhuranga-7bbb73312/" },
    { name: "Twitter", icon: <FaTwitter size={24} />, link: "https://x.com/00_Marsh_00" },
  ];

  return (
    <div className="bg-[#e6f2e6] text-[#333]">
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image & Social Links */}
        <div className="flex flex-col items-center md:items-start  lg:items-center">
          <Image
            width={200}
            height={200}
            src="/hero/abc.JPG"
            alt="Mayuru Madhuranga"
            className="rounded-full border border-green-500 w-40 h-40 sm:w-48 sm:h-48 object-cover"
          />
          <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
            {Social.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-600"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* About Text */}
        <div className="text-center md:text-left lg:-ml-20 ">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">About Me</h2>
          <p className="text-gray-700 text-sm sm:text-base">
          Hello, I&apos;m Mayuru, a mountaineer, nature lover, and traveler. I love to travel to new places, experience different cultures, and capture the spirit of each adventure. I have published this site to bring you the beauty of this world through my travelogues, films, and images.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
