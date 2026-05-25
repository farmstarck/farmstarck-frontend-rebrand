import React from "react";
import Image from "next/image";
import { useNavigate } from "@/hooks/useNavigate";

interface FailureModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  payment?: boolean;
}

const FailureModal = ({
  isOpen,
  onClose,
  title,
  description,
  payment = false,
}: FailureModalProps) => {
  const { navigate } = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[9999]">
      <div className="bg-white w-[330px] md:w-[380px] rounded-2xl p-6 text-center relative shadow-xl">
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
            src="/assets/images/status/error.png"
            alt="error"
          />
        </div>

        <h2 className="text-lg font-extrabold text-red-600">{title}</h2>
        <p className="text-gray-600 text-sm mt-1">{description}</p>

        {payment && (
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={onClose}
              className="bg-red-500 text-white py-3 rounded-lg font-semibold w-full"
            >
              Try Again
            </button>
            <button
              onClick={() => {
                onClose();
                navigate("/dashboard/my-wallet");
              }}
              className="border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold w-full"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FailureModal;
