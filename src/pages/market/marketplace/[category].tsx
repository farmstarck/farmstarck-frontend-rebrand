import { IndependentFilter } from '@/components/common/MarketPlace/Categories/IndependentFilter';
import Navigation from '@/components/common/MarketPlace/Navigation';
import { PriceRangeFilter } from '@/components/common/MarketPlace/PriceRangeFilter';
import { LocationFilter } from '@/components/common/MarketPlace/LocationFilter';
import { ProductsGrid } from '@/components/common/MarketPlace/ProductGrid';
import { ProductsTopBar } from '@/components/common/MarketPlace/ProductsTopBar';
import { SlidersHorizontal, X } from 'lucide-react';

import {
    AllProducts,
    foodFilters,
    animalFeedFilters,
    agroChemicalsFilters,
    farmMachineryFilters
} from '@/data/ProductsData';

import MarketPlaceLayout from '@/layouts/MarketPlaceLayout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useMemo, useState, useEffect } from 'react';
import CategoriesImageFilters from '@/components/common/MarketPlace/Categories/CategoriesImageFilters';

const normalizeCategoryName = (name: string): string =>
    name.toLowerCase().replace(/[&\s-]+/g, '');

/* --- CATEGORY SLUG → CATEGORY NAME & TYPE --- */
const slugToCategoryMap: Record<string, { name: string; type: 'food' | 'agro' | 'animals' | 'farm' }> = {
    foods: { name: "Food", type: "food" },
    "animal-feeds": { name: "Animal Feed & Supplement", type: "animals" },
    "agro-chemicals": { name: "Agro Chemicals", type: "agro" },
    "machinery-and-equipments": { name: "Farm Machine & Equipment", type: "farm" },
};

/* --- CATEGORY → FILTERS MAP --- */
const filterMap: Record<string, any[]> = {
    food: foodFilters,
    animalfeedsupplement: animalFeedFilters,
    agrochemicals: agroChemicalsFilters,
    farmmachineequipment: farmMachineryFilters,
};

const DynamicCategories = () => {
    const router = useRouter();
    const { category } = router.query;

    const [sort, setSort] = useState("bulk");
    const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
    // In DynamicCategories.tsx, update the state initialization:
    const [selectedSubCategoryFromImage, setSelectedSubCategoryFromImage] =
        useState<{ slug: string; index?: number }>({
            slug: 'all',
            index: -1
        });
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const categorySlug = category as string;
    const categoryInfo = slugToCategoryMap[categorySlug];
    const categoryName = categoryInfo?.name.replace(/-/g, " ") || "";
    const categoryType = categoryInfo?.type || "food";
    const rawCategory = categoryInfo?.name || "";
    const normalizedCategoryKey = normalizeCategoryName(rawCategory);

    /* --- FILTER GROUPS FOR CATEGORY --- */
    const additionalFilters = filterMap[normalizedCategoryKey] || [];

    /* --- GET ALL PRODUCTS FOR THIS CATEGORY --- */
    const categoryProducts = useMemo(() => {
        return AllProducts.filter(p =>
            normalizeCategoryName(p.category || "") === normalizedCategoryKey
        );
    }, [normalizedCategoryKey]);

    /* --- EXTRACT UNIQUE LOCATIONS FROM CATEGORY PRODUCTS --- */
    const locations = useMemo(() => {
        const uniqueLocations = Array.from(
            new Set(categoryProducts.map(p => p.location).filter(Boolean))
        );
        return uniqueLocations.sort();
    }, [categoryProducts]);

    /* --- RESET FILTERS WHEN CATEGORY CHANGES --- */
    useEffect(() => {
        setSelectedSubCategories([]);
        setSelectedSubCategoryFromImage({ slug: '', index: -1 });
        setSelectedFilters([]);
        setSelectedLocations([]);
        setPriceRange(null);
    }, [normalizedCategoryKey]);

    /* --- APPLY PRICE FILTER --- */
    const applyPriceFilter = (min: number, max: number) => {
        setPriceRange({ min, max });
    };

    /* --- HANDLE SUBCATEGORY SELECTION FROM IMAGE FILTER --- */
    const handleSubCategoryItemSelect = (slug: string, name?: string, index?: number) => {
        if (selectedSubCategoryFromImage.slug === slug) {
            // Deselect if same category clicked
            setSelectedSubCategoryFromImage({ slug: '', index: -1 });
        } else {
            // Select new category
            setSelectedSubCategoryFromImage({
                slug,
                index: index !== undefined ? index : -1
            });
        }
    };

    /* --- MAIN FILTERING LOGIC --- */
    const finalList = useMemo(() => {
        let out = [...AllProducts];

        // Filter by main category
        out = out.filter(
            p => normalizeCategoryName(p.category || "") === normalizedCategoryKey
        );

        if (out.length === 0) return out;

        // Filter by subcategory from image selector
        if (selectedSubCategoryFromImage.slug && selectedSubCategoryFromImage.slug !== 'all') {
            out = out.filter(p => {
                const productSubCat = p.subCategory?.toLowerCase().replace(/[\/\s]+/g, '-');
                return productSubCat === selectedSubCategoryFromImage.slug;
            });
        }

        // Price filter
        if (priceRange) {
            out = out.filter(p =>
                p.amount >= priceRange.min && p.amount <= priceRange.max
            );
        }

        // Location filter
        if (selectedLocations.length > 0) {
            out = out.filter(p => selectedLocations.includes(p.location || ""));
        }

        // Subcategories from filter
        if (selectedSubCategories.length > 0) {
            out = out.filter(p => selectedSubCategories.includes(p.subCategory || ""));
        }

        // Additional filters (brand, type, weight, discount etc.)
        if (selectedFilters.length > 0) {
            out = out.filter(product =>
                selectedFilters.some(filter =>
                    product.type === filter ||
                    product.quantityType === filter ||
                    product.brand === filter ||
                    product.weight === filter ||
                    product.volume === filter ||
                    product.condition === filter ||
                    (filter === "With Discount" && product.discount) ||
                    (filter === "Without Discount" && !product.discount)
                )
            );
        }

        // Sorting
        if (sort === "price_low") out.sort((a, b) => a.amount - b.amount);
        if (sort === "price_high") out.sort((a, b) => b.amount - a.amount);
        if (sort === "bulk") {
            out.sort((a, b) => {
                const aBulk = a.quantityType === "Bulk" ? 1 : 0;
                const bBulk = b.quantityType === "Bulk" ? 1 : 0;
                return bBulk - aBulk;
            });
        }

        return out;
    }, [
        selectedSubCategories,
        selectedSubCategoryFromImage,
        selectedFilters,
        selectedLocations,
        priceRange,
        sort,
        normalizedCategoryKey
    ]);

    const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
    const closeFilter = () => setIsFilterOpen(false);

    // Calculate total active filters
    const totalActiveFilters =
        selectedSubCategories.length +
        selectedFilters.length +
        selectedLocations.length +
        (priceRange ? 1 : 0) +
        (selectedSubCategoryFromImage.slug ? 1 : 0);
    const hasActiveFilters = totalActiveFilters > 0;

    // Clear all filters
    const clearAllFilters = () => {
        setSelectedSubCategories([]);
        setSelectedSubCategoryFromImage({ slug: '', index: -1 });
        setSelectedFilters([]);
        setSelectedLocations([]);
        setPriceRange(null);
    };

    // Filter Content Component
    const FilterContent = () => (
        <>
            <PriceRangeFilter
                products={categoryProducts}
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
                    onClick={clearAllFilters}
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

            {/* Location Filter */}
            {locations.length > 0 && (
                <LocationFilter
                    locations={locations}
                    selected={selectedLocations}
                    setSelected={setSelectedLocations}
                />
            )}

            {/* Additional Filters */}
            {additionalFilters.length > 0 && (
                <IndependentFilter
                    categoryGroups={additionalFilters}
                    selected={selectedFilters}
                    setSelected={setSelectedFilters}
                />
            )}
        </>
    );

    return (
        <div className="w-full py-5 relative bg-lite min-h-screen">
            <div className="w-11/12 lg:max-w-7xl mx-auto">
                <Navigation
                    routes={[
                        { name: categoryName, href: `/market/marketplace/${category}` }
                    ]}
                />

                <div className="my-6 text-2xl font-extrabold capitalize text-dark-green">
                    {categoryName}
                </div>

                {categoryProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No products available in this category yet.</p>
                    </div>
                ) : (
                    <>
                        {/* Category Image Filter */}
                        <CategoriesImageFilters
                            name={categoryType}
                            onCategorySelect={handleSubCategoryItemSelect}
                            selectedCategory={selectedSubCategoryFromImage}
                        />

                        <ProductsTopBar
                            total={finalList.length}
                            sort={sort}
                            setSort={setSort}
                        />

                        {/* Mobile Filter Button */}
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

                            <div className="p-4 space-y-4">
                                <FilterContent />
                            </div>

                            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
                                <button
                                    onClick={closeFilter}
                                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* Desktop Filters */}
                            <div className="hidden md:block col-span-1 space-y-4">
                                <FilterContent />
                            </div>

                            {/* Products Area */}
                            <div className="col-span-1 md:col-span-3">
                                {finalList.length === 0 ? (
                                    <div className='w-full text-center flex flex-col items-center'>
                                        <div className="w-32 lg:w-52 lg:h-52 h-32 relative">
                                            <Image
                                                src="/assets/images/marketplaces/notfound.png"
                                                alt="not found"
                                                fill
                                                className='object-contain'
                                            />
                                        </div>
                                        <p className='font-semibold text-primary text-lg'>Not Found</p>
                                        <p className='text-sm text-gray-500 max-w-xs mt-2'>
                                            No product(s) match your filters. Try adjusting your selection.
                                        </p>
                                    </div>
                                ) : (
                                    <ProductsGrid url='/market/marketplace/product' products={finalList} />
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

DynamicCategories.getLayout = (page: React.ReactNode) => (
    <MarketPlaceLayout>{page}</MarketPlaceLayout>
);

export default DynamicCategories;