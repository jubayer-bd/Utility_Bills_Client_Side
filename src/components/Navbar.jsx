import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router"; // fixed router import
import { AuthContext } from "../provider/AuthProvider";
import {
  MdDarkMode,
  MdOutlineLightMode,
  MdOutlineLogin,
  MdOutlineLogout,
} from "react-icons/md";
import { LuCircleUser, LuTickets } from "react-icons/lu";
import { HiOutlineLogin, HiOutlineMenuAlt3 } from "react-icons/hi";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light" // ✅ load saved theme
  );

  // ✅ Apply theme to <html> and save in localStorage
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
    <div className="bg-base-100 shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Left Section */}
        <div className="navbar-start">
          <Link
            to="/"
            className="flex items-center gap-2 sm:ml-1 text-2xl font-bold text-primary"
          >
            <LuTickets />
            <span>
              Utility<span className="text-secondary">Bill</span>
            </span>
          </Link>
        </div>

        {/* Center Section */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
        </div>

        {/* Right Section */}
        <div className="navbar-end  md:flex items-center md:gap-3">
          {/*  Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-ghost text-xl hidden md:flex"
            title="Toggle Theme"
          >
            {theme === "dark" ? <MdOutlineLightMode /> : <MdDarkMode />}
          </button>

          {/* Auth Section */}
          {user ? (
            <div className="flex items-center md:gap-3">
              <div
                className="tooltip tooltip-bottom w-10"
                data-tip={user?.displayName || "User"}
              >
                <img
                  src={user?.photoURL || <LuCircleUser />}
                  alt="profile"
                  className="w-9  h-9 rounded-full border-2 border-primary"
                />
              </div>
              <button
                onClick={logOut}
                className="btn btn-sm bg-error text-white hover:bg-error/80 flex items-center gap-1"
              >
                <MdOutlineLogout />
                <span className="">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="btn btn-sm bg-white  border-primary text-primary hover:bg-primary/10 flex items-center gap-1"
              >
                <MdOutlineLogin />
                <span className="">Login</span>
              </Link>
              <Link
                to="/register"
                className="btn btn-sm bg-primary text-white hover:bg-primary/90 hidden md:flex items-center gap-1"
              >
                <HiOutlineLogin />
                <span className="">Register</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <div className="dropdown dropdown-end shadow-2xl  lg:hidden">
            <label tabIndex={0} className="btn btn-ghost text-2xl ml-2">
              <HiOutlineMenuAlt3 />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <Link
                to="/register"
                className="btn btn-sm bg-primary text-white hover:bg-primary/90  flex items-center gap-1"
              >
                <HiOutlineLogin />
                <span className="">Register</span>
              </Link>
              {navLinks}
              <button
                onClick={toggleTheme}
                className=" cursor-pointer text-xl flex px-4 "
                title="Toggle Theme"
              >
                {theme === "dark" ? <MdOutlineLightMode /> : <MdDarkMode />}
              </button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
