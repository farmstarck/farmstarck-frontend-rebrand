"use client";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bankMutations, bankQueries } from "@/queries/bank.queries";
import { ErrorMessage, SuccessMessage } from "@/utils/PageUtils";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { CustomDropDown } from "@/components/common/CustomDropDown";
import BankService from "@/services/bank.service";

interface AddBankModalProps {
  onClose: () => void;
}

const AddBankModal = ({ onClose }: AddBankModalProps) => {
  const queryClient = useQueryClient();

  const [selectedBankId, setSelectedBankId] = useState("");
  const [selectedBankCode, setSelectedBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  // Fetch all banks for dropdown
  const { data: banks = [], isLoading: isLoadingBanks } = useQuery(
    bankQueries.banks(),
  );

  const { mutate: addBank, isPending } = useMutation({
    ...bankMutations.addBank(),
    onSuccess: () => {
      SuccessMessage("Bank account added successfully");
      queryClient.invalidateQueries({ queryKey: bankQueries.all });
      onClose();
    },
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  // Auto-verify via Paystack when 10 digits + bank selected
  useEffect(() => {
    if (accountNumber.length === 10 && selectedBankCode) {
      setIsVerifying(true);
      setAccountHolderName("");
      setVerifyError("");

      BankService.verifyAccountNumber(accountNumber, selectedBankCode)
        .then((res) => {
          const name = res?.data?.data.account_name;
          if (name) {
            setAccountHolderName(name);
          } else {
            setVerifyError("Account not found. Please check the details.");
          }
        })
        .catch(() => {
          setVerifyError("Could not verify account. Please check the details.");
        })
        .finally(() => setIsVerifying(false));
    } else {
      setAccountHolderName("");
      setVerifyError("");
    }
  }, [accountNumber, selectedBankCode]);

  const handleBankChange = (bankId: string) => {
    setSelectedBankId(bankId);
    // code is stored on the option object
    const bank = banks.find((b: any) => b.value === bankId);
    setSelectedBankCode(bank?.code ?? "");
    setAccountHolderName("");
    setVerifyError("");
  };

  const handleSubmit = () => {
    if (!selectedBankId || accountNumber.length !== 10 || !accountHolderName) {
      ErrorMessage("Please complete all fields and verify your account");
      return;
    }
    addBank({
      bankId: selectedBankId,
      data: {
        accountNumber,
        accountHolderName,
      },
    });
  };

  return (
    <div className="flex flex-col gap-5 p-2">
      {/* Bank Name */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Bank Name
        </label>
        <CustomDropDown
          options={banks}
          onChange={handleBankChange}
          placeholder={isLoadingBanks ? "Loading banks..." : "Select your bank"}
          value={selectedBankId}
          autoSelectFirst={false}
          width="full"
          searchable
          searchholder="Search banks..."
          disabled={isLoadingBanks}
        />
      </div>

      {/* Account Number */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Account Number
        </label>
        <input
          type="tel"
          value={accountNumber}
          onChange={(e) =>
            setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          placeholder="10-digit account number"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm"
        />
        <p className="text-xs text-gray-400 mt-1">
          {accountNumber.length}/10 digits
        </p>
      </div>

      {/* Account Name — auto-filled via Paystack */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Account Name
        </label>
        <div className="relative">
          <input
            type="text"
            value={isVerifying ? "" : accountHolderName}
            readOnly
            placeholder={
              isVerifying
                ? "Verifying with Paystack..."
                : "Auto-filled after verification"
            }
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
              accountHolderName
                ? "border-green-300 bg-green-50 text-green-800 font-semibold"
                : verifyError
                  ? "border-red-200 bg-red-50 text-red-500"
                  : "border-gray-200 bg-gray-50 text-gray-400"
            }`}
          />
          {isVerifying && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-gray-400">Verifying...</span>
            </div>
          )}
          {accountHolderName && !isVerifying && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
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
              </div>
            </div>
          )}
        </div>
        {verifyError && (
          <p className="text-xs text-red-500 mt-1">{verifyError}</p>
        )}
      </div>

      <p className="text-xs text-gray-400 -mt-2">
        Account name is verified directly with Paystack. Farmstarck is not
        responsible for transfers to incorrect accounts.
      </p>

      <button
        onClick={handleSubmit}
        disabled={
          !selectedBankId ||
          accountNumber.length !== 10 ||
          !accountHolderName ||
          isPending ||
          isVerifying
        }
        className="w-full py-3.5 bg-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center justify-center gap-2"
      >
        {isPending && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
        {isPending ? "Saving..." : "Save Bank Account"}
      </button>
    </div>
  );
};

export default AddBankModal;
