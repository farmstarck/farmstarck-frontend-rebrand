"use client";
import { useState } from "react";
import { MoreVertical, Star, Trash2 } from "lucide-react";

export const getBankAccent = (bankName: string = "") => {
  const name = bankName.toLowerCase();
  if (name.includes("guaranty") || name.includes("gtb"))
    return { bg: "bg-[#F36B21]", ring: "ring-[#FDE1D3]" };
  if (name.includes("opay"))
    return { bg: "bg-[#15C39A]", ring: "ring-[#BDF3E5]" };
  if (name.includes("access"))
    return { bg: "bg-[#E31E24]", ring: "ring-[#FDDCDD]" };
  if (name.includes("zenith"))
    return { bg: "bg-[#B90000]", ring: "ring-[#F5CCCC]" };
  if (name.includes("uba"))
    return { bg: "bg-[#E4002B]", ring: "ring-[#FDD4DC]" };
  if (name.includes("first"))
    return { bg: "bg-[#003366]", ring: "ring-[#CCE0FF]" };
  if (name.includes("kuda"))
    return { bg: "bg-[#40196B]", ring: "ring-[#DDD0F0]" };
  return { bg: "bg-primary", ring: "ring-[#D9F5D4]" };
};

interface BankCardProps {
  detail: any;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

const BankCard = ({ detail, onDelete, onSetDefault }: BankCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const accent = getBankAccent(detail.bank?.name);
  const initials = (detail.bank?.name ?? "BK").slice(0, 2).toUpperCase();

  return (
    <div className="relative w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-full ${accent.bg} ring-4 ${accent.ring} flex items-center justify-center text-white text-xs font-bold shrink-0`}
          >
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-gray-900 text-sm">
                {detail.bank?.name}
              </p>
              {detail.isDefault && (
                <span className="text-[10px] font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Default
                </span>
              )}
            </div>
            {detail.paystackRecipientCode ? (
              <p className="text-[10px] text-green-600 mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                Verified with Paystack
              </p>
            ) : (
              <p className="text-[10px] text-orange-500 mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
                Pending verification
              </p>
            )}
          </div>
        </div>

        {/* Actions dropdown */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors"
          >
            <MoreVertical size={15} />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-10 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                {!detail.isDefault && (
                  <button
                    onClick={() => {
                      onSetDefault(detail.id);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Star size={14} className="text-yellow-500" />
                    Set as Default
                  </button>
                )}
                <button
                  onClick={() => {
                    onDelete(detail.id);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 size={14} />
                  Remove Account
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Account info */}
      <div className="mt-5">
        <p className="text-xl font-bold tracking-widest text-gray-800">
          {detail.accountNumber}
        </p>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mt-1">
          {detail.accountHolderName}
        </p>
      </div>
    </div>
  );
};

export default BankCard;
