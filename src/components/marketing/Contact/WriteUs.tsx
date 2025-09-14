import toast from "react-hot-toast";
import UserLight from "../../../assets/svg/user-white.svg";
import Userdark from "../../../assets/svg/user-dark.svg";
import { useState } from "react";

const WriteUs = () => {
  const [role, setRole] = useState<string>("");

  const handleRoleSelect = (selected: string) => {
    if (role === selected) {
      setRole("");
    } else {
      setRole(selected);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!role) {
      toast.error("Please select your role.");
      return;
    }
    toast.success("Message sent successfully!");
  };

  return (
    <div className="max-w-3xl m-auto w-full flex flex-col">
      <form className="flex flex-col  gap-10 w-full" onSubmit={handleSubmit}>
        <div className="flex gap-1 justify-between">
          <div className="w-full flex justify-between gap-2 md:gap-10 ">
            <div
              className="flex flex-col items-center justify-center cursor-pointer"
              onClick={() => handleRoleSelect("farmer")}
            >
              <div
                className={`border border-solid border-gray-200 rounded-md p-3 flex items-center justify-center md:p-5 ${
                  role === "farmer" && "bg-secondary-light"
                }`}
              >
                {role === "farmer" ? (
                  <img
                    src={UserLight}
                    alt=""
                    className="w-3 md:w-4"
                    loading="lazy"
                  />
                ) : (
                  <img
                    src={Userdark}
                    alt=""
                    className="w-3 md:w-4"
                    loading="lazy"
                  />
                )}
              </div>
              <label className="font-btnBody text-btn-txt md:text-xs">
                Farmer
              </label>
            </div>
            <div
              className="flex flex-col items-center justify-center cursor-pointer"
              onClick={() => handleRoleSelect("investor")}
            >
              <div
                className={`border border-solid border-gray-200 rounded-md p-3 flex items-center justify-center md:p-5 ${
                  role === "investor" && "bg-secondary-light"
                }`}
              >
                {role === "investor" ? (
                  <img
                    src={UserLight}
                    alt=""
                    className="w-3 md:w-4"
                    loading="lazy"
                  />
                ) : (
                  <img
                    src={Userdark}
                    alt=""
                    className="w-3 md:w-4"
                    loading="lazy"
                  />
                )}
              </div>
              <label className="font-btnBody text-btn-txt md:text-xs">
                Investor
              </label>
            </div>
            <div
              className="flex flex-col items-center justify-center cursor-pointer"
              onClick={() => handleRoleSelect("merchant")}
            >
              <div
                className={`border border-solid border-gray-200 rounded-md p-3 flex items-center justify-center md:p-5 ${
                  role === "merchant" && "bg-secondary-light"
                }`}
              >
                {role === "merchant" ? (
                  <img
                    src={UserLight}
                    alt=""
                    className="w-3 md:w-4"
                    loading="lazy"
                  />
                ) : (
                  <img
                    src={Userdark}
                    alt=""
                    className="w-3 md:w-4"
                    loading="lazy"
                  />
                )}
              </div>
              <label className="font-btnBody text-btn-txt md:text-xs">
                Merchant
              </label>
            </div>
            <div
              className="flex flex-col items-center justify-center cursor-pointer"
              onClick={() => handleRoleSelect("user")}
            >
              <div
                className={`border border-solid border-gray-200 rounded-md p-3 flex items-center justify-center md:p-5 ${
                  role === "user" && "bg-secondary-light"
                }`}
              >
                {role === "user" ? (
                  <img
                    src={UserLight}
                    alt=""
                    className="w-3 md:w-4"
                    loading="lazy"
                  />
                ) : (
                  <img
                    src={Userdark}
                    alt=""
                    className="w-3 md:w-4"
                    loading="lazy"
                  />
                )}
              </div>
              <label className="font-btnBody text-btn-txt md:text-xs">
                User
              </label>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <label className="">*</label>
          <input
            required
            type="text"
            placeholder="Full name"
            className="w-full h-12  p-3  border-0 border-b rounded-md  bg-secondary-veryLight placeholder-black font-light text-sm focus:outline-none"
          />
        </div>
        <div className="flex gap-1">
          <label className="">*</label>
          <input
            required
            type="email"
            placeholder="Email address"
            className="w-full h-12  p-3  border-0 border-b rounded-md  bg-secondary-veryLight placeholder-black font-light text-sm focus:outline-none"
          />
        </div>
        <div className="flex gap-1">
          <label className="">*</label>
          <textarea
            required
            placeholder="Write your message"
            className="w-full h-40  p-3  border-0 border-b rounded-md  bg-secondary-veryLight placeholder-black font-light text-sm focus:outline-none"
          />
        </div>
        <button className="bg-secondary-light text-white rounded-full w-full py-3 text-center font-btnBody text-sm md:text-base">
          Submit
        </button>
      </form>
    </div>
  );
};

export default WriteUs;
