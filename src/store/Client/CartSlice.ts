import { productsProps } from "@/types/products";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem extends productsProps {
 cartQuantity: number
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: productsProps) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;
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
              p.id === item.id
                ? { ...p, cartQuantity: p.cartQuantity + 1 }
                : p
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
            item.id === id ? { ...item, cartQuantity } : item
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
    }),
    { name: "cart-storage" }
  )
);


// ======= Wishlist Store =======
interface WishlistState {
  wishlist: productsProps[];
  addToWishlist: (item: productsProps) => void;
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
