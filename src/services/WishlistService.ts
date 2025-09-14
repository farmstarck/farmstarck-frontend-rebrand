import Api from "./api";

type AddToWishlistType = {
  productId: string;
};
type SyncUserWishlist = {
  items: AddToWishlistType[];
};

const Services = {
  toggleWishlist(productId: string) {
    return Api().post(`wishlist/toggle/${productId}`);
  },
  getWishlist() {
    return Api().get("wishlist");
  },
  clearWishlist() {
    return Api().delete("wishlist/clear");
  },
  syncUserWishlist(credential: SyncUserWishlist) {
    return Api().post("wishlist/sync", credential);
  },
};

export default Services;
