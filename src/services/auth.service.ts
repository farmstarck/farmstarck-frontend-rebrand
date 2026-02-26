import api from "@/lib/axios-client";

type SignUpProps = {
  email: string;
  password: string;
  fullName: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type ForgetPasswordProps = {
  email: string;
};

type ResendOtpProps = {
  email: string;
};

type VerifyOtpProps = {
  email: string;
  otp: string;
};

type ChangePasswordType = {
  token: string;
  newPassword: string;
};

const Services = {
  signUp: async (data: SignUpProps) => {
    const response = await api.post("/api/auth/sign-up", data);
    return response.data;
  },
  signIn: async (data: SignInProps) => {
    const response = await api.post("/api/auth/sign-in", data);
    return response.data;
  },
  forgetPassword: async (data: ForgetPasswordProps) => {
    const response = await api.post("/api/auth/forgetPassword", data);
    return response.data;
  },
  resendOtp: async (data: ResendOtpProps) => {
    const response = await api.post("/api/auth/resend-otp", data);
    return response.data;
  },
  verifyOtp: async (data: VerifyOtpProps) => {
    const response = await api.post("/api/auth/web/verify-otp", data);
    return response.data;
  },
  changePassword: async (data: ChangePasswordType) => {
    const response = await api.post("/api/auth/changePassword", data);
    return response.data;
  },
  resetPassword: async (data: ChangePasswordType) => {
    const response = await api.post("/api/auth/reset-password", data);
    return response.data;
  },
  googleSignIn: async (data: SignInProps) => {
    const response = await api.post("/api/auth/google/login", data);
    return response.data;
  },
};

export default Services;
