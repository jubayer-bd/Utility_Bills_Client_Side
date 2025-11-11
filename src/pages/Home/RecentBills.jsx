import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { IoMdCash } from "react-icons/io";
import { motion } from "framer-motion";
import axios from "axios";

const RecentBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://utility-bills-server-side.vercel.app/latest-bills")
      .then((res) => setBills(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto px-4 py-12"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-base-content">
        Recently Added Bills
      </h2>
      <p className="text-center text-base-content/70 mb-10">
        Check out the latest bills added by users.
      </p>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : bills.length === 0 ? (
        <p className="text-center text-base-content/70 text-lg">
          No recent bills found.
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

export default RecentBills;
