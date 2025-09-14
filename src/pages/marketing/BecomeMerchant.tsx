import { Link } from "react-router-dom";
import MerchantImg from "../../assets/images/marketplace-merchant.png";
import DashboardImg from "../../assets/images/dashboard.png";
import Merchant1 from "../../assets/svg/merchant1.svg";
import Merchant2 from "../../assets/svg/merchant2.svg";
import Merchant3 from "../../assets/svg/merchant3.svg";
import Merchant4 from "../../assets/svg/merchant4.svg";
import Merchant5 from "../../assets/svg/merchant5.svg";
import Testimonial from "../../components/GenericTestimonial";
import Faq from "../../components/marketing/Home/Faq";

const accordionItems = [
  {
    header: "Who is a merchant on Farmstarck?",
    text: "A merchant is a business or individual that buys and/or sells on Farmstarck, primarily dealing in agri-commodities, chemicals, farm equipment, animal feeds, and bulk produce.",
  },
  {
    header: "What can I sell as a merchant?",
    text: "You can list grains, fertilizers, herbicides, farm tools, feeds, equipment, and even processed food, depending on your inventory and licensing (where applicable).",
  },
  {
    header: "How do I register as a merchant?",
    text: "Sign up via our merchant onboarding form or through a Farmstarck representative. Once verified, you can list products and access wholesale pricing.",
  },
  {
    header: "Can I buy in bulk at wholesale prices?",
    text: "Yes. As a merchant, you get access to real-time wholesale pricing, discount tiers, and priority fulfillment.",
  },

  {
    header: "Do I need to own a warehouse to sell?",
    text: "No. You can list products from your existing inventory or use our logistics and aggregation partners.",
  },
];

const featuresItem = [
  {
    header: "Broaden Your Market",
    text: "Access a diverse customer base including farmers, retailers, and consumers.",
    icon: Merchant1,
    iconBg:
      "bg-[#00C700] rounded-xl flex justify-center items-center h-12 w-12",
    bg: "bg-white border border-[#00C700] rounded-xl flex flex-col items-center justify-center  p-3   md:px-5 md:py-10",
  },
  {
    header: "Increase Sales",
    text: "Leverage our platform to boost sales and grow your business.",
    icon: Merchant2,
    iconBg:
      "bg-[#EF4444] rounded-xl flex justify-center items-center h-12 w-12",
    bg: "bg-white border border-[#EF4444] rounded-xl flex flex-col items-center justify-center p-3   md:px-5 md:py-10",
  },
  {
    header: "Order Management",
    text: "Simplified tools for managing orders and tracking sales.",
    icon: Merchant3,
    iconBg:
      "bg-[#FFBB28] rounded-xl flex justify-center items-center h-12 w-12",
    bg: "bg-white border border-[#FFBB28] rounded-xl flex flex-col items-center justify-center p-3  md:px-5 md:py-10",
  },
  {
    header: "Business Insight",
    text: "Gain valuable insights and analytics to make informed decisions.",
    icon: Merchant4,
    iconBg:
      "bg-[#015401] rounded-xl flex justify-center items-center h-12 w-12",
    bg: "bg-white border border-[#015401] rounded-xl flex flex-col items-center justify-center  p-3  md:px-5 md:py-10",
  },
  {
    header: "Community Support",
    text: "Join a network of merchants for shared experiences and support.",
    icon: Merchant5,
    iconBg:
      "bg-[#4B5563] rounded-xl flex justify-center items-center h-12 w-12",
    bg: "bg-white border border-[#4B5563] rounded-xl flex flex-col items-center justify-center  p-3   md:px-5 md:py-10",
  },
];

const BecomeMerchant = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-secondary-veryLight">
        <div className="p-5 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h2 className="uppercase text-sm md:text-base text-center text-secondary-veryDark font-subHeading leading-relaxed">
              our journey
            </h2>
            <h1 className="font-subHeading text-2xl md:text-4xl text-secondary-veryDark font-extrabold">
              Become a Merchant
            </h1>
          </div>
          <div className="w-full max-w-5xl m-auto mt-5 md:mt-10 flex flex-col md:flex-row justify-between items-center bg-white rounded-2xl px-5 md:px-10 py-8  md:py-5">
            <div className="flex flex-col gap-3 md:gap-10 w-full md:w-2/3 items-center md:items-start">
              <div className="w-full flex flex-col items-center md:items-start gap-3 md:gap-10 m-auto pb-8">
                <h2 className="font-subHeading leading-tight text-center font-extrabold text-secondary-veryDark text-2xl sm:text-4xl md:text-5xl lg:text-6xl md:text-start">
                  <span className="text-secondary-light">Earn More.</span> Work
                  Smarter.Reach More Custormers.
                </h2>
                <p className="text-sm font-subHeading2 sm:text-base md:text-lg text-center md:text-start">
                  Join thousands of farmers and agro-merchants already growing
                  with Farmstarck.
                </p>
                <div className="flex md:hidden w-full md:w-2/3 item-center">
                  <img
                    src={MerchantImg}
                    alt="market-img"
                    className="object-contain w-full h-auto min-w-[250px]"
                  />
                </div>
                <Link
                  to=""
                  className="px-20 self-auto text-center mt-5 py-3 md:py-4 bg-secondary-light text-white text-base rounded-full font-btnBody transition-all duration-300 hover:bg-white hover:text-secondary-light"
                >
                  Start Selling
                </Link>
              </div>
            </div>
            <div className="hidden md:block w-full md:w-2/3">
              <img
                src={MerchantImg}
                alt="market-img"
                className="object-contain w-full h-auto min-w-[350px]"
              />
            </div>
          </div>
        </div>
        <div className="px-5 py-10 md:py-20 relative flex flex-col justify-center items-center gap-5 md:gap-10">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h1 className="font-subHeading text-center text-2xl md:text-3xl text-secondary-veryDark font-extrabold">
              Why Become Our Merchant
            </h1>
          </div>
          <div className="w-full max-w-5xl mx-auto space-y-8 flex flex-col items-center">
            <div className="flex flex-wrap w-full justify-center md:justify-center items-center gap-y-5 md:gap-y-10 gap-x-3 md:gap-x-8">
              {featuresItem.map((item, i) => (
                <div
                  key={i}
                  className={`
                        ${item.bg} flex flex-col items-center 
                        ${
                          i === featuresItem.length - 1
                            ? " flex w-[150px] md:w-[30%] md:flex-none"
                            : "w-[150px] md:w-[30%]"
                        }
                    `}
                >
                  <div className={item.iconBg}>
                    <img src={item.icon} alt={item.header} className="w-4" />
                  </div>
                  <h2 className="font-subHeading text-secondary-veryDark text-center pt-2 text-sm md:text-base h-10 md:h-8">
                    {item.header}
                  </h2>
                  <p className=" pt-2 text-center text-sm font-subHeading2 h-28 md:h-14">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="px-5 relative pt-12 md:pt-10 pb-10">
          <div className="w-full max-w-6xl m-auto space-y-12 flex flex-col items-center">
            <div className="w-full flex flex-col items-center gap-3 md:gap-5">
              <div className="max-w-3xl flex flex-col items-center gap-3 md:gap-5">
                <h2 className="text-xl sm:text-3xl md:text-4xl  text-center font-subHeading leading-tight font-extrabold text-secondary-veryDark text-centers">
                  List and Manage Yor Products -{" "}
                  <span className="text-secondary-light">
                    All in One Dashboard
                  </span>
                </h2>
                <p className="text-sm font-subHeading2 sm:text-base md:text-lg text-center">
                  Seamlessly list your products, use our streamlined dashboard
                  to manage orders, and track inventory
                </p>
              </div>

              <img
                src={DashboardImg}
                alt="dashboard-img"
                className="object-contain w-full h-auto min-w-[300px]"
              />
            </div>
            <Testimonial />
          </div>
        </div>
      </div>
      <Faq accordionItems={accordionItems} />
    </div>
  );
};

export default BecomeMerchant;
