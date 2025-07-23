import React from 'react';
import Link from 'next/link';
import { FaYoutube, FaInstagram, FaTwitter, FaFacebook, FaTiktok, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const Social = [
    { name: "Youtube", icon: <FaYoutube size={24} />, link: "https://www.youtube.com/@0_madhuranga_0" },
    { name: "Facebook", icon: <FaFacebook size={24} />, link: "https://web.facebook.com/profile.php?id=100080722121368" },
    { name: "Instagram", icon: <FaInstagram size={24} />, link: "https://www.instagram.com/_mayuru_madhuranga_/" },
    { name: "Tiktok", icon: <FaTiktok size={24} />, link: "https://www.tiktok.com/@0_madhuranga_0?is_from_webapp=1&sender_device=pc" },
    { name: "Linkedin", icon: <FaLinkedin size={24} />, link: "https://www.linkedin.com/in/mayuru-madhuranga-7bbb73312/" },
    { name: "Twitter", icon: <FaTwitter size={24} />, link: "https://x.com/00_Marsh_00" },
  ];

  return (
    <footer className="bg-green-100 text-gray-700 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-gray-900 text-xl font-bold mb-4">Mayuru Madhuranga</h3>
          <p className="text-sm text-gray-600">
            Sharing my travel stories, videos, and photos from around the world. Follow along and get inspired for your next adventure!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-gray-900 text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
            <li><Link href="/about" className="hover:text-gray-900">About</Link></li>
            <li><Link href="/videos" className="hover:text-gray-900">Videos</Link></li>
            <li><Link href="/contact" className="hover:text-gray-900">Contact</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-gray-900 text-lg font-semibold mb-4">Subscribe</h4>
          <form className="flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Your email"
              className="w-full sm:w-auto flex-grow px-3 py-2 rounded sm:rounded-l bg-white border border-gray-300 focus:outline-none mb-2 sm:mb-0"
            />
            <button className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 text-white  sm:rounded-r  transition cursor-pointer">
              Subscribe
            </button>
          </form>
        </div>

        {/* Social Icons */}
        <div className='xl:ml-10 lg:ml-20 ml-0'>
          <h4 className="text-gray-900 text-lg m font-semibold mb-4">Follow Me</h4>
          <div className="flex flex-wrap gap-4">
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
      </div>

      <div className="mt-8 border-t border-gray-300 pt-4 text-center text-xs sm:text-sm text-gray-500">
        © 2025 Mayuru Madhuranga. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
