import Api from "./api";

type LoginCredentialType = {
  email: string;
  password: string;
};
type SignUpCredentialType = {
  email: string;
  fullName: string;
  phoneNumber: string;
  password: string;
};

type VerifyOtpType = {
  email: string;
  otp: string;
};

type VerifyTokenType = {
  token: string;
};

type ForgetPasswordType = {
  email: string;
};

type ResendyOtpType = {
  email: string;
};

type ChangePasswordType = {
  newPassword: string;
  token: any;
};
const Services = {
  login(credential: LoginCredentialType) {
    return Api().post("auth/local/signin", credential);
  },
  signUp(credential: SignUpCredentialType) {
    return Api().post("auth/local/signup", credential);
  },
  resendOTP(credential: ResendyOtpType) {
    return Api().post("auth/resend-otp", credential);
  },
  verifyOTP(credential: VerifyOtpType) {
    return Api().post("auth/verify-otp", credential);
  },
  verifyToken(credential: VerifyTokenType) {
    return Api().post("auth/verify-token", credential);
  },
  sendChangePasswordLink(credential: ForgetPasswordType) {
    return Api().post("auth/forgetPassword", credential);
  },
  changePassword(credential: ChangePasswordType) {
    return Api().post("auth/changePassword", credential);
  },
  updateProfile(firstName: string, lastName: string) {
    var data = {
      firstName,
      lastName,
    };
    return Api().patch("auth/admin/profile", data);
  },
  completeSignup(adminId: string, password: string) {
    return Api().patch("auth/admin/completeSignupProcess", {
      adminId,
      password,
    });
  },
  getAllAdmin(limit: Number, page: Number) {
    var params = {
      limit,
      page,
    };
    return Api().get(`/auth/admin/all`, { params });
  },
  blockUser(block: boolean, adminId: string) {
    return Api().patch("auth/admin/blockStatus", { block, adminId });
  },
  sendForgotPasswordLink(email: string) {
    var data = {
      email,
    };
    return Api().post("auth/admin/password/resetLink", data);
  },
  resetPassword(body: any) {
    return Api().post("auth/admin/password/reset", body);
  },
};

export default Services;
