import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahim Uddin",
    savings: "$120/month",
    message:
      "This platform helped me track my electricity and gas bills effortlessly. The savings insights are amazing!",
  },
  {
    name: "Nusrat Jahan",
    savings: "$90/month",
    message:
      "Clean UI, accurate calculations, and very easy to use. Highly recommended for families.",
  },
  {
    name: "Imran Khan",
    savings: "$150/month",
    message:
      "I finally understand where my money goes every month. Super helpful utility tracker.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-base-content">
          What Our Users Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="
            bg-base-200 
            p-6 
            rounded-2xl 
            border border-base-300 
            hover:shadow-lg 
            transition
          "
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary mb-4" />

              {/* Message */}
              <p className="text-base-content/70 mb-4">{item.message}</p>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-base-content">
                    {item.name}
                  </h4>
                  <span className="text-sm text-success">
                    Saves {item.savings}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex text-primary">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
