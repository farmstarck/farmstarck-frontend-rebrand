import { AuthInput } from '@/components/common/auth/AuthInput'
import SuccessModal from '@/components/common/status/SuccessModal'
import { ErrorMessage } from '@/utils/PageUtils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        password: "", confirmPassword: ''
    })

    const [submitted, setSummited] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const { password, confirmPassword } = formData
        if (!password || !confirmPassword) return ErrorMessage('Fill in Password and Confirm Password')
        if (password !== confirmPassword) return ErrorMessage('Password(s) mismatch')
        setSummited(true)
    }


    return (
        <div className="min-h-screen flex">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="my-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Password</h1>
                        <p className="text-gray-600">Use a password that is strong and can easily accessed by you</p>
                    </div>


                    <div className="p-3 w-fit mb-5 rounded-full bg-primary">
                        <Image
                            src={`/assets/images/auth/security.png`}
                            width={24}
                            height={24}
                            lazyBoundary='200'
                            alt='logo image' />
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Password Input */}
                        <AuthInput
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(value) => setFormData({ ...formData, password: value })}
                            icon="lock"
                        />

                        {/* Confirm Password Input */}
                        <AuthInput
                            label="Confirm Password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.confirmPassword}
                            onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
                            icon="lock"
                        />



                        {/* Submit Button */}
                        <button
                            type="submit"
                            className=" w-full py-3.5 rounded-full bg-primary hover:bg-[#00DD00] text-white font-semibold transition-colors shadow-sm hover:shadow-md">
                            Submit
                        </button>

                        {/* Sign In Link */}
                        <p className="text-center text-sm text-gray-600">
                            Having any challenge?{' '}
                            <Link href="/contact" className="text-primary hover:underline font-semibold">
                                Contact Us
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            {/* Right Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center relative overflow-hidden">
                <Image
                    src={`/assets/images/auth/logo.png`}
                    width={400}
                    height={400}
                    lazyBoundary='200'
                    alt='logo image' />
            </div>

            <SuccessModal
                isOpen={submitted}
                back_cta={true}
                back_cta_title='Go to Login'
                back_cta_url='/signin'
                title='Password Reset Successful'
                onClose={() => setSummited(false)}
            />
        </div>
    )
}

export default ResetPassword