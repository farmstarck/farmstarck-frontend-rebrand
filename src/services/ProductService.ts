import Api from "./api";

type AddToCartType = {
  productId: string;
  quantity: number;
};
type UpdateCartType = {
  productId: string;
  quantity: number;
};
type SyncUserCart = {
  items: AddToCartType[];
};

const Services = {
  getProducts() {
    return Api().get("product");
  },
  updateCart(credential: UpdateCartType) {
    return Api().patch(`cart/update`, credential);
  },
  removeFromCart(productId: string) {
    return Api().delete(`cart/remove/${productId}`);
  },
  clearCart() {
    return Api().delete("cart/clear");
  },
  syncUserCart(credential: SyncUserCart) {
    return Api().post("cart/sync", credential);
  },
};

export default Services;
