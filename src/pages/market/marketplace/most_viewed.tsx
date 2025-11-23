import MarketPlaceLayout from '@/layouts/MarketPlaceLayout'
import React from 'react'

const MostViewed = () => {
    return (
        <div>most_viewed</div>
    )
}

MostViewed.getLayout = (page: React.ReactNode) => (
    <MarketPlaceLayout>{page}</MarketPlaceLayout>
)
export default MostViewed