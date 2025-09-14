import Faq from "../../components/marketing/Home/Faq";
import InvestmentHeroImg from "../../assets/images/investment-hero.png";
import Benefits from "../../components/marketing/Investment/Benefits";
import Options from "../../components/marketing/Investment/Options";

const accordionItems = [
  {
    header: "What is the Farmstarck investment feature?",
    text: "It allows individuals to invest in agriculture without farming physically.",
  },
  {
    header: "How does it work?",
    text: "You buy into stockpiles or crop cycles. Farmstarck handles the operations and you earn a return.",
  },
  {
    header: "What’s the minimum to invest?",
    text: "Between ₦50,000 and above for stock-backed or profit-sharing cycles.",
  },
  {
    header: "Is it a loan or equity?",
    text: "It’s a fixed-term investment with profit-sharing returns.",
  },

  {
    header: "How are profits shared?",
    text: "Investors earn 10–25% depending on crop, duration, and risk profile.",
  },
];

const howItems = [
  {
    header: "Choose Your Investment",
    text: "Select from various agricultural commodities like yams, maize, rice, and more based on your budget and goals.",
    bg: "bg-[#00C700] rounded-md p-3 fle flex-col gap-5 justify-center py-5 md:py-10",
  },
  {
    header: "We Manage the Process",
    text: "We handle storage, market monitoring, and sales to ensure optimal returns on your investment.",
    bg: "bg-[#F44748] rounded-md p-3 fle flex-col gap-5 justify-center py-5 md:py-10",
  },
  {
    header: "Earn Returns",
    text: "Receive profits as your agricultural commodities are sold in the market at favorable prices.",
    bg: "bg-[#ffffff] rounded-md p-3 fle flex-col gap-5 justify-center py-5 md:py-10",
  },
];

const Investment = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-secondary-veryLight ">
        <div className="p-5 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h2 className="uppercase text-sm md:text-base text-center text-secondary-veryDark font-subHeading leading-relaxed">
              our product
            </h2>
            <h1 className="font-subHeading text-2xl md:text-4xl text-secondary-veryDark font-extrabold">
              Agricultural Investment Opportunities
            </h1>
          </div>
          <div className="w-full max-w-5xl pt-5 m-auto space-y-8 flex flex-col items-center">
            <img
              src={InvestmentHeroImg}
              alt="market-img"
              className="object-contain w-full h-auto min-w-[350px]"
            />
            <div className="w-full flex flex-col items-center gap-3 md:gap-7 md:w-5/6 m-auto pb-8 px-4">
              <p className="text-sm font-subHeading2 text-secondary-veryDark sm:text-base md:text-lg text-center">
                Invest in stocked agricultural produce and earn profits without
                engaging in physical farm work
              </p>
              <button className="px-12 cursor-pointer self-auto text-center py-2  md:py-4 md:px-28 bg-secondary-light text-white text-base rounded-full font-btnBody transition-all duration-300 hover:bg-white hover:text-secondary-light">
                View Investment Options
              </button>
            </div>
          </div>
        </div>
        <div className="px-5 py-10 md:py-20 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h1 className="font-subHeading text-2xl md:text-3xl text-secondary-veryDark font-extrabold">
              How it Works
            </h1>
          </div>
          <div className="w-full max-w-5xl m-auto space-y-8 flex flex-col items-center">
            <p className="text-sm font-subHeading2 sm:text-base md:text-lg text-center">
              We help businesses of all sizes optimize their agricultural supply
              chains, reduce costs, and ensure consistent quality.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-y-5  md:gap-y-10 gap-x-3 md:gap-x-16  justify-center items-stretch">
              {howItems.map((item, i) => {
                return (
                  <div key={i} className={item.bg}>
                    <h2
                      className={`${
                        i === 2 ? "text-secondary-veryDark" : "text-white"
                      } font-subHeading text-center md:text-start font-extrabold text-xl`}
                    >
                      {item.header}
                    </h2>
                    <p
                      className={`${
                        i === 2 ? "text-secondary-veryDark" : "text-white"
                      } text-sm md:text-base text-center md:text-start pt-3`}
                    >
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="px-5 py-5 md:py-20 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h1 className="font-subHeading text-2xl md:text-3xl text-secondary-veryDark font-extrabold">
              Benefits of Agricultural Investment
            </h1>
          </div>
          <div className="w-full max-w-5xl m-auto space-y-8 flex flex-col items-center">
            <p className="text-sm font-subHeading2 sm:text-base md:text-lg text-center">
              Discover why investing in agriculture provides both financial and
              social returns
            </p>
            <Benefits />
          </div>
        </div>
        <div className="p-5 py-10 md:py-20 relative flex flex-col justify-center items-center ">
          <div className="p-5 py-10 w-full max-w-6xl m-auto flex flex-col gap-5 md:gap-10 justify-between items-center bg-white rounded-2xl px-2 md:px-10">
            <div className="w-full flex flex-col gap-3 md:gap-5 items-center md:w-1/2">
              <h1 className="font-subHeading text-2xl md:text-3xl text-center text-white font-extrabold">
                <span className="text-secondary-veryDark">
                  Program Benefits
                </span>
              </h1>

              <p className="text-sm font-subHeading2 sm:text-base md:text-lg text-center">
                Join thousands of farmers already benefiting from our
                comprehensive support
              </p>
            </div>
            <Options />
          </div>
        </div>
      </div>

      <Faq accordionItems={accordionItems} />
    </div>
  );
};

export default Investment;
