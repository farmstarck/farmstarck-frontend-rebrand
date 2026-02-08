import api from "@/lib/axios-client";
import { buildProductFilterQuery } from "@/utils/buildProductFilterQuery";

const Services = {
  getAllCategories: async () => {
    const response = await api.get("/api/category");
    return response.data;
  },

  getCategoryById: async (id: string) => {
    const response = await api.get(`/api/category/single/${id}`);
    return response.data;
  },

  getCategoryBySlug: async (slug: string) => {
    const response = await api.get(`/api/category/slug/${slug}`);
    return response.data;
  },

  getAllSubCategories: async () => {
    const response = await api.get(`/api/category/subcategories`);
    return response.data;
  },

  getSubCategoriesByCategoryId: async (categoryId: string) => {
    const response = await api.get(`/api/category/subcategories/${categoryId}`);
    return response.data;
  },

  getProductsBySubCategoryId: async (subCategoryId: string) => {
    const response = await api.get(
      `/api/category/subcategory/products/${subCategoryId}`,
    );
    return response.data;
  },

  getProductsByCategoryId: async (categoryId: string, filters: any) => {
    const params = buildProductFilterQuery(filters);
    const response = await api.get(`/api/category/products/${categoryId}`, {
      params,
    });
    return response.data;
  },
};

export default Services;
