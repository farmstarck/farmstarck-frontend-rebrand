"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import CloseBtn from "@/components/common/Navigation/CloseBtn";
import ModalLayout from "@/layouts/ModalLayout";
import { useAuthStore } from "@/store/slices/auth.slice";
import { useRouter } from "next/router";
import PaymentService from "@/services/payment.service";
import { PaymentMethod } from "@/types/prisma-schema-types";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { ErrorMessage } from "@/utils/PageUtils";

interface FundWalletProps {
  onClose: () => void;
}

type Step = "amount" | "payment";

const PAYMENT_METHODS: {
  id: PaymentMethod;
  img: string;
  desc: string;
  soon?: boolean;
}[] = [
  {
    id: PaymentMethod.paystack,
    img: "/assets/images/payment/paystack.png",
    desc: "Debit Card / Bank Transfer / USSD",
  },
  {
    id: PaymentMethod.flutterwave,
    img: "/assets/images/payment/flutterwave.png",
    desc: "Debit Card / Bank Transfer / USSD",
  },
  {
    id: PaymentMethod.smartcash,
    img: "/assets/images/payment/smartcash.png",
    desc: "Debit Card / Bank Transfer / USSD",
    soon: true, // ← add
  },
  {
    id: "crypto" as PaymentMethod,
    img: "/assets/images/payment/usdt.png",
    desc: "USDT Payment",
    soon: true, // ← add
  },
];

const CALLBACK_URL = `${process.env.NEXT_PUBLIC_CLIENT_URL}/dashboard/my-wallet/callback`;

export default function FundWallet({ onClose }: FundWalletProps) {
  const { user } = useAuthStore();
  const router = useRouter();

  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(
    PaymentMethod.paystack,
  );
  const [loading, setLoading] = useState(false);

  const rawAmount = Number(amount.replace(/,/g, ""));

  const handleAmountInput = (val: string) => {
    const raw = val.replace(/[^0-9]/g, "");
    if (!raw) return setAmount("");
    setAmount(Number(raw).toLocaleString("en-NG"));
  };

  const handleInitiatePayment = async () => {
    if (!user?.email) {
      router.push("/auth/login");
      return;
    }

    try {
      setLoading(true);

      const response = await PaymentService.initiateWalletPayment({
        paymentMethod: selectedMethod,
        email: user.email,
        amount: rawAmount,
        callback_url: CALLBACK_URL,
      });

      const { authorizationUrl } = response.data;

      // Store amount in sessionStorage so callback can use it
      sessionStorage.setItem("wallet_fund_amount", String(rawAmount));
      sessionStorage.setItem("wallet_fund_method", selectedMethod);

      window.location.href = authorizationUrl;
    } catch (error) {
      const msg = renderAxiosOrAuthError(error);
      ErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalLayout onClose={onClose} maxWidth="max-w-lg">
      {/* Step 1 — Amount */}
      {step === "amount" && (
        <>
          <div className="flex items-center justify-between px-5 py-8 border-b border-white/10">
            <p className="text-base font-bold">Fund Wallet</p>
            <CloseBtn onClose={onClose} />
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div>
              <p className="text-xs font-semibold mb-2">Enter Amount</p>
              <input
                type="text"
                inputMode="numeric"
                value={amount ? `₦${amount}` : ""}
                onChange={(e) =>
                  handleAmountInput(e.target.value.replace(/^₦/, ""))
                }
                placeholder="₦0.00"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base font-semibold text-dark placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors"
              />
              {rawAmount > 0 && rawAmount < 1000 && (
                <p className="text-xs text-red-500 mt-1">
                  Minimum amount is ₦1,000
                </p>
              )}
            </div>
            <button
              onClick={() => setStep("payment")}
              disabled={!amount || rawAmount < 1000}
              className="w-full py-3.5 bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all text-white text-sm font-semibold rounded-xl"
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}

      {/* Step 2 — Payment Method */}
      {step === "payment" && (
        <>
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep("amount")}
                className="border border-gray-300 rounded-md p-0.5 cursor-pointer"
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
              </button>
              <p className="text-base md:text-lg font-bold">Complete Payment</p>
            </div>
            <CloseBtn onClose={onClose} />
          </div>

          <div className="p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
              <span className="text-sm text-gray-500">Amount</span>
              <span className="font-bold text-dark">₦{amount}</span>
            </div>

            <p className="text-xs text-gray-500 font-medium">
              Choose Payment Method
            </p>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                {PAYMENT_METHODS.map((method) => {
                  const isSelected = selectedMethod === method.id;

                  return (
                    <div
                      key={method.id}
                      onClick={() =>
                        !method.soon &&
                        setSelectedMethod(method.id as PaymentMethod)
                      }
                      className={`flex items-center justify-between w-full p-3 rounded-xl border-2 transition-all
          ${
            method.soon
              ? "cursor-not-allowed opacity-70 border-gray-200"
              : isSelected
                ? "border-primary bg-green-50 cursor-pointer"
                : "border-gray-200 hover:border-gray-300 cursor-pointer"
          }`}
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={method.img}
                          alt={method.id}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <span className="font-semibold text-dark capitalize">
                            Pay with {method.id}
                          </span>
                          <p className="text-xs text-gray-500">{method.desc}</p>
                        </div>
                      </div>

                      {/* Coming soon badge */}
                      {method.soon ? (
                        <span className="text-[10px] bg-litegreen text-darkgreen px-2 py-1 rounded whitespace-nowrap">
                          Coming Soon
                        </span>
                      ) : (
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                            isSelected
                              ? "bg-primary border-primary"
                              : "border-gray-300"
                          }`}
                        >
                          {isSelected && (
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleInitiatePayment}
              disabled={loading}
              className="w-full py-3.5 bg-primary hover:bg-primary/90 disabled:opacity-50 active:scale-[0.98] transition-all text-white text-sm font-semibold rounded-xl"
            >
              {loading ? "Redirecting..." : `Pay ₦${amount}`}
            </button>
          </div>
        </>
      )}
    </ModalLayout>
  );
}
