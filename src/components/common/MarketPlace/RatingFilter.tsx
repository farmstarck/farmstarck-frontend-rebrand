// components/common/MarketPlace/RatingFilter.tsx
import { Star } from "lucide-react";

const RATING_OPTIONS = [
  { value: 4, label: "4 & above" },
  { value: 3, label: "3 & above" },
  { value: 2, label: "2 & above" },
  { value: 1, label: "1 & above" },
];

interface RatingFilterProps {
  selected?: number;
  onSelect: (rating?: number) => void;
}

export const RatingFilter = ({ selected, onSelect }: RatingFilterProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="text-sm font-bold text-gray-800 mb-3">Rating</h3>
      <div className="space-y-2">
        {RATING_OPTIONS.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onSelect(isSelected ? undefined : option.value)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-colors ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={12}
                      className={
                        star <= option.value
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600 font-medium">
                  {option.label}
                </span>
              </div>
              <div
                className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? "border-primary" : "border-gray-300"
                }`}
              >
                {isSelected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
