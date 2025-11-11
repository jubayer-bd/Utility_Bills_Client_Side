import React from "react";
import { motion } from "framer-motion";
import { FaWifi, FaBolt, FaBurn, FaTint } from "react-icons/fa";

const Category = () => {
  const categories = [
    {
      icon: <FaBolt className="text-4xl text-yellow-500 mb-2" />,
      name: "Electricity",
    },
    { icon: <FaBurn className="text-4xl text-red-500 mb-2" />, name: "Gas" },
    { icon: <FaTint className="text-4xl text-blue-500 mb-2" />, name: "Water" },
    {
      icon: <FaWifi className="text-4xl text-green-500 mb-2" />,
      name: "Internet",
    },
  ];

  return (
    <section className="py-16">
      <div className="mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-base-content">
          Categories
        </h2>

        {/* ✅ Fixed grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="p-8 bg-base-200 rounded-2xl flex flex-col items-center justify-center shadow-md hover:shadow-xl transition border border-base-200"
            >
              {cat.icon}
              <p className="font-medium text-base-content">{cat.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
