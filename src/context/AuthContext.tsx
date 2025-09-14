import { createContext, useContext, useReducer, useEffect } from "react";
import AuthService from "../services/AuthenticationService";
import toast from "react-hot-toast";
import { errorMessageRetreiver } from "../utils/errorRetriever";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthUser = {
  email: string;
  fullName: string;
  phoneNumber: string;
  roles: string[];
};

const initialState: StateType = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  errorMessage: "",
  isLoading: false,
  isActionLoading: false,
};

export type StateType = {
  user: AuthUser | null; // ✅ Ensure user can be null
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  errorMessage: string;
  isLoading: boolean;
  isActionLoading: boolean;
};

type SignInPayload = {
  email: string;
  password: string;
};

type SignUpPayload = {
  email: string;
  fullName: string;
  phoneNumber: string;
  password: string;
};

type verifyOtpPayload = {
  email: string;
  otp: string;
};

type ActionType =
  | { type: "USER_LOADING" }
  | { type: "SET_USER"; payload: AuthUser }
  | { type: "LOGIN_SUCCESS"; payload: { token: string; user: AuthUser } }
  | { type: "USER_LOADED" }
  | { type: "LOGIN_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "RESET" }
  | { type: "DATA_LOADING" }
  | { type: "DATA_LOADED" }
  | { type: "ACTION_LOADING" }
  | { type: "ACTION_LOADED" };

type AuthContextType = {
  state: StateType;
  signIn: (credentials: SignInPayload) => Promise<void>;
  signUp: (credentials: SignUpPayload) => Promise<void>;
  verifyEmail: (credentials: verifyOtpPayload) => Promise<void>;
  logout: () => void;
  reset: () => void;
  dispatch: React.Dispatch<ActionType>;
};

const AuthContext = createContext({} as AuthContextType);

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "USER_LOADING":
      return { ...state, loading: true };
    case "SET_USER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        token: localStorage.getItem("token"),
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        errorMessage: action.payload,
        loading: false,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { ...state, user: null, token: null, isAuthenticated: false };
    case "RESET":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        errorMessage: "",
      };
    case "USER_LOADED":
      return { ...state, loading: false };
    case "DATA_LOADING":
      return { ...state, isLoading: true };
    case "DATA_LOADED":
      return { ...state, isLoading: false };
    case "ACTION_LOADING":
      return { ...state, isActionLoading: true };
    case "ACTION_LOADED":
      return { ...state, isActionLoading: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch({ type: "SET_USER", payload: parsedUser });
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user"); // Remove invalid data
      }
    }
  }, []);

  const signUp = async (credentials: SignUpPayload) => {
    dispatch({ type: "RESET" });

    try {
      dispatch({ type: "USER_LOADING" });
      const {
        status,
        data: { data },
      } = await AuthService.signUp(credentials);

      if (status !== 201)
        throw new Error(data.message || "Registration failed");

      // Store user info but NOT token yet (Token comes after verification)
      localStorage.setItem("user", JSON.stringify(data.user));

      dispatch({
        type: "SET_USER",
        payload: data.user, // Set user only
      });

      toast.success("OTP sent to email address");
      return data;
    } catch (error: any) {
      const message = errorMessageRetreiver(error);

      toast.error(message);
      dispatch({ type: "LOGIN_ERROR", payload: message });

      return null;
    } finally {
      dispatch({ type: "USER_LOADED" });
    }
  };

  const signIn = async (credentials: SignInPayload) => {
    dispatch({ type: "RESET" });

    try {
      dispatch({ type: "USER_LOADING" });
      const {
        status,
        data: { data },
      } = await AuthService.login(credentials);

      if (status !== 200) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { token: data.token, user: data.user },
      });

      toast.success("Logged in successfully!");
      return data;
    } catch (error: any) {
      const message = errorMessageRetreiver(error);

      toast.error(message);
      dispatch({ type: "LOGIN_ERROR", payload: message });

      return null;
    } finally {
      dispatch({ type: "USER_LOADED" });
    }
  };

  const verifyEmail = async (credentials: verifyOtpPayload) => {
    dispatch({ type: "USER_LOADING" });

    try {
      const {
        status,
        data: { data },
      } = await AuthService.verifyOTP(credentials);

      if (status !== 200)
        throw new Error(data.message || "Email verification failed");

      // Store token & user info after verification
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { token: data.token, user: data.user },
      });

      toast.success("Email verified successfully!");

      return data;
    } catch (error: any) {
      const message = errorMessageRetreiver(error);

      toast.error(message);
      dispatch({ type: "LOGIN_ERROR", payload: message });

      return null;
    } finally {
      dispatch({ type: "USER_LOADED" });
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <AuthContext.Provider
      value={{ state, signIn, signUp, verifyEmail, logout, reset, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
