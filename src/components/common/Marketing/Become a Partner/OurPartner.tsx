"use client"
import Image from "next/image";

const stats = [
  { id: 1, value: '/assets/svg/wavetify.svg' },
  { id: 2, value: '/assets/svg/arolana.svg' },
  { id: 3, value: '/assets/svg/ibrand.svg' },
  { id: 4, value: '/assets/svg/fuge.svg' },
  { id: 5, value: '/assets/svg/koinwa.svg'},
  { id: 6, value: '/assets/svg/ifexes.svg' },
];

const OurPartner = () => {
  return (
    <div className="">
      <div className="flex flex-col gap-14  max-w-3xl m-auto px-6 lg:px-8">
        <h2 className="uppercase text-center text-xl w-full sm:text-2xl md:text-4xl md:text-start">
          our partners
        </h2>

        <div className="grid grid-cols-2 w-full  gap-y-10  gap-x-10 md:gap-x-16 md:grid-cols-3 justify-between items-stretch sm:grid-cols-2">
          {stats?.map((data, i) => (
            <div key={i} className="flex justify-center md:justify-start">
              <Image
               height={32} width={32}
                src={data.value}
                alt={`partners ${i} image`}
                loading="lazy"
                className="w-16 md:w-20"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurPartner;
