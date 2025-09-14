import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import toast from "react-hot-toast";
import "react-phone-number-input/style.css";
import UserIcon from "../../../../assets/svg/user-icon.svg";
import EmailIcon from "../../../../assets/svg/mail-icon.svg";
import LocationIcon from "../../../../assets/svg/location-light.svg";
import { DeliveryDetailsProps } from "../../../../pages/marketing/shop/Checkout";

type DeliveryFormProp = {
  setDeliveryDetails: Dispatch<
    SetStateAction<DeliveryDetailsProps | undefined>
  >;
  setIsDetailsModalOpen: Dispatch<SetStateAction<boolean>>;
  deliveryDetails: DeliveryDetailsProps | undefined;
};

const DeliveryForm: React.FC<DeliveryFormProp> = ({
  setDeliveryDetails,
  setIsDetailsModalOpen,
  deliveryDetails,
}) => {
  const [phoneError, setPhoneError] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [value, setValue] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerDeliveryAddress, setBuyerDeliveryAddress] = useState("");
  const [landmark, setLandmark] = useState<string | undefined>();

  const handlePhoneNumberChange = (newValue: any) => {
    setValue(newValue);
    setPhoneError(false);
    if (newValue === undefined || newValue === null) {
      return;
    } else if (newValue.length >= 15 || newValue.length === 12) {
      setIsValid(false);
    } else {
      setIsValid(isValidPhoneNumber(newValue));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value === undefined || value === null || value === "") {
      setPhoneError(true);
      return;
    }
    if (phoneError || !isValid) return;
    if (buyerName === "" || buyerEmail === "" || buyerDeliveryAddress === "") {
      toast.error("Please fill all required fields.");
      return;
    }

    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!regex.test(buyerEmail)) {
      toast.error("Invalid email address.");
      setBuyerEmail("");
      return;
    }
    setDeliveryDetails({
      buyerName,
      buyerEmail,
      buyerDeliveryAddress,
      landmark,
      buyerPhoneNumber: value,
    });

    setBuyerDeliveryAddress("");
    setBuyerEmail("");
    setBuyerName("");
    setLandmark("");
    setValue("");
    setPhoneError(false);

    // toast.success("Message sent successfully!");
    setIsDetailsModalOpen(false);
  };

  useEffect(() => {
    if (deliveryDetails) {
      setValue(deliveryDetails.buyerPhoneNumber);
      setBuyerName(deliveryDetails.buyerName);
      setBuyerEmail(deliveryDetails.buyerEmail);
      setBuyerDeliveryAddress(deliveryDetails.buyerDeliveryAddress);
      setLandmark(deliveryDetails.landmark);
    }
  }, []);

  return (
    <form className="flex flex-col gap-8 w-full py-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <label className="font-subHeading2 text-xs md:text-sm text-gray-500">
          Buyer Name
        </label>
        <div className="relative">
          <input
            required
            value={buyerName}
            type="text"
            onChange={(e) => setBuyerName(e.target.value)}
            placeholder="Enter buyer name"
            className="w-full h-12  p-3 pl-10 relative  border rounded-md  bg-white font-light text-sm focus:outline-none placeholder-gray-500"
          />
          <img src={UserIcon} alt="" className="absolute top-4 left-3 w-3" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="font-subHeading2 text-xs md:text-sm text-gray-500">
          Buyer Phone Number
        </label>
        <PhoneInput
          defaultCountry="NG"
          international
          initialValueFormat="national"
          placeholder="Enter phone number"
          value={value}
          onChange={handlePhoneNumberChange}
          className="w-full h-12  p-3 relative  border rounded-md  bg-white font-light text-sm focus:outline-none placeholder-gray-500"
          limitMaxLength
        />
        {isValid ? null : (
          <div className="w-full text-center text-red-600 text-xs">
            Invalid phone number
          </div>
        )}
        {phoneError && (
          <p className="w-full text-center text-red-600 text-xs">
            Phone Number is required
          </p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <label className="font-subHeading2 text-xs md:text-sm text-gray-500">
          Buyer Email Address
        </label>
        <div className="relative">
          <input
            required
            value={buyerEmail}
            type="email"
            onChange={(e) => setBuyerEmail(e.target.value)}
            placeholder="Enter email address"
            className="w-full h-12  p-3 pl-10 relative  border rounded-md  bg-white font-light text-sm focus:outline-none placeholder-gray-500"
          />
          <img src={EmailIcon} alt="" className="absolute top-4 left-3 w-3" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="font-subHeading2 text-xs md:text-sm text-gray-500">
          Buyer Delivery Address
        </label>
        <div className="relative">
          <input
            required
            value={buyerDeliveryAddress}
            type="text"
            onChange={(e) => setBuyerDeliveryAddress(e.target.value)}
            placeholder="Enter delivery address"
            className="w-full h-12  p-3 pl-10 relative  border rounded-md  bg-white font-light text-sm focus:outline-none placeholder-gray-500"
          />
          <img
            src={LocationIcon}
            alt=""
            className="absolute top-4 left-3 w-3"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="font-subHeading2 text-xs md:text-sm text-gray-500">
          Landmark
          <span className="font-light text-xs text-gray-400 pl-2">
            (optional)
          </span>
        </label>
        <div className="relative">
          <input
            value={landmark}
            type="text"
            onChange={(e) => setLandmark(e.target.value)}
            placeholder="e.g opposite MTN office"
            className="w-full h-12  p-3 pl-10 relative  border rounded-md  bg-white font-light text-sm focus:outline-none placeholder-gray-500"
          />
          <img
            src={LocationIcon}
            alt=""
            className="absolute top-4 left-3 w-3"
          />
        </div>
      </div>
      <button className="bg-secondary-dark py-2 rounded-md cursor-pointer border border-secondary-dark text-white hover:bg-white hover:text-secondary-dark">
        Continue
      </button>
    </form>
  );
};

export default DeliveryForm;
