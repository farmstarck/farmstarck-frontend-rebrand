import Navigation from "@/components/common/MarketPlace/Navigation";
import MarketPlaceLayout from "@/layouts/MarketPlaceLayout";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/slices/cart.slice";
import Image from "next/image";
import { useNavigate } from "@/hooks/useNavigate";
import { useAuthStore } from "@/store/slices/auth.slice";
import { useRouter } from "next/router";
import { Plus } from "lucide-react";
import { BackDrop } from "@/components/common/BackDrop";
import AddOrEditAddressForm from "@/components/common/MarketPlace/Checkout/AddOrEditAddressForm";
import AddressService from "@/services/address.service";
import { Address, ShippingMethod } from "@/types/prisma-schema-types";
import { defaultInputRanges } from "react-date-range";
import { useCheckoutStore } from "@/store/slices/checkout.slice";

const Checkout = () => {
  const { cart } = useCartStore();
  const { selectedAddress, setUserSelectedAddress, setShipping, setItems } =
    useCheckoutStore();

  const { isAuthenticated, isLoading } = useAuthStore();
  const { navigate } = useNavigate();
  const router = useRouter();
  const [deliveryMethod, setDeliveryMethod] = useState<"doorstep" | "pickup">(
    "doorstep",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
  const [reload, setReload] = useState<number>(0);

  // Handle closing modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Fetch User Addresses
  useEffect(() => {
    if (selectedAddress) return;

    AddressService.getDefaultAddress()
      .then((res) => {
        setDefaultAddress(res.data);
        setUserSelectedAddress(res.data);
      })
      .catch(console.error);
  }, [reload, selectedAddress]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      localStorage.setItem("redirectAfterAuth", router.asPath);
      router.replace("/signin");
    }
  }, [isAuthenticated, isLoading]);

  useEffect(() => {
    const checkoutItems = cart.map((item) => ({
      productId: item.id,
      quantity: item.cartQuantity || 1,
    }));

    setItems(checkoutItems);
  }, [cart]);

  useEffect(() => {
    if (deliveryMethod === "doorstep") {
      setShipping(ShippingMethod.door_delivery, 7500);
    } else {
      setShipping(ShippingMethod.store_pickup, 0);
    }
  }, [deliveryMethod]);

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.pricePerUnit * (item.cartQuantity || 1),
    0,
  );
  const shippingFee = deliveryMethod === "doorstep" ? 7500 : 0;
  const vat = 0;
  const estimatedTotal = subtotal + shippingFee + vat;

  const addressToUse = selectedAddress || defaultAddress;

  useEffect(() => {
    if (addressToUse) {
      setUserSelectedAddress(addressToUse);
    }
  }, [addressToUse]);

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

        {/* Page Title */}
        <div className="my-6 text-2xl font-extrabold ">Checkout</div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - Delivery & Form */}
          <div className="lg:col-span-2 space-y-5 order-2 lg:order-1">
            {/* Delivery Method Selection */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-dark-green mb-4">
                Choose a preferred way you would love to get your order
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Doorstep Delivery */}
                <button
                  onClick={() => setDeliveryMethod("doorstep")}
                  className={`
                              relative p-4 rounded-xl border-2 transition-all duration-300
                                ${
                                  deliveryMethod === "doorstep"
                                    ? "border-primary bg-primary/5"
                                    : "border-gray-200 hover:border-primary/50"
                                }
                              `}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`
                            w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                            ${
                              deliveryMethod === "doorstep"
                                ? "border-primary"
                                : "border-gray-300"
                            }
                       `}
                    >
                      {deliveryMethod === "doorstep" && (
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
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

                {/* Store Pickup */}
                <button
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`
                              relative p-4 rounded-xl border-2 transition-all duration-300
                                ${
                                  deliveryMethod === "pickup"
                                    ? "border-primary bg-primary/5"
                                    : "border-gray-200 hover:border-primary/50"
                                }
                                    `}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`
                            w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                            ${
                              deliveryMethod === "pickup"
                                ? "border-primary"
                                : "border-gray-300"
                            }
                      `}
                    >
                      {deliveryMethod === "pickup" && (
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
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
            {/* Delivery Address Details */}

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

            {/* Submit Button */}
            <button
              disabled={addressToUse === null}
              onClick={() =>
                navigate("/market/marketplace/cart/checkout/payment")
              }
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              Proceed to Payment
            </button>

            {/* Delivery Form */}
            <BackDrop
              isOpen={isModalOpen}
              handleClose={handleModalClose}
              title="Add New Address"
            >
              <AddOrEditAddressForm
                setIsModalOpen={setIsModalOpen}
                setReload={setReload}
              />
            </BackDrop>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-[#edffed] rounded-2xl p-6 border border-litegreen shadow-2xl sticky top-24">
              <h3 className="text-lg font-bold text-dark mb-4">
                Order Summary ({cart.length} Item(s))
              </h3>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 border-b border-b-litegreen py-3"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-dark truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Crate of {item.countType}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.cartQuantity || 1}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-dark">
                        ₦{item.pricePerUnit.toLocaleString()}
                      </div>
                      {item.discountPerUnit && (
                        <div className="text-xs text-gray-400 line-through">
                          ₦{item.discountPerUnit.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3  pt-4">
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
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">VAT</span>
                  <span className="font-semibold">{vat.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="mt-4 pt-4 border-t border-t-litegreen  p-4">
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
