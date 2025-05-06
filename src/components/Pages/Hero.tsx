import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div>
      <section className="relative w-full h-screen">
      <Image
        src="/hero/11.JPG"
        alt="cover"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">
          Welcome to My Travel Blog
        </h1>
        <p className="text-lg sm:text-2xl text-white max-w-2xl">
         "Travel is life, one adventure at a time. It’s not just where we go, but who we share the journey with. Let’s wander together!"  
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-black rounded-lg text-lg hover:bg-gray-200 transition">
          Watch My Videos
        </button>
      </div>
    </section>
    </div>
  )
}

export default Hero
