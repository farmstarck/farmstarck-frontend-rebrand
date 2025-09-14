type HeroSectionProps = {
  header: string;
  paragraph: string;
};

const GenericHero: React.FC<HeroSectionProps> = ({ header, paragraph }) => {
  return (
    <div className="w-full bg-secondary-light py-24 px-5 md:py-40">
      <div className="max-w-3xl m-auto flex flex-col space-y-10 justify-between items-center md:flex-row  md:space-x-10 md:space-y-0">
        <h1 className="uppercase text-2xl text-center font-subHeading2  md:text-start sm:text-3xl md:text-4xl md:w-1/2">
          {header}
        </h1>
        <p className=" text-center text-sm md:text-start w-full sm:w-2/3 md:w-1/2 sm:text-base">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default GenericHero;
