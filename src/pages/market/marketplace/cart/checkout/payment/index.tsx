import Navigation from "@/components/common/MarketPlace/Navigation";
import FailureModal from "@/components/common/status/FaillureModal";
import SuccessModal from "@/components/common/status/SuccessModal";
import MarketPlaceLayout from "@/layouts/MarketPlaceLayout";
import { useCheckoutStore } from "@/store/slices/checkout.slice";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PaymentService from "@/services/payment.service";
import { useAuthStore } from "@/store/slices/auth.slice";
import { PaymentMethod, ShippingMethod } from "@/types/prisma-schema-types";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { ErrorMessage } from "@/utils/PageUtils";
import Image from "next/image";

const paymentMethods = [
  {
    title: "paystack",
    img: "/assets/images/payment/paystack.png",
    desc: "Debit Card/Bank Transfer/USSD",
  },
  {
    title: "flutterwave",
    img: "/assets/images/payment/flutterwave.png",
    desc: "Debit Card/Bank Transfer/USSD",
  },
  {
    title: "smartcash",
    img: "/assets/images/payment/smartcash.png",
    desc: "Debit Card/Bank Transfer/USSD",
    soon: true,
  },
  {
    title: "crypto",
    img: "/assets/images/payment/usdt.png",
    desc: "USDT Payment",
    soon: true,
  },
];

const PaymentPage = () => {
  const {
    items,
    selectedAddress,
    shippingMethod,
    setPaymentDetails,
    resetCheckout,
  } = useCheckoutStore();

  const { user } = useAuthStore();

  const [selected, setSelected] = useState<PaymentMethod>(
    PaymentMethod.paystack,
  );
  const [successPayment, setSuccessPayment] = useState(false);
  const [failedPayment, setFailedPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!items.length || !selectedAddress || !shippingMethod) {
      router.replace("/market/marketplace/cart/checkout");
    }
  }, []);

  const handlePaymentSelection = async () => {
    if (!user?.email) {
      router.push("/auth/login");
      return;
    }

    try {
      setLoading(true);
      const response = await PaymentService.initiateOrderPayment({
        provider: selected,
        shippingMethod: shippingMethod ?? ("store_pickup" as ShippingMethod),
        items,
        email: user.email,
      });

      const { authorizationUrl, reference } = response.data;

      // Save reference temporarily
      setPaymentDetails({
        paymentMethod: selected,
        paymentReference: reference,
      });

      // Redirect user
      window.location.href = authorizationUrl;
    } catch (error) {
      console.error(error);
      const msg = renderAxiosOrAuthError(error);
      ErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-5 satoshi bg-[#D8F3D8] min-h-screen">
      <div className="w-11/12 lg:max-w-7xl mx-auto">
        <Navigation
          routes={[
            { name: "Cart", href: "/market/marketplace/cart-items" },
            { name: "Checkout", href: "/market/marketplace/cart/checkout" },
            { name: "Payment", href: "#" },
          ]}
          forward={true}
        />

        {/* Page Title */}
        <div className="my-6 text-2xl font-extrabold">Payment</div>

        {/* Centered card */}
        <div className="my-10 w-full lg:max-w-xl mx-auto">
          <div className="w-full flex flex-col gap-4 bg-white rounded-xl p-6 shadow-lg">
            {paymentMethods.map((method, index) => {
              const isSelected = selected === method.title;

              return (
                <div
                  key={index}
                  onClick={() =>
                    !method.soon && setSelected(method.title as PaymentMethod)
                  }
                  className={`
                    flex items-center justify-between w-full p-3 rounded-lg border transition-all cursor-pointer
                    ${isSelected ? "border-primary bg-green-50" : "border-gray-300"}
                    ${method.soon ? "cursor-not-allowed opacity-70" : ""}
                  `}
                >
                  {/* Left */}
                  <div className="flex items-center gap-3">
                    <Image
                      src={method.img}
                      alt={method.title}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />

                    <div className="flex flex-col">
                      <span className="font-semibold text-black">
                        Pay with {method.title}
                      </span>
                      <span className="text-sm text-gray-500">
                        {method.desc}
                      </span>
                    </div>
                  </div>

                  {/* Coming soon */}
                  {method.soon && (
                    <span className="text-[10px] bg-litegreen text-darkgreen px-2 py-1 rounded">
                      Coming Soon
                    </span>
                  )}

                  {/* Right selector */}
                  {!method.soon && (
                    <div
                      className={`
                        w-5 h-5 flex items-center justify-center rounded-full border
                        ${isSelected ? "bg-primary border-primary" : "border-gray-400"}
                      `}
                    >
                      {isSelected && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Pay Button */}
            <button
              onClick={handlePaymentSelection}
              disabled={loading}
              //   onClick={() => setFailedPayment(true)}
              className="mt-4 w-full bg-primary text-white py-3 rounded-lg font-semibold text-center disabled:opacity-50"
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
      <SuccessModal
        title="Payment Successful"
        description=" You have successfully placed an order"
        back_cta={true}
        back_cta_title="Track Order"
        back_cta_url="/market/marketplace/order"
        isOpen={successPayment}
        cta={true}
        cta_title="Continue Shopping"
        cta_url="/market/marketplace/allproducts"
        onClose={() => setSuccessPayment(false)}
      />
      <FailureModal
        title="Payment Failed"
        payment={true}
        description=" Something went wrong while processing your payment"
        isOpen={failedPayment}
        onClose={() => setFailedPayment(false)}
      />
    </div>
  );
};

PaymentPage.getLayout = (page: React.ReactNode) => (
  <MarketPlaceLayout>{page}</MarketPlaceLayout>
);

export default PaymentPage;
