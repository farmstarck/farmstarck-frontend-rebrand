// import Faq from "../../components/marketing/Home/Faq";
import HeroImg from "../../assets/images/inventory-hero.png";
import InventoryImg1 from "../../assets/svg/inventory1.svg";
import InventoryImg2 from "../../assets/svg/inventory2.svg";
import InventoryImg3 from "../../assets/svg/inventory3.svg";
import InventoryImg4 from "../../assets/svg/inventory4.svg";
import InventoryImg5 from "../../assets/svg/inventory5.svg";
import InventoryImg6 from "../../assets/svg/inventory6.svg";
import InventoryImg7 from "../../assets/svg/inventory7.svg";

const featuresItem = [
  {
    header: "Real-time inventory tracking and management",
    icon: InventoryImg1,
    iconBg:
      "bg-[#00C700] rounded-xl flex justify-center items-center h-12 w-12",
    bg: "border border-[#00C700] bg-white rounded-xl flex flex-col items-center justify-center  p-3   md:px-5 md:py-10",
  },
  {
    header: "Barcode scanning and product identification",
    icon: InventoryImg2,
    iconBg:
      "bg-[#EF4444] rounded-xl flex justify-center items-center h-12 w-12",
    bg: "border border-[#EF4444] bg-white rounded-xl flex flex-col items-center justify-center p-3   md:px-5 md:py-10",
  },
  {
    header: "Low stock alerts and automatic reordering",
    icon: InventoryImg3,
    iconBg:
      "bg-[#015401] rounded-xl flex justify-center items-center h-12 w-12",
    bg: "border border-[#015401] bg-white rounded-xl flex flex-col items-center justify-center p-3  md:px-5 md:py-10",
  },
  {
    header: "Detailed inventory reports and analytics",
    icon: InventoryImg4,
    iconBg:
      "bg-[#5341CD] rounded-xl flex justify-center items-center h-12 w-12",
    bg: "border border-[#5341CD] bg-white rounded-xl flex flex-col items-center justify-center  p-3  md:px-5 md:py-10",
  },
  {
    header: "Multi-location inventory management",
    icon: InventoryImg5,
    iconBg:
      "bg-[#2B3674] rounded-xl flex justify-center items-center h-12 w-12",
    bg: "border border-[#2B3674] bg-white rounded-xl flex flex-col items-center justify-center  p-3   md:px-5 md:py-10",
  },
  {
    header: "Mobile app for on-the-go inventory control",
    icon: InventoryImg6,
    iconBg:
      "bg-[#22C55E] rounded-xl flex justify-center items-center h-12 w-12",
    bg: "border border-[#22C55E] bg-white rounded-xl flex flex-col items-center justify-center  p-3  md:px-5 md:py-10",
  },
  {
    header: "Integration with procurement and marketplace services",
    icon: InventoryImg7,
    iconBg:
      "bg-[#FFBB28] rounded-xl flex justify-center items-center h-12 w-12",
    bg: "border border-[#FFBB28] bg-white rounded-xl flex flex-col items-center justify-center  p-3  md:px-5 md:py-10",
  },
];

// const accordionItems = [
//   {
//     header: "What is Food Vault?",
//     text: "Food Vault is a savings wallet that helps you save gradually towards food purchases on Farmstarck.",
//   },
//   {
//     header: "Can I withdraw cash from Food Vault?",
//     text: "No. Savings can only be used to buy food and farm items from our platform.",
//   },
//   {
//     header: "How do I fund my Food Vault?",
//     text: "You can set automated debits or fund manually through your dashboard.",
//   },
//   {
//     header: "Can I choose how often I save?",
//     text: "Yes. You can save daily, weekly, monthly, or manually — whatever works best for you.",
//   },

//   {
//     header: "What if I want to pause my savings?",
//     text: "You can pause or change your saving plan anytime via your settings.",
//   },
// ];

const SmartInventory = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-secondary-veryLight ">
        <div className="p-5 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h2 className="uppercase text-sm md:text-base text-center text-secondary-veryDark font-subHeading leading-relaxed">
              our product
            </h2>
            <h1 className="font-subHeading text-2xl md:text-4xl flex flex-wrap justify-center text-center text-secondary-veryDark font-extrabold">
              Smart Inventory{" "}
              <span className="bg-[#FACC04] font-extrabold px-5 py-0 ml-4  rounded-2xl text-center text-secondary-veryDark text-[0.5rem] font-btnBody">
                COMING SOON
              </span>
            </h1>
          </div>
          <div className="w-full max-w-5xl m-auto space-y-8 flex flex-col items-center mt-10 md:mt-16">
            <img
              src={HeroImg}
              alt="inventory-img"
              className="object-contain w-full h-auto min-w-[350px]"
            />
            <div className="w-full flex flex-col items-center gap-3 md:gap-7 md:w-5/6 m-auto pb-8 px-4">
              <p className="text-sm font-subHeading2 text-secondary-veryDark sm:text-base md:text-lg text-center">
                Advanced inventory solutions for agricultural businesses.
              </p>
            </div>
          </div>
        </div>
        <div className="px-5 py-10 md:py-20 relative flex flex-col justify-center items-center gap-5 md:gap-10">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h1 className="font-subHeading text-2xl md:text-3xl text-secondary-veryDark font-extrabold">
              Features Coming Soon
            </h1>
          </div>
          {/* <div className="w-full max-w-5xl m-auto space-y-8 flex flex-col items-center">
            <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-y-5 md:gap-y-10 gap-x-3 md:gap-x-16 justify-center items-center">
              {featuresItem.map((item, i) => (
                <div key={i} className={item.bg}>
                  <div className={item.iconBg}>
                    <img src={item.icon} alt={item.header} className="w-4" />
                  </div>
                  <h2 className="font-subHeading text-center pt-2 text-sm md:text-base h-24 md:h-12">
                    {item.header}
                  </h2>
                </div>
              ))}
            </div>
          </div> */}
          <div className="w-full max-w-5xl mx-auto space-y-8 flex flex-col items-center">
            <div className="flex flex-wrap w-full justify-center md:justify-between items-center gap-y-5 md:gap-y-10 gap-x-3 md:gap-x-8">
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
                  <h2 className="font-subHeading text-secondary-veryDark text-center pt-2 text-sm md:text-base h-24 md:h-12">
                    {item.header}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-5 py-10 md:py-20 relative flex flex-col gap-5 justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-8 items-center ">
            <h1 className="font-subHeading text-2xl md:text-3xl text-secondary-veryDark font-extrabold">
              Stay Updated
            </h1>
          </div>
          <div className="w-full max-w-2xl m-auto space-y-11 md:space-y-14 flex flex-col items-center">
            <p className="text-sm font-subHeading2 sm:text-base md:text-lg text-center w-full md:w-2/3">
              Leave your email address to be notified when we launch our
              inventory management system.
            </p>
            <form className=" flex flex-col gap-5 md:gap-8 w-full  md:w-2/3 ">
              <div className="flex flex-col gap-4 md:space-y-5">
                <div className="flex flex-col justify-between gap-5  w-full md:gap-5">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full h-10  p-5 rounded-full border-2 border-secondary-light bg-white text-gray-700 font-light text-sm placeholder-gray-700 focus:outline-none "
                  />
                </div>
              </div>
              <div>
                <button className="w-full px-12 self-auto text-center py-2  md:py-4 bg-secondary-light text-white text-base rounded-full font-btnBody transition-all duration-300 hover:bg-white hover:text-secondary-light  border-2 border-secondary-light">
                  Notify me
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <Faq accordionItems={accordionItems} /> */}
    </div>
  );
};

export default SmartInventory;
