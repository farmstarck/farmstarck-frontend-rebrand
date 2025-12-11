import { useNavigate } from '@/hooks/useNavigate';
import ModalLayout from '@/layouts/ModalLayout';
import Image from 'next/image';
import React, { useState } from 'react'
interface cancelProps {
    isOpen: boolean;
    onClose: () => void;
}
const CancelOrder = ({ isOpen, onClose }: cancelProps) => {
    const { navigate } = useNavigate()
    if (!isOpen) return null;
    const [refundProcessed, setRefundProccessed] = useState(false)
    const [cancel, setCancel] = useState(false)
    return (
        <ModalLayout closeOnOutsideClick={false} onClose={onClose}>
            <div className="max-w-md mx-auto p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-2 text-gray-500 hover:text-gray-700"
                >
                    <Image
                        src={'/assets/images/status/cancel.png'}
                        alt="cancel img" width={24} height={24} />
                </button>
                {!cancel && (
                    <div className='w-full mt-10 flex items-center justify-center flex-col gap-5'>
                        <div className="">Are you sure you want to cancel order?</div>
                        <div className="flex w-full items-start flex-col gap-3">
                            <button
                                onClick={() => setCancel(true)}
                                className='w-full px-6 py-2 rounded-full hover:bg-red-600 text-white  border bg-red-500 '>Yes, continue</button>
                            <button
                                onClick={onClose}
                                className='w-full px-6 py-2 hover:bg-primary hover:text-white transition-colors rounded-full border text-primary border-primary'>No, go back</button>
                        </div>
                    </div>

                )}
                {cancel && !refundProcessed && (
                    <div className='w-full mt-10 flex items-center justify-center flex-col gap-5'>
                        <div className="flex justify-center mb-4">
                            <div className="">
                                <Image width={100} height={100} src="/assets/images/status/success.png" alt="success img" />
                            </div>
                        </div>
                        <div className="">Your order has been successfully cancelled</div>
                        <button
                            onClick={() => setRefundProccessed(true)}
                            className='w-full px-6 py-2 text-white transition-colors rounded-full bg-primary '>Request Refund</button>
                        <div className="text-sm">
                            Read our <span
                                onClick={() => navigate('#')}
                                className='text-primary cursor-pointer font-semibold'>Refund Policy here</span>
                        </div>
                    </div>

                )}
                {cancel && refundProcessed && (
                    <div className='w-full mt-10 flex items-center justify-center flex-col gap-5'>
                        <div className="flex justify-center mb-4">
                            <div className="">
                                <Image width={100} height={100} src="/assets/images/status/success.png" alt="success img" />
                            </div>
                        </div>
                        <div className="text-center">Your refund request has been processed and will be credited to your wallet shortly </div>
                        <button
                            onClick={onClose}
                            className='w-full px-6 py-2 text-white transition-colors rounded-full bg-primary '>Continue</button>

                    </div>

                )}
            </div>
        </ModalLayout>
    )
}

export default CancelOrder