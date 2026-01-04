import React, { useContext, useState, useRef, useEffect } from "react";
import {
  LayoutDashboard,
  Receipt,
  LogOut,
  PlusCircle,
  User,
  MoreVertical,
  ChevronDown,
  Menu,
  X,
  Sun, // Added for theme toggle
  Moon,
  ReceiptText, // Added for theme toggle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Outlet, NavLink, useLocation, Link } from "react-router";
import { AuthContext } from "../provider/AuthProvider";

/* ------------------ CONFIG ------------------ */
const NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { path: "/dashboard/my-bills", label: "My Bills", icon: Receipt },
  { path: "/dashboard/add-bill", label: "Add Bill", icon: PlusCircle },
  { path: "/dashboard/my-profile", label: "Profile", icon: User },
];

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();

  // 1. Theme State Logic (Senior Tip: Keep this in a Context Provider for a real app)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null);

  // 2. Sync theme with document attribute on mount and change
  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  /* Close profile dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentPath = NAV_ITEMS.find(
    (item) =>
      item.path === location.pathname ||
      (item.end && location.pathname === "/dashboard")
  );

  const handleLogout = () => logOut();

  /* ------------------ SIDEBAR VARIANTS ------------------ */
  const sidebarVariants = {
    open: { width: 260 },
    closed: { width: 80 },
  };

  const textVariants = {
    open: { opacity: 1, x: 0, display: "block" },
    closed: { opacity: 0, x: -10, transitionEnd: { display: "none" } },
  };

  /* ------------------ SIDEBAR CONTENT ------------------ */
  const SidebarContent = () => (
    <>
      <div className="p-4 h-20 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <ReceiptText className="text-primary-content" size={20} />
          </div>
          <motion.span
            variants={textVariants}
            className="font-bold text-lg whitespace-nowrap tracking-tight"
          >
            Utility<span className="text-primary">Bill</span>
          </motion.span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            onClick={() => setIsMobileSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-content shadow-md shadow-primary/20"
                  : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
              }`
            }
          >
            <item.icon size={20} />
            <motion.span
              variants={textVariants}
              className="font-medium text-sm"
            >
              {item.label}
            </motion.span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-base-300">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full p-3 rounded-xl text-error hover:bg-error/10 transition-colors"
        >
          <LogOut size={20} />
          <motion.span variants={textVariants} className="font-medium text-sm">
            Logout
          </motion.span>
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-base-200 overflow-hidden text-base-content transition-colors duration-300">
      {/* -------- DESKTOP SIDEBAR -------- */}
      <motion.aside
        variants={sidebarVariants}
        animate={isSidebarOpen ? "open" : "closed"}
        className="hidden lg:flex flex-col bg-base-100 border-r border-base-300 shadow-sm relative z-50"
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-7 -right-3 bg-base-100 border border-base-300 rounded-full p-1 shadow-md hover:scale-110 transition-transform z-50"
        >
          <motion.div animate={{ rotate: isSidebarOpen ? 0 : 180 }}>
            <ChevronDown size={14} className="-rotate-90" />
          </motion.div>
        </button>

        <SidebarContent />
      </motion.aside>

      {/* -------- MOBILE SIDEBAR -------- */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-[280px] bg-base-100 z-[70] flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center p-6 border-b border-base-300">
                <span className="font-bold text-xl tracking-tight text-primary">
                  Menu
                </span>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-2 rounded-full hover:bg-base-200"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <SidebarContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* -------- MAIN -------- */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <header className="h-20 bg-base-100/80 backdrop-blur-md border-b border-base-300 flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-base-200 text-base-content hover:bg-base-300 transition-colors"
            >
              <Menu size={20} />
            </button>

            <h1 className="text-lg font-bold tracking-tight">
              {currentPath?.label || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-base-200 transition-all text-base-content/70 hover:text-primary"
              title="Toggle Theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <div
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 cursor-pointer p-1 pr-2 rounded-full hover:bg-base-200 transition-colors border border-transparent hover:border-base-300"
              >
                <img
                  src={
                    user?.photoURL ||
                    `https://ui-avatars.com/api/?name=${user?.displayName}`
                  }
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/10"
                  alt="profile"
                />
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-60 bg-base-100 border border-base-200 rounded-2xl shadow-xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-base-200 bg-base-200/30">
                      <p className="text-sm font-bold truncate">
                        {user?.displayName}
                      </p>
                      <p className="text-xs text-base-content/50 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/dashboard/my-profile"
                        className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <User size={16} /> My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-error rounded-lg hover:bg-error/10 transition-colors mt-1"
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

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 bg-base-200/50">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
