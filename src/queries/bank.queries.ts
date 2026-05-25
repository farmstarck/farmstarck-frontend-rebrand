// queries/bank.queries.ts
import BankService from "@/services/bank.service";
import { CreateBankPayload } from "@/types";

export const bankQueries = {
  all: ["bank"] as const,

  // Returns banks list for dropdown
  banks: () => ({
    queryKey: [...bankQueries.all, "list"] as const,
    queryFn: BankService.getBanks,
    select: (res: any) =>
      (res.data ?? res ?? []).map((b: any) => ({
        value: b.id,
        label: b.name,
        code: b.code, // needed for verification
      })),
  }),

  userBankDetails: () => ({
    queryKey: [...bankQueries.all, "user-details"] as const,
    queryFn: BankService.getUserBankDetails,
    select: (res: any) => res.data ?? [],
  }),
};

export const bankMutations = {
  addBank: () => ({
    mutationFn: ({
      bankId,
      data,
    }: {
      bankId: string;
      data: CreateBankPayload;
    }) => BankService.addBank(bankId, data),
  }),

  deleteBank: () => ({
    mutationFn: (bankDetailId: string) => BankService.deleteBank(bankDetailId),
  }),

  setDefaultBank: () => ({
    mutationFn: (bankDetailId: string) =>
      BankService.setDefaultBank(bankDetailId),
  }),
};
