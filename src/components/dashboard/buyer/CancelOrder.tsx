import ModalLayout from "@/layouts/ModalLayout";
import Image from "next/image";
import React, { useState } from "react";
import { useNavigate } from "@/hooks/useNavigate";

interface CancelOrderProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onRequestRefund: (reason?: string) => void;
}

const CancelOrder = ({
  isOpen,
  onClose,
  onConfirm,
  onRequestRefund,
}: CancelOrderProps) => {
  const { navigate } = useNavigate();
  const [step, setStep] = useState<"confirm" | "cancelled" | "refunded">(
    "confirm",
  );

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    setStep("cancelled");
  };

  const handleRefund = () => {
    onRequestRefund("Customer requested refund after cancellation");
    setStep("refunded");
  };

  return (
    <ModalLayout closeOnOutsideClick={false} onClose={onClose}>
      <div className="max-w-md mx-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-2 text-gray-500 hover:text-gray-700"
        >
          <Image
            src="/assets/images/status/cancel.png"
            alt="cancel"
            width={24}
            height={24}
          />
        </button>

        {step === "confirm" && (
          <div className="w-full mt-10 flex items-center justify-center flex-col gap-5">
            <p>Are you sure you want to cancel this order?</p>
            <div className="flex w-full flex-col gap-3">
              <button
                onClick={handleConfirm}
                className="w-full px-6 py-2 rounded-full text-white bg-red-500 hover:bg-red-600"
              >
                Yes, cancel order
              </button>
              <button
                onClick={onClose}
                className="w-full px-6 py-2 rounded-full border text-primary border-primary hover:bg-primary hover:text-white transition-colors"
              >
                No, go back
              </button>
            </div>
          </div>
        )}

        {step === "cancelled" && (
          <div className="w-full mt-10 flex items-center justify-center flex-col gap-5">
            <Image
              width={100}
              height={100}
              src="/assets/images/status/success.png"
              alt="success"
            />
            <p>Your order has been successfully cancelled</p>
            <button
              onClick={handleRefund}
              className="w-full px-6 py-2 text-white rounded-full bg-primary"
            >
              Request Refund
            </button>
            <p className="text-sm">
              Read our{" "}
              <span
                onClick={() => navigate("#")}
                className="text-primary cursor-pointer font-semibold"
              >
                Refund Policy here
              </span>
            </p>
          </div>
        )}

        {step === "refunded" && (
          <div className="w-full mt-10 flex items-center justify-center flex-col gap-5">
            <Image
              width={100}
              height={100}
              src="/assets/images/status/success.png"
              alt="success"
            />
            <p className="text-center">
              Your refund request has been processed and will be credited to
              your wallet shortly
            </p>
            <button
              onClick={onClose}
              className="w-full px-6 py-2 text-white rounded-full bg-primary"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </ModalLayout>
  );
};

export default CancelOrder;
