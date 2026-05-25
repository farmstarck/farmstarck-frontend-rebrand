import CartService from "@/services/cart.service";
import type {
  AddToCartProps,
  RemoveFromCartProps,
  UpdateCartQuantityProps,
  BulkSyncProps,
} from "@/services/cart.service";

export const cartQueries = {
  all: ["cart"] as const,
  getCart: () => ({
    queryKey: [...cartQueries.all] as const,
    queryFn: CartService.getCart,
  }),
};

export const cartMutations = {
  addToCart: () => ({ mutationFn: CartService.addToCart }),
  removeFromCart: () => ({ mutationFn: CartService.removeFromCart }),
  updateCartQuantity: () => ({ mutationFn: CartService.updateCartQuantity }),
  clearCart: () => ({ mutationFn: CartService.clearCart }),
  bulkSync: () => ({ mutationFn: CartService.bulkSync }),
};
