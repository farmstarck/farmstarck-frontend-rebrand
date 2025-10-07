"use client"
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type AccordionItem = {
  header: string;
  text: string;
};

const accordionLocalItems: AccordionItem[] = [
  {
    header: "What is Farmstarck?",
    text: "Farmstarck is an agri-tech platform that connects farmers, merchants, businesses, and consumers through a digital marketplace, smart savings wallet (Food Vault), AI-powered inventory tools, procurement services, and investment opportunities.",
  },
  {
    header: "Who can use Farmstarck?",
    text: "Farmers, agro-merchants, processors, restaurants, caterers, retailers, and even everyday consumers looking for quality food and agri-products can use Farmstarck.",
  },
  {
    header: "How do I register?",
    text: "Sign up on our website or mobile app. You'll be onboarded based on whether you're a farmer, merchant, consumer, or institutional buyer.",
  },
  {
    header: "Who can request procurement?",
    text: "Businesses, merchants, caterers, and organizations looking for large quantities of agricultural products can use this service.",
  },
  {
    header: "Who are the sellers on the platform?",
    text: "Sellers include verified farmers, cooperatives, and agro-merchants who list high-quality goods for retail and wholesale.",
  },
];

interface FaqProps {
  accordionItems?: AccordionItem[];
}

const Faq = ({ accordionItems }: FaqProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Use passed items if available, otherwise use local items
  const items = accordionItems && accordionItems.length > 0 ? accordionItems : accordionLocalItems;

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="p-5 py-10 md:py-28 lite-bg">
      <div className="max-w-5xl m-auto flex flex-col gap-5 md:gap-10 items-center">
        <div className="rounded-md bg-[#FFBB28] p-2 sm:p-3 md:p-4">
          <p className="uppercase font-medium dark-primary-txt text-center text-xs sm:text-sm md:text-base">
            Frequently Asked Questions
          </p>
        </div>
        <h2 className="capitalize text-xl sm:text-3xl md:text-4xl text-center font-subHeading leading-tight font-extrabold dark-green-txt">
          What Most Of Our Customers Ask
        </h2>
        <div className="space-y-4 w-full">
          {items.map((item, index) => (
            <div
              key={index}
              className="border primary-border cursor-pointer p-3 rounded-lg bg-white shadow-md"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className={`w-full flex justify-between items-center gap-2 ${
                  activeIndex === index && "pb-3"
                } text-left focus:outline-none`}
              >
                <span className="capitalize font-btnBody text-sm font-bold sm:text-base">
                  {item.header}
                </span>
                <div className="w-7 h-7 rounded-full lite-bg flex items-center justify-center">
                  {activeIndex === index ? (
                    <Minus size={17} className="text-secondary-light" />
                  ) : (
                    <Plus size={17} className="text-secondary-light" />
                  )}
                </div>
              </button>

              {/* Accordion Content */}
              <div
                className={`overflow-hidden transition-[max-height] duration-300 ${
                  activeIndex === index ? "max-h-fit" : "max-h-0"
                }`}
              >
                <p className="text-zinc-600 text-sm sm:text-base">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;