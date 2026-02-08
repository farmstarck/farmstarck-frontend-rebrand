import { AuthInput } from "@/components/common/auth/AuthInput";
import SuccessModal from "@/components/common/status/SuccessModal";
import { emailRegex, ErrorMessage } from "@/utils/PageUtils";
import React, { useState } from "react";
import AuthService from "@/services/auth.service";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import ButtonSpinner from "@/components/common/ButtonSpinner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitEmail = async () => {
    if (email.trim() === "" || !emailRegex.test(email)) {
      ErrorMessage("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      await AuthService.forgetPassword({
        email,
      });
      setSubmitted(true);
    } catch (error) {
      ErrorMessage(renderAxiosOrAuthError(error));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg border rounded-lg w-11/12 mx-auto bg-white px-8 py-16 border-gray-100 shadow-md flex items-center flex-col gap-4">
        <div className="text-center">
          <h1 className="font-bold text-xl lg:text-3xl">
            Forgot Your Password?
          </h1>
          <p className="text-sm">
            Enter your email address to get a reset link
          </p>
        </div>

        <AuthInput
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(value) => setEmail(value)}
          icon="email"
        />

        <button
          type="button"
          disabled={loading}
          onClick={submitEmail}
          className=" w-full py-3.5 rounded-full bg-primary hover:bg-[#00DD00] text-white font-semibold transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <ButtonSpinner /> : "Submit"}
        </button>
      </div>

      <SuccessModal
        title="Request Successful"
        description={`We have sent you a password reset link on your email: ${email}. Kindly check your inbox or spam box to continue.`}
        isOpen={submitted}
        back_cta={true}
        back_cta_title="Go back home"
        back_cta_url="/"
        onClose={() => setSubmitted(false)}
      />
    </div>
  );
};

export default ForgotPassword;
