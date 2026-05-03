import ModalLayout from "@/layouts/ModalLayout";
import Image from "next/image";

export type SavedAccount = {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  isDefault?: boolean;
};

interface AccountActionModalProps {
  account: SavedAccount;
  onClose: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}

export const AccountActionModal = ({
  account,
  onClose,
  onDelete,
  onSetDefault,
}: AccountActionModalProps) => {
  return (
    <ModalLayout onClose={onClose} maxWidth="max-w-sm">
      <div className="relative bg-white px-6 py-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-500 hover:text-gray-700"
          aria-label={`Close account action modal for ${account.bankName}`}
        >
          <Image
            src="/assets/images/status/cancel.png"
            alt="cancel img"
            width={20}
            height={20}
          />
        </button>

        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.08em] text-gray-400">
          Account Action
        </p>

        <div className="flex flex-col gap-3 pt-4">
          <button
            type="button"
            onClick={onSetDefault}
            className="text-left text-[15px] font-medium text-[#262626] transition-colors hover:text-primary"
          >
            Set as Default
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="text-left text-[15px] font-medium text-[#FF3B30] transition-colors hover:text-[#e2352b]"
          >
            Delete Account
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};