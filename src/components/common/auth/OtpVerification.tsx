import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ErrorMessage, SuccessMessage } from '@/utils/PageUtils';
import ModalLayout from '@/layouts/ModalLayout';

interface OtpVerificationProps {
    verificationType: 'email' | 'phone';
    isOpen: boolean
    contactInfo?: string; // email address or phone number to display
    otpLength?: number; // default 6
    expiryTime?: number; // in seconds, default 120
    onVerifySuccess: (otp: string) => void | Promise<void>;
    onResend?: () => void | Promise<void>;
    onClose: () => void;
    iconImage?: string; // custom icon path
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
    verificationType,
    onClose,
    contactInfo,
    isOpen = false,
    otpLength = 6,
    expiryTime = 120,
    onVerifySuccess,
    onResend,
    iconImage
}) => {
    const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(''));
    const [timer, setTimer] = useState(expiryTime);
    const [isExpired, setIsExpired] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Countdown timer
    useEffect(() => {
        if (timer > 0 && !isExpired) {
            const countdown = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        setIsExpired(true);
                        clearInterval(countdown);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(countdown);
        }
    }, [timer, isExpired]);

    // Format timer display
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
    };

    // Handle OTP input change
    const handleChange = (index: number, value: string) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only take the last digit
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < otpLength - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle backspace
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Handle paste
    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, otpLength);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split('').forEach((char, index) => {
            if (index < otpLength) newOtp[index] = char;
        });
        setOtp(newOtp);

        // Focus last filled input or next empty
        const nextIndex = Math.min(pastedData.length, otpLength - 1);
        inputRefs.current[nextIndex]?.focus();
    };

    // Handle proceed
    const handleProceed = () => {
        const otpCode = otp.join('');

        if (otpCode.length !== otpLength) return;
        if (isExpired) return;

        // Send OTP upward only
        onVerifySuccess(otpCode);
        onClose();
    };

    // Handle resend
    const handleResend = () => {
        setTimer(expiryTime);
        setIsExpired(false);
        setOtp(Array(otpLength).fill(''));
        inputRefs.current[0]?.focus();

        if (onResend) onResend();
    };

    const isComplete = otp.every(digit => digit !== '');
    

    // Dynamic text based on verification type
    const getTitle = () => {
        return verificationType === 'email' ? 'Email Verification' : 'Phone Verification';
    };

    const getDescription = () => {
        if (contactInfo) {
            return verificationType === 'email'
                ? `Please enter the OTP code sent to ${contactInfo}`
                : `Please enter the OTP code sent to ${contactInfo}`;
        }
        return verificationType === 'email'
            ? 'Please check your email for an OTP verification code'
            : 'Please check your phone for an OTP verification code';
    };

    const getIcon = () => {
        if (iconImage) return iconImage;
        return verificationType === 'email'
            ? '/assets/images/auth/security.png'
            : '/assets/images/auth/security.png'; // You can use different icon for phone
    };

    if (!isOpen) return null;

    return (
        <ModalLayout closeOnOutsideClick={false} onClose={onClose}>
            <div className="w-11/12 mx-auto flex items-center justify-center p-4">
                <div className=" rounded-4xl  w-full max-w-md relative">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{getTitle()}</h2>
                        <p className="text-gray-600 text-sm">{getDescription()}</p>
                    </div>

                    {/* Icon with Timer */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="p-3 w-fit mb-5 rounded-full bg-primary">
                            <Image
                                src={getIcon()}
                                width={40}
                                height={40}
                                alt="verification icon"
                            />
                        </div>
                        <p className="text-sm text-gray-600">
                            Expires in :{' '}
                            <span className={`font-semibold ${isExpired ? 'text-red-500' : 'text-primary'}`}>
                                {formatTime(timer)}
                            </span>
                        </p>
                        {isExpired && (
                            <p className="text-xs text-red-500 mt-1">OTP has expired</p>
                        )}
                    </div>

                    {/* OTP Input Boxes */}
                    <div className="flex justify-center gap-3 mb-8">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={index === 0 ? handlePaste : undefined}
                                disabled={isExpired || isLoading}
                                className={`
                                w-10 h-10 text-center text-xl font-semibold border rounded-lg 
                                transition-all duration-200
                                ${digit ? 'border-primary bg-primary/5' : 'border-gray-300 bg-white'}
                                ${isExpired || isLoading ? 'opacity-50 cursor-not-allowed' : 'focus:border-primary focus:outline-none'}
                                hover:border-primary/50
                            `}
                            />
                        ))}
                    </div>

                    {/* Proceed Button */}
                    <button
                        onClick={handleProceed}
                        disabled={!isComplete || isExpired || isLoading}
                        className={`
                        w-full py-3.5 rounded-full font-semibold transition-all duration-200
                        ${isComplete && !isExpired && !isLoading
                                ? 'bg-primary hover:bg-[#00DD00] text-white shadow-sm hover:shadow-md'
                                : 'border border-primary bg-white text-dark cursor-not-allowed'
                            }
                    `}
                    >
                        {isLoading ? 'Verifying...' : 'Proceed'}
                    </button>

                    {/* Resend Link */}
                    <div className="mt-6 text-center text-sm text-dark">
                        Didn't receive the OTP code?{' '}
                        {verificationType === 'email' ? 'Please check your spam folder or' : 'Please wait a moment or'}{' '}
                        try to resend the OTP code
                        {' '}
                        <button
                            onClick={handleResend}
                            disabled={isLoading}
                            className="text-primary hover:underline font-semibold underline disabled:opacity-50"
                        >
                            Resend code
                        </button>
                    </div>
                </div>
            </div>
        </ModalLayout>
    );
};

export default OtpVerification;