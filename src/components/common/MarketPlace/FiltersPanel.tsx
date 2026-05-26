import { PriceRangeFilter } from "@/components/common/MarketPlace/PriceRangeFilter";
import { LocationFilter } from "@/components/common/MarketPlace/LocationFilter";
import {
  CategoryGroup,
  IndependentFilter,
} from "@/components/common/MarketPlace/Categories/IndependentFilter";
import { Product } from "@/types/prisma-schema-types";
import { RatingFilter } from "./RatingFilter";
import { SlidersHorizontal, X } from "lucide-react";
import { useStatesAndLgas } from "@/hooks/useStatesAndLgas";

interface FiltersPanelProps {
  products: Product[];
  locations: string[];
  additionalFilters: CategoryGroup[];
  selectedLocations?: string[];
  setSelectedLocations?: (v: string[]) => void;
  selectedLocationLga?: string;
  setSelectedLocationLga?: (lga?: string) => void;
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
  selectedLocationLga,
  setSelectedLocationLga,
  selectedFilters,
  setSelectedFilters,
  onPriceChange,
  hasActiveFilters,
  onClearAll,
  selectedRating,
  setSelectedRating,
}: FiltersPanelProps) => {
  // Derive selected state for LGA lookup from the first selected location
  const selectedState = selectedLocations?.[0] ?? "";
  const { lgaOptions } = useStatesAndLgas({ selectedState });

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

      {/* ── Location (State) ──────────────────────────────────── */}
      {locations.length > 0 && (
        <FilterSection
          label="State"
          onClear={
            selectedLocations?.length
              ? () => {
                  setSelectedLocations?.([]);
                  setSelectedLocationLga?.(undefined);
                }
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

      {/* ── LGA filter (appears when a state is selected) ─────── */}
      {selectedState && lgaOptions.length > 0 && setSelectedLocationLga && (
        <FilterSection
          label="Local Government Area"
          onClear={
            selectedLocationLga
              ? () => setSelectedLocationLga(undefined)
              : undefined
          }
        >
          <div className="flex flex-col gap-0.5 max-h-52 overflow-y-auto pr-0.5">
            {/* Show All option */}
            <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  !selectedLocationLga ? "border-primary bg-white" : "border-gray-300"
                }`}
              >
                {!selectedLocationLga && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
              <input
                type="radio"
                name="lga-filter"
                className="hidden"
                checked={!selectedLocationLga}
                onChange={() => setSelectedLocationLga(undefined)}
              />
              <span className="text-sm text-primary font-medium">Show All</span>
            </label>

            {/* LGA options */}
            {lgaOptions.map((lga) => (
              <label
                key={lga.value}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    selectedLocationLga === lga.value
                      ? "border-primary bg-white"
                      : "border-gray-300"
                  }`}
                >
                  {selectedLocationLga === lga.value && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
                <input
                  type="radio"
                  name="lga-filter"
                  className="hidden"
                  checked={selectedLocationLga === lga.value}
                  onChange={() => setSelectedLocationLga(lga.value)}
                />
                <span className="text-sm capitalize text-gray-700">
                  {lga.label}
                </span>
              </label>
            ))}
          </div>
          {lgaOptions.length > 6 && (
            <p className="text-[10px] text-gray-400 text-center mt-1 italic">
              Scroll to see more
            </p>
          )}
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
