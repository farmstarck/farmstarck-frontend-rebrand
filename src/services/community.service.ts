import api from "@/lib/axios-client";
import { CheckoutItem } from "@/store/slices/checkout.slice";
import { PaymentMethod, ShippingMethod } from "@/types/prisma-schema-types";

interface ContactUsProps {
  name?: string;
  email: string;
  message: string;
}

interface NewsletterProps {
  email: string;
}

const Services = {
  contactUs: async (data: ContactUsProps) => {
    const response = await api.post("/api/contact-us", data);
    return response.data;
  },

  subscribeToNewsletter: async (data: NewsletterProps) => {
    const response = await api.post(`/api/newsletter/subscribe`, data);
    return response.data;
  },

  unsubscribeFromNewsletter: async (data: NewsletterProps) => {
    const response = await api.patch("/api/newsletter/unsubscribe", data);
    return response.data;
  },
};

export default Services;
