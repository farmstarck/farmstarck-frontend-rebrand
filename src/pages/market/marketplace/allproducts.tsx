import Navigation from '@/components/common/MarketPlace/Navigation'
import MarketPlaceLayout from '@/layouts/MarketPlaceLayout'
import React from 'react'

const AllProducts = () => {
    return (
        <div className='w-full py-10'>
            <div className="w-11/12 lg:max-w-6xl mx-auto">
                <div className="">
                    <Navigation
                        routes={[
                            { name: "All Products", href: "/marketplace" }
                        ]}
                    />
                </div>
                <div className="mt-6 text-2xl font-extrabold">All Products</div>
            </div>
        </div>
    )


}

AllProducts.getLayout = (page: React.ReactNode) => (
    <MarketPlaceLayout>{page}</MarketPlaceLayout>
)

export default AllProducts