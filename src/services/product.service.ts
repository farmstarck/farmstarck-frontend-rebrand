import api from "@/lib/axios-client";
import { buildProductFilterQuery } from "@/utils/buildProductFilterQuery";
import { ProductFilter } from "@/hooks/useProductFilter";

const ProductService = {
  getAllProducts: (filters: ProductFilter) => {
    const res = api
      .get("/api/product", { params: buildProductFilterQuery(filters) })
      .then((r) => {
        console.log(":::::::::CHECKERSSSS", r.data);

        return r.data;
      });

    return res;
  },

  getProductById: (productId: string) =>
    api.get(`/api/product/single/${productId}`).then((r) => r.data),

  getRelatedProducts: (productId: string, filters: ProductFilter) =>
    api
      .get(`/api/product/${productId}/related`, {
        params: buildProductFilterQuery(filters),
      })
      .then((r) => r.data),

  getBestSellingProducts: (filters: ProductFilter) =>
    api
      .get("/api/product/best-selling", {
        params: buildProductFilterQuery(filters),
      })
      .then((r) => r.data),

  getMostViewedProducts: (filters: ProductFilter) =>
    api
      .get("/api/product/most-viewed", {
        params: buildProductFilterQuery(filters),
      })
      .then((r) => r.data),

  getPopularProducts: (filters: ProductFilter) =>
    api
      .get("/api/product/popular", { params: buildProductFilterQuery(filters) })
      .then((r) => r.data),

  searchProducts: (search: string) =>
    api
      .get("/api/product/search", { params: { q: search } })
      .then((r) => r.data),

  createProduct: (data: FormData) =>
    api
      .post("/api/product", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data),

  updateProduct: (id: string, data: FormData) =>
    api
      .patch(`/api/product/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data),

  deleteProduct: (id: string) =>
    api.delete(`/api/product/seller/${id}`).then((r) => r.data),

  getSellerProducts: (params?: Record<string, unknown>) =>
    api.get("/api/product/seller", { params }).then((r) => r.data.data),

  getSellerProductById: (id: string) =>
    api.get(`/api/product/seller/single/${id}`).then((r) => r.data),

  toggleProductActive: (productId: string) =>
    api.patch(`/api/product/${productId}/toggle-active`).then((r) => r.data),
};

export default ProductService;
