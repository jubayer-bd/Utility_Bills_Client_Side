import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaBolt, FaGasPump, FaTint, FaWifi } from "react-icons/fa";

const Category = () => {
  const categories = [
    {
      id: 1,
      name: "Electricity",
      icon: <FaBolt className="text-yellow-400 text-4xl" />,
      bg: "bg-yellow-100",
      link: "/bills?category=electricity",
    },
    {
      id: 2,
      name: "Gas",
      icon: <FaGasPump className="text-red-400 text-4xl" />,
      bg: "bg-red-100",
      link: "/bills?category=gas",
    },
    {
      id: 3,
      name: "Water",
      icon: <FaTint className="text-blue-400 text-4xl" />,
      bg: "bg-blue-100",
      link: "/bills?category=water",
    },
    {
      id: 4,
      name: "Internet",
      icon: <FaWifi className="text-purple-400 text-4xl" />,
      bg: "bg-purple-100",
      link: "/bills?category=internet",
    },
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          Browse by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl p-8 flex flex-col items-center justify-center shadow-md hover:shadow-xl bg-white border border-gray-100`}
            >
              <div
                className={`${category.bg} w-20 h-20 rounded-full flex items-center justify-center mb-4`}
              >
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-700">
                {category.name}
              </h3>
              <Link
                to={category.link}
                className="mt-4 text-blue-500 font-medium hover:underline"
              >
                View Bills →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
