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

const farmTypes = [
  { label: "Crops", value: "crops" },
  { label: "Livestock", value: "livestock" },
  { label: "Poultry", value: "poultry" },
  { label: "Mixed", value: "mixed" },
  { label: "Fishery", value: "fishery" },
];

const CompleteFarmersForm = ({ onClose }: props) => {
  const [formData, setFormData] = useState({
    name: "",
    type_of_produce: "",
    type_of_farm: "",
    size: "",
    state: "",
    lga: "",
    address: "",
  });

  const [proofOfOwnership, setProofOfOwnership] = useState<File | null>(null);
  const [proofOfAddress, setProofOfAddress] = useState<File | null>(null);
  const [proofPhotos, setProofPhotos] = useState<File[]>([]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { stateOptions, lgaOptions } = useStatesAndLgas({ selectedState: formData.state });

  const proofOfOwnershipRef = useRef<HTMLInputElement>(null);
  const proofOfAddressRef = useRef<HTMLInputElement>(null);
  const proofPhotosRef = useRef<HTMLInputElement>(null);

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

  const handleFarmTypeChange = (value: string) => {
    setFormData({ ...formData, type_of_farm: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccessModalOpen(true);
    }, 1500);
  };

  const removePhoto = (index: number) => {
    setProofPhotos(proofPhotos.filter((_, i) => i !== index));
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
      {previewImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 flex items-center gap-2"
            >
              Close <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <img src={previewImage} className="max-w-full max-h-[90vh] object-contain rounded-lg" alt="Preview" />
          </div>
        </div>
      )}

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
                  Type Of Farm
                </label>
                <CustomDropDown
                  searchable={false}
                  width="full"
                  value={formData.type_of_farm}
                  options={farmTypes}
                  onChange={handleFarmTypeChange}
                  placeholder="Crops"
                  searchholder="search farm types"
                  textclass="!py-3 !rounded-full"
                />
              </div>

              <FormInput
                label="Type Of Produce"
                onChange={(e) => setFormData({ ...formData, type_of_produce: e })}
                name="type_of_produce"
                value={formData.type_of_produce}
                placeholder="What you grow/rear"
                textClass="!rounded-full w-full"
              />

              <FormInput
                label="Farm Size"
                onChange={(e) => setFormData({ ...formData, size: e })}
                name="size"
                value={formData.size}
                placeholder="i.e 1 Acre"
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
                <label className="block text-[13px] font-semibold">Proof Of Farm Ownership</label>
                <p className="text-[11px] text-gray-500 mb-2">Land Document Or Farm Certificate</p>
                <div className="flex gap-2 h-20 items-center">
                  <div
                    onClick={() => proofOfOwnershipRef.current?.click()}
                    className="h-20 w-[140px] border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary shrink-0"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                  {proofOfOwnership && (
                    <div className="relative h-20 w-24 rounded-lg overflow-hidden border border-gray-200 shrink-0 group">
                      <img src={URL.createObjectURL(proofOfOwnership)} alt="Ownership" className="w-full h-full object-cover" />
                      <div
                        className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer transition-all"
                        onClick={() => setPreviewImage(URL.createObjectURL(proofOfOwnership))}
                      >
                        <span className="text-white text-[11px] font-medium tracking-wide">Preview</span>
                      </div>
                      <button
                        onClick={() => setProofOfOwnership(null)}
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
                  ref={proofOfOwnershipRef}
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setProofOfOwnership(e.target.files[0]);
                    }
                  }}
                />
              </div>

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
                      <div
                        className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer transition-all"
                        onClick={() => setPreviewImage(URL.createObjectURL(proofOfAddress))}
                      >
                        <span className="text-white text-[11px] font-medium tracking-wide">Preview</span>
                      </div>
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

            <div className="w-full mt-2">
              <label className="block text-[13px] font-semibold mb-2">Proof Photos (Atleast 3 Clear Images)</label>
              <div className="flex gap-2 h-20 overflow-x-auto items-center pb-1">
                <div
                  onClick={() => proofPhotosRef.current?.click()}
                  className="h-20 w-[140px] border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary shrink-0"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                {proofPhotos.map((photo, i) => (
                  <div key={i} className="relative h-20 w-24 rounded-lg overflow-hidden border border-gray-200 shrink-0 group">
                    <img src={URL.createObjectURL(photo)} alt={`Proof ${i + 1}`} className="w-full h-full object-cover" />
                    <div
                      className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer transition-all"
                      onClick={() => setPreviewImage(URL.createObjectURL(photo))}
                    >
                      <span className="text-white text-[11px] font-medium tracking-wide">Preview</span>
                    </div>
                    <button
                      onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 bg-red-500 w-4 h-4 rounded-full flex items-center justify-center text-white z-10"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="file"
                multiple
                className="hidden"
                ref={proofPhotosRef}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    const newFiles = Array.from(e.target.files);
                    setProofPhotos([...proofPhotos, ...newFiles]);
                  }
                }}
              />
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

export default CompleteFarmersForm;
