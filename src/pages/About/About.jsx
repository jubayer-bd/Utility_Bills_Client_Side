import React, { useEffect } from "react";
import { FaBolt, FaBurn, FaTint, FaWifi } from "react-icons/fa";
import { motion } from "framer-motion";
const About = () => {
  useEffect(() => {
    document.title = "About | UtilityBill";
  }, []);
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
      {/* Header Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          About Utility Bill Management System
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          The Utility Bill Management System helps users easily manage, track,
          and pay their essential utility bills like Electricity, Gas, Water,
          and Internet — all in one secure platform.
        </p>
      </section>

      {/* About System Section */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <img
            src="https://i.pinimg.com/736x/7f/68/7f/7f687f2a2afb3bfd841af60e7ab62db7.jpg"
            alt="Utility Bill System"
            className="rounded-2xl shadow-md"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-4">
            Why Choose Our System?
          </h2>
          <p className="text-gray-600 mb-3">
            Managing monthly bills can be stressful and time-consuming. Our
            system simplifies the process by centralizing all your utility bills
            in one dashboard — making it easier to track payments, view previous
            bills, and generate reports.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Quick and secure bill payments</li>
            <li>Centralized view of all utilities</li>
            <li>Automatic total calculation and PDF download</li>
            <li>Smart filtering and easy updates</li>
          </ul>
        </div>
      </section>

      {/* Mission Section */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8">
          Our goal is to empower households and businesses by providing a
          smarter, more organized way to handle utility expenses — reducing late
          payments and improving financial control.
        </p>
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="shadow-md hover:shadow-xl transition p-6 bg-base-200 rounded-xl flex flex-col items-center "
          >
            <FaBolt className="text-4xl text-yellow-500 mb-2" />
            <p className="font-medium">Electricity</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="shadow-md hover:shadow-xl transition p-6 bg-base-200 rounded-xl flex flex-col items-center "
          >
            <FaBurn className="text-4xl text-red-500 mb-2" />
            <p className="font-medium">Gas</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="shadow-md hover:shadow-xl transition p-6 bg-base-200 rounded-xl flex flex-col items-center "
          >
            <FaTint className="text-4xl text-blue-500 mb-2" />
            <p className="font-medium">Water</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="shadow-md hover:shadow-xl transition p-6 bg-base-200 rounded-xl flex flex-col items-center "
          >
            <FaWifi className="text-4xl text-green-500 mb-2" />
            <p className="font-medium">Internet</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer Info */}
      <section className="text-center mt-16">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Utility Bill Management System. All
          rights reserved.
        </p>
      </section>
    </div>
  );
};

export default About;
