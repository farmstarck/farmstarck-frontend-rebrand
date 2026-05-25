import api from "@/lib/axios-client";
import { CheckoutItem } from "@/store/slices/checkout.slice";
import { PaymentMethod, ShippingMethod } from "@/types/prisma-schema-types";

export interface InitiateOrderPaymentProps {
  provider: PaymentMethod;
  shippingMethod: ShippingMethod;
  items: CheckoutItem[];
  email: string;
}

export interface InitiateWalletPaymentProps {
  paymentMethod: PaymentMethod;
  amount: number;
  email: string;
  callback_url: string;
}

export interface VerifyPaymentProps {
  reference: string;
  provider: PaymentMethod;
  transactionId?: string | null;
}

export interface FundWalletAfterVerifyProps {
  amount: number;
  paymentDetails: {
    paymentMethod: PaymentMethod;
    paymentReference: string;
  };
}

const PaymentService = {
  initiateOrderPayment: (data: InitiateOrderPaymentProps) =>
    api.post("/api/order/initiate-payment", data).then((r) => r.data),

  verifyOrderPayment: (data: VerifyPaymentProps) =>
    api.post("/api/order/verify-payment", data).then((r) => r.data),

  initiateWalletPayment: (data: InitiateWalletPaymentProps) =>
    api.post("/api/wallet/initiate-payment", data).then((r) => r.data),

  verifyWalletPayment: (data: VerifyPaymentProps) =>
    api.post("/api/wallet/verify-payment", data).then((r) => r.data),

  fundWalletAfterVerify: (data: FundWalletAfterVerifyProps) =>
    api.post("/api/wallet", data).then((r) => r.data),
  getOrderFeeInfo: (data: {
    items: CheckoutItem[];
    shippingMethod: ShippingMethod;
  }) => api.post("/api/order/fee-info", data).then((r) => r.data),
};

export default PaymentService;
