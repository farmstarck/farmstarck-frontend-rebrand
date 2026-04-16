'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import CloseBtn from '@/components/common/Navigation/CloseBtn'
import ModalLayout from '@/layouts/ModalLayout'

interface FundWalletProps {
    onClose: () => void
}

type Step = 'amount' | 'payment' | 'success'

const paymentMethods = [
    {
        title: "paystack",
        id: 1,
        img: "/assets/images/payment/paystack.png",
        desc: "Debit Card/Bank Transfer/USSD",
    },
    {
        title: "flutterwave",
        id: 2,
        img: "/assets/images/payment/flutterwave.png",
        desc: "Debit Card/Bank Transfer/USSD",
    },
    {
        title: "smartcash",
        id: 3,
        img: "/assets/images/payment/smartcash.png",
        desc: "Debit Card/Bank Transfer/USSD",
    },
]

export default function FundWallet({ onClose }: FundWalletProps) {
    const [step, setStep] = useState<Step>('amount')
    const [amount, setAmount] = useState('')
    const [selectedMethod, setSelectedMethod] = useState('paystack')

    const handleAmountInput = (val: string) => {
        const raw = val.replace(/[^0-9]/g, '')
        if (!raw) return setAmount('')
        const formatted = Number(raw).toLocaleString('en-NG')
        setAmount(formatted)
    }

    return (
        <ModalLayout onClose={onClose} maxWidth="max-w-lg">

            {/* ── Step 1: Enter Amount ── */}
            {step === 'amount' && (
                <>
                    <div className="flex items-center justify-between px-5 py-8 border-b border-white/10">
                        <p className="text-base font-bold">Fund Wallet</p>
                        <CloseBtn onClose={onClose} />
                    </div>
                    <div className="p-5 flex flex-col gap-4">
                        <div>
                            <p className="text-xs font-semibold mb-2">Enter Amount</p>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={amount ? `N${amount}` : ''}
                                onChange={e => handleAmountInput(e.target.value.replace(/^N/, ''))}
                                placeholder="N0.00"
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base font-semibold text-dark placeholder:text-gray-800 focus:outline-none focus:border-gray-300 transition-colors"
                            />
                        </div>
                        <button
                            onClick={() => setStep('payment')}
                            disabled={!amount || parseFloat(amount) <= 0}
                            className="w-full py-3.5 bg-(--primary) hover:bg-(--primary)/90 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all text-white text-sm font-semibold rounded-xl"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </>
            )}

            {/* ── Step 2: Choose Payment Method ── */}
            {step === 'payment' && (
                <>
                    <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div
                                onClick={() => setStep('amount')}
                                className="border border-gray-500 rounded-md cursor-pointer"
                            >
                                <ChevronLeftIcon className='text-sm text-gray-600' />
                            </div>
                            <p className="text-base md:text-lg font-bold">Complete Payment</p>
                        </div>
                        <CloseBtn onClose={onClose} />
                    </div>
                    <div className="p-5 flex flex-col gap-4">
                        <p className="text-xs text-gray-800">Choose Payment Method</p>

                        <div className="w-full flex flex-col gap-4 bg-white rounded-xl shadow-lg">
                            {paymentMethods.map((method, index) => {
                                const isSelected = selectedMethod === method.title

                                return (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedMethod(method.title)}
                                        className={`
                                            flex items-center justify-between w-full p-3 rounded-lg border transition-all cursor-pointer
                                            ${isSelected ? "border-primary bg-green-50" : "border-gray-300"}
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={method.img}
                                                alt={method.title}
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                            />
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-black">
                                                    Pay with {method.title}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {method.desc}
                                                </span>
                                            </div>
                                        </div>

                                        <div className={`
                                            w-5 h-5 flex items-center justify-center rounded-full border
                                            ${isSelected ? "bg-primary border-primary" : "border-gray-400"}
                                        `}>
                                            <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <button
                            onClick={() => setStep('success')}
                            className="w-full py-3.5 bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all text-white text-sm font-semibold rounded-xl mt-1"
                        >
                            Pay Now
                        </button>
                    </div>
                </>
            )}

            {/* ── Step 3: Success ── */}
            {step === 'success' && (
                <>
                    <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                        <p className="text-base md:text-lg font-bold mt-3">Request Successful</p>
                        <CloseBtn onClose={onClose} />
                    </div>
                    <div className="p-8 flex flex-col items-center gap-5 text-center">
                        <div className="flex justify-center mb-4">
                            <Image
                                width={100}
                                height={100}
                                src="/assets/images/status/success.png"
                                alt="success img"
                            />
                        </div>
                        <p className="text-base leading-relaxed">
                            You have successfully funded your account with{' '}
                            <span className="font-bold">
                                NGN{parseFloat(amount.replace(/,/g, '') || '0').toLocaleString()}.00
                            </span>
                        </p>
                        <button
                            onClick={onClose}
                            className="w-full py-3.5 bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all text-white text-sm font-semibold rounded-xl"
                        >
                            Continue
                        </button>
                    </div>
                </>
            )}

        </ModalLayout>
    )
}