import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 overflow-hidden">
      <AnimatePresence mode="wait">
        {/* --- LOADING SCREEN --- */}
        <motion.div
          key="loader"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          {/* Spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-3"></div>

          {/* Text */}
          <p className="text-gray-600 text-lg font-medium">
            Loading your data...
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoadingPage;
