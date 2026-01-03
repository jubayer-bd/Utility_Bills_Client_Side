import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router"; // Assuming react-router v6+
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../provider/AuthProvider";
import {
  MdDarkMode,
  MdOutlineLightMode,
  MdOutlineLogin,
  MdOutlineLogout,
  MdDashboard,
} from "react-icons/md";
import { IoPersonAddSharp, IoSettingsOutline } from "react-icons/io5";
import { LuTickets } from "react-icons/lu";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { User, ChevronDown } from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Ref for detecting clicks outside the dropdown
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

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

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    logOut();
    setIsProfileOpen(false);
    navigate("/");
  };

  // Dropdown Animation Variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95, display: "none" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      display: "block",
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive
                ? "text-primary font-bold bg-primary/10"
                : "font-medium hover:text-primary"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/bills"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive
                ? "text-primary font-bold bg-primary/10"
                : "font-medium hover:text-primary"
            }`
          }
        >
          Bills
        </NavLink>
      </li>

      {/* Links that are usually hidden in desktop navbar if not in dropdown, 
          but keeping them here for standard nav structure if preferred */}
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive
                ? "text-primary font-bold bg-primary/10"
                : "font-medium hover:text-primary"
            }`
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/savings-tips"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive
                ? "text-primary font-bold bg-primary/10"
                : "font-medium hover:text-primary"
            }`
          }
        >
          Savings Tips
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-100/80 backdrop-blur-md border-b border-base-200 sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4 h-20">
        {/* Left: Logo */}
        <div className="navbar-start">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-primary tracking-tight group"
          >
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <LuTickets className="text-primary" />
            </div>
            <span>
              Utility<span className="text-secondary">Bill</span>
            </span>
          </Link>
        </div>

        {/* Middle: NavLinks (only for large screens) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-1">{navLinks}</ul>
        </div>

        {/* Right: Auth + Theme + Hamburger */}
        <div className="navbar-end flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-circle btn-ghost btn-sm text-xl"
            title="Toggle Theme"
          >
            {theme === "dark" ? <MdOutlineLightMode /> : <MdDarkMode />}
          </button>

          {/* Auth Section */}
          {user ? (
            <div className="relative hidden lg:block" ref={profileRef}>
              {/* Profile Trigger */}
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 pr-3 rounded-full border border-base-300 hover:bg-base-200 transition-all duration-200"
              >
                <img
                  src={user?.photoURL || "https://via.placeholder.com/150"}
                  alt="profile"
                  className="w-8 h-8 rounded-full border border-base-content/10 object-cover"
                />
                <span className="text-sm font-semibold max-w-[100px] truncate">
                  {user?.displayName?.split(" ")[0] || "User"}
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 mt-3 w-56 bg-base-100 rounded-xl shadow-xl border border-base-200 overflow-hidden ring-1 ring-black/5"
                  >
                    <div className="p-4 border-b border-base-200 bg-base-50/50">
                      <p className="text-sm font-bold text-base-content">
                        {user?.displayName || "User Name"}
                      </p>
                      <p className="text-xs text-base-content/60 truncate">
                        {user?.email}
                      </p>
                    </div>

                    <div className="p-2">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-base-content/80 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <MdDashboard size={18} />
                        Dashboard
                      </Link>

                      <Link
                        to="/my-profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-base-content/80 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <User size={18} />
                        Profile
                      </Link>

                      <Link
                        to="/settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-base-content/80 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <IoSettingsOutline size={18} />
                        Settings
                      </Link>
                    </div>

                    <div className="p-2 border-t border-base-200">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-error rounded-lg hover:bg-error/10 transition-colors"
                      >
                        <MdOutlineLogout size={18} />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden lg:flex gap-3">
              <Link
                to="/login"
                className="btn btn-sm px-6 btn-ghost hover:bg-base-200 font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-sm px-6 btn-primary text-white shadow-lg shadow-primary/30"
              >
                Register
              </Link>
            </div>
          )}

          {/* Hamburger (for tablet + mobile) */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="btn btn-ghost btn-circle text-2xl lg:hidden"
          >
            <HiOutlineMenuAlt3 />
          </button>
        </div>
      </div>

      {/* Drawer for mobile + tablet */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Background overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setIsDrawerOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* Drawer panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 bg-base-100 shadow-2xl z-[60] flex flex-col p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center mb-8 border-b border-base-200 pb-4">
                <div className="flex items-center gap-2 text-xl font-bold text-primary">
                  <LuTickets />
                  <span>UtilityBill</span>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="btn btn-ghost btn-circle btn-sm text-xl"
                >
                  <HiOutlineX />
                </button>
              </div>

              {/* Mobile User Info (if logged in) */}
              {user && (
                <div className="flex items-center gap-3 mb-6 p-3 bg-base-200/50 rounded-xl">
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="overflow-hidden">
                    <p className="font-bold text-sm truncate">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-xs text-base-content/60 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              )}

              <ul className="flex flex-col gap-2">
                {/* Mobile specific dashboard link */}
                {user && (
                  <li>
                    <NavLink
                      to="/dashboard"
                      onClick={() => setIsDrawerOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-xl transition-all ${
                          isActive
                            ? "bg-primary text-white shadow-lg shadow-primary/30"
                            : "hover:bg-base-200"
                        }`
                      }
                    >
                      <MdDashboard size={20} />
                      <span className="font-medium">Dashboard</span>
                    </NavLink>
                  </li>
                )}

                {/* Reuse navLinks logic but manually styled for mobile list */}
                <li>
                  <NavLink
                    to="/"
                    onClick={() => setIsDrawerOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-primary text-white shadow-lg shadow-primary/30"
                          : "hover:bg-base-200"
                      }`
                    }
                  >
                    <span className="font-medium">Home</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/bills"
                    onClick={() => setIsDrawerOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-primary text-white shadow-lg shadow-primary/30"
                          : "hover:bg-base-200"
                      }`
                    }
                  >
                    <span className="font-medium">Bills</span>
                  </NavLink>
                </li>
                {/* Add other links here... */}
              </ul>

              <div className="mt-auto pt-6 border-t border-base-200 flex flex-col gap-3">
                {user ? (
                  <button
                    onClick={() => {
                      logOut();
                      setIsDrawerOpen(false);
                    }}
                    className="btn bg-error/10 text-error hover:bg-error hover:text-white border-none w-full flex items-center justify-center gap-2"
                  >
                    <MdOutlineLogout /> Logout
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/login"
                      onClick={() => setIsDrawerOpen(false)}
                      className="btn btn-outline border-base-300 w-full"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsDrawerOpen(false)}
                      className="btn btn-primary text-white w-full"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
