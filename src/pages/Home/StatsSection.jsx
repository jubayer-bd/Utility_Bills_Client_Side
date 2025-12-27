import { Users, Receipt, ShieldCheck, Globe } from "lucide-react";
import { motion } from "framer-motion";
export const StatsSection = () => {
  const stats = [
    {
      id: 1,
      label: "Active Users",
      value: "10K+",
      icon: <Users className="text-blue-500" />,
    },
    {
      id: 2,
      label: "Bills Tracked",
      value: "50K+",
      icon: <Receipt className="text-green-500" />,
    },
    {
      id: 3,
      label: "Secure Payments",
      value: "100%",
      icon: <ShieldCheck className="text-purple-500" />,
    },
    {
      id: 4,
      label: "Cities Covered",
      value: "24/7",
      icon: <Globe className="text-orange-500" />,
    },
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <motion.div
            whileHover={{ y: -5 }}
            key={stat.id}
            className="bg-base-100 p-8 rounded-2xl shadow-sm border border-base-300 text-center"
          >
            <div className="flex justify-center mb-4">{stat.icon}</div>
            <div className="text-3xl font-bold text-base-content">
              {stat.value}
            </div>
            <div className="text-base-content/60 text-sm font-medium uppercase tracking-wide">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
