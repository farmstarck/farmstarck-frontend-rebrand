import Link from "next/link";
import ProcurementImg from "../../../assets/images/landing-procurement.png";
import Image from "next/image";

const Procurement = () => {
  return (
    <div className="px-5 relative bg-secondary-veryLight pt-12 md:pt-10 pb-20">
      <div className="w-full max-w-6xl m-auto space-y-8 flex flex-col items-center">
        <h2 className="uppercase text-base text-center text-secondary-dark font-subHeading leading-relaxed">
          procurement services
        </h2>

        <div className="w-full flex flex-col items-center gap-3 md:gap-5">
          <div className="max-w-3xl flex flex-col items-center gap-3 md:gap-5">
            <h2 className="text-xl sm:text-3xl md:text-4xl  text-center font-subHeading leading-tight font-extrabold text-secondary-veryDark text-centers">
              Streamline Your{" "}
              <span className="text-secondary-light">Crop Sourcing</span>, Cut
              Costs, And Scale Fast
            </h2>
            <p className="text-sm font-subHeading2 sm:text-base md:text-lg text-center">
              We help you source directly from farms, avoid market chaos, and
              get timely delivery. Access trusted, high-quality produce with
              transparent pricing, consistent supply, and total control over
              your sourcing process.
            </p>
          </div>

          <Image
            src={ProcurementImg}
            alt="market-img"
            className="object-contain w-full h-auto min-w-[350px]"
          />

          <Link
            href=""
            className="px-16 self-auto text-center py-2  md:px-32 md:py-4 bg-secondary-light text-white text-base rounded-full font-btnBody transition-all duration-300 hover:bg-white hover:text-secondary-light"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Procurement;
