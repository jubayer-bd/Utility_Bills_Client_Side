import React from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Droplet,
  Flame,
  PlugZap,
  Thermometer,
  Wind,
  Waves,
  Shirt,
  ArrowRight,
} from "lucide-react";

// --- Data & Configuration ---

// You can change this to your brand's primary color
const PRIMARY_COLOR = "indigo";

const tips = [
  {
    icon: Lightbulb,
    category: "Electricity",
    impact: "High Impact",
    title: "Switch to LED Lighting",
    description:
      "Replace traditional incandescent bulbs with LEDs. They consume up to 80% less electricity and last 25x longer.",
  },
  {
    icon: PlugZap,
    category: "Habits",
    impact: "Medium Impact",
    title: "Vampire Power Check",
    description:
      "Electronics consume energy even when off. Use smart power strips to cut power to TVs and computers completely.",
  },
  {
    icon: Thermometer,
    category: "Heating/Cooling",
    impact: "High Impact",
    title: "Smart Thermostat",
    description:
      "Adjust your thermostat by 7-10°F for 8 hours a day. A programmable thermostat can save you up to 10% a year.",
  },
  {
    icon: Shirt,
    category: "Laundry",
    impact: "Medium Impact",
    title: "Wash with Cold Water",
    description:
      "Heating water accounts for 90% of a washer's energy use. Switch to cold cycles to cut costs instantly.",
  },
  {
    icon: Wind,
    category: "Insulation",
    impact: "High Impact",
    title: "Seal Air Leaks",
    description:
      "Caulk windows and weather-strip doors. Preventing drafts is one of the cheapest ways to cut heating costs.",
  },
  {
    icon: Droplet,
    category: "Water",
    impact: "Medium Impact",
    title: "Low-Flow Fixtures",
    description:
      "Install aerators on faucets and low-flow showerheads. You can save 2,000+ gallons of water per year.",
  },
];

// --- Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delays each child animation
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// --- Component ---

export default function SavingsTips() {
  return (
    <section className="py-20  overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className={`inline-block py-1 px-3 rounded-full bg-${PRIMARY_COLOR}-100 text-${PRIMARY_COLOR}-700 text-sm font-semibold mb-4 tracking-wide uppercase`}
            >
              Cost Cutting Guide
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Smart Ways to{" "}
              <span className={`text-${PRIMARY_COLOR}-600`}>
                Maximize Savings
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Small changes in your daily routine can lead to massive reductions
              in your monthly utility bills. Explore our expert-recommended tips
              below.
            </p>
          </motion.div>
        </div>

        {/* Grid Section */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl border border-slate-100 transition-all duration-300"
              >
                {/* Decorative Top Border */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${PRIMARY_COLOR}-500 to-${PRIMARY_COLOR}-300 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />

                {/* Header: Icon & Category */}
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`p-3 rounded-xl bg-${PRIMARY_COLOR}-50 text-${PRIMARY_COLOR}-600 group-hover:bg-${PRIMARY_COLOR}-600 group-hover:text-blue-600 transition-colors duration-300`}
                  >
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-500 uppercase tracking-wider`}
                  >
                    {tip.category}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-${PRIMARY_COLOR}-600 transition-colors">
                  {tip.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {tip.description}
                </p>

                {/* Footer: Impact Badge */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span
                    className={`text-sm font-medium ${
                      tip.impact.includes("High")
                        ? "text-emerald-600"
                        : "text-amber-600"
                    }`}
                  >
                    {tip.impact}
                  </span>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className={`text-${PRIMARY_COLOR}-600 cursor-pointer`}
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA (Optional) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <button
            className={`px-8 py-3 bg-${PRIMARY_COLOR}-600 hover:bg-${PRIMARY_COLOR}-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1`}
          >
            Calculate Your Potential Savings
          </button>
        </motion.div>
      </div>
    </section>
  );
}
