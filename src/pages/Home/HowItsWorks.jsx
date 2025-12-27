import { PlusCircle, Search, CreditCard } from "lucide-react";

export const WorkflowSection = () => {
  const steps = [
    {
      title: "Upload Bill",
      desc: "Take a photo or upload a PDF of your utility bill.",
      icon: <PlusCircle size={32} />,
    },
    {
      title: "Smart Tracking",
      desc: "We categorize and track the due dates for you.",
      icon: <Search size={32} />,
    },
    {
      title: "Pay & Save",
      desc: "Pay instantly and get insights on how to save energy.",
      icon: <CreditCard size={32} />,
    },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-12">Manage Bills in 3 Easy Steps</h2>
      <div className="grid md:grid-cols-3 gap-12 relative">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-base-content/70">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
