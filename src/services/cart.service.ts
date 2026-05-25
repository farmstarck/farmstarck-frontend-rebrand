import api from "@/lib/axios-client";

export type AddToCartProps = { productId: string; quantity: number };
export type RemoveFromCartProps = { productId: string };
export type UpdateCartQuantityProps = { productId: string; quantity: number };
export type BulkSyncProps = { productId: string; quantity: number };

const CartService = {
  addToCart: (data: AddToCartProps) =>
    api.post("/api/cart/add", data).then((r) => r.data),

  getCart: () => api.get("/api/cart").then((r) => r.data),

  removeFromCart: (data: RemoveFromCartProps) =>
    api.delete(`/api/cart/remove/${data.productId}`).then((r) => r.data),

  updateCartQuantity: (data: UpdateCartQuantityProps) =>
    api.patch("/api/cart/update", data).then((r) => r.data),

  clearCart: () => api.delete("/api/cart/clear").then((r) => r.data),

  bulkSync: (data: BulkSyncProps[]) =>
    api.post("/api/cart/bulk-sync", data).then((r) => r.data),
};

export default CartService;
