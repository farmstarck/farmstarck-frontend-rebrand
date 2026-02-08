import api, { renderAxiosOrAuthError } from "@/lib/axios-client";
import { ErrorMessage } from "@/utils/PageUtils";
import { create } from "zustand";

export type User = {
  id: string;
  email: string;
  fullName: string;
  role: string;
  emailVerified: boolean;
};

type AuthState = {
  user: User | null;
  unVerifiedEmail: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isVerifyingEmail: boolean;

  signup: (email: string) => Promise<void>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
  finishEmailVerification: (data: { accessToken: string }) => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isVerifyingEmail: false,
  unVerifiedEmail: null,

  /* ================= SIGNUP ================= */
  signup: async (email) => {
    set({
      unVerifiedEmail: email,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  /* ================= LOGIN ================= */
  login: async () => {
    const token =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");

    try {
      const {
        data: { data },
      } = await api.get("/api/auth/me");

      set({
        user: { ...data, emailVerified: true },
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      ErrorMessage(renderAxiosOrAuthError(error));
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  /* ================= LOGOUT ================= */
  logout: async () => {
    try {
      await api.post("/api/auth/logout", {});
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch {
      ErrorMessage("Logout failed");
    }

    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
  },

  /* ================= HYDRATE ================= */
  hydrate: async () => {
    try {
      const token =
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken");

      if (!token) {
        set({ isLoading: false });
        return;
      }

      const {
        data: { data },
      } = await api.get("/api/auth/me");

      set({
        user: { ...data, emailVerified: true },
        isAuthenticated: true,
        isVerifyingEmail: !data.emailVerified,
        isLoading: false,
      });
    } catch {
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  /* ================= EMAIL VERIFIED ================= */
  finishEmailVerification: async ({ accessToken }) => {
    localStorage.setItem("accessToken", accessToken);

    try {
      const {
        data: { data },
      } = await api.get("/api/auth/me");

      set({
        user: { ...data, emailVerified: true },
        isVerifyingEmail: false,
        isAuthenticated: true,
      });
    } catch (error) {
      ErrorMessage(renderAxiosOrAuthError(error));
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
