import { FileText, TrendingUp, Lightbulb } from "lucide-react";

const blogs = [
  {
    title: "5 Ways to Reduce Your Electricity Bill",
    icon: Lightbulb,
  },
  {
    title: "How to Track Monthly Utility Expenses",
    icon: TrendingUp,
  },
  {
    title: "Smart Metering Explained",
    icon: FileText,
  },
];

export default function Blogs() {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-base-content">
          Smart Utility Tips & Insights
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog, i) => {
            const Icon = blog.icon;
            return (
              <div
                key={i}
                className="
                  bg-base-200 
                  p-6 
                  rounded-2xl 
                  border border-base-300 
                  hover:shadow-lg 
                  transition-all duration-300
                "
              >
                <Icon className="w-10 h-10 text-primary mb-4" />

                <h3 className="font-semibold text-lg text-base-content">
                  {blog.title}
                </h3>

                <p className="text-base-content/70 mt-2">
                  Learn practical tips to reduce costs and manage bills smarter.
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
