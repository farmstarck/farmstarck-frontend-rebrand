import { Product } from "@/types/prisma-schema-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem extends Product {
  cartQuantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  hydrateCart: (items: CartItem[]) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      // Add item — if it exists, increase quantity
      addToCart: (item) => {
        const cart = get().cart;
        const exists = cart.find((p) => p.id === item.id);

        if (exists) {
          return set({
            cart: cart.map((p) =>
              p.id === item.id ? { ...p, cartQuantity: p.cartQuantity + 1 } : p,
            ),
          });
        }

        set({
          cart: [...cart, { ...item, cartQuantity: 1 }],
        });
      },

      // Update quantity manually from UI
      updateQuantity: (id, cartQuantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, cartQuantity } : item,
          ),
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      clearCart: () =>
        set(() => ({
          cart: [],
        })),
      hydrateCart: (items) =>
        set(() => ({
          cart: items,
        })),
    }),
    { name: "cart-storage" },
  ),
);

// ======= Wishlist Store =======
interface WishlistState {
  wishlist: Product[];
  addToWishlist: (item: Product) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      wishlist: [],

      addToWishlist: (item) =>
        set((state) => {
          if (state.wishlist.find((i) => i.id === item.id)) return state; // prevent duplicates
          return { wishlist: [...state.wishlist, item] };
        }),

      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== id),
        })),

      clearWishlist: () =>
        set(() => ({
          wishlist: [],
        })),
    }),
    { name: "wishlist-storage" },
  ),
);
