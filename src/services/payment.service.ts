import api from "@/lib/axios-client";
import { CheckoutItem } from "@/store/slices/checkout.slice";
import { PaymentMethod, ShippingMethod } from "@/types/prisma-schema-types";

interface InitiatePaymentProps {
  provider: PaymentMethod;
  shippingMethod: ShippingMethod;
  items: CheckoutItem[];
  email: string;
}

interface VerifyPaymentProps {
  reference: string;
  provider: PaymentMethod | null;
  transactionId?: string | null;
}

interface InitiateFlutterwavePaymentProps {
  email: string;
  amount: number;
  redirect_url: string;
}

const Services = {
  initiateOrderPayment: async (data: InitiatePaymentProps) => {
    const response = await api.post("/api/order/initiate-payment", data);
    return response.data;
  },

  verifyOrderPayment: async (data: VerifyPaymentProps) => {
    const response = await api.post(`/api/order/verify-payment`, data);
    return response.data;
  },

  initiateFlutterwavePayment: async (data: InitiateFlutterwavePaymentProps) => {
    const response = await api.post("/api/flutterwave/initiate-payment", data);
    return response.data;
  },

  verifyFlutterwavePayment: async (transactionId: string) => {
    const response = await api.post(
      `/api/flutterwave/verify-payment/${transactionId}`,
    );
    return response.data;
  },
};

export default Services;
