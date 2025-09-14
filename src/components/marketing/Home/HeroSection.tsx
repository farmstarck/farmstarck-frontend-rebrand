import Image from "next/image";
import HeroImg2 from "../../../assets/images/hero-testt.png";

const HeroSection = () => {
  return (
    <div className="bg-secondary-veryLight">
      <div className="max-w-6xl m-auto p-5 relative flex flex-col justify-center items-center ">
        {/* Top Section */}
        <div className="relative rounded-xl bg-white flex flex-col justify-center items-center gap-2 w-full pt-8  px-4 pb-32 md:pb-56 lg:pb-80">
          <h3 className="font-subHeading text-secondary-dark text-lg text-center">
            Reimagining Agriculture for the New Economy
          </h3>
          <h1 className="font-subHeading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-secondary-light text-center">
            One Platform to
          </h1>
          <h1 className="font-subHeading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-secondary-veryDark text-center">
            Source, Save & Scale
          </h1>
          <div className="rounded-md bg-[#FFBB28] p-2 sm:p-3 md:p-4">
            <p className="uppercase font-subHeading  text-secondary-dark text-center text-xs  sm:text-sm md:text-base">
              Agriculture digitized, simplified, reimagined
            </p>
          </div>
        </div>

        {/* Overlapping Section */}
        <div className="w-full max-w-3xl -mt-24 md:-mt-44 lg:-mt-64 overflow-hidden rounded-2xl flex flex-col items-center z-10 gap-5">
          <Image
            src={HeroImg2}
            alt="Hero"
            className="object-contain w-full h-auto min-w-[300px] px-10 md:px-0"
          />
          <div className="w-full md:w-5/6 m-auto pb-8 px-4">
            <p className="text-sm font-subHeading2 sm:text-base md:text-lg text-center">
              From the farm to the market to your wallet. Farmstarck powers
              agriculture with smart tools, seamless trade, and financial
              inclusion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
