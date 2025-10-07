"use client"
import Image from "next/image";
import Link from "next/link";

const Foodvault = () => {
  return (
    <div className="px-5 relative cabinet lite-bg md:pt-10 md:pb-20">
      <div className="w-full max-w-6xl m-auto flex flex-col md:flex-row justify-between items-center dark-green-bg rounded-2xl px-5 md:px-10 py-8  md:py-5">
        <div className="flex flex-col gap-3 md:gap-10 w-full md:w-2/3 items-center md:items-start">
          <h2 className="uppercase text-sm md:text-base text-white font-subHeading leading-relaxed">
            food vault
          </h2>
          <div className="w-full flex flex-col items-center md:items-start gap-3 md:gap-10 m-auto pb-8">
            <h2 className="font-subHeading leading-tight text-center font-extrabold text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl md:text-start">
              Smart Saving for{" "}
              <span className="primary-txt">Smarter Eating</span>
            </h2>
            <p className="text-white text-sm font-subHeading2 sm:text-base md:text-lg text-center md:text-start">
              Food Vault is your digital wallet for stress-free food access. Set
              your savings, track your progress, and shop with peace of mind.
            </p>
            <div className="flex md:hidden w-full md:w-2/3 item-center">
              <Image
                width={400}
                height={500}
                src={'/assets/images/landing-vault.png'}
                alt="market-img"
                className="object-contain w-full h-auto min-w-[250px]"
              />
            </div>
            <Link
              href=""
              className="px-20 self-auto text-center py-3 md:py-4  text-white text-base rounded-full font-btnBody transition-all duration-300 hover:bg-white  bg-[var(--primary)]  hover:text-[var(--primary)]"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="hidden md:block w-full md:w-2/3 relative min-w-[350px] min-h-[500px]">
          <Image
            src="/assets/images/landing-vault.png"
            alt="market-img"
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover"
            priority
          />
        </div>

      </div>
    </div>
  );
};

export default Foodvault;
