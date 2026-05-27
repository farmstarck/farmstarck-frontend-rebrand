import React, { useMemo, useState } from "react";
import {
  Heart,
  ShoppingCart,
  MessageCircle,
  Minus,
  Plus,
  Star,
} from "lucide-react";
import { useRouter } from "next/router";
import Image from "next/image";
import MarketPlaceLayout from "@/layouts/MarketPlaceLayout";
import Navigation from "@/components/common/MarketPlace/Navigation";
import { useCartStore, useWishlistStore } from "@/store/slices/cart.slice";
import { buildWhatsappMessage, SuccessMessage } from "@/utils/PageUtils";
import ProductDetailSkeleton from "@/components/common/Skeletons/ProductDetailSkeleton";
import DeliveryAccordion from "@/components/common/MarketPlace/DeliveryAccordion";
import { ProductsGrid } from "@/components/common/MarketPlace/ProductGrid";
import { Product } from "@/types/prisma-schema-types";
import {
  addToCartAction,
  removeFromCartAction,
  updateCartQuantityAction,
} from "@/store/actions/cart.action";
import {
  removeFromWishlistAction,
  addToWishlistAction,
} from "@/store/actions/wishlist.action";
import { ProductFilter } from "@/hooks/useProductFilter";
import { useQueries } from "@tanstack/react-query";
import { productQueries } from "@/queries/product.queries";
import { getEffectivePrice, hasDiscount } from "@/utils/pricing.utils";

const RELATED_FILTER = { page: 1, size: 5 } as ProductFilter;

const ProductDetailPage = () => {
  const router = useRouter();
  const { id: productId } = router.query;
  const { cart } = useCartStore();
  const { wishlist } = useWishlistStore();
  const [selectedImage, setSelectedImage] = useState<string>("");

  // ── Queries ──────────────────────────────────────────────────────
  const [productQuery, relatedQuery] = useQueries({
    queries: [
      {
        ...productQueries.productById(productId as string),
        select: (res: { data: { data: Product } }) => res.data.data,
      },
      {
        ...productQueries.relatedProducts(productId as string, RELATED_FILTER),
        select: (res: { data: { data: Product[] } }) => res.data.data,
      },
    ],
  });

  const product = productQuery.data ?? null;
  const relatedProducts = relatedQuery.data ?? [];
  const loading = productQuery.isLoading || !router.isReady;

  // ── Derived state ────────────────────────────────────────────────

  // Set initial image once product loads
  const displayImage = selectedImage || product?.imageUrl || "";

  const cartQuantity = useMemo(() => {
    const found = cart.find((item) => item.id === productId);
    return found?.cartQuantity ?? 1;
  }, [cart, productId]);

  const isInCart = useMemo(
    () => cart.some((item) => item.id === productId),
    [cart, productId],
  );

  const isWishlisted = useMemo(
    () => wishlist.some((item) => item.id === productId),
    [wishlist, productId],
  );

  // ── Handlers ─────────────────────────────────────────────────────
  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    updateCartQuantityAction(productId as string, value);
  };

  const toggleCart = (item: Product) => {
    if (isInCart) {
      removeFromCartAction(item.id);
      SuccessMessage("Item removed from cart");
    } else {
      addToCartAction(item);
      SuccessMessage("Item added to cart");
    }
  };

  const toggleWishlist = (item: Product) => {
    if (isWishlisted) {
      removeFromWishlistAction(item.id);
      SuccessMessage("Item removed from wishlist");
    } else {
      addToWishlistAction(item);
      SuccessMessage("Item added to wishlist");
    }
  };

  const handleBuyViaWhatsapp = (item: Product) => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    if (!whatsappNumber) return;
    const message = encodeURIComponent(
      buildWhatsappMessage(item, cartQuantity),
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  const renderStars = (rating: number) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-300 text-gray-300"
        }
      />
    ));

  // ── Guards ───────────────────────────────────────────────────────
  if (loading) return <ProductDetailSkeleton />;

  if (!product) {
    return (
      <div className="min-h-screen bg-[#E8F5E9] py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="text-red-500" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Product Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                Sorry, we could not find the product you are looking for. It may
                have been removed or the ID is incorrect.
              </p>
              <button
                onClick={() => router.push("/market/marketplace")}
                className="bg-[#00C700] text-white px-6 py-3 rounded-lg hover:bg-[#00B000] transition-colors"
              >
                Back to Marketplace
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen satoshi bg-lite py-3 lg:py-5">
      <div className="lg:max-w-7xl mx-auto px-4">
        <div className="mb-5">
          <Navigation
            routes={[
              {
                name: product.category?.name || "",
                href: `/market/marketplace/${product.category?.name}`,
              },
              { name: product.name, href: "#" },
            ]}
          />
        </div>

        {/* Main Product Section */}
        <div className="rounded-lg p-1 lg:p-5 mb-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
            {/* Left - Images */}
            <div className="flex md:flex-row flex-col-reverse gap-4 md:gap-6 w-full">
              {/* Thumbnails */}
              <div className="flex md:flex-col flex-row gap-3 md:overflow-visible overflow-x-auto scrollbar-hide">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 overflow-hidden transition-all duration-300 flex-shrink-0 p-0.5 ${
                      displayImage === img
                        ? "border-primary bg-primary bg-opacity-10"
                        : "border-gray-200 hover:border-primary hover:bg-gray-50"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Product ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover rounded-md transition-transform duration-300 hover:scale-105"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1">
                <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 p-2 h-[300px] md:h-full">
                  <div className="relative h-full">
                    <Image
                      src={displayImage}
                      alt={product.name}
                      fill
                      className="object-contain rounded-lg"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                      isWishlisted
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    <Heart size={14} className="text-white fill-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right - Product Info */}
            <div>
              <h1 className="text-xl capitalize md:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-gray-500 mb-4">SKU: {product.sku}</p>

              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-2xl md:text-4xl font-bold text-[#00C700]">
                    ₦{getEffectivePrice(product).toLocaleString()}.00
                  </span>
                  {hasDiscount(product) && (
                    <span className="text-lg md:text-xl text-gray-400 line-through">
                      ₦{product.pricePerUnit.toLocaleString()}.00
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6 w-full">
                <div className="flex items-center justify-between w-full gap-2 bg-white rounded-lg p-1 lg:w-fit">
                  <button
                    onClick={() => handleQuantityChange(cartQuantity - 1)}
                    disabled={cartQuantity <= 1}
                    className="w-10 h-10 flex items-center justify-center bg-dark-green text-white rounded-md hover:bg-dark-green/90 disabled:opacity-50"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-16 text-center font-semibold">
                    {cartQuantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(cartQuantity + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-[#00C700] text-white rounded-md hover:bg-[#00B000]"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 w-full mb-6">
                <button
                  onClick={() => toggleCart(product)}
                  className={`py-3 md:py-4 text-sm border rounded-lg px-4 flex items-center justify-center w-full gap-2 transition-all duration-300 font-medium ${
                    isInCart
                      ? "border-primary bg-primary text-white"
                      : "border-primary text-primary hover:bg-primary bg-white hover:text-white"
                  }`}
                >
                  <ShoppingCart size={16} />
                  {isInCart ? "Remove" : "Add to Cart"}
                </button>
                <button
                  onClick={() => handleBuyViaWhatsapp(product)}
                  className="w-full bg-[#1B5E20] text-white py-3 md:py-4 rounded-lg font-semibold hover:bg-[#164418] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Buy via Whatsapp
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product & Seller Information */}
        {/* ── Description & Specs ─────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Product Details
          </h2>

          <div className="space-y-6">
            {/* Description */}
            {product.description && (
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {product.description}
                </p>
              </div>
            )}

            <hr className="border-gray-100" />

            {/* Key Info Grid */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
                Product Information
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "Category", value: product.category?.name },
                  { label: "Sub-Category", value: product.subcategory?.name },
                  { label: "Count Type", value: product.countType },
                  { label: "Quantity Type", value: product.quantityType },
                  { label: "Condition", value: product.condition },
                  { label: "Location", value: [product.locationLga, product.location].filter(Boolean).join(", ") || "—" },
                  product.brand && { label: "Brand", value: product.brand },
                  product.weightRange && {
                    label: "Weight Range",
                    value: product.weightRange,
                  },
                  product.volumeRange && {
                    label: "Volume Range",
                    value: product.volumeRange,
                  },
                  product.produceType && {
                    label: "Produce Type",
                    value: product.produceType,
                  },
                  product.expiryDate && {
                    label: "Expiry Date",
                    value: new Date(product.expiryDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      },
                    ),
                  },
                  product.quantityPerUnit && {
                    label: "Qty Per Unit",
                    value: `${product.quantityPerUnit} units`,
                  },
                ]
                  .filter((item): item is { label: string; value: string } => Boolean(item))
                  .map((item) => (
                    <div
                      key={item.label}
                      className="bg-gray-50 rounded-xl px-4 py-3"
                    >
                      <p className="text-xs text-gray-400 font-medium mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-800 capitalize">
                        {item.value ?? "—"}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Specifications — for machinery/equipment */}
            {product.specifications &&
              formatSpecifications(product.specifications).length > 0 && (
                <>
                  <hr className="border-gray-100" />
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
                      Specifications
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {formatSpecifications(product.specifications).map(
                        (spec, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 border border-primary/20 text-primary rounded-full text-xs font-semibold"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            {spec}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </>
              )}
          </div>
        </div>

        {/* ── Product & Seller Info ────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Seller Information
          </h2>
          <div className="flex items-start gap-4">
            {/* Seller avatar */}
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-primary font-bold text-lg">
                {product.seller?.fullName?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 capitalize">
                {product.seller?.fullName}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {renderStars(
                    product.ratingCount && product.ratingCount > 0
                      ? product.ratingSum / product.ratingCount
                      : 0,
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {product.ratingCount && product.ratingCount > 0
                    ? (product.ratingSum / product.ratingCount).toFixed(1)
                    : "0"}{" "}
                  ({product.reviews?.length ?? 0} review
                  {product.reviews?.length !== 1 ? "s" : ""})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Reviews ─────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Ratings & Reviews
            </h2>
            {product.reviews?.length > 0 && (
              <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-gray-900 text-sm">
                  {product.ratingCount && product.ratingCount > 0
                    ? (product.ratingSum / product.ratingCount).toFixed(1)
                    : "0"}
                </span>
                <span className="text-xs text-gray-400">
                  / 5 · {product.reviews.length} review
                  {product.reviews.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>

          {product.reviews?.length === 0 || !product.reviews ? (
            <div className="flex flex-col items-center py-10 gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Star size={20} className="text-gray-300" />
              </div>
              <p className="text-gray-500 font-semibold text-sm">
                No reviews yet
              </p>
              <p className="text-xs text-gray-400 text-center max-w-xs">
                Be the first to review this product after purchasing.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-100 pb-4 last:border-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-xs">
                          {review.author?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-semibold text-sm capitalize text-gray-800">
                        {review.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-xs text-gray-400">
                        {new Date(review.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-gray-600 text-sm leading-relaxed pl-10">
                      &quot;{review.comment}&quot;
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="my-10">
          <DeliveryAccordion />
        </div>

        <div className="mb-10 flex items-start w-full flex-col gap-4">
          <div className="text-lg font-semibold">You might also like</div>
          <div className="w-full gap-4">
            <ProductsGrid
              url="/market/marketplace/product"
              products={relatedProducts}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductDetailPage.getLayout = (page: React.ReactNode) => (
  <MarketPlaceLayout>{page}</MarketPlaceLayout>
);

export default ProductDetailPage;
