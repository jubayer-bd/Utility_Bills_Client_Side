import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  TrendingUp,
  Wallet,
  Receipt,
  AlertCircle,
  ArrowUpRight,
  Zap,
  Droplet,
  Flame,
  Wifi,
} from "lucide-react";
import { motion } from "framer-motion";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router";

const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm flex items-start justify-between"
  >
    <div>
      <p className="text-base-content/60 font-medium text-sm mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-base-content">{value}</h3>
      <p className="text-xs mt-2 flex items-center gap-1">
        <span className="text-success flex items-center">
          <ArrowUpRight size={12} /> {subtext}
        </span>
        <span className="text-base-content/40">vs last month</span>
      </p>
    </div>
    <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
      <Icon size={24} className={color.replace("bg-", "text-")} />
    </div>
  </motion.div>
);

const DashboardOverview = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ total: 0, count: 0, recent: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://utility-bills-server-side.vercel.app/my-bills?email=${user.email}`
        )
        .then((res) => {
          const bills = res.data;
          const total = bills.reduce(
            (acc, curr) => acc + parseFloat(curr.amount),
            0
          );
          setStats({
            total: total,
            count: bills.length,
            recent: bills.slice(0, 5), // Top 5 recent
          });
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  // Helper to map category to icon
  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "Electricity":
        return <Zap size={18} className="text-yellow-500" />;
      case "Water":
        return <Droplet size={18} className="text-blue-500" />;
      case "Gas":
        return <Flame size={18} className="text-orange-500" />;
      case "Internet":
        return <Wifi size={18} className="text-indigo-500" />;
      default:
        return <Receipt size={18} className="text-gray-500" />;
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      {/* --- Stats Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Total Spending"
          value={`${stats.total.toLocaleString()} BDT`}
          icon={Wallet}
          color="bg-primary text-primary"
          subtext="+2.5%"
        />
        <StatCard
          title="Total Bills"
          value={stats.count}
          icon={Receipt}
          color="bg-secondary text-secondary"
          subtext="+4"
        />
        {/* <StatCard
          title="Pending Actions"
          value="0"
          icon={AlertCircle}
          color="bg-warning text-warning"
          subtext="All clear"
        /> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- Recent Activity --- */}
        <div className="lg:col-span-3 bg-base-100 border border-base-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-base-200 flex justify-between items-center">
            <h3 className="font-bold text-lg text-base-content">
              Recent Transactions
            </h3>
            <Link
              to={"/dashboard/my-bills"}
              className="text-sm text-primary font-medium hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-base-200/50 text-base-content/60">
                <tr>
                  <th>Category</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {stats.recent.map((bill) => (
                  <tr
                    key={bill._id}
                    className="hover:bg-base-200/30 transition-colors"
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-base-200 flex items-center justify-center">
                          {getCategoryIcon(bill.category)}
                        </div>
                        <span className="font-medium text-base-content">
                          {bill.category}
                        </span>
                      </div>
                    </td>
                    <td className="text-base-content/80">{bill.title}</td>
                    <td className="text-base-content/60 text-sm">
                      {bill.date}
                    </td>
                    <td className="text-right font-bold text-base-content">
                      {bill.amount} BDT
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {stats.recent.length === 0 && (
              <div className="p-8 text-center text-base-content/50">
                No recent bills found.
              </div>
            )}
          </div>
        </div>

        {/* --- Quick Actions / Promo --- */}
        {/* <div className="bg-gradient-to-br from-primary to-primary-focus rounded-2xl p-6 text-primary-content shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Save on Utilities</h3>
            <p className="opacity-90 text-sm mb-6">
              Track your consumption patterns and reduce your monthly bills by
              up to 15%.
            </p>
          </div>
          <button className="btn bg-white text-primary border-none hover:bg-gray-100 w-full">
            View Reports <TrendingUp size={16} className="ml-2" />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default DashboardOverview;
