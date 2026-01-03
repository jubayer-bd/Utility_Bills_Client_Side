import { BellRing, PieChart, Lock, Smartphone } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router";

export const FeaturesSection = () => {
  const features = [
    {
      title: "Smart Reminders",
      desc: "Never miss a due date with automated SMS and Email alerts.",
      icon: <BellRing />,
    },
    {
      title: "Usage Analytics",
      desc: "Compare your monthly consumption with detailed charts.",
      icon: <PieChart />,
    },
    {
      title: "Bank-Grade Security",
      desc: "Your data is encrypted with the highest industry standards.",
      icon: <Lock />,
    },
    {
      title: "Mobile Ready",
      desc: "Manage your utilities on the go with our responsive web app.",
      icon: <Smartphone />,
    },
  ];
  // hfjhjkfahdf?
  //  hjkhjkjkhjkhjk
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-extrabold mb-6">
              Why Users Trust UtilityBill
            </h2>
            <p className="text-lg text-base-content/70 mb-8">
              We provide the most comprehensive tools to keep your household
              expenses under control.
            </p>
            <Link to={"/bills"} className="btn btn-primary px-8">
              Get Started Now
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 s gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl shadow-md border border-base-200 hover:border-primary/50 transition-colors"
              >
                <div className="text-primary mb-4">{f.icon}</div>
                <h4 className="font-bold mb-2">{f.title}</h4>
                <p className="text-sm text-base-content/60">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
