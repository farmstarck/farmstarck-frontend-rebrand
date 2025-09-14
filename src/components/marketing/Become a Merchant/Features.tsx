import Img1 from "../../../assets/svg/funding-img1.svg";
import Img2 from "../../../assets/svg/funding-img2.svg";
import Img3 from "../../../assets/svg/funding-img3.svg";

const smartData = [
  {
    img: Img1,
    title: "Business Registration",
    description: "Provide proof of a legally registered business.",
  },
  {
    img: Img2,
    title: "Product Quality Standard",
    description:
      "Ensure products meet Farmstark’s quality and safety standards.",
  },
  {
    img: Img3,
    title: "Active Engagement",
    description:
      "Commitment to actively manage listings and orders on the platform",
  },
];

const Features = () => {
  return (
    <div className="px-5 py-10 md:py-20">
      <div className="max-w-3xl m-auto flex flex-col space-y-10 justify-between items-center md:items-start">
        <div className="flex flex-col space-y-10">
          <h2 className="uppercase text-center text-xl sm:text-2xl md:text-4xl md:text-start">
            Requirement for retailers
          </h2>
          <div className="grid grid-cols-1 w-full  md:gap-y-10  gap-x-10 md:gap-x-16 md:grid-cols-3 justify-center items-stretch sm:grid-cols-2 md:justify-between">
            {smartData?.map((data, index) => (
              <div
                className="flex flex-col gap-5 w-full py-7 items-center md:items-start"
                key={index}
              >
                <div className="shadow-xl w-12 h-12 flex justify-center items-center rounded-full">
                  <img src={data.img} alt="" loading="lazy" className="w-4" />
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-center text-xs font-subHeading2 md:text-start">
                    {data.title}
                  </h3>
                  <p className="text-center text-xs text-gray-700 md:text-start">
                    {data.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
