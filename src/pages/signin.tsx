import React, { useEffect, useState } from "react";
import { AuthInput } from "@/components/common/auth/AuthInput";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { ErrorMessage } from "@/utils/PageUtils";
import AuthService from "@/services/auth.service";
import { useNavigate } from "@/hooks/useNavigate";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { useAuthStore } from "@/store/slices/auth.slice";
import ApiLoader from "@/components/common/ui/ApiLoader";
import { consumeRedirectAfterAuth } from "@/utils/PageUtils";
import OtpVerification from "@/components/common/auth/OtpVerification";
import { useRouter } from "next/router";

const SignIn = () => {
  const router = useRouter();
  const { navigate } = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastMethod, setLastMethod] = useState<"google" | "password" | null>(
    null,
  );

  // ── 2FA state ────────────────────────────────────────────────────
  const [show2FA, setShow2FA] = useState(false);
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const [twoFASentTo, setTwoFASentTo] = useState("");

  useEffect(() => {
    const method = localStorage.getItem("auth:lastMethod") as
      | "google"
      | "password"
      | null;
    setLastMethod(method);
  }, []);

  const completeLogin = (token: string) => {
    const storage = keepLoggedIn ? localStorage : sessionStorage;
    storage.setItem("accessToken", token);
    localStorage.setItem("auth:lastMethod", "password");
    useAuthStore.getState().login();
    const redirect = consumeRedirectAfterAuth();
    navigate(redirect ?? "/market/marketplace");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      ErrorMessage("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const { data } = await AuthService.signIn({ email, password });

      if (data.requires2FA) {
        // Show OTP step instead of completing login
        setPendingUserId(data.userId);
        setTwoFASentTo(email);
        setShow2FA(true);
        return;
      }

      completeLogin(data.token);
    } catch (error) {
      const msg = renderAxiosOrAuthError(error);
      ErrorMessage(msg);
    } finally {
      setLoading(false);
      setFormData({ email: "", password: "" });
    }
  };

  const handle2FAVerify = async (otp: string) => {
    if (!pendingUserId) return;
    try {
      setLoading(true);
      const { data } = await AuthService.verify2FA({
        userId: pendingUserId,
        otp,
      });
      setShow2FA(false);
      completeLogin(data.token);
    } catch (error) {
      const msg = renderAxiosOrAuthError(error);
      ErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handle2FAResend = async () => {
    if (!formData.email || !formData.password) return;
    try {
      const { data } = await AuthService.signIn({
        email: formData.email,
        password: formData.password,
      });
      if (data.requires2FA) setPendingUserId(data.userId);
    } catch (error) {
      ErrorMessage("Failed to resend OTP");
    }
  };

  const handleGoogleSignIn = () => {
    const redirect =
      localStorage.getItem("redirectAfterAuth") || "/market/marketplace";
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/redirect?state=${encodeURIComponent(redirect)}`;
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo — navigates home */}
          <button
            onClick={() => router.push("/")}
            className="mb-8 inline-block"
          >
            <Image
              src="/assets/svg/logo-dark.svg"
              alt="Farmstarck"
              width={160}
              height={40}
              className="h-10 w-auto"
            />
          </button>

          <div className="my-3">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
            <p className="text-gray-600">Continue your journey in few clicks</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Google */}
            <div className="relative">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-full border border-gray-300 bg-white hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M19.8 10.2273C19.8 9.51823 19.7364 8.83641 19.6182 8.18186H10.2V12.0501H15.6109C15.3727 13.3001 14.6727 14.3592 13.6273 15.0682V17.5773H16.8364C18.7091 15.8364 19.8 13.2728 19.8 10.2273Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10.2 20C12.9 20 15.1636 19.1045 16.8364 17.5773L13.6273 15.0682C12.7409 15.6682 11.5909 16.0227 10.2 16.0227C7.59545 16.0227 5.38182 14.2636 4.59545 11.9H1.27273V14.4909C2.93636 17.8091 6.30909 20 10.2 20Z"
                    fill="#34A853"
                  />
                  <path
                    d="M4.59545 11.9C4.39545 11.3 4.28182 10.6591 4.28182 10C4.28182 9.34091 4.39545 8.7 4.59545 8.1V5.50909H1.27273C0.581818 6.89091 0.2 8.40909 0.2 10C0.2 11.5909 0.581818 13.1091 1.27273 14.4909L4.59545 11.9Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M10.2 3.97727C11.7182 3.97727 13.0727 4.48182 14.1545 5.51818L17.0273 2.64545C15.1591 0.890909 12.8955 0 10.2 0C6.30909 0 2.93636 2.19091 1.27273 5.50909L4.59545 8.1C5.38182 5.73636 7.59545 3.97727 10.2 3.97727Z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </button>
              {lastMethod === "google" && (
                <div className="bg-dark-primary text-white font-semibold text-center rounded-full text-xs px-2 py-1 absolute top-0 right-2">
                  Last used
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-sm text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            <div className="relative">
              <AuthInput
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(value) => setFormData({ ...formData, email: value })}
                icon="email"
              />
              {lastMethod === "password" && (
                <div className="bg-dark-primary text-white font-semibold text-center rounded-full text-xs px-2 py-1 absolute top-7 right-2">
                  Last used
                </div>
              )}
            </div>

            <AuthInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(value) =>
                setFormData({ ...formData, password: value })
              }
              icon="lock"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-start gap-2 cursor-pointer">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-4 h-4 border-2 border-gray-300 rounded peer-checked:bg-primary peer-checked:border-0 transition-all flex items-center justify-center">
                    {keepLoggedIn && (
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-700">Keep me logged in</span>
              </label>
              <Link
                href="/password/forgot-password"
                className="text-sm text-primary hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-primary hover:bg-[#00DD00] text-white font-semibold transition-colors shadow-sm hover:shadow-md"
            >
              Log In
            </button>

            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/onboarding/signup"
                className="text-primary hover:underline font-semibold"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center relative overflow-hidden">
        <Image
          src="/assets/images/auth/logo.png"
          width={400}
          height={400}
          alt="logo image"
        />
      </div>

      <OtpVerification
        isOpen={show2FA}
        onClose={() => {
          setShow2FA(false);
          setPendingUserId(null);
        }}
        verificationType="email"
        contactInfo={twoFASentTo}
        otpLength={6}
        expiryTime={300}
        onVerifySuccess={handle2FAVerify}
        onResend={handle2FAResend}
      />

      <ApiLoader loading={loading} />
    </div>
  );
};

export default SignIn;
