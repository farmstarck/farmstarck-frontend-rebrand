import { useState } from "react";
import MarketPlaceLayout from "@/layouts/MarketPlaceLayout";
import Navigation from "@/components/common/MarketPlace/Navigation";
import {
  Plus,
  Minus,
  Trash2,
  AlertTriangle,
  XCircle,
  Package,
  ShoppingCart,
} from "lucide-react";
import { CartItem, useCartStore } from "@/store/slices/cart.slice";
import Link from "next/link";
import Image from "next/image";
import ConfirmationModal from "@/components/common/MarketPlace/ConfirmationModal";
import { useNavigate } from "@/hooks/useNavigate";
import { useAuthStore } from "@/store/slices/auth.slice";
import {
  clearCartAction,
  removeFromCartAction,
  updateCartQuantityAction,
} from "@/store/actions/cart.action";
import { Product, ShippingMethod } from "@/types/prisma-schema-types";
import { useQuery } from "@tanstack/react-query";
import { orderQueries } from "@/queries/order.queries";
import PaymentService from "@/services/payment.service";

const CartItems = () => {
  const { navigate } = useNavigate();
  const { cart } = useCartStore();
  const [showClearModal, setShowClearModal] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const checkoutPath = "/market/marketplace/cart/checkout";

  // ── Validate cart items against live stock ────────────────────
  const cartItems = cart.map((item: CartItem) => ({
    productId: item.id,
    quantity: item.cartQuantity || 1,
  }));

  const { data: validationResultData } = useQuery({
    ...orderQueries.validateCart(cartItems),
    enabled: cart.length > 0,
    refetchOnWindowFocus: true,
    staleTime: 30 * 1000,
  });

  const { data: orderFeeInfo } = useQuery({
    queryKey: ["order-fee-cart", cartItems],
    queryFn: () =>
      PaymentService.getOrderFeeInfo({
        items: cartItems,
        shippingMethod: ShippingMethod.store_pickup, // no shipping at cart stage
      }),
    enabled: cart.length > 0,
    select: (res: { data: { subtotal: number; serviceCharge: number; totalAmount: number } }) => res.data,
    staleTime: 30 * 1000,
  });

  const validationResult = validationResultData?.data;

  const getItemValidation = (productId: string) =>
    validationResult?.items?.find((i: { productId: string; status: string }) => i.productId === productId);

  const hasCartIssues = !!(validationResult && !validationResult.valid);

  // ── Quantity helpers ──────────────────────────────────────────
  const handleQuantityChange = (id: string, value: number) => {
    if (value < 1) return;
    updateCartQuantityAction(id, value);
  };

  // ── Totals ────────────────────────────────────────────────────
  const subtotal =
    orderFeeInfo?.subtotal ??
    cart.reduce(
      (total, item) => total + item.pricePerUnit * (item.cartQuantity || 1),
      0,
    );
  const serviceCharge = orderFeeInfo?.serviceCharge ?? 0;
  const total = subtotal + serviceCharge;

  const handleClearAll = () => {
    clearCartAction();
    setShowClearModal(false);
  };

  // ── Empty state ───────────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <div className="w-full py-5 bg-lite min-h-screen">
        <div className="w-11/12 lg:max-w-7xl mx-auto">
          <Navigation
            routes={[{ name: "Cart", href: "/market/marketplace/cart-items" }]}
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-6">
            My Cart
          </h1>
          <div className="flex w-full flex-col items-center bg-white max-w-4xl rounded-2xl mx-auto justify-center mb-20 py-20 shadow-sm">
            <Image
              src="/assets/images/cartimg.png"
              alt="Empty cart"
              height={200}
              width={200}
              className="mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              You have not added any item to your cart
            </p>
            <Link
              className="px-8 py-2.5 text-center text-white rounded-full bg-primary hover:opacity-90 transition-opacity font-semibold text-sm"
              href="/market/marketplace/allproducts"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full py-2 lg:py-5 bg-lite min-h-screen">
        <div className="w-11/12 lg:max-w-7xl mx-auto">
          <Navigation
            routes={[{ name: "Cart", href: "/market/marketplace/cart-items" }]}
          />

          <div className="flex items-center justify-between mb-6 mt-6">
            <h1 className="text-3xl font-bold text-gray-900">My Cart</h1>
            <span className="text-sm text-gray-500 font-medium">
              {cart.length} item{cart.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* ── Cart issues banner ──────────────────────────────── */}
          {hasCartIssues && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
              <AlertTriangle
                size={18}
                className="text-red-500 shrink-0 mt-0.5"
              />
              <div>
                <p className="font-semibold text-red-700 text-sm">
                  Some items in your cart need attention
                </p>
                <p className="text-xs text-red-500 mt-0.5">
                  Remove unavailable or out-of-stock items before proceeding to
                  checkout.
                </p>
              </div>
            </div>
          )}

          <div className="w-full flex flex-col lg:flex-row items-start gap-6 lg:gap-8 satoshi">
            {/* ── Cart Items ──────────────────────────────────────── */}
            <div className="w-full lg:flex-1">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Desktop table header */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 text-sm font-semibold text-gray-700 bg-litegreen">
                  <div className="col-span-2">Image</div>
                  <div className="col-span-3">Item</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-3">Quantity</div>
                  <div className="col-span-1">Subtotal</div>
                  <div className="col-span-1" />
                </div>

                <div className="flex flex-col">
                  {cart.map((item: CartItem) => {
                    const validation = getItemValidation(item.id);
                    const hasIssue =
                      validation && validation.status !== "available";

                    return (
                      <div
                        key={item.id}
                        className={`border-b border-b-gray-100 px-4 md:px-6 py-4 transition-opacity ${
                          hasIssue ? "opacity-80" : ""
                        }`}
                      >
                        {/* ── Issue banner per item ──────────────── */}
                        {hasIssue && (
                          <div className="flex items-center justify-between mb-3 px-3 py-2 bg-red-50 border border-red-100 rounded-xl">
                            <div className="flex items-center gap-2">
                              {validation.status === "unavailable" ? (
                                <XCircle
                                  size={13}
                                  className="text-red-500 shrink-0"
                                />
                              ) : (
                                <Package
                                  size={13}
                                  className="text-orange-500 shrink-0"
                                />
                              )}
                              <p
                                className={`text-xs font-semibold ${
                                  validation.status === "unavailable"
                                    ? "text-red-500"
                                    : "text-orange-500"
                                }`}
                              >
                                {validation.message}
                                {validation.status === "insufficient_stock" &&
                                  ` — you have ${item.cartQuantity || 1} in cart, only ${validation.availableQuantity} available`}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCartAction(item.id)}
                              className="text-xs font-semibold text-red-500 hover:text-red-700 underline shrink-0 ml-2 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        )}

                        {/* ── Mobile layout ──────────────────────── */}
                        <div className="md:hidden space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="relative w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                                <Image
                                  src={item.imageUrl}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                                {hasIssue && (
                                  <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                                    <XCircle
                                      size={18}
                                      className="text-red-600"
                                    />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold capitalize text-gray-900 text-sm leading-tight">
                                  {item.name}
                                </h3>
                                <div className="mt-1 w-fit flex capitalize items-center gap-1 bg-[#a5faa5] text-primary py-0.5 text-[10px] font-medium px-2 rounded-full">
                                  <Image
                                    width={6}
                                    height={6}
                                    src="/assets/images/marketplaces/productIcon.png"
                                    alt="icon"
                                  />
                                  {item.countType}
                                </div>
                                <p className="text-sm font-bold text-gray-900 mt-1">
                                  ₦{item.pricePerUnit?.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <button
                              className="text-red-500 hover:text-red-700 p-1 transition-colors"
                              onClick={() => removeFromCartAction(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex justify-between items-center">
                            {/* Quantity */}
                            <div className="flex items-center gap-2 border border-gray-200 rounded-full px-2 py-1 w-fit">
                              <button
                                className="w-6 h-6 flex items-center justify-center bg-dark-green rounded-full text-white disabled:opacity-40 transition-opacity"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    (item.cartQuantity || 1) - 1,
                                  )
                                }
                                disabled={(item.cartQuantity || 1) <= 1}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center font-semibold text-sm">
                                {item.cartQuantity || 1}
                              </span>
                              <button
                                className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-90"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    (item.cartQuantity || 1) + 1,
                                  )
                                }
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Subtotal */}
                            <div className="text-right">
                              <p className="text-xs text-gray-400">Subtotal</p>
                              <p className="font-bold text-gray-900 text-sm">
                                ₦
                                {(
                                  item.pricePerUnit * (item.cartQuantity || 1)
                                ).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* ── Desktop layout ─────────────────────── */}
                        <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                          {/* Image */}
                          <div className="col-span-2">
                            <div className="relative lg:w-24 lg:h-24 md:w-20 md:h-20 rounded-xl overflow-hidden bg-gray-100">
                              <Image
                                src={item.imageUrl}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                              {hasIssue && (
                                <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                                  <XCircle size={22} className="text-red-600" />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Info */}
                          <div className="col-span-3">
                            <h3 className="font-semibold capitalize text-gray-900 leading-tight">
                              {item.name}
                            </h3>
                            <div className="mt-1 w-fit capitalize flex items-center gap-1 bg-[#a5faa5] text-primary py-0.5 text-[10px] font-medium px-3 rounded-full">
                              <Image
                                width={8}
                                height={8}
                                src="/assets/images/marketplaces/productIcon.png"
                                alt="icon"
                              />
                              {item.countType}
                            </div>
                          </div>

                          {/* Price */}
                          <div className="col-span-2">
                            <p className="font-semibold text-gray-900">
                              ₦{item.pricePerUnit?.toLocaleString()}
                            </p>
                          </div>

                          {/* Quantity */}
                          <div className="col-span-3">
                            <div className="flex items-center gap-2 border border-gray-200 rounded-full w-fit px-2 py-1">
                              <button
                                className="w-6 h-6 flex items-center justify-center bg-dark-green rounded-full text-white disabled:opacity-40 transition-opacity"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    (item.cartQuantity || 1) - 1,
                                  )
                                }
                                disabled={(item.cartQuantity || 1) <= 1}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center font-semibold text-sm">
                                {item.cartQuantity || 1}
                              </span>
                              <button
                                className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    (item.cartQuantity || 1) + 1,
                                  )
                                }
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Subtotal */}
                          <div className="col-span-1">
                            <p className="font-semibold text-gray-900 text-sm">
                              ₦
                              {(
                                item.pricePerUnit * (item.cartQuantity || 1)
                              ).toLocaleString()}
                            </p>
                          </div>

                          {/* Remove */}
                          <div className="col-span-1 flex justify-end">
                            <button
                              className="text-red-500 hover:text-red-700 transition-colors p-1"
                              onClick={() => removeFromCartAction(item.id)}
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Clear all button */}
                <div className="px-4 md:px-6 my-4 flex justify-end">
                  <button
                    onClick={() => setShowClearModal(true)}
                    className="flex items-center gap-1.5 px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm font-semibold transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* ── Order Summary ───────────────────────────────────── */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-lg font-bold text-primary">
                    Order Summary
                  </h2>
                  <span className="text-sm text-green-600 font-semibold bg-litegreen px-2.5 py-0.5 rounded-full">
                    {cart.length} item{cart.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-gray-600">
                    <span className="text-sm">Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ₦{subtotal.toLocaleString()}
                    </span>
                  </div>

                  {/* ← Now shows real value from backend */}
                  <div className="flex justify-between text-gray-600">
                    <span className="text-sm">Service Charge</span>
                    <span className="font-semibold text-gray-900">
                      {serviceCharge > 0
                        ? `₦${serviceCharge.toLocaleString()}`
                        : "₦0.00"}
                    </span>
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-xs text-gray-400">
                      Delivery fee calculated at checkout
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-3 flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-xl text-primary">
                      ₦{total.toLocaleString()}
                    </span>
                  </div>
                </div>
                {/* Issues warning in summary */}
                {hasCartIssues && (
                  <div className="mb-3 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2">
                    <AlertTriangle
                      size={14}
                      className="text-red-500 shrink-0"
                    />
                    <p className="text-xs text-red-600 font-medium">
                      Remove unavailable items first
                    </p>
                  </div>
                )}

                <button
                  onClick={() => {
                    if (hasCartIssues) return;
                    if (isAuthenticated) {
                      navigate(checkoutPath);
                    } else {
                      localStorage.setItem("redirectAfterAuth", checkoutPath);
                      navigate("/signin");
                    }
                  }}
                  disabled={hasCartIssues}
                  className="w-full text-white rounded-full bg-primary py-3 font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} />
                  {hasCartIssues
                    ? "Fix items to continue"
                    : "Proceed to Checkout"}
                </button>

                <Link
                  href="/market/marketplace/allproducts"
                  className="mt-3 block text-center text-sm text-primary font-medium hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showClearModal}
        onConfirm={handleClearAll}
        closeModal={() => setShowClearModal(false)}
        confirm_text="Clear All"
      />
    </>
  );
};

CartItems.getLayout = (page: React.ReactNode) => (
  <MarketPlaceLayout>{page}</MarketPlaceLayout>
);

export default CartItems;
