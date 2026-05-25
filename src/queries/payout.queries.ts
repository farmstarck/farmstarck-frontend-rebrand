import PayoutService from "@/services/payout.service";
import { QueryPayoutParams } from "@/types";

export const payoutQueries = {
  all: ["payouts"] as const,

  history: (params: QueryPayoutParams) => ({
    queryKey: [...payoutQueries.all, "history", params] as const,
    queryFn: () => PayoutService.getPayoutHistory(params),
  }),

  eligible: () => ({
    queryKey: [...payoutQueries.all, "eligible"] as const,
    queryFn: PayoutService.getEligibleOrders,
  }),
};

export const payoutMutations = {
  requestPayout: () => ({
    mutationFn: (sellerOrderId: string) =>
      PayoutService.requestPayout(sellerOrderId),
  }),
};
