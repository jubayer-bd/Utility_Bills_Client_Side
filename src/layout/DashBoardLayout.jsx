import React, { useContext, useState, useRef, useEffect } from "react";
import {
  LayoutDashboard,
  Receipt,
  LogOut,
  PlusCircle,
  User,
  MoreVertical,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Outlet, NavLink, useLocation, Link } from "react-router";
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
    <circle cx="12" cy="14" r="3" className="stroke-current" />
    <path d="M12 14l2-2" className="stroke-current" />
  </svg>
);

const NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { path: "/dashboard/my-bills", label: "My Bills", icon: Receipt },
  { path: "/dashboard/add-bill", label: "Add Bill", icon: PlusCircle },
  { path: "/dashboard/my-profile", label: "Profile", icon: User },
];

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Dropdown State
  const profileRef = useRef(null);

  const location = useLocation();
  const { user, logOut } = useContext(AuthContext);

  const currentPath = NAV_ITEMS.find(
    (item) =>
      item.path === location.pathname ||
      (item.end && location.pathname === "/dashboard")
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logOut();
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
    // Replaced bg-gray-50 with bg-base-200 for theme support
    <div className="flex h-screen bg-base-200 text-base-content font-sans overflow-hidden transition-colors duration-300">
      {/* --- Sidebar --- */}
      <motion.aside
        initial="expanded"
        animate={isSidebarOpen ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="h-full bg-base-100 border-r border-base-300 shadow-sm flex flex-col justify-between relative z-20"
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center h-20">
          <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
            <div className="bg-primary/10 p-2 rounded-lg shrink-0">
              <LogoIcon className="w-8 h-8 text-primary" />
            </div>
            <Link to={"/"}>
              <motion.span
                variants={textVariants}
                transition={{ duration: 0.2 }}
                className="font-bold text-xl tracking-tight text-base-content"
              >
                Utility Bills
              </motion.span>
            </Link>
          </div>
        </div>

        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-6 -right-3 bg-base-100 border border-base-300 rounded-full p-1 shadow-md hover:bg-base-200 text-base-content/70 z-30"
        >
          <MoreVertical size={16} />
        </button>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => `
                w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group relative
                ${
                  isActive
                    ? "bg-primary text-primary-content shadow-lg shadow-primary/30"
                    : "text-base-content/60 hover:bg-base-200 hover:text-primary"
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
                <div className="absolute left-14 bg-neutral text-neutral-content text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout (Sidebar Bottom) */}
        <div className="p-3 border-t border-base-300">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-3 rounded-xl text-error hover:bg-error/10 transition-colors"
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
        <header className="h-20 bg-base-100/80 backdrop-blur-md border-b border-base-300 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-base-content capitalize">
              {currentPath?.label || "Overview"}
            </h1>
          </div>

          {/* Right: User Profile Dropdown */}
          <div className="flex items-center gap-6">
            <div className="h-8 w-px bg-base-300"></div>

            {/* Profile Dropdown Container */}
            <div className="relative" ref={profileRef}>
              <div
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="text-right hidden md:block">
                  <p className="text-sm font-semibold text-base-content">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-base-content/60">Member</p>
                </div>
                <img
                  src={user?.photoURL || "https://i.pravatar.cc/300"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-base-200 object-cover shadow-sm"
                />
                <ChevronDown
                  size={16}
                  className={`text-base-content/50 transition-transform ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-base-100 border border-base-200 rounded-xl shadow-xl py-2 z-50 origin-top-right"
                  >
                    <div className="px-4 py-3 border-b border-base-200">
                      <p className="text-sm font-bold text-base-content truncate">
                        {user?.displayName}
                      </p>
                      <p className="text-xs text-base-content/60 truncate">
                        {user?.email}
                      </p>
                    </div>

                    <div className="p-1">
                      <Link
                        to="/dashboard/my-profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-base-content/80 hover:bg-base-200 rounded-lg transition-colors"
                      >
                        <User size={16} /> Profile
                      </Link>
                      <Link
                        to="/dashboard/settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-base-content/80 hover:bg-base-200 rounded-lg transition-colors"
                      >
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                    </div>

                    <div className="p-1 border-t border-base-200">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-error hover:bg-error/10 rounded-lg transition-colors"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content Render */}
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
