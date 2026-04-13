import { Search, Filter } from 'lucide-react'
import React, { useState } from 'react'
import ReusableFilter, { FilterOption } from '@/components/dashboard/buyer/ReusableFilter'

interface SearchAndFilterProps {
    search: string;
    onSearchChange: (value: string) => void;
    // Optional click handler if parent wants to control the modal
    onFilterClick?: () => void;
    hasActiveFilters?: boolean;
    searchPlaceholder?: string;

    // Optional Filter Props to automatically render the ReusableFilter component internally
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

const SearchAndFilter = ({
    search,
    onSearchChange,
    onFilterClick,
    hasActiveFilters = false,
    searchPlaceholder = "Search...",
    statusText,
    statusOptions,
    selectedStatuses,
    setSelectedStatuses,
    dateFrom,
    dateTo,
    setDateFrom,
    setDateTo,
    onClearFilters
}: SearchAndFilterProps) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleFilterClick = () => {
        if (onFilterClick) {
            onFilterClick();
        } else {
            setIsFilterOpen(true);
        }
    }

    const isActive = hasActiveFilters || 
        (selectedStatuses && selectedStatuses.length > 0) || 
        !!dateFrom || 
        !!dateTo;

    return (
        <>
            <div className="flex w-full items-center gap-2">
                <div className="relative w-3/4">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => onSearchChange(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="w-full bg-white border rounded-xl pl-8 pr-3 py-3 text-base placeholder:text-gray-600  focus:outline-none border-gray-600 transition-colors"
                    />
                </div>

                <button
                    onClick={handleFilterClick}
                    className="relative flex w-1/4 justify-center items-center gap-1.5 px-3 py-3 bg-white border border-gray-600 rounded-xl text-base font-bold transition-colors"
                >
                    <Filter size={13} /> Filter
                    {isActive && (
                        <span className="w-2.5 h-2.5 relative inline-flex ml-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-green-500" />
                        </span>
                    )}
                </button>
            </div>

            {/* Reusable Filter Modal */}
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
    )
}

export default SearchAndFilter;
