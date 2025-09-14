import toast from "react-hot-toast";
import Img1 from "../../assets/svg/veggies-construct.svg";
import Img2 from "../../assets/svg/yellowpepper-costruct.svg";
import Img3 from "../../assets/svg/tomato-construct.svg";
import Img4 from "../../assets/svg/corn-construct.svg";
import LogoImg from "../../assets/svg/logo-dark.svg";
import { useState } from "react";

const UnderConstruction = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success(`Email successfully added to wait list`);
    setEmail("");
  };

  return (
    <div className="relative flex flex-col gap-4 items-center justify-center h-screen p-5">
      <div className="max-w-md w-full m-auto flex flex-col gap-4 items-center justify-center">
        <img src={LogoImg} alt="Logo" className="w-32 md:w-40 mb-4" />
        <h1 className="text-2xl md:text-4xl font-subHeading text-center">
          <span className="text-secondary-dark">Hello!</span> We are cooking up
        </h1>
        <div className="tracking-wider">
          <p className="leading-tight text-center text-xs md:text-sm">
            We are just weeks from our big launch
          </p>
          <p className="leading-tight text-center text-xs md:text-sm">
            Join our wait list
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-full mt-5  md:flex-row"
        >
          <input
            name="email"
            type="email"
            className="border-2 border-secondary-dark rounded-md p-2 w-full md:w-[80%] text-sm focus:outline-none"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="w-full  text-sm uppercase font-subHeading text-white bg-secondary-dark hover:bg-secondary-dark-hover rounded-md p-3 md:p-0 md:w-[20%]">
            Join
          </button>
        </form>
      </div>
      <img
        src={Img1}
        alt="Veggies"
        className="absolute top-36 left-0 md:left-14 w-24 md:w-44"
      />
      <img
        src={Img2}
        alt="Yellow Peppers"
        className="absolute top-36 right-0 md:right-14 w-24 md:w-44"
      />
      <img
        src={Img3}
        alt="Tomatoes"
        className="absolute bottom-28 md:bottom-8 right-0 md:right-14 w-24 md:w-44"
      />
      <img
        src={Img4}
        alt="Corn"
        className="absolute bottom-28 md:bottom-8 left-0 md:left-14 w-24 md:w-44"
      />
    </div>
  );
};

export default UnderConstruction;
