import React, { useState } from 'react';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/router';
import { ErrorMessage } from '@/utils/PageUtils';
import OtpVerification from '@/components/common/auth/OtpVerification';
import SuccessModal from '@/components/common/status/SuccessModal';
import ApiLoader from '@/components/common/ui/ApiLoader';

const ChangePassword = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        previousPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [otp, setOtp] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        previous: false,
        new: false,
        confirm: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const togglePasswordVisibility = (field: 'previous' | 'new' | 'confirm') => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSubmit = () => {
        return setOtp(true);
        if (formData.newPassword !== formData.confirmPassword) {
            ErrorMessage('New passwords do not match!');
            return;
        }
        console.log('Password change submitted');
        // Add your password change logic here
    };


    const verifyOtp = (code: string) => {
        console.log('Email OTP verified:', code);
        setOtpVerified(true)
    }
    const resendOtp = () => {
        console.log('Email OTP resent');
    }
    return (
        <div className="max-w-7xl mx-auto px-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <button
                    onClick={() => router.back()}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ChevronLeft size={20} />
                </button>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Change Password</h1>
            </div>

            <div className="bg-white rounded-2xl w-full shadow-sm p-6 lg:p-8">
                <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Previous Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Previous Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPasswords.previous ? "text" : "password"}
                                name="previousPassword"
                                value={formData.previousPassword}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                                placeholder="Enter Previous Password"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('previous')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPasswords.previous ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPasswords.new ? "text" : "password"}
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                                placeholder="Enter New Password"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('new')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm New Password */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPasswords.confirm ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                                placeholder="Confirm New Password"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('confirm')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
                <div className=" flex items-center flex-col gap-4">

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full lg:w-2/3 mx-auto lg py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                        Reset Password
                    </button>
                    {/* Password Requirements Info */}
                    <div className="mb-6 p-4  rounded-lg">
                        <p className="text-sm text-gray-600 text-center">
                            New password should be strong and different from the previous one
                        </p>
                    </div>
                </div>
            </div>


            <OtpVerification
                isOpen={otp}
                onClose={() => setOtp(false)}
                verificationType="email"
                contactInfo="myemail@gmail.com"
                otpLength={6}
                expiryTime={180}
                onVerifySuccess={(code) => verifyOtp(code)}
                onResend={resendOtp}
            />

            <SuccessModal
                isOpen={otpVerified}
                title="You have successfully changed your password"
                onClose={()=>setOtpVerified(false)}
                back_cta={true}
                back_cta_title='Continue'
                back_cta_url='/auth/buyer/settings'
            />

            <ApiLoader
             loading={loading}
            />

        </div>
    );
};

export default ChangePassword;