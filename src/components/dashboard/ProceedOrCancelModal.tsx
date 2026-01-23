import ModalLayout from '@/layouts/ModalLayout';
import Image from 'next/image';
import React, { useState } from 'react'
import SuccessModal from '../common/status/SuccessModal';
import ApiLoader from '../common/ui/ApiLoader';

interface proceedModalProps {
    isOpen: boolean;
    title: string;
    onClose: () => void;
}
const ProceedOrCancelModal = ({ isOpen = false, title, onClose }: proceedModalProps) => {
    const [screen, setScreen] = useState<'show' | 'close'>('show');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);


    const handleSubmit = () => {
        setScreen('close');
        setIsSubmitting(true);
        return setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 2000);
    };

    return (
        <div className="w-full">
            {screen === 'show' && isOpen && (
                <ModalLayout onClose={onClose}>
                    <div className='w-full p-3'>
                        <div className="w-fit ml-auto mb-4">
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
                        <div className='w-full  flex items-center justify-center flex-col gap-5'>
                            <div className="font-bold text-lg">{title}</div>
                            <div className="flex w-full items-start flex-col gap-3">
                                <button
                                    onClick={handleSubmit}
                                    className='w-full px-6 py-2 rounded-full hover:bg-red-600 text-white  border bg-red-500 '>Yes, continue</button>
                                <button
                                    onClick={onClose}
                                    className='w-full px-6 py-2 hover:bg-primary hover:text-white transition-colors rounded-full border text-primary border-primary'>No, go back</button>
                            </div>
                        </div>
                    </div>
                </ModalLayout>
            )}

            <SuccessModal
                isOpen={submitted}
                onClose={() => { setSubmitted(false); onClose(); setScreen('show'); }}
                title='You have successfully closed this Ticket with ID: FRM-TCK-0143'
                back_cta={true}
                back_cta_title='Continue'
                back_cta_url='/auth/buyer/support/manage-tickets'
            />

            <ApiLoader
                loading={isSubmitting}
            />
        </div>
    )
}

export default ProceedOrCancelModal