import { Link } from "react-router-dom";
import MarketImg from "../../assets/images/landing-market.png";
import MerchantImg from "../../assets/images/marketplace-merchant.png";
import Faq from "../../components/marketing/Home/Faq";

const accordionItems = [
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

const MarketPlace = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-secondary-veryLight ">
        <div className="p-5 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h2 className="uppercase text-sm md:text-base text-center text-secondary-veryDark font-subHeading leading-relaxed">
              our product
            </h2>
            <h1 className="font-subHeading text-2xl md:text-4xl text-secondary-veryDark font-extrabold">
              Marketplace
            </h1>
          </div>
          <div className="w-full max-w-3xl m-auto space-y-8 flex flex-col items-center">
            <img
              src={MarketImg}
              alt="market-img"
              className="object-contain w-full h-auto min-w-[350px]"
            />
            <div className="w-full flex flex-col items-center gap-3 md:gap-7 md:w-5/6 m-auto pb-8 px-4">
              <h2 className="text-xl sm:text-3xl md:text-4xl  text-center font-subHeading leading-tight font-extrabold text-secondary-veryDark text-centers">
                Everything You Need,{" "}
                <span className="text-secondary-light">
                  Delivered To Your Doorstep
                </span>
              </h2>
              <p className="text-sm font-subHeading2 text-secondary-veryDark sm:text-base md:text-lg text-center">
                All-in-one marketplace for fresh farm produce, raw and processed
                food, agro-mechicals and tools
              </p>
              <Link
                to=""
                className="px-12 self-auto text-center py-2  md:py-4 md:px-28 bg-secondary-light text-white text-base rounded-full font-btnBody transition-all duration-300 hover:bg-white hover:text-secondary-light"
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
            <h2 className="uppercase text-base text-center text-secondary-dark font-subHeading leading-relaxed">
              Become a merchant
            </h2>
            <img
              src={MerchantImg}
              alt="market-img"
              className="object-contain w-full md:w-2/3 h-auto min-w-[350px]"
            />
            <div className="w-full flex flex-col items-center gap-3 md:gap-7 md:w-5/6 m-auto pb-8 px-4">
              <h2 className="text-xl sm:text-3xl md:text-4xl  text-center font-subHeading leading-tight font-extrabold text-secondary-veryDark text-centers">
                Grow Your Business With Farmstarck
              </h2>
              <p className="text-sm font-subHeading2 sm:text-base md:text-lg text-center">
                Join thousands of farmers and agro-merchants already growing
                with Farmstarck. From sourcing support and inventory tracking to
                real-time sales and bulk delivery — we help you.
              </p>
              <Link
                // to="shop"
                to="underconstruction"
                className="px-12 self-auto text-center py-2  md:py-4 md:px-28 bg-secondary-light text-white text-base rounded-full font-btnBody transition-all duration-300 hover:bg-white hover:text-secondary-light"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Faq accordionItems={accordionItems} />
    </div>
  );
};

export default MarketPlace;
