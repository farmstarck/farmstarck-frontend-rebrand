import Img1 from "../../../assets/svg/funding-img1.svg";
import Img2 from "../../../assets/svg/funding-img2.svg";
import Img3 from "../../../assets/svg/funding-img3.svg";
import Img4 from "../../../assets/svg/funding-img4.svg";

const smartData = [
  {
    img: Img1,
    title: "Registered Farmer",
    description:
      "Applicants must be registered farmers with a valid Farmstark account.",
  },
  {
    img: Img2,
    title: "Farm Location ",
    description:
      "The farm should be located within the areas we serve in Nigeria and Africa.",
  },
  {
    img: Img3,
    title: "Farm Type",
    description:
      "Funding is available for various types of farms, including crop, livestock, and mixed farms.",
  },
  {
    img: Img4,
    title: "Business Plan",
    description:
      "A clear business plan outlining the use of funds and expected outcomes is required.",
  },
];

const workData = [
  {
    title: "01",
    head: "Prepare your Document",
    description:
      "Gather necessary documents, including identification, farm registration, business plan, and financial records.",
  },
  {
    title: "02",
    head: "Complete the Application",
    description:
      "Fill out our online application form with accurate information. Include details about your farm, funding needs, and plans.",
  },
  {
    title: "03",
    head: "Submit Supporting Document",
    description: "Upload required documents to support your application.",
  },
  {
    title: "04",
    head: "Application Review",
    description:
      "Our team will review your application and may reach out for additional information or clarification.",
  },
  {
    title: "05",
    head: "Receive Funding Decision",
    description:
      "You will be notified of the funding decision, and if approved, funds will be disbursed to your account.",
  },
  {
    title: "06",
    head: "Funds Utilization",
    description:
      "Use the funds as outlined in your business plan. Regular updates may be required to track progress.",
  },
];

const Features = () => {
  return (
    <div className="px-5 py-6 md:py-20">
      <div className="max-w-6xl m-auto flex flex-col space-y-10 justify-between items-center md:items-start">
        <div className="flex flex-col space-y-10">
          <h2 className="uppercase text-center text-xl sm:text-2xl md:text-4xl md:text-start">
            Eligibity Criteria
          </h2>
          <div className="grid grid-cols-1 w-full  md:gap-y-10  gap-x-10 md:gap-x-16 md:grid-cols-4 justify-center items-stretch sm:grid-cols-2">
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
          <h2 className="uppercase text-center text-xl w-full md:w-1/2 sm:text-2xl md:text-4xl md:text-start">
            Application process - how to apply for funding
          </h2>
          <div className="grid grid-cols-1 w-full  md:gap-y-10  gap-x-10 md:gap-x-16 md:grid-cols-3 justify-center items-stretch sm:grid-cols-2">
            {workData?.map((data, index) => (
              <div
                className="flex flex-col gap-5 w-full py-7 items-center md:items-start"
                key={index}
              >
                <div className="shadow-xl w-12 h-12 flex justify-center items-center rounded-full bg-white">
                  <div className="flex flex-col -space-y-1">
                    <span className="text-btn-txt text-secondary-dark  text-center font-thin">
                      Step
                    </span>
                    <p className="text-sm text-secondary-dark font-subHeading text-center">
                      {data.title}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-center text-xs font-subHeading2 md:text-start md:text-sm">
                    {data.head}
                  </h3>
                  <p className="text-center text-xs text-gray-700 md:text-start md:text-sm">
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
