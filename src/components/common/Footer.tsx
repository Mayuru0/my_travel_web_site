import React from 'react';
import { Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#101010] text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4">Mayuru Madhuranga</h3>
          <p className="text-sm text-gray-400">
            Sharing my travel stories, videos, and photos from around the world. Follow along and get inspired for your next adventure!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/videos" className="hover:text-white">Videos</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Subscribe</h4>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-l bg-gray-800 border border-gray-600 focus:outline-none"
            />
            <button className="px-4 py-2 bg-orange-500 text-white rounded-r hover:bg-orange-600 transition">
              Subscribe
            </button>
          </form>
        </div>

        {/* Social Icons */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Follow Me</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <Linkedin size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © 2025 Mayuru Madhuranga. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
