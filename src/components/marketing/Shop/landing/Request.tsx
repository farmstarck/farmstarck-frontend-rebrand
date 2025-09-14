import Img from "../../../../assets/svg/shop-close.svg";

type RequestProp = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<any>>;
};
const Request: React.FC<RequestProp> = ({ setIsModalOpen }) => {
  return (
    <div className="w-full p-5 bg-secondary-light ">
      <div className="max-w-4xl m-auto py-2 flex flex-col-reverse justify-between gap-5 items-center md:flex-row md:py-8">
        <div className="flex flex-col md:gap-5 w-full md:w-1/2">
          <h2 className="uppercase text-base text-center leading-tight md:leading-relaxed sm:text-2xl md:text-3xl md:text-start">
            LOOKING FOR A PRODUCT BUT NOT LISTED HERE?
          </h2>

          <p className="text-xs text-center pt-3 md:text-sm md:text-start">
            Request the product right away and we will help you source for it
          </p>
          <button
            className="block bg-secondary-dark border border-secondary-dark mt-5 py-2 rounded-md text-white text-xs hover:bg-white hover:text-secondary-dark md:text-base"
            onClick={() => setIsModalOpen(true)}
          >
            Request a Product
          </button>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3">
          <img src={Img} alt="" loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default Request;
