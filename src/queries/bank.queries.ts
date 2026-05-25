// queries/bank.queries.ts
import BankService from "@/services/bank.service";
import { CreateBankPayload } from "@/types";

type BankRecord = { id: string; name: string; code: string };

export const bankQueries = {
  all: ["bank"] as const,

  // Returns banks list for dropdown
  banks: () => ({
    queryKey: [...bankQueries.all, "list"] as const,
    queryFn: BankService.getBanks,
    select: (res: { data?: BankRecord[] } | BankRecord[]) =>
      (Array.isArray(res) ? res : (res.data ?? [])).map((b) => ({
        value: b.id,
        label: b.name,
        code: b.code, // needed for verification
      })),
  }),

  userBankDetails: () => ({
    queryKey: [...bankQueries.all, "user-details"] as const,
    queryFn: BankService.getUserBankDetails,
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
