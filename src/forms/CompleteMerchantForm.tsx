import FormInput from "@/components/common/auth/FormInput";
import { CustomDropDown } from "@/components/common/CustomDropDown";
import CloseBtn from "@/components/common/Navigation/CloseBtn";
import ModalLayout from "@/layouts/ModalLayout";
import React, { useState, useRef, useEffect } from "react";
import { useStatesAndLgas } from "@/hooks/useStatesAndLgas";
import SuccessConfirmationModal from "@/components/dashboard/ui/SuccessConfirmationModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userMutations, userQueries } from "@/queries/user.queries";
import { ErrorMessage } from "@/utils/PageUtils";
import { renderAxiosOrAuthError } from "@/lib/axios-client";

interface Props {
  onClose: () => void;
  isEdit?: boolean;
}

const BUSINESS_CATEGORIES = [
  { label: "Raw Food Products", value: "raw_food_products" },
  { label: "Processed Food Products", value: "processed_food_products" },
  { label: "Fertilizers", value: "fertilizers" },
  { label: "Machineries", value: "machineries" },
  { label: "Others", value: "others" },
];

const CompleteMerchantForm = ({ onClose, isEdit = false }: Props) => {
  const queryClient = useQueryClient();
  const proofOfAddressRef = useRef<HTMLInputElement | null>(null);
  const logoRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    shopName: "",
    businessCategory: "",
    phoneNumber: "",
    businessEmail: "",
    state: "",
    lga: "",
    businessAddress: "",
  });
  const [proofOfAddress, setProofOfAddress] = useState<File | null>(null);
  const [businessLogo, setBusinessLogo] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);

  const { stateOptions, lgaOptions } = useStatesAndLgas({
    selectedState: formData.state,
  });

  // ── Pre-fill on edit ─────────────────────────────────────────────
  const { data: merchantProfile } = useQuery({
    ...userQueries.merchantProfile(),
    enabled: isEdit,
  });

  useEffect(() => {
    if (isEdit && merchantProfile) {
      setFormData({
        shopName: merchantProfile.shopName ?? "",
        businessCategory: merchantProfile.businessCategory ?? "",
        phoneNumber: merchantProfile.phoneNumber ?? "",
        businessEmail: merchantProfile.businessEmail ?? "",
        businessAddress: merchantProfile.businessAddress ?? "",
        state: merchantProfile.businessState ?? "",
        lga: merchantProfile.businessLga ?? "",
      });
    }
  }, [isEdit, merchantProfile]);

  const { mutate: registerMerchant, isPending: isRegistering } = useMutation({
    ...userMutations.becomeMerchant(),
    onSuccess: () => {
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: userQueries.all });
    },
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  const { mutate: updateMerchant, isPending: isUpdating } = useMutation({
    ...userMutations.updateMerchantProfile(),
    onSuccess: () => {
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: userQueries.all });
    },
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  const isPending = isRegistering || isUpdating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const {
      shopName,
      businessCategory,
      phoneNumber,
      businessEmail,
      businessAddress,
    } = formData;

    if (
      !shopName ||
      !businessCategory ||
      !phoneNumber ||
      !businessEmail ||
      !businessAddress
    ) {
      ErrorMessage("Please fill in all required fields");
      return;
    }

    const payload = {
      shopName,
      businessCategory,
      businessEmail,
      phoneNumber,
      businessAddress,
      businessState: formData.state || undefined,
      businessLga: formData.lga || undefined,
      businessLogo: businessLogo ?? undefined,
      proofOfAddress: proofOfAddress ?? undefined, // ← add
    };

    if (isEdit && merchantProfile) {
      updateMerchant({ merchantId: merchantProfile.id, data: payload });
    } else {
      registerMerchant(payload);
    }
  };

  if (success) {
    return (
      <SuccessConfirmationModal
        title={isEdit ? "Profile Updated" : "Registration Successful"}
        message={
          isEdit
            ? "Your merchant profile has been updated successfully."
            : "You have successfully completed your registration. We will notify you via email once your dashboard is ready."
        }
        onClose={() => {
          setSuccess(false);
          onClose();
        }}
      />
    );
  }

  return (
    <ModalLayout onClose={onClose} maxWidth="max-w-2xl" closeOnOutsideClick>
      <div className="w-full p-6 pt-10 pb-8 bg-white relative rounded-2xl">
        <CloseBtn onClose={onClose} />
        <div className="flex items-start flex-col gap-4">
          <h1 className="text-[22px] font-bold mb-2">
            {isEdit
              ? "Update Merchant Profile"
              : "Complete Merchant Registration"}
          </h1>

          <div className="grid grid-cols-2 gap-x-5 gap-y-4 w-full">
            <FormInput
              label="Shop Name"
              onChange={(e) => setFormData({ ...formData, shopName: e })}
              name="shopName"
              value={formData.shopName}
              placeholder="e.g. Musa Agro Store"
              textClass="!rounded-full w-full"
            />

            <div className="w-full">
              <label className="block text-sm font-semibold mb-2">
                Business Category
              </label>
              <CustomDropDown
                searchable={false}
                width="full"
                value={formData.businessCategory}
                options={BUSINESS_CATEGORIES}
                onChange={(v) =>
                  setFormData({ ...formData, businessCategory: v })
                }
                placeholder="Select category"
                searchholder="search categories"
                textclass="!py-3 !rounded-full"
              />
            </div>

            <FormInput
              label="Phone Number"
              onChange={(e) => setFormData({ ...formData, phoneNumber: e })}
              name="phoneNumber"
              value={formData.phoneNumber}
              placeholder="08000000000"
              type="numeric"
              textClass="!rounded-full w-full"
            />

            <FormInput
              label="Business Email"
              onChange={(e) => setFormData({ ...formData, businessEmail: e })}
              name="businessEmail"
              value={formData.businessEmail}
              placeholder="business@email.com"
              textClass="!rounded-full w-full"
            />

            <div className="w-full">
              <label className="block text-sm font-semibold mb-2">State</label>
              <CustomDropDown
                searchable
                width="full"
                value={formData.state}
                options={stateOptions}
                onChange={(v) =>
                  setFormData({ ...formData, state: v, lga: "" })
                }
                placeholder="Select state"
                searchholder="search states"
                textclass="!py-3 !rounded-full"
                autoSelectFirst={false}
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-semibold mb-2">
                Local Government Area
              </label>
              <CustomDropDown
                searchable
                width="full"
                value={formData.lga}
                options={lgaOptions}
                onChange={(v) => setFormData({ ...formData, lga: v })}
                placeholder="Select LGA"
                searchholder="search LGAs"
                disabled={!formData.state}
                textclass="!py-3 !rounded-full"
                autoSelectFirst={false}
              />
            </div>
          </div>

          <div className="w-full mt-1">
            <FormInput
              label="Business Address"
              onChange={(e) => setFormData({ ...formData, businessAddress: e })}
              name="businessAddress"
              value={formData.businessAddress}
              placeholder="Enter business address"
              textClass="!rounded-full w-full"
            />
          </div>

          {/* Files */}
          <div className="grid grid-cols-2 gap-5 w-full mt-2">
            {/* Business Logo */}
            <div className="w-full">
              <label className="block text-[13px] font-semibold">
                Business Logo
              </label>
              <p className="text-[11px] text-gray-500 mb-2">
                {isEdit
                  ? "Upload new logo to replace existing"
                  : "Optional — PNG or JPG"}
              </p>
              <div className="flex gap-2 h-20 items-center">
                <div
                  onClick={() => logoRef.current?.click()}
                  className="h-20 w-[140px] border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary shrink-0"
                >
                  {isEdit && merchantProfile?.businessLogo && !businessLogo ? (
                    <img
                      src={merchantProfile.businessLogo}
                      alt="Current logo"
                      className="w-full h-full object-cover rounded-lg opacity-50"
                    />
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-500"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  )}
                </div>
                {businessLogo && (
                  <div className="relative h-20 w-24 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                    <img
                      src={URL.createObjectURL(businessLogo)}
                      alt="New logo"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setBusinessLogo(null)}
                      className="absolute top-1 right-1 bg-red-500 w-4 h-4 rounded-full flex items-center justify-center text-white z-10"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                ref={logoRef}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) setBusinessLogo(e.target.files[0]);
                }}
              />
            </div>

            {/* Proof of Address */}
            <div className="w-full">
              <label className="block text-[13px] font-semibold">
                Proof Of Address
              </label>
              <p className="text-[11px] text-gray-500 mb-2">
                {isEdit
                  ? "Upload new document to replace existing"
                  : "Utility Bill or Business License (Image or PDF)"}
              </p>
              <div className="flex gap-2 h-20 items-center">
                <div
                  onClick={() => proofOfAddressRef.current?.click()}
                  className="h-20 w-[140px] border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary shrink-0"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-500"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>

                {proofOfAddress && (
                  <div className="relative h-20 w-24 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                    {proofOfAddress.type === "application/pdf" ? (
                      <div className="w-full h-full bg-red-50 flex flex-col items-center justify-center gap-1">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        <span className="text-[9px] font-bold text-red-500 uppercase">
                          PDF
                        </span>
                        <span className="text-[8px] text-gray-400 truncate w-full text-center px-1">
                          {proofOfAddress.name.length > 10
                            ? proofOfAddress.name.slice(0, 8) + "..."
                            : proofOfAddress.name}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={URL.createObjectURL(proofOfAddress)}
                        alt="Proof of address"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <button
                      onClick={() => setProofOfAddress(null)}
                      className="absolute top-1 right-1 bg-red-500 w-4 h-4 rounded-full flex items-center justify-center text-white z-10"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                ref={proofOfAddressRef}
                accept="image/*,application/pdf"
                onChange={(e) => {
                  if (e.target.files?.[0]) setProofOfAddress(e.target.files[0]);
                }}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full bg-primary text-white py-3.5 rounded-full font-semibold mt-4 hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isPending && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {isPending
              ? isEdit
                ? "Updating..."
                : "Submitting..."
              : isEdit
                ? "Update Profile"
                : "Submit"}
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default CompleteMerchantForm;
