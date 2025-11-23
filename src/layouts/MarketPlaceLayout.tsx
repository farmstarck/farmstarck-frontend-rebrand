import MarketHeader from '@/components/common/MarketPlace/MarketHeader'
import MarketPlaceFooter from '@/components/common/MarketPlace/MarketPlaceFooter'
import React from 'react'

const MarketPlaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <MarketHeader />
      {/* <MarketSearch /> */}
      <main className="flex-1 mt-24 pt-10  w-full bg-lite">{children}</main>
      <MarketPlaceFooter />
    </div>
  )
}

export default MarketPlaceLayout
