import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type AccordionItem = {
  header: string;
  text: string;
};

type FaqItemsProp = {
  faqItems: {
    topic: string;
    accordionItems: AccordionItem[];
  }[];
};

const FaqComp: React.FC<FaqItemsProp> = ({ faqItems }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className=" md:py-10    bg-white">
      <div className="max-w-5xl m-auto flex flex-col gap-5 md:gap-10 items-center">
        <div className="space-y-20 w-full ">
          {faqItems.map((item: any, index: any) => (
            <div
              key={index}
              className="flex flex-col gap-5 md:gap-10 items-center pb-14 border-b-2 border-secondary-light"
            >
              <div className="rounded-md bg-[#FFBB28] px-6 py-3  md:px-10 md:py-4 md:w-auto">
                <p className="uppercase font-subHeading font-extrabold text-secondary-dark text-center text-xs  sm:text-sm md:text-base">
                  {item.topic}
                </p>
              </div>
              <div className="flex flex-col gap-5 md:gap-10 h-[400px] overflow-x-auto scrollbar-hide w-full ">
                {item.accordionItems.map((accordion: any, i: any) => (
                  <div
                    key={i}
                    className="border border-secondary-light p-3 rounded-lg bg-white shadow-md w-full"
                  >
                    {/* Accordion Header */}
                    <button
                      onClick={() => toggleAccordion(i)}
                      className={`w-full flex justify-between  items-center gap-2 ${
                        activeIndex === i && "pb-3"
                      }    text-left focus:outline-none`}
                    >
                      <span className="capitalize font-btnBody text-sm font-bold sm:text-base">
                        {accordion.header}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-secondary-veryLight flex items-center justify-center">
                        {activeIndex === i ? (
                          <Minus size={17} className="text-secondary-light" />
                        ) : (
                          <Plus size={17} className="text-secondary-light" />
                        )}
                      </div>
                    </button>

                    {/* Accordion Content */}
                    <div
                      className={`overflow-hidden transition-[max-height] duration-300 ${
                        activeIndex === i ? "max-h-fit" : "max-h-0"
                      }`}
                    >
                      <p className="text-gray-600 font-subHeading2 p-4 text-sm sm:text-base">
                        {accordion.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqComp;
