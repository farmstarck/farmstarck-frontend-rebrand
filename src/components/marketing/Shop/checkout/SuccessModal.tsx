import { Dispatch, SetStateAction } from "react";
import { useShopContext } from "../../../../context/ShopContext";
import SuccessImg from "../../../../assets/svg/success-icon.svg";
import { useRouter } from "next/navigation";

type SuccessModalProps = {
  setIsSuccessful: Dispatch<SetStateAction<boolean>>;
};

const SuccessModal: React.FC<SuccessModalProps> = ({ setIsSuccessful }) => {
   const router = useRouter();
  const { setUpdateCart } = useShopContext();

  const handleNavigate = () => {
    localStorage.removeItem("cart");
    setUpdateCart(Date.now());
    setIsSuccessful(false);
    router.push("/shop"); 
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-backdrop flex justify-center items-center z-[80] p-5">
      <div
        className="max-w-2xl w-full bg-white p-5 rounded-2xl shadow-md z-10 h-[450px] no-scrollbar overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col justify-center items-center p-5 gap-8 sm:gap-10 text-center ">
          <img src={SuccessImg} alt="" className="w-1/2 sm:w-fit" />
          <h2 className="font-subHeading2 text-base sm:text-xl">
            Congratulations!
          </h2>
          <p className="text-sm">You have successfully placed an Order </p>
          <div
            className="bg-secondary-dark py-2 w-full sm:py-2 text-white text-sm sm:text-base rounded-md cursor-pointer font-subHeading2"
            onClick={handleNavigate}
          >
            Continue Shopping
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
