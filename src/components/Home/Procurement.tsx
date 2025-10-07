"use client"
import Link from "next/link";
import Image from "next/image";

const Procurement = () => {
  return (
    <div className="px-5 relative cabinet lite-bg pt-12 md:pt-10 pb-20">
      <div className="w-full max-w-6xl m-auto space-y-8 flex flex-col items-center">
        <h2 className="uppercase text-base text-center font-medium dark-primary-txt leading-relaxed">
          procurement services
        </h2>

        <div className="w-full flex flex-col items-center gap-3 md:gap-5">
          <div className="max-w-3xl flex flex-col items-center gap-3 md:gap-5">
            <h2 className="text-xl sm:text-3xl md:text-4xl  text-center  leading-tight font-extrabold dark-green-txt">
              Streamline Your{" "}
              <span className="primary-txt">Crop Sourcing</span>, Cut
              Costs, And Scale Fast
            </h2>
            <p className="text-sm font-medium sm:text-base md:text-lg text-center">
              We help you source directly from farms, avoid market chaos, and
              get timely delivery. Access trusted, high-quality produce with
              transparent pricing, consistent supply, and total control over
              your sourcing process.
            </p>
          </div>

          {/* ✅ Added relative to stop Image from covering texts */}
          <div className="relative w-full max-w-6xl 
                min-w-[250px] min-h-[250px] 
                sm:min-w-[350px] sm:min-h-[300px] 
                lg:min-w-[450px] lg:min-h-[700px]">
            <Image
              fill
              src="/assets/images/landing-procurement.png"
              alt="market-img"
              className="object-contain"
              priority
            />
          </div>


          <Link
            href=""
            className="px-16 self-auto text-center py-2 md:px-32 md:py-4 text-white text-base rounded-full font-btnBody transition-all duration-300 hover:bg-white bg-[var(--primary)]  hover:text-[var(--primary)]"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Procurement;
