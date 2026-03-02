import React from "react";
import Image from "next/image";
import { useNavigate } from "@/hooks/useNavigate";

type successprops = {
    onClose: () => void
    payment?: boolean
    isOpen: boolean
    title?: string
    description?: string
    cta?: boolean
    back_cta?: boolean
    back_cta_url?: string
    back_cta_title?: string
    cta_url?: string
    cta_title?: string
}

const SuccessModal =
    ({ onClose,
        isOpen,
        cta_title,
        cta = false,
        cta_url,
        back_cta = false,
        back_cta_title,
        back_cta_url,
        title,
        description
    }: successprops) => {
        const { navigate } = useNavigate()

        return (
            <>
                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999]">
                        <div className="bg-white w-11/12 mx-auto md:max-w-xl lg:max-w-md rounded-2xl p-14 text-center relative shadow-xl">

                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                            >
                                <Image src={'/assets/images/status/cancel.png'} alt="cancel img" width={24} height={24} />
                            </button>

                            {/* Success Icon */}
                            <div className="flex justify-center mb-4">
                                <div className="">
                                    <Image width={100} height={100} src="/assets/images/status/success.png" alt="success img" />
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="text-lg font-bold">{title}</h2>
                            {description && <p className=" font-medium text-base mt-1">
                                {description}
                            </p>}

                            {/* Buttons */}
                            {back_cta && (
                                <div className="mt-6 flex flex-col mb-3">

                                    <button
                                        onClick={() => {
                                            onClose();
                                            navigate(back_cta_url!)
                                        }}
                                        className="bg-primary w-full text-white py-3 rounded-full font-semibold">
                                        {back_cta_title}
                                    </button>
                                </div>

                            )}

                            {cta && (
                                <button
                                    onClick={() => {
                                        onClose();
                                        navigate(cta_url!)
                                    }}
                                    className="border w-full mt-6 rounded-full hover:bg-primary hover:text-white border-primary text-primary py-3  font-semibold">
                                    {cta_title}
                                </button>
                            )}

                        </div>
                    </div>
                )}
            </>
        );
    };

export default SuccessModal;
