import Img from "../../../../assets/svg/shop-hero.svg";

const HeroSection = () => {
  return (
    <div className="flex flex-col item-center justify-center w-full bg-gradient-to-b p-3 md:p-10 from-secondary-dark via-secondary-dark to-secondary-veryDark mix-blend-plus-lighter rounded-lg md:flex-row gap-3 md:justify-between  md:gap-0">
      <div className="w-full flex flex-col space-y-3 items-center justify-center md:w-2/4 md:items-start">
        <h5 className="text-xs uppercase text-white">marketplace</h5>
        <h2 className="uppercase text-base text-white text-center leading-tight md:leading-relaxed sm:text-2xl md:text-3xl md:text-start">
          GET DIRECT FROM FARM PRODUCE IN LARGE, SMALL QUANITY DELIVERED AT YOUR
          DOORSTEP
        </h2>
      </div>
      <div className="flex justify-center w-full md:w-1/3 md:mb-0">
        <img src={Img} alt="" className="w-2/3 md:w-5/6" loading="lazy" />
      </div>
    </div>
  );
};

export default HeroSection;
