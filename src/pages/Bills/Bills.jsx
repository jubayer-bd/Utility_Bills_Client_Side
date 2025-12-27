import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Calendar,
  MapPin,
  Tag,
  Banknote,
  SearchX,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// --- Skeleton Component ---
const BillSkeleton = () => (
  <div className="rounded-2xl border border-base-200 bg-base-100 overflow-hidden shadow-sm">
    <div className="w-full h-48 bg-base-300 animate-pulse" />
    <div className="p-5 space-y-4">
      <div className="h-6 bg-base-300 rounded w-3/4 animate-pulse" />
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-4 bg-base-200 rounded w-1/2 animate-pulse"
          />
        ))}
      </div>
      <div className="h-10 bg-base-300 rounded w-full animate-pulse mt-4" />
    </div>
  </div>
);

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

  // Framer Motion Variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-extrabold text-base-content tracking-tight mb-3">
          Explore Utility Bills
        </h2>
        <p className="text-base-content/60 max-w-2xl mx-auto">
          Manage and track all utility records in one place. Use the filters
          below to narrow down your search.
        </p>
      </motion.div>

      {/* Filter Section */}
      <div className="flex justify-center mb-12">
        <div className="relative w-full max-w-xs">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full appearance-none bg-base-100 border border-base-300 text-base-content py-3 px-4 pr-10 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Electricity">Electricity</option>
            <option value="Gas">Gas</option>
            <option value="Water">Water</option>
            <option value="Internet">Internet</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-3.5 text-base-content/50 pointer-events-none"
            size={20}
          />
        </div>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <BillSkeleton key={n} />
            ))}
          </motion.div>
        ) : bills.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-base-content/50"
          >
            <SearchX size={64} strokeWidth={1.5} className="mb-4" />
            <p className="text-xl font-medium">
              No bills found for this category.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {bills.map((bill) => (
              <motion.div
                key={bill._id}
                variants={itemVars}
                whileHover={{ y: -5 }}
                className="group rounded-2xl bg-base-100 border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={bill.image}
                    alt={bill.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                    {bill.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-4 text-base-content line-clamp-1">
                    {bill.title}
                  </h3>

                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-center gap-3 text-base-content/70">
                      <Tag size={18} className="text-primary" />
                      <span className="text-sm">{bill.category}</span>
                    </div>
                    <div className="flex items-center gap-3 text-base-content/70">
                      <MapPin size={18} className="text-primary" />
                      <span className="text-sm">{bill.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-base-content/70">
                      <Calendar size={18} className="text-primary" />
                      <span className="text-sm">{bill.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-lg font-bold text-success mt-2">
                      <Banknote size={20} />
                      <span>{bill.amount} BDT</span>
                    </div>
                  </div>

                  <Link to={`/bills/${bill._id}`} className="block">
                    <button className="w-full py-3 px-4 bg-primary hover:bg-primary-focus text-primary-content font-semibold rounded-xl transition-colors duration-200 shadow-md">
                      View Details
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bills;
