import React, { useState } from "react";
import { CustomDropDown } from "../CustomDropDown";
import { LayoutDashboard, List } from "lucide-react";

export interface ProductsTopBarProps {
  total: number;
  sort: string;
  setSort: (value: string) => void;
}

export const ProductsTopBar: React.FC<ProductsTopBarProps> = ({
  total,
  sort,
  setSort,
}) => {
  const data = [
    { label: "A-Z", value: "a-z" },
    { label: "Z-A", value: "z-a" },
    { label: "Newest", value: "newest" },
    { label: "Lowest Price", value: "price_low_high" },
    { label: "Highest Price", value: "price_high_low" },
  ];

  const Icons = [LayoutDashboard, List];
  const [iconStyle, setIconStyle] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row w-full my-5 justify-between items-start lg:items-center p-4 bg-white rounded-md shadow-sm gap-4">
      {/* Left text */}
      <p className="text-xs lg:text-sm text-gray-600">
        Showing 1–20 of {total} results
      </p>

      {/* Right side */}
      <div className="flex items-center w-full lg:w-fit justify-between gap-5 lg:gap-10 lg:ml-auto">
        {/* Sort */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-xs">Sort by:</span>

          <CustomDropDown
            value={sort}
            onChange={(value) => setSort(value)}
            options={data}
          />
        </div>

        {/* Toggle icons */}
        {/* <div className="flex items-center gap-2">
          {Icons.map((Icon, index) => {
            const active = index === iconStyle;

            return (
              <button
                key={index}
                onClick={() => setIconStyle(index)}
                className={`
                  p-2 rounded-md transition-all duration-200
                  ${active ? "bg-lite" : "bg-gray-100 text-gray-500"}
                `}
              >
                <Icon size={20} />
              </button>
            );
          })}
        </div> */}
      </div>
    </div>
  );
};
