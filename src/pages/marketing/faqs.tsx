import Head from "next/head";
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
    <>
      <Head>
        <title>Farmstarck FAQs - Frequently Asked Questions</title>
        <meta name="description" content="Find answers to common questions about Farmstarck's marketplace, procurement services, FoodVault savings, merchant programs, farmer empowerment, business solutions, and agricultural investments." />
        <meta name="keywords" content="Farmstarck FAQs, agriculture questions, marketplace help, procurement FAQ, FoodVault questions, farmer support, merchant guide, business procurement" />
        <meta name="author" content="Farmstarck" />
        <meta property="og:title" content="Farmstarck FAQs - Frequently Asked Questions" />
        <meta property="og:description" content="Find answers to common questions about Farmstarck's marketplace, procurement services, FoodVault savings, merchant programs, farmer empowerment, business solutions, and agricultural investments." />
        <meta property="og:image" content="/assets/images/faq-hero.png" />
        <meta property="og:url" content="https://farmstarck.com/marketing/faqs" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Farmstarck FAQs - Frequently Asked Questions" />
        <meta name="twitter:description" content="Find answers to common questions about Farmstarck's marketplace, procurement services, FoodVault savings, merchant programs, farmer empowerment, business solutions, and agricultural investments." />
        <meta name="twitter:image" content="/assets/images/faq-hero.png" />
        <link rel="canonical" href="https://farmstarck.com/marketing/faqs" />
      </Head>
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
    </>
  )
}

export default Faqs
