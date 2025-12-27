import React from "react";
import { Link } from "react-router"; // Standard import, adjust if using v6.4+ specific
import { motion } from "framer-motion";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa"; // Updated icons for cleaner look
import { LuTickets } from "react-icons/lu";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";

// --- Configuration ---
const SOCIAL_LINKS = [
  { icon: FaFacebookF, href: "#", color: "hover:text-blue-500" },
  { icon: FaTwitter, href: "#", color: "hover:text-sky-400" },
  { icon: FaLinkedinIn, href: "#", color: "hover:text-blue-600" },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-300 font-sans relative overflow-hidden">
      {/* Optional: Top Accent Line */}
      <div className="absolute top-0 left-0 w-full  bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600" />

      <div className="max-w-7xl mx-auto px-6 py-5">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* --- Brand Section --- */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold text-white group"
            >
              <div className="p-2 bg-indigo-600 rounded-lg text-white group-hover:bg-indigo-500 transition-colors">
                <LuTickets size={24} />
              </div>
              <span>
                Utility<span className="text-indigo-400">Bill</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Simplify your life. Manage electricity, water, and gas payments
              securely in one unified dashboard.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 bg-slate-900 rounded-full text-slate-400 border border-slate-800 transition-colors ${social.color}`}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* --- Quick Links --- */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold text-lg mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <FooterLink to="/" text="Home" />
              <FooterLink to="/bills" text="All Bills" />
              <FooterLink to="/my-bills" text="My Payments" />
              <FooterLink to="/about" text="About Us" />
            </ul>
          </motion.div>

          {/* --- Contact Info --- */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold text-lg mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <HiOutlineMail
                  className="mt-1 text-indigo-400 shrink-0"
                  size={18}
                />
                <span>support@utilitysystem.com</span>
              </li>
              <li className="flex items-start gap-3">
                <HiOutlinePhone
                  className="mt-1 text-indigo-400 shrink-0"
                  size={18}
                />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker
                  className="mt-1 text-indigo-400 shrink-0"
                  size={18}
                />
                <span>
                  Mirpur-10, Dhaka,
                  <br />
                  Bangladesh
                </span>
              </li>
            </ul>
          </motion.div>

          {/* --- Legal --- */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold text-lg mb-6">Legal</h4>
            <ul className="space-y-3">
              <FooterLink to="/terms" text="Terms of Service" />
              <FooterLink to="/privacy" text="Privacy Policy" />
              <FooterLink to="/cookie" text="Cookie Policy" />
            </ul>
          </motion.div>
        </motion.div>

        {/* --- Bottom Bar --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm"
        >
          <p>
            © {new Date().getFullYear()} Utility Bill Management System. Built
            with trust.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

// --- Helper Component for Links ---
function FooterLink({ to, text }) {
  return (
    <li>
      <Link to={to} className="block w-fit">
        <motion.span
          className="text-slate-400 hover:text-indigo-400 transition-colors inline-flex items-center gap-1"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {text}
        </motion.span>
      </Link>
    </li>
  );
}
