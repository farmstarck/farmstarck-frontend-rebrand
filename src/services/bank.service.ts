// services/bank.service.ts
import api from "@/lib/axios-client";
import { CreateBankPayload } from "@/types";

const BankService = {
  // GET /api/bank/all — public
  getBanks: () => api.get("/api/bank/all").then((r) => r.data),

  // GET /api/user/bank-details
  getUserBankDetails: () =>
    api.get("/api/user/bank-details").then((r) => r.data.data),

  // POST /api/user/add/:bankId
  addBank: (bankId: string, data: CreateBankPayload) =>
    api.post(`/api/user/add/${bankId}`, data).then((r) => r.data),

  // DELETE /api/user/bank/:bankDetailId
  deleteBank: (bankDetailId: string) =>
    api.delete(`/api/user/bank/${bankDetailId}`).then((r) => r.data),

  // PATCH /api/user/bank/:bankDetailId/default
  setDefaultBank: (bankDetailId: string) =>
    api.patch(`/api/user/bank/${bankDetailId}/default`).then((r) => r.data),

  // GET /api/bank/verify-account
  verifyAccountNumber: (accountNumber: string, bankCode: string) =>
    api
      .get("/api/bank/verify-account", {
        params: { accountNumber, bankCode },
      })
      .then((r) => r.data),
};

export default BankService;
