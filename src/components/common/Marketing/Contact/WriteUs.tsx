import toast from "react-hot-toast";
import { useState } from "react";
import Image from "next/image";
import { ErrorMessage, SuccessMessage } from "@/utils/PageUtils";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import CommunityService from "@/services/community.service";

const WriteUs = () => {
  const [role, setRole] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleRoleSelect = (selected: string) => {
    if (role === selected) {
      setRole("");
    } else {
      setRole(selected);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!role) {
      toast.error("Please select your role.");
      return;
    }
    try {
      setLoading(true);
      const body = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };
      await CommunityService.contactUs(body);
      SuccessMessage("Message sent successfully");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setRole("");
    } catch (error) {
      console.error(error);
      const msg = renderAxiosOrAuthError(error);
      ErrorMessage(msg);
    } finally {
      setLoading(false);
    }
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
                  role === "farmer" && "bg-[var(--primary)]"
                }`}
              >
                {role === "farmer" ? (
                  <Image
                    height={32}
                    width={32}
                    src={`/assets/svg/user-white.svg`}
                    alt="farmer Image"
                    className="w-3 md:w-4"
                    loading="lazy"
                  />
                ) : (
                  <Image
                    src={"/assets/svg/user-dark.svg"}
                    alt=""
                    width={32}
                    height={32}
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
                  role === "investor" && "bg-[var(--primary)]"
                }`}
              >
                {role === "investor" ? (
                  <Image
                    src={"/assets/svg/user-white.svg"}
                    alt=""
                    width={32}
                    height={32}
                    className="w-3 md:w-4"
                    loading="lazy"
                  />
                ) : (
                  <Image
                    src={"/assets/svg/user-dark.svg"}
                    alt=""
                    width={32}
                    height={32}
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
                  role === "merchant" && "bg-[var(--primary)]"
                }`}
              >
                {role === "merchant" ? (
                  <Image
                    src={"/assets/svg/user-white.svg"}
                    alt=""
                    width={32}
                    height={32}
                    className="w-3 md:w-4"
                    loading="lazy"
                  />
                ) : (
                  <Image
                    width={32}
                    height={32}
                    src={"/assets/svg/user-dark.svg"}
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
                  role === "user" && "bg-[var(--primary)]"
                }`}
              >
                {role === "user" ? (
                  <Image
                    width={32}
                    height={32}
                    src={"/assets/svg/user-white.svg"}
                    alt=""
                    className="w-3 md:w-4"
                    loading="lazy"
                  />
                ) : (
                  <Image
                    width={32}
                    height={32}
                    src={"/assets/svg/user-white.svg"}
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
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full name"
            className="w-full h-12  p-3  border-0  rounded-md  bg-[var(--lite)] placeholder-black font-light text-sm focus:outline-none"
          />
        </div>
        <div className="flex gap-1">
          <label className="">*</label>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            className="w-full h-12  p-3  border-0  rounded-md  bg-[var(--lite)] placeholder-black font-light text-sm focus:outline-none"
          />
        </div>
        <div className="flex gap-1">
          <label className="">*</label>
          <textarea
            required
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message"
            className="w-full h-40  p-3  border-0  rounded-md  bg-[var(--lite)] placeholder-black font-light text-sm focus:outline-none"
          />
        </div>
        <button
          disabled={loading}
          className="bg-[var(--primary)] text-white rounded-full w-full py-3 text-center font-btnBody text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed "
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default WriteUs;
