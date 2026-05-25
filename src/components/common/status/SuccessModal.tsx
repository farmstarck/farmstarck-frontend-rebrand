import React from "react";
import Image from "next/image";
import { useNavigate } from "@/hooks/useNavigate";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  cta?: boolean;
  cta_title?: string;
  cta_url?: string;
  back_cta?: boolean;
  back_cta_title?: string;
  back_cta_url?: string;
}

const SuccessModal = ({
  isOpen,
  onClose,
  title,
  description,
  cta = false,
  cta_title,
  cta_url,
  back_cta = false,
  back_cta_title,
  back_cta_url,
}: SuccessModalProps) => {
  const { navigate } = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999]">
      <div className="bg-white w-11/12 mx-auto md:max-w-xl lg:max-w-md rounded-2xl p-14 text-center relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <Image
            src="/assets/images/status/cancel.png"
            alt="close"
            width={24}
            height={24}
          />
        </button>

        <div className="flex justify-center mb-4">
          <Image
            width={100}
            height={100}
            src="/assets/images/status/success.png"
            alt="success"
          />
        </div>

        {title && <h2 className="text-lg font-bold">{title}</h2>}
        {description && (
          <p className="font-medium text-base mt-1">{description}</p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          {back_cta && back_cta_url && (
            <button
              onClick={() => {
                // onClose();
                navigate(back_cta_url);
              }}
              className="bg-primary w-full text-white py-3 rounded-full font-semibold"
            >
              {back_cta_title}
            </button>
          )}
          {cta && cta_url && (
            <button
              onClick={() => {
                onClose();
                navigate(cta_url);
              }}
              className="border w-full rounded-full hover:bg-primary hover:text-white border-primary text-primary py-3 font-semibold transition-colors"
            >
              {cta_title}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
