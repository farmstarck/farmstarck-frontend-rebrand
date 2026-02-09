import Image from "next/image";
import React from "react";

type WhyUsProps = {
  img: string;
  header: string;
  text: string;
};

const WhyUs: React.FC<WhyUsProps> = ({ img, header, text }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <Image
        src={img}
        height={500}
        width={500}
        alt={header}
        className="object-contain w-1/2 h-auto min-w-[150px]"
      />
      <h2 className="font-subHeading text-secondary-veryDark text-center text-sm md:text-base">
        {header}
      </h2>
      <p className="text-center text-sm w-full md:text-base md:w-5/6">{text}</p>
    </div>
  );
};

export default WhyUs;
