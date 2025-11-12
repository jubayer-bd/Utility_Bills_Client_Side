import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../provider/AuthProvider";
import {
  MdDarkMode,
  MdOutlineLightMode,
  MdOutlineLogin,
  MdOutlineLogout,
} from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { LuCircleUser, LuTickets } from "react-icons/lu";
import { HiOutlineLogin, HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "font-medium"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/bills"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "font-medium"
          }
        >
          Bills
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/add-bill"
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : "font-medium"
              }
            >
              Add Bill
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-bills"
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : "font-medium"
              }
            >
              My Pay Bills
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-profile"
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : "font-medium"
              }
            >
              My Profile
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "font-medium"
          }
        >
          About
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Left: Logo */}
        <div className="navbar-start">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-primary"
          >
            <LuTickets />
            <span>
              Utility<span className="text-secondary">Bill</span>
            </span>
          </Link>
        </div>

        {/* Middle: NavLinks (only for large screens) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
        </div>

        {/* Right: Auth + Theme + Hamburger */}
        <div className="navbar-end flex items-center gap-2">
          {/* Theme toggle (only large) */}
          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-ghost text-xl hidden lg:flex"
            title="Toggle Theme"
          >
            {theme === "dark" ? <MdOutlineLightMode /> : <MdDarkMode />}
          </button>

          {/* Auth Section */}
          {user ? (
            <div className="hidden lg:flex items-center gap-2">
              <div
                className="tooltip tooltip-bottom w-10"
                data-tip={user?.displayName || "User"}
              >
                <img
                  src={user?.photoURL || "https://via.placeholder.com/40"}
                  alt="profile"
                  className="w-9 h-9 rounded-full border-2 border-primary"
                />
              </div>
              <button
                onClick={logOut}
                className="btn btn-sm bg-error text-white hover:bg-error/80 flex items-center gap-1"
              >
                <MdOutlineLogout />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex gap-2">
              <Link
                to="/login"
                className="btn btn-sm border-primary text-primary hover:bg-primary/10 flex items-center gap-1"
              >
                <MdOutlineLogin />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="btn btn-sm bg-primary text-white hover:bg-primary/90 flex items-center gap-1"
              >
                <IoPersonAddSharp />
                <span>Register</span>
              </Link>
            </div>
          )}

          {/* Hamburger (for tablet + mobile) */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="btn btn-ghost text-2xl lg:hidden"
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
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsDrawerOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* Drawer panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-72 bg-base-100 shadow-lg z-50 flex flex-col p-5"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-primary">Menu</h3>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-2xl"
                >
                  <HiOutlineX />
                </button>
              </div>

              <ul
                onClick={() => setIsDrawerOpen(false)}
                className="menu flex flex-col gap-3 text-base-content"
              >
                {navLinks}
              </ul>

              <div className="mt-6 border-t pt-4 flex flex-col gap-3">
                <button
                  onClick={toggleTheme}
                  className="btn btn-sm border flex items-center justify-center gap-2"
                >
                  {theme === "dark" ? (
                    <>
                      <MdOutlineLightMode /> Light Mode
                    </>
                  ) : (
                    <>
                      <MdDarkMode /> Dark Mode
                    </>
                  )}
                </button>

                {user ? (
                  <button
                    onClick={logOut}
                    className="btn btn-sm bg-error text-white hover:bg-error/80 flex items-center justify-center gap-1"
                  >
                    <MdOutlineLogout /> Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="btn btn-sm border-primary text-primary hover:bg-primary/10 flex items-center justify-center gap-1"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <MdOutlineLogin /> Login
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-sm bg-primary text-white hover:bg-primary/90 flex items-center justify-center gap-1"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <IoPersonAddSharp /> Register
                    </Link>
                  </>
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
