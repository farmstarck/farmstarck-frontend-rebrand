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
import { MapPin, ShoppingCart, Heart, Star } from "lucide-react";
import {
  getEffectivePrice,
  hasDiscount,
  getDiscountPercentage,
} from "@/utils/pricing.utils";

const ProductCard = ({ product }: { product: Product }) => {
  const { cart } = useCartStore();
  const { wishlist } = useWishlistStore();
  const { navigate } = useNavigate();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);

  const addToCartFunction = (item: Product) => {
    const found = cart.find((it) => it.id === item.id);
    if (found) {
      removeFromCartAction(item.id);
      SuccessMessage("Item removed from cart");
    } else {
      addToCartAction(item);
      SuccessMessage("Item added to cart");
    }
  };

  const toggleWishlist = (item: Product) => {
    const found = wishlist.find((it) => it.id === item.id);
    if (found) {
      removeFromWishlistAction(item.id);
      SuccessMessage("Item removed from wishlist");
    } else {
      addToWishlistAction(item);
      SuccessMessage("Item added to wishlist");
    }
  };

  const inCart = cart.some((item) => item.id === product.id);
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  // ── Discount / price calculation ───────────────────────────────
  const discounted = hasDiscount(product);
  const discountPercent = getDiscountPercentage(product);
  const sellingPrice = getEffectivePrice(product); // what the buyer pays
  const originalPrice = product.pricePerUnit; // shown crossed-out when discount exists

  // ── Rating calculation ──────────────────────────────────────────
  const avgRating =
    product.ratingCount && product.ratingCount > 0
      ? product.ratingSum / product.ratingCount
      : 0;
  const hasRatings = product.ratingCount && product.ratingCount > 0;

  return (
    <div className="bg-white satoshi rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* ── Image ──────────────────────────────────────────────── */}
      <div
        onClick={() =>
          navigate(
            `/market/marketplace/product/${product.category?.name}/${product.id}`,
          )
        }
        className="relative w-full cursor-pointer"
      >
        <div className="relative h-36 sm:h-44 lg:h-48 w-full bg-gray-50">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Discount tag — top left */}
          {discounted && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">
              -{discountPercent}%
            </div>
          )}

          {/* Wishlist — top right */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 ${
              isWishlisted ? "bg-primary" : "bg-red-500"
            }`}
          >
            <Heart size={13} className="fill-white text-white" />
          </button>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div
        onClick={() =>
          navigate(
            `/market/marketplace/product/${product.category?.name}/${product.id}`,
          )
        }
        className="px-2.5 pt-2 pb-1 flex flex-col gap-0.5 cursor-pointer flex-1"
      >
        {/* Count type pill */}
        <div className="w-fit capitalize flex items-center gap-1 bg-litegreen text-primary py-0.5 text-[9px] sm:text-[10px] font-semibold px-2 rounded-full mb-0.5">
          <Image
            width={7}
            height={7}
            src="/assets/images/marketplaces/productIcon.png"
            alt="unit"
          />
          {product.countType}
        </div>

        {/* Name */}
        <h3 className="font-bold text-gray-900 text-xs sm:text-sm leading-tight line-clamp-2 capitalize">
          {product.name}
        </h3>

        {/* Price — show discounted price + strikethrough original */}
        <div className="flex items-baseline gap-1.5 flex-wrap">
          {/* Selling price — prominent */}
          <p className="text-primary font-extrabold text-sm sm:text-base leading-tight">
            {formatPrice(sellingPrice)}
          </p>
          {/* Original price — slashed */}
          {discounted && (
            <p className="text-gray-400 font-medium text-[10px] sm:text-xs line-through leading-tight">
              {formatPrice(originalPrice)}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-0.5 text-primary font-semibold text-[10px] sm:text-xs mt-0.5">
          <MapPin size={10} />
          <span className="capitalize truncate">
            {[product.locationLga, product.location]
              .filter(Boolean)
              .join(", ") || "—"}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-0.5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={10}
                className={
                  star <= Math.round(avgRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-none text-gray-400" // ← outlined when empty
                }
              />
            ))}
          </div>
          {hasRatings ? (
            <span className="text-[9px] sm:text-[10px] text-gray-500 font-bold">
              {product.ratingCount}{" "}
              {product.ratingCount > 1 ? "reviews" : "review"}
            </span>
          ) : (
            <span className="text-[9px] sm:text-[10px] text-gray-500 font-bold">
              No reviews
            </span>
          )}
        </div>
      </div>

      {/* ── Cart button ─────────────────────────────────────────── */}
      <div className="px-2.5 pb-3 pt-2">
        <hr className="border-gray-100 mb-2" />
        <button
          onClick={() => addToCartFunction(product)}
          className={`w-full text-xs sm:text-sm border rounded-xl py-2 sm:py-2.5 flex items-center justify-center gap-1.5 transition-all duration-200 font-semibold ${
            inCart
              ? "border-primary bg-primary text-white"
              : "border-primary text-primary hover:bg-primary hover:text-white"
          }`}
        >
          <ShoppingCart size={13} />
          {inCart ? "Remove" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
