import api from "@/lib/axios-client";
import { buildProductFilterQuery } from "@/utils/buildProductFilterQuery";
import { ProductFilter } from "@/hooks/useProductFilter";

const Services = {
  getAllProducts: async (filters: ProductFilter) => {
    const params = buildProductFilterQuery(filters);
    const response = await api.get(`/api/product`, {
      params,
    });
    return response.data;
  },
  getProductById: async (productId: string) => {
    const response = await api.get(`/api/product/single/${productId}`);
    return response.data;
  },
  getRelatedProducts: async (productId: string, filters: ProductFilter) => {
    const params = buildProductFilterQuery(filters);
    const response = await api.get(`/api/product/${productId}/related`, {
      params,
    });
    return response.data;
  },
  getBestSellingProducts: async (filters: ProductFilter) => {
    const params = buildProductFilterQuery(filters);
    const response = await api.get(`/api/product/best-selling`, {
      params,
    });
    return response.data;
  },
  getMostViewedProducts: async (filters: ProductFilter) => {
    const params = buildProductFilterQuery(filters);
    const response = await api.get(`/api/product/most-viewed`, {
      params,
    });
    return response.data;
  },
  getPopularProducts: async (filters: ProductFilter) => {
    const params = buildProductFilterQuery(filters);
    const response = await api.get(`/api/product/popular`, {
      params,
    });
    return response.data;
  },
  searchProducts: async (search: string) => {
    const response = await api.get(`/api/product/search`, {
      params: { q: search },
    });
    return response.data;
  },
};

export default Services;
