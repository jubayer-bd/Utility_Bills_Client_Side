import { Mail, Bell, Send } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* Icon */}
        <Bell className="w-12 h-12 text-primary mx-auto mb-4" />

        {/* Heading */}
        <h2 className="text-3xl font-bold mb-4 text-base-content">
          Stay Updated on Your Utility Savings
        </h2>

        {/* Description */}
        <p className="text-base-content/70 mb-8">
          Get monthly bill alerts, saving tips, and important updates directly
          to your inbox.
        </p>

        {/* Form */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-3 text-base-content/40" />

            <input
              type="email"
              placeholder="Enter your email"
              className="
                w-full
                pl-10 pr-4 py-3
                rounded-xl
                bg-base-200
                border border-base-300
                text-base-content
                placeholder:text-base-content/40
                focus:outline-none
                focus:ring-2 focus:ring-primary
              "
            />
          </div>

          <button
            className="
              flex items-center justify-center gap-2
              bg-primary
              text-primary-content
              px-6 py-3
              rounded-xl
              hover:opacity-90
              transition
            "
          >
            Subscribe <Send size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
