import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // ✅ FIXED (was "react-router")
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

  // ✅ Fetch bills dynamically based on selected category
  useEffect(() => {
    setLoading(true);

    const url =
      filter === "All"
        ? "http://localhost:3000//bills"
        : `http://localhost:3000/bills?category=${encodeURIComponent(filter)}`; // encode for safe URLs

    fetch(url)
      .then((res) => res.json())
      .then((data) => setBills(data))
      .catch((err) => console.error("Error fetching bills:", err))
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-6">
        Explore All Utility Bills
      </h2>

      {/* 🔽 Dropdown Filter */}
      <div className="flex justify-center mb-10">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Categories</option>
          <option value="Electricity">Electricity</option>
          <option value="Gas">Gas</option>
          <option value="Water">Water</option>
          <option value="Internet">Internet</option>
        </select>
      </div>

      {/* Bills Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {bills.length > 0 ? (
            bills.map((bill) => (
              <motion.div
                key={bill._id || bill.title} // ✅ fallback key
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl shadow-md bg-white hover:shadow-lg transition overflow-hidden"
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
        </div>
      )}
    </div>
  );
};

export default Bills;
