import FormInput from "@/components/common/auth/FormInput";
import { CustomDropDown } from "@/components/common/CustomDropDown";
import CloseBtn from "@/components/common/Navigation/CloseBtn";
import ModalLayout from "@/layouts/ModalLayout";
import React, { useState, useRef, RefObject, useEffect } from "react";
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
interface FileUploadSlotProps {
  label: string;
  hint: string;
  file: File | null;
  onClear: () => void;
  onUpload: (f: File) => void;
  inputRef: RefObject<HTMLInputElement | null>; // ← add | null
}

const FARM_TYPES = [
  { label: "Crops", value: "crops" },
  { label: "Livestock", value: "livestock" },
  { label: "Poultry", value: "poultry" },
  { label: "Mixed", value: "mixed" },
  { label: "Fishery", value: "fishery" },
];

const CompleteFarmersForm = ({ onClose, isEdit }: Props) => {
  const queryClient = useQueryClient();

  const proofOfOwnershipRef = useRef<HTMLInputElement>(null);
  const proofOfAddressRef = useRef<HTMLInputElement>(null);
  const farmPhotoRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    farmName: "",
    produceTypes: "",
    farmType: "",
    farmSize: "",
    state: "",
    lga: "",
    farmAddress: "",
  });
  const [proofOfOwnership, setProofOfOwnership] = useState<File | null>(null);
  const [proofOfAddress, setProofOfAddress] = useState<File | null>(null);
  const [farmPhoto, setFarmPhoto] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { stateOptions, lgaOptions } = useStatesAndLgas({
    selectedState: formData.state,
  });

  const { mutate: becomeFarmer, isPending } = useMutation({
    ...userMutations.becomeFarmer(),
    onSuccess: () => {
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: userQueries.all });
    },
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  // Edit Farmer
  const { data: farmerProfile } = useQuery(userQueries.farmerProfile());

  const { mutate, isPending: isUpdatingFarmer } = useMutation({
    ...(isEdit
      ? userMutations.updateFarmerProfile()
      : userMutations.becomeFarmer()),
    onSuccess: () => {
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: userQueries.all });
    },
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  // Pre-fill on edit
  useEffect(() => {
    if (isEdit && farmerProfile) {
      setFormData({
        farmName: farmerProfile.farmName ?? "",
        farmType: farmerProfile.farmType ?? "",
        produceTypes: farmerProfile.produceTypes ?? "",
        farmSize: String(farmerProfile.farmSize ?? ""),
        farmAddress: farmerProfile.farmAddress ?? "",
        state: farmerProfile.farmState ?? "",
        lga: farmerProfile.farmLga ?? "",
      });
    }
  }, [isEdit, farmerProfile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { farmName, farmType, farmAddress } = formData;
    if (!farmName || !farmType || !farmAddress) {
      ErrorMessage("Please fill in all required fields");
      return;
    }
    becomeFarmer({
      farmName,
      farmType,
      farmAddress,
      farmState: formData.state || undefined,
      farmLga: formData.lga || undefined,
      produceTypes: formData.produceTypes || undefined,
      farmSize: formData.farmSize ? Number(formData.farmSize) : undefined,
      proofOfOwnership: proofOfOwnership ?? undefined,
      farmPhoto: farmPhoto ?? undefined,
      proofOfAddress: proofOfAddress ?? undefined,
    });
  };

  const FileUploadSlot = ({
    label,
    hint,
    file,
    onClear,
    onUpload,
    inputRef,
  }: FileUploadSlotProps) => {
    const isPdf = file?.type === "application/pdf";

    return (
      <div className="w-full">
        <label className="block text-[13px] font-semibold">{label}</label>
        <p className="text-[11px] text-gray-500 mb-2">{hint}</p>
        <div className="flex gap-2 h-20 items-center">
          <div
            onClick={() => inputRef.current?.click()}
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

          {file && (
            <div className="relative h-20 w-24 rounded-lg overflow-hidden border border-gray-200 shrink-0 group">
              {isPdf ? (
                // ── PDF preview ────────────────────────────────────
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
                    {file.name.length > 10
                      ? file.name.slice(0, 8) + "..."
                      : file.name}
                  </span>
                </div>
              ) : (
                // ── Image preview ───────────────────────────────────
                <>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={label}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer"
                    onClick={() => setPreviewImage(URL.createObjectURL(file))}
                  >
                    <span className="text-white text-[11px] font-medium">
                      Preview
                    </span>
                  </div>
                </>
              )}

              {/* Remove button */}
              <button
                onClick={onClear}
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
          ref={inputRef as React.RefObject<HTMLInputElement>}
          accept="image/*,application/pdf"
          onChange={(e) => {
            if (e.target.files?.[0]) onUpload(e.target.files[0]);
          }}
        />
      </div>
    );
  };

  if (success) {
    return (
      <SuccessConfirmationModal
        title="Registration Successful"
        message="You have successfully completed your registration. We will notify you via email once your dashboard is ready."
        onClose={() => {
          setSuccess(false);
          onClose();
        }}
      />
    );
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
              Close ✕
            </button>
            <img
              src={previewImage}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              alt="Preview"
            />
          </div>
        </div>
      )}

      <ModalLayout onClose={onClose} maxWidth="max-w-2xl" closeOnOutsideClick>
        <div className="w-full p-6 pt-10 pb-8 bg-white relative rounded-2xl">
          <CloseBtn onClose={onClose} />
          <div className="flex items-start flex-col gap-4">
            <h1 className="text-[22px] font-bold mb-2">
              Complete Farmer Registration
            </h1>

            <div className="grid grid-cols-2 gap-x-5 gap-y-4 w-full">
              <FormInput
                label="Farm Name"
                onChange={(e) => setFormData({ ...formData, farmName: e })}
                name="farmName"
                value={formData.farmName}
                placeholder="e.g. Musa Livestock Farm"
                textClass="!rounded-full w-full"
              />

              <div className="w-full">
                <label className="block text-sm font-semibold mb-2">
                  Type Of Farm
                </label>
                <CustomDropDown
                  searchable={false}
                  width="full"
                  value={formData.farmType}
                  options={FARM_TYPES}
                  onChange={(v) => setFormData({ ...formData, farmType: v })}
                  placeholder="Select farm type"
                  searchholder="search farm types"
                  textclass="!py-3 !rounded-full"
                />
              </div>

              <FormInput
                label="Type Of Produce"
                onChange={(e) => setFormData({ ...formData, produceTypes: e })}
                name="produceTypes"
                value={formData.produceTypes}
                placeholder="What you grow/rear"
                textClass="!rounded-full w-full"
              />

              <FormInput
                label="Farm Size (Acres)"
                onChange={(e) => setFormData({ ...formData, farmSize: e })}
                name="farmSize"
                value={formData.farmSize}
                placeholder="e.g. 1.5"
                textClass="!rounded-full w-full"
              />

              <div className="w-full">
                <label className="block text-sm font-semibold mb-2">
                  State
                </label>
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
                label="Farm Address"
                onChange={(e) => setFormData({ ...formData, farmAddress: e })}
                name="farmAddress"
                value={formData.farmAddress}
                placeholder="Enter farm address"
                textClass="!rounded-full w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-5 w-full mt-2">
              <FileUploadSlot
                label="Proof Of Farm Ownership"
                hint="Land Document or Farm Certificate (Image or PDF)"
                file={proofOfOwnership}
                onClear={() => setProofOfOwnership(null)}
                onUpload={setProofOfOwnership}
                inputRef={proofOfOwnershipRef}
              />
              <FileUploadSlot
                label="Proof Of Address"
                hint="Utility Bill or Farm License (Image or PDF)"
                file={proofOfAddress}
                onClear={() => setProofOfAddress(null)}
                onUpload={setProofOfAddress}
                inputRef={proofOfAddressRef}
              />
            </div>

            <div className="w-full mt-2">
              <FileUploadSlot
                label="Farm Photo"
                hint="At least 1 clear photo of your farm"
                file={farmPhoto}
                onClear={() => setFarmPhoto(null)}
                onUpload={setFarmPhoto}
                inputRef={farmPhotoRef}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="w-full bg-primary text-white py-3.5 rounded-full font-semibold mt-4 hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isPending && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </ModalLayout>
    </>
  );
};

export default CompleteFarmersForm;
