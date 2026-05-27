import Image from "next/image";
import React, { useState, useMemo } from "react";
import { ProductsTopBar } from "@/components/common/MarketPlace/ProductsTopBar";
import { ProductsGrid } from "@/components/common/MarketPlace/ProductGrid";
import { NavigationButtons } from "@/components/common/Navigation/NavigationButton";
import { SlidersHorizontal, X } from "lucide-react";
import CategoriesImageFilters from "./Categories/CategoriesImageFilters";
import { Product, SubCategory } from "@/types/prisma-schema-types";
import { CategoryHeader } from "./Categories/CategoryHeader";
import { FiltersPanel } from "./FiltersPanel";
import { ProductFilter, ProductFilterActions } from "@/hooks/useProductFilter";
import ProductCardSkeletonGrid from "@/components/common/Skeletons/ProductCardSkeletonGrid";

export interface FilterGroup {
  groupName: string;
  items: string[];
}

interface ProductFilterLayoutProps {
  title: string;
  routeName: string;
  products: Product[];
  subCategories?: SubCategory[];
  locations: string[];
  filters?: ProductFilter;
  actions?: ProductFilterActions;
  children?: React.ReactNode;
  hasActiveFilters: boolean;
  totalActiveFilters: number;
  totalPages: number;
  currentPage: number;
  showPagination?: boolean;
  isLoading?: boolean;
  isFetching?: boolean;
}

// General filters for "All Products" page
const generalFilters: FilterGroup[] = [
  {
    groupName: "Quantity",
    items: ["Show All", "Bulk", "Unit"],
  },
  {
    groupName: "Count",
    items: [
      "Show All",
      "Pieces",
      "Dozen",
      "Kilogram",
      "Carton",
      "Bag",
      "Crate",
      "Each",
      "Basket",
      "Others",
    ],
  },
  {
    groupName: "Discount",
    items: ["Show All", "With Discount", "Without Discount"],
  },
];

export const ProductFilterLayout: React.FC<ProductFilterLayoutProps> = ({
  title,
  routeName,
  products,
  subCategories,
  locations,
  filters,
  actions,
  children,
  hasActiveFilters,
  totalActiveFilters,
  totalPages,
  currentPage,
  showPagination,
  isLoading,
  isFetching,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
  const closeFilter = () => setIsFilterOpen(false);

  const additionalFilters: FilterGroup[] = useMemo(() => {
    if (!filters?.subcategoryId) return generalFilters;
    const sub = subCategories?.find((s) => s.id === filters.subcategoryId);

    return sub?.category?.filters ?? generalFilters;
  }, [filters?.subcategoryId, subCategories]);

  return (
    <div className="w-full py-5 relative bg-lite min-h-screen">
      <div className="w-11/12 lg:max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <CategoryHeader
          categorySlug={routeName as string}
          categoryName={title}
        />

        {/* Category Image Filters */}
        <CategoriesImageFilters
          subCategories={subCategories ?? []}
          selectedSlug={filters?.subcategoryId}
          onSelect={actions?.setSubCategoryId as (id?: string) => void}
        />

        {/* Top Bar with Sort & Count */}
        <ProductsTopBar
          total={products?.length ?? 0}
          sort={filters?.sortBy ?? ""}
          setSort={actions?.setSortBy as (sort: string) => void}
        />

        {/* Mobile Filter Button */}
        <button
          onClick={toggleFilter}
          className="
                      md:hidden fixed bottom-6 left-6 z-999
                      bg-primary text-white 
                      w-14 h-14 rounded-full
                      flex items-center justify-center
                      shadow-lg hover:shadow-xl
                      active:scale-95
                      transition-all duration-300
                      group
                  "
          aria-label="Toggle Filters"
        >
          <SlidersHorizontal className="w-6 h-6 transition-transform group-hover:rotate-90" />

          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
              {totalActiveFilters}
            </span>
          )}
        </button>

        {/* Mobile Overlay */}
        {isFilterOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-50"
            onClick={closeFilter}
          />
        )}

        {/* Mobile Filter Sidebar */}
        <div
          className={`
                      md:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50
                      transform transition-transform duration-300 ease-in-out
                      overflow-y-auto
                      ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
                  `}
        >
          <div className="sticky top-0 bg-white shadow-sm p-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-dark-green">Filters</h3>
              {hasActiveFilters && (
                <p className="text-xs text-gray-500">
                  {totalActiveFilters} filter
                  {totalActiveFilters !== 1 ? "s" : ""} applied
                </p>
              )}
            </div>

            <button
              onClick={closeFilter}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <FiltersPanel
              products={products ?? []}
              locations={locations}
              additionalFilters={additionalFilters}
              selectedLocations={filters?.locations}
              setSelectedLocations={
                actions?.setLocations as (locations: string[]) => void
              }
              selectedLocationLga={filters?.locationLga}
              setSelectedLocationLga={
                actions?.setLocationLga as (lga?: string) => void
              }
              selectedFilters={filters?.attributes}
              setSelectedFilters={
                actions?.setAttributes as (attributes: string[]) => void
              }
              selectedPriceRange={filters?.priceRange}
              onPriceChange={
                actions?.setPriceRange as (min: number | undefined, max: number | undefined) => void
              }
              hasActiveFilters={hasActiveFilters}
              onClearAll={actions?.clearAll as () => void}
              selectedRating={filters?.minRating}
              setSelectedRating={
                actions?.setMinRating as (rating?: number) => void
              }
            />
          </div>

          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex gap-3">
            {hasActiveFilters && (
              <button
                onClick={() => {
                  actions?.clearAll();
                  closeFilter();
                }}
                className="flex-1 py-3 border border-primary text-primary rounded-lg font-semibold text-sm hover:bg-primary/5 transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={closeFilter}
              className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold text-sm"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="hidden md:block col-span-1 space-y-4">
            <FiltersPanel
              products={products ?? []}
              locations={locations}
              additionalFilters={additionalFilters}
              selectedLocations={filters?.locations}
              setSelectedLocations={
                actions?.setLocations as (locations: string[]) => void
              }
              selectedLocationLga={filters?.locationLga}
              setSelectedLocationLga={
                actions?.setLocationLga as (lga?: string) => void
              }
              selectedFilters={filters?.attributes}
              setSelectedFilters={
                actions?.setAttributes as (attributes: string[]) => void
              }
              selectedPriceRange={filters?.priceRange}
              onPriceChange={
                actions?.setPriceRange as (min: number | undefined, max: number | undefined) => void
              }
              hasActiveFilters={hasActiveFilters}
              onClearAll={actions?.clearAll as () => void}
              selectedRating={filters?.minRating}
              setSelectedRating={
                actions?.setMinRating as (rating?: number) => void
              }
            />
          </div>

          {/* Products */}
          <div className="col-span-1 md:col-span-3">
            {isLoading ? (
              <ProductCardSkeletonGrid count={12} />
            ) : (
              <div className="relative">
                {/* Subtle overlay when refetching on filter/page change */}
                {isFetching && (
                  <div className="absolute inset-0 bg-white/60 rounded-2xl z-10 flex items-center justify-center">
                    <div className="w-8 h-8 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                {products?.length === 0 ? (
                  <div className="w-full text-center flex flex-col items-center">
                    <div className="w-32 h-32 lg:w-52 lg:h-52 relative">
                      <img
                        src="/assets/images/marketplaces/notfound.png"
                        alt="not found"
                        className="object-contain"
                      />
                    </div>
                    <p className="font-semibold text-primary text-lg">Not Found</p>
                    <p className="text-sm text-gray-500 max-w-xs mt-2">
                      No product(s) match your filters.
                    </p>
                  </div>
                ) : (
                  <div className={isFetching ? "opacity-50 pointer-events-none" : ""}>
                    <ProductsGrid products={products ?? []} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {showPagination && (
          <div className="my-5 w-full flex items-center justify-between">
            <NavigationButtons
              onPrevious={() => actions?.setPage(currentPage - 1)}
              onNext={() => actions?.setPage(currentPage + 1)}
              previousDisabled={currentPage === 1}
              nextDisabled={currentPage === totalPages}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        )}

        {/* Extra Content (e.g., CTA Banner) */}
        {children}
      </div>
    </div>
  );
};
