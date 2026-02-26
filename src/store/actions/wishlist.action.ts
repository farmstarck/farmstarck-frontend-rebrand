import WishlistService from "@/services/wishlist.service";
import { Product, WishlistItem } from "@/types/prisma-schema-types";
import { useWishlistStore } from "@/store/slices/cart.slice";
import { useAuthStore } from "../slices/auth.slice";

/* ================= ADD TO WISHLIST ================= */
export const addToWishlistAction = async (item: Product) => {
  const { addToWishlist } = useWishlistStore.getState();
  const { isAuthenticated } = useAuthStore.getState();

  // Instant UI update
  addToWishlist(item);

  if (!isAuthenticated) return;
  // Background sync
  try {
    await WishlistService.addToWishlist({
      productId: item.id,
    });
  } catch (err) {
    console.error("Failed to sync wishlist:", err);
    // optional: rollback / toast
  }
};

/* ================= REMOVE ================= */
export const removeFromWishlistAction = async (productId: string) => {
  const { removeFromWishlist } = useWishlistStore.getState();
  const { isAuthenticated } = useAuthStore.getState();

  removeFromWishlist(productId);

  if (!isAuthenticated) return;
  try {
    await WishlistService.removeFromWishlist({
      productId,
    });
  } catch (err) {
    console.error("Failed to remove item:", err);
  }
};

/* ================= CLEAR ================= */
export const clearWishlistAction = async () => {
  const { clearWishlist } = useWishlistStore.getState();
  const { isAuthenticated } = useAuthStore.getState();

  clearWishlist();

  if (!isAuthenticated) return;
  try {
    await WishlistService.clearWishlist();
  } catch (err) {
    console.error("Failed to clear wishlist:", err);
  }
};

/* ================= HYDRATE ================= */

export const hydrateWishlistOnLoginAction = async () => {
  const { wishlist, clearWishlist, addToWishlist } =
    useWishlistStore.getState();

  const { data: remoteWishlist } = await WishlistService.getWishlist();

  const merged = new Map<string, Product>();

  // Local wishlist first
  wishlist.forEach((product) => {
    merged.set(product.id, product);
  });

  // Merge backend wishlist
  remoteWishlist?.wishlistItem?.forEach((item: WishlistItem) => {
    if (item.product) {
      merged.set(item.product.id, item.product);
    }
  });

  // Replace store in one go
  clearWishlist();
  merged.forEach((product) => addToWishlist(product));

  // Sync merged wishlist back to backend
  await WishlistService.bulkSync(
    Array.from(merged.keys()).map((productId) => ({ productId })),
  );
};
