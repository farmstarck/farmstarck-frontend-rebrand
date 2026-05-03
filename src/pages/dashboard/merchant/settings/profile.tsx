import React, { useState } from "react";
import { ChevronLeft, User, Mail, Camera } from "lucide-react";
import { useRouter } from "next/router";
import Image from "next/image";
import { CustomDropDown } from "@/components/common/CustomDropDown";
import { useStatesAndLgas } from "@/hooks/useStatesAndLgas";
import SuccessModal from "@/components/common/status/SuccessModal";
import DashBoardWrapper from "@/components/dashboard/ui/DashBoardWrapper";

const ProfileSettings = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "Joshua",
    lastName: "Nnaji",
    email: "nnajijoshua1007@gmail.com",
    phoneNumber: "08012345678",
    streetAddress: "23 Admiralty Way",
    state: "Lagos",
    lga: "Lekki",
    landmark: "Near Landmark Beach",
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const { stateOptions, lgaOptions } = useStatesAndLgas({
    selectedState: formData.state,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      const numericValue = value.replace(/\D/g, "");
      setFormData({
        ...formData,
        [name]: numericValue,
      });
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStateChange = (value: string) => {
    setFormData({
      ...formData,
      state: value,
      lga: "", // Reset LGA when state changes
    });
  };

  const handleLGAChange = (value: string) => {
    setFormData({
      ...formData,
      lga: value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log("Profile updated:", formData);
    setVerified(true);
    // Add your update logic here
  };

  return (
    <DashBoardWrapper
     href="/dashboard/merchant/settings"
     label="Profile"
    >
      <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
        {/* Profile Picture Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Update Profile Picture
          </label>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={32} className="text-gray-400" />
                )}
              </div>
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
              >
                <Camera size={14} className="text-white" />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-colors"
                placeholder="Enter first name"
              />
            </div>
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-colors"
                placeholder="Enter last name"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="mb-4">
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
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-colors"
                placeholder="Enter email address"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="">
            <label className="block text-sm font-semibold mb-2">
              Phone Number
            </label>
            <div className="flex gap-1 px-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all rounded-lg border items-center">
              <div className="">
                <Image
                  width={34}
                  height={34}
                  src={`/assets/images/flags/ng_flag.png`}
                  alt={"nigerian flag"}
                  className="rounded-full"
                />
              </div>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="flex-1 px-4 py-3 outline-none focus:outline-0 focus:border-0"
                placeholder="080 123 456 789"
              />
              <button className="px-4 text-xs py-1.5 rounded-md bg-primary text-white">
                Verify
              </button>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="mb-6 mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Shipping Information
          </h2>

          <div className="space-y-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Street Address */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Street Address
              </label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="Enter street address"
              />
            </div>

            {/* State and LGA */}
            <div className="w-full">
              <label className="block text-sm font-semibold mb-2">State</label>
              <div className="w-full">
                <CustomDropDown
                  searchable={true}
                  width="full"
                  value={formData.state}
                  options={stateOptions}
                  onChange={handleStateChange}
                  placeholder="Select State"
                  searchholder="search states"
                  textclass="!py-3"
                />
              </div>
            </div>
            <div className="w-full">
              <label className="block text-sm font-semibold mb-2">
                Local Government Area
              </label>
              <div className="w-full">
                <CustomDropDown
                  textclass="!py-3"
                  searchable={true}
                  width="full"
                  value={formData.lga}
                  options={lgaOptions}
                  onChange={handleLGAChange}
                  placeholder="Select LGA"
                  searchholder="search lgas"
                  disabled={!formData.state}
                />
              </div>
            </div>

            {/* Landmark */}
            {/* <div>
                            <label className="block text-sm font-semibold mb-2">
                                Landmark/Bustop
                            </label>
                            <input
                                type="text"
                                name="landmark"
                                value={formData.landmark}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="Near Spar Mall (Port Street)"
                            />
                        </div> */}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Update Profile
        </button>
      </div>

      <SuccessModal
        isOpen={verified}
        title="You have successfully updated your profile"
        onClose={() => setVerified(false)}
        back_cta={true}
        back_cta_title="Continue"
        back_cta_url="/dashboard/buyer/settings"
      />
    </DashBoardWrapper>
  );
};

export default ProfileSettings;
