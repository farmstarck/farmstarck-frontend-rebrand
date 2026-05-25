// services/payout.service.ts (frontend)
import api from "@/lib/axios-client";
import { QueryPayoutParams } from "@/types";

const PayoutService = {
  getPayoutHistory: (params: QueryPayoutParams) =>
    api.get("/api/payout/history", { params }).then((r) => r.data),

  getEligibleOrders: () => api.get("/api/payout/eligible").then((r) => r.data),

  requestPayout: (sellerOrderId: string) =>
    api.post(`/api/payout/request/${sellerOrderId}`).then((r) => r.data),
};

export default PayoutService;
