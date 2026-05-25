import WishlistService from "@/services/wishlist.service";
import { useWishlistStore } from "@/store/slices/cart.slice";
import { useAuthStore } from "@/store/slices/auth.slice";
import { Product } from "@/types/prisma-schema-types";
import { WishlistItemResponse } from "@/types";

const getStores = () => ({
  ...useWishlistStore.getState(),
  ...useAuthStore.getState(),
});

export const addToWishlistAction = async (item: Product) => {
  const { addToWishlist, isAuthenticated } = getStores();
  addToWishlist(item);
  if (!isAuthenticated) return;
  try {
    await WishlistService.addToWishlist(item.id);
  } catch (err) {
    console.error("Failed to sync wishlist:", err);
  }
};

export const removeFromWishlistAction = async (productId: string) => {
  const { removeFromWishlist, isAuthenticated } = getStores();
  removeFromWishlist(productId);
  if (!isAuthenticated) return;
  try {
    await WishlistService.removeFromWishlist(productId);
  } catch (err) {
    console.error("Failed to remove wishlist item:", err);
  }
};

export const clearWishlistAction = async () => {
  const { clearWishlist, isAuthenticated } = getStores();
  clearWishlist();
  if (!isAuthenticated) return;
  try {
    await WishlistService.clearWishlist();
  } catch (err) {
    console.error("Failed to clear wishlist:", err);
  }
};

export const hydrateWishlistOnLoginAction = async () => {
  const { wishlist, clearWishlist, addToWishlist } =
    useWishlistStore.getState();

  // Fetch remote wishlist — new shape returns WishlistItemResponse[]
  const remoteData = await WishlistService.getWishlist();
  const remoteItems: WishlistItemResponse[] = remoteData?.wishlistItem ?? [];

  // Build merged map — local Zustand store uses Product shape
  // Remote items may have no productId (deleted products) — skip those for Zustand
  const merged = new Map<string, Product>(wishlist.map((p) => [p.id, p]));

  remoteItems.forEach((item) => {
    // Only add to Zustand store if product still exists
    if (!item.productId || !item.isAvailable) return;
    if (!merged.has(item.productId)) {
      // Build a minimal Product shape from the snapshot for Zustand
      merged.set(item.productId, {
        id: item.productId,
        name: item.productTitle,
        imageUrl: item.productImage,
        pricePerUnit: item.livePrice,
        sku: item.productSku ?? "",
      } as Product);
    }
  });

  clearWishlist();
  merged.forEach((product) => addToWishlist(product));

  // Sync only valid productIds back to backend
  const validProductIds = Array.from(merged.keys());
  if (validProductIds.length) {
    await WishlistService.bulkSync(
      validProductIds.map((productId) => ({ productId })),
    );
  }
};
