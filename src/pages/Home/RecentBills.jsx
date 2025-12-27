import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { 
  Calendar, 
  MapPin, 
  Tag, 
  Banknote, 
  ArrowRight, 
  Clock 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// --- Skeleton Component (Matches the Card UI) ---
const BillSkeleton = () => (
  <div className="rounded-2xl border border-base-200 bg-base-100 overflow-hidden shadow-sm">
    <div className="w-full h-48 bg-base-300 animate-pulse" />
    <div className="p-5 space-y-4">
      <div className="h-6 bg-base-300 rounded w-3/4 animate-pulse" />
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-4 bg-base-200 rounded w-1/2 animate-pulse" />
        ))}
      </div>
      <div className="h-10 bg-base-300 rounded w-full animate-pulse mt-4" />
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

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Section Header */}
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
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="skeleton-grid"
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[1, 2, 3].map((n) => <BillSkeleton key={n} />)}
          </motion.div>
        ) : bills.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-base-200/30 rounded-3xl border-2 border-dashed border-base-300"
          >
            <p className="text-xl text-base-content/50">No recent bills available at the moment.</p>
          </motion.div>
        ) : (
          <motion.div
            key="bills-grid"
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {bills.map((bill) => (
              <motion.div
                key={bill._id}
                variants={itemVars}
                whileHover={{ y: -8 }}
                className="group rounded-2xl bg-base-100 border border-base-200 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={bill.image}
                    alt={bill.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-content text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                      {bill.category}
                    </span>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-base-content mb-4 line-clamp-1">
                    {bill.title}
                  </h3>

                  <div className="space-y-3 mb-8 flex-grow">
                    <div className="flex items-center gap-3 text-base-content/70">
                      <div className="p-2 bg-base-200 rounded-lg">
                        <MapPin size={16} className="text-primary" />
                      </div>
                      <span className="text-sm font-medium">{bill.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-base-content/70">
                      <div className="p-2 bg-base-200 rounded-lg">
                        <Calendar size={16} className="text-primary" />
                      </div>
                      <span className="text-sm font-medium">{bill.date}</span>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                      <div className="p-2 bg-success/10 rounded-lg">
                        <Banknote size={20} className="text-success" />
                      </div>
                      <span className="text-xl font-bold text-base-content">
                        {bill.amount} <span className="text-sm font-normal text-base-content/60">BDT</span>
                      </span>
                    </div>
                  </div>

                  <Link to={`/bills/${bill._id}`}>
                    <button className="w-full py-3.5  font-bold rounded-xl bg-primary text-primary-content transition-all duration-300 shadow-md">
                      See Details
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