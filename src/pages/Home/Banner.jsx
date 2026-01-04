import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router";
import { FiChevronLeft, FiChevronRight, FiChevronsDown } from "react-icons/fi";

const Banner = () => {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop",
      title: "Manage Electricity Bills",
      subtitle:
        "Track your monthly usage and payments in one unified dashboard.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=1888&auto=format&fit=crop",
      title: "Pay Water Bills On Time",
      subtitle:
        "Never miss a due date again with our automated reminder system.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1667222353884-ba845e44a4f5?q=80&w=1170&auto=format&fit=crop",
      title: "Simplify Gas Management",
      subtitle: "View history, pay securely, and download receipts instantly.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
      title: "Internet Bills Made Simple",
      subtitle: "Manage multiple service providers from a single account.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      title: "All Utilities, One Platform",
      subtitle:
        "Secure, fast, and convenient bill management for modern living.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide logic (pauses on hover)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, isHovered]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section
      className="relative w-full h-[43vh] md:h-[50vh] lg:h-[60vh] flex items-center justify-center overflow-hidden rounded-xl shadow-2xl mt-6 mx-auto max-w-[95%] lg:max-w-7xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image Layer with AnimatePresence for smooth crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentSlide.image})` }}
        />
      </AnimatePresence>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Content Layer */}
      <div className="relative z-10 w-full px-6 md:px-12 text-center max-w-4xl mx-auto mt-[-20px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center justify-center"
          >
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg min-h-[80px] md:min-h-[100px] flex items-center justify-center">
              <span>
                <Typewriter
                  words={[currentSlide.title]}
                  loop={1}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-200 text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              {currentSlide.subtitle}
            </p>

            {/* CTA Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/bills"
                className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(20,184,166,0.5)] transition-all duration-300"
              >
                Get Started Now
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual Navigation Controls (Left/Right) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all hidden md:block group"
        aria-label="Previous Slide"
      >
        <FiChevronLeft
          size={30}
          className="group-hover:-translate-x-1 transition-transform"
        />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all hidden md:block group"
        aria-label="Next Slide"
      >
        <FiChevronRight
          size={30}
          className="group-hover:translate-x-1 transition-transform"
        />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-16 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${
              index === currentIndex
                ? "w-8 bg-teal-400"
                : "w-2.5 bg-gray-400/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Visual Hint (Scroll Down Animation) */}
      <motion.div
        className="absolute bottom-4 z-20 flex flex-col items-center text-white/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 1,
        }}
      >
        <span className="text-xs uppercase tracking-widest mb-1">Scroll</span>
        <FiChevronsDown size={24} />
      </motion.div>
    </section>
  );
};

export default Banner;
