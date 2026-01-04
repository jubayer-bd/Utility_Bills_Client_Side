import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Calendar, MapPin, Banknote, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Skeleton matching Bills card
const BillSkeleton = () => (
  <div className="flex flex-col rounded-2xl border border-base-200 bg-base-100 overflow-hidden shadow-sm h-full">
    <div className="w-full h-52 bg-base-300 animate-pulse" />
    <div className="p-6 flex flex-col flex-grow gap-3">
      <div className="h-6 bg-base-300 rounded w-3/4 animate-pulse" />
      <div className="h-4 bg-base-200 rounded w-1/2 animate-pulse" />
      <div className="h-10 bg-base-300 rounded w-full mt-auto animate-pulse" />
    </div>
  </div>
);

const RecentBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://utility-bills-server-side.vercel.app/latest-bills")
      .then((res) => setBills(res.data))
      .catch((err) => console.error("Error fetching latest bills:", err))
      .finally(() => setLoading(false));
  }, []);

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold mb-2 uppercase tracking-wider text-sm">
            <Clock size={18} />
            <span>Fresh Updates</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-base-content">
            Recently Added Bills
          </h2>
        </div>
        <Link
          to="/bills"
          className="group flex items-center gap-2 text-primary font-semibold hover:underline"
        >
          View All Bills
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton-grid"
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[...Array(4)].map((_, i) => (
              <BillSkeleton key={i} />
            ))}
          </motion.div>
        ) : bills.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-base-200/30 rounded-3xl border-2 border-dashed border-base-300"
          >
            <p className="text-xl text-base-content/50">
              No recent bills available at the moment.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="bills-grid"
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {bills.map((bill) => (
              <motion.div
                key={bill._id}
                variants={itemVars}
                whileHover={{ y: -5 }}
                className="group rounded-2xl bg-base-100 border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={bill.image}
                    alt={bill.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-content text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                      {bill.category}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold mb-3 text-base-content line-clamp-1">
                    {bill.title}
                  </h3>
                  <p className="text-sm text-base-content/70 mb-4 line-clamp-2">
                    {bill.description || "No description available."}
                  </p>

                  <div className="flex flex-col gap-2 mb-6 text-sm text-base-content/70">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-primary" />
                      <span className="truncate">{bill.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-primary" />
                      <span>{bill.date}</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-success mt-2">
                      <Banknote size={16} />
                      <span>
                        {bill.amount}{" "}
                        <span className="text-sm font-normal text-base-content/60">
                          BDT
                        </span>
                      </span>
                    </div>
                  </div>

                  <Link to={`/bills/${bill._id}`} className="mt-auto">
                    <button className="btn btn-primary w-full rounded-xl">
                      View Details
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RecentBills;
