import React from "react";
import { Link } from "react-router";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LuTickets } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-16 border-t">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* --- Logo & Description --- */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
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
          <p className="text-sm text-gray-600">
            Manage and pay your utility bills easily in one place. Stay updated
            and download your bill reports anytime.
          </p>
          <div className="flex space-x-4 mt-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-500"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-700"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* --- Useful Links --- */}
        <div>
          <h4 className="text-2xl font-bold text-primary mb-3">Useful Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/bills" className="hover:underline hover:text-primary">
                Bills
              </Link>
            </li>
            <li>
              <Link
                to="/my-pay-bills"
                className="hover:underline hover:text-primary"
              >
                My Pay Bills
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline hover:text-primary">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* --- Contact Info --- */}
        <div>
          <h4 className="text-2xl font-bold text-primary mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Email: support@utilitysystem.com</li>
            <li>Phone: +880 1234-567890</li>
            <li>Address: Mirpur-10, Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* --- Newsletter --- */}
        <div>
          <h4 className="text-2xl font-bold text-primary mb-3">Subscribe</h4>
          <p className="text-sm text-gray-600 mb-3">
            Get notified about your latest bills and updates.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center"
          >
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full rounded-r-none"
            />
            <button
              type="submit"
              className="btn btn-primary rounded-l-none text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* --- Footer Bottom --- */}
      <div className="text-center border-t border-base-300 py-4 text-sm">
        <p>
          © {new Date().getFullYear()} Utility Bill Management System — All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
