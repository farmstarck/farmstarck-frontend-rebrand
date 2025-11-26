import { IndependentFilter } from '@/components/common/MarketPlace/Categories/IndependentFilter';
import Navigation from '@/components/common/MarketPlace/Navigation';
import { PriceRangeFilter } from '@/components/common/MarketPlace/PriceRangeFilter';
import { ProductsGrid } from '@/components/common/MarketPlace/ProductGrid';
import { ProductsTopBar } from '@/components/common/MarketPlace/ProductsTopBar';

import {
    AllProducts,
    categoryGroups,
    foodFilters,
    animalFeedFilters,
    agroChemicalsFilters,
    farmMachineryFilters
} from '@/data/ProductsData';

import MarketPlaceLayout from '@/layouts/MarketPlaceLayout';
import { useRouter } from 'next/router';
import React, { useMemo, useState, useEffect } from 'react';

const normalizeCategoryName = (name: string): string =>
    name.toLowerCase().replace(/[&\s-]+/g, '');

/* --- CATEGORY SLUG → CATEGORY NAME --- */
const slugToCategoryMap: Record<string, string> = {
    foods: "Food",
    "animal-feeds": "Animal Feed & Supplement",
    "agro-chemicals": "Agro Chemicals",
    "machinery-and-equipments": "Farm Machine & Equipment",
};

/* --- CATEGORY → FILTERS MAP (MATCHES NORMALIZED CATEGORY NAMES) --- */
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
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);

    const categoryName = category?.toString().replace(/-/g, " ") || "";
    const rawCategory = slugToCategoryMap[category as string] || "";

    // NORMALIZED KEY FOR LOOKUPS
    const normalizedCategoryKey = normalizeCategoryName(rawCategory);

    /* --- SUBCATEGORIES --- */
    const subCategoryFilters = useMemo(() => {
        const group = categoryGroups.find(
            g => normalizeCategoryName(g.groupName) === normalizedCategoryKey
        );
        return group
            ? [{ groupName: group.groupName, items: ["Show All", ...group.items] }]
            : [];
    }, [normalizedCategoryKey]);

    /* --- FILTER GROUPS FOR CATEGORY --- */
    const additionalFilters = filterMap[normalizedCategoryKey] || [];

    /* --- RESET FILTERS WHEN CATEGORY CHANGES --- */
    useEffect(() => {
        setSelectedSubCategories([]);
        setSelectedFilters([]);
        setPriceRange(null);
    }, [normalizedCategoryKey]);

    /* --- GET ALL PRODUCTS FOR THIS CATEGORY (USED BY PRICE FILTER) --- */
    const categoryProducts = useMemo(() => {
        return AllProducts.filter(p =>
            normalizeCategoryName(p.category || "") === normalizedCategoryKey
        );
    }, [normalizedCategoryKey]);

    /* --- APPLY PRICE FILTER TRIGGERED FROM SLIDER --- */
    const applyPriceFilter = (min: number, max: number) => {
        setPriceRange({ min, max });
    };

    /* --- MAIN FILTERING LOGIC --- */
    const finalList = useMemo(() => {
        let out = [...AllProducts];

        // Filter by category
        out = out.filter(
            p => normalizeCategoryName(p.category || "") === normalizedCategoryKey
        );

        if (out.length === 0) return out;

        // Price
        if (priceRange) {
            out = out.filter(p =>
                p.amountFrom >= priceRange.min && p.amountTo <= priceRange.max
            );
        }

        // Subcategories
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
        if (sort === "price_low") out.sort((a, b) => a.amountFrom - b.amountFrom);
        if (sort === "price_high") out.sort((a, b) => b.amountTo - a.amountTo);
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
        selectedFilters,
        priceRange,
        sort,
        normalizedCategoryKey
    ]);

    return (
        <div className="w-full py-5">
            <div className="w-11/12 lg:max-w-7xl mx-auto">

                <Navigation
                    routes={[
                        { name: categoryName, href: `/marketplace/${category}` }
                    ]}
                />

                <div className="my-6 text-2xl font-extrabold capitalize">
                    {categoryName}
                </div>

                {categoryProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No products available in this category yet.</p>
                        <p className="text-gray-400 text-sm mt-2">Looking for: {normalizedCategoryKey}</p>
                    </div>
                ) : (
                    <>
                        <ProductsTopBar
                            total={finalList.length}
                            sort={sort}
                            setSort={setSort}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                            {/* LEFT FILTERS */}
                            <div className="col-span-1 space-y-4">

                                <PriceRangeFilter
                                    products={categoryProducts}
                                    onFilter={applyPriceFilter}
                                />

                                {subCategoryFilters.length > 0 && (
                                    <IndependentFilter
                                        categoryGroups={subCategoryFilters}
                                        selected={selectedSubCategories}
                                        setSelected={setSelectedSubCategories}
                                    />
                                )}

                                {additionalFilters.length > 0 && (
                                    <IndependentFilter
                                        categoryGroups={additionalFilters}
                                        selected={selectedFilters}
                                        setSelected={setSelectedFilters}
                                    />
                                )}
                            </div>

                            {/* PRODUCTS AREA */}
                            <div className="col-span-3">
                                {finalList.length === 0 ? (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500">
                                            No products match your filters. Try adjusting your selection.
                                        </p>
                                    </div>
                                ) : (
                                    <ProductsGrid products={finalList} />
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
