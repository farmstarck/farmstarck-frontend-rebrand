import { create } from "zustand";
import {
  Address,
  PaymentMethod,
  ShippingMethod,
} from "@/types/prisma-schema-types";
import { persist } from "zustand/middleware";

export interface CheckoutItem {
  productId: string;
  quantity: number;
}

interface PaymentDetails {
  paymentMethod: PaymentMethod | null;
  paymentReference?: string | null;
}

interface CheckoutState {
  items: CheckoutItem[];
  selectedAddress: Address | null;
  shippingMethod: ShippingMethod | null;

  paymentDetails: PaymentDetails;
  setItems: (items: CheckoutItem[]) => void;
  setUserSelectedAddress: (address: Address) => void;
  setShipping: (method: ShippingMethod, fee: number) => void;
  setPaymentDetails: (details: PaymentDetails) => void;

  resetCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      items: [],
      selectedAddress: null,
      shippingMethod: null,
      paymentDetails: {
        paymentMethod: null,
        paymentReference: null,
      },

      setItems: (items) => set({ items }),
      setUserSelectedAddress: (address) => set({ selectedAddress: address }),
      setShipping: (method) => set({ shippingMethod: method }),
      setPaymentDetails: (details) =>
        set((state) => ({
          paymentDetails: { ...state.paymentDetails, ...details },
        })),

      resetCheckout: () =>
        set({
          items: [],
          selectedAddress: null,
          shippingMethod: null,
          paymentDetails: {
            paymentMethod: null,
            paymentReference: null,
          },
        }),
    }),
    {
      name: "checkout-storage",
    },
  ),
);
