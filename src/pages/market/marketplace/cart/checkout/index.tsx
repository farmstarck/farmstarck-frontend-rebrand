import Navigation from "@/components/common/MarketPlace/Navigation";
import MarketPlaceLayout from "@/layouts/MarketPlaceLayout";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/slices/cart.slice";
import Image from "next/image";
import { useNavigate } from "@/hooks/useNavigate";
import { AlertTriangle, Package, Plus, XCircle } from "lucide-react";
import { BackDrop } from "@/components/common/BackDrop";
import AddOrEditAddressForm from "@/components/common/MarketPlace/Checkout/AddOrEditAddressForm";
import { ShippingMethod } from "@/types/prisma-schema-types";
import { useCheckoutStore } from "@/store/slices/checkout.slice";
import { useQuery } from "@tanstack/react-query";
import { addressQueries } from "@/queries/address.queries";
import { orderQueries } from "@/queries/order.queries";
import { removeFromCartAction } from "@/store/actions/cart.action";
import PaymentService from "@/services/payment.service";
import { useAuthStore } from "@/store/slices/auth.slice";
import { useRouter } from "next/router";
import { getEffectivePrice } from "@/utils/pricing.utils";

const CHECKOUT_PATH = "/market/marketplace/cart/checkout";

const Checkout = () => {
  const { cart } = useCartStore();
  const { selectedAddress, setUserSelectedAddress, setShipping, setItems } =
    useCheckoutStore();
  const { navigate } = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  // ── Auth guard — redirect unauthenticated users to sign in ──────
  useEffect(() => {
    if (!router.isReady) return;
    if (!isAuthenticated) {
      localStorage.setItem("redirectAfterAuth", CHECKOUT_PATH);
      router.replace("/signin");
    }
  }, [isAuthenticated, router.isReady]);

  const [deliveryMethod, setDeliveryMethod] = useState<"doorstep" | "pickup">(
    "doorstep",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Validate cart items on load
  const checkoutItems = cart.map((item) => ({
    productId: item.id,
    quantity: item.cartQuantity || 1,
  }));

  const { data: validationResultData, isLoading: isValidating } = useQuery({
    ...orderQueries.validateCart(checkoutItems),
    enabled: cart.length > 0,
    refetchOnWindowFocus: true,
    select: (res: {
      data: {
        valid: boolean;
        items: {
          productId: string;
          status: string;
          available: number;
          availableQuantity?: number;
          message?: string;
        }[];
      };
    }) => res.data,
  });

  const { data: orderFeeInfo } = useQuery({
    queryKey: ["order-fee", checkoutItems, deliveryMethod],
    queryFn: () =>
      PaymentService.getOrderFeeInfo({
        items: checkoutItems,
        shippingMethod:
          deliveryMethod === "doorstep"
            ? ShippingMethod.door_delivery
            : ShippingMethod.store_pickup,
      }),
    enabled: cart.length > 0,
    select: (res: {
      data: {
        subtotal?: number;
        shippingFee?: number;
        serviceCharge?: number;
        totalAmount?: number;
      };
    }) => res.data,
  });

  const validationResult = validationResultData;

  const hasCartIssues = validationResult && !validationResult.valid;

  const getItemValidation = (productId: string) =>
    validationResult?.items.find((i) => i.productId === productId);

  // ── Fetch default address (only if none selected yet) ────────────
  const { data: defaultAddress } = useQuery({
    ...addressQueries.defaultAddress(),
    select: (res) => res.data,
    enabled: !selectedAddress,
  });

  const addressToUse = selectedAddress ?? defaultAddress ?? null;

  // Sync default address into checkout store
  useEffect(() => {
    if (defaultAddress && !selectedAddress) {
      setUserSelectedAddress(defaultAddress);
    }
  }, [defaultAddress]);

  // Sync cart items into checkout store
  useEffect(() => {
    const checkoutItems = cart.map((item) => ({
      productId: item.id,
      quantity: item.cartQuantity || 1,
    }));
    setItems(checkoutItems);
  }, [cart]);

  // Sync shipping method into checkout store
  useEffect(() => {
    if (deliveryMethod === "doorstep") {
      setShipping(ShippingMethod.door_delivery, 7500);
    } else {
      setShipping(ShippingMethod.store_pickup, 0);
    }
  }, [deliveryMethod]);

  // ── Totals ───────────────────────────────────────────────────────
  const subtotal =
    orderFeeInfo?.subtotal ??
    cart.reduce(
      (sum, item) => sum + getEffectivePrice(item) * (item.cartQuantity || 1),
      0,
    );
  const shippingFee =
    orderFeeInfo?.shippingFee ?? (deliveryMethod === "doorstep" ? 7500 : 0);
  const serviceCharge = orderFeeInfo?.serviceCharge ?? 0;
  const estimatedTotal =
    orderFeeInfo?.totalAmount ?? subtotal + shippingFee + serviceCharge;
  return (
    <div className="w-full py-5 satoshi bg-lite min-h-screen">
      <div className="w-11/12 lg:max-w-7xl mx-auto">
        <Navigation
          routes={[
            { name: "Cart", href: "/market/marketplace/cart-items" },
            { name: "Checkout", href: "/market/marketplace/cart/checkout" },
          ]}
          forward={true}
        />

        <div className="my-6 text-2xl font-extrabold">Checkout</div>

        {/* ── Cart issues banner ──────────────────────────── */}
        {hasCartIssues && (
          <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
            <AlertTriangle size={20} className="text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-700 text-sm">
                Some items in your cart have issues
              </p>
              <p className="text-xs text-red-500 mt-0.5">
                Please review and remove unavailable items before proceeding to
                payment.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-5 order-2 lg:order-1">
            {/* Delivery Method */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-dark-green mb-4">
                Choose a preferred way you would love to get your order
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Doorstep */}
                <button
                  onClick={() => setDeliveryMethod("doorstep")}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                    deliveryMethod === "doorstep"
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                        deliveryMethod === "doorstep"
                          ? "border-primary"
                          : "border-gray-300"
                      }`}
                    >
                      {deliveryMethod === "doorstep" && (
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      )}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-dark-green mb-1">
                        Doorstep Delivery
                      </div>
                      <div className="text-xs text-gray-600">
                        Get your order delivered to a specific location of
                        choice
                      </div>
                    </div>
                  </div>
                </button>

                {/* Pickup */}
                <button
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                    deliveryMethod === "pickup"
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                        deliveryMethod === "pickup"
                          ? "border-primary"
                          : "border-gray-300"
                      }`}
                    >
                      {deliveryMethod === "pickup" && (
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      )}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="font-bold text-dark-green">
                          Store Pickup
                        </div>
                        <span className="px-2 py-0.5 text-xs bg-litegreen text-primary rounded-full font-medium">
                          Free Delivery
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        Pickup your order directly from our store
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Address Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-dark-green">
                  Address Details
                </h3>
                {addressToUse && (
                  <button
                    className="text-primary text-sm font-medium"
                    onClick={() =>
                      navigate("/market/marketplace/cart/checkout/addresses")
                    }
                  >
                    Change Address
                  </button>
                )}
              </div>

              {addressToUse ? (
                <div className="space-y-2">
                  <h3 className="font-medium capitalize">
                    {addressToUse.recipientName}
                  </h3>
                  <p className="text-sm capitalize font-medium text-gray-600">
                    {addressToUse.street}, {addressToUse.city},{" "}
                    {addressToUse.state}, {addressToUse.country}
                  </p>
                  <p className="text-sm text-gray-600">
                    {addressToUse.phoneNumber}
                  </p>
                </div>
              ) : (
                <button
                  className="flex justify-center items-center cursor-pointer w-full py-2 text-center text-primary font-medium"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Plus size={20} />
                  <p className="ml-2">Add Address Details</p>
                </button>
              )}
            </div>

            {hasCartIssues && (
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-3">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <XCircle size={18} className="text-red-500" />
                  Items needing attention
                </h3>
                {validationResult.items
                  .filter(
                    (v: {
                      productId: string;
                      status: string;
                      available: number;
                      availableQuantity?: number;
                      message?: string;
                    }) => v.status !== "available",
                  )
                  .map(
                    (v: {
                      productId: string;
                      status: string;
                      available: number;
                      availableQuantity?: number;
                      message?: string;
                    }) => {
                      const cartItem = cart.find((c) => c.id === v.productId);
                      return (
                        <div
                          key={v.productId}
                          className="flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-xl"
                        >
                          {cartItem?.imageUrl && (
                            <img
                              src={cartItem.imageUrl}
                              alt={cartItem.name}
                              className="w-12 h-12 rounded-lg object-cover shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {cartItem?.name ?? "Unknown product"}
                            </p>
                            <div className="flex items-center gap-1 mt-0.5">
                              {v.status === "unavailable" ? (
                                <XCircle size={12} className="text-red-500" />
                              ) : (
                                <Package
                                  size={12}
                                  className="text-orange-500"
                                />
                              )}
                              <p
                                className={`text-xs font-medium ${
                                  v.status === "unavailable"
                                    ? "text-red-500"
                                    : "text-orange-500"
                                }`}
                              >
                                {v.message}
                              </p>
                            </div>
                            {v.status === "insufficient_stock" && (
                              <p className="text-xs text-gray-400 mt-0.5">
                                You have {cartItem?.cartQuantity} in cart — only{" "}
                                {v.availableQuantity} available
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCartAction(v.productId)}
                            className="shrink-0 px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      );
                    },
                  )}
              </div>
            )}

            {/* Proceed Button */}
            <button
              disabled={!addressToUse || hasCartIssues || isValidating}
              onClick={() =>
                navigate("/market/marketplace/cart/checkout/payment")
              }
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] disabled:bg-primary/50 disabled:cursor-not-allowed"
            >
              {isValidating
                ? "Checking items..."
                : hasCartIssues
                  ? "Remove unavailable items to continue"
                  : "Proceed to Payment"}
            </button>

            <BackDrop
              isOpen={isModalOpen}
              handleClose={() => setIsModalOpen(false)}
              title="Add New Address"
            >
              <AddOrEditAddressForm setIsModalOpen={setIsModalOpen} />
            </BackDrop>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-[#edffed] rounded-2xl p-6 border border-litegreen shadow-2xl sticky top-24">
              <h3 className="text-lg font-bold text-dark mb-4">
                Order Summary ({cart.length} Item(s))
              </h3>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => {
                  const validation = getItemValidation(item.id);
                  const hasIssue =
                    validation && validation.status !== "available";

                  return (
                    <div
                      key={item.id}
                      className={`flex gap-3 border-b py-3 ${
                        hasIssue
                          ? "border-b-red-100 opacity-60"
                          : "border-b-litegreen"
                      }`}
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                        {hasIssue && (
                          <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                            <XCircle size={20} className="text-red-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-dark truncate">
                          {item.name}
                        </h4>
                        {hasIssue ? (
                          <p className="text-xs text-red-500 font-medium mt-0.5">
                            {validation.message}
                          </p>
                        ) : (
                          <>
                            <p className="text-xs text-gray-500">
                              Qty: {item.cartQuantity || 1}
                            </p>
                          </>
                        )}
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-bold ${hasIssue ? "text-gray-400 line-through" : "text-dark"}`}
                        >
                          ₦{item.pricePerUnit.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping Fee</span>
                  <span className="font-semibold">
                    ₦{shippingFee.toLocaleString()}
                  </span>
                </div>
                {/* ← Add service charge row */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Charge</span>
                  <span className="font-semibold">
                    {serviceCharge > 0
                      ? `₦${serviceCharge.toLocaleString()}`
                      : "₦0.00"}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-t-litegreen p-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-dark">Estimated Total</span>
                  <span className="text-xl font-bold text-primary">
                    ₦{estimatedTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Checkout.getLayout = (page: React.ReactNode) => (
  <MarketPlaceLayout>{page}</MarketPlaceLayout>
);

export default Checkout;
