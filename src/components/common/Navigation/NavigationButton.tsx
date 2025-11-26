import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface NavigationButtonsProps {
  onPrevious?: () => void;
  onNext?: () => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  previousLabel?: string;
  nextLabel?: string;
  className?: string;
  showLabels?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  previousDisabled = false,
  nextDisabled = false,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  className = '',
  showLabels = true,
}) => {
  return (
    <div className={`flex items-center w-full justify-between ${className}`}>
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        disabled={previousDisabled}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg  transition-all duration-200 ${
          previousDisabled
            ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
            : '  text-dark-green'
        }`}
      >
        <ArrowLeft size={20} />
        {showLabels && <span>{previousLabel}</span>}
      </button>
       <div className="font-semibold text-lg text-dark-green">1 2 3 4 ... 5 6 7 8</div>
      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
          nextDisabled
            ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
            : '  text-dark-green'
        }`}
      >
        {showLabels && <span>{nextLabel}</span>}
        <ArrowRight size={20} />
      </button>
    </div>
  );
};