import api from "@/lib/axios-client";
import { QueryTransactionParams, FundWalletPayload } from "@/types";

const WalletService = {
  getWalletInfo: () => api.get("/api/wallet/info").then((r) => r.data.data),

  getWalletSummary: () =>
    api.get("/api/wallet/summary").then((r) => r.data.data),

  getWalletTransactions: (params: QueryTransactionParams) =>
    api.get("/api/wallet/transactions", { params }).then((r) => r.data.data),

  fundWallet: (data: FundWalletPayload) =>
    api.post("/api/wallet", data).then((r) => r.data.data),
};

export default WalletService;
