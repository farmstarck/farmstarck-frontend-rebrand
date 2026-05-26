import { ProductsGrid } from "@/components/common/MarketPlace/ProductGrid";
import { ProductsTopBar } from "@/components/common/MarketPlace/ProductsTopBar";
import { SlidersHorizontal, X } from "lucide-react";
import MarketPlaceLayout from "@/layouts/MarketPlaceLayout";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import CategoriesImageFilters from "@/components/common/MarketPlace/Categories/CategoriesImageFilters";
import { CategoryHeader } from "@/components/common/MarketPlace/Categories/CategoryHeader";
import { useProductFilters } from "@/hooks/useProductFilter";
import { Product } from "@/types/prisma-schema-types";
import { FiltersPanel } from "@/components/common/MarketPlace/FiltersPanel";
import { useQuery } from "@tanstack/react-query";
import { categoryQueries } from "@/queries/category.queries";
import ProductCardSkeletonGrid from "@/components/common/Skeletons/ProductCardSkeletonGrid";

const DynamicCategories = () => {
  const router = useRouter();
  const { category } = router.query;
  const { filters, actions } = useProductFilters();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // ── Queries ──────────────────────────────────────────────────────
  const { data: categoryData } = useQuery({
    ...categoryQueries.categoryBySlug(category as string),
    select: (res) => res.data.data,
  });

  const { data: subCategories = [] } = useQuery({
    ...categoryQueries.subCategoriesByCategory(categoryData?.id ?? ""),
    select: (res) => res.data.data,
  });

  const {
    data: products = [],
    isLoading: productsLoading,
    isFetching: productsFetching,
  } = useQuery({
    ...categoryQueries.productsByCategory(categoryData?.id ?? "", filters),
    select: (res) => res.data.data as Product[],
  });

  // ── Derived state ────────────────────────────────────────────────
  const locations = useMemo(
    () => [...new Set(products.map((p) => p.location).filter(Boolean))],
    [products],
  );

  const totalActiveFilters =
    filters.locations.length +
    filters.attributes.length +
    (filters.priceRange ? 1 : 0) +
    (filters.locationLga ? 1 : 0);

  const hasActiveFilters = totalActiveFilters > 0;

  return (
    <div className="w-full py-5 relative bg-lite min-h-screen">
      <div className="w-11/12 lg:max-w-7xl mx-auto">
        <CategoryHeader
          categorySlug={category as string}
          categoryName={categoryData?.name ?? ""}
        />

        <CategoriesImageFilters
          subCategories={subCategories}
          selectedSlug={filters.subcategoryId}
          onSelect={actions.setSubCategoryId}
        />

        <ProductsTopBar
          total={products.length}
          sort={filters.sortBy ?? ""}
          setSort={actions.setSortBy}
        />

        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsFilterOpen((v) => !v)}
          className="md:hidden fixed bottom-6 left-6 z-999 bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 group"
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
            onClick={() => setIsFilterOpen(false)}
          />
        )}

        {/* Mobile Filter Sidebar */}
        <div
          className={`md:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
            isFilterOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
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
              onClick={() => setIsFilterOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <FiltersPanel
              products={products}
              locations={locations}
              additionalFilters={categoryData?.filters ?? []}
              selectedLocations={filters.locations}
              setSelectedLocations={actions.setLocations}
              selectedLocationLga={filters.locationLga}
              setSelectedLocationLga={actions.setLocationLga}
              selectedFilters={filters.attributes}
              setSelectedFilters={actions.setAttributes}
              onPriceChange={actions.setPriceRange}
              hasActiveFilters={hasActiveFilters}
              onClearAll={actions.clearAll}
            />
          </div>

          <div className="sticky bottom-0 bg-white border-t p-4">
            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="hidden md:block col-span-1 space-y-4">
            <FiltersPanel
              products={products}
              locations={locations}
              additionalFilters={categoryData?.filters ?? []}
              selectedLocations={filters.locations}
              setSelectedLocations={actions.setLocations}
              selectedLocationLga={filters.locationLga}
              setSelectedLocationLga={actions.setLocationLga}
              selectedFilters={filters.attributes}
              setSelectedFilters={actions.setAttributes}
              onPriceChange={actions.setPriceRange}
              hasActiveFilters={hasActiveFilters}
              onClearAll={actions.clearAll}
            />
          </div>

          <div className="col-span-1 md:col-span-3">
            {productsLoading ? (
              <ProductCardSkeletonGrid count={12} />
            ) : (
              <div className="relative">
                {productsFetching && (
                  <div className="absolute inset-0 bg-white/60 rounded-2xl z-10 flex items-center justify-center">
                    <div className="w-8 h-8 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                {products.length === 0 ? (
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
                  <div className={productsFetching ? "opacity-50 pointer-events-none" : ""}>
                    <ProductsGrid products={products} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

DynamicCategories.getLayout = (page: React.ReactNode) => (
  <MarketPlaceLayout>{page}</MarketPlaceLayout>
);

export default DynamicCategories;
