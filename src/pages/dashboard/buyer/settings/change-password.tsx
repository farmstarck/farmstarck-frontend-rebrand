import React, { useState } from "react";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/router";
import { ErrorMessage } from "@/utils/PageUtils";
import SuccessModal from "@/components/common/status/SuccessModal";
import { useMutation } from "@tanstack/react-query";
import { userMutations } from "@/queries/user.queries";
import { renderAxiosOrAuthError } from "@/lib/axios-client";

// ── Defined outside so it never gets recreated on parent re-render ──
const PasswordInput = ({
  label,
  name,
  value,
  show,
  onChange,
  onToggle,
}: {
  label: string;
  name: string;
  value: string;
  show: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggle: () => void;
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  </div>
);

const ChangePassword = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const { mutate: changePassword, isPending } = useMutation({
    ...userMutations.changePassword(),
    onSuccess: () => setSuccess(true),
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggle = (field: "current" | "new" | "confirm") =>
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleSubmit = () => {
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      ErrorMessage("Please fill in all fields");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      ErrorMessage("New passwords do not match");
      return;
    }
    if (formData.newPassword.length < 6) {
      ErrorMessage("Password must be at least 6 characters");
      return;
    }
    changePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
          Change Password
        </h1>
      </div>

      <div className="bg-white rounded-2xl w-full shadow-sm p-6 lg:p-8">
        <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-5">
          <PasswordInput
            label="Current Password"
            name="currentPassword"
            value={formData.currentPassword}
            show={showPasswords.current}
            onChange={handleInputChange}
            onToggle={() => toggle("current")}
          />
          <PasswordInput
            label="New Password"
            name="newPassword"
            value={formData.newPassword}
            show={showPasswords.new}
            onChange={handleInputChange}
            onToggle={() => toggle("new")}
          />
          <PasswordInput
            label="Confirm New Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            show={showPasswords.confirm}
            onChange={handleInputChange}
            onToggle={() => toggle("confirm")}
          />
        </div>

        <div className="flex items-center flex-col gap-4 mt-4">
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full lg:w-2/3 mx-auto py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {isPending ? "Updating..." : "Reset Password"}
          </button>
          <p className="text-sm text-gray-500 text-center">
            New password should be strong and different from the previous one
          </p>
        </div>
      </div>

      <SuccessModal
        isOpen={success}
        title="Password changed successfully"
        onClose={() => setSuccess(false)}
        back_cta
        back_cta_title="Continue"
        back_cta_url="/dashboard/buyer/settings"
      />
    </div>
  );
};

export default ChangePassword;
