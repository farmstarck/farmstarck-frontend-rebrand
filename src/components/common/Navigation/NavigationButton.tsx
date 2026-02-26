import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface NavigationButtonsProps {
  onPrevious?: () => void;
  onNext?: () => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  previousLabel?: string;
  nextLabel?: string;
  currentPage: number;
  totalPages: number;
  className?: string;
  showLabels?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  previousDisabled = false,
  nextDisabled = false,
  previousLabel = "Previous",
  nextLabel = "Next",
  currentPage,
  totalPages,
  className = "",
  showLabels = true,
}) => {
  return (
    <div className={`flex items-center w-full justify-between ${className}`}>
      <button
        onClick={onPrevious}
        disabled={previousDisabled}
        className={`flex items-center gap-2 px-4 py-2 ${
          previousDisabled ? "text-gray-400" : "text-dark-green"
        }`}
      >
        <ArrowLeft size={20} />
        Previous
      </button>

      <div className="font-semibold text-lg text-dark-green">
        Page {currentPage} of {totalPages}
      </div>

      <button
        onClick={onNext}
        disabled={nextDisabled}
        className={`flex items-center gap-2 px-4 py-2 ${
          nextDisabled ? "text-gray-400" : "text-dark-green"
        }`}
      >
        Next
        <ArrowRight size={20} />
      </button>
    </div>
  );
};
