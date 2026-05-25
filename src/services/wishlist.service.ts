import api from "@/lib/axios-client";

const WishlistService = {
  getWishlist: () => api.get("/api/wishlist").then((r) => r.data.data),

  addToWishlist: (productId: string) =>
    api.post(`/api/wishlist/add/${productId}`).then((r) => r.data),

  removeFromWishlist: (productId: string) =>
    api.delete(`/api/wishlist/remove/${productId}`).then((r) => r.data),

  clearWishlist: () => api.delete("/api/wishlist/clear").then((r) => r.data),

  bulkSync: (data: { productId: string }[]) =>
    api.post("/api/wishlist/bulk-sync", data).then((r) => r.data),
};

export default WishlistService;
