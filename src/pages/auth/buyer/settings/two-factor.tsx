import React, { useState } from "react";
import { CheckCircle, ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";
import SuccessModal from "@/components/common/status/SuccessModal";
import OtpVerification from "@/components/common/auth/OtpVerification";

const TwoFactorSettings = () => {
  const router = useRouter();
  const [verify, setVerify] = useState(false)
  const [verified, setVerified] = useState(false)

  const verifyOtp = (code: string) => {
    console.log("Phone OTP verified:", code);
    setVerified(true);
  };
  const resendOtp = () => {
    console.log("Phone OTP resent");
  }
  const handleVerifyPhone = () => {
    // 👉 Trigger your OTP modal here
    setVerify(true)
    console.log("Open phone verification modal");
  };

  return (
    <div className="px-4">
      <div className=" mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 flex items-center gap-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} />
          <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Two Factor Authentication</h1>
        </button>

      </div>

      <div className="bg-white p-4 grid grid-cols-1 md:grid-cols-2 gap-5 w-full rounded-xl shadow-sm space-y-6">

        {/* Email Section */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>

          <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
            <span className="text-gray-700">naijajoshua1007@gmail.com</span>

            {/* Verified Badge */}
            <span className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs">
              <CheckCircle size={14} /> Verified
            </span>
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone Number
          </label>

          <div className="flex items-center gap-2">
            <input
              type="text"
              defaultValue="+234 7000000000"
              className="flex-1 bg-gray-100 p-3 rounded-lg outline-none"
            />

            <button
              onClick={handleVerifyPhone}
              className="px-4 py-2 border border-green-600 text-green-600 rounded-lg text-sm font-medium hover:bg-green-50 transition"
            >
              VERIFY
            </button>
          </div>
        </div>
      </div>


      <OtpVerification
        isOpen={verify}
        onClose={() => setVerify(false)}
        verificationType="phone"
        contactInfo="0812398232"
        otpLength={6}
        expiryTime={180}
        onVerifySuccess={(code) => verifyOtp(code)}
        onResend={resendOtp}
      />

      <SuccessModal
        isOpen={verified}
        title="You have successfully verified your phone number"
        onClose={() => setVerified(false)}
        back_cta={true}
        back_cta_title='Continue'
        back_cta_url='/auth/buyer/settings'
      />
    </div>
  );
};

export default TwoFactorSettings;
