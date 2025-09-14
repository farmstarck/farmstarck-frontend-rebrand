import React from "react";

const steps = [
  {
    number: 1,
    header: "Consultation",
    text: "We begin with a detailed consulation to understand your specific needs and requirements.",
  },
  {
    number: 2,
    header: "Custom Plan",
    text: "Our team develops a tailored procurement plan designed to meet your goals and budget",
  },
  {
    number: 3,
    header: "Supplier Selection",
    text: "We identify and vet the best suppliers from our extensive network of verified producers.",
  },
  {
    number: 4,
    header: "Out for Delivery",
    text: "We handle the entire procurement process, from ordering to delivery, with real-time tracking.",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <div className="flex flex-col items-start relative">
      {steps.map((step, idx) => (
        <div
          key={idx}
          className="flex items-start gap-5 relative mb-8 last:mb-0"
        >
          {/* Circle Number */}
          <div className="min-w-[40px] h-[40px] flex items-center justify-center rounded-full bg-secondary-light text-white font-bold z-10">
            {step.number}
          </div>

          {/* Line Connector */}
          {idx !== steps.length - 1 && (
            <div className="absolute left-5 top-10 w-0.5 h-full border border-dashed border-secondary-light "></div>
          )}

          {/* Label */}
          <div className="flex flex-col">
            <h2 className="text-sm md:text-base font-subHeading">
              {step.header}
            </h2>
            <p className="text-sm md:text-base">{step.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HowItWorks;
