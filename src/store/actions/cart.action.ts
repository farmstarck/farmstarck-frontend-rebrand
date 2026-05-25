import CartService from "@/services/cart.service";
import { CartItem, useCartStore } from "@/store/slices/cart.slice";
import { useAuthStore } from "@/store/slices/auth.slice";
import { CartItem as CartItemType, Product } from "@/types/prisma-schema-types";

const getStores = () => ({
  ...useCartStore.getState(),
  ...useAuthStore.getState(),
});

export const addToCartAction = async (item: Product) => {
  const { addToCart, isAuthenticated } = getStores();
  addToCart(item);
  if (!isAuthenticated) return;
  try {
    await CartService.addToCart({ productId: item.id, quantity: 1 });
  } catch (err) {
    console.error("Failed to sync cart:", err);
  }
};

export const updateCartQuantityAction = async (
  productId: string,
  quantity: number,
) => {
  const { updateQuantity, isAuthenticated } = getStores();
  updateQuantity(productId, quantity);
  if (!isAuthenticated) return;
  try {
    await CartService.updateCartQuantity({ productId, quantity });
  } catch (err) {
    console.error("Failed to update quantity:", err);
  }
};

export const removeFromCartAction = async (productId: string) => {
  const { removeFromCart, isAuthenticated } = getStores();
  removeFromCart(productId);
  if (!isAuthenticated) return;
  try {
    await CartService.removeFromCart({ productId });
  } catch (err) {
    console.error("Failed to remove item:", err);
  }
};

export const clearCartAction = async () => {
  const { clearCart, isAuthenticated } = getStores();
  clearCart();
  if (!isAuthenticated) return;
  try {
    await CartService.clearCart();
  } catch (err) {
    console.error("Failed to clear cart:", err);
  }
};

export const hydrateCartOnLoginAction = async () => {
  const { cart, hydrateCart } = useCartStore.getState();
  const { data: remoteCart } = await CartService.getCart();

  const merged = new Map<string, CartItem>(cart.map((item) => [item.id, item]));

  remoteCart?.cartItem?.forEach((item: CartItemType) => {
    const existing = merged.get(item.product.id);
    if (!existing || item.quantity > existing.cartQuantity) {
      merged.set(item.product.id, {
        ...item.product,
        cartQuantity: item.quantity,
      });
    }
  });

  const finalCart = Array.from(merged.values());
  hydrateCart(finalCart);

  await CartService.bulkSync(
    finalCart.map((i) => ({ productId: i.id, quantity: i.cartQuantity })),
  );
};
