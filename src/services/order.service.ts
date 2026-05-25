import api from "@/lib/axios-client";
import { CheckoutItem } from "@/store/slices/checkout.slice";
import {
  FetchBuyerOrdersParams,
  RateExperiencePayload,
  RateProductPayload,
  RequestRefundPayload,
  SellerOrdersParams,
} from "@/types";
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
  // BUYER ENDPOINTS
  getBuyerOrders: (params: FetchBuyerOrdersParams) =>
    api.get("/api/order/all", { params }).then((r) => r.data.data),

  getBuyerOrderById: (orderId: string) =>
    api.get(`/api/order/single/${orderId}`).then((r) => r.data),

  cancelBuyerOrder: (orderId: string) =>
    api.patch(`/api/order/cancel/${orderId}`).then((r) => r.data),

  cancelBuyerOrderItem: (orderId: string, itemId: string) =>
    api
      .patch(`/api/order/${orderId}/item/${itemId}/cancel`)
      .then((r) => r.data),

  trackOrderItemById: (itemId: string) =>
    api.get(`/api/order/track/item/${itemId}`).then((r) => r.data),

  rateProduct: (data: RateProductPayload) =>
    api.post("/api/reviews/rate/product", data).then((r) => r.data),

  rateExperience: (data: RateExperiencePayload) =>
    api.post("/api/reviews/rate/experience", data).then((r) => r.data),

  requestRefund: (data: RequestRefundPayload) =>
    api.post("/api/order/refund", data).then((r) => r.data),

  validateCart: (items: { productId: string; quantity: number }[]) =>
    api.post("/api/order/validate-cart", { items }).then((r) => r.data),

  // SELLER ENDPOINTS

  getSellerOrders: (params: SellerOrdersParams) =>
    api.get("/api/order/seller", { params }).then((r) => r.data),

  getSellerOrderById: (id: string) =>
    api.get(`/api/order/seller/${id}`).then((r) => r.data),

  updateOrderItemStatus: (orderItemId: string, status: string) =>
    api
      .patch(`/api/order/seller-status/${orderItemId}/${status}`)
      .then((r) => r.data),
};

export default Services;
