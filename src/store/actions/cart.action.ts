import CartService from "@/services/cart.service";
import { Product } from "@/types/prisma-schema-types";
import { CartItem, useCartStore } from "@/store/slices/cart.slice";
import { useAuthStore } from "@/store/slices/auth.slice";
import { CartItem as CartItemType } from "@/types/prisma-schema-types";

interface NewCartItem extends CartItemType {
  cartQuantity: number;
}

/* ================= ADD TO CART ================= */
export const addToCartAction = async (item: Product) => {
  const { addToCart } = useCartStore.getState();
  const { isAuthenticated } = useAuthStore.getState();

  // Instant UI update
  addToCart(item);

  if (!isAuthenticated) return;
  // Background sync
  try {
    await CartService.addToCart({
      productId: item.id,
      quantity: 1,
    });
  } catch (err) {
    console.error("Failed to sync cart:", err);
    // optional: rollback / toast
  }
};

/* ================= UPDATE QUANTITY ================= */
export const updateCartQuantityAction = async (
  productId: string,
  quantity: number,
) => {
  const { updateQuantity } = useCartStore.getState();
  const { isAuthenticated } = useAuthStore.getState();

  updateQuantity(productId, quantity);

  if (!isAuthenticated) return;
  try {
    await CartService.updateCartQuantity({
      productId,
      quantity,
    });
  } catch (err) {
    console.error("Failed to update quantity:", err);
  }
};

/* ================= REMOVE ================= */
export const removeFromCartAction = async (productId: string) => {
  const { removeFromCart } = useCartStore.getState();
  const { isAuthenticated } = useAuthStore.getState();

  removeFromCart(productId);

  if (!isAuthenticated) return;
  try {
    await CartService.removeFromCart({
      productId,
    });
  } catch (err) {
    console.error("Failed to remove item:", err);
  }
};

/* ================= CLEAR ================= */
export const clearCartAction = async () => {
  const { clearCart } = useCartStore.getState();
  const { isAuthenticated } = useAuthStore.getState();

  clearCart();

  if (!isAuthenticated) return;
  try {
    await CartService.clearCart();
  } catch (err) {
    console.error("Failed to clear cart:", err);
  }
};

/* ================= HYDRATE ================= */
export const hydrateCartOnLoginAction = async () => {
  const { hydrateCart, cart } = useCartStore.getState();
  const { data: remoteCart } = await CartService.getCart(); // from DB

  const merged = new Map<string, CartItem>();

  // Local first
  cart.forEach((item) => {
    merged.set(item.id, item);
  });

  // Merge remote
  remoteCart?.cartItem?.forEach((item: CartItemType) => {
    const existing = merged.get(item?.product?.id);
    if (!existing || item.quantity > existing.cartQuantity) {
      merged.set(item.product.id, {
        ...item.product,
        cartQuantity: item.quantity,
      });
    }
  });

  const finalCart = Array.from(merged.values());

  hydrateCart(finalCart);

  // Sync merged result back to backend
  await CartService.bulkSync(
    finalCart.map((i) => ({
      productId: i.id,
      quantity: i.cartQuantity,
    })),
  );
};
