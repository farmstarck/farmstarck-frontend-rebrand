import ProductService from "@/services/product.service";
import { ProductFilter } from "@/hooks/useProductFilter";

export const productQueries = {
  all: ["product"] as const,

  allProducts: (filters: ProductFilter) => ({
    queryKey: [...productQueries.all, "list", filters] as const,
    queryFn: () => ProductService.getAllProducts(filters),
  }),

  productById: (id: string) => ({
    queryKey: [...productQueries.all, id] as const,
    queryFn: () => ProductService.getProductById(id),
    enabled: !!id,
  }),

  relatedProducts: (id: string, filters: ProductFilter) => ({
    queryKey: [...productQueries.all, "related", id, filters] as const,
    queryFn: () => ProductService.getRelatedProducts(id, filters),
    enabled: !!id,
  }),

  bestSelling: (filters: ProductFilter) => ({
    queryKey: [...productQueries.all, "best-selling", filters] as const,
    queryFn: () => ProductService.getBestSellingProducts(filters),
  }),

  mostViewed: (filters: ProductFilter) => ({
    queryKey: [...productQueries.all, "most-viewed", filters] as const,
    queryFn: () => ProductService.getMostViewedProducts(filters),
  }),

  popular: (filters: ProductFilter) => ({
    queryKey: [...productQueries.all, "popular", filters] as const,
    queryFn: () => ProductService.getPopularProducts(filters),
  }),

  search: (query: string) => ({
    queryKey: [...productQueries.all, "search", query] as const,
    queryFn: () => ProductService.searchProducts(query),
    enabled: !!query,
  }),

  // SELLER QUERIES
  sellerProducts: (params?: any) => ({
    queryKey: [...productQueries.all, "seller-list", params] as const,
    queryFn: () => ProductService.getSellerProducts(params),
  }),

  sellerProductById: (id: string) => ({
    queryKey: [...productQueries.all, "seller-single", id] as const,
    queryFn: () => ProductService.getSellerProductById(id),
    enabled: !!id,
  }),

  toggleActive: () => ({
    mutationFn: (productId: string) =>
      ProductService.toggleProductActive(productId),
  }),
};

export const productMutations = {
  toggleActive: () => ({
    mutationFn: (productId: string) =>
      ProductService.toggleProductActive(productId),
  }),
};
