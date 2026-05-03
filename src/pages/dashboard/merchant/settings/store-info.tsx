import BackNavBtn from "@/components/dashboard/ui/BackNavBtn";
import { CustomDropDown } from "@/components/common/CustomDropDown";
import ApiLoader from "@/components/common/ui/ApiLoader";
import { SuccessStep } from "@/components/dashboard/merchant/WithdrawModal";
import CloseBtn from "@/components/common/Navigation/CloseBtn";
import { useStatesAndLgas } from "@/hooks/useStatesAndLgas";
import ModalLayout from "@/layouts/ModalLayout";
import Image from "next/image";
import { Check, UserRound, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import SuccessConfirmationModal from "@/components/dashboard/ui/SuccessConfirmationModal";

const formatStateLabel = (state: string) =>
  state === "Federal Capital Territory" ? state : `${state} State`;

const StoreInfo = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "Ifoluwa Agriproduce",
    businessCategory: "Raw Food Produce",
    state: "Lagos",
    lga: "Ibeju-Lekki",
    address: "15, Obafemi Awolowo Way, Ibeju, Lagos",
    landmark: "Shoprite Bus Stop",
  });
  const { stateOptions, lgaOptions, hasSelectedLga } = useStatesAndLgas({
    selectedState: formData.state,
    selectedLga: formData.lga,
    formatStateLabel,
  });

  useEffect(() => {
    if (formData.lga && !hasSelectedLga) {
      setFormData((prev) => ({
        ...prev,
        lga: "",
      }));
    }
  }, [formData.lga, hasSelectedLga]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStateChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      state: value,
      lga: "",
    }));
  };

  const handleLgaChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      lga: value,
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setLogoPreview(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };

  const isFormValid = Object.values(formData).every((value) => value.trim());

  const handleSubmit = () => {
    if (!isFormValid) return;

    setIsSaving(true);

    window.setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
    }, 1400);
  };

  return (
    <div className="w-full flex items-start flex-col gap-5">
      <BackNavBtn href="/dashboard/merchant/settings" label="Store Settings" />

      <div className="w-full max-w-2xl bg-white rounded-[18px] mb-5 border border-[#E4ECE0] overflow-hidden ">
        <div className="p-5 pb-4">
          <div className="mb-5">
            <p className="text-sm font-medium text-[#5D6B63] mb-3">
              Update Business Logo
            </p>

            <div className="flex items-center gap-4">
              <div className="relative">
                <label
                  htmlFor="business-logo-upload"
                  className="w-[58px] h-[58px] rounded-full bg-[#F2F7F1] border border-[#E0EBDE] flex items-center justify-center overflow-hidden cursor-pointer"
                >
                  {logoPreview ? (
                    <Image
                      src={logoPreview}
                      alt="Business logo preview"
                      width={58}
                      height={58}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserRound size={24} className="text-[#8A9A8F]" />
                  )}
                </label>

                <label
                  htmlFor="business-logo-upload"
                  className="absolute -right-1 bottom-0 w-5 h-5 rounded-full bg-primary border-2 border-white flex items-center justify-center cursor-pointer"
                >
                  <Plus size={10} className="text-white" />
                </label>

                <input
                  id="business-logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#5D6B63] mb-2">
                Business/Store Name
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                className="w-full h-11 rounded-[10px] border border-[#E5EEE3] bg-[#F2F7F1] px-3.5 text-[13px] text-[#1F2A24] outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5D6B63] mb-2">
                Business Category
              </label>
              <input
                type="text"
                name="businessCategory"
                value={formData.businessCategory}
                onChange={handleInputChange}
                className="w-full h-11 rounded-[10px] border border-[#E5EEE3] bg-[#F2F7F1] px-3.5 text-[13px] text-[#1F2A24] outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-[#E8EEE6]" />

        <div className="p-5">
          <h2 className="text-[14px] font-semibold text-[#1F2A24] mb-4">
            Business Address
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#5D6B63] mb-2">
                State
              </label>
              <CustomDropDown
                width="full"
                autoSelectFirst={false}
                value={formData.state}
                options={stateOptions}
                onChange={handleStateChange}
                placeholder="Select state"
                textclass="!h-11 !rounded-[10px] !border-[#D9E3D7] !px-3.5 !text-[13px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5D6B63] mb-2">
                Local Government Area
              </label>
              <CustomDropDown
                width="full"
                autoSelectFirst={false}
                value={formData.lga}
                options={lgaOptions}
                onChange={handleLgaChange}
                placeholder="Select LGA"
                disabled={!formData.state}
                textclass="!h-11 !rounded-[10px] !border-[#D9E3D7] !px-3.5 !text-[13px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5D6B63] mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full h-11 rounded-[10px] border border-[#D9E3D7] bg-white px-3.5 text-[13px] text-[#1F2A24] outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5D6B63] mb-2">
                Nearest Landmark
              </label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                className="w-full h-11 rounded-[10px] border border-[#D9E3D7] bg-white px-3.5 text-[13px] text-[#1F2A24] outline-none focus:border-primary"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid || isSaving}
              className="w-full h-11 rounded-[10px] border border-primary bg-white text-primary text-[12px] font-semibold flex items-center justify-center gap-2 transition-all hover:bg-[#F4FBF3] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="w-4 h-4 rounded-[4px] border border-primary flex items-center justify-center">
                <Check size={11} strokeWidth={3} />
              </span>
              Update Profile
            </button>
          </div>
        </div>
      </div>

      <ApiLoader loading={isSaving} />

      {showSuccess && (
        <SuccessConfirmationModal
         message="has been updated successfully with your latest business address details."
         boldTitle={formData.businessName}
         onClose={()=> setShowSuccess(false)}
        />
      )}
    </div>
  );
};

export default StoreInfo;
