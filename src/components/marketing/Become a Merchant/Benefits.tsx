import CustomButton from "../../common/CustomButton";
import Img1 from "../../../assets/svg/benefit-img1.svg";
import Img2 from "../../../assets/svg/merchant-1.svg";
import Img3 from "../../../assets/svg/merchant-2.svg";
import Img4 from "../../../assets/svg/merchant-3.svg";
import Img5 from "../../../assets/svg/merchant-4.svg";
import Link from "next/link";

const benefitsData = [
  {
    img: Img1,
    title: "Broaden Your Market",
    description:
      "Access a diverse customer base including farmers, retailers, and consumers.",
  },
  {
    img: Img2,
    title: "Increased Sales Opportunities",
    description: "Leverage our platform to boost sales and grow your business.",
  },
  {
    img: Img3,
    title: "Efficient Order Management",
    description: "Simplified tools for managing orders and tracking sales.",
  },
  {
    img: Img4,
    title: "Business Insight",
    description:
      "CGain valuable insights and analytics to make informed decisions.",
  },
  {
    img: Img5,
    title: "Community Support",
    description:
      "Join a network of merchants for shared experiences and support.",
  },
];
const Benefits = () => {
  return (
    <div className="px-5">
      <div className="max-w-3xl m-auto flex flex-col space-y-10 justify-between items-center md:items-start">
        <h2 className="uppercase text-center text-xl sm:text-2xl md:text-4xl">
          benefits of becoming a merchant
        </h2>
        <div>
          <div className="flex flex-col gap-10">
            {benefitsData?.map((data, index) => (
              <div
                className="flex gap-5 w-full items-center md:items-start"
                key={index}
              >
                <img src={data.img} alt="" loading="lazy" className="w-6" />
                <div>
                  <h3 className="text-sm md:text-base font-subHeading2">
                    {data.title}
                  </h3>
                  <p className="text-xs md:text-sm">{data.description}</p>
                </div>
              </div>
            ))}
            <Link
              href="/underconstruction"
              className="w-full md:w-5/6  border border-solid border-secondary-dark rounded-full"
            >
              <CustomButton color="green" text="get started" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
