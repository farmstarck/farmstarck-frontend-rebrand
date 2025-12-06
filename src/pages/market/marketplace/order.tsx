import Navigation from '@/components/common/MarketPlace/Navigation';
import MarketPlaceLayout from '@/layouts/MarketPlaceLayout';
import React from 'react'

const OrderPage = () => {
    return (
        <div className='w-full py-5 satoshi bg-[#D8F3D8] min-h-screen'>

            <div className='w-11/12 lg:max-w-7xl mx-auto'>

                <Navigation
                    routes={[
                        { name: 'Orders', href: '#' },
                    ]}
                    forward={true}
                />

                {/* Page Title */}
                <div className="my-6 text-2xl font-extrabold">Orders</div>
            </div>
        </div>
    )
}

OrderPage.getLayout = (page: React.ReactNode) => (
    <MarketPlaceLayout>{page}</MarketPlaceLayout>
);

export default OrderPage