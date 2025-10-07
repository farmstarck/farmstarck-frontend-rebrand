"use client"
import Image from "next/image";
import Link from "next/link";

const Market = () => {
  return (
    <div className="px-5 relative lite-bg cabinet md:pt-10 md:pb-20">
      <div className="w-full max-w-3xl m-auto space-y-8 flex flex-col items-center">
        <h2 className="uppercase text-base text-center dark-primary-txt font-subHeading leading-relaxed">
          marketplace
        </h2>
        <Image
          src={'/assets/images/landing-market.png'}
          alt="market-img"
          width={800}
          height={800}
          className="object-contain w-full h-auto min-w-[350px]"
        />
        <div className="w-full flex flex-col items-center gap-3 md:gap-7 md:w-5/6 m-auto pb-8 px-4">
          <h2 className="text-xl sm:text-3xl md:text-4xl  text-center font-subHeading leading-tight font-extrabold dark-green-txt text-centers">
            Your <span className="primary-txt">One-Stop</span> Hub for
            Quality Farm Produce and Resources
          </h2>
          <p className="text-sm font-medium sm:text-base md:text-lg text-center">
            From the farm to the market to your wallet. Farmstarck powers
            agriculture with smart tools, seamless trade, and financial
            inclusion.
          </p>
          <Link
            // to="shop"
            href="underconstruction"
            className="px-12 self-auto text-center py-2  md:py-4 bg-[var(--primary)] text-white hover:text-[var(--primary)]  text-base rounded-full font-bold hover:bg-white   transition-all duration-300 "
          >
            View Marketplace
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Market;
