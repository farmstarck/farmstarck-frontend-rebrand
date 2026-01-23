import SuccessModal from "@/components/common/status/SuccessModal";
import ApiLoader from "@/components/common/ui/ApiLoader";
import ModalLayout from "@/layouts/ModalLayout";
import Image from "next/image";
import React, { useState } from "react";

interface Option {
    value: string;
    label: string;
}

interface SelectableListProps {
    options: Option[];
    selected: string | undefined;
    isOpen: boolean;
    label: string
    onChange: (value: string) => void;
    onClose: () => void;
}

const SelectableList = ({
    options,
    selected,
    onClose,
    label,
    isOpen = false,
    onChange,
}: SelectableListProps) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [screen, setScreen] = useState<'list' | 'success'>('list');

    const handleSubmit = () => {
        setScreen('success');
        setIsSubmitting(true);
        return setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 2000);
    };


    if (!isOpen) return null;
    return (

        <div className="">
            {screen === 'list' && (
                <ModalLayout onClose={onClose}>

                    <div className="w-full">
                        <div className="w-full flex items-center justify-between mb-5">
                            <label className="block text-base font-bold text-gray-900 mb-2">
                                {label}
                            </label>
                            <button
                                onClick={onClose}
                                className=" text-gray-500 hover:text-gray-700"
                            >
                                <Image
                                    src={'/assets/images/status/cancel.png'}
                                    alt="cancel img" width={24} height={24}
                                    style={{ width: "auto", height: "auto" }}
                                />
                            </button>

                        </div>

                        <div className="space-y-2">
                            {options.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => onChange(opt.value)}
                                    className="flex hover:bg-gray-100 px-3 py-1.5 rounded-md  w-full items-center justify-between text-left"
                                >
                                    <span className="text-gray-800 text-sm">{opt.label}</span>

                                    <div
                                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selected === opt.value
                                            ? "border-primary"
                                            : "border-gray-300 "
                                            }`}
                                    >
                                        {selected === opt.value && (
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full mt-6 py-3.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </ModalLayout>
            )}

            <SuccessModal
                isOpen={submitted}
                onClose={() => { setSubmitted(false); onClose(); setScreen('list'); }}
                description='Priority level changed successfully'
            />

            <ApiLoader
                loading={isSubmitting}
            />
        </div>
    )
};

export default SelectableList;
