import { WishlistItemResponse } from "@/types";
import WishlistService from "@/services/wishlist.service";

export const wishlistQueries = {
  all: ["wishlist"] as const,

  getWishlist: () => ({
    queryKey: [...wishlistQueries.all, "list"] as const,
    queryFn: WishlistService.getWishlist,
    select: (res: any) => res.wishlistItem as WishlistItemResponse[],
  }),
};

export const wishlistMutations = {
  addToWishlist: () => ({
    mutationFn: (productId: string) => WishlistService.addToWishlist(productId),
  }),
  removeFromWishlist: () => ({
    mutationFn: (productId: string) =>
      WishlistService.removeFromWishlist(productId),
  }),
  clearWishlist: () => ({
    mutationFn: () => WishlistService.clearWishlist(),
  }),
};
