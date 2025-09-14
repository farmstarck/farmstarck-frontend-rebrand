import toast from "react-hot-toast";
import Option1 from "../../../assets/images/option1.png";
import Option2 from "../../../assets/images/option2.png";
import Option3 from "../../../assets/images/option3.png";
import Option4 from "../../../assets/images/option4.png";
import Option5 from "../../../assets/images/option5.png";
import Option6 from "../../../assets/images/option6.png";
import Image from "next/image";

const options = [
  {
    name: "Yellow Maize",
    duration: "3 Months",
    minInvestment: "N2,000,000",
    return: "20-25%",
    img: Option1,
  },
  {
    name: "Premium Rice",
    duration: "3 Months",
    minInvestment: "N2,000,000",
    return: "15-20%",
    img: Option2,
  },
  {
    name: "Yam Tubers",
    duration: "3 Months",
    minInvestment: "N2,000,000",
    return: "20-25%",
    img: Option3,
  },
  {
    name: "Cassava Processing",
    duration: "3 Months",
    minInvestment: "N1,000,000",
    return: "20-25%",
    img: Option4,
  },
  {
    name: "Dried Ginger",
    duration: "3 Months",
    minInvestment: "N5000,000",
    return: "20-25%",
    img: Option5,
  },
  {
    name: "Soya Bean",
    duration: "3 Months",
    minInvestment: "N1,000,000",
    return: "20-25%",
    img: Option6,
  },
];

const Options = () => {
  const handleClick = () => {
    toast.error("Not Available Currently");
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 w-full py-5 md:py-10 gap-y-5  md:gap-y-10 gap-x-2 md:gap-x-16  justify-center items-stretch">
      {options.map((item, i) => {
        return (
          <div key={i} className="flex flex-col items-center">
            <div>
              <Image
                src={item.img}
                alt={item.name}
                className="object-contain  h-auto rounded-tl-lg rounded-tr-lg"
              />
            </div>
            <div className="flex flex-col gap-3 shadow-md w-full rounded-lg p-2 py-4 md:px-4 md:py-7">
              <h2 className="font-subHeading text-sm md:text-base">
                {item.name}
              </h2>
              <div className="flex justify-between items-center">
                <p className="text-xs md:text-sm">Duration</p>
                <p className="font-subHeading2 text-xs md:text-base">
                  {item.duration}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs md:text-sm">Min Investment</p>
                <p className="font-subHeading2 text-xs md:text-base">
                  {item.minInvestment}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs md:text-sm">Min Investment</p>
                <p className="font-subHeading2 text-xs md:text-base text-secondary-light">
                  {item.return}
                </p>
              </div>
              <button
                onClick={handleClick}
                className="w-full border-2 border-secondary-light text-secondary-light rounded-md cursor-pointer text-sm md:text-base p-1 md:p-2 font-btnBody"
              >
                Invest Now
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Options;
