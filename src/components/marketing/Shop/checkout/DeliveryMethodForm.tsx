import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BusImg from "../../../../assets/svg/bus-green.svg";
import StoreImg from "../../../../assets/svg/store-icon.svg";

type DeliveryMethodFormProps = {
  setDeliveryMethod: Dispatch<SetStateAction<string>>;
  setIsDeliveryModalOpen: Dispatch<SetStateAction<boolean>>;
  deliveryMethod: string | undefined;
};
const DeliveryMethodForm: React.FC<DeliveryMethodFormProps> = ({
  setDeliveryMethod,
  setIsDeliveryModalOpen,
  deliveryMethod,
}) => {
  const [isHomeDeliveryChecked, setIsHomeDeliveryChecked] = useState(false);
  const [isStorePickupChecked, setIsStorePickupChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!isHomeDeliveryChecked && !isStorePickupChecked) {
    //   toast.error("Please select a delivery method.");
    //   return;
    // }
    setDeliveryMethod(
      isHomeDeliveryChecked
        ? "Home Delivery"
        : isStorePickupChecked
        ? "Store Pickup"
        : ""
    );

    // toast.success("Delivery method selected!");
    setIsDeliveryModalOpen(false);
  };

  const handleCheckbox = (e: boolean, selected: string) => {
    setIsHomeDeliveryChecked(false);
    setIsStorePickupChecked(false);

    if (selected === "home") setIsHomeDeliveryChecked(e);
    if (selected === "store") setIsStorePickupChecked(e);
  };

  useEffect(() => {
    if (deliveryMethod) {
      setIsHomeDeliveryChecked(
        deliveryMethod === "Home Delivery" ? true : false
      );
      setIsStorePickupChecked(deliveryMethod === "Store Pickup" ? true : false);
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 w-full py-5 pt-12"
    >
      <label
        htmlFor="custom-checkbox1"
        className="w-full relative border border-gray-400 cursor-pointer rounded-md flex justify-between items-center gap-3 p-4"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center p-2 rounded-full border border-gray-300">
            <img src={BusImg} alt="" className="w-4" />
          </div>
          <p className="text-sm">Home Delivery</p>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="custom-checkbox1"
            checked={isHomeDeliveryChecked}
            onChange={(e) => handleCheckbox(e.target.checked, "home")}
            className="hidden peer"
          />
          <label
            htmlFor="custom-checkbox1"
            className={`w-4 h-4 flex items-center justify-center rounded-full ${
              !isHomeDeliveryChecked && "border border-gray-400"
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
        htmlFor="custom-checkbox2"
        className="w-full relative border border-gray-400 rounded-md flex justify-between items-center gap-3 p-4"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center p-2 rounded-full border border-gray-300">
            <img src={StoreImg} alt="" className="w-4" />
          </div>
          <p className="text-sm">Store Pickup</p>
          <span className="absolute right-1 top-0 py-[0.1rem] px-[0.3rem] text-[0.7rem] bg-secondary-light text-gray-600 rounded sm:relative sm:right-0">
            Coming soon
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="custom-checkbox2"
            checked={isStorePickupChecked}
            onChange={(e) => handleCheckbox(e.target.checked, "store")}
            className="hidden peer"
            disabled
          />
          <label
            htmlFor="custom-checkbox2"
            className={`w-4 h-4 flex items-center justify-center rounded-full ${
              !isStorePickupChecked && "border border-gray-400"
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
      <button className="bg-secondary-dark py-2 rounded-md cursor-pointer border border-secondary-dark text-white hover:bg-white hover:text-secondary-dark">
        Continue
      </button>
    </form>
  );
};

export default DeliveryMethodForm;
