import React, { useState } from "react";
import ModalLayout from "@/layouts/ModalLayout";
import { useQuery } from "@tanstack/react-query";
import { walletQueries } from "@/queries/wallet.queries";
import { Wallet, X } from "lucide-react";
import { useNavigate } from "@/hooks/useNavigate";
import Image from "next/image";

interface WalletPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onConfirm: () => Promise<void>;
}

type WalletStep = "confirm" | "processing" | "insufficient";

const WalletPaymentModal = ({
  isOpen,
  onClose,
  amount,
  onConfirm,
}: WalletPaymentModalProps) => {
  const { navigate } = useNavigate();
  const [step, setStep] = useState<WalletStep>("confirm");

  const { data: walletInfo } = useQuery({
    ...walletQueries.info(),
    enabled: isOpen,
    select: (res: any) => res.wallet,
  });

  const balance = walletInfo?.balance ?? 0;
  const hasEnoughBalance = balance >= amount;

  const handlePayment = async () => {
    if (!hasEnoughBalance) {
      setStep("insufficient");
      return;
    }
    setStep("processing");
    try {
      await onConfirm();
    } catch {
      setStep("confirm");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalLayout onClose={onClose}>
      <div className="w-full max-w-sm mx-auto bg-white rounded-2xl p-6">
        {/* ── Confirm step ────────────────────────────────────── */}
        {step === "confirm" && (
          <>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                <Wallet size={24} className="text-primary" />
              </div>

              <div>
                <p className="text-gray-600 text-sm">
                  You are about to make a payment of
                </p>
                <p className="text-xl font-bold text-gray-900 mt-1">
                  ₦
                  {amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                </p>
                <p className="text-gray-500 text-sm">from your wallet</p>
              </div>

              <div className="w-full flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                <span className="text-sm text-gray-500">Wallet Balance:</span>
                <span className="font-bold text-gray-900">
                  ₦
                  {balance.toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <button
                onClick={handlePayment}
                className="w-full py-3.5 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Make Payment
              </button>
            </div>
          </>
        )}

        {/* ── Insufficient funds step ──────────────────────── */}
        {step === "insufficient" && (
          <>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center">
                <Wallet size={24} className="text-red-400" />
              </div>

              <div>
                <p className="text-gray-600 text-sm">
                  You are about to make a payment of
                </p>
                <p className="text-xl font-bold text-gray-900 mt-1">
                  ₦
                  {amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                </p>
                <p className="text-gray-500 text-sm">from your wallet</p>
              </div>

              <div className="w-full flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                <span className="text-sm text-gray-500">Wallet Balance:</span>
                <span className="font-bold text-gray-900">
                  ₦
                  {balance.toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <p className="text-red-500 text-sm font-semibold">
                Insufficient Fund
              </p>

              <button
                onClick={() => navigate("/dashboard/my-wallet")}
                className="w-full py-3.5 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Fund Wallet
              </button>
            </div>
          </>
        )}

        {/* ── Processing step ──────────────────────────────── */}
        {step === "processing" && (
          <div className="flex flex-col items-center gap-5 text-center py-4">
            <p className="text-lg font-bold text-gray-900">
              Processing Payment
            </p>

            {/* Animated rings */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
              <span className="absolute inset-2 rounded-full border-4 border-primary/30" />
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center z-10">
                <Image
                  src="/assets/images/logo.png"
                  alt="Farmstarck"
                  width={32}
                  height={32}
                />
              </div>
            </div>

            <p className="text-sm text-gray-500 max-w-[200px]">
              Connecting to your wallet to verify your transaction
            </p>
          </div>
        )}
      </div>
    </ModalLayout>
  );
};

export default WalletPaymentModal;
