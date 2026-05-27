import { useState } from "react";

export interface ProductFilter {
  subcategoryId: string | undefined;
  sortBy: string | undefined;
  priceRange: { min: number; max: number } | undefined;
  locations: string[];
  locationLga?: string;
  attributes: string[];
  minRating: number | undefined;
  page: number;
  size: number;
}

export interface ProductFilterActions {
  setSubCategoryId: (id?: string) => void;
  setSortBy: (sort: string) => void;
  setPriceRange: (min: number | undefined, max: number | undefined) => void;
  setLocations: (locations: string[]) => void;
  setLocationLga: (lga?: string) => void;
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
    locationLga: undefined,
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
    setPriceRange: (min: number | undefined, max: number | undefined) =>
      setFilters((f) => ({
        ...f,
        priceRange:
          min === undefined && max === undefined
            ? undefined
            : { min: min ?? 0, max: max ?? 500_000 },
        page: 1,
      })),
    setLocations: (locations: string[]) =>
      setFilters((f) => ({ ...f, locations, locationLga: undefined, page: 1 })),
    setLocationLga: (lga?: string) =>
      setFilters((f) => ({ ...f, locationLga: lga || undefined, page: 1 })),
    setAttributes: (attributes: string[]) =>
      setFilters((f) => ({ ...f, attributes, page: 1 })),
    setMinRating: (rating?: number) =>
      setFilters((f) => ({ ...f, minRating: rating, page: 1 })),
    setPage: (page: number) => setFilters((f) => ({ ...f, page })),
    clearAll: () =>
      setFilters({
        subcategoryId: undefined,
        sortBy: undefined,
        priceRange: undefined,
        locations: [],
        locationLga: undefined,
        attributes: [],
        minRating: undefined,
        page: 1,
        size: 10,
      }),
  };

  return { filters, actions };
};
