// components/common/ui/FilterOnly.tsx
import { Filter } from "lucide-react";
import React, { useState } from "react";
import ReusableFilter, {
  FilterOption,
} from "@/components/dashboard/buyer/ReusableFilter";

interface FilterOnlyProps {
  onFilterClick?: () => void;
  hasActiveFilters?: boolean;
  statusText?: string;
  statusOptions?: FilterOption[];
  selectedStatuses?: string[];
  setSelectedStatuses?: (v: string[]) => void;
  dateFrom?: string;
  dateTo?: string;
  setDateFrom?: (v: string) => void;
  setDateTo?: (v: string) => void;
  onClearFilters?: () => void;
}

const FilterOnly = ({
  onFilterClick,
  hasActiveFilters = false,
  statusText,
  statusOptions,
  selectedStatuses,
  setSelectedStatuses,
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  onClearFilters,
}: FilterOnlyProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterClick = () => {
    if (onFilterClick) {
      onFilterClick();
    } else {
      setIsFilterOpen(true);
    }
  };

  const isActive =
    hasActiveFilters ||
    (selectedStatuses && selectedStatuses.length > 0) ||
    !!dateFrom ||
    !!dateTo;

  return (
    <>
      <button
        onClick={handleFilterClick}
        className="relative flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-400 rounded-xl text-sm font-bold transition-colors hover:bg-gray-50"
      >
        <Filter size={13} /> Filter
        {isActive && (
          <span className="w-2.5 h-2.5 relative inline-flex ml-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-green-500" />
          </span>
        )}
      </button>

      <ReusableFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        statusText={statusText}
        statusOptions={statusOptions}
        selectedStatuses={selectedStatuses}
        setSelectedStatuses={setSelectedStatuses}
        dateFrom={dateFrom}
        dateTo={dateTo}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        onClear={onClearFilters || (() => {})}
      />
    </>
  );
};

export default FilterOnly;
