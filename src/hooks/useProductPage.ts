import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useProductFilters, ProductFilter } from "@/hooks/useProductFilter";
import { categoryQueries } from "@/queries/category.queries";
import { Product, SubCategory } from "@/types/prisma-schema-types";
import { productQueries } from "@/queries/product.queries";

type ProductApiResponse = {
  data: {
    data: Product[];
    pagination: { totalPages: number; currentPage: number };
  };
};

type ProductQueryFactory = (filters: ProductFilter) => {
  queryKey: readonly unknown[];
  queryFn: () => Promise<ProductApiResponse>;
};

export const useProductPage = (queryFactory: ProductQueryFactory) => {
  const { filters, actions } = useProductFilters();

  const { data: productsData, isLoading, isFetching } = useQuery({
    ...queryFactory(filters),
    select: (res: ProductApiResponse) => ({
      products: res.data.data,
      totalPages: res.data.pagination.totalPages,
      currentPage: res.data.pagination.currentPage,
    }),
  });

  const { data: subCategories = [] } = useQuery({
    ...categoryQueries.subCategories(),
    select: (res: { data: { data: SubCategory[] } }) => res.data.data,
  });

  const locations = useMemo(() => {
    const seen = new Map<string, string>();
    (productsData?.products ?? []).forEach((p) => {
      if (!p.location) return;
      const trimmed = p.location.trim();
      const key = trimmed.toLowerCase(); // ← case-insensitive key
      if (!seen.has(key)) {
        seen.set(key, trimmed); // ← store original casing
      }
    });
    return [...seen.values()].sort();
  }, [productsData?.products]);

  const totalActiveFilters =
    filters.locations.length +
    filters.attributes.length +
    (filters.priceRange ? 1 : 0) +
    (filters.minRating ? 1 : 0) +
    (filters.locationLga ? 1 : 0);

  return {
    products: productsData?.products ?? [],
    totalPages: productsData?.totalPages ?? 1,
    currentPage: productsData?.currentPage ?? 1,
    subCategories,
    locations,
    filters,
    actions,
    hasActiveFilters: totalActiveFilters > 0,
    totalActiveFilters,
    isLoading,
    isFetching,
  };
};
