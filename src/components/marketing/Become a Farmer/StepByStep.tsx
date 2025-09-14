import Image from "next/image";
import Img1 from "../../../assets/images/section-img1.png";

const workData = [
  {
    title: "01",
    header: "create an account",
    description:
      'Click on "Register" and enter your name, email, and phone number.',
  },
  {
    title: "02",
    header: "Verify your identity",
    description:
      "Upload a photo of your ID to help us verify your identity. We keep your information safe and secure.",
  },
  {
    title: "03",
    header: "Complete you account setup",
    description:
      "Tell us more about your farm—its location, size, and the crops you grow. This helps us tailor our services to your needs.",
  },
  {
    title: "04",
    header: "submit application",
    description:
      "Review your profile and submit your application. Our team will review it promptly.",
  },
];
const StepByStep = () => {
  return (
    <div className="px-5 py-6 md:py-20">
      <div className="max-w-6xl m-auto flex flex-col space-y-10 justify-between items-center md:items-start">
        <div className="max-w-lg m-auto ">
          <Image src={Img1} alt="" loading="lazy" />
        </div>
        <div className="flex flex-col space-y-10 py-5 md:py-10">
          <h2 className="uppercase text-center text-xl sm:text-2xl md:text-4xl">
            easy step by step registration
          </h2>
          <div className="grid grid-cols-1 w-full  md:gap-y-10  gap-x-10 md:gap-x-16 md:grid-cols-4 justify-center items-stretch sm:grid-cols-2">
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
                  <p className="text-center font-subHeading2 text-xs capitalize md:text-start">
                    {data.header}
                  </p>
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

export default StepByStep;
