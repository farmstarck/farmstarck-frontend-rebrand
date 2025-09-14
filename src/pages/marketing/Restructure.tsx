import LogoDarkImg from "../../assets/svg/logo-dark.svg";
import RestructureImg from "../../assets/images/restructure.png";

const RestructurePage = () => {
  return (
    <div className="p-5 flex flex-col gap-10 md:p-10 h-screen">
      <div className="w-full flex">
        <img src={LogoDarkImg} alt="" className="w-44" />
      </div>
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-xl sm:text-3xl md:text-5xl  text-center font-heading leading-tight font-extrabold text-centers">
          WE ARE RESTRUCTURING{" "}
        </h1>
        <p className="text-sm font-subHeading2  sm:text-base md:text-lg text-center">
          We got your feedback and we are integrating them for a more seamless
          experience. Stay with us.
        </p>
        <img
          src={RestructureImg}
          alt=""
          className="object-contain w-1/2 h-auto min-w-[350px]"
        />
      </div>
    </div>
  );
};

export default RestructurePage;
