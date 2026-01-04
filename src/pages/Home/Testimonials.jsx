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
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Users Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition"
            >
              <Quote className="w-8 h-8 text-blue-500 mb-4" />

              <p className="text-slate-600 mb-4">{item.message}</p>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <span className="text-sm text-green-600">
                    Saves {item.savings}
                  </span>
                </div>

                <div className="flex text-blue-500">
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
