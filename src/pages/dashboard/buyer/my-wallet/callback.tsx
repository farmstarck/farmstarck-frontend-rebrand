import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PaymentService from "@/services/payment.service";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import PaymentProcessing from "@/components/common/ui/PaymentProcessLoader";
import FailureModal from "@/components/common/status/FaillureModal";
import SuccessModal from "@/components/common/status/SuccessModal";
import BuyerDashboardLayout from "@/layouts/BuyerDashboardLayout";
import { useQueryClient } from "@tanstack/react-query";
import { walletQueries } from "@/queries/wallet.queries";
import { PaymentMethod } from "@/types/prisma-schema-types";

type PaymentStage = "verifying" | "funding" | "success" | "failed";

const WalletCallbackPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [stage, setStage] = useState<PaymentStage>("verifying");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    // Read from sessionStorage — set before redirect in FundWallet
    const amount = Number(sessionStorage.getItem("wallet_fund_amount"));
    const paymentMethod = sessionStorage.getItem(
      "wallet_fund_method",
    ) as PaymentMethod | null;

    const reference =
      (router.query.trxref as string) || (router.query.tx_ref as string);
    const transactionId = (router.query.transaction_id as string) || null;

    if (!reference || !paymentMethod || !amount) {
      setErrorMessage("Missing payment details. Please try again.");
      setStage("failed");
      return;
    }

    const run = async () => {
      try {
        // Step 1 — verify payment with provider
        setStage("verifying");
        await PaymentService.verifyWalletPayment({
          provider: paymentMethod,
          reference,
          transactionId,
        });
        // Step 2 — credit wallet on backend
        setStage("funding");
        await PaymentService.fundWalletAfterVerify({
          amount,
          paymentDetails: {
            paymentMethod,
            paymentReference:
              paymentMethod === "flutterwave"
                ? (router.query.tx_ref as string)
                : reference,
          },
        });

        // Clean up sessionStorage
        sessionStorage.removeItem("wallet_fund_amount");
        sessionStorage.removeItem("wallet_fund_method");
        setStage("success");

        // Invalidate wallet queries so balance updates immediately
        queryClient.invalidateQueries({ queryKey: walletQueries.all });

        setStage("success");
      } catch (error) {
        setErrorMessage(renderAxiosOrAuthError(error));
        setStage("failed");
      }
    };

    run();
  }, [router.isReady]);

  return (
    <div className="w-full py-5 satoshi  min-h-screen">
      {(stage === "verifying" || stage === "funding") && (
        <PaymentProcessing
          text={
            stage === "verifying"
              ? "Verifying payment..."
              : "Funding your wallet..."
          }
        />
      )}

      <SuccessModal
        isOpen={stage === "success"}
        title="Wallet Funded"
        description="Your wallet has been successfully funded."
        cta
        cta_title="Return to Wallet"
        cta_url="/dashboard/buyer/my-wallet?funded=true"
        onClose={() => router.push("/dashboard/buyer/my-wallet?funded=true")}
      />

      <FailureModal
        isOpen={stage === "failed"}
        title="Payment Failed"
        description={errorMessage ?? "Something went wrong. Please try again."}
        payment
        onClose={() => router.push("/dashboard/buyer/my-wallet")}
      />
    </div>
  );
};

WalletCallbackPage.getLayout = (page: React.ReactNode) => (
  <BuyerDashboardLayout>{page}</BuyerDashboardLayout>
);

export default WalletCallbackPage;
