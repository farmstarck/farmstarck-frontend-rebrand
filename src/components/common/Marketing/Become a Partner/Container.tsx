type ContainerProps = {
  tag: string;
  headerOne: string;
  textOne: string;
  headerTwo: string;
  textTwo: string;
  headerThree: string;
  textThree: string;
  subHeaderThree: string;
};

const Container: React.FC<ContainerProps> = ({
  tag,
  headerOne,
  textOne,
  headerTwo,
  textTwo,
  headerThree,
  textThree,
  subHeaderThree,
}) => {
  return (
    <div>
      <div className="max-w-3xl m-auto flex flex-col gap-5 justify-between items-center md:items-start">
        <div className="px-3 py-3 bg-[var(--dark-primary)]">
          <p className="uppercase text-white text-btn-txt md:text-xs">{tag}</p>
        </div>
        <h2 className="uppercase text-center text-xl w-full sm:text-2xl md:text-4xl md:text-start">
          {headerOne}
        </h2>
        <p className="text-center text-xs text-gray-700 md:text-start md:text-sm">
          {textOne}
        </p>
        <h2 className="uppercase text-center text-xl w-full mt-10 sm:text-2xl md:text-4xl md:text-start">
          {headerTwo}
        </h2>
        <p className="text-center text-xs text-gray-700 md:text-start md:text-sm">
          {textTwo}
        </p>
      </div>
      <div className="bg-[var(--primary)] max-w-4xl m-auto mt-12 px-5 py-5 md:px-16 md:py-20 flex flex-col gap-2 md:gap-5 justify-between items-center md:items-start">
        <h2 className="uppercase text-center text-xl w-full sm:text-2xl md:text-4xl md:text-start">
          {headerThree}
        </h2>
        <h5 className="capitalize font-bold text-center text-xs w-full  md:text-sm md:text-start">
          {subHeaderThree}
        </h5>
        <p className="text-center text-xs text-gray-700 md:text-start md:text-sm">
          {textThree}
        </p>
      </div>
    </div>
  );
};

export default Container;
