import Image from "next/image";
import Img2 from "../../../assets/images/section-img7.png";

const Intro = () => {
  return (
    <div className="px-5 py-6 mt-6">
      <div className="max-w-3xl m-auto flex flex-col space-y-10 justify-between items-center md:items-start">
        <div className="flex justify-center w-ful">
          <Image src={Img2} alt="" loading="lazy" className="w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default Intro;
