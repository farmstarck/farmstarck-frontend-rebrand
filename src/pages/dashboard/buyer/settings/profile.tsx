import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, User, Mail, Camera } from "lucide-react";
import { useRouter } from "next/router";
import Image from "next/image";
import { CustomDropDown } from "@/components/common/CustomDropDown";
import { useStatesAndLgas } from "@/hooks/useStatesAndLgas";
import SuccessModal from "@/components/common/status/SuccessModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userMutations, userQueries } from "@/queries/user.queries";
import { ErrorMessage, SuccessMessage } from "@/utils/PageUtils";
import { renderAxiosOrAuthError } from "@/lib/axios-client";

const ProfileSettings = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);

  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "",
    lga: "",
  });

  const { data: profile, isLoading } = useQuery(userQueries.profile());

  useEffect(() => {
    if (profile) {
      const nameParts = (profile.fullName ?? "").split(" ");
      setFormData({
        fullName: profile.fullName ?? "",
        email: profile.email ?? "",
        phoneNumber: profile.phoneNumber ?? "",
        address: profile.address ?? "",
        state: profile?.state ?? "",
        lga: profile?.lga ?? "",
      });
      if (profile.image_url) setPreview(profile.image_url);
    }
  }, [profile]);

  const { stateOptions, lgaOptions } = useStatesAndLgas({
    selectedState: formData.state,
  });

  const { mutate: updateProfile, isPending } = useMutation({
    ...userMutations.updateProfile(),
    onSuccess: () => {
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: userQueries.all });
    },
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phoneNumber" ? value.replace(/\D/g, "") : value,
    }));
  };

  const handleSubmit = () => {
    updateProfile({
      data: {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      },
      avatar: avatar ?? undefined,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 flex items-center gap-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} />
          <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
            Profile Settings
          </h1>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
        {/* Avatar */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Profile Picture
          </label>
          <div className="relative w-20 h-20">
            <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
              {preview ? (
                <Image
                  src={preview}
                  alt="Profile"
                  fill
                  className="object-contain"
                />
              ) : (
                <User size={32} className="text-gray-400" />
              )}
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center hover:opacity-90"
            >
              <Camera size={14} className="text-white" />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Full name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Email address"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Phone Number
            </label>
            <div className="flex gap-1 px-2 border border-gray-200 rounded-lg items-center">
              <Image
                width={34}
                height={34}
                src="/assets/images/flags/ng_flag.png"
                alt="Nigerian flag"
                className="rounded-full"
              />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="flex-1 px-4 py-3 outline-none"
                placeholder="080 123 456 789"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <CustomDropDown
              searchable
              width="full"
              value={formData.state}
              options={stateOptions}
              onChange={(v) =>
                setFormData((p) => ({ ...p, state: v, lga: "" }))
              }
              placeholder="Select State"
              searchholder="Search states"
              textclass="!py-3"
              autoSelectFirst={false}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Local Government Area
            </label>
            <CustomDropDown
              searchable
              width="full"
              value={formData.lga}
              options={lgaOptions}
              onChange={(v) => setFormData((p) => ({ ...p, lga: v }))}
              placeholder="Select LGA"
              searchholder="Search LGAs"
              disabled={!formData.state}
              textclass="!py-3"
              autoSelectFirst={false}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full mt-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isPending ? "Updating..." : "Update Profile"}
        </button>
      </div>

      <SuccessModal
        isOpen={success}
        title="Profile updated successfully"
        onClose={() => setSuccess(false)}
        back_cta
        back_cta_title="Continue"
        back_cta_url="/dashboard/buyer/settings"
      />
    </div>
  );
};

export default ProfileSettings;
