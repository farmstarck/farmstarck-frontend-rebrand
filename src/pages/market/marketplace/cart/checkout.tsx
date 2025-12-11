import Navigation from '@/components/common/MarketPlace/Navigation'
import MarketPlaceLayout from '@/layouts/MarketPlaceLayout';
import React, { useEffect, useState } from 'react'
import { useCartStore } from '@/store/Client/CartSlice';
import Image from 'next/image';
import { allStates, fetchLGAs, nigerianStatesWithLGAs, type lgaTypes } from '@/data/states';
import { CustomDropDown } from '@/components/common/CustomDropDown';
import { isObject } from 'framer-motion';
import { useNavigate } from '@/hooks/useNavigate';


const Checkout = () => {
    const { cart } = useCartStore();
    const { navigate } = useNavigate()
    const [deliveryMethod, setDeliveryMethod] = useState<'doorstep' | 'pickup'>('doorstep');
    const [saveAddress, setSaveAddress] = useState(true);
    const [lgaOptions, setLgaOptions] = useState<Array<{ value: string, label: string }>>([]);



    const statesArr = allStates.map(state => ({
        label: state,
        value: state
    }));
    // Form states
    const [formData, setFormData] = useState({
        recipientName: '',
        streetAddress: '',
        state: '',
        lga: '',
        landmark: '',
        phoneNumber: '',
        email: ''
    });


    // Update LGA options when state changes
    useEffect(() => {
        if (formData.state) {
            const state = nigerianStatesWithLGAs.find(state => state.state === formData.state);

            // Check if state is an object before mapping the lgas
            if (isObject(state)) {
                const lgaDropdownOptions = state.lgas.map(lga => ({
                    label: lga,
                    value: lga
                }));
                setLgaOptions(lgaDropdownOptions)
            } else {
                setLgaOptions([]);
            }
        }
    }, [formData.state]);

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.amount * (item.cartQuantity || 1)), 0);
    const shippingFee = deliveryMethod === 'doorstep' ? 7500 : 0;
    const vat = 0;
    const estimatedTotal = subtotal + shippingFee + vat;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'phoneNumber') {
            const numericValue = value.replace(/\D/g, '');
            setFormData({
                ...formData,
                [name]: numericValue
            });
            return;
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleStateChange = (value: string) => {
        setFormData({
            ...formData,
            state: value
        });
    };

    const handleLGAChange = (value: string) => {
        setFormData({
            ...formData,
            lga: value
        });
    };

    // const () => navigate('/market/marketplace/cart/checkout/payment') = () => {
    //     console.log('Proceeding to payment...', formData);
    //     // Add payment logic here
    // };

    return (
        <div className='w-full py-5 satoshi bg-lite min-h-screen'>
            <div className="w-11/12 lg:max-w-7xl mx-auto">
                <Navigation routes={
                    [
                        { name: 'Cart', href: '/market/marketplace/cart-items' }
                    ]
                }
                    forward={true}
                />

                {/* Page Title */}
                <div className="my-6 text-2xl font-extrabold ">Checkout</div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Section - Delivery & Form */}
                    <div className="lg:col-span-2 space-y-5 order-2 lg:order-1">
                        {/* Delivery Method Selection */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-dark-green mb-4">
                                Choose a preferred way you would love to get your order
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Doorstep Delivery */}
                                <button
                                    onClick={() => setDeliveryMethod('doorstep')}
                                    className={`
                                        relative p-4 rounded-xl border-2 transition-all duration-300
                                        ${deliveryMethod === 'doorstep'
                                            ? 'border-primary bg-primary/5'
                                            : 'border-gray-200 hover:border-primary/50'
                                        }
                                    `}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`
                                            w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                                            ${deliveryMethod === 'doorstep'
                                                ? 'border-primary'
                                                : 'border-gray-300'
                                            }
                                        `}>
                                            {deliveryMethod === 'doorstep' && (
                                                <div className="w-3 h-3 rounded-full bg-primary"></div>
                                            )}
                                        </div>
                                        <div className="text-left">
                                            <div className="font-bold text-dark-green mb-1">Doorstep Delivery</div>
                                            <div className="text-xs text-gray-600">
                                                Get your order delivered to a specific location of choice
                                            </div>
                                        </div>
                                    </div>
                                </button>

                                {/* Store Pickup */}
                                <button
                                    onClick={() => setDeliveryMethod('pickup')}
                                    className={`
                                        relative p-4 rounded-xl border-2 transition-all duration-300
                                        ${deliveryMethod === 'pickup'
                                            ? 'border-primary bg-primary/5'
                                            : 'border-gray-200 hover:border-primary/50'
                                        }
                                    `}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`
                                            w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                                            ${deliveryMethod === 'pickup'
                                                ? 'border-primary'
                                                : 'border-gray-300'
                                            }
                                        `}>
                                            {deliveryMethod === 'pickup' && (
                                                <div className="w-3 h-3 rounded-full bg-primary"></div>
                                            )}
                                        </div>
                                        <div className="text-left">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="font-bold text-dark-green">Store Pickup</div>
                                                <span className="px-2 py-0.5 text-xs bg-litegreen text-primary rounded-full font-medium">
                                                    Free Delivery
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                Pickup your order directly from our store
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Delivery Form */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="space-y-5">
                                {/* Recipient Name */}
                                <div>
                                    <label className="block text-sm font-semibold  mb-2">
                                        Recipient Name
                                    </label>
                                    <input
                                        type="text"
                                        name="recipientName"
                                        value={formData.recipientName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="Enter recipient name"
                                    />
                                </div>

                                {/* Street Address */}
                                <div>
                                    <label className="block text-sm font-semibold  mb-2">
                                        Street Address
                                    </label>
                                    <input
                                        type="text"
                                        name="streetAddress"
                                        value={formData.streetAddress}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="Enter street address"
                                    />
                                </div>

                                {/* State and LGA */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className='w-full'>
                                        <label className="block text-sm font-semibold  mb-2">
                                            State
                                        </label>
                                        <div className="w-full">
                                            <CustomDropDown
                                                searchable={true}
                                                width='full'
                                                value={formData.state}
                                                options={statesArr}
                                                onChange={handleStateChange}
                                                placeholder="Select State"
                                                searchholder='search states'
                                            />
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <label className="block text-sm font-semibold  mb-2">
                                            Local Government Area
                                        </label>
                                        <div className="w-full">
                                            <CustomDropDown
                                                searchable={true}
                                                width='full'
                                                value={formData.lga}
                                                options={lgaOptions}
                                                onChange={handleLGAChange}
                                                placeholder="Select LGA"
                                                searchholder='search lgas'
                                                disabled={!formData.state}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Landmark and Phone */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold  mb-2">
                                            Landmark/Bustop
                                        </label>
                                        <input
                                            type="text"
                                            name="landmark"
                                            value={formData.landmark}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            placeholder="Near Spar Mall (Port Street)"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold  mb-2">
                                            Phone Number
                                        </label>
                                        <div className="flex gap-1 px-2 border-gray-200  focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all rounded-lg border  items-center">
                                            <div className="">
                                                <Image
                                                    width={34}
                                                    height={34}
                                                    src={`/assets/images/flags/ng_flag.png`} alt={'nigerian flag'}
                                                    className='rounded-full'
                                                />
                                            </div>
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                className="flex-1 px-4 py-3 outline-none focus:outline-0 focus:border-0"
                                                placeholder="080 123 456 789"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="Enter email address"
                                    />
                                </div>

                                {/* Save Address Checkbox */}
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={saveAddress}
                                            onChange={(e) => setSaveAddress(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-4 h-4 border-2 border-gray-300 rounded peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                                            {saveAddress && (
                                                <svg
                                                    className="w-3 h-3 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={3}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-700">Save delivery address as default</span>
                                </label>

                                {/* Submit Button */}
                                <button
                                    onClick={() => navigate('/market/marketplace/cart/checkout/payment')}
                                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]"
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Order Summary */}
                    <div className="lg:col-span-1 order-1 lg:order-2">
                        <div className="bg-[#edffed] rounded-2xl p-6 border border-litegreen shadow-2xl sticky top-24">
                            <h3 className="text-lg font-bold text-dark mb-4">
                                Order Summary ({cart.length} Items)
                            </h3>

                            {/* Cart Items */}
                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-3 border-b border-b-litegreen py-3">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-sm text-dark truncate">
                                                {item.title}
                                            </h4>
                                            <p className="text-xs text-gray-500">
                                                Crate of {item.size}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Qty: {item.quantity || 1}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-dark">
                                                ₦{item.amount.toLocaleString()}
                                            </div>
                                            {item.discount && (
                                                <div className="text-xs text-gray-400 line-through">
                                                    ₦{item.discount.toLocaleString()}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3  pt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping Fee</span>
                                    <span className="font-semibold">₦{shippingFee.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">VAT</span>
                                    <span className="font-semibold">{vat.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="mt-4 pt-4 border-t border-t-litegreen  p-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-dark">Estimated Total</span>
                                    <span className="text-xl font-bold text-primary">
                                        ₦{estimatedTotal.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Checkout.getLayout = (page: React.ReactNode) => (
    <MarketPlaceLayout>{page}</MarketPlaceLayout>
);

export default Checkout