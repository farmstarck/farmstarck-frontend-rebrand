"use client"
import Link from "next/link";
import CustomButton from "../common/CustomButton";
import Image, { StaticImageData } from "next/image";


type ServiceSectionProps = {
  section: string;
  header: string;
  url: string;
  paragraph: string;
  img: string | StaticImageData;
  reverse: boolean;
  btn: string;
};

const ServiceSection: React.FC<ServiceSectionProps> = ({
  section,
  header,
  url,
  btn,
  img,
  paragraph,
  reverse,
}) => {
  const sectionClass = reverse ? "md:flex-row-reverse" : "md:flex-row";
  return (
    <div
      className={`flex flex-col-reverse item-center justify-center w-full  ${sectionClass} gap-3 md:justify-between md:space-x-5 md:gap-0`}
    >
      <div className="w-full flex flex-col space-y-3 items-center md:w-2/4 md:items-start">
        <h5 className="text-sm uppercase">{section}</h5>
        <h2 className="uppercase text-base text-center leading-tight sm:text-2xl md:text-3xl md:text-start">
          {header}
        </h2>
        <Link
          href={url}
          className="w-5/6 border border-solid border-secondary-dark rounded-full sm:w-1/2 md:w-2/3"
        >
          <CustomButton color="white" text={btn} />
        </Link>
        <p className="text-sm text-center pt-3 text-gray-700 md:text-start">
          {paragraph}
        </p>
      </div>
      <div className="flex justify-center w-full md:w-1/3 md:mb-0">
        <Image width={100} height={100} src={img} alt="" className="w-1/2 md:w-5/6" loading="lazy" />
      </div>
    </div>
  );
};

export default ServiceSection;
