import { createContext, useContext } from "react";

type ShopContextValue = {
  updateCart: any;
  setUpdateCart: React.Dispatch<React.SetStateAction<any>>;
  updateWishlist: any;
  setUpdateWishList: React.Dispatch<React.SetStateAction<any>>;
  handleIncrementUnit: (productId: string) => void;
  handleDecrementUnit: (productId: string) => void;
  handleAddToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  handleToggleWishlist: (productId: string) => void;
  cartItems: any;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  clearCart: () => void;
  unit: number;
  cartProducts: any;
};

export const ShopContext = createContext<ShopContextValue | null>(null);

export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error(
      "useShopContext must be used within a ShopContext.Provider"
    );
  }
  return context;
};
