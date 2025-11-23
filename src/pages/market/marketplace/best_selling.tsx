import MarketPlaceLayout from '@/layouts/MarketPlaceLayout'
import React from 'react'

const BestSelling = () => {
    return (
        <div>best_selling</div>
    )
}

BestSelling.getLayout = (page: React.ReactNode) => (
    <MarketPlaceLayout>{page}</MarketPlaceLayout>
)
export default BestSelling