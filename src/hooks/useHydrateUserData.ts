import { hydrateCartOnLoginAction } from "@/store/actions/cart.action";
import { hydrateWishlistOnLoginAction } from "@/store/actions/wishlist.action";
import { useAuthStore } from "@/store/slices/auth.slice";
import { useEffect } from "react";

export const useHydrateUserData = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) return;

    hydrateCartOnLoginAction();
    hydrateWishlistOnLoginAction();
  }, [isAuthenticated]);
};
