import { Dispatch, SetStateAction, useEffect, useState } from "react";
import WalletImg from "../../../../assets/svg/pay-wallet.svg";
import PaystackImg from "../../../../assets/svg/pay-paystack.svg";
import CryptoImg from "../../../../assets/svg/pay-crypto.svg";

type PaymentMethodFormProps = {
  setPaymentMethod: Dispatch<SetStateAction<string>>;
  setIsPaymentModalOpen: Dispatch<SetStateAction<boolean>>;
  paymentMethod: string | undefined;
};

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  setPaymentMethod,
  setIsPaymentModalOpen,
  paymentMethod,
}) => {
  const [isWalletChecked, setIsWalletChecked] = useState(false);
  const [isPaystackChecked, setIsPaystackChecked] = useState(false);
  const [isCryptoChecked, setIsCryptoChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!isWalletChecked && !isPaystackChecked && !isCryptoChecked) {
    //   toast.error("Please select a payment method.");
    //   return;
    // }

    setPaymentMethod(
      isWalletChecked
        ? "wallet"
        : isPaystackChecked
        ? "paystack"
        : isCryptoChecked
        ? "crypto"
        : ""
    );

    // toast.success("Delivery method selected!");
    setIsPaymentModalOpen(false);
  };

  const handleCheckbox = (e: boolean, selected: string) => {
    setIsWalletChecked(false);
    setIsPaystackChecked(false);
    setIsCryptoChecked(false);

    if (selected === "wallet") setIsWalletChecked(e);
    if (selected === "paystack") setIsPaystackChecked(e);
    if (selected === "crypto") setIsCryptoChecked(e);
  };

  useEffect(() => {
    if (paymentMethod) {
      setIsWalletChecked(paymentMethod === "wallet" ? true : false);
      setIsPaystackChecked(paymentMethod === "paystack" ? true : false);
      setIsCryptoChecked(paymentMethod === "crypto" ? true : false);
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 w-full py-5 pt-12"
    >
      <label
        htmlFor="custom-checkbox1"
        className="w-full relative border border-gray-400 rounded-md flex justify-between items-center gap-3 p-2 sm:p-4"
      >
        <div className="flex items-center flex-1 gap-3">
          <div className="flex items-center justify-center p-2 rounded-full border border-gray-300">
            <img src={WalletImg} alt="" className="w-4" />
          </div>
          <div>
            <p className="inline-block text-sm text-gray-600 font-light">
              Pay with Wallet
            </p>
            <span className="absolute right-1 top-0 py-[0.1rem] px-[0.3rem] text-[0.7rem] bg-secondary-light text-gray-900 rounded sm:relative sm:right-0 sm:ml-2">
              Coming soon
            </span>
            <p className="font-subHeading2 text-xs md:text-sm">
              Wallet Balance -{" "}
              <span className="text-secondary-dark block sm:inline-block">
                N *********
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="custom-checkbox1"
            checked={isWalletChecked}
            onChange={(e) => handleCheckbox(e.target.checked, "wallet")}
            className="hidden peer"
            disabled
          />
          <label
            htmlFor="custom-checkbox1"
            className={`w-3 h-3 md:w-4 md:h-4 flex items-center justify-center rounded-full ${
              !isWalletChecked && "border border-gray-400"
            } peer-checked:bg-secondary-dark peer-checked:border-secondary-dark cursor-auto transition-all`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 text-white peer-checked:block"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12l5 5L20 7"></path>
            </svg>
          </label>
        </div>
      </label>
      <label
        htmlFor="custom-checkbox2"
        className="w-full relative border border-gray-400 cursor-pointer rounded-md flex justify-between items-center gap-3 p-2 sm:p-4"
      >
        <div className="flex items-center flex-1 gap-3">
          <div className="flex items-center justify-center p-2 rounded-full border border-gray-300">
            <img src={PaystackImg} alt="" className="w-4" />
          </div>
          <div>
            <p className="inline-block text-sm text-gray-600 font-light">
              Pay with Paystack
            </p>
            <p className="font-subHeading2 text-xs md:text-sm">
              Debit/Credit Card/Bank Transfer - Instant
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="custom-checkbox2"
            checked={isPaystackChecked}
            onChange={(e) => handleCheckbox(e.target.checked, "paystack")}
            className="hidden peer"
          />
          <label
            htmlFor="custom-checkbox2"
            className={`w-3 h-3 md:w-4 md:h-4  flex items-center justify-center rounded-full ${
              !isPaystackChecked && "border border-gray-400"
            } peer-checked:bg-secondary-dark peer-checked:border-secondary-dark cursor-pointer transition-all`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 text-white peer-checked:block"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12l5 5L20 7"></path>
            </svg>
          </label>
        </div>
      </label>
      <label
        htmlFor="custom-checkbox3"
        className="w-full relative border border-gray-400 cursor-pointer rounded-md flex justify-between items-center gap-3 p-2 sm:p-4"
      >
        <div className="flex items-center flex-1 gap-3">
          <div className="flex items-center justify-center p-2 rounded-full border border-gray-300">
            <img src={CryptoImg} alt="" className="w-4" />
          </div>
          <div>
            <p className="inline-block text-sm text-gray-600 font-light">
              Pay with Crypto
            </p>
            <p className="font-subHeading2 text-xs md:text-sm">
              USDT Payment - Instant
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="custom-checkbox3"
            checked={isCryptoChecked}
            onChange={(e) => handleCheckbox(e.target.checked, "crypto")}
            className="hidden peer"
          />
          <label
            htmlFor="custom-checkbox3"
            className={`w-3 h-3 md:w-4 md:h-4  flex items-center justify-center rounded-full ${
              !isCryptoChecked && "border border-gray-400"
            } peer-checked:bg-secondary-dark peer-checked:border-secondary-dark cursor-pointer transition-all`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 text-white peer-checked:block"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12l5 5L20 7"></path>
            </svg>
          </label>
        </div>
      </label>

      <button className="bg-secondary-dark py-2 rounded-md cursor-pointer border border-secondary-dark text-white hover:bg-white hover:text-secondary-dark">
        Continue
      </button>
    </form>
  );
};

export default PaymentMethodForm;
