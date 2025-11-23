"use client"
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Faq from "@/components/Home/Faq";

export const MarketplaceAccordionItems = [
  {
    header: "What can I buy on the Farmstarck Marketplace?",
    text: "You can buy fresh produce, grains, tubers, fertilizers, farm equipment, processed food, animal feed, and farm tools.",
  },
  {
    header: "Who can use the marketplace?",
    text: "Farmers, agro-merchants, caterers, households, retailers, and institutions like restaurants and schools.",
  },
  {
    header: "Do I need to register to make purchases?",
    text: "Yes. You need to create an account as a buyer or seller to access the full features.",
  },
  {
    header: "Is there a minimum order quantity?",
    text: "No. We serve both bulk and small-quantity buyers. Whether you want 5 yams or 5,000, we’ve got you.",
  },

  {
    header: "Are your vendors verified?",
    text: "Yes. All vendors undergo verification to ensure product quality and reliability.",
  },
];

const marketplace = () => {
  return (
    <>
      <Head>
        <title>Farmstarck Marketplace - Buy Fresh Produce, Tools & Equipment</title>
        <meta name="description" content="Shop Farmstarck's marketplace for fresh farm produce, grains, fertilizers, farm equipment, processed food, and tools. Verified vendors, bulk and small orders, doorstep delivery across Nigeria." />
        <meta name="keywords" content="agricultural marketplace Nigeria Africa, buy farm produce online platform, farming marketplace platform Nigeria, fresh produce delivery Africa, farm tools Nigeria platform, fertilizers online marketplace, agrochemicals marketplace Nigeria, bulk buying agriculture Africa, verified vendors Nigeria platform, agricultural e-commerce platform Nigeria, farm produce marketplace Africa, farming equipment Nigeria platform, agricultural inputs online Nigeria, crop marketplace Nigeria Africa, livestock feed marketplace Nigeria, farm machinery Nigeria platform, agricultural chemicals online Africa, produce marketplace Africa Nigeria, farming supplies Nigeria platform, agricultural commodities marketplace Nigeria, farm produce trading platform Africa, agricultural marketplace app Nigeria, farming marketplace Nigeria Africa, agricultural supply chain platform Nigeria, farm produce procurement Africa, agricultural marketplace solutions Nigeria, farming marketplace technology Africa, agricultural e-commerce Nigeria platform, farm produce logistics Nigeria, agricultural marketplace integration Africa, farming marketplace analytics Nigeria, agricultural marketplace automation platform, farm produce traceability Nigeria, agricultural marketplace security Africa, farming marketplace scalability Nigeria, agricultural marketplace innovation platform, farm produce marketplace growth Nigeria, agricultural marketplace partnerships Africa, farming marketplace expansion Nigeria, agricultural marketplace adoption platform, farm produce marketplace engagement Nigeria, agricultural marketplace retention Africa, farming marketplace monetization Nigeria, agricultural marketplace sustainability platform, farm produce marketplace impact Nigeria" />
        <meta name="author" content="Farmstarck" />
        <meta property="og:title" content="Farmstarck Marketplace - Buy Fresh Produce, Tools & Equipment" />
        <meta property="og:description" content="Shop Farmstarck's marketplace for fresh farm produce, grains, fertilizers, farm equipment, processed food, and tools. Verified vendors, bulk and small orders, doorstep delivery across Nigeria." />
        <meta property="og:image" content="/assets/images/landing-market.png" />
        <meta property="og:url" content="https://farmstarck.com/marketing/marketplace" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Farmstarck Marketplace - Buy Fresh Produce, Tools & Equipment" />
        <meta name="twitter:description" content="Shop Farmstarck's marketplace for fresh farm produce, grains, fertilizers, farm equipment, processed food, and tools. Verified vendors, bulk and small orders, doorstep delivery across Nigeria." />
        <meta name="twitter:image" content="/assets/images/landing-market.png" />
        <link rel="canonical" href="https://farmstarck.com/marketing/marketplace" />
      </Head>
      <div className="flex flex-col">
      <div className="bg-[var(--lite)] ">
        <div className="p-5 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h2 className="uppercase text-sm md:text-base text-center text-[var(--dark-green)] font-subHeading leading-relaxed">
              our product
            </h2>
            <h1 className="font-subHeading text-2xl md:text-4xl text-[var(--dark-green)] font-extrabold">
              Marketplace
            </h1>
          </div>
          <div className="w-full max-w-3xl m-auto space-y-8 flex flex-col items-center">
            <Image
              width={500}
              height={500}
              src={`/assets/images/landing-market.png`}
              alt="market-img"
              className="object-contain w-full h-auto min-w-[350px]"
            />
            <div className="w-full flex flex-col items-center gap-3 md:gap-7 md:w-5/6 m-auto pb-8 px-4">
              <h2 className="text-xl sm:text-3xl md:text-4xl  text-center font-subHeading leading-tight font-extrabold text-[var(--dark-primary)] text-centers">
                Everything You Need,{" "}
                <span className="text-[var(--primary)]">
                  Delivered To Your Doorstep
                </span>
              </h2>
              <p className="text-sm font-subHeading2 text-[var(--dark-primary)] sm:text-base md:text-lg text-center">
                All-in-one marketplace for fresh farm produce, raw and processed
                food, agro-mechicals and tools
              </p>
              <Link
                href="/market/marketplace"
                className="px-12 self-auto text-center py-2  md:py-4 md:px-28 bg-[var(--primary)] text-white text-base rounded-full font-btnBody transition-all duration-300 hover:bg-white hover:text-[var(--primary)]"
              >
                Visit Marketplace
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-5 relative flex flex-col justify-center items-center ">
          <div className="w-full max-w-4xl m-auto space-y-8 flex flex-col items-center py-4 md:py-8">
            <h2 className="uppercase text-base text-center text-[var(--dark-primary)] font-bold leading-relaxed">
              Become a merchant
            </h2>
            <Image
              width={500}
              height={500}
              src={`/assets/images/marketplace-merchant.png`}
              alt="market-img"
              className="object-contain w-full md:w-2/3 h-auto min-w-[350px]"
            />
            <div className="w-full flex flex-col items-center gap-3 md:gap-7 md:w-5/6 m-auto pb-8 px-4">
              <h2 className="text-xl sm:text-3xl md:text-4xl  text-center font-subHeading leading-tight font-extrabold text-[var(--dark-primary)] text-centers">
                Grow Your Business With Farmstarck
              </h2>
              <p className="text-sm font-subHeading2 sm:text-base md:text-lg text-center">
                Join thousands of farmers and agro-merchants already growing
                with Farmstarck. From sourcing support and inventory tracking to
                real-time sales and bulk delivery — we help you.
              </p>
              <Link
                // to="shop"
                href="/market/marketplace"
                className="px-12 self-auto text-center py-2  md:py-4 md:px-28 bg-[var(--primary)] text-white text-base hover:border hover:border-[var(--primary)] rounded-full font-btnBody transition-all duration-300 hover:bg-white hover:text-[var(--primary)]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Faq accordionItems={MarketplaceAccordionItems} />
    </div>
    </>
  );
};

export default marketplace;
