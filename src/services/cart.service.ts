import api from "@/lib/axios-client";

type AddToCartProps = {
  productId: string;
  quantity: number;
};

type RemoveFromCartProps = {
  productId: string;
};

type UpdateCartQuantityProps = {
  productId: string;
  quantity: number;
};
type BulkSyncProps = {
  productId: string;
  quantity: number;
};

const Services = {
  addToCart: async (data: AddToCartProps) => {
    const response = await api.post("/api/cart/add", data);
    return response.data;
  },
  getCart: async () => {
    const response = await api.get("/api/cart");
    return response.data;
  },
  removeFromCart: async (data: RemoveFromCartProps) => {
    const response = await api.delete(`/api/cart/remove/${data.productId}`);
    return response.data;
  },
  updateCartQuantity: async (data: UpdateCartQuantityProps) => {
    const response = await api.patch(`/api/cart/update`, data);
    return response.data;
  },
  clearCart: async () => {
    const response = await api.delete(`/api/cart/clear`);
    return response.data;
  },
  bulkSync: async (data: BulkSyncProps[]) => {
    const response = await api.post(`/api/cart/bulk-sync`, data);
    return response.data;
  },
};

export default Services;
