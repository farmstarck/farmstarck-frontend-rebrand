import LogoImg from "../../assets/svg/auth-midlogo.svg";

const BaseLoader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="relative loader_img w-20 h-20 bg-white rounded-full flex justify-center items-center">
        <img src={LogoImg} alt="logo" className="w-10 sm:w-16" />
      </div>
    </div>
  );
};

export default BaseLoader;
