import { PriceRangeFilter } from "@/components/common/MarketPlace/PriceRangeFilter";
import { LocationFilter } from "@/components/common/MarketPlace/LocationFilter";
import {
  CategoryGroup,
  IndependentFilter,
} from "@/components/common/MarketPlace/Categories/IndependentFilter";
import { Product } from "@/types/prisma-schema-types";

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
}

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
}: FiltersPanelProps) => {
  return (
    <div className="space-y-4">
      {/* Price */}
      <PriceRangeFilter products={products} onFilter={onPriceChange} />

      {/* Clear all */}
      {hasActiveFilters && (
        <div
          className={`
                    overflow-hidden
                    transition-all duration-300 ease-in-out
                    ${
                      hasActiveFilters
                        ? "max-h-20 opacity-100 translate-y-0"
                        : "max-h-0 opacity-0 -translate-y-2"
                    }
                `}
        >
          <button
            onClick={onClearAll}
            className="
            w-full text-sm bg-primary text-white 
            px-4 rounded-md py-2.5 
            hover:bg-primary/90 
            transition-all font-medium
          "
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Location */}
      {locations.length > 0 && (
        <LocationFilter
          locations={locations}
          selected={selectedLocations || []}
          setSelected={setSelectedLocations || (() => {})}
        />
      )}

      {/* Additional */}
      {additionalFilters.length > 0 && (
        <IndependentFilter
          categoryGroups={additionalFilters}
          selected={selectedFilters || []}
          setSelected={setSelectedFilters || (() => {})}
        />
      )}
    </div>
  );
};
