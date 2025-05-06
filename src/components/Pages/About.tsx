import Image from "next/image";
import React from "react";
import { FaYoutube, FaInstagram, FaTwitter, FaFacebook, FaTiktok,FaLinkedin } from "react-icons/fa";

const About = () => {
  const Social = [
    {
      name: "Youtube",
      icon: <FaYoutube size={24} />,
      link: "https://www.youtube.com/@0_madhuranga_0",
    },
    {
      name: "Facebook",
      icon: <FaFacebook size={24} />,
      link: "https://web.facebook.com/profile.php?id=100080722121368",
    },
    {
      name: "Instagram",
      icon: <FaInstagram size={24} />,
      link: "https://www.instagram.com/_mayuru_madhuranga_/",
    },
    {
      name: "Tiktok",
      icon: <FaTiktok size={24} />,
      link: "https://www.tiktok.com/@0_madhuranga_0?is_from_webapp=1&sender_device=pc",
    },
    {
      name: "Linkedin",
      icon: <FaLinkedin size={24} />,
      link: "https://www.linkedin.com/in/mayuru-madhuranga-7bbb73312/",
    },
    {
      name: "Twitter",
      icon: <FaTwitter size={24} />,
      link: "https://x.com/00_Marsh_00",
    },
  
  ];

  return (
    <div className="bg-[#e6f2e6] text-[#333]">
      {/* About Me Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div className="ml-10">
          <Image
            width={200}
            height={200}
            src="/hero/abc.JPG"
            alt="Mayuru Madhuranga"
            className="rounded-full border border-green-500 w-48 h-48 object-cover mx-auto md:mx-0"
          />
          <div className="flex space-x-4 mt-4 justify-center md:justify-start">
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

        <div className="md:-ml-52">
          <h2 className="text-3xl font-semibold mb-4">About Me</h2>
          <p className="text-gray-700 mb-4">
          Hello, I&apos;m Mayuru — a nature lover, hiker, and traveler. I adore sharing real stories and moments from my travels, and I have a strong enthusiasm for discovering new cultures and landscapes. Join me on this journey to discover the beauty of the world!
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
