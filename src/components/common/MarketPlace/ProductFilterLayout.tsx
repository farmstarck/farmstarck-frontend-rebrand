import React, { useState, useMemo } from 'react';
import Navigation from '@/components/common/MarketPlace/Navigation';
import { PriceRangeFilter } from '@/components/common/MarketPlace/PriceRangeFilter';
import { ProductsTopBar } from '@/components/common/MarketPlace/ProductsTopBar';
import { ProductsGrid } from '@/components/common/MarketPlace/ProductGrid';
import { NavigationButtons } from '@/components/common/Navigation/NavigationButton';
import { SlidersHorizontal, X } from 'lucide-react';
import CategoriesImageFilters from './Categories/CategoriesImageFilters';
import { LocationFilter } from './LocationFilter';
import { IndependentFilter } from './Categories/IndependentFilter';

interface Route {
    name: string;
    href: string;
}

interface ProductFilterLayoutProps {
    title: string;
    routes: Route[];
    products: any[];
    productUrl?: string;
    showPagination?: boolean;
    children?: React.ReactNode;
    categoryType?: 'food' | 'agro' | 'animals' | 'farm' | 'all';
}

// General filters for "All Products" page
const generalFilters = [
    {
        groupName: "Quantity",
        items: ["Show All", "Bulk", "Unit"]
    },
    {
        groupName: "Count",
        items: ["Show All", "Pieces", "Dozen", "Kilogram", "Carton", "Bag", "Crate", "Each", "Basket", "Others"]
    },
    {
        groupName: "Discount",
        items: ["Show All", "With Discount", "Without Discount"]
    }
];

export const ProductFilterLayout: React.FC<ProductFilterLayoutProps> = ({
    title,
    routes,
    products,
    productUrl = '/market/marketplace/product',
    showPagination = true,
    children,
    categoryType = 'all'
}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sort, setSort] = useState("a-z");
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<{ slug: string; index?: number }>({
        slug: 'all', 
        index: -1
    });
    const [selectedGeneralFilters, setSelectedGeneralFilters] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);

    // Extract unique locations from products
    const locations = useMemo(() => {
        const uniqueLocations = Array.from(new Set(products.map(p => p.location).filter(Boolean)));
        return uniqueLocations.sort();
    }, [products]);

    const applyPriceFilter = (min: number, max: number) => {
        setPriceRange({ min, max });
    };

    const clearFilters = () => {
        setSelectedLocations([]);
        setSelectedCategory({ slug: '', index: -1 });
        setSelectedGeneralFilters([]);
        setPriceRange(null);
    };

    // Calculate active filters
    const totalActiveFilters = 
        selectedLocations.length + 
        selectedGeneralFilters.length +
        (priceRange ? 1 : 0) + 
        (selectedCategory.slug && selectedCategory.slug !== 'all' ? 1 : 0);
    const hasActiveFilters = totalActiveFilters > 0;

    // Filter products
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Apply price filter
        if (priceRange) {
            result = result.filter(p => p.amount >= priceRange.min && p.amount <= priceRange.max);
        }

        // Apply location filter
        if (selectedLocations.length > 0) {
            result = result.filter(p => selectedLocations.includes(p.location));
        }

        // Apply category filter from image selection
        if (selectedCategory.slug && selectedCategory.slug !== 'all') {
            result = result.filter(p => {
                const productSubCat = p.subCategory?.toLowerCase().replace(/[\/\s]+/g, '-');
                return productSubCat === selectedCategory.slug;
            });
        }

        // Apply general filters (Quantity, Count, Discount)
        if (selectedGeneralFilters.length > 0) {
            result = result.filter(product =>
                selectedGeneralFilters.some(filter => {
                    // Quantity filter
                    if (filter === "Bulk" || filter === "Unit") {
                        return product.quantityType === filter;
                    }
                    
                    // Count filter
                    if (["Pieces", "Dozen", "Kilogram", "Carton", "Bag", "Crate", "Each", "Basket", "Others"].includes(filter)) {
                        return product.size === filter;
                    }
                    
                    // Discount filter
                    if (filter === "With Discount") {
                        return product.discount;
                    }
                    if (filter === "Without Discount") {
                        return !product.discount;
                    }
                    
                    return false;
                })
            );
        }

        // Apply sorting
        if (sort === "a-z") {
            result.sort((a, b) => {
                const at = (a.title ?? "").toString().toLowerCase();
                const bt = (b.title ?? "").toString().toLowerCase();
                return at.localeCompare(bt);
            });
        }

        if (sort === "z-a") {
            result.sort((a, b) => {
                const at = (a.title ?? "").toString().toLowerCase();
                const bt = (b.title ?? "").toString().toLowerCase();
                return bt.localeCompare(at);
            });
        }

        if (sort === "price_low") result.sort((a, b) => a.amount - b.amount);
        if (sort === "price_high") result.sort((a, b) => b.amount - a.amount);

        return result;
    }, [products, priceRange, selectedLocations, selectedCategory, selectedGeneralFilters, sort]);

    const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
    const closeFilter = () => setIsFilterOpen(false);

    const handleCategorySelect = (slug: string, name?: string, index?: number) => {
        if (selectedCategory.slug === slug) {
            // Deselect if same category clicked
            setSelectedCategory({ slug: '', index: -1 });
        } else {
            // Select new category
            setSelectedCategory({ slug, index: index !== undefined ? index : -1 });
        }
    };

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

            <LocationFilter
                locations={locations}
                selected={selectedLocations}
                setSelected={setSelectedLocations}
            />

            {/* General Filters - Only show on "All Products" page */}
            {categoryType === 'all' && (
                <IndependentFilter
                    categoryGroups={generalFilters}
                    selected={selectedGeneralFilters}
                    setSelected={setSelectedGeneralFilters}
                />
            )}
        </>
    );

    return (
        <div className='w-full py-5 relative bg-lite min-h-screen'>
            <div className="w-11/12 lg:max-w-7xl mx-auto">
                {/* Breadcrumb Navigation */}
                <Navigation routes={routes} />

                {/* Page Title */}
                <div className="my-6 text-2xl font-extrabold text-dark-green">{title}</div>

                {/* Category Image Filters */}
                <CategoriesImageFilters
                    name={categoryType}
                    onCategorySelect={handleCategorySelect}
                    selectedCategory={selectedCategory}
                />

                {/* Top Bar with Sort & Count */}
                <ProductsTopBar
                    total={filteredProducts.length}
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
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center animate-pulse font-bold">
                            {totalActiveFilters}
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
                        <div>
                            <h3 className="text-lg font-bold text-dark-green">Filters</h3>
                            {hasActiveFilters && (
                                <p className="text-xs text-gray-500 mt-0.5">
                                    {totalActiveFilters} filter{totalActiveFilters !== 1 ? 's' : ''} applied
                                </p>
                            )}
                        </div>
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