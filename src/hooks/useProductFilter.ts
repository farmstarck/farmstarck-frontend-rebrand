import { useState } from "react";

export interface ProductFilter {
  subcategoryId: string | undefined;
  sortBy: string | undefined;
  priceRange: { min: number; max: number } | undefined;
  locations: string[];
  attributes: string[];
  minRating: number | undefined;
  page: number;
  size: number;
}

export interface ProductFilterActions {
  setSubCategoryId: (id?: string) => void;
  setSortBy: (sort: string) => void;
  setPriceRange: (min: number, max: number) => void;
  setLocations: (locations: string[]) => void;
  setAttributes: (attributes: string[]) => void;
  setMinRating: (rating?: number) => void;
  setPage: (page: number) => void;
  clearAll: () => void;
}

export const useProductFilters = () => {
  const [filters, setFilters] = useState<ProductFilter>({
    subcategoryId: undefined,
    sortBy: undefined,
    priceRange: undefined,
    locations: [],
    attributes: [],
    minRating: undefined,
    page: 1,
    size: 20,
  });

  const actions = {
    setSubCategoryId: (id?: string) =>
      setFilters((f) => ({
        ...f,
        subcategoryId: id === f.subcategoryId ? undefined : id,
        page: 1,
      })),
    setSortBy: (sort: string) =>
      setFilters((f) => ({ ...f, sortBy: sort, page: 1 })),
    setPriceRange: (min: number, max: number) =>
      setFilters((f) => ({ ...f, priceRange: { min, max }, page: 1 })),
    setLocations: (locations: string[]) =>
      setFilters((f) => ({ ...f, locations, page: 1 })),
    setAttributes: (attributes: string[]) =>
      setFilters((f) => ({ ...f, attributes, page: 1 })),
    setMinRating: (
      rating?: number, // ← add
    ) => setFilters((f) => ({ ...f, minRating: rating, page: 1 })),
    setPage: (page: number) => setFilters((f) => ({ ...f, page })),
    clearAll: () =>
      setFilters({
        subcategoryId: undefined,
        sortBy: undefined,
        priceRange: undefined,
        locations: [],
        attributes: [],
        minRating: undefined, // ← add
        page: 1,
        size: 10,
      }),
  };

  return { filters, actions };
};
