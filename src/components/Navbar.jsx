import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../provider/AuthProvider";

// Icons
import {
  Sun,
  Moon,
  LogOut,
  LayoutDashboard,
  User,
  Settings,
  Menu,
  X,
  ChevronDown,
  ReceiptText,
  PlusCircle,
  Info,
  Lightbulb,
} from "lucide-react";

// Animation Variants
const sidebarVariants = {
  closed: {
    x: "100%",
    transition: { type: "spring", stiffness: 400, damping: 40 },
  },
  open: { x: 0, transition: { type: "spring", stiffness: 400, damping: 40 } },
};

const navItemVariants = {
  closed: { opacity: 0, x: 20 },
  open: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 },
  }),
};

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle Theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  // Handle Outside Click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  // Nav Configurations
  const publicLinks = [
    { name: "Home", path: "/", icon: <ReceiptText size={18} /> },
    { name: "Bills", path: "/bills", icon: <ReceiptText size={18} /> },
    { name: "About", path: "/about", icon: <Info size={18} /> },
    { name: "Tips", path: "/savings-tips", icon: <Lightbulb size={18} /> },
  ];

  const authLinks = [
    {
      name: "My Bills",
      path: "/dashboard/my-bills",
      icon: <ReceiptText size={18} />,
    },
    {
      name: "Add Bill",
      path: "/dashboard/add-bill",
      icon: <PlusCircle size={18} />,
    },
  ];

  const profileLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={16} />,
    },
    {
      name: "Profile",
      path: "/dashboard/my-profile",
      icon: <User size={16} />,
    },
    { name: "Settings", path: "/settings", icon: <Settings size={16} /> },
  ];

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-base-200 bg-base-100/70 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-18 py-3">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-primary rounded-xl text-primary-content transition-transform group-hover:scale-110">
              <ReceiptText size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Utility<span className="text-primary">Bill</span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-1">
            {[...publicLinks, ...(user ? authLinks : [])].map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* ACTIONS & PROFILE */}
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-base-200 text-base-content transition-colors"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>

            {user ? (
              <div className="relative hidden lg:block" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 pl-1 pr-3 rounded-full border border-base-300 hover:border-primary transition-all"
                >
                  <img
                    src={
                      user?.photoURL ||
                      "https://ui-avatars.com/api/?name=" + user?.displayName
                    }
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-base-100 border border-base-200 rounded-2xl shadow-xl overflow-hidden"
                    >
                      <div className="p-4 bg-base-200/50 border-b border-base-200">
                        <p className="text-sm font-bold truncate">
                          {user?.displayName}
                        </p>
                        <p className="text-xs text-base-content/50 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <div className="p-2">
                        {profileLinks.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                          >
                            {item.icon} {item.name}
                          </Link>
                        ))}
                      </div>
                      <div className="p-2 border-t border-base-200">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-error rounded-lg hover:bg-error/10 transition-colors"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  to="/login"
                  className="btn btn-ghost btn-sm px-4 rounded-full font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary btn-sm px-5 rounded-full font-semibold"
                >
                  Register
                </Link>
              </div>
            )}

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-base-200"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay: Closes menu on click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] lg:hidden"
            />

            {/* Sidebar: Full Height & Theme-Aware */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="fixed top-0 right-0 h-screen w-[300px] bg-base-100 z-[120] shadow-2xl flex flex-col lg:hidden border-l border-base-200"
            >
              {/* 1. Header: Stays at the top */}
              <div className="p-6 flex justify-between items-center border-b border-base-200">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-primary rounded-lg text-primary-content">
                    <ReceiptText size={20} />
                  </div>
                  <span className="font-bold text-lg tracking-tight">
                    UtilityBill
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-base-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* 2. Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                {/* User Profile Info */}
                {user && (
                  <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-2xl border border-base-200">
                    <img
                      src={
                        user?.photoURL ||
                        `https://ui-avatars.com/api/?name=${user?.displayName}`
                      }
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/10"
                      alt="Profile"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-sm truncate">
                        {user?.displayName}
                      </p>
                      <p className="text-[11px] text-base-content/50 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Links Group */}
                <nav className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-bold ml-2 mb-4">
                    Explore
                  </p>
                  <div className="flex flex-col gap-1">
                    {[...publicLinks, ...(user ? authLinks : [])].map(
                      (link, i) => (
                        <motion.div
                          key={link.path}
                          custom={i}
                          variants={navItemVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                        >
                          <NavLink
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                              `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                                isActive
                                  ? "bg-primary text-primary-content shadow-lg shadow-primary/20"
                                  : "hover:bg-base-200 text-base-content/70"
                              }`
                            }
                          >
                            {link.icon}
                            <span className="font-medium">{link.name}</span>
                          </NavLink>
                        </motion.div>
                      )
                    )}
                  </div>
                </nav>

                {/* Account/Dashboard Group */}
                {user && (
                  <nav className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-bold ml-2 mb-4">
                      User Dashboard
                    </p>
                    <div className="flex flex-col gap-1">
                      {profileLinks.map((link, i) => (
                        <motion.div
                          key={link.path}
                          custom={i + 5}
                          variants={navItemVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                        >
                          <NavLink
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                              `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                                isActive
                                  ? "bg-primary text-primary-content shadow-lg shadow-primary/20"
                                  : "hover:bg-base-200 text-base-content/70"
                              }`
                            }
                          >
                            {link.icon}
                            <span className="font-medium">{link.name}</span>
                          </NavLink>
                        </motion.div>
                      ))}
                    </div>
                  </nav>
                )}
              </div>

              {/* 3. Footer: Stays at the bottom */}
              <div className="p-6 border-t border-base-200 bg-base-100">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="btn btn-error btn-outline w-full gap-2 rounded-xl group transition-all hover:bg-error hover:text-white"
                  >
                    <LogOut
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                    Logout
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="btn btn-ghost border-base-300 rounded-xl"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="btn btn-primary rounded-xl"
                    >
                      Join
                    </Link>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
