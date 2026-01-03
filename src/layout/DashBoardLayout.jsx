import React, { useContext, useState } from "react";
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Settings,
  MoreVertical,
  Bell,
  Search,
  LogOut,
  PlusCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Outlet, NavLink, useLocation, useNavigate, Link } from "react-router"; // Updated imports
import { AuthContext } from "../provider/AuthProvider";

// --- Custom Logo Component ---
const LogoIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
    <circle cx="12" cy="14" r="3" className="stroke-blue-500" />
    <path d="M12 14l2-2" className="stroke-blue-500" />
  </svg>
);

// --- Navigation Data (Matched to your Router) ---
const NAV_ITEMS = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    path: "/dashboard/my-bills",
    label: "My Bills",
    icon: Receipt,
  },
  {
    path: "/dashboard/add-bill",
    label: "Add Bill",
    icon: PlusCircle,
  },
  {
    path: "/dashboard/analytics",
    label: "Analytics",
    icon: PieChart,
  },
  {
    path: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
];

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Determine current page title based on URL
  const currentPath = NAV_ITEMS.find(
    (item) =>
      item.path === location.pathname ||
      (item.end && location.pathname === "/dashboard")
  );

  const handleLogout = () => {
    // Add your logout logic here (e.g., clear tokens)
    console.log("Logging out...");
    navigate("/login");
  };

  // Animation variants
  const sidebarVariants = {
    expanded: { width: 260 },
    collapsed: { width: 80 },
  };

  const textVariants = {
    expanded: { opacity: 1, x: 0, display: "block" },
    collapsed: { opacity: 0, x: -10, transitionEnd: { display: "none" } },
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* --- Sidebar --- */}
      <motion.aside
        initial="expanded"
        animate={isSidebarOpen ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="h-full bg-white border-r border-gray-200 shadow-sm flex flex-col justify-between relative z-20"
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center h-20">
          <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
            <div className="bg-blue-50 p-2 rounded-lg shrink-0">
              <LogoIcon className="w-8 h-8 text-blue-500" />
            </div>
            <Link to={"/"}>
              {" "}
              <motion.span
                variants={textVariants}
                transition={{ duration: 0.2 }}
                className="font-bold text-xl tracking-tight text-gray-800"
              >
                Utility Bills
              </motion.span>
            </Link>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-6 -right-3 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:bg-gray-50 text-gray-500 z-30"
          title={isSidebarOpen ? "Collapse" : "Expand"}
        >
          <MoreVertical size={16} />
        </button>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end} // Ensures exact match for root dashboard path
              className={({ isActive }) => `
                w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group relative
                ${
                  isActive
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "text-gray-500 hover:bg-gray-100 hover:text-blue-500"
                }
              `}
            >
              <item.icon size={22} className="shrink-0" />

              <motion.span
                variants={textVariants}
                transition={{ duration: 0.2 }}
                className="font-medium whitespace-nowrap"
              >
                {item.label}
              </motion.span>

              {/* Tooltip for collapsed state */}
              {!isSidebarOpen && (
                <div className="absolute left-14 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout Section */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={22} className="shrink-0" />
            <motion.span variants={textVariants} className="font-medium">
              Logout
            </motion.span>
          </button>
        </div>
      </motion.aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 z-10">
          {/* Left: Page Title / Search */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800 capitalize">
              {currentPath?.label || "Overview"}
            </h1>
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 ml-6">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search bills..."
                className="bg-transparent border-none outline-none text-sm ml-2 w-48 text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Right: User Profile & Actions */}
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-blue-500 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-gray-200"></div>

            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-gray-700">
                  {user?.displayName || "John Doe"}
                </p>
                <p className="text-xs text-gray-500">Premium User</p>
              </div>
              <img
                src={user?.photoURL || "https://i.pravatar.cc/300"}
                alt="User Profile"
                className="w-10 h-10 rounded-full border-2 border-blue-100 object-cover shadow-sm"
              />
            </div>
          </div>
        </header>

        {/* Dynamic Content Display */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
