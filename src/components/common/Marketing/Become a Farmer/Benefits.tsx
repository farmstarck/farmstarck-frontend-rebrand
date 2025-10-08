"use client"
import CustomButton from "@/components/common/CustomButton";
import Link from "next/link";
import Image from "next/image";

const benefitsData = [
  {
    img: '/assets/svg/benefit-img1.svg',
    title: "Market access",
    description: "Get your products to more buyers and expand your reach.",
  },
  {
    img: '/assets/svg/benefit-img2.svg',
    title: "Educational Resources",
    description:
      "Learn new skills and best practices through our workshops and training sessions.",
  },
  {
    img: '/assets/svg/benefit-img3.svg',
    title: "Financial Support",
    description:
      "Explore funding options and investments to help your farm grow.",
  },
  {
    img: '/assets/svg/benefit-img4.svg',
    title: "Community and Networking",
    description: "Connect with other farmers and share valuable insights.",
  },
  {
    img: '/assets/svg/benefit-img5.svg',
    title: "AI Assistant",
    description:
      "Use our AI tools for instant answers to all your farming questions.",
  },
];
const Benefits = () => {
  return (
    <div className="px-5">
      <div className="max-w-3xl m-auto flex flex-col space-y-10 justify-between items-center md:items-start">
        <h2 className="uppercase text-center text-xl sm:text-2xl md:text-4xl">
          benefits of joining us
        </h2>
        <div>
          <div className="flex flex-col gap-10">
            {benefitsData?.map((data, index) => (
              <div
                className="flex gap-5 w-full items-center md:items-start"
                key={index}
              >
                <Image width={16} height={16} src={data.img} alt="" loading="lazy" className="w-6" />
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
