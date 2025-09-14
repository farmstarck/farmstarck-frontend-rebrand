import React, { useState } from "react";

type AccordionItem = {
  title: string;
  type: string;
  content: AccordionContentItem[];
};

type AccordionContentItem = {
  header: string;
  text?: string;
  lists?: string[];
};

type AccordionProps = {
  items: AccordionItem[];
};

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 w-full">
      {items.map((item, index) => (
        <div key={index} className="">
          {/* Accordion Header */}
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex justify-between items-center gap-2 p-3  text-left focus:outline-none shadow-md"
          >
            <span className="capitalize text-xs sm:text-lg md:text-xl">
              {item.title}
            </span>
            <div className="flex gap-2 sm:gap-5 items-center">
              <p className="capitalize font-light text-btn-txt sm:text-xs">
                {item.type}
              </p>
              {/* <span
                className={`transform transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  className="w-2"
                >
                  <path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z" />
                </svg>
              </span> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-3 fill-gray-400"
              >
                <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
              </svg>
            </div>
          </button>

          {/* Accordion Content */}
          <div
            className={`overflow-hidden transition-[max-height] flex flex-col items-center duration-300 ${
              activeIndex === index ? "max-h-fit" : "max-h-0"
            }`}
          >
            <div className="py-4 px-0 md:px-10 font-normal text-sm">
              <div className="space-y-2 flex flex-col gap-8">
                {item.content.map((listItem, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <h3 className=" capitalize font-subHeading2 md:text-start md:text-base">
                      {listItem.header}
                    </h3>
                    {listItem?.text ? (
                      <p className="text-xs text-gray-700 md:text-start md:text-sm">
                        {listItem.text}
                      </p>
                    ) : (
                      <ul className="flex flex-col gap-2 ">
                        {listItem?.lists?.map((list, i) => (
                          <li key={i} className="list-disc ml-5 md:ml-10">
                            {list}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <button className="bg-secondary-light text-white rounded-full mt-5 py-2 px-12 text-center font-btnBody text-sm md:text-base">
              Apply Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
