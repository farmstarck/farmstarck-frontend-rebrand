import FailureModal from "@/components/common/status/FaillureModal";
import SuccessModal from "@/components/common/status/SuccessModal";
import MarketPlaceLayout from "@/layouts/MarketPlaceLayout";
import { useCheckoutStore } from "@/store/slices/checkout.slice";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PaymentService from "@/services/payment.service";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import PaymentProcessing from "@/components/common/ui/PaymentProcessLoader";
import OrderService from "@/services/order.service";
import { clearCartAction } from "@/store/actions/cart.action";

type PaymentStage =
  | "idle"
  | "verifying"
  | "creating_order"
  | "success"
  | "failed";

const PaymentCallbackPage = () => {
  const {
    items,
    selectedAddress,
    shippingMethod,
    paymentDetails: { paymentMethod },
    resetCheckout,
  } = useCheckoutStore();

  const [stage, setStage] = useState<PaymentStage>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const reference =
      (router.query.trxref as string) || (router.query.tx_ref as string);

    if (!reference || !paymentMethod) return;

    const verifyAndCreateOrder = async () => {
      try {
        setStage("verifying");
        const verifyRes = await PaymentService.verifyOrderPayment({
          provider: paymentMethod,
          reference,
          transactionId: (router.query.transaction_id as string) || null,
        });

        if (!verifyRes.data) {
          throw new Error("Payment verification failed");
        }

        setStage("creating_order");
        await OrderService.createOrder({
          items,
          paymentDetails: {
            paymentMethod,
            paymentReference:
              paymentMethod === "flutterwave"
                ? (router.query.tx_ref as string)
                : reference,
          },
          shippingMethod,
          addressId: selectedAddress?.id ?? null,
        });

        resetCheckout();
        setStage("success");
        clearCartAction();
      } catch (error) {
        console.error(error);
        setErrorMessage(renderAxiosOrAuthError(error));
        setStage("failed");
      }
    };

    verifyAndCreateOrder();
  }, [router.isReady]);

  return (
    <div className="w-full py-5 satoshi bg-[#D8F3D8] min-h-screen">
      {stage === "verifying" && (
        <PaymentProcessing text="Verifying payment..." />
      )}

      {stage === "creating_order" && (
        <PaymentProcessing text="Creating your order..." />
      )}

      <SuccessModal
        title="Payment Successful"
        description="You have successfully placed an order"
        back_cta
        back_cta_title="Track Order"
        back_cta_url="/market/marketplace/order"
        isOpen={stage === "success"}
        cta
        cta_title="Continue Shopping"
        cta_url="/market/marketplace/allproducts"
        onClose={() => router.push("/market/marketplace")}
      />

      <FailureModal
        title="Payment Failed"
        payment
        description={errorMessage ?? "Something went wrong"}
        isOpen={stage === "failed"}
        onClose={() => router.push("/market/marketplace/cart/checkout")}
      />
    </div>
  );
};

PaymentCallbackPage.getLayout = (page: React.ReactNode) => (
  <MarketPlaceLayout>{page}</MarketPlaceLayout>
);

export default PaymentCallbackPage;
