import WalletService from "@/services/wallet.service";
import {
  FundWalletPayload,
  QueryTransactionParams,
  WalletInfo,
  WalletSummary,
  WalletTransaction,
  WalletTransactionsResponse,
} from "@/types";

export const walletQueries = {
  all: ["wallet"] as const,

  info: () => ({
    queryKey: [...walletQueries.all, "info"] as const,
    queryFn: WalletService.getWalletInfo,
    select: (res: { wallet: WalletInfo }) => res.wallet,
  }),

  summary: () => ({
    queryKey: [...walletQueries.all, "summary"] as const,
    queryFn: WalletService.getWalletSummary,
    select: (res: WalletSummary) => res,
  }),

  transactions: (params: QueryTransactionParams) => ({
    queryKey: [...walletQueries.all, "transactions", params] as const,
    queryFn: () => WalletService.getWalletTransactions(params),
    select: (res: WalletTransactionsResponse) => ({
      transactions: res.transactions,
      totalPages: res.pagination.totalPages,
      totalRecords: res.pagination.totalRecords,
      currentPage: res.pagination.currentPage,
    }),
  }),
};

export const walletMutations = {
  fundWallet: () => ({
    mutationFn: (data: FundWalletPayload) => WalletService.fundWallet(data),
  }),
};
