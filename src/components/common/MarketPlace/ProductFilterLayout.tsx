// components/common/MarketPlace/ProductFilterLayout.tsx
import React, { useState } from 'react';
import Navigation from '@/components/common/MarketPlace/Navigation';
import { PriceRangeFilter } from '@/components/common/MarketPlace/PriceRangeFilter';
import { CategoryFilter } from '@/components/common/MarketPlace/CategoryFilter';
import { ProductsTopBar } from '@/components/common/MarketPlace/ProductsTopBar';
import { ProductsGrid } from '@/components/common/MarketPlace/ProductGrid';
import { NavigationButtons } from '@/components/common/Navigation/NavigationButton';
import { useProductFilter, SortOption } from '@/hooks/useProductFilter';
import { SlidersHorizontal, X } from 'lucide-react';

interface Route {
    name: string;
    href: string;
}

interface ProductFilterLayoutProps {
    title: string;
    routes: Route[];
    products: any[];
    categoryGroups: any[];
    productUrl?: string;
    showPagination?: boolean;
    children?: React.ReactNode;
}

export const ProductFilterLayout: React.FC<ProductFilterLayoutProps> = ({
    title,
    routes,
    products,
    categoryGroups,
    productUrl = '/market/marketplace/product',
    showPagination = true,
    children,
}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    const {
        sort,
        selectedCats,
        filteredProducts,
        setSort,
        setSelectedCats,
        applyPriceFilter,
        clearFilters,
        hasActiveFilters,
        totalFiltered,
    } = useProductFilter({ products, categoryGroups });

    const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
    const closeFilter = () => setIsFilterOpen(false);

    // Filter content component (reusable for both mobile and desktop)
    const FilterContent = () => (
        <>
            <PriceRangeFilter
                products={products}
                onFilter={applyPriceFilter}
            />
            
            {/* Clear Filters Button */}
            <div 
                className={`
                    overflow-hidden
                    transition-all duration-300 ease-in-out
                    ${hasActiveFilters 
                        ? 'max-h-20 opacity-100 translate-y-0' 
                        : 'max-h-0 opacity-0 -translate-y-2'
                    }
                `}
            >
                <button
                    onClick={clearFilters}
                    className="
                        w-full text-sm bg-primary text-white 
                        px-4 rounded-md py-2.5 
                        hover:bg-primary/90 
                        active:scale-95
                        transition-all duration-200
                        shadow-sm hover:shadow-md
                        font-medium
                    "
                >
                    Clear all filters
                </button>
            </div>

            <CategoryFilter
                categoryGroups={categoryGroups}
                selected={selectedCats}
                setSelected={setSelectedCats}
            />
        </>
    );

    return (
        <div className='w-full py-5 relative'>
            <div className="w-11/12 lg:max-w-7xl mx-auto">
                {/* Breadcrumb Navigation */}
                <Navigation routes={routes} />

                {/* Page Title */}
                <div className="my-6 text-2xl font-extrabold">{title}</div>

                {/* Top Bar with Sort & Count */}
                <ProductsTopBar
                    total={totalFiltered}
                    sort={sort}
                    setSort={setSort as (value: string) => void}
                />

                {/* Mobile Filter Button - Fixed Position */}
                <button
                    onClick={toggleFilter}
                    className="
                        md:hidden fixed bottom-6 left-6 z-40
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
                    <SlidersHorizontal 
                        className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" 
                    />
                    {hasActiveFilters && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center animate-pulse">
                            {selectedCats.length}
                        </span>
                    )}
                </button>

                {/* Mobile Filter Overlay */}
                {isFilterOpen && (
                    <div
                        className="md:hidden fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
                        onClick={closeFilter}
                    />
                )}

                {/* Mobile Filter Sidebar */}
                <div
                    className={`
                        md:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50
                        transform transition-transform duration-300 ease-in-out
                        overflow-y-auto
                        ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}
                    `}
                >
                    {/* Mobile Filter Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
                        <h3 className="text-lg font-bold text-dark-green">Filters</h3>
                        <button
                            onClick={closeFilter}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Close Filters"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Mobile Filter Content */}
                    <div className="p-4 space-y-4">
                        <FilterContent />
                    </div>

                    {/* Mobile Filter Footer */}
                    <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
                        <button
                            onClick={closeFilter}
                            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Desktop Left Sidebar - Filters */}
                    <div className="hidden md:block col-span-1 space-y-4">
                        <FilterContent />
                    </div>

                    {/* Right Side - Products Grid */}
                    <div className="col-span-1 md:col-span-3">
                        <div className="">
                            <ProductsGrid
                                url={productUrl}
                                products={filteredProducts}
                            />
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                {showPagination && (
                    <div className="my-5 w-full flex items-center justify-between">
                        <NavigationButtons />
                    </div>
                )}

                {/* Extra Content (e.g., CTA Banner) */}
                {children}
            </div>
        </div>
    );
};