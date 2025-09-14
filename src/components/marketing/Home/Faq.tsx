import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type AccordionItem = {
  header: string;
  text: string;
};

type AccordionItems = {
  accordionItems: AccordionItem[];
};

const Faq: React.FC<AccordionItems> = ({ accordionItems }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="p-5 py-10  md:py-28  bg-secondary-veryLight">
      <div className="max-w-5xl m-auto flex flex-col gap-5 md:gap-10 items-center">
        <div className="rounded-md bg-[#FFBB28] p-2 sm:p-3 md:p-4">
          <p className="uppercase font-subHeading  text-secondary-dark text-center text-xs  sm:text-sm md:text-base">
            Frequently Asked Questions
          </p>
        </div>
        <h2 className="capitalize ext-xl sm:text-3xl md:text-4xl  text-center font-subHeading leading-tight font-extrabold text-secondary-veryDark text-centers">
          What Most Of Our Customers Ask
        </h2>
        <div className="space-y-4 w-full">
          {accordionItems.map((item: any, index: any) => (
            <div
              key={index}
              className="border border-secondary-light p-3 rounded-lg bg-white shadow-md"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className={`w-full flex justify-between  items-center gap-2 ${
                  activeIndex === index && "pb-3"
                }    text-left focus:outline-none`}
              >
                <span className="capitalize font-btnBody text-sm font-bold sm:text-base">
                  {item.header}
                </span>
                <div className="w-7 h-7 rounded-full bg-secondary-veryLight flex items-center justify-center">
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
                <p className="text-gray-500 text-sm sm:text-base">
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
