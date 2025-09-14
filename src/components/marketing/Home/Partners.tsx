import WavetifyImg from "../../../assets/svg/wavetify.svg";
import ArolonaImg from "../../../assets/svg/arolana.svg";
import IbrandImg from "../../../assets/svg/ibrand.svg";
import FugeImg from "../../../assets/svg/fuge.svg";
import KoinwaImg from "../../../assets/svg/koinwa.svg";

const stats = [
  { id: 1, value: WavetifyImg },
  { id: 2, value: ArolonaImg },
  { id: 3, value: IbrandImg },
  { id: 4, value: FugeImg },
  { id: 5, value: KoinwaImg },
];

const Partners = () => {
  return (
    <div className="bg-secondary-light pb-14 sm:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h5 className="text-xs uppercase text-center mb-10">our partners</h5>
        <div className="flex gap-x-8 overflow-x-scroll snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-5 md:gap-y-10 md:gap-x-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex-shrink-0 snap-center mx-auto flex max-w-xs flex-col gap-y-4 justify-center"
            >
              <img
                src={stat.value}
                alt=""
                className="w-16 md:w-20"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
