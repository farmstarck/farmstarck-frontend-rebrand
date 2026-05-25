// hooks/useBuyAgain.ts
import { useNavigate } from "@/hooks/useNavigate";
import { addToCartAction } from "@/store/actions/cart.action";
import { useAuthStore } from "@/store/slices/auth.slice";
import { OrderItem } from "@/types/prisma-schema-types";
import { SuccessMessage, ErrorMessage } from "@/utils/PageUtils";

export const useBuyAgain = () => {
  const { navigate } = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const buyAgain = async (item: OrderItem) => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }

    if (!item.productId) {
      ErrorMessage("This product is no longer available");
      return;
    }

    try {
      await addToCartAction({
        id: item.productId,
        name: item.productTitle,
        imageUrl: item.productImage ?? "",
        pricePerUnit: item.price,
        sku: item.productSku ?? "",
        stockQuantity: 1, // we don't know current stock here — backend validates
      } as any);

      SuccessMessage(`${item.productTitle} added to cart`);
      navigate("/market/marketplace/cart-items");
    } catch {
      ErrorMessage("Could not add item to cart");
    }
  };

  return { buyAgain };
};
