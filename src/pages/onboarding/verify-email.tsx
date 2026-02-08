// pages/verify-email.tsx
import React, { useState, useRef, useEffect } from "react";
import { X, Mail } from "lucide-react";
import { useRouter } from "next/router";
import { useNavigate } from "@/hooks/useNavigate";
import Image from "next/image";
import { ErrorMessage, SuccessMessage } from "@/utils/PageUtils";
import SuccessModal from "@/components/common/status/SuccessModal";
import AuthService from "@/services/auth.service";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import ButtonSpinner from "@/components/common/ButtonSpinner";
import { useAuthStore } from "@/store/slices/auth.slice";
import ApiLoader from "@/components/common/ui/ApiLoader";

const OTP_DURATION = 5 * 60;

const VerifyEmail = () => {
  const router = useRouter();
  const { navigate } = useNavigate();
  const pendingEmail = useAuthStore((state) => state.unVerifiedEmail);
  const finishEmailVerification = useAuthStore(
    (state) => state.finishEmailVerification,
  );
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(OTP_DURATION);
  const [isExpired, setIsExpired] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (typeof pendingEmail === "string") {
      setEmail(pendingEmail);
    }
  }, [pendingEmail]);

  // Countdown timer
  useEffect(() => {
    if (timer > 0 && !isExpired) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsExpired(true);
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [timer, isExpired]);

  // Format timer display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")} : ${secs.toString().padStart(2, "0")}`;
  };

  // Handle OTP input change
  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last digit
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus last filled input or next empty
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  // Handle proceed
  const handleProceed = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      return ErrorMessage("Otp incomplete");
    }

    try {
      setLoading(true);
      const { data } = await AuthService.verifyOtp({
        email,
        otp: otpCode,
      });

      await finishEmailVerification({
        accessToken: data.token,
      });

      const redirect = localStorage.getItem("redirectAfterAuth");

      if (redirect) {
        localStorage.removeItem("redirectAfterAuth");
        navigate(redirect);
      } else {
        navigate("/market/marketplace");
      }
    } catch (error) {
      ErrorMessage(renderAxiosOrAuthError(error));
    } finally {
      setLoading(false);
    }
  };

  // Handle resend
  const handleResend = async () => {
    setTimer(OTP_DURATION);
    setIsExpired(false);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    console.log("Resending OTP...");

    try {
      setLoading(true);
      await AuthService.resendOtp({
        email,
      });
      SuccessMessage("Otp sent successfully");
    } catch (error) {
      ErrorMessage(renderAxiosOrAuthError(error));
    } finally {
      setLoading(false);
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="border border-gray-200 rounded-4xl p-8 w-full max-w-md relative">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Email Verification
          </h2>
          <p className="text-gray-600 text-sm">
            Please check your email for an OTP verification code
          </p>
        </div>

        {/* Email Icon with Timer */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 w-fit mb-5 rounded-full bg-primary">
            <Image
              src={`/assets/images/auth/security.png`}
              width={40}
              height={40}
              lazyBoundary="200"
              alt="logo image"
            />
          </div>
          <p className="text-sm text-gray-600">
            Expires in :{" "}
            <span
              className={`font-semibold ${isExpired ? "text-red-500" : "text-primary"}`}
            >
              {formatTime(timer)}
            </span>
          </p>
        </div>

        {/* OTP Input Boxes */}
        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={isExpired}
              className={` w-10 h-10 text-center text-xl font-semibold border rounded-lg transition-all duration-200 ${digit ? "border-primary bg-primary/5" : "border-gray-300 bg-white"} ${isExpired ? "opacity-50 cursor-not-allowed" : "focus:border-primary focus:outline-none"} hover:border-primary/50 `}
            />
          ))}
        </div>

        {/* Proceed Button */}
        <button
          onClick={handleProceed}
          disabled={!isComplete || isExpired || loading}
          className={` w-full py-3.5 rounded-full font-semibold transition-all duration-200 ${isComplete && !isExpired ? "bg-primary hover:bg-[#00DD00] text-white shadow-sm hover:shadow-md" : "border border-primary bg-white text-dark cursor-not-allowed"} `}
        >
          {loading ? <ButtonSpinner /> : "Proceed"}
        </button>

        {/* Resend Link */}
        <div className="mt-6 text-center text-sm text-dark">
          Didn't receive the OTP code ? Please check your spam folder or try to
          resend the OTP code{" "}
          <button
            onClick={handleResend}
            className="text-primary hover:underline font-semibold underline"
          >
            Resend link
          </button>
        </div>
      </div>
      <ApiLoader loading={loading} />
    </div>
  );
};

export default VerifyEmail;
