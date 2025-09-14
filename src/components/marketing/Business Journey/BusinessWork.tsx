import Work1 from "../../../assets/svg/business-work1.svg";
import Work2 from "../../../assets/svg/business-work2.svg";
import Work3 from "../../../assets/svg/business-work3.svg";
import Work4 from "../../../assets/svg/business-work4.svg";

const workItem = [
  {
    img: Work1,
    header: "Register Your Business",
    text: "Unlock business tools, flexible payment options, and custom pricing.",
    iconBg:
      "bg-[#00C700] rounded-full flex justify-center items-center h-12 w-12",
  },
  {
    img: Work2,
    header: "Place an Order or Request a Quote",
    text: "Choose from a wide range of verified produce, inputs, and processed items.",
    iconBg:
      "bg-[#EF4444] rounded-full flex justify-center items-center h-12 w-12",
  },
  {
    img: Work3,
    header: "Track and Restock Easily",
    text: "Monitor your orders in real time, manage inventory, and schedule restocks.",
    iconBg:
      "bg-[#5341CD] rounded-full flex justify-center items-center h-12 w-12",
  },
  {
    img: Work4,
    header: "Flexible Payment Terms",
    text: "Approved businesses can access month-end billing and consolidated invoicing.",
    iconBg:
      "bg-[#FFBB28] rounded-full flex justify-center items-center h-12 w-12",
  },
];

const BusinessWork = () => {
  return (
    <div className="grid grid-cols-2 w-full py-5 md:py-10 gap-y-5  md:gap-y-10 gap-x-3 md:gap-x-16  justify-center items-stretch">
      {workItem.map((item, i) => {
        return (
          <div key={i} className="flex flex-col items-center gap-3">
            <div className={item.iconBg}>
              <img src={item.img} alt={item.header} className="w-4" />
            </div>
            <h2 className="font-subHeading  text-center text-sm h-10 md:h-auto md:text-base">
              {item.header}
            </h2>
            <p className="text-center text-sm w-full md:text-base md:w-5/6">
              {item.text}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default BusinessWork;
