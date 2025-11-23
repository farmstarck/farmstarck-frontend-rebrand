import { create } from "zustand";
import { persist } from "zustand/middleware";

// ======= Shared Item Interface =======
export interface CartItem {
  size: string;
  id: number;
  title: string;
  amountFrom: number;
  amountTo: number;
  quantity?: string;
  location: string;
  image: string;
}

// ======= Cart Store =======
interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => ({
          cart: [...state.cart, item],
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      clearCart: () =>
        set(() => ({
          cart: [],
        })),
    }),
    { name: "cart-storage" } 
  )
);

// ======= Wishlist Store =======
interface WishlistState {
  wishlist: CartItem[];
  addToWishlist: (item: CartItem) => void;
  removeFromWishlist: (id: number) => void;
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
    { name: "wishlist-storage" } 
  )
);
