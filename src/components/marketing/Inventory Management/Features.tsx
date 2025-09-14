import Img1 from "../../../assets/svg/inventory-1.svg";
import Img2 from "../../../assets/svg/inventory-2.svg";
import Img3 from "../../../assets/svg/inventory-3.svg";
import Img4 from "../../../assets/svg/inventory-4.svg";
import Img5 from "../../../assets/svg/inventory-5.svg";

const smartData = [
  {
    img: Img1,
    title: "Automated Stock Tracking",
    description: "Easily manage and monitor all inventory levels in real-time.",
  },
  {
    img: Img2,
    title: "Comprehensive reporting",
    description:
      "Generate daily, weekly, or monthly reports to gain insights into stock performance.",
  },
  {
    img: Img3,
    title: "Supply Chain Management",
    description:
      "Streamline your processes from the farm to the marketplace, ensuring timely delivery and reduced waste.",
  },
  {
    img: Img4,
    title: "Multi-Device Support",
    description:
      "Access your inventory data on the go, from any device – mobile, tablet, or desktop.",
  },
  {
    img: Img5,
    title: "Integration with Accounting Systems",
    description:
      "Easily connect with your preferred accounting tools to keep your finances in sync with your stock.",
  },
];

const workData = [
  {
    title: "01",
    description: "Sign up for an account and log in to access your dashboard.",
  },
  {
    title: "02",
    description:
      "Add your inventory, including product categories, quantities, and details.",
  },
  {
    title: "03",
    description:
      "Set up alerts for low stock, expiration dates, or shipment deadlines.",
  },
  {
    title: "04",
    description:
      "Generate reports to track performance, profits, and supply chain data.",
  },
  {
    title: "05",
    description: "Manage your stock effortlessly from farm to market.",
  },
];

const Features = () => {
  return (
    <div className="px-5 py-6 md:py-20">
      <div className="max-w-3xl m-auto flex flex-col space-y-10 justify-between items-center md:items-start">
        <div className="flex flex-col space-y-10">
          <h2 className="uppercase text-center text-xl sm:text-2xl md:text-4xl md:text-start">
            smart features
          </h2>
          <div className="grid grid-cols-1 w-full  md:gap-y-10  gap-x-10 md:gap-x-16 md:grid-cols-3 justify-center items-stretch sm:grid-cols-2">
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
        <div className="flex flex-col space-y-10">
          <h2 className="uppercase text-center text-xl sm:text-2xl md:text-4xl md:text-start">
            how it works
          </h2>
          <div className="grid grid-cols-1 w-full  md:gap-y-10  gap-x-10 md:gap-x-16 md:grid-cols-3 justify-center items-stretch sm:grid-cols-2">
            {workData?.map((data, index) => (
              <div
                className="flex flex-col gap-5 w-full py-7 items-center md:items-start"
                key={index}
              >
                <div className="shadow-xl w-12 h-12 flex justify-center items-center rounded-full bg-secondary-dark">
                  <div className="flex flex-col -space-y-1">
                    <span className="text-btn-txt text-white  text-center font-thin">
                      Step
                    </span>
                    <p className="text-sm text-white font-subHeading text-center">
                      {data.title}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
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
