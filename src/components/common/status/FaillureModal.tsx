import React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { useNavigate } from "@/hooks/useNavigate";

type failedProps = {
    onClose: () => void
    isOpen: boolean
    description?: string
    title?: string
    payment?: boolean
}
const FailureModal = ({ onClose, isOpen, payment = false, title, description }: failedProps) => {
    const { navigate } = useNavigate()
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[9999]">
                    <div className="bg-white w-[330px] md:w-[380px] rounded-2xl p-6 text-center relative shadow-xl">

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                        >
                            <Image src={'/assets/images/status/cancel.png'} alt="cancel img" width={24} height={24} />
                        </button>

                        {/* Error Icon */}
                        <div className="flex justify-center mb-4">
                            <div className="">
                                <Image width={100} height={100} src="/assets/images/status/error.png" alt="error img" />
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-lg font-extrabold text-red-600">
                            {title}
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">
                            {description}
                        </p>

                        {/* Buttons */}
                        {payment && (
                            <>
                                <div className="mt-6 flex flex-col gap-3">

                                    <button
                                        onClick={() => {
                                            onClose();
                                            navigate('/market/marketplace/cart-items')
                                        }}
                                        className="bg-red-500 text-white py-3 rounded-lg font-semibold">
                                        Try Again
                                    </button>

                                    <button
                                        onClick={() => {
                                            onClose();
                                            navigate('/market/marketplace/cart/checkout')
                                        }}
                                        className="border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold">
                                        Go Back
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default FailureModal;
