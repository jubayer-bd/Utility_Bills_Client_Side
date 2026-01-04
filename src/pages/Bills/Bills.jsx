import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Calendar,
  MapPin,
  Banknote,
  SearchX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Skeleton Loader
const BillSkeleton = () => (
  <div className="flex flex-col rounded-2xl border border-base-200 bg-base-200 overflow-hidden shadow-sm h-full">
    <div className="w-full h-40 bg-base-300 animate-pulse" />
    <div className="p-5 flex flex-col flex-grow gap-2">
      <div className="h-6 bg-base-300 rounded w-3/4 animate-pulse" />
      <div className="h-4 bg-base-300 rounded w-1/2 animate-pulse" />
      <div className="h-10 bg-base-300 rounded w-full mt-auto animate-pulse" />
    </div>
  </div>
);

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    document.title = "Bills | UtilityBill";
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {
      page: currentPage,
      limit: itemsPerPage,
      search: search,
      category: filter === "All" ? "" : filter,
    };
    axios
      .get("https://utility-bills-server-side.vercel.app/bills", { params })
      .then((res) => {
        setBills(res.data.bills);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [filter, search, currentPage]);

  useEffect(() => setCurrentPage(1), [filter, search]);

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-extrabold text-base-content tracking-tight mb-3">
              Explore Utility Bills
            </h2>
            <p className="text-base-content/60 max-w-2xl">
              Manage and track all utility records in one place.
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 justify-between items-center bg-base-100 p-4 rounded-2xl shadow-sm border border-base-200">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search by bill title..."
              className="input input-bordered w-full pl-4 focus:outline-none focus:ring-2 focus:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

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

        {/* Bills Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              variants={containerVars}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[...Array(itemsPerPage)].map((_, i) => (
                <BillSkeleton key={i} />
              ))}
            </motion.div>
          ) : bills.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-base-content/50">
              <SearchX size={64} strokeWidth={1.5} className="mb-4" />
              <p className="text-xl font-medium">No bills found.</p>
            </div>
          ) : (
            <>
              <motion.div
                key="grid"
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
                    className="group rounded-2xl bg-base-100 border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
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
                      <h3 className="text-lg font-bold mb-2 text-base-content line-clamp-1">
                        {bill.title}
                      </h3>
                      <p className="text-sm text-base-content/70 mb-3 line-clamp-2">
                        {bill.description || "No description available."}
                      </p>

                      {/* Meta Info */}
                      <div className="flex flex-col gap-1 text-sm text-base-content/70 mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-primary" />
                          <span className="truncate">{bill.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-primary" />
                          <span>{bill.date}</span>
                        </div>
                        <div className="flex items-center gap-2 font-bold text-success mt-1">
                          <Banknote size={16} />
                          <span>{bill.amount} BDT</span>
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

              {/* Pagination */}
              <div className="flex justify-center mt-12 gap-2 flex-wrap">
                <button
                  className="btn btn-outline btn-sm"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  <ChevronLeft size={16} /> Prev
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={i}
                        className={`btn btn-sm ${
                          page === currentPage ? "btn-primary" : "btn-ghost"
                        }`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    );
                  }
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <button
                        key={i}
                        className="btn btn-sm btn-ghost btn-disabled"
                      >
                        ...
                      </button>
                    );
                  }
                  return null;
                })}

                <button
                  className="btn btn-outline btn-sm"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  Next <ChevronRight size={16} />
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
