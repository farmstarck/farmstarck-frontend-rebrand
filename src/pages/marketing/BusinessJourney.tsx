import { Link } from "react-router-dom";
import HeroImg from "../../assets/images/business-hero.png";
import BusinessWork from "../../components/marketing/Business Journey/BusinessWork";
import Serve from "../../components/marketing/Business Journey/Serve";
import WhyChoose from "../../components/marketing/Business Journey/WhyChoose";
import Faq from "../../components/marketing/Home/Faq";

const accordionItems = [
  {
    header: "What services does Farmstarck offer to businesses?",
    text: "We provide procurement, bulk supply, inventory tools, and a marketplace for all agri-related needs.",
  },
  {
    header: "Can I request regular deliveries for my business?",
    text: "Yes. We offer recurring order setups tailored to your schedule.",
  },
  {
    header: "Do you provide invoices and receipts for each transaction?",
    text: "Absolutely. All transactions come with downloadable invoices for your records.",
  },
  {
    header: "Can we pay after delivery?",
    text: "Pay-on-delivery is available for verified business clients and contract-based agreements.",
  },

  {
    header: "Do you offer discounts for large orders?",
    text: "Yes. Discounts are tiered based on order size, location, and product category.",
  },
];

const BusinessJourney = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-secondary-veryLight ">
        <div className="p-5 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h2 className="uppercase text-sm md:text-base text-center text-secondary-veryDark font-subHeading leading-relaxed">
              Your journey
            </h2>
            <h1 className="font-subHeading text-2xl md:text-4xl text-secondary-veryDark font-extrabold">
              Power Your Business with Smarter Agri-Procurement
            </h1>
          </div>
          <div className="w-full max-w-3xl m-auto space-y-8 pt-5 flex flex-col items-center">
            <img
              src={HeroImg}
              alt="market-img"
              className="object-contain w-full h-auto min-w-[350px]"
            />
            <div className="w-full flex flex-col items-center gap-3 md:gap-7 md:w-5/6 m-auto pb-8 px-4">
              <p className="text-sm font-subHeading2 text-secondary-veryDark sm:text-base md:text-lg text-center">
                Whether you run a factory, retail outlet, commercial kitchen, or
                distribution business, Farmstarck connects you to verified
                agricultural supply without market stress.
              </p>
            </div>
          </div>
        </div>
        <div className="px-5 py-5 md:py-20 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h1 className="font-subHeading text-2xl md:text-3xl text-secondary-veryDark font-extrabold">
              Who We Serve
            </h1>
          </div>
          <div className="w-full max-w-5xl m-auto space-y-8 flex flex-col items-center">
            <p className="text-sm font-subHeading2 sm:text-base md:text-lg text-center">
              Farmstarck is trusted by businesses across sectors including:
            </p>
            <Serve />
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-5 py-10 md:py-20 relative flex flex-col justify-center items-center ">
          <div className="p-5 py-10 md:py-20 w-full max-w-6xl m-auto flex flex-col gap-5 md:gap-10 justify-between items-center bg-secondary-veryLight rounded-2xl px-5 md:px-10">
            <div className="w-full flex flex-col gap-3 md:gap-5 items-center md:w-1/2">
              <h1 className="font-subHeading text-2xl md:text-3xl text-center text-white font-extrabold">
                <span className="text-secondary-dark">How it Works</span>
              </h1>
            </div>
            <BusinessWork />
          </div>
          <div className="py-10 md:py-20 w-full max-w-6xl m-auto flex flex-col gap-5 md:gap-10 justify-between items-center rounded-2xl  md:px-10">
            <div className="w-full flex flex-col gap-3 md:gap-5 items-center md:w-1/2">
              <h1 className="font-subHeading text-2xl md:text-3xl text-center text-white font-extrabold">
                <span className="text-secondary-veryDark">
                  Why Choose Farmstarck for Business{" "}
                </span>
              </h1>
            </div>
            <WhyChoose />
          </div>
          <div className="py-10 md:py-20 w-full max-w-6xl m-auto flex flex-col gap-5 md:gap-10 justify-between items-center rounded-2xl  md:px-10">
            <div className="w-full flex flex-col gap-3 md:gap-5 items-center md:w-1/2">
              <h1 className="font-subHeading text-2xl md:text-3xl text-center text-white font-extrabold">
                <span className="text-secondary-veryDark">
                  Start Sourcing Smarter
                </span>
              </h1>
              <p className="text-sm font-subHeading2 sm:text-base md:text-lg text-center">
                Register your business today to access bulk pricing, expert
                support, and stress-free procurement that grows with you.
              </p>
            </div>
            <div className=" flex flex-col sm:flex-row gap-5 md:gap-8 w-full  md:w-2/3 ">
              <button className="w-full px-12 self-auto text-center py-2  md:py-4 bg-secondary-light text-white text-base rounded-full font-btnBody transition-all duration-300 hover:bg-white hover:text-secondary-light  border-2 border-secondary-light">
                Request Quote
              </button>

              <Link
                to="../shop"
                className="w-full px-12 self-auto text-center py-2  md:py-4 bg-secondary-veryDark text-white text-base rounded-full font-btnBody transition-all duration-300 hover:bg-white hover:text-secondary-veryDark  border-2 border-secondary-veryDark"
              >
                Visit Marketplace
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Faq accordionItems={accordionItems} />
    </div>
  );
};

export default BusinessJourney;
