import api from "@/lib/axios-client";

const overviewService = {
  getBuyerOverviewMetric: () =>
    api.get("/api/user/buyer/dashboard/overview-metric").then((r) => r.data),

  getSellerOverviewMetric: () =>
    api.get("/api/user/seller/dashboard/overview-metric").then((r) => r.data),
};

export default overviewService;
