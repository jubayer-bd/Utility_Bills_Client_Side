import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { IoMdCash } from "react-icons/io";
import { motion } from "framer-motion";
import axios from "axios";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Bills | UtilityBill";
  }, []);

  useEffect(() => {
    setLoading(true);

    const url =
      filter === "All"
        ? "https://utility-bills-server-side.vercel.app/bills"
        : `https://utility-bills-server-side.vercel.app/bills?category=${encodeURIComponent(
            filter
          )}`;

    axios
      .get(url)
      .then((res) => setBills(res.data))
      .catch((err) => console.error("Error fetching bills:", err))
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="lg:max-w-7xl md:max-w-10/12 lg: max-w-11/12  mx-auto px-4 py-12"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-base-content">
        Explore All Utility Bills
      </h2>
      <p className="text-center text-base-content/70 mb-10">
        Browse all bills added by users. Filter by category using the dropdown.
      </p>

      {/* Dropdown Filter */}
      <div className="flex justify-center mb-10">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-base-200 bg-base-100 text-base-content rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
        >
          <option value="All">All Categories</option>
          <option value="Electricity">Electricity</option>
          <option value="Gas">Gas</option>
          <option value="Water">Water</option>
          <option value="Internet">Internet</option>
        </select>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : bills.length === 0 ? (
        <p className="text-center text-base-content/70 text-lg">
          No bills found.
        </p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
        >
          {bills.map((bill, index) => (
            <motion.div
              key={bill._id || bill.title || index}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="rounded-2xl shadow-md bg-base-100 text-base-content border border-base-200 hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={bill.image}
                alt={bill.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-semibold h-10 mb-4">
                  {bill.title}
                </h3>

                <p className="flex items-center gap-2 text-base-content/70">
                  <MdCategory className="text-blue-500" /> {bill.category}
                </p>

                <p className="flex items-center gap-2 text-base-content/70">
                  <FaMapMarkerAlt className="text-blue-500" /> {bill.location}
                </p>

                <p className="flex items-center gap-2 text-base-content/70">
                  <FaCalendarAlt className="text-blue-500" /> {bill.date}
                </p>

                <p className="flex items-center gap-2 font-semibold text-base-content">
                  <IoMdCash className="text-green-600" /> BDT {bill.amount}
                </p>

                <Link to={`/bills/${bill._id}`}>
                  <button className="mt-3 w-full btn btn-primary text-white">
                    See Details
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Bills;
