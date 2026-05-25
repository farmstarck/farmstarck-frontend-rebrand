import CategoryService from "@/services/category.service";
import { ProductFilter } from "@/hooks/useProductFilter";

export const categoryQueries = {
  all: ["category"] as const,

  allCategories: () => ({
    queryKey: [...categoryQueries.all, "list"] as const,
    queryFn: CategoryService.getAllCategories,
  }),

  categoryById: (id: string) => ({
    queryKey: [...categoryQueries.all, id] as const,
    queryFn: () => CategoryService.getCategoryById(id),
  }),

  categoryBySlug: (slug: string) => ({
    queryKey: [...categoryQueries.all, "slug", slug] as const,
    queryFn: () => CategoryService.getCategoryBySlug(slug),
    enabled: !!slug,
  }),

  subCategories: () => ({
    queryKey: [...categoryQueries.all, "subcategories"] as const,
    queryFn: CategoryService.getAllSubCategories,
  }),

  subCategoriesByCategory: (categoryId: string) => ({
    queryKey: [...categoryQueries.all, "sub", categoryId] as const,
    queryFn: () => CategoryService.getSubCategoriesByCategoryId(categoryId),
    enabled: !!categoryId,
  }),

  productsByCategory: (categoryId: string, filters: ProductFilter) => ({
    queryKey: [
      ...categoryQueries.all,
      "products",
      categoryId,
      filters,
    ] as const,
    queryFn: () => CategoryService.getProductsByCategoryId(categoryId, filters),
    enabled: !!categoryId,
  }),

  productsBySubCategory: (subCategoryId: string) => ({
    queryKey: [...categoryQueries.all, "sub-products", subCategoryId] as const,
    queryFn: () => CategoryService.getProductsBySubCategoryId(subCategoryId),
    enabled: !!subCategoryId,
  }),
};
