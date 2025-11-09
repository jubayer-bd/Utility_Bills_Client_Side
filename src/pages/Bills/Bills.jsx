import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { IoMdCash } from "react-icons/io";
import { motion } from "framer-motion";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3000/bills") //
      .then((res) => res.json())
      .then((data) => setBills(data))
      .catch((err) => console.error(err));
  }, []);

  const handleFilter = (category) => setFilter(category);

  const filteredBills =
    filter === "All" ? bills : bills.filter((b) => b.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-6">
        Explore All Utility Bills
      </h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {["All", "Electricity", "Gas", "Water", "Internet"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`px-5 py-2 rounded-full  font-medium transition-all duration-300 ${
              filter === cat
                ? "bg-blue-600 text-white  shadow"
                : "bg-white text-gray-700 border border-primary hover:bg-blue-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bills Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {filteredBills.length > 0 ? (
          filteredBills.map((bill) => (
            <motion.div
              key={bill._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl shadow-md bg-white  hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={bill.image}
                alt={bill.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-semibold">{bill.title}</h3>
                <p className="flex items-center gap-2 text-gray-600">
                  <MdCategory className="text-blue-500" /> {bill.category}
                </p>
                <p className="flex items-center gap-2 text-gray-600">
                  <FaMapMarkerAlt className="text-blue-500" /> {bill.location}
                </p>
                <p className="flex items-center gap-2 font-semibold text-gray-800">
                  <IoMdCash className="text-green-600" /> ৳{bill.amount}
                </p>

                <Link to={`/bills/${bill._id}`}>
                  <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    See Details
                  </button>
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500 text-lg">
            No bills found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Bills;
