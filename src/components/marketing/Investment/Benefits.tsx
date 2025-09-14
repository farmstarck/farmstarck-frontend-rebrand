import Image from "next/image";
import Benefit1 from "../../../assets/svg/benefit1.svg";
import Benefit2 from "../../../assets/svg/benefit2.svg";
import Benefit3 from "../../../assets/svg/benefit3.svg";
import Benefit4 from "../../../assets/svg/benefit4.svg";
import Benefit5 from "../../../assets/svg/benefit5.svg";
import Benefit6 from "../../../assets/svg/benefit6.svg";

const workItem = [
  {
    img: Benefit1,
    header: "Attractive Returns",
    text: "Earn competitive returns that often outperform traditional investment vehicles.",
    iconBg:
      "bg-[#00C700] rounded-full flex justify-center items-center h-12 w-12",
  },
  {
    img: Benefit2,
    header: "Portfolio Diversification",
    text: "Add agricultural commodities to diversify your investment portfolio and reduce risk.",
    iconBg:
      "bg-[#EF4444] rounded-full flex justify-center items-center h-12 w-12",
  },
  {
    img: Benefit3,
    header: "Inflation Hedge",
    text: "Agricultural commodities typically maintain value during inflation, protecting your investment.",
    iconBg:
      "bg-[#5341CD] rounded-full flex justify-center items-center h-12 w-12",
  },
  {
    img: Benefit4,
    header: "Flexible Investment Terms",
    text: "Choose from short-term (3-6 months) or long-term (6-12 months) investment options.",
    iconBg:
      "bg-[#2B3674] rounded-full flex justify-center items-center h-12 w-12",
  },
  {
    img: Benefit5,
    header: "Support Local Farmers",
    text: "Your investment directly supports smallholder farmers by providing them with market access.",
    iconBg:
      "bg-[#22C55E] rounded-full flex justify-center items-center h-12 w-12",
  },
  {
    img: Benefit6,
    header: "Food Security Contribution",
    text: "Help improve food security in Nigeria by supporting agricultural production and distribution.",
    iconBg:
      "bg-[#5341CD] rounded-full flex justify-center items-center h-12 w-12",
  },
];

const Benefits = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 w-full py-5 md:py-10 gap-y-5  md:gap-y-10 gap-x-3 md:gap-x-16  justify-center items-stretch">
      {workItem.map((item, i) => {
        return (
          <div key={i} className="flex flex-col items-center gap-3">
            <div className={item.iconBg}>
              <Image src={item.img} alt={item.header} className="w-4" />
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

export default Benefits;
