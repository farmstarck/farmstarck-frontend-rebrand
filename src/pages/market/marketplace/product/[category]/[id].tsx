import React, { useState, useEffect } from "react";
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
import BaseLoader from "@/Loaders/BaseLoader";
import DeliveryAccordion from "@/components/common/MarketPlace/DeliveryAccordion";
import { ProductsGrid } from "@/components/common/MarketPlace/ProductGrid";
import ProductService from "@/services/product.service";
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

const ProductDetailPage = () => {
  const { cart } = useCartStore();
  const { wishlist } = useWishlistStore();
  const router = useRouter();
  const { id: productId } = router.query;
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    return cart.reduce(
      (acc, item) => {
        acc[item.id] = item.cartQuantity ?? 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  });
  const [quantity, setQuantity] = useState<number>(1);

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [relatedProducts, setRelatedProducts] = useState<Product[] | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fetch products
  useEffect(() => {
    if (!router.isReady) return;
    ProductService.getProductById(productId as string)
      .then((res) => {
        setProduct(res.data.data);
        setSelectedImage(res.data.data.imageUrl);
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    ProductService.getRelatedProducts(productId as string, {
      page: 1,
      limit: 5,
    })
      .then((res) => setRelatedProducts(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [router.isReady, productId]);

  useEffect(() => {
    if (!product) return;

    const foundInCart = cart.find((item) => item.id === productId);
    setIsInCart(!!foundInCart);

    const foundInWishlist = wishlist.find((item) => item.id === productId);
    setIsWishlisted(!!foundInWishlist);
  }, [cart, wishlist, product]);

  const handleQuantityChange = (id: string, value: number) => {
    if (value < 1) return;
    setQuantity(value);

    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));

    updateCartQuantityAction(id, value); // sync with backend / store
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-300 text-gray-300"
        }
      />
    ));
  };

  // Add/Remove from Cart
  const addToCartFunction = (item: Product) => {
    const foundItem = cart.find((it) => it.id === item.id);
    if (foundItem) {
      removeFromCartAction(item.id);
      SuccessMessage("Item removed from cart");
      setIsInCart(false);
    } else {
      addToCartAction(item);
      SuccessMessage("Item added to cart");
      setIsInCart(true);
    }
  };

  // Add/Remove from Wishlist
  const toggleWishlist = (item: Product) => {
    const foundWish = wishlist.find((it) => it.id === item.id);
    if (foundWish) {
      removeFromWishlistAction(item.id);
      SuccessMessage("Item removed from wishlist");
      setIsWishlisted(false);
    } else {
      addToWishlistAction(item);
      SuccessMessage("Item added to wishlist");
      setIsWishlisted(true);
    }
  };

  // Handle buy via whatsapp
  const handleBuyViaWhatsapp = (item: Product) => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    if (!whatsappNumber) return;
    const message = encodeURIComponent(buildWhatsappMessage(item, quantity));

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  // Loading state
  if (loading || !router.isReady) {
    return (
      <>
        <BaseLoader />
      </>
    );
  }

  // Product not found state
  if (!product) {
    return (
      <div className="min-h-screen bg-[#E8F5E9] py-6">
        <div className="max-w-7xl  mx-auto px-4">
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="text-red-500" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Product Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                Sorry, we couldn't find the product you're looking for. It may
                have been removed or the ID is incorrect.
              </p>
              <button
                onClick={() => router.push("/market/marketplace")}
                className="bg-[#00C700] text-white px-6 py-3 rounded-lg  hover:bg-[#00B000] transition-colors"
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
      <div className="lg:max-w-7xl  mx-auto px-4">
        <div className="mb-5">
          <Navigation
            routes={[
              {
                name: product?.category?.name || "",
                href: `/market/marketplace/${product?.category?.name}`,
              },
              { name: product.name, href: `#` },
            ]}
          />
        </div>

        {/* Main Product Section */}
        <div className="rounded-lg p-1 lg:p-5 mb-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
            {/* Left - Images */}
            <div className="flex  md:flex-row flex-col-reverse gap-4 md:gap-6 w-full">
              {/* Thumbnail Column */}
              <div className="flex md:flex-col flex-row gap-3 md:overflow-visible overflow-x-auto scrollbar-hide">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 overflow-hidden transition-all duration-300 flex-shrink-0 p-0.5 ${
                      selectedImage === img
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

              {/* Main Image Container */}
              <div className="flex-1">
                <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 p-2 h-[300px] md:h-full">
                  {/* Main Image */}
                  <div className="relative h-full">
                    <Image
                      src={selectedImage}
                      alt={product.name}
                      fill
                      className="object-contain rounded-lg"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Wishlist Button */}
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
                    ₦{product.pricePerUnit.toLocaleString()}.00
                  </span>
                  {product.discountPerUnit > 0 && (
                    <span className="text-lg md:text-xl text-gray-400 line-through">
                      ₦{product.discountPerUnit.toLocaleString()}.00
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6 w-full">
                <div className="flex items-center justify-between w-full gap-2 bg-white rounded-lg p-1 lg:w-fit">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        product.id,
                        (quantities[product.id] ?? 1) - 1,
                      )
                    }
                    disabled={(quantities[product.id] ?? 1) <= 1}
                    className="w-10 h-10 flex items-center justify-center bg-dark-green text-white rounded-md hover:bg-dark-green/90 disabled:opacity-50"
                  >
                    <Minus size={20} />
                  </button>

                  <span className="w-16 text-center font-semibold">
                    {quantities[product.id] ?? 1}
                  </span>

                  <button
                    onClick={() =>
                      handleQuantityChange(
                        product.id,
                        (quantities[product.id] ?? 1) + 1,
                      )
                    }
                    className="w-10 h-10 flex items-center justify-center bg-[#00C700] text-white rounded-md hover:bg-[#00B000]"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 w-full mb-6">
                <button
                  onClick={() => addToCartFunction(product)}
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
                  className="w-full bg-[#1B5E20] text-white py-3 md:py-4 rounded-lg font-semibold hover:bg-[#164418] transition-colors flex items-center justify-center gap-2"
                  onClick={() => handleBuyViaWhatsapp(product)}
                >
                  <MessageCircle size={20} />
                  Buy via Whatsapp
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information & Seller Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Product Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Product Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-semibold capitalize">
                  {product.category?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sub-Category:</span>
                <span className="font-semibold capitalize">
                  {product.subcategory?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Count:</span>
                <span className="font-semibold capitalize">
                  {product.countType}
                </span>
              </div>
            </div>
          </div>

          {/* Seller Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Seller Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Store Name:</span>
                <span className="font-semibold capitalize">
                  {product.seller.fullName}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ratings:</span>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(product.ratingSum)}</div>
                  <span className="text-sm text-gray-600">
                    {product.ratingSum} ({product?.reviews?.length} Reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Ratings & Reviews */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">Product Ratings & Reviews</h2>
          <div className="space-y-4">
            {product?.reviews?.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-200 pb-4 last:border-0"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-gray-700 mb-1">"{review.comment}"</p>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-sm capitalize">
                        {review.author}
                      </span>
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10">
          <DeliveryAccordion />
        </div>

        <div className="mb-10 flex items-start w-full flex-col gap-4">
          <div className="text-lg font-semibold">You might also like</div>
          <div className="w-full  gap-4">
            <ProductsGrid
              url="/market/marketplace/product"
              products={relatedProducts ?? []}
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
