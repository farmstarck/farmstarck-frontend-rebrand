import React, { useEffect, useState } from "react";
import { CheckCircle, ChevronLeft, Clock } from "lucide-react";
import { useRouter } from "next/router";
import SuccessModal from "@/components/common/status/SuccessModal";
import OtpVerification from "@/components/common/auth/OtpVerification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userMutations, userQueries } from "@/queries/user.queries";
import { ErrorMessage } from "@/utils/PageUtils";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import Image from "next/image";

const TwoFactorSettings = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [phoneInput, setPhoneInput] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [success, setSuccess] = useState(false);
  const [otpSentTo, setOtpSentTo] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  // ── Profile data ─────────────────────────────────────────────────
  const { data: profile } = useQuery(userQueries.profile());

  // Sync from profile once loaded
  useEffect(() => {
    if (profile?.enable2FA !== undefined) {
      setIs2FAEnabled(profile.enable2FA);
    }
  }, [profile?.enable2FA]);

  const { mutate: toggle2FA, isPending: isToggling } = useMutation({
    ...userMutations.toggle2FA(),
    onMutate: (enable: boolean) => {
      // Optimistically update local state immediately
      setIs2FAEnabled(enable);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueries.all });
    },
    onError: (err) => {
      // Revert on failure
      setIs2FAEnabled(!is2FAEnabled);
      ErrorMessage(renderAxiosOrAuthError(err));
    },
  });

  useEffect(() => {
    if (profile?.phoneNumber) setPhoneInput(profile.phoneNumber);
  }, [profile]);

  const isPhoneVerified = !!profile?.phoneNumber;
  const isEmailVerified = !!profile?.isEmailVerified;

  // ── Mutations ────────────────────────────────────────────────────
  const { mutate: sendOtp, isPending: isSending } = useMutation({
    ...userMutations.sendPhoneOtp(),
    onSuccess: (res) => {
      setOtpSentTo(res.data?.sentTo ?? profile?.email ?? "your email");
      setShowOtp(true);
    },
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  const { mutate: verifyOtp, isPending: isVerifying } = useMutation({
    ...userMutations.verifyPhoneOtp(),
    onSuccess: () => {
      setShowOtp(false);
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: userQueries.all });
    },
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  const handleSendOtp = () => {
    if (!phoneInput) {
      ErrorMessage("Please enter a phone number");
      return;
    }
    sendOtp(phoneInput);
  };

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
            Two Factor Authentication
          </h1>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 space-y-6">
        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-700">
          Verify your contact details to keep your account secure. OTP codes are
          sent to your email until SMS integration is available.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email Address
            </label>
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl">
              <span className="text-gray-700 text-sm truncate">
                {profile?.email ?? "—"}
              </span>
              {isEmailVerified ? (
                <span className="flex items-center gap-1 text-green-600 bg-green-100 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ml-2">
                  <CheckCircle size={12} /> Verified
                </span>
              ) : (
                <span className="flex items-center gap-1 text-orange-500 bg-orange-50 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ml-2">
                  <Clock size={12} /> Pending
                </span>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Phone Number
            </label>
            <div className="flex items-center gap-2">
              <div className="flex flex-1 items-center gap-1 px-2 border border-gray-200 rounded-xl bg-gray-50">
                <Image
                  width={28}
                  height={28}
                  src="/assets/images/flags/ng_flag.png"
                  alt="Nigerian flag"
                  className="rounded-full shrink-0"
                />
                <input
                  type="tel"
                  value={phoneInput}
                  onChange={(e) =>
                    setPhoneInput(e.target.value.replace(/\D/g, ""))
                  }
                  className="flex-1 bg-transparent px-2 py-3 outline-none text-sm"
                  placeholder="08012345678"
                />
                {isPhoneVerified && (
                  <CheckCircle
                    size={16}
                    className="text-green-500 shrink-0 mr-1"
                  />
                )}
              </div>
              <button
                onClick={handleSendOtp}
                disabled={isSending}
                className="px-4 py-3 border border-primary text-primary rounded-xl text-sm font-semibold hover:bg-primary hover:text-white transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {isSending
                  ? "Sending..."
                  : isPhoneVerified
                    ? "Re-verify"
                    : "Verify"}
              </button>
            </div>
            {isPhoneVerified && (
              <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1">
                <CheckCircle size={11} /> Phone number verified
              </p>
            )}
            <p className="text-xs text-gray-400 mt-1.5">
              OTP will be sent to your registered email address
            </p>
          </div>
        </div>

        {/* 2FA Toggle */}
        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                Enable Two-Factor Authentication
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {is2FAEnabled
                  ? "2FA is active — you'll receive an OTP code by email on each login"
                  : "Add an extra layer of security to your account"}
              </p>
              {!isPhoneVerified && !is2FAEnabled && (
                <p className="text-xs text-orange-500 mt-1">
                  Verify your phone number above before enabling 2FA
                </p>
              )}
            </div>
            <button
              onClick={() => toggle2FA(!is2FAEnabled)}
              disabled={isToggling || (!isPhoneVerified && !is2FAEnabled)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 disabled:opacity-40 ${
                is2FAEnabled ? "bg-primary" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  is2FAEnabled ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      <OtpVerification
        isOpen={showOtp}
        onClose={() => setShowOtp(false)}
        verificationType="email"
        contactInfo={otpSentTo}
        otpLength={6}
        expiryTime={300}
        onVerifySuccess={(code) =>
          verifyOtp({ phoneNumber: phoneInput, otp: code })
        }
        onResend={() => sendOtp(phoneInput)}
      />

      <SuccessModal
        isOpen={success}
        title="Phone number verified successfully"
        onClose={() => setSuccess(false)}
        back_cta
        back_cta_title="Continue"
        back_cta_url="/dashboard/buyer/settings"
      />
    </div>
  );
};

export default TwoFactorSettings;
