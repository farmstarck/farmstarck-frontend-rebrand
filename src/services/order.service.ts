import api from "@/lib/axios-client";
import { CheckoutItem } from "@/store/slices/checkout.slice";
import { PaymentMethod, ShippingMethod } from "@/types/prisma-schema-types";

interface CreateOrderProps {
  items: CheckoutItem[];
  paymentDetails: {
    paymentMethod: PaymentMethod;
    paymentReference: string;
  };
  shippingMethod: ShippingMethod | null;
  addressId: string | null;
}

const Services = {
  createOrder: async (data: CreateOrderProps) => {
    const response = await api.post("/api/order", data);
    return response.data;
  },
};

export default Services;
