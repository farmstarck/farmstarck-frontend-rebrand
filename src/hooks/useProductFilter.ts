import { useState } from "react";

export interface ProductFilter {
  subcategoryId: string | undefined;
  sortBy: string | undefined;
  priceRange: { min: number; max: number } | undefined;
  locations: string[];
  attributes: string[];
  page: number;
  size: number;
}

export interface ProductFilterActions {
  setSubCategoryId: (id?: string) => void;
  setSortBy: (sort: string) => void;
  setPriceRange: (min: number, max: number) => void;
  setLocations: (locations: string[]) => void;
  setAttributes: (attributes: string[]) => void;
  setPage: (page: number) => void;
  clearAll: () => void;
}

export const useProductFilters = () => {
  const [filters, setFilters] = useState<ProductFilter>({
    subcategoryId: undefined,
    sortBy: undefined,
    priceRange: undefined as { min: number; max: number } | undefined,
    locations: [] as string[],
    attributes: [] as string[],
    page: 1,
    size: 10,
  });

  const actions = {
    setSubCategoryId: (id?: string) =>
      setFilters((f) => {
        const subcategoryId = id === f.subcategoryId ? undefined : id;
        return { ...f, subcategoryId, page: 1 };
      }),

    setSortBy: (sort: string) =>
      setFilters((f) => ({ ...f, sortBy: sort, page: 1 })),

    setPriceRange: (min: number, max: number) =>
      setFilters((f) => ({ ...f, priceRange: { min, max }, page: 1 })),

    setLocations: (locations: string[]) =>
      setFilters((f) => ({ ...f, locations, page: 1 })),

    setAttributes: (attributes: string[]) =>
      setFilters((f) => ({ ...f, attributes, page: 1 })),

    setPage: (page: number) => setFilters((f) => ({ ...f, page })),

    clearAll: () =>
      setFilters({
        subcategoryId: undefined,
        sortBy: undefined,
        priceRange: undefined,
        locations: [],
        attributes: [],
        page: 1,
        size: 10,
      }),
  };

  return { filters, actions };
};
