import { PriceRangeFilter } from "@/components/common/MarketPlace/PriceRangeFilter";
import { LocationFilter } from "@/components/common/MarketPlace/LocationFilter";
import {
  CategoryGroup,
  IndependentFilter,
} from "@/components/common/MarketPlace/Categories/IndependentFilter";
import { Product } from "@/types/prisma-schema-types";
import { RatingFilter } from "./RatingFilter";
import { SlidersHorizontal, X } from "lucide-react";

interface FiltersPanelProps {
  products: Product[];
  locations: string[];
  additionalFilters: CategoryGroup[];
  selectedLocations?: string[];
  setSelectedLocations?: (v: string[]) => void;
  selectedFilters?: string[];
  setSelectedFilters?: (v: string[]) => void;
  onPriceChange: (min: number, max: number) => void;
  hasActiveFilters: boolean;
  onClearAll: () => void;
  selectedRating?: number;
  setSelectedRating?: (rating?: number) => void;
}

// ── Section wrapper ───────────────────────────────────────────────
const FilterSection = ({
  label,
  onClear,
  children,
}: {
  label: string;
  onClear?: () => void;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
      <p className="text-sm font-bold text-gray-800">{label}</p>
      {onClear && (
        <button
          onClick={onClear}
          className="text-xs text-primary font-semibold hover:underline transition-colors"
        >
          Clear
        </button>
      )}
    </div>
    <div className="p-3">{children}</div>
  </div>
);

export const FiltersPanel = ({
  products,
  locations,
  additionalFilters,
  selectedLocations,
  setSelectedLocations,
  selectedFilters,
  setSelectedFilters,
  onPriceChange,
  hasActiveFilters,
  onClearAll,
  selectedRating,
  setSelectedRating,
}: FiltersPanelProps) => {
  return (
    <div className="space-y-3">
      {/* ── Header with clear all ─────────────────────────────── */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-primary" />
          <p className="text-sm font-bold text-gray-800">Filters</p>
          {hasActiveFilters && (
            <span className="bg-primary/10 text-primary text-[10px] font-bold rounded-full px-2 py-0.5 leading-none border border-primary/20">
              Active
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1.5 text-xs text-red-500 font-semibold bg-red-50 hover:bg-red-100 border border-red-100 px-2.5 py-1.5 rounded-lg transition-colors"
          >
            <X size={11} />
            Clear all
          </button>
        )}
      </div>
      {/* ── Price ─────────────────────────────────────────────── */}
      <FilterSection label="Price Range">
        <PriceRangeFilter products={products} onFilter={onPriceChange} />
      </FilterSection>

      {/* ── Rating ────────────────────────────────────────────── */}
      {setSelectedRating && (
        <FilterSection
          label="Rating"
          onClear={
            selectedRating ? () => setSelectedRating(undefined) : undefined
          }
        >
          <RatingFilter
            selected={selectedRating}
            onSelect={setSelectedRating}
          />
        </FilterSection>
      )}

      {/* ── Location ──────────────────────────────────────────── */}
      {locations.length > 0 && (
        <FilterSection
          label="Location"
          onClear={
            selectedLocations?.length
              ? () => setSelectedLocations?.([])
              : undefined
          }
        >
          <LocationFilter
            locations={locations}
            selected={selectedLocations || []}
            setSelected={setSelectedLocations || (() => {})}
          />
        </FilterSection>
      )}

      {/* ── Additional (count, quantity, discount etc.) ────────── */}
      {additionalFilters.length > 0 && (
        <FilterSection
          label="More Filters"
          onClear={
            selectedFilters?.length ? () => setSelectedFilters?.([]) : undefined
          }
        >
          <IndependentFilter
            categoryGroups={additionalFilters}
            selected={selectedFilters || []}
            setSelected={setSelectedFilters || (() => {})}
          />
        </FilterSection>
      )}
    </div>
  );
};
