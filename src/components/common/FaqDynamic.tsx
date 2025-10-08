import { Minus, Plus } from 'lucide-react';
import React, { useState } from 'react'

interface AccordionItem {
    header: string;
    text: string;
}
interface FaqProps {
    accordionItems: AccordionItem[];
    title: string;
}
const FaqDynamic = ({ title, accordionItems }: FaqProps) => {

    const [activeIndex, setActiveIndex] = useState<number | null>(null);


    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    return (
        <div className="p-5 py-5 md:py-10">
            <div className="max-w-5xl m-auto flex flex-col gap-5 md:gap-10 items-center">
                <div className="rounded-md bg-[#FFBB28] p-2 sm:p-3 md:p-4">
                    <p className="uppercase font-medium dark-primary-txt text-center text-xs sm:text-sm md:text-base">
                        {title}
                    </p>
                </div>

                <div className="space-y-4 w-full">
                    {accordionItems && accordionItems.map((item, index) => (
                        <div
                            key={index}
                            className="border primary-border cursor-pointer p-3 rounded-lg bg-white shadow-md"
                        >
                            {/* Accordion Header */}
                            <button
                                onClick={() => toggleAccordion(index)}
                                className={`w-full flex justify-between items-center gap-2 ${activeIndex === index && "pb-3"
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
                                className={`overflow-hidden transition-[max-height] duration-300 ${activeIndex === index ? "max-h-fit" : "max-h-0"
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
    )
}

export default FaqDynamic