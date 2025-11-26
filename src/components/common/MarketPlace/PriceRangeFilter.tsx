import React, { useState, useRef, useEffect } from "react";

export interface PriceRangeFilterProps {
  products: any[];
  onFilter: (min: number, max: number) => void;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  products,
  onFilter,
}) => {
  const minPrice = Math.min(...products.map((p) => p.amountFrom));
  const maxPrice = Math.max(...products.map((p) => p.amountTo));

  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(maxPrice);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);

  const handleMinChange = (value: number) => {
    if (value <= max) {
      setMin(value);
    }
  };

  const handleMaxChange = (value: number) => {
    if (value >= min) {
      setMax(value);
    }
  };

  const getPercentage = (value: number) => {
    return ((value - minPrice) / (maxPrice - minPrice)) * 100;
  };

  const getValueFromPosition = (clientX: number) => {
    if (!sliderRef.current) return minPrice;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(minPrice + percentage * (maxPrice - minPrice));
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingMin) {
        handleMinChange(getValueFromPosition(e.clientX));
      }
      if (isDraggingMax) {
        handleMaxChange(getValueFromPosition(e.clientX));
      }
    };

    const handleMouseUp = () => {
      setIsDraggingMin(false);
      setIsDraggingMax(false);
    };

    if (isDraggingMin || isDraggingMax) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDraggingMin, isDraggingMax, min, max]);

  const handleApply = () => {
    onFilter(min, max);
  };

  const minPercentage = getPercentage(min);
  const maxPercentage = getPercentage(max);

  return (
    <div className="bg-white rounded-lg satoshi border border-gray-200 p-4">
      {/* <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3> */}

      {/* Price Display */}
      <div className="flex items-center gap-5 justify-between mb-6">
        <div className="flex flex-col gap-2 w-1/2 ">
          <span className="font-semibold text-xs">Min Price</span>
          <input
            type="number"
            value={min}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            className="w-full pl-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary"
            placeholder="Min"
          />
        </div>
        <div className="flex flex-col w-1/2  gap-2 items-start">
          <span className="font-semibold text-xs">Max Price</span>
          <input
            type="number"
            value={max}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            className="w-full pl-3  py-2 border border-gray-300 rounded-lg text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Max"
          />
        </div>
      </div>

     
      {/* Custom Range Slider */}
      <div className="relative mb-6">
        {/* Track Background */}
        <div
          ref={sliderRef}
          className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
          onClick={(e) => {
            const value = getValueFromPosition(e.clientX);
            const distToMin = Math.abs(value - min);
            const distToMax = Math.abs(value - max);

            if (distToMin < distToMax) {
              handleMinChange(value);
            } else {
              handleMaxChange(value);
            }
          }}
        >
          {/* Active Track */}
          <div
            className="absolute h-full bg-primary rounded-full"
            style={{
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`,
            }}
          />

          {/* Min Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-2 border-primary rounded-full cursor-grab active:cursor-grabbing shadow-md hover:scale-110 transition-transform z-10"
            style={{ left: `${minPercentage}%` }}
            onMouseDown={(e) => {
              e.stopPropagation();
              setIsDraggingMin(true);
            }}
          />

          {/* Max Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-2 border-primary rounded-full cursor-grab active:cursor-grabbing shadow-md hover:scale-110 transition-transform z-10"
            style={{ left: `${maxPercentage}%` }}
            onMouseDown={(e) => {
              e.stopPropagation();
              setIsDraggingMax(true);
            }}
          />
        </div>
      </div>

      {/* Prices */}

      <div className="mt-5 text-xs font-medium w-full ">
        Prices:₦{min.toLocaleString()}-₦{max.toLocaleString()}
      </div>


      {/* Apply Button */}
      <button
        onClick={handleApply}
        className="w-full bg-primary mt-5 text-white py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Apply Filter
      </button>
    </div>
  );
};