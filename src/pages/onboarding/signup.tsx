// pages/signup.tsx
import React, { useState } from "react";
import { AuthInput } from "@/components/common/auth/AuthInput";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { ErrorMessage } from "@/utils/PageUtils";
import { useNavigate } from "@/hooks/useNavigate";
import AuthService from "@/services/auth.service";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import ButtonSpinner from "@/components/common/ButtonSpinner";
import { useAuthStore } from "@/store/slices/auth.slice";
import ApiLoader from "@/components/common/ui/ApiLoader";

const SignUp = () => {
  const { navigate } = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      ErrorMessage("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      ErrorMessage("Passwords do not match");
      return;
    }
    if (!acceptedTerms) {
      ErrorMessage("Please accept the Terms and Conditions");
      return;
    }

    const fullName = `${firstName} ${lastName}`;
    const data = {
      fullName,
      email,
      password,
    };
    try {
      setLoading(true);
      await AuthService.signUp(data);

      await useAuthStore.getState().signup(email);

      localStorage.setItem("auth:lastMethod", "password");

      navigate("/onboarding/verify-email");
    } catch (error) {
      console.error(error);
      const msg = renderAxiosOrAuthError(error);
      ErrorMessage(msg);
    } finally {
      setLoading(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setAcceptedTerms(false);
    }
  };

  const handleGoogleSignUp = () => {
    const redirect =
      localStorage.getItem("redirectAfterAuth") || "/market/marketplace";

    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/redirect?state=${encodeURIComponent(
      redirect,
    )}`;
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="my-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Sign Up</h1>
            <p className="text-gray-600">Start your journey in few clicks</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Google Sign Up */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="
                w-full flex items-center justify-center gap-3
                py-3.5 px-6 rounded-full
                border border-gray-300
                bg-white hover:bg-gray-50
                transition-colors
                font-medium text-gray-700
              "
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

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* First Name Input */}
            <AuthInput
              label="First Name"
              type="text"
              placeholder="Enter your full name"
              value={formData.firstName}
              onChange={(value) =>
                setFormData({ ...formData, firstName: value })
              }
              icon="user"
            />

            {/* Last Name Input */}
            <AuthInput
              label="Last Name"
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(value) =>
                setFormData({ ...formData, lastName: value })
              }
              icon="user"
            />

            {/* Email Input */}
            <AuthInput
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              icon="email"
            />

            {/* Password Input */}
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

            {/* Confirm Password Input */}
            <AuthInput
              label="Confirm Password"
              type="password"
              placeholder="Enter your password"
              value={formData.confirmPassword}
              onChange={(value) =>
                setFormData({ ...formData, confirmPassword: value })
              }
              icon="lock"
            />

            {/* Terms and Conditions */}

            <label className="flex items-start gap-2 cursor-pointer">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-4 h-4 border-2 border-gray-300 rounded peer-checked:bg-primary peer-checked:border-0 transition-all flex items-center justify-center  peer-focus:ring-primary peer-focus:ring-offset-1">
                  {acceptedTerms && (
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-700">
                By clicking means you have read and accepted our{" "}
                <Link
                  href="/terms"
                  className="text-primary hover:underline font-medium"
                >
                  Terms and Conditions
                </Link>
              </span>
            </label>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-3.5 rounded-full bg-primary hover:bg-[#00DD00] text-white font-semibold transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <ButtonSpinner /> : "Sign Up"}
            </button>

            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-primary hover:underline font-semibold"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center relative overflow-hidden">
        <Image
          src={`/assets/images/auth/logo.png`}
          width={400}
          height={400}
          lazyBoundary="200"
          alt="logo image"
        />
      </div>
      <ApiLoader loading={loading} />
    </div>
  );
};

export default SignUp;
