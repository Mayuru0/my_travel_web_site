"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface NavLink {
  href: string;
  label: string;
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const navigationLinks: NavLink[] = [
    { href: "home", label: "Home" },
    { href: "about", label: "About" },
    { href: "vlogs", label: "Vlogs" },
    { href: "gallery", label: "Gallery" },
    { href: "contact", label: "Contact" },
  ];

  useEffect(() => {
    setIsMounted(true);
    setIsClient(true);

    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (
          scrollPosition >= sectionTop - 50 &&
          scrollPosition < sectionTop + sectionHeight - 50
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setActiveSection(href);
    const element = document.getElementById(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  if (!isClient || !isMounted) {
    return null;
  }

  return (
    <header className="w-full fixed top-0 left-0 right-0 bg-transparent backdrop-blur-sm z-50 border-b border-white/10 ">
      <div className="mx-auto w-full">
        <div className="flex h-16 px-4 lg:px-24 items-center justify-between">
          <h1 className="text-2xl font-semibold text-white font-lexend">
            <div onClick={() => router.push("/")}>
              <Image
                src="/logo/1.png"
                alt="logo"
                width={50}
                height={50}
                className="cursor-pointer"
              />
            </div>
          </h1>

          <div className="hidden lg:flex flex-1 justify-center">
            <nav className="flex space-x-8 items-center">
              {navigationLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`transition-all duration-300 text-base font-medium cursor-pointer ${
                    activeSection === link.href
                      ? "text-green-600 underline"
                      : "text-black hover:text-[#03DAC6] hover:underline cursor-pointer"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        {isOpen && (
          <div className="lg:hidden bg-black bg-opacity-90">
            <nav className="flex flex-col space-y-4 px-4 py-4">
              {navigationLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`transition-all duration-300 text-base font-medium text-left ${
                    activeSection === link.href
                      ? "text-green-600 underline"
                      : "text-white hover:text-[#03DAC6] hover:underline "
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
