import Link from "next/link";
import DepotImg from "../../../assets/images/community-depot.png";
import CustomButton from "../../common/CustomButton";
import Image from "next/image";
const Community = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col items-center mb-10">
        <h5 className="text-xs uppercase">our community</h5>
        <h2 className="uppercase text-lg text-center leading-relaxed sm:text-2xl md:text-3xl md:text-start">
          our resources
        </h2>
      </div>
      <div className="bg-secondary-light w-full px-5 py-10">
        <div className="relative w-full max-w-3xl m-auto mx-auto">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:gap-10">
            <Image
              src={DepotImg}
              alt=""
              className="w-1/2 md:w-5/6"
              loading="lazy"
            />
            <div className="flex flex-col  items-center space-y-4 md:items-start">
              <p className="font-thin text-xs">December 2024</p>
              <h3 className="font-subHeading2 text-sm uppercase">
                industry report
              </h3>
              <p className="text-xs text-center md:text-start">
                Lorem ipsum dolor sit amet consectetur. Amet ligula sem
                adipiscing velit congue purus ullamcorper at eget. Amet tortor
                feugiat nam. Lorem ipsum dolor sit amet consectetur. Amet ligula
                sem adipiscing velit congue purus ullamcorper at eget. Amet
                tortor feugiat nam.
              </p>
              <div className="flex flex-col gap-5 md:flex-row w-full">
                <Link
                  href="/underconstruction"
                  className="w-full md:w-1/2 border border-solid border-secondary-dark rounded-full"
                >
                  <CustomButton color="white" text="readmore" />
                </Link>
                <Link
                  href="/underconstruction"
                  className="w-full md:w-1/2 border border-solid border-secondary-dark rounded-full"
                >
                  <CustomButton color="green" text="seemore" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
