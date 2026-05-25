"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, UserRound, Camera, FileText } from "lucide-react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userMutations, userQueries } from "@/queries/user.queries";
import { useStatesAndLgas } from "@/hooks/useStatesAndLgas";
import { CustomDropDown } from "@/components/common/CustomDropDown";
import { ErrorMessage, SuccessMessage } from "@/utils/PageUtils";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Package, MapPin, Info } from "lucide-react";
import Image from "next/image";

// ── Helpers ───────────────────────────────────────────────────────
const isPdfUrl = (url: string): boolean =>
  url.toLowerCase().includes(".pdf") || url.toLowerCase().includes("/raw/");

// Force public delivery for Cloudinary raw/PDF URLs
const getPublicPdfUrl = (url: string): string => {
  if (!url.includes("/raw/upload/")) return url;
  // Insert fl_attachment flag to force browser download/view
  return url.replace("/raw/upload/", "/raw/upload/fl_attachment/");
};

// ── Section wrapper ───────────────────────────────────────────────
const Section = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <Icon size={14} className="text-primary" />
      </div>
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
        {title}
      </h3>
    </div>
    {children}
  </div>
);

// ── Field wrapper ─────────────────────────────────────────────────
const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-400";

const BUSINESS_CATEGORIES = [
  { value: "raw_food_products", label: "Raw Food Products" },
  { value: "processed_food_products", label: "Processed Food Products" },
  { value: "fertilizers", label: "Fertilizers" },
  { value: "machineries", label: "Machineries" },
  { value: "others", label: "Others" },
];

// ── PDF Icon SVG ──────────────────────────────────────────────────
const PdfIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
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
);

// ── X Icon SVG ────────────────────────────────────────────────────
const XIcon = () => (
  <svg
    width="8"
    height="8"
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
);

const StoreInfo = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logoRef = useRef<HTMLInputElement | null>(null);
  const proofOfAddressRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    shopName: "",
    businessCategory: "",
    businessEmail: "",
    phoneNumber: "",
    state: "",
    lga: "",
    businessAddress: "",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [proofOfAddressFile, setProofOfAddressFile] = useState<File | null>(
    null,
  );
  const [proofOfAddressPreview, setProofOfAddressPreview] = useState<
    string | null
  >(null);

  const { stateOptions, lgaOptions } = useStatesAndLgas({
    selectedState: formData.state,
  });

  // ── Fetch merchant profile ────────────────────────────────────
  const { data: merchantProfileData, isLoading } = useQuery(
    userQueries.merchantProfile(),
  );
  const merchantProfile = merchantProfileData?.data;

  // ── Pre-fill on load ──────────────────────────────────────────
  useEffect(() => {
    if (!merchantProfile) return;
    setFormData({
      shopName: merchantProfile.shopName ?? "",
      businessCategory: merchantProfile.businessCategory ?? "",
      businessEmail: merchantProfile.businessEmail ?? "",
      phoneNumber: merchantProfile.phoneNumber ?? "",
      state: merchantProfile.businessState ?? "",
      lga: merchantProfile.businessLga ?? "",
      businessAddress: merchantProfile.businessAddress ?? "",
    });
    if (merchantProfile.businessLogo)
      setLogoPreview(merchantProfile.businessLogo);
    if (merchantProfile.proofOfAddressUrl)
      setProofOfAddressPreview(merchantProfile.proofOfAddressUrl);
  }, [merchantProfile]);

  // ── Mutation ──────────────────────────────────────────────────
  const { mutate: updateMerchant, isPending } = useMutation({
    ...userMutations.updateMerchantProfile(),
    onSuccess: () => {
      SuccessMessage("Store profile updated successfully");
      queryClient.invalidateQueries({ queryKey: userQueries.all });
    },
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (
      !formData.shopName ||
      !formData.businessCategory ||
      !formData.businessEmail ||
      !formData.phoneNumber ||
      !formData.businessAddress
    ) {
      ErrorMessage("Please fill in all required fields");
      return;
    }
    if (!merchantProfile?.id) {
      ErrorMessage("Merchant profile not found");
      return;
    }

    updateMerchant({
      merchantId: merchantProfile.id,
      data: {
        shopName: formData.shopName,
        businessCategory: formData.businessCategory,
        businessEmail: formData.businessEmail,
        phoneNumber: formData.phoneNumber,
        businessAddress: formData.businessAddress,
        businessState: formData.state || undefined,
        businessLga: formData.lga || undefined,
        businessLogo: logoFile ?? undefined,
        proofOfAddress: proofOfAddressFile ?? undefined,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 flex justify-center py-20">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 flex items-center gap-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} />
          <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
            Store Settings
          </h1>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 space-y-8">
        {/* ── Logo ─────────────────────────────────────────────── */}
        <Section icon={Info} title="Business Logo">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div
                onClick={() => logoRef.current?.click()}
                className="w-20 h-20 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary transition-colors"
              >
                {logoPreview ? (
                  <Image
                    width={60}
                    height={60}
                    src={logoPreview}
                    alt="Business logo"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <UserRound size={28} className="text-gray-400" />
                )}
              </div>
              <button
                type="button"
                onClick={() => logoRef.current?.click()}
                className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-primary rounded-full border-2 border-white flex items-center justify-center"
              >
                <Camera size={12} className="text-white" />
              </button>
              <input
                ref={logoRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">
                {logoPreview ? "Change Logo" : "Upload Logo"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                PNG or JPG, max 5MB. Shown on your store profile.
              </p>
              {logoFile && (
                <p className="text-xs text-primary mt-1 font-medium">
                  ✓ New logo selected — save to apply
                </p>
              )}
            </div>
          </div>
        </Section>

        {/* ── Business Info ─────────────────────────────────────── */}
        <Section icon={Package} title="Business Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Shop / Store Name" required>
              <input
                type="text"
                value={formData.shopName}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, shopName: e.target.value }))
                }
                placeholder="e.g. Musa Agro Store"
                className={inputClass}
              />
            </Field>

            <Field label="Business Category" required>
              <CustomDropDown
                searchable={false}
                width="full"
                value={formData.businessCategory}
                options={BUSINESS_CATEGORIES}
                onChange={(v) =>
                  setFormData((p) => ({ ...p, businessCategory: v }))
                }
                placeholder="Select category"
                textclass="!py-3 !rounded-xl !border-gray-200"
              />
            </Field>

            <Field label="Business Email" required>
              <input
                type="email"
                value={formData.businessEmail}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, businessEmail: e.target.value }))
                }
                placeholder="business@email.com"
                className={inputClass}
              />
            </Field>

            <Field label="Phone Number" required>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    phoneNumber: e.target.value.replace(/\D/g, ""),
                  }))
                }
                placeholder="08012345678"
                className={inputClass}
              />
            </Field>
          </div>
        </Section>

        {/* ── Business Address ──────────────────────────────────── */}
        <Section icon={MapPin} title="Business Address">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="State">
              <CustomDropDown
                key={`state-${formData.state}`}
                searchable
                width="full"
                value={formData.state}
                options={stateOptions}
                onChange={(v) =>
                  setFormData((p) => ({ ...p, state: v, lga: "" }))
                }
                placeholder="Select state"
                searchholder="Search states..."
                textclass="!py-3 !rounded-xl !border-gray-200"
                autoSelectFirst={false}
              />
            </Field>

            <Field label="Local Government Area">
              <CustomDropDown
                key={`lga-${formData.state}-${formData.lga}`}
                searchable
                width="full"
                value={formData.lga}
                options={lgaOptions}
                onChange={(v) => setFormData((p) => ({ ...p, lga: v }))}
                placeholder="Select LGA"
                searchholder="Search LGAs..."
                disabled={!formData.state}
                textclass="!py-3 !rounded-xl !border-gray-200"
                autoSelectFirst={false}
              />
            </Field>
          </div>

          <Field label="Street Address" required>
            <input
              type="text"
              value={formData.businessAddress}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  businessAddress: e.target.value,
                }))
              }
              placeholder="Enter your business street address"
              className={inputClass}
            />
          </Field>

          {merchantProfile?.businessAddress && (
            <p className="text-xs text-gray-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
              Current: {merchantProfile.businessAddress}
            </p>
          )}
        </Section>

        {/* ── Documents ─────────────────────────────────────────── */}
        <Section icon={FileText} title="Documents">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Proof of Address
              </label>
              <p className="text-xs text-gray-400">
                Utility Bill or Business License — Image or PDF
              </p>

              <div className="flex gap-3 items-center">
                {/* Upload trigger box */}
                <div
                  onClick={() => proofOfAddressRef.current?.click()}
                  className="h-20 w-36 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-primary transition-colors shrink-0 overflow-hidden"
                >
                  {/* Show saved doc when no new file selected */}
                  {proofOfAddressPreview && !proofOfAddressFile ? (
                    isPdfUrl(proofOfAddressPreview) ? (
                      <div className="flex flex-col items-center gap-1">
                        <PdfIcon size={22} />
                        <span className="text-[9px] text-red-500 font-bold uppercase">
                          PDF Saved
                        </span>
                      </div>
                    ) : (
                      <img
                        src={proofOfAddressPreview}
                        alt="Saved proof of address"
                        className="w-full h-full object-cover opacity-60"
                      />
                    )
                  ) : (
                    // Empty state — upload placeholder
                    <div className="flex flex-col items-center gap-1.5 text-gray-400">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <span className="text-[10px]">Upload</span>
                    </div>
                  )}
                </div>

                {/* New file preview */}
                {proofOfAddressFile && (
                  <div className="relative h-20 w-24 rounded-xl overflow-hidden border border-gray-200 shrink-0">
                    {proofOfAddressFile.type === "application/pdf" ? (
                      <div className="w-full h-full bg-red-50 flex flex-col items-center justify-center gap-1">
                        <PdfIcon size={18} />
                        <span className="text-[9px] font-bold text-red-500 uppercase">
                          PDF
                        </span>
                        <span className="text-[8px] text-gray-400 truncate w-full text-center px-1">
                          {proofOfAddressFile.name.length > 10
                            ? proofOfAddressFile.name.slice(0, 8) + "..."
                            : proofOfAddressFile.name}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={URL.createObjectURL(proofOfAddressFile)}
                        alt="New proof of address"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => setProofOfAddressFile(null)}
                      className="absolute top-1 right-1 bg-red-500 w-4 h-4 rounded-full flex items-center justify-center text-white z-10"
                    >
                      <XIcon />
                    </button>
                  </div>
                )}
              </div>

              {/* Status hints */}
              {proofOfAddressFile && (
                <p className="text-xs text-primary font-medium">
                  ✓ New document selected — save to apply
                </p>
              )}

              {/* View saved document link */}
              {!proofOfAddressFile && proofOfAddressPreview && (
                <a
                  href={
                    isPdfUrl(proofOfAddressPreview)
                      ? getPublicPdfUrl(proofOfAddressPreview)
                      : proofOfAddressPreview
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary font-medium hover:underline"
                >
                  View current document →
                </a>
              )}

              <input
                ref={proofOfAddressRef}
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setProofOfAddressFile(file);
                }}
              />
            </div>
          </div>
        </Section>

        {/* ── Save button ───────────────────────────────────────── */}
        <div className="flex gap-3 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
          >
            {isPending && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

StoreInfo.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default StoreInfo;
