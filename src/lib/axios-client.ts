import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const baseURL = process.env.NEXT_PUBLIC_API_URL!;

const AUTH_ROUTES = [
  "/api/auth/sign-in",
  "/api/auth/sign-up",
  "/api/auth/resend-otp",
  "/api/auth/verify-otp",
  "/api/auth/verify-token",
  "/api/auth/forgetPassword",
  "/api/auth/changePassword",
  "/api/auth/reset-password",
  "/api/auth/google-signin",
];

const isAuthRoute = (url?: string) => {
  if (!url) return false;
  return AUTH_ROUTES.some((route) => url.includes(route));
};

const api = axios.create({
  baseURL,
  withCredentials: true, // still fine to keep
});

/* ================= REQUEST ================= */

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

/* ================= RESPONSE ================= */

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error.response?.status;
    const originalRequest = error.config;

    // Ignore auth routes
    if (isAuthRoute(originalRequest?.url)) {
      return Promise.reject(error);
    }

    // Access token expired or invalid
    if (status === 401) {
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");

      toast.error("Session expired. Please login again.");

      if (typeof window !== "undefined") {
        // window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  },
);

/* ================= ERROR HELPER ================= */

export const renderAxiosOrAuthError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.response?.message ||
      error.response?.data?.message ||
      error.message ||
      "Request failed. Try again later."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong, try again later.";
};

export default api;
