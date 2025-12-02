import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const DeliveryAccordion = () => {
    const [chevronOpen, setChevronOpen] = useState(false);

    const toggleChevron = () => {
        setChevronOpen(!chevronOpen);
    };

    return (
        <div 
            className={`
                my-10 w-full bg-white rounded-md overflow-hidden
                transition-all duration-500 ease-in-out
                ${chevronOpen ? 'shadow-lg' : 'shadow-md'}
            `}
        >
            {/* Header - Always Visible */}
            <div
                onClick={toggleChevron}
                className="flex w-full cursor-pointer p-5 items-center justify-between hover:bg-gray-50 transition-colors duration-200"
            >
                <h3 className='font-bold text-gray-900'>Delivery & Return Policy</h3>
                <ChevronDown 
                    className={`
                        cursor-pointer text-gray-600
                        transition-all duration-500 ease-in-out
                        ${chevronOpen ? 'rotate-180 text-primary' : 'rotate-0'}
                    `}
                    size={24}
                />
            </div>

            {/* Collapsible Content */}
            <div 
                className={`
                    overflow-hidden
                    transition-all duration-500 ease-in-out
                    ${chevronOpen 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0'
                    }
                `}
            >
                <div className="px-5 pb-5 space-y-5 animate-fade-in">
                    {/* Delivery Terms */}
                    <div 
                        className="flex items-start flex-col gap-1 transform transition-all duration-300"
                        style={{
                            transitionDelay: chevronOpen ? '100ms' : '0ms'
                        }}
                    >
                        <div className="text-sm font-semibold text-gray-900">
                            FARMSTARCK DELIVERY TERMS
                        </div>
                        <div className="text-xs text-gray-600">
                            Item ordered will be handled by the logistics company.{' '}
                            <span className='underline text-primary cursor-pointer hover:text-primary/80 transition-colors'>
                                Learn More
                            </span>
                        </div>
                    </div>

                    {/* Return Policy */}
                    <div 
                        className="flex items-start flex-col gap-1 transform transition-all duration-300"
                        style={{
                            transitionDelay: chevronOpen ? '200ms' : '0ms'
                        }}
                    >
                        <div className="text-sm font-semibold text-gray-900">
                            FARMSTARCK PRODUCTS RETURN POLICY
                        </div>
                        <div className="text-xs text-gray-600">
                            Kindly go through our return policy.{' '}
                            <span className='underline text-primary cursor-pointer hover:text-primary/80 transition-colors'>
                                Learn More
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryAccordion;