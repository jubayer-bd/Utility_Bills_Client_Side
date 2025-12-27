import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router";

const Banner = () => {
  const slides = [
    {
      // Image: Concept of finance/calculation
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop",
      title: "Manage Your Electricity Bills Easily",
      subtitle:
        "Track your monthly usage and payments in one unified dashboard.",
    },
    {
      // Image: Clear water/nature
      image:
        "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=1888&auto=format&fit=crop",
      title: "Pay Your Water Bills On Time",
      subtitle:
        "Never miss a due date again with our automated reminder system.",
    },
    {
      // Image: Gas/Kitchen flame (Abstract)
      image:
        "https://images.unsplash.com/photo-1667222353884-ba845e44a4f5?q=80&w=1170&auto=format&fit=crop",
      title: "Simplify Your Gas Bill Management",
      subtitle: "View history, pay securely, and download receipts instantly.",
    },
    {
      // Image: Technology/Connections
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
      title: "Internet Bills Made Simple",
      subtitle: "Manage multiple service providers from a single account.",
    },
    {
      // Image: Modern Architecture/City
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      title: "All Your Utility Bills, One Platform",
      subtitle:
        "Secure, fast, and convenient bill management for modern living.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 6 seconds (slightly slower for better reading)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative w-full h-[40vh] md:h-[60vh] lg:h-[60vh] flex items-center justify-center overflow-hidden rounded-xl shadow-2xl mt-10 mx-auto max-w-7xl">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-in-out transform scale-105"
        style={{
          backgroundImage: `url(${currentSlide.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark Overlay Layer - Essential for text readability */}
      <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/60 via-black/50 to-transparent" />

      {/* Content Layer */}
      <div className="relative z-10 w-full px-6 md:px-12 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center"
          >
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg h-[80px] md:h-[100px] flex items-center justify-center">
              <span>
                <Typewriter
                  words={[currentSlide.title]}
                  loop={1}
                  cursor
                  cursorStyle="_"
                  typeSpeed={50}
                  deleteSpeed={30}
                  delaySpeed={1000}
                />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-200 text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              {currentSlide.subtitle}
            </p>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-colors duration-300"
            >
              <Link to={"/bills"}>Get Started Now</Link>
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 rounded-full transition-all duration-300 shadow-sm ${
              index === currentIndex
                ? "w-8 bg-teal-500"
                : "w-3 bg-gray-400/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Banner;
