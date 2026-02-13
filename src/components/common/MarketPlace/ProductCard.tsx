import Image from "next/image";
import { useNavigate } from "@/hooks/useNavigate";
import {
  removeFromCartAction,
  addToCartAction,
} from "@/store/actions/cart.action";
import {
  removeFromWishlistAction,
  addToWishlistAction,
} from "@/store/actions/wishlist.action";
import { useCartStore, useWishlistStore } from "@/store/slices/cart.slice";
import { Product } from "@/types/prisma-schema-types";
import { SuccessMessage } from "@/utils/PageUtils";
import { MapPin, ShoppingCart, Heart } from "lucide-react";

const ProductCard = ({ product }: { product: Product }) => {
  const { cart } = useCartStore();
  const { wishlist } = useWishlistStore();
  const { navigate } = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Add/Remove from Cart
  const addToCartFunction = (item: Product) => {
    const foundItem = cart.find((it) => it.id === item.id);
    if (foundItem) {
      removeFromCartAction(item.id);
      SuccessMessage("Item removed from cart");
    } else {
      addToCartAction(item);
      SuccessMessage("Item added to cart");
    }
  };

  // Add/Remove from Wishlist (FIXED FUNCTION)
  const toggleWishlist = (item: Product) => {
    const foundWish = wishlist.find((it) => it.id === item.id);
    if (foundWish) {
      removeFromWishlistAction(item.id); // Fixed: was removeFromCart
      SuccessMessage("Item removed from wishlist");
    } else {
      addToWishlistAction(item); // Fixed: was addToCart
      SuccessMessage("Item added to wishlist");
    }
  };

  const idFound = cart.some((item) => item.id === product.id);
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <div className="bg-white satoshi pb-4 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full ">
      <div
        onClick={() =>
          navigate(
            `/market/marketplace/product/${product.category?.name}/${product.id}`,
          )
        }
        className="flex items-start cursor-pointer  flex-col "
      >
        {/* Image Container */}
        <div className="relative w-full h-44 sm:h-52 lg:h-40">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
        {/* Content */}
        <div className="px-2 pt-2 flex flex-col flex-grow relative">
          <div className="w-fit capitalize flex items-center gap-1 bg-[#a5faa5] text-primary py-1 text-[10px] font-medium px-3 rounded-full">
            <Image
              width={8}
              height={8}
              src="/assets/images/marketplaces/productIcon.png"
              alt="size image"
            />
            {product.countType}
          </div>
          <h3 className="font-semibold capitalize text-sm sm:text-base line-clamp-2 mt-1">
            {product.name}
          </h3>

          {/* Price */}
          <div className="text-[#00C700] font-bold text-sm sm:text-base mb-2">
            {formatPrice(product.pricePerUnit)}
          </div>

          {/* Location */}
          <div className="flex capitalize items-center gap-1 text-gray-500 text-xs sm:text-sm mb-4">
            <MapPin size={14} />
            <span>{product.location}</span>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto ">
        <hr className="mb-3 border-0.5  border-gray-300" />

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto">
          {/* ADD TO CART BUTTON */}
          <button
            onClick={() => addToCartFunction(product)}
            className={`flex-1 text-xs sm:text-sm border rounded-lg py-1.5 sm:py-2 px-2 sm:px-4 flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 font-medium ${
              idFound
                ? "border-primary bg-primary text-white"
                : "border-primary text-primary hover:bg-primary hover:text-white"
            }`}
          >
            <ShoppingCart size={14} />
            {idFound ? "Remove" : "Add"}
          </button>

          {/* WISHLIST BUTTON - FIXED STYLING */}
          <button
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              isWishlisted ? "bg-[#00C700] border-[#00C700]" : " bg-red-500"
            }`}
            onClick={() => toggleWishlist(product)}
          >
            <Heart
              size={14}
              className={`fill-white text-white transition-all`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
