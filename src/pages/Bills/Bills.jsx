import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // Ensure you are using react-router-dom or similar
import {
  Calendar,
  MapPin,
  Banknote,
  SearchX,
  ChevronDown,
  Search,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
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
        {[1, 2, 3].map((i) => (
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
  const [loading, setLoading] = useState(true);

  // Filter & Search States
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8; // Match with backend limit if hardcoded there, or pass it via query

  // Theme State
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.title = "Bills | UtilityBill";
  }, []);

  // --- Theme Toggle Logic ---
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // --- Fetch Data ---
  useEffect(() => {
    setLoading(true);

    // Construct query parameters
    const params = {
      page: currentPage,
      limit: itemsPerPage,
      search: search,
      category: filter === "All" ? "" : filter,
    };

    axios
      .get("https://utility-bills-server-side.vercel.app/bills", { params })
      .then((res) => {
        // Backend should now return { bills, totalBills, totalPages }
        setBills(res.data.bills);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error("Error fetching bills:", err))
      .finally(() => setLoading(false));
  }, [filter, search, currentPage]);

  // Reset page to 1 if search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, search]);

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
    <div className="min-h-screen bg-base-200/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header & Theme Toggle */}
        <div className="flex justify-between items-start mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-4xl font-extrabold text-base-content tracking-tight mb-3">
              Explore Utility Bills
            </h2>
            <p className="text-base-content/60 max-w-2xl">
              Manage and track all utility records in one place.
            </p>
          </motion.div>

        </div>

        {/* Controls Section: Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 justify-between items-center bg-base-100 p-4 rounded-2xl shadow-sm border border-base-200">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by bill title..."
              className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative w-full md:w-64">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="select select-bordered w-full text-base-content font-medium"
            >
              <option value="All">All Categories</option>
              <option value="Electricity">Electricity</option>
              <option value="Gas">Gas</option>
              <option value="Water">Water</option>
              <option value="Internet">Internet</option>
            </select>
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
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
                No bills found matching your criteria.
              </p>
            </motion.div>
          ) : (
            <>
              <motion.div
                key="grid"
                variants={containerVars}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {bills.map((bill) => (
                  <motion.div
                    key={bill._id}
                    variants={itemVars}
                    whileHover={{ y: -5 }}
                    className="group rounded-2xl bg-base-100 border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    <div className="relative overflow-hidden h-40">
                      <img
                        src={bill.image}
                        alt={bill.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-base-100/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                        {bill.category}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold mb-3 text-base-content line-clamp-1">
                        {bill.title}
                      </h3>

                      <div className="space-y-2 mb-4 flex-grow text-sm">
                        <div className="flex items-center gap-2 text-base-content/70">
                          <MapPin size={16} className="text-primary" />
                          <span className="truncate">{bill.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-base-content/70">
                          <Calendar size={16} className="text-primary" />
                          <span>{bill.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-bold text-success mt-2">
                          <Banknote size={18} />
                          <span>{bill.amount} BDT</span>
                        </div>
                      </div>

                      <Link to={`/bills/${bill._id}`} className="block mt-auto">
                        <button className="btn btn-primary w-full rounded-xl">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination Controls */}
              <div className="flex justify-center mt-12 gap-2">
                <button
                  className="btn btn-outline border-base-300 bg-base-100"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  <ChevronLeft size={18} /> Prev
                </button>

                {/* Page Numbers */}
                <div className="join">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    // Only show current, first, last, and neighbors (simplified for now)
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          className={`join-item btn ${
                            currentPage === pageNum
                              ? "btn-primary"
                              : "btn-ghost bg-base-100"
                          }`}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    if (
                      pageNum === currentPage - 2 ||
                      pageNum === currentPage + 2
                    ) {
                      return (
                        <button
                          key={pageNum}
                          className="join-item btn btn-ghost btn-disabled"
                        >
                          ...
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  className="btn btn-outline border-base-300 bg-base-100"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Bills;
