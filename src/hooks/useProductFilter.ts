
import { productsProps } from '@/types/products';
import { useMemo, useState } from 'react';

export type SortOption = "bulk" | "price_low" | "price_high" | "newest" | "popular";


interface CategoryGroup {
    groupName: string;
    items: string[];
}

interface UseProductFilterProps {
    products: productsProps[];
    categoryGroups: CategoryGroup[];
}

export const useProductFilter = ({ products, categoryGroups }: UseProductFilterProps) => {
    const [sort, setSort] = useState<SortOption>("bulk");
    const [selectedCats, setSelectedCats] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);

    // Helper to determine main vs subcategories
    const getSelectedCategoriesAndSubcategories = () => {
        const mainCategories: string[] = [];
        const subCategories: string[] = [];

        selectedCats.forEach((selected) => {
            const isMainCategory = categoryGroups.some(group => group.groupName === selected);

            if (isMainCategory) {
                mainCategories.push(selected);
            } else {
                subCategories.push(selected);
            }
        });

        return { mainCategories, subCategories };
    };

    // Apply price filter
    const applyPriceFilter = (min: number, max: number) => {
        setPriceRange({ min, max });
    };

    // Clear all filters
    const clearFilters = () => {
        setSelectedCats([]);
        setPriceRange(null);
        setSort("bulk");
    };

    // Main filtering logic
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // 1. Apply price filter
        if (priceRange) {
            result = result.filter(
                (p) => p.amount >= priceRange.min && p.amount <= priceRange.max
            );
        }

        // 2. Apply category filter
        if (selectedCats.length) {
            const { mainCategories, subCategories } = getSelectedCategoriesAndSubcategories();

            result = result.filter((product) => {
                const mainCategoryMatch = mainCategories.includes(product.category || "");
                const subCategoryMatch = subCategories.includes(product.subCategory || "");
                return mainCategoryMatch || subCategoryMatch;
            });
        }

        // 3. Apply sorting
        if (sort === "price_low") {
            result.sort((a, b) => a.amount - b.amount);
        } else if (sort === "price_high") {
            result.sort((a, b) => b.amount - a.amount);
        }
        // Add more sort options as needed

        return result;
    }, [products, selectedCats, sort, priceRange]);

    return {
        // State
        sort,
        selectedCats,
        priceRange,
        filteredProducts,
        
        // Actions
        setSort,
        setSelectedCats,
        applyPriceFilter,
        clearFilters,
        
        // Computed
        hasActiveFilters: selectedCats.length > 0 || priceRange !== null,
        totalFiltered: filteredProducts.length,
    };
};