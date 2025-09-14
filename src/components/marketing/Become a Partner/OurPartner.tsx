import WavetifyImg from "../../../assets/svg/wavetify.svg";
import ArolonaImg from "../../../assets/svg/arolana.svg";
import IbrandImg from "../../../assets/svg/ibrand.svg";
import FugeImg from "../../../assets/svg/fuge.svg";
import KoinwaImg from "../../../assets/svg/koinwa.svg";
import IfexesImg from "../../../assets/svg/ifexes.svg";

const stats = [
  { id: 1, value: WavetifyImg },
  { id: 2, value: ArolonaImg },
  { id: 3, value: IbrandImg },
  { id: 4, value: FugeImg },
  { id: 5, value: KoinwaImg },
  { id: 6, value: IfexesImg },
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
              <img
                src={data.value}
                alt=""
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
