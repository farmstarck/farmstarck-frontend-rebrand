import api from "@/lib/axios-client";

type AddToWishlistProps = {
  productId: string;
};

type RemoveFromWishlistProps = {
  productId: string;
};

const Services = {
  addToWishlist: async (data: AddToWishlistProps) => {
    const response = await api.post(`/api/wishlist/add/${data.productId}`);
    return response.data;
  },
  getWishlist: async () => {
    const response = await api.get("/api/wishlist");
    return response.data;
  },
  removeFromWishlist: async (data: RemoveFromWishlistProps) => {
    const response = await api.delete(`/api/wishlist/remove/${data.productId}`);
    return response.data;
  },
  clearWishlist: async () => {
    const response = await api.delete(`/api/wishlist/clear`);
    return response.data;
  },
  bulkSync: async (data: { productId: string }[]) => {
    const response = await api.post(`/api/wishlist/bulk-sync`, data);
    return response.data;
  },
};

export default Services;
