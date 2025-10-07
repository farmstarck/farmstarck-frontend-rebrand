import Image from "next/image";

const BaseLoader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="relative loader_img w-20 h-20 bg-white rounded-full flex justify-center items-center">
        <Image height={64} width={64} src={'/assets/svg/auth-midlogo.svg'} alt="logo" className="w-10 sm:w-16" />
      </div>
    </div>
  );
};

export default BaseLoader;
