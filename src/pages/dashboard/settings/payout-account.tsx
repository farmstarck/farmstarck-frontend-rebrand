import React, { useState } from "react";
import { ChevronLeft, Plus } from "lucide-react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bankMutations, bankQueries } from "@/queries/bank.queries";
import { ErrorMessage, SuccessMessage } from "@/utils/PageUtils";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import DashboardLayout from "@/layouts/DashboardLayout";
import { BackDrop } from "@/components/common/BackDrop";
import BankCard from "@/components/dashboard/merchant/BankCard";
import AddBankModal from "@/components/dashboard/merchant/AddBankModal";
import ConfirmDeletion from "@/components/dashboard/ui/ConfirmDeletion";
import Image from "next/image";

const PayoutAccount = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [showAddModal, setShowAddModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: bankDetailsResponse = [], isLoading } = useQuery(
    bankQueries.userBankDetails(),
  );

  const bankDetails = bankDetailsResponse.data ?? [];

  const { mutate: deleteBank, isPending: isDeleting } = useMutation({
    ...bankMutations.deleteBank(),
    onSuccess: () => {
      SuccessMessage("Bank account removed");
      queryClient.invalidateQueries({ queryKey: bankQueries.all });
      setDeletingId(null);
    },
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  const { mutate: setDefault } = useMutation({
    ...bankMutations.setDefaultBank(),
    onSuccess: () => {
      SuccessMessage("Default bank updated");
      queryClient.invalidateQueries({ queryKey: bankQueries.all });
    },
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 flex items-center gap-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} />
          <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
            Payout Accounts
          </h1>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            {bankDetails.length} account
            {bankDetails.length !== 1 ? "s" : ""} saved
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus size={16} />
            Add Account
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : bankDetails.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Image
              src="/assets/images/dashboard/merchant/bank_house.png"
              alt="No accounts"
              width={120}
              height={120}
              className="opacity-70"
            />
            <p className="text-gray-500 font-semibold text-sm text-center max-w-xs">
              No payout accounts yet. Add a bank account to start receiving
              payments.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Plus size={16} />
              Add Your First Account
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(bankDetails as { id: string; bank?: { name?: string }; isDefault?: boolean; paystackRecipientCode?: string; accountNumber: string; accountHolderName: string }[]).map((detail) => (
              <BankCard
                key={detail.id}
                detail={detail}
                onDelete={(id) => setDeletingId(id)}
                onSetDefault={(id) => setDefault(id)}
              />
            ))}
          </div>
        )}

        {/* Info box */}
        {bankDetails.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-xs text-blue-700">
              Your <strong>default account</strong> is used for all automatic
              and manual payouts. Make sure it&apos;s correct before requesting a
              payout.
            </p>
          </div>
        )}
      </div>

      {/* Add Bank Modal */}
      <BackDrop
        isOpen={showAddModal}
        handleClose={() => setShowAddModal(false)}
        title="Add Bank Account"
      >
        <AddBankModal onClose={() => setShowAddModal(false)} />
      </BackDrop>

      {/* Delete confirmation */}
      {deletingId && (
        <ConfirmDeletion
          isOpen={!!deletingId}
          closeModal={() => setDeletingId(null)}
          message="Are you sure you want to remove this bank account?"
          cancelText="No, keep it"
          confirmText={isDeleting ? "Removing..." : "Yes, Remove"}
          onConfirm={() => deleteBank(deletingId!)}
          closeAfterConfirm={false}
        />
      )}
    </div>
  );
};

PayoutAccount.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default PayoutAccount;
