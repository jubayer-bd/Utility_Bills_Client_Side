import React, { useContext, useState, useRef, useEffect } from "react";
import {
  LayoutDashboard,
  Receipt,
  LogOut,
  PlusCircle,
  User,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  ReceiptText,
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

/* ------------------ VARIANTS ------------------ */
const sidebarVariants = {
  open: { width: 260, transition: { type: "spring", damping: 20 } },
  closed: { width: 80, transition: { type: "spring", damping: 20 } },
};

const textVariants = {
  open: { opacity: 1, x: 0, display: "block", transition: { delay: 0.1 } },
  closed: { opacity: 0, x: -10, transitionEnd: { display: "none" } },
};

/* ------------------ SUB-COMPONENTS ------------------ */

// Extracted to prevent re-renders and preserve animation state
const SidebarContent = ({ isCollapsed, handleLogout, closeMobileMenu }) => {
  // If isCollapsed is true, we hide text (Desktop closed state)
  // On Mobile, we usually want the menu fully distinct, so we treat it as "open"
  const animateState = isCollapsed ? "closed" : "open";

  return (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className="h-20 flex items-center px-6 border-b border-base-300/50">
        <Link 
            to="/" 
            className="flex items-center gap-3 overflow-hidden"
            onClick={closeMobileMenu}
        >
          <div className="bg-primary p-2 rounded-lg flex-shrink-0 text-primary-content">
            <ReceiptText size={24} />
          </div>
          <motion.span
            variants={textVariants}
            initial={animateState}
            animate={animateState}
            className="font-bold text-xl whitespace-nowrap tracking-tight text-base-content"
          >
            Utility<span className="text-primary">Bill</span>
          </motion.span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto overflow-x-hidden scrollbar-hide">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative overflow-hidden whitespace-nowrap ${
                isActive
                  ? "bg-primary text-primary-content shadow-lg shadow-primary/20"
                  : "hover:bg-base-300/50 text-base-content/70 hover:text-base-content"
              }`
            }
          >
            <div className="flex-shrink-0">
              <item.icon size={22} />
            </div>
            <motion.span
              variants={textVariants}
              initial={animateState}
              animate={animateState}
              className="font-medium text-sm"
            >
              {item.label}
            </motion.span>
            
            {/* Tooltip for collapsed state (Desktop only) */}
            {isCollapsed && (
               <div className="absolute left-14 bg-base-300 text-base-content text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap shadow-sm border border-base-200">
                 {item.label}
               </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout Footer */}
      <div className="p-4 border-t border-base-300/50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-xl text-error hover:bg-error/10 transition-colors overflow-hidden whitespace-nowrap group"
        >
          <div className="flex-shrink-0">
            <LogOut size={22} />
          </div>
          <motion.span
            variants={textVariants}
            initial={animateState}
            animate={animateState}
            className="font-medium text-sm"
          >
            Logout
          </motion.span>
        </button>
      </div>
    </div>
  );
};

/* ------------------ MAIN LAYOUT ------------------ */
const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Desktop Toggle
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false); // Mobile Toggle
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // Close profile dropdown on outside click
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
    (item) => item.path === location.pathname || (item.end && location.pathname === "/dashboard")
  );

  const handleLogout = () => {
      logOut();
      setIsMobileSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-full bg-base-200 overflow-hidden text-base-content transition-colors duration-300 font-sans">
      
      {/* -------- DESKTOP SIDEBAR (Hidden on Mobile) -------- */}
      <motion.aside
        variants={sidebarVariants}
        animate={isSidebarOpen ? "open" : "closed"}
        className="hidden md:flex flex-col bg-base-100 border-r border-base-300 shadow-xl z-30 relative h-full flex-shrink-0"
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-8 -right-3 bg-base-100 border border-base-300 text-base-content rounded-full p-1.5 shadow-md hover:shadow-lg transition-all z-40 hover:scale-105"
        >
          <motion.div animate={{ rotate: isSidebarOpen ? 0 : 180 }} transition={{ duration: 0.3 }}>
            <ChevronDown size={14} className="-rotate-90" />
          </motion.div>
        </button>

        {/* Desktop passes the collapsed state */}
        <SidebarContent 
            isCollapsed={!isSidebarOpen} 
            handleLogout={handleLogout} 
        />
      </motion.aside>

      {/* -------- MOBILE SIDEBAR OVERLAY -------- */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[80vw] max-w-[300px] bg-base-100 z-50 flex flex-col shadow-2xl md:hidden"
            >
              <div className="absolute top-4 right-4 z-50">
                 <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-2 rounded-full hover:bg-base-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Mobile is always "expanded" internally */}
              <SidebarContent 
                isCollapsed={false} 
                handleLogout={handleLogout} 
                closeMobileMenu={() => setIsMobileSidebarOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* -------- MAIN CONTENT AREA -------- */}
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-20 flex-shrink-0 bg-base-100/80 backdrop-blur-md border-b border-base-300 flex items-center justify-between px-4 sm:px-8 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-base-200 hover:bg-base-300 transition-colors text-base-content"
            >
              <Menu size={22} />
            </button>

            <div className="flex flex-col">
                 <h1 className="text-xl font-bold tracking-tight text-base-content">
                  {currentPath?.label || "Dashboard"}
                </h1>
                <span className="text-xs text-base-content/50 hidden sm:block">Welcome back, {user?.displayName?.split(' ')[0]}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-base-200 text-base-content/70 hover:text-primary transition-all"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <div
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 cursor-pointer p-1.5 pr-3 rounded-full hover:bg-base-200 border border-transparent hover:border-base-300 transition-all select-none"
              >
                <img
                  src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}`}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-base-300"
                  alt="profile"
                />
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 text-base-content/70 ${
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
                    className="absolute right-0 mt-3 w-64 bg-base-100 border border-base-200 rounded-2xl shadow-xl z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-base-200 bg-base-200/50">
                      <p className="text-sm font-bold truncate text-base-content">
                        {user?.displayName || "User"}
                      </p>
                      <p className="text-xs text-base-content/60 truncate font-medium">
                        {user?.email}
                      </p>
                    </div>
                    <div className="p-2 space-y-1">
                      <Link
                        to="/dashboard/my-profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-colors text-base-content/80"
                      >
                        <User size={16} /> My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-error rounded-lg hover:bg-error/10 transition-colors"
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

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-base-200/50 relative scroll-smooth">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;