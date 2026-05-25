// user.service.ts
import api from "@/lib/axios-client";
import {
  UpdateProfilePayload,
  ChangePasswordPayload,
  CreateFarmerPayload,
  CreateMerchantPayload,
} from "@/types";
import { AutoPayoutSchedule } from "@/types/prisma-schema-types";

const UserService = {
  getProfile: () => api.get("/api/user/profile").then((r) => r.data.data),

  updateProfile: (data: UpdateProfilePayload, avatar?: File) => {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => v && form.append(k, v));
    if (avatar) form.append("avatar", avatar);
    return api
      .patch("/api/user/profile", form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data);
  },
  changePassword: (data: ChangePasswordPayload) =>
    api.patch("/api/user/change-password", data).then((r) => r.data),

  sendPhoneOtp: (phoneNumber: string) =>
    api.post("/api/user/send-phone-otp", { phoneNumber }).then((r) => r.data),

  verifyPhoneOtp: (data: { phoneNumber: string; otp: string }) =>
    api.post("/api/user/verify-phone-otp", data).then((r) => r.data),
  toggle2FA: (enable: boolean) =>
    api.patch("/api/user/toggle-2fa", { enable }).then((r) => r.data),

  getMerchantProfile: () =>
    api.get("/api/user/merchant-profile").then((r) => r.data),

  getFarmerProfile: () =>
    api.get("/api/user/farmer-profile").then((r) => r.data),

  becomeMerchant: (data: CreateMerchantPayload) => {
    const form = new FormData();
    form.append("shopName", data.shopName);
    form.append("businessCategory", data.businessCategory);
    form.append("businessEmail", data.businessEmail);
    form.append("phoneNumber", data.phoneNumber);
    form.append("businessAddress", data.businessAddress);
    if (data.businessState) form.append("businessState", data.businessState);
    if (data.businessLga) form.append("businessLga", data.businessLga);
    if (data.businessLogo) form.append("businessLogo", data.businessLogo);
    if (data.proofOfAddress) {
      form.append("proofOfAddress", data.proofOfAddress);
    }

    return api
      .post("/api/user/become-merchant", form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data);
  },

  becomeFarmer: (data: CreateFarmerPayload) => {
    const form = new FormData();
    form.append("farmName", data.farmName);
    form.append("farmType", data.farmType);
    form.append("farmAddress", data.farmAddress);
    if (data.produceTypes) form.append("produceTypes", data.produceTypes);
    if (data.farmSize) form.append("farmSize", String(data.farmSize));
    if (data.proofOfOwnership)
      form.append("proofOfOwnership", data.proofOfOwnership);
    if (data.farmPhoto) form.append("farmPhoto", data.farmPhoto);
    if (data.proofOfAddress) form.append("proofOfAddress", data.proofOfAddress);
    if (data.farmState) form.append("farmState", data.farmState); // ← add
    if (data.farmLga) form.append("farmLga", data.farmLga);
    return api
      .post("/api/user/become-farmer", form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data);
  },
  updateFarmerProfile: (data: Partial<CreateFarmerPayload>) => {
    const form = new FormData();
    if (data.farmName) form.append("farmName", data.farmName);
    if (data.farmType) form.append("farmType", data.farmType);
    if (data.farmAddress) form.append("farmAddress", data.farmAddress);
    if (data.farmState) form.append("farmState", data.farmState); // ← add
    if (data.farmLga) form.append("farmLga", data.farmLga);
    if (data.produceTypes) form.append("produceTypes", data.produceTypes);
    if (data.farmSize) form.append("farmSize", String(data.farmSize));
    if (data.proofOfOwnership)
      form.append("proofOfOwnership", data.proofOfOwnership);
    if (data.farmPhoto) form.append("farmPhoto", data.farmPhoto);
    if (data.proofOfAddress) form.append("proofOfAddress", data.proofOfAddress);
    return api
      .patch("/api/user/update-farmer-profile", form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data);
  },

  updateMerchantProfile: (
    merchantId: string,
    data: Partial<CreateMerchantPayload>,
  ) => {
    const form = new FormData();
    if (data.shopName) form.append("shopName", data.shopName);
    if (data.businessCategory)
      form.append("businessCategory", data.businessCategory);
    if (data.businessEmail) form.append("businessEmail", data.businessEmail);
    if (data.phoneNumber) form.append("phoneNumber", data.phoneNumber);
    if (data.businessAddress)
      form.append("businessAddress", data.businessAddress);
    if (data.businessState) form.append("businessState", data.businessState);
    if (data.businessLga) form.append("businessLga", data.businessLga);
    if (data.businessLogo) form.append("businessLogo", data.businessLogo);
    if (data.proofOfAddress) {
      form.append("proofOfAddress", data.proofOfAddress);
    }
    return api
      .patch(`/api/user/update-merchant-profile/${merchantId}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data);
  },

  updateAutoPayoutSchedule: (schedule: AutoPayoutSchedule) =>
    api
      .patch("/api/user/auto-payout-schedule", { autoPayoutSchedule: schedule })
      .then((r) => r.data),
};

export default UserService;
