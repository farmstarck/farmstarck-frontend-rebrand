import Services from "@/services/order.service";
import {
  FetchBuyerOrdersParams,
  RateExperiencePayload,
  RateProductPayload,
  RequestRefundPayload,
  SellerOrdersParams,
} from "@/types";

export const orderQueries = {
  all: ["buyer-orders"] as const,

  getBuyerOrders: (params: FetchBuyerOrdersParams) => ({
    queryKey: [...orderQueries.all, "list", params] as const,
    queryFn: () => Services.getBuyerOrders(params),
  }),

  getBuyerOrderById: (orderId: string) => ({
    queryKey: [...orderQueries.all, "single", orderId] as const,
    queryFn: () => Services.getBuyerOrderById(orderId),
    enabled: !!orderId,
  }),

  trackOrderItem: (itemId: string) => ({
    queryKey: [...orderQueries.all, "track-item", itemId] as const,
    queryFn: () => Services.trackOrderItemById(itemId),
    enabled: !!itemId,
  }),

  validateCart: (items: { productId: string; quantity: number }[]) => ({
    queryKey: [...orderQueries.all, "validate-cart", items] as const,
    queryFn: () => Services.validateCart(items),
    enabled: items.length > 0,
    staleTime: 30 * 1000,
  }),

  // SELLER QUERIES
  getSellerOrders: (params: SellerOrdersParams) => ({
    queryKey: [...orderQueries.all, "seller-list", params] as const,
    queryFn: () => Services.getSellerOrders(params),
  }),

  getSellerOrderById: (id: string) => ({
    queryKey: [...orderQueries.all, "seller-single", id] as const,
    queryFn: () => Services.getSellerOrderById(id),
    enabled: !!id,
  }),
};

export const orderMutations = {
  createOrder: () => ({
    mutationFn: Services.createOrder,
  }),

  cancelOrder: () => ({
    mutationFn: (orderId: string) => Services.cancelBuyerOrder(orderId),
  }),

  cancelOrderItem: () => ({
    mutationFn: ({ orderId, itemId }: { orderId: string; itemId: string }) =>
      Services.cancelBuyerOrderItem(orderId, itemId),
  }),

  rateProduct: () => ({
    mutationFn: (data: RateProductPayload) => Services.rateProduct(data),
  }),

  rateExperience: () => ({
    mutationFn: (data: RateExperiencePayload) => Services.rateExperience(data),
  }),

  requestRefund: () => ({
    mutationFn: (data: RequestRefundPayload) => Services.requestRefund(data),
  }),

  updateOrderItemStatus: () => ({
    mutationFn: ({
      orderItemId,
      status,
    }: {
      orderItemId: string;
      status: string;
    }) => Services.updateOrderItemStatus(orderItemId, status),
  }),
};
