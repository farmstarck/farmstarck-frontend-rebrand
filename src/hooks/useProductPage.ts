import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useProductFilters } from "@/hooks/useProductFilter";
import { categoryQueries } from "@/queries/category.queries";
import { Product, SubCategory } from "@/types/prisma-schema-types";
import { productQueries } from "@/queries/product.queries";

type ProductQueryFactory = (filters: any) => {
  queryKey: readonly unknown[];
  queryFn: () => Promise<any>;
};

export const useProductPage = (queryFactory: ProductQueryFactory) => {
  const { filters, actions } = useProductFilters();

  const { data: productsData } = useQuery({
    ...queryFactory(filters),
    select: (res: any) => ({
      products: res.data.data as Product[],
      totalPages: res.data.pagination.totalPages as number,
      currentPage: res.data.pagination.currentPage as number,
    }),
  });

  const { data: subCategories = [] } = useQuery({
    ...categoryQueries.subCategories(),
    select: (res: any) => res.data.data as SubCategory[],
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
    (filters.minRating ? 1 : 0);

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
  };
};
