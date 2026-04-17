import FormInput from "@/components/common/auth/FormInput";
import { CustomDropDown } from "@/components/common/CustomDropDown";
import { NIGERIAN_BANKS } from "@/components/dashboard/merchant/WithdrawModal";
import DashBoardWrapper from "@/components/dashboard/ui/DashBoardWrapper";
import ModalLayout from "@/layouts/ModalLayout";
import Button from "@/ui/Button";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AddAccountProps {
  onClose: () => void;
  open: boolean;
}

const AddAccount = ({ onClose, open }: AddAccountProps) => {
  const [formData, setFormData] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
  });

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

  if (!open) return null;
  return (
    <ModalLayout onClose={onClose}>
      <div className="w-full max-w-md mx-auto bg-white rounded-lg p-6">
        <div className="font-bold text-center mb-5 text-lg capitalize">
          {" "}
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

          <div className="w-full">
              <Button
                textClass="w-full !py-3"
                label="Save Bank Account"
              />
            </div>
            <p className="max-w-lg text-center text-xs text-gray-600">Please make sure this bank account details belongs to you as we will not be responsible for loss of funds.</p>
        </div>
      </div>
    </ModalLayout>
  );
};

const WithdrawalAccount = () => {
  const [showAddAccount, setShowAddAccount] = useState(false);
  return (
    <DashBoardWrapper
      href="/dashboard/merchant/settings"
      label="Withdrawal Account"
    >
      <div className="w-full min-h-[70dvh] flex items-center justify-center">
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
              You do not have any account added yet. Kindly click the link below
              to add one{" "}
            </p>
            <div className="w-full lg:w-11/12 mx-auto">
              <Button
                onClick={() => setShowAddAccount(true)}
                showIcon={true}
                icon="plus"
                textClass="w-full lg:w-1/2 mx-auto"
                label="Add Account"
              />
            </div>
          </div>
        </div>
        {showAddAccount && (
          <AddAccount
            onClose={() => setShowAddAccount(false)}
            open={showAddAccount}
          />
        )}
      </div>
    </DashBoardWrapper>
  );
};

export default WithdrawalAccount;
