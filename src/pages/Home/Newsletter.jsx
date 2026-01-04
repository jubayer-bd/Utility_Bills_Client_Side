import { Mail, Bell, Send } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Bell className="w-12 h-12 text-blue-500 mx-auto mb-4" />

        <h2 className="text-3xl font-bold mb-4">
          Stay Updated on Your Utility Savings
        </h2>
        <p className="text-slate-600 mb-8">
          Get monthly bill alerts, saving tips, and important updates directly
          to your inbox.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-3 text-slate-400" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition">
            Subscribe <Send size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
