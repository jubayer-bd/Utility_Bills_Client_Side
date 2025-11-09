import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import axios from "axios";

const RecentBills = () => {
  const [bills, setBills] = useState([]);

  // 🔹 Load the 6 most recent bills
  useEffect(() => {
    axios
      .get("https://utility-bills-server-side.vercel.app/latest-bills") // replace with your actual backend URL
      .then((res) => setBills(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
          Recently Added Bills
        </h2>

        {bills.length === 0 ? (
          <p className="text-center text-gray-500">Loading latest bills...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {bills.map((bill) => (
              <motion.div
                key={bill._id}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={bill.image}
                    alt={bill.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                    {bill.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {bill.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">
                    <strong>Location:</strong> {bill.location}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    <strong>Date:</strong> {bill.date}
                  </p>

                  <Link
                    to={`/bills/${bill._id}`}
                    className="block text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
                  >
                    See Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentBills;
