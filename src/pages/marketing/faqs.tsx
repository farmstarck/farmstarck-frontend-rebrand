import CommonHeader from '@/components/common/CommonHeader'
import FaqDynamic from '@/components/common/FaqDynamic'
import React from 'react'
import { FoodVaultAccordionItems } from './foodvault'
import { MerchantAccordionItems } from './become_merchant'
import { FarmerAccordionItems } from './farm_empowerment'
import { BusinessAccordionItems } from './business_journey'
import { InvestmentAccordionItems } from './investment'
import { ProcurementAccordionItems } from './procurement'
import { MarketplaceAccordionItems } from './marketplace'

const Faqs = () => {
  return (
    <div className="flex flex-col">
      <CommonHeader
        title="FREQUENTLY ASKED QUESTIONS"
        desc="What Most of Our Customers Ask"
      />

      <div className="w-full flex flex-col items-center justify-center bg-white gap-5">
        <FaqDynamic title="Marketplace" accordionItems={MarketplaceAccordionItems} />

        {/* Divider (replaces <hr>) */}
        <div className="h-[1px] bg-primary w-11/12 lg:w-10/12 mx-auto" />

        <FaqDynamic title="Procurement" accordionItems={ProcurementAccordionItems} />
        <div className="h-[1px] bg-primary w-11/12 lg:w-10/12 mx-auto" />

        <FaqDynamic title="FoodVault" accordionItems={FoodVaultAccordionItems} />
        <div className="h-[1px] bg-primary w-11/12 lg:w-10/12 mx-auto" />
        <FaqDynamic title="Merchant" accordionItems={MerchantAccordionItems} />
        <div className="h-[1px] bg-primary w-11/12 lg:w-10/12 mx-auto" />

        <FaqDynamic title="Farmer" accordionItems={FarmerAccordionItems} />
        <div className="h-[1px] bg-primary w-11/12 lg:w-10/12 mx-auto" />

        <FaqDynamic title="Business" accordionItems={BusinessAccordionItems} />
        <div className="h-[1px] bg-primary w-11/12 lg:w-10/12 mx-auto" />

        <FaqDynamic title="Agricultural Investment" accordionItems={InvestmentAccordionItems} />
      </div>
    </div>
  )
}

export default Faqs
