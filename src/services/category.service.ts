import { ProductFilter } from "@/hooks/useProductFilter";
import api from "@/lib/axios-client";
import { buildProductFilterQuery } from "@/utils/buildProductFilterQuery";

const CategoryService = {
  getAllCategories: () => api.get("/api/category").then((r) => r.data),

  getCategoryById: (id: string) =>
    api.get(`/api/category/single/${id}`).then((r) => r.data),

  getCategoryBySlug: (slug: string) =>
    api.get(`/api/category/slug/${slug}`).then((r) => r.data),

  getAllSubCategories: () =>
    api.get("/api/category/subcategories").then((r) => r.data),

  getSubCategoriesByCategoryId: (categoryId: string) =>
    api.get(`/api/category/subcategories/${categoryId}`).then((r) => r.data),

  getProductsBySubCategoryId: (subCategoryId: string) =>
    api
      .get(`/api/category/subcategory/products/${subCategoryId}`)
      .then((r) => r.data),

  getProductsByCategoryId: (categoryId: string, filters: ProductFilter) =>
    api
      .get(`/api/category/products/${categoryId}`, {
        params: buildProductFilterQuery(filters),
      })
      .then((r) => r.data),
};

export default CategoryService;
