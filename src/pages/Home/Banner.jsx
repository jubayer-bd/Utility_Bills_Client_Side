import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  const slides = [
    {
      image:
        "https://i.pinimg.com/1200x/e7/4c/a9/e74ca913ea2df3765040a081a39383b5.jpg",
      title: "Manage Your Electricity Bills Easily",
      subtitle: "Track your monthly usage and payments in one place.",
      // overlay: "from-blue-800 via-blue-600 to-blue-400", // Removed
      textColor: "text-gray-900", // Changed for contrast
    },
    {
      image:
        "https://i.pinimg.com/1200x/bd/8f/da/bd8fda16c8142041f97b5bd8513801e6.jpg",
      title: "Pay Your Water Bills On Time",
      subtitle: "Never miss a due date with automated reminders.",
      // overlay: "from-teal-700 via-teal-500 to-teal-400", // Removed
      textColor: "text-gray-900", // Changed for contrast
    },
    {
      image:
        "https://i.pinimg.com/1200x/e5/96/27/e5962767e5f7cde915041d93ca7bb0ee.jpg",
      title: "Simplify Your Gas Bill Management",
      subtitle: "View, pay, and download receipts instantly.",
      // overlay: "from-orange-700 via-orange-500 to-orange-400", // Removed
      textColor: "text-gray-900", // Changed for contrast
    },
    {
      image:
        "https://i.pinimg.com/1200x/e0/74/78/e074782ed20bcd24d1ba2982aac33b45.jpg",
      title: "Internet Bills Made Simple",
      subtitle: "Manage multiple accounts in one dashboard.",
      // overlay: "from-purple-700 via-purple-500 to-purple-400", // Removed
      textColor: "text-gray-900", // Changed for contrast
    },
    {
      image:
        "https://i.pinimg.com/1200x/11/a6/41/11a6415aa0c4db82b4a0a18c089db481.jpg",
      title: "All Your Utility Bills, One Platform",
      subtitle: "Secure, fast, and convenient bill management.",
      // overlay: "from-gray-800 via-gray-600 to-gray-400", // Removed
      textColor: "text-gray-900", // Changed for contrast
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlide = slides[currentIndex];

  return (
    <section
      className="relative h-[70vh] sm:h-[80vh] md:h-[85vh] flex items-center justify-center overflow-hidden transition-all duration-700"
      style={{
        backgroundImage: `url(${currentSlide.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay div removed as requested */}
      {/* If you find the text hard to read, you might need to add a subtle dark background to the text container or a very slight, semi-transparent overlay. */}

      {/* Content */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.8 }}
        className={`relative z-10 text-center px-6 ${currentSlide.textColor}`}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          <Typewriter
            words={[currentSlide.title]}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </h1>

        <p className="text-base sm:text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          {currentSlide.subtitle}
        </p>
      </motion.div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex
                ? "bg-white"
                : "bg-gray-400 dark:bg-gray-600"
            } transition`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Banner;
