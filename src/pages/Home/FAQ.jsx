import { HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How do you calculate utility savings?",
    answer:
      "We analyze your past bills and compare usage patterns to identify saving opportunities.",
  },
  {
    question: "Is my billing data secure?",
    answer:
      "Yes. We use industry-standard encryption and never share your data with third parties.",
  },
  {
    question: "Which utility providers are supported?",
    answer:
      "We support electricity, gas, water, and internet providers across major regions.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border rounded-xl p-5 cursor-pointer hover:border-blue-500 transition"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HelpCircle className="text-blue-500" />
                  <h4 className="font-semibold">{faq.question}</h4>
                </div>
                <ChevronDown
                  className={`transition ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </div>

              {openIndex === i && (
                <p className="text-slate-600 mt-4">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
