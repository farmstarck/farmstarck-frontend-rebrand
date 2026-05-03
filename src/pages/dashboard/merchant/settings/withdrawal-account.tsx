import FormInput from "@/components/common/auth/FormInput";
import { CustomDropDown } from "@/components/common/CustomDropDown";
import ApiLoader from "@/components/common/ui/ApiLoader";
import { NIGERIAN_BANKS } from "@/components/dashboard/merchant/WithdrawModal";
import DashBoardWrapper from "@/components/dashboard/ui/DashBoardWrapper";
import ConfirmDeletion from "@/components/dashboard/ui/ConfirmDeletion";
import SuccessConfirmationModal from "@/components/dashboard/ui/SuccessConfirmationModal";
import ModalLayout from "@/layouts/ModalLayout";
import Image from "next/image";
import { MoreVertical, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AccountActionModal, SavedAccount } from "@/components/dashboard/ui/AccountActionModal";

type Status = "adding" | "success" | "";
type DeleteFlow = "confirm" | "deleting" | "success" | null;
type SetDefaultStatus = "saving" | "success" | null;



interface AddAccountProps {
  onClose: () => void;
  onSave: (account: SavedAccount) => void;
  open: boolean;
}



const HARD_CODED_ACCOUNTS: SavedAccount[] = [
  {
    id: "gtbank-default",
    bankName: "Guaranty Trust Bank",
    accountNumber: "0242099335",
    accountName: "NNAJI JOSHUA ARINZECHUKWU",
    isDefault: true,
  },
  {
    id: "opay-second",
    bankName: "Opay Technologies",
    accountNumber: "7053539199",
    accountName: "NNAJI JOSHUA ARINZECHUKWU",
  },
];

const getBankAccent = (bankName: string) => {
  if (bankName.toLowerCase().includes("guaranty")) {
    return {
      bg: "bg-[#F36B21]",
      ring: "ring-[#FDE1D3]",
      text: "GTBank",
    };
  }

  if (bankName.toLowerCase().includes("opay")) {
    return {
      bg: "bg-[#15C39A]",
      ring: "ring-[#BDF3E5]",
      text: "OP",
    };
  }

  return {
    bg: "bg-primary",
    ring: "ring-[#D9F5D4]",
    text: bankName.slice(0, 2).toUpperCase(),
  };
};

const AddAccount = ({ onClose, onSave, open }: AddAccountProps) => {
  const [formData, setFormData] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
  });
  const [status, setStatus] = useState<Status>("");

  useEffect(() => {
    if (formData.bankName && formData.accountNumber.length === 10) {
      setFormData((prev) => ({
        ...prev,
        accountName: "Auto-filled account name",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      accountName: "",
    }));
  }, [formData.bankName, formData.accountNumber]);

  const handleClose = () => {
    setStatus("");
    setFormData({
      accountName: "",
      accountNumber: "",
      bankName: "",
    });
    onClose();
  };

  const handleAddAccount = () => {
    if (
      !formData.bankName ||
      formData.accountNumber.length !== 10 ||
      !formData.accountName
    ) {
      return;
    }

    setStatus("adding");

    window.setTimeout(() => {
      onSave({
        id: `bank-${Date.now()}`,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        accountName: formData.accountName.toUpperCase(),
      });
      setStatus("success");
    }, 1500);
  };

  if (!open) return null;

  if (status === "adding") {
    return <ApiLoader loading />;
  }

  return (
    <>
      {status === "" ? (
        <ModalLayout onClose={handleClose}>
          <div className="w-full max-w-md mx-auto bg-white rounded-[24px] px-6 py-7">
            <div className="font-bold text-center mb-5 text-lg capitalize">
              Add new account
            </div>
            <div className="flex items-start flex-col gap-6 w-full">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Bank Name
                </label>
                <div className="relative w-full">
                  <CustomDropDown
                    options={NIGERIAN_BANKS}
                    onChange={(e) => setFormData({ ...formData, bankName: e })}
                    placeholder="Please select bank"
                    value={formData.bankName}
                    autoSelectFirst={false}
                    width="full"
                  />
                </div>
              </div>

              <FormInput
                label="Account Number"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e })}
                name="accountNumber"
                placeholder="Please enter account number"
                textClass="text-sm"
                bold={false}
                type="numeric"
                maxLength={10}
              />

              <FormInput
                label="Full Name"
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e })}
                name="accountName"
                placeholder="Auto-filled (If account number is correct)"
                textClass="text-sm"
                bold={false}
                readOnly={true}
              />

              <button
                type="button"
                onClick={handleAddAccount}
                disabled={
                  !formData.bankName ||
                  formData.accountNumber.length !== 10 ||
                  !formData.accountName
                }
                className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Save Bank Account
              </button>
              <p className="max-w-lg text-center text-xs text-gray-600">
                Please make sure this bank account details belongs to you as we
                will not be responsible for loss of funds.
              </p>
            </div>
          </div>
        </ModalLayout>
      ) : (
        <SuccessConfirmationModal
          onClose={handleClose}
          title="Bank account added"
          message="has been added successfully."
          boldTitle={formData.bankName}
        />
      )}
    </>
  );
};



const BankCard = ({
  account,
  onOpenActions,
}: {
  account: SavedAccount;
  onOpenActions: (account: SavedAccount) => void;
}) => {
  const accent = getBankAccent(account.bankName);

  return (
    <div className="w-full rounded-[20px] border border-[#97A1B01F] bg-white px-5 py-5 shadow-[0_0_0_1px_rgba(120,130,150,0.12)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${accent.bg} text-[10px] font-bold text-white ring-4 ${accent.ring}`}
          >
            {accent.text}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-[18px] font-semibold text-[#3D4350] leading-none">
              {account.bankName}
            </p>
            {account.isDefault && (
              <span className="rounded-md bg-[#A2F1A8] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-[#368A3E]">
                Default
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpenActions(account)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F1F1F1] text-[#8A8A8A]"
          aria-label={`More actions for ${account.bankName}`}
        >
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="mt-7">
        <p className="text-[20px] font-bold tracking-[0.02em] text-[#454A53] sm:text-[22px]">
          {account.accountNumber}
        </p>
        <p className="mt-1 text-[14px] font-semibold uppercase tracking-[0.08em] text-[#4E535D]">
          {account.accountName}
        </p>
      </div>
    </div>
  );
};

const WithdrawalAccount = () => {
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [accounts, setAccounts] = useState<SavedAccount[]>(HARD_CODED_ACCOUNTS);
  const [deleteAll, setDeleteAll] = useState<DeleteFlow>(null);
  const [deleteOne, setDeleteOne] = useState<DeleteFlow>(null);
  const [setDefaultStatus, setSetDefaultStatus] = useState<SetDefaultStatus>(null);
  const [actionAccount, setActionAccount] = useState<SavedAccount | null>(null);
  const [targetAccount, setTargetAccount] = useState<SavedAccount | null>(null);
  const [successAccountName, setSuccessAccountName] = useState("");

  const hasAccounts = accounts.length > 0;
  const isProcessing =
    deleteAll === "deleting" ||
    deleteOne === "deleting" ||
    setDefaultStatus === "saving";

  const handleSaveAccount = (account: SavedAccount) => {
    setAccounts((prev) => [...prev, account]);
  };

  const handleDeleteAll = () => {
    setDeleteAll("deleting");
    window.setTimeout(() => {
      setAccounts([]);
      setSuccessAccountName("All bank accounts");
      setDeleteAll("success");
    }, 1500);
  };

  const handleDeleteOne = () => {
    if (!targetAccount) return;

    setDeleteOne("deleting");
    window.setTimeout(() => {
      setAccounts((prev) =>
        prev.filter((account) => account.id !== targetAccount.id),
      );
      setSuccessAccountName(targetAccount.bankName);
      setDeleteOne("success");
    }, 1500);
  };

  const handleSetDefault = (account: SavedAccount) => {
    setActionAccount(null);
    setSetDefaultStatus("saving");
    window.setTimeout(() => {
      setAccounts((prev) =>
        prev.map((item) => ({
          ...item,
          isDefault: item.id === account.id,
        })),
      );
      setSuccessAccountName(account.bankName);
      setSetDefaultStatus("success");
    }, 1000);
  };

  return (
    <DashBoardWrapper
      href="/dashboard/merchant/settings"
      label="Withdrawal Accounts"
    >
      <div className="w-full min-h-[70dvh]">
        {hasAccounts ? (
          <div className="w-full max-w-[540px] mx-auto">
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={() => setDeleteAll("confirm")}
                className="inline-flex items-center gap-2 rounded-[8px] bg-[#F24747] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#de3f3f]"
              >
                <Trash2 size={15} />
                Delete All
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {accounts.map((account) => (
                <BankCard
                  key={account.id}
                  account={account}
                  onOpenActions={setActionAccount}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowAddAccount(true)}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-[12px] bg-[#00D400] px-5 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#00bf00]"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#00C900]">
                <Plus size={16} strokeWidth={3} />
              </span>
              Add Account
            </button>
          </div>
        ) : (
          <div className="w-full h-full min-h-[70dvh] flex items-center justify-center">
            <div className="w-11/12 mx-auto flex items-center flex-col gap-10">
              <Image
                src="/assets/images/dashboard/merchant/bank_house.png"
                alt="Withdrawal Account"
                width={150}
                height={200}
                className="h-auto"
              />
              <div className="flex items-center flex-col gap-4 w-full">
                <p className="text-center max-w-sm font-medium">
                  You do not have any account added yet. Kindly click the link
                  below to add one
                </p>
                <div className="w-full lg:w-11/12 mx-auto">
                  <button
                    type="button"
                    onClick={() => setShowAddAccount(true)}
                    className="mx-auto flex w-full items-center justify-center gap-3 rounded-[12px] bg-primary px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 lg:w-1/2"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-primary">
                      <Plus size={16} strokeWidth={3} />
                    </span>
                    Add Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAddAccount && (
          <AddAccount
            onClose={() => setShowAddAccount(false)}
            onSave={handleSaveAccount}
            open={showAddAccount}
          />
        )}

        {actionAccount && (
          <AccountActionModal
            account={actionAccount}
            onClose={() => setActionAccount(null)}
            onSetDefault={() => handleSetDefault(actionAccount)}
            onDelete={() => {
              setTargetAccount(actionAccount);
              setActionAccount(null);
              setDeleteOne("confirm");
            }}
          />
        )}

        {isProcessing && <ApiLoader loading />}

        {deleteAll === "confirm" && (
          <ConfirmDeletion
            closeModal={() => setDeleteAll(null)}
            isOpen={deleteAll === "confirm"}
            cancelText="No, go back"
            confirmText="Yes, continue"
            message="Are you sure you want to delete all accounts?"
            onConfirm={handleDeleteAll}
            closeAfterConfirm={false}
          />
        )}

        {deleteAll === "success" && (
          <SuccessConfirmationModal
            onClose={() => {
              setDeleteAll(null);
              setSuccessAccountName("");
            }}
            title="Bank accounts deleted"
            message="has been deleted successfully."
            boldTitle={successAccountName}
          />
        )}

        {deleteOne === "confirm" && (
          <ConfirmDeletion
            closeModal={() => setDeleteOne(null)}
            isOpen={deleteOne === "confirm"}
            cancelText="No, go back"
            confirmText="Yes, continue"
            message={`Are you sure you want to delete ${targetAccount?.bankName ?? "this account"}?`}
            onConfirm={handleDeleteOne}
            closeAfterConfirm={false}
          />
        )}

        {deleteOne === "success" && (
          <SuccessConfirmationModal
            onClose={() => {
              setDeleteOne(null);
              setTargetAccount(null);
              setSuccessAccountName("");
            }}
            title="Bank account deleted"
            message="has been deleted successfully."
            boldTitle={successAccountName}
          />
        )}

        {setDefaultStatus === "success" && (
          <SuccessConfirmationModal
            onClose={() => {
              setSetDefaultStatus(null);
              setSuccessAccountName("");
            }}
            title="Successful"
            message="saved as default."
            boldTitle={successAccountName}
          />
        )}
      </div>
    </DashBoardWrapper>
  );
};

export default WithdrawalAccount;
