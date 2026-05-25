import PaymentService, {
  InitiateOrderPaymentProps,
  InitiateWalletPaymentProps,
  VerifyPaymentProps,
  FundWalletAfterVerifyProps,
} from "@/services/payment.service";

export const paymentMutations = {
  initiateOrderPayment: () => ({
    mutationFn: (data: InitiateOrderPaymentProps) =>
      PaymentService.initiateOrderPayment(data),
  }),

  verifyOrderPayment: () => ({
    mutationFn: (data: VerifyPaymentProps) =>
      PaymentService.verifyOrderPayment(data),
  }),

  initiateWalletPayment: () => ({
    mutationFn: (data: InitiateWalletPaymentProps) =>
      PaymentService.initiateWalletPayment(data),
  }),

  verifyWalletPayment: () => ({
    mutationFn: (data: VerifyPaymentProps) =>
      PaymentService.verifyWalletPayment(data),
  }),

  fundWalletAfterVerify: () => ({
    mutationFn: (data: FundWalletAfterVerifyProps) =>
      PaymentService.fundWalletAfterVerify(data),
  }),
};
