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
        <meta name="keywords" content="agricultural platform FAQs Nigeria Africa, AgriTech questions answered platform, farming technology help app, agricultural marketplace guide Nigeria, farming platform questions Africa, agricultural investment FAQs platform, farming solutions guide Nigeria, agriculture platform help Africa, farming technology support app, agricultural business FAQs Nigeria, AgriTech platform guide Africa, farming questions Nigeria platform, precision farming questions Africa, sustainable agriculture FAQs Nigeria, climate-smart farming guide Africa, agricultural procurement help Nigeria, farming marketplace questions Africa, agricultural investment guide Nigeria, farm management FAQs platform, agricultural financing help Africa, farming partnership questions Nigeria, agricultural education FAQs Africa, farm technology troubleshooting Nigeria, agricultural platform navigation Africa, farming app instructions Nigeria, agricultural services guide Africa, farm empowerment questions Nigeria, agricultural training FAQs Africa, farming innovation help Nigeria, agricultural ecosystem guide Africa, farm digitization questions Nigeria, agricultural transformation FAQs Africa, farming sustainability questions Nigeria, agricultural technology adoption Africa, farm productivity FAQs Nigeria, agricultural supply chain questions Africa, farming optimization guide Nigeria, agricultural marketplace FAQs, farming procurement questions, agricultural investment answers, farm technology FAQs, agricultural business questions, AgriTech support guide, farming platform help, agriculture questions Nigeria, precision farming FAQs, sustainable agriculture questions, climate-smart farming help, agricultural procurement guide, farming marketplace answers, agricultural investment questions, farm management guide, agricultural financing questions, farming partnership FAQs, agricultural education questions, farm technology answers, agricultural platform questions, farming app help, agricultural services questions, farm empowerment FAQs, agricultural training questions, farming innovation answers, agricultural ecosystem questions, farm digitization FAQs, agricultural transformation questions, farming sustainability answers, agricultural technology questions, farm productivity questions, agricultural supply chain answers, farming optimization questions" />
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
