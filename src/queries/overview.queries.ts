import Services from "@/services/overview.service";

export const buyerOverviewQueries = {
  all: ["buyer-overview"] as const,

  getOverview: () => ({
    queryKey: [...buyerOverviewQueries.all],
    queryFn: Services.getBuyerOverviewMetric,
  }),
};
