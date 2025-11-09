import React from "react";
import { FaBolt, FaWifi, FaTint, FaFire } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaBolt className="text-4xl text-[#00BFA6]" />,
      title: "Fast Bill Management",
      desc: "Track and manage your electricity, gas, and water bills effortlessly in one place.",
    },
    {
      icon: <FaWifi className="text-4xl text-[#00BFA6]" />,
      title: "Smart Connectivity",
      desc: "Real-time updates and online payments with secure cloud syncing.",
    },
    {
      icon: <FaTint className="text-4xl text-[#00BFA6]" />,
      title: "Reliable Service",
      desc: "Seamless access to your bill history and detailed breakdown anytime.",
    },
    {
      icon: <FaFire className="text-4xl text-[#00BFA6]" />,
      title: "Energy Insights",
      desc: "Understand your monthly usage and costs through detailed analytics.",
    },
  ];

  return (
    <section className=" py-14 px-6 md:px-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#00BFA6]">
        Why Choose Utility Bill Management?
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-center mb-4">{f.icon}</div>
            <h3 className="text-lg font-semibold text-center mb-2">{f.title}</h3>
            <p className="text-sm text-gray-600 text-center">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
