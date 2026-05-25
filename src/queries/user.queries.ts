// user.queries.ts
import UserService from "@/services/user.service";
import {
  ChangePasswordPayload,
  CreateFarmerPayload,
  CreateMerchantPayload,
  UpdateProfilePayload,
} from "@/types";
import { AutoPayoutSchedule } from "@/types/prisma-schema-types";

export const userQueries = {
  all: ["user"] as const,

  profile: () => ({
    queryKey: [...userQueries.all, "profile"] as const,
    queryFn: UserService.getProfile,
  }),

  merchantProfile: () => ({
    queryKey: [...userQueries.all, "merchant-profile"] as const,
    queryFn: UserService.getMerchantProfile,
  }),

  farmerProfile: () => ({
    queryKey: [...userQueries.all, "farmer-profile"] as const,
    queryFn: UserService.getFarmerProfile,
  }),
};

export const userMutations = {
  updateProfile: () => ({
    mutationFn: ({
      data,
      avatar,
    }: {
      data: UpdateProfilePayload;
      avatar?: File;
    }) => UserService.updateProfile(data, avatar),
  }),

  changePassword: () => ({
    mutationFn: (data: ChangePasswordPayload) =>
      UserService.changePassword(data),
  }),

  sendPhoneOtp: () => ({
    mutationFn: (phoneNumber: string) => UserService.sendPhoneOtp(phoneNumber),
  }),
  verifyPhoneOtp: () => ({
    mutationFn: (data: { phoneNumber: string; otp: string }) =>
      UserService.verifyPhoneOtp(data),
  }),

  toggle2FA: () => ({
    mutationFn: (enable: boolean) => UserService.toggle2FA(enable),
  }),

  becomeMerchant: () => ({
    mutationFn: (data: CreateMerchantPayload) =>
      UserService.becomeMerchant(data),
  }),

  becomeFarmer: () => ({
    mutationFn: (data: CreateFarmerPayload) => UserService.becomeFarmer(data),
  }),

  updateFarmerProfile: () => ({
    mutationFn: (data: Partial<CreateFarmerPayload>) =>
      UserService.updateFarmerProfile(data),
  }),

  updateMerchantProfile: () => ({
    mutationFn: ({
      merchantId,
      data,
    }: {
      merchantId: string;
      data: Partial<CreateMerchantPayload>;
    }) => UserService.updateMerchantProfile(merchantId, data),
  }),

  updateAutoPayoutSchedule: () => ({
    mutationFn: (schedule: AutoPayoutSchedule) =>
      UserService.updateAutoPayoutSchedule(schedule as AutoPayoutSchedule),
  }),
};
