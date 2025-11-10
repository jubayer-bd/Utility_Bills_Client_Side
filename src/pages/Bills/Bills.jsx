import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { IoMdCash } from "react-icons/io";
import { motion } from "framer-motion";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Bills | Utility Bills";
  }, []);

  useEffect(() => {
    setLoading(true);

    const url =
      filter === "All"
        ? "https://utility-bills-server-side.vercel.app/bills"
        : `https://utility-bills-server-side.vercel.app/bills?category=${encodeURIComponent(
            filter
          )}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setBills(data))
      .catch((err) => console.error("Error fetching bills:", err))
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 py-12"
    >
      <h2 className="text-3xl font-bold text-center mb-6">
        Explore All Utility Bills
      </h2>

      {/* 🔽 Dropdown Filter */}
      <div className="flex justify-center mb-10">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300  rounded-lg px-4 py-2 text-gray-700 dark:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Categories</option>
          <option value="Electricity">Electricity</option>
          <option value="Gas">Gas</option>
          <option value="Water">Water</option>
          <option value="Internet">Internet</option>
        </select>
      </div>

      {/* 🔄 Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
        >
          {bills.length > 0 ? (
            bills.map((bill, index) => (
              <motion.div
                key={bill._id || bill.title || index}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="rounded-2xl shadow-md bg-white hover:shadow-xl transition overflow-hidden"
              >
                <img
                  src={bill.image}
                  alt={bill.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 space-y-2">
                  <h3 className="text-xl font-semibold h-10 mb-4">{bill.title}</h3>
                  <p className="flex items-center gap-2 text-gray-600">
                    <MdCategory className="text-blue-500" /> {bill.category}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <FaMapMarkerAlt className="text-blue-500" /> {bill.location}
                  </p>
                  <p className="flex items-center gap-2 font-semibold text-gray-800">
                    <IoMdCash className="text-green-600" /> BDT {bill.amount}
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
        </motion.div>
      )}
    </motion.div>
  );
};

export default Bills;
