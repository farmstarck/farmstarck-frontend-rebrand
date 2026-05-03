"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import Image from "next/image";
import ModalLayout from "@/layouts/ModalLayout";
import CloseBtn from "@/components/common/Navigation/CloseBtn";
import { CustomDropDown } from "@/components/common/CustomDropDown";
import { Plus } from "lucide-react";
import ApiLoader from "@/components/common/ui/ApiLoader";

// ─── Types ───────────────────────────────────────────────────────────────────

type Step = "enter" | "confirm-bank" | "confirm-send" | "success" | "failure";

interface SavedBank {
  bankName: string;
  accountNumber: string;
  fullName: string;
  logoText: string; // e.g. "GTBank"
}

interface WithdrawModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  balance?: number; // in kobo or plain number
}

// ─── Mock saved bank ─────────────────────────────────────────────────────────

const DEFAULT_BANK: SavedBank = {
  bankName: "Guaranty Trust Bank",
  accountNumber: "0242099335",
  fullName: "NNAJI JOSHUA ARINZECHUKWU",
  logoText: "GTBank",
};

export const NIGERIAN_BANKS = [
  { label: "Access Bank", value: "Access Bank" },
  { label: "First Bank", value: "First Bank" },
  { label: "Guaranty Trust Bank", value: "Guaranty Trust Bank" },
  { label: "UBA", value: "UBA" },
  { label: "Zenith Bank", value: "Zenith Bank" },
  { label: "Fidelity Bank", value: "Fidelity Bank" },
  { label: "FCMB", value: "FCMB" },
  { label: "Sterling Bank", value: "Sterling Bank" },
  { label: "Union Bank", value: "Union Bank" },
  { label: "Stanbic IBTC", value: "Stanbic IBTC" },
  { label: "Polaris Bank", value: "Polaris Bank" },
  { label: "Wema Bank", value: "Wema Bank" },
  { label: "Keystone Bank", value: "Keystone Bank" },
  { label: "Ecobank", value: "Ecobank" },
  { label: "Heritage Bank", value: "Heritage Bank" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCurrency(amount: number) {
  return `N${amount.toLocaleString("en-NG")}`;
}

function parseCurrency(value: string) {
  return Number(value.replace(/[^0-9]/g, ""));
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="" aria-label="Close">
      <CloseBtn width={16} onClose={onClick} />
    </button>
  );
}

// ── Step 1: Enter Details ─────────────────────────────────────────────────────

function EnterDetailsStep({
  balance,
  onNext,
}: {
  balance: number;
  onNext: (
    amount: number,
    bank: string,
    account: string,
    name: string,
    saveDefault: boolean,
  ) => void;
}) {
  const [rawAmount, setRawAmount] = useState("50000");
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [fullName] = useState("Auto-filled");
  const [saveDefault, setSaveDefault] = useState(true);

  const amount = parseCurrency(rawAmount);

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/[^0-9]/g, "");
    setRawAmount(digits);
  }

  function handleMax() {
    setRawAmount(String(balance));
  }

  function handleSubmit() {
    if (!amount || !bank || !account) return;
    onNext(amount, bank, account, fullName, saveDefault);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Amount */}
      <div className="mt-2">
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-sm font-medium text-gray-700">
            Enter Amount
          </label>
          <span className="text-xs text-gray-500">
            Balance:{" "}
            <span className="font-medium text-gray-700">
              {formatCurrency(balance)}.00
            </span>
          </span>
        </div>
        <div className="relative flex items-center border border-gray-200 rounded-xl px-3.5 py-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
          <span className="text-[15px] font-semibold text-gray-900 mr-1">
            N
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={Number(rawAmount).toLocaleString("en-NG")}
            onChange={handleAmountChange}
            className="flex-1 outline-none text-[15px] font-semibold text-gray-900 bg-transparent min-w-0"
          />
          <button
            onClick={handleMax}
            className="text-[13px] font-bold text-primary ml-2 shrink-0"
          >
            MAX
          </button>
        </div>
      </div>

      {/* Bank Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Bank Name
        </label>
        <div className="relative w-full">
          <CustomDropDown
            options={NIGERIAN_BANKS}
            onChange={(e) => setBank(e)}
            placeholder="Select bank"
            value={bank}
            autoSelectFirst={false}
            width="full"
          />
        </div>
      </div>

      {/* Account Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Account Number
        </label>
        <input
          type="text"
          inputMode="numeric"
          maxLength={10}
          placeholder="Please enter account number"
          value={account}
          onChange={(e) => setAccount(e.target.value.replace(/\D/g, ""))}
          className="w-full border border-gray-200 rounded-xl px-3.5 py-3 text-[14px] placeholder:text-gray-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
        />
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Auto-filled"
          readOnly
          className="w-full border border-gray-200 rounded-xl px-3.5 py-3 text-[14px] placeholder:text-gray-400 bg-gray-50 outline-none cursor-not-allowed"
        />
      </div>

      {/* Withdraw Button */}
      <button
        onClick={handleSubmit}
        disabled={!amount || !bank || account.length < 10}
        className="w-full bg-primary text-white rounded-xl py-3.5 text-[15px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98] transition-all"
      >
        Withdraw
      </button>

      {/* Save as default */}
      <label className="flex items-center gap-2.5 cursor-pointer self-center">
        <div
          onClick={() => setSaveDefault(!saveDefault)}
          className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
            saveDefault ? "bg-primary" : "border border-gray-300"
          }`}
        >
          {saveDefault && (
            <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
              <path
                d="M1 4L4 7L10 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <span className="text-[13px] text-gray-600">
          Save as default bank account
        </span>
      </label>
    </div>
  );
}

// ── Step 2: Confirm Bank ──────────────────────────────────────────────────────

function ConfirmBankStep({
  bank,
  amount,
  balance,
  onNext,
  onAddBank,
}: {
  bank: SavedBank;
  amount: number;
  balance: number;
  onNext: () => void;
  onAddBank: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
    

      {/* Saved bank card */}
      <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-3">
        {/* Bank logo circle */}
        <div className="w-10 h-10 rounded-full bg-[#f0a500] flex items-center justify-center shrink-0">
          <span className="text-white text-[9px] font-bold leading-tight text-center">
            GT
            <br />
            Bank
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold text-gray-900">
              {bank.bankName}
            </span>
            <span className="text-[10px] font-semibold text-primary border border-primary rounded px-1.5 py-0.5 leading-none">
              DEFAULT
            </span>
          </div>
          <p className="text-[17px] font-bold text-gray-900 mt-0.5">
            {bank.accountNumber}
          </p>
          <p className="text-[12px] text-gray-500 uppercase tracking-wide">
            {bank.fullName}
          </p>
        </div>
        {/* Radio indicator */}
        <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
        </div>
      </div>

      {/* Amount */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-sm font-medium text-gray-700">
            Enter Amount
          </label>
          <span className="text-xs text-gray-500">
            Balance:{" "}
            <span className="font-medium text-gray-700">
              {formatCurrency(balance)}.00
            </span>
          </span>
        </div>
        <div className="flex items-center border border-gray-200 rounded-xl px-3.5 py-3">
          <span className="text-[15px] font-semibold text-gray-900 mr-1">
            N
          </span>
          <span className="flex-1 text-[15px] font-semibold text-gray-900">
            {amount.toLocaleString("en-NG")}
          </span>
          <span className="text-[13px] cursor-pointer font-bold text-primary">
            MAX
          </span>
        </div>
      </div>

      {/* Withdraw */}
      <button
        onClick={onNext}
        className="w-full bg-primary text-white rounded-xl py-3.5 text-[15px] font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
      >
        Withdraw
      </button>

      {/* Add another bank */}
      <button
        onClick={onAddBank}
        className="flex items-center gap-1.5 self-center text-[13px] font-semibold text-primary"
      >
        <div className="bg-primary p-0.3 rounded-full">
          <Plus className="text-white" size={11} />
        </div>
        Add another Bank
      </button>
    </div>
  );
}

// ── Step 3: Confirm Send ──────────────────────────────────────────────────────

function ConfirmSendStep({
  amount,
  recipientName,
  onConfirm,
  onBack,
}: {
  amount: number;
  recipientName: string;
  onConfirm: () => void;
  onBack: () => void;
}) {

   
  return (
    <div className="flex flex-col items-center gap-5 py-2">
      <p className="text-center text-[15px] text-gray-800 leading-relaxed max-w-[240px]">
        You are about to send{" "}
        <span className="font-bold">{formatCurrency(amount)}</span> to{" "}
        <span className="font-bold">{recipientName}.</span> Do you wish to
        proceed?
      </p>
      <button
        onClick={onConfirm}
        className="w-full bg-primary text-white rounded-xl py-3.5 text-[15px] font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
      >
        Yes, proceed
      </button>
      <button
        onClick={onBack}
        className="w-full border border-red-400 text-red-500 rounded-xl py-3.5 text-[15px] font-semibold hover:bg-red-50 active:scale-[0.98] transition-all"
      >
        No, go back
      </button>
    </div>
  );
}

// ── Step 4: Success ───────────────────────────────────────────────────────────

export interface SuccessStepProps {
  amount?: number;
  recipientName?: string;
  title?: string;
  message?: ReactNode;
  buttonText?: string;
  onContinue: () => void;
}

export function SuccessStep({
  title,
  message,
  buttonText = "Continue",
  onContinue,
}: SuccessStepProps) {

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <div className="mt-2">
        <Image
          width={100}
          height={100}
          src="/assets/images/status/success.png"
          alt="success img"
        />
      </div>
      {title && (
        <h3 className="text-center text-[18px] font-semibold text-gray-900">
          {title}
        </h3>
      )}
        <p className="text-center text-[15px] text-gray-800 leading-relaxed">
          {message}
        </p>
      <button
        onClick={onContinue}
        className="w-full bg-primary text-white rounded-xl py-3.5 text-[15px] font-semibold hover:opacity-90 active:scale-[0.98] transition-all mt-2"
      >
        {buttonText}
      </button>
    </div>
  );
}

// ── Step 5: Failure ───────────────────────────────────────────────────────────

function FailureStep({
  amount,
  onRetry,
  onClose,
}: {
  amount: number;
  onRetry: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <CloseButton onClick={onClose} />
      <div className="mt-2 w-[100px] h-[100px] rounded-full bg-red-100 flex items-center justify-center">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="24" fill="#FEE2E2" />
          <path
            d="M16 16L32 32M32 16L16 32"
            stroke="#EF4444"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className="text-center text-[15px] text-gray-800 leading-relaxed">
        Your withdrawal of{" "}
        <span className="font-bold">
          NGN{amount.toLocaleString("en-NG")}.00
        </span>{" "}
        failed. Please try again.
      </p>
      <button
        onClick={onRetry}
        className="w-full bg-primary text-white rounded-xl py-3.5 text-[15px] font-semibold hover:opacity-90 active:scale-[0.98] transition-all mt-2"
      >
        Try Again
      </button>
      <button
        onClick={onClose}
        className="w-full border border-gray-300 text-gray-600 rounded-xl py-3.5 text-[15px] font-semibold hover:bg-gray-50 active:scale-[0.98] transition-all"
      >
        Cancel
      </button>
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export default function WithdrawModal({
  open,
  onOpenChange,
  balance = 178050,
}: WithdrawModalProps) {
  const [step, setStep] = useState<Step>("enter");
  const [withdrawAmount, setWithdrawAmount] = useState(50000);
  const [selectedBank] = useState<SavedBank>(DEFAULT_BANK);
  const [isSubmitting,setIsSubmitting] = useState(false)


  // Simulate success/failure toggle for testing
  const simulateFailure = false;

  // Reset step when modal closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => setStep("enter"), 300);
    }
  }, [open]);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleEnterNext(amount: number) {
    setWithdrawAmount(amount);
    setStep("confirm-bank");
  }

  function handleConfirm() {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setStep(simulateFailure ? "failure" : "success");
    }, 2000);

  }

  const withdrawTextSteps = ["enter", "confirm-bank"];


  if (isSubmitting) {
    return (
      <ApiLoader loading={isSubmitting} />
    );
  }

  return (
    <>
      {/* Backdrop */}

      <ModalLayout onClose={close}>
        <div className={""}>
          {/* Drag handle (mobile only) */}
          <div className="sm:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-gray-300" />
          </div>

          <div className="flex items-center mt-5 justify-between w-11/12 mx-auto">
            { withdrawTextSteps.includes(step) && (
              <h2 className="text-[17px] font-semibold text-gray-900">
                Withdraw Funds
              </h2>
            )}
            <CloseButton onClick={close} />
          </div>

          <div className="px-5 pt-4 pb-6 relative">
            {step === "enter" && (
              <EnterDetailsStep
                balance={balance}
                onNext={handleEnterNext}
              />
            )}
            {step === "confirm-bank" && (
              <ConfirmBankStep
                bank={selectedBank}
                amount={withdrawAmount}
                balance={balance}
                onNext={() => setStep("confirm-send")}
                onAddBank={() => setStep("enter")}
              />
            )}
            {step === "confirm-send" && (
              <ConfirmSendStep
                amount={withdrawAmount}
                recipientName="Nnaji Joshua Arinzechukwu"
                onConfirm={handleConfirm}
                onBack={() => setStep("confirm-bank")}
              />
            )}
            {step === "success" && (
              <SuccessStep
                amount={withdrawAmount}
                recipientName="Nnaji Joshua"
                onContinue={close}
              />
            )}
            {step === "failure" && (
              <FailureStep
                amount={withdrawAmount}
                onRetry={() => setStep("enter")}
                onClose={close}
              />
            )}
          </div>

          {/* Dev simulator toggle — remove in prod */}
          {/* {(step === "enter" ||
            step === "confirm-bank" ||
            step === "confirm-send") && (
            <div className="border-t border-gray-100 px-5 py-3 flex items-center gap-2">
              <button
                onClick={() => setSimulateFailure(!simulateFailure)}
                className={`text-[11px] px-2.5 py-1 rounded-full font-semibold border transition-colors ${
                  simulateFailure
                    ? "bg-red-50 border-red-300 text-red-500"
                    : "bg-green-50 border-green-300 text-green-600"
                }`}
              >
                Simulate: {simulateFailure ? "Failure" : "Success"}
              </button>
              <span className="text-[11px] text-gray-400">
                Click to toggle outcome
              </span>
            </div>
          )} */}
        </div>
      </ModalLayout>
    </>
  );
}
