import { Dispatch, SetStateAction, useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import toast from "react-hot-toast";
import "react-phone-number-input/style.css";
import EmailIcon from "../../../assets/svg/mail-icon.svg";
import Link from "next/link";

type PartnerFormProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const PartnerForm: React.FC<PartnerFormProps> = ({ setIsModalOpen }) => {
  const [phoneError, setPhoneError] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [value, setValue] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState("");
  const [message, setMessage] = useState("");

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

    setCompanyName("");
    setContactName("");
    setCompanyEmail("");
    setCompanyWebsite("");
    setCountry("");
    setIndustry("");
    setMessage("");

    setValue("");
    setPhoneError(false);

    toast.success("Message sent successfully!");
    setIsModalOpen(false);
  };

  return (
    <div>
      <header className="pb-10 flex flex-col gap-4">
        <h2 className="font-subHeading2 text-base md:text-2xl">
          The future is here, are you ready?
        </h2>
        <p className="text-sm text-gray-700">
          Please note that this form is intended for{" "}
          <b className=" text-gray-950 font-subHeading">companies</b> interested
          in offering Farmstarck products and not for individuals who want to
          use other services
        </p>
      </header>
      <form className="flex flex-col gap-8 w-full py-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <label className="font-subHeading2 text-xs md:text-sm text-gray-500">
            Company Name
          </label>
          <div className="relative">
            <input
              required
              value={companyName}
              type="text"
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
              className="w-full h-12  p-3 relative  border rounded-md  bg-white font-light text-sm focus:outline-none placeholder-gray-500"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-subHeading2 text-xs md:text-sm text-gray-500">
            Full Name of Contact Person
          </label>
          <div className="relative">
            <input
              required
              value={contactName}
              type="text"
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Enter full name"
              className="w-full h-12  p-3 relative  border rounded-md  bg-white font-light text-sm focus:outline-none placeholder-gray-500"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-8 md:gap3 md:flex-row">
          <div className="flex flex-col gap-3  w-full md:w-2/3">
            <label className="font-subHeading2 text-xs md:text-sm text-gray-500">
              Company Email
            </label>
            <div className="relative">
              <input
                required
                value={companyEmail}
                type="email"
                onChange={(e) => setCompanyEmail(e.target.value)}
                placeholder="Enter company email"
                className="w-full h-12  p-3 pl-10 relative  border rounded-md  bg-white font-light text-sm focus:outline-none placeholder-gray-500"
              />
              <img
                src={EmailIcon}
                alt=""
                className="absolute top-4 left-3 w-3"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3  w-full md:w-2/3">
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
        </div>
        <div className="flex flex-col items-center justify-between gap-8 md:gap3 md:flex-row">
          <div className="flex flex-col gap-3 w-full md:w-2/3">
            <label className="font-subHeading2 text-xs md:text-sm text-gray-500">
              Company Website
            </label>
            <div className="relative">
              <input
                required
                value={companyWebsite}
                type="text"
                onChange={(e) => setCompanyWebsite(e.target.value)}
                placeholder="Enter company website"
                className="w-full h-12  p-3 pl-10 relative  border rounded-md  bg-white font-light text-sm focus:outline-none placeholder-gray-500"
              />
              <img
                src={EmailIcon}
                alt=""
                className="absolute top-4 left-3 w-3"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-2/3">
            <label className="font-subHeading2 text-xs md:text-sm text-gray-500">
              Country of Incoperation
            </label>
            <div className="relative">
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full h-12  p-3 relative  border rounded-md  bg-white font-light text-sm focus:outline-none placeholder-gray-500"
              >
                <option value=" disabled selected  hidden">
                  Select country
                </option>
                <option value="nigeria">Nigeria</option>
                <option value="ghana">Ghana</option>
                <option value="togo">Togo</option>
                <option value="kenya">Kenya</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-subHeading2 text-xs md:text-sm text-gray-500">
            Industry
          </label>
          <div className="relative">
            <select
              required
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full h-12  p-3  relative  border rounded-md  bg-white font-light text-sm focus:outline-none placeholder-gray-500"
            >
              <option value=" disabled selected  hidden">
                Select industry
              </option>
              <option value="government organization">
                Government Organization
              </option>
              <option value="non-government organization">
                Non-Government Organization
              </option>
              <option value="tech & research comapany">
                Tech & Research Comapany
              </option>
              <option value="financial institution">
                Financial Institution
              </option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-subHeading2 text-xs md:text-sm text-gray-500">
            Message
            <span className="font-light text-xs text-gray-400 pl-2">
              (optional)
            </span>
          </label>
          <div className="relative">
            <textarea
              value={message}
              placeholder="Drop us a note"
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-32  p-3  relative  border rounded-md  bg-white font-light text-sm focus:outline-none placeholder-gray-500"
            ></textarea>
          </div>
        </div>
        <p className=" text-xs md:text-sm font-subHeading2 text-gray-600">
          Information you provided will be used in accordance with our{" "}
          <Link
            href="/underconstruction"
            className="font-subHeading text-secondary-dark"
          >
            Privacy Policy
          </Link>
        </p>
        <button className="bg-secondary-dark py-2 rounded-md cursor-pointer border border-secondary-dark text-white hover:bg-white hover:text-secondary-dark">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PartnerForm;
