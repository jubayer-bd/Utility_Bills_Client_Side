import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";

const Banner = () => {
  // 🔹 Array of slides (replace image links later)
  const slides = [
    {
      image:
        "https://i.pinimg.com/1200x/e7/4c/a9/e74ca913ea2df3765040a081a39383b5.jpg",
      title: "Manage Your Electricity Bills Easily",
      subtitle: "Track your monthly usage and payments in one place.",
    },
    {
      image:
        "https://i.pinimg.com/1200x/bd/8f/da/bd8fda16c8142041f97b5bd8513801e6.jpg",
      title: "Pay Your Water Bills On Time",
      subtitle: "Never miss a due date with automated reminders.",
    },
    {
      image:
        "https://i.pinimg.com/1200x/e5/96/27/e5962767e5f7cde915041d93ca7bb0ee.jpg",
      title: "Simplify Your Gas Bill Management",
      subtitle: "View, pay, and download receipts instantly.",
    },
    {
      image:
        "https://i.pinimg.com/1200x/e0/74/78/e074782ed20bcd24d1ba2982aac33b45.jpg",
      title: "Internet Bills Made Simple",
      subtitle: "Manage multiple accounts in one dashboard.",
    },
    {
      image:
        "https://i.pinimg.com/1200x/11/a6/41/11a6415aa0c4db82b4a0a18c089db481.jpg",
      title: "All Your Utility Bills, One Platform",
      subtitle: "Secure, fast, and convenient bill management.",
    },
  ];

  // 🔹 Track current slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔹 Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlide = slides[currentIndex];

  return (
    <section
      className="relative h-[85vh] flex items-center justify-center text-white overflow-hidden transition-all duration-700"
      style={{
        backgroundImage: `url(${currentSlide.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 bg-opacity-100"></div>

      {/* Content */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <Typewriter
            options={{
              strings: [currentSlide.title],
              autoStart: true,
              loop: false,
              delay: 60,
            }}
          />
        </h1>

        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          {currentSlide.subtitle}
        </p>

        {/* <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all"
        >
          Get Started
        </motion.button> */}
      </motion.div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Banner;
