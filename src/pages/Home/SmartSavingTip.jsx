import { Lightbulb, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";
export const SavingsBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-3xl p-8 md:p-12  flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="flex items-start gap-6">
          <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md">
            <Lightbulb size={40} className="text-yellow-300" />
          </div>
          <div>
            <p className="text-2xl text-slate-300   md:text-3xl font-bold mb-2">
              Want to lower your bills?
            </p>
            <p className="text-white/80 max-w-md italic">
              "Switching to LED bulbs can save you up to 75% on lighting costs
              monthly."
            </p>
          </div>
        </div>
        <Link
          to={"/savings-tips"}
          className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-all"
        >
          View Saving Tips
          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </motion.div>
    </section>
  );
};
