import React from "react";
import Image from "next/image";
import { SubCategory } from "@/types/prisma-schema-types";

interface CategoriesImageFiltersProps {
  subCategories?: SubCategory[] | [];
  selectedSlug?: string;
  onSelect: (subcategoryId?: string) => void;
}

const CategoriesImageFilters: React.FC<CategoriesImageFiltersProps> = ({
  subCategories,
  selectedSlug,
  onSelect,
}) => {
  return (
    <div className="w-full mb-6">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {/* View All */}
        <button
          onClick={() => onSelect(undefined)}
          className={`
            flex-shrink-0 px-6 py-3 rounded-xl font-semibold text-sm border-2
            ${
              !selectedSlug
                ? "bg-primary text-white border-primary"
                : "bg-white border-gray-200"
            }
          `}
        >
          View All
        </button>

        {subCategories?.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`
              flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl
//               transition-all duration-300 min-w-[200px] border-2
              ${
                selectedSlug === item.id
                  ? "bg-primary/10 border-primary"
                  : "bg-white border-gray-200 hover:border-primary/50"
              }
            `}
          >
            <div className="w-12 h-12 relative">
              <Image
                src={item.image_url}
                alt={item.name}
                fill
                className="object-contain"
                sizes="48px"
              />
            </div>
            <span
              className={`text-xs capitalize font-medium text-center ${selectedSlug === item.id ? "text-primary" : "text-gray-700"}`}
            >
              {item.name}
            </span>
          </button>
        ))}
      </div>
      {/*{" "} */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CategoriesImageFilters;
