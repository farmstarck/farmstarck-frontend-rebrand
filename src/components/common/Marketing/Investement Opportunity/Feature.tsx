type FeatureProps = {
  title: string;
  img: string;
  description: string;
};

type FeaturesProps = {
  header?: string;
  data: FeatureProps[];
};

const Feature: React.FC<FeaturesProps> = ({ data, header }) => {
  return (
    <div className="flex flex-col space-y-10">
      <h2 className="uppercase text-center text-xl w-full sm:text-2xl md:text-4xl md:text-start md:w-3/4">
        {header}
      </h2>
      <div className="grid grid-cols-1 w-full  md:gap-y-10  gap-x-10 md:gap-x-16 md:grid-cols-2 justify-center items-stretch sm:grid-cols-2">
        {data?.map((data, index) => (
          <div
            className="flex flex-col gap-5 w-full py-7 items-center md:items-start md:w-5/6"
            key={index}
          >
            <div className="shadow-xl w-12 h-12 flex justify-center items-center rounded-full">
              <img src={data.img} alt="" loading="lazy" className="w-4" />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-center text-xs font-subHeading2 md:text-start md:text-sm">
                {data.title}
              </h3>
              <p className="text-center text-xs text-gray-700 md:text-start md:text-sm">
                {data.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
