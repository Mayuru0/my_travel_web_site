"use client"

import { useEffect, type FC } from "react"
import { Phone, Mail, MapPin } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

const Contact: FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section
      className="max-w-[1200px] mx-auto bg-[#e6f2e6] rounded-4xl sm:py-20 py-12 px-6 "
      id="contact"
      data-aos="fade-up"
      data-aos-duration="1600"
    >
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Contact Info Section */}
        <div className="space-y-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-6 animate-fade-in">
            Let’s Connect
          </h2>
          <p className="text-gray-800 text-lg mb-8">
            I’d love to hear from you! Whether you have a question, a project idea, or just want to say hi — drop a message below or reach out directly.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4" data-aos="fade-right">
              <Phone className="h-7 w-7 text-green-400 animate-pulse" />
              <div>
                <h4 className="text-xl font-semibold text-black">Phone</h4>
                <p className="text-gray-700">+94 774366459</p>
              </div>
            </div>

            <div className="flex items-center gap-4" data-aos="fade-right" data-aos-delay="100">
              <Mail className="h-7 w-7 text-green-400 animate-pulse" />
              <div>
                <h4 className="text-xl font-semibold text-black">Email</h4>
                <p className="text-gray-700">mayurumaduranga@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4" data-aos="fade-right" data-aos-delay="200">
              <MapPin className="h-7 w-7 text-green-400 animate-pulse" />
              <div>
                <h4 className="text-xl font-semibold text-black">Address</h4>
                <p className="text-gray-700">No. 79, Maryland, Wathurugama, Gampaha, Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <form
          action="https://getform.io/f/bwnqlyja"
          method="POST"
          className="bg-[#d0e4d0] rounded-2xl p-8 space-y-5 shadow-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstname"
              placeholder="Firstname"
              className="w-full px-4 py-3 bg-[#d0e4d0] text-black placeholder-gray-500 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Lastname"
              className="w-full px-4 py-3 bg-[#d0e4d0] text-black placeholder-gray-500 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full px-4 py-3 bg-[#d0e4d0] text-black placeholder-gray-500 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            className="w-full px-4 py-3 bg-[#d0e4d0] text-black placeholder-gray-500 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          
          <textarea
            name="message"
            placeholder="Type your message here."
            rows={5}
            className="w-full px-4 py-3 bg-[#d0e4d0] text-black placeholder-gray-500 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
