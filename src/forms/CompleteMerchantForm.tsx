import FormInput from "@/components/common/auth/FormInput";
import { CustomDropDown } from "@/components/common/CustomDropDown";
import CloseBtn from "@/components/common/Navigation/CloseBtn";
import ModalLayout from "@/layouts/ModalLayout";
import React, { useState, useRef } from "react";
import { useStatesAndLgas } from "@/hooks/useStatesAndLgas";
import SuccessConfirmationModal from "@/components/dashboard/ui/SuccessConfirmationModal";
import ApiLoader from "@/components/common/ui/ApiLoader";

interface props {
  onClose: () => void;
}

const businessCategories = [
  { label: "Raw Food Products", value: "raw_food_products" },
  { label: "Processed Food Products", value: "processed_food_products" },
  { label: "Fertilizers", value: "fertilizers" },
  { label: "Machineries", value: "machineries" },
  { label: "Others", value: "others" },
];

const CompleteMerchantForm = ({ onClose }: props) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    phoneNumber: "",
    email: "",
    state: "",
    lga: "",
    address: "",
  });

  const [proofOfAddress, setProofOfAddress] = useState<File | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { stateOptions, lgaOptions } = useStatesAndLgas({ selectedState: formData.state });

  const proofOfAddressRef = useRef<HTMLInputElement>(null);

  const handleStateChange = (value: string) => {
    setFormData({
      ...formData,
      state: value,
      lga: "", // Reset LGA when state changes
    });
  };

  const handleLgaChange = (value: string) => {
    setFormData({ ...formData, lga: value });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccessModalOpen(true);
    }, 1500);
  };

  

  if (isSuccessModalOpen) {
    return (
      <SuccessConfirmationModal
        title="Registration Successful"
        message="You have successfully completed your registration,
we will notify you via email once your dashboard is ready"
        onClose={() => {
          setIsSuccessModalOpen(false);
          onClose(); // close the main modal as well
        }}
      />
    );
  }

  if (isSubmitting) {
    return <ApiLoader loading={isSubmitting} />
  }


  return (
    <>
      

      <ModalLayout onClose={onClose} maxWidth="max-w-2xl" closeOnOutsideClick>
        <div className="w-full p-6 pt-10 pb-8 bg-white relative rounded-2xl">
          <CloseBtn onClose={onClose} />
          <div className="flex items-start flex-col gap-4">
            <h1 className="text-[22px] font-bold mb-2">Complete Farmer Registration</h1>

            <div className="grid grid-cols-2 gap-x-5 gap-y-4 w-full">
              <FormInput
                label="Farm Name"
                onChange={(e) => setFormData({ ...formData, name: e })}
                name="name"
                value={formData.name}
                placeholder="i.e Musa Livestock Farm"
                textClass="!rounded-full w-full"
              />

              <div className="w-full">
                <label className="block text-sm font-semibold mb-2">
                  Business Category
                </label>
                <CustomDropDown
                  searchable={false}
                  width="full"
                  value={formData.category}
                  options={businessCategories}
                  onChange={handleCategoryChange}
                  placeholder="Crops"
                  searchholder="search farm types"
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
                maxLength={10}
                textClass="!rounded-full w-full"
              />

              <FormInput
                label="Business Email"
                onChange={(e) => setFormData({ ...formData, email: e })}
                name="email"
                value={formData.email}
                placeholder="enter business email"
                textClass="!rounded-full w-full"
              />

              <div className="w-full">
                <label className="block text-sm font-semibold mb-2">
                  State
                </label>
                <CustomDropDown
                  searchable={true}
                  width="full"
                  value={formData.state}
                  options={stateOptions}
                  onChange={handleStateChange}
                  placeholder="Lagos"
                  searchholder="search states"
                  textclass="!py-3 !rounded-full"
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-semibold mb-2">
                  Local Government Area
                </label>
                <CustomDropDown
                  searchable={true}
                  width="full"
                  value={formData.lga}
                  options={lgaOptions}
                  onChange={handleLgaChange}
                  placeholder="Lagos"
                  searchholder="search lgas"
                  textclass="!py-3 !rounded-full"
                />
              </div>
            </div>

            <div className="w-full mt-1">
              <FormInput
                label="Farm Address"
                onChange={(e) => setFormData({ ...formData, address: e })}
                name="address"
                value={formData.address}
                placeholder="enter farm address"
                textClass="!rounded-full w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-5 w-full mt-2">
            

              <div className="w-full">
                <label className="block text-[13px] font-semibold">Proof Of Address</label>
                <p className="text-[11px] text-gray-500 mb-2">Utility Bill Or Farm License</p>
                <div className="flex gap-2 h-20 items-center">
                  <div
                    onClick={() => proofOfAddressRef.current?.click()}
                    className="h-20 w-[140px] border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary shrink-0"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                  {proofOfAddress && (
                    <div className="relative h-20 w-24 rounded-lg overflow-hidden border border-gray-200 shrink-0 group">
                      <img src={URL.createObjectURL(proofOfAddress)} alt="Address" className="w-full h-full object-cover" />
            
                      <button
                        onClick={() => setProofOfAddress(null)}
                        className="absolute top-1 right-1 bg-red-500 w-4 h-4 rounded-full flex items-center justify-center text-white z-10"
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  ref={proofOfAddressRef}
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setProofOfAddress(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>


            <button
              onClick={handleSubmit}
              className="w-full bg-[#00C013] text-white py-3.5 rounded-full font-semibold mt-4 hover:bg-primary/90 transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </ModalLayout>
    </>
  );
};

export default CompleteMerchantForm;
