import { useState } from "react";
import MarketPlaceLayout from "@/layouts/MarketPlaceLayout";
import Navigation from "@/components/common/MarketPlace/Navigation";
import { Plus, Minus, Trash2Icon, LucideTrash2 } from "lucide-react";
import { useCartStore } from "@/store/slices/cart.slice";
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
import { Product } from "@/types/prisma-schema-types";

const CartItems = () => {
  const { navigate } = useNavigate();
  const { cart } = useCartStore();
  const [showClearModal, setShowClearModal] = useState(false);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    cart.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {}),
  );
  const checkoutPath = "/market/marketplace/cart/checkout";
  const { isAuthenticated } = useAuthStore();

  const handleQuantityChange = (id: string, value: number) => {
    if (value < 1) return;
    setQuantities((prev) => ({ ...prev, [id]: value }));
    updateCartQuantityAction(id, value);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const quantity = quantities[item.id] || 1;
      return total + item.pricePerUnit * quantity;
    }, 0);
  };

  const vat = 0;
  const subtotal = calculateSubtotal();
  const total = subtotal + vat;

  const handleClearAll = () => {
    clearCartAction();
    setShowClearModal(false);
  };

  if (cart.length === 0) {
    return (
      <div className="w-full py-5 bg-lite">
        <div className="w-11/12 lg:max-w-7xl mx-auto">
          <Navigation routes={[{ name: "Cart", href: "/marketplace/cart" }]} />
          <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-6">
            My Cart
          </h1>

          <div className="flex w-full flex-col items-center  bg-white max-w-4xl rounded-md mx-auto justify-center mb-20 py-20">
            <div className="bg-white rounded-full ">
              <Image
                src={"/assets/images/cartimg.png"}
                alt="cart image"
                height={200}
                width={200}
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-3">
              Your have not added any item to your cart
            </p>
            <div className="w-full flex items-center justify-center">
              <Link
                className="w-1/2 lg:w-1/3 text-center mx-auto text-white rounded-full bg-primary py-2.5 px-10 gap-1"
                href="allproducts"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full py-2 lg:py-5 bg-lite">
        <div className="w-11/12 lg:max-w-7xl mx-auto">
          <Navigation routes={[{ name: "Cart", href: "/marketplace/cart" }]} />

          <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-6">
            My Cart
          </h1>

          <div className="w-full flex flex-col  items-start gap-6 lg:gap-10 satoshi">
            {/* Cart Items */}
            <div className="w-full lg:flex-1">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Table Header - Hidden on mobile */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 text-sm py-4 font-semibold text-gray-900 bg-litegreen">
                  <div className="col-span-2">Image</div>
                  <div className="col-span-3">Item Description</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-3">Quantity</div>
                  <div className="col-span-2">Subtotal</div>
                </div>
                {/* Cart Items */}
                <div className="flex flex-col gap-3">
                  {cart.map((item: Product) => (
                    <div
                      key={item.id}
                      className="border-b border-b-gray-200  px-4 md:px-6 py-4"
                    >
                      {/* Mobile Layout */}
                      <div className="md:hidden space-y-4">
                        {/* Header Row */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3 flex-1">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-16 h-16 capitalize object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold capitalize text-gray-900 text-sm mb-1">
                                {item.name}
                              </h3>
                              <div className="w-fit flex capitalize items-center gap-1 bg-[#a5faa5] text-primary py-1 text-[10px] font-medium px-2 rounded-full">
                                <Image
                                  width={6}
                                  height={6}
                                  src="/assets/images/marketplaces/productIcon.png"
                                  alt="size image"
                                />
                                {item.countType}
                              </div>
                            </div>
                          </div>
                          <button
                            className="text-red-600 hover:text-red-700 p-1"
                            onClick={() => removeFromCartAction(item.id)}
                          >
                            <Trash2Icon className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price and Quantity Row */}
                        <div className="flex justify-between items-center">
                          <div className="text-left">
                            <span className="text-xs text-gray-500">
                              Price:
                            </span>
                            <p className="font-semibold text-gray-900 text-sm">
                              N{item?.pricePerUnit?.toLocaleString()}
                            </p>
                          </div>

                          <div className="text-center">
                            <span className="text-xs text-gray-500 block mb-1">
                              Quantity
                            </span>
                            <div className="flex items-center gap-2 border border-gray-300 rounded-full w-fit px-2 py-1 mx-auto">
                              <button
                                className="w-5 h-5 flex items-center justify-center bg-dark-green rounded-full text-white"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    (quantities[item.id] || 1) - 1,
                                  )
                                }
                                disabled={(quantities[item.id] || 1) <= 1}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center font-semibold text-sm">
                                {quantities[item.id] || 1}
                              </span>
                              <button
                                className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    (quantities[item.id] || 1) + 1,
                                  )
                                }
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-xs text-gray-500">
                              Subtotal:
                            </span>
                            <p className="font-semibold text-gray-900 text-sm">
                              N
                              {(
                                item.pricePerUnit * (quantities[item.id] || 1)
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-2">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        </div>

                        <div className="col-span-3">
                          <h3 className="font-semibold capitalize text-gray-900">
                            {item.name}
                          </h3>
                          <div className="w-fit capitalize flex items-center gap-1 bg-[#a5faa5] text-primary py-1 text-[10px] font-medium px-3 rounded-full">
                            <Image
                              width={8}
                              height={8}
                              src="/assets/images/marketplaces/productIcon.png"
                              alt="size image"
                            />
                            {item.countType}
                          </div>
                        </div>

                        <div className="col-span-2">
                          <p className="font-semibold text-gray-900">
                            N{item?.pricePerUnit?.toLocaleString()}
                          </p>
                        </div>

                        <div className="col-span-3">
                          <div className="flex items-center gap-2 border border-gray-300 rounded-full w-fit px-2 py-1">
                            <button
                              className="w-5 h-5 flex items-center justify-center bg-dark-green rounded-full text-white"
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  (quantities[item.id] || 1) - 1,
                                )
                              }
                              disabled={(quantities[item.id] || 1) <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">
                              {quantities[item.id] || 1}
                            </span>
                            <button
                              className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white"
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  (quantities[item.id] || 1) + 1,
                                )
                              }
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="col-span-1">
                          <p className="font-semibold text-gray-900">
                            N
                            {(
                              item?.pricePerUnit * (quantities[item.id] || 1)
                            )?.toLocaleString()}
                          </p>
                        </div>

                        <div className="col-span-1 text-right">
                          <button
                            className="text-red-600 hover:text-red-700"
                            onClick={() => removeFromCartAction(item.id)}
                          >
                            <Trash2Icon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delete All Button */}
                <div className="px-4 md:px-6 my-4 flex w-full md:w-fit md:ml-auto justify-center md:justify-end">
                  <button
                    onClick={() => setShowClearModal(true)}
                    className="w-full md:w-auto rounded-full bg-red-500 py-2 px-5 flex items-center justify-center gap-1"
                  >
                    <LucideTrash2 className="w-4 h-4 text-white" />
                    <span className="text-white text-sm">Delete All</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-primary">
                    Order Summary
                  </h2>
                  <span className="text-green-600 font-semibold">
                    {cart.length} Item(s)
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      N{subtotal?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>VAT</span>
                    <span className="font-semibold">N{vat.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-t-gray-200 pt-4">
                    <div className="text-gray-600 mb-2">Delivery Details</div>
                    <p className="text-sm text-gray-500">
                      Add your delivery address at checkout to see delivery
                      charges
                    </p>
                  </div>

                  <div className="border-t border-t-gray-200 pt-4 flex justify-between text-lg font-bold text-gray-900">
                    <span>TOTAL</span>
                    <span>N{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (isAuthenticated) {
                      navigate(checkoutPath);
                    } else {
                      localStorage.setItem("redirectAfterAuth", checkoutPath);
                      navigate("/signin");
                    }
                  }}
                  className="w-full text-white rounded-full bg-primary py-2.5 px-5 gap-1"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showClearModal}
        onConfirm={handleClearAll}
        type="cart"
        closeModal={() => setShowClearModal(false)}
      />
    </>
  );
};

CartItems.getLayout = (page: React.ReactNode) => (
  <MarketPlaceLayout>{page}</MarketPlaceLayout>
);

export default CartItems;
