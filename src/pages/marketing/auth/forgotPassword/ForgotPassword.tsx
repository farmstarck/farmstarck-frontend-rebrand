import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../../context/AuthContext";
import AuthService from "../../../../services/AuthenticationService";
import SuccessImg from "../../../../assets/svg/success-icon.svg";
import VerifyImg from "../../../../assets/svg/auth-verify.svg";
import EmailIcon from "../../../../assets/svg/mail-icon.svg";
import { errorMessageRetreiver } from "../../../../utils/errorRetriever";
import FormSpinner from "../../../../components/loaders/FormLaoder";

const ForgotPassword = () => {
  const { dispatch, state } = useAuth();
  const [email, setEmail] = useState("");
  const [isSuccessfull, setIsSuccessfull] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!regex.test(email)) {
      toast.error("Invalid email address.");
      setEmail("");
      return;
    }

    const credential = {
      email,
    };

    try {
      dispatch({ type: "DATA_LOADING" });
      const { status } = await AuthService.sendChangePasswordLink(credential);
      if (status === 200) {
        // When successful
        setIsSuccessfull(true);
      }
    } catch (error: any) {
      const message = errorMessageRetreiver(error);

      toast.error(message);
    } finally {
      dispatch({ type: "DATA_LOADED" });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center p-5">
      <div className="max-w-4xl mx-auto w-full">
        {state?.isLoading ? (
          <FormSpinner />
        ) : (
          <div className="w-full flex flex-col gap-7">
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <img src={VerifyImg} alt="lock-icon" className="w-20" />
              <h1 className="font-subHeading2 text-2xl">Forgot Password</h1>
              <p>
                Enter the email registered with your account to get password
                reset link
              </p>
            </div>
            <form
              className="flex flex-col items-center justify-center gap-4 text-center max-w-md mx-auto w-full"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-1 w-full">
                <div className="relative">
                  <input
                    required
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="w-full h-12  p-3 pl-10 relative  border rounded-md  bg-white font-light text-sm focus:outline-none placeholder-gray-500"
                  />
                  <img
                    src={EmailIcon}
                    alt=""
                    className="absolute top-4 left-3 w-4"
                  />
                </div>
              </div>

              <button className="w-full  bg-secondary-dark mt-2 py-2 rounded-md cursor-pointer border border-secondary-dark text-white hover:bg-white hover:text-secondary-dark disabled:bg-secondary-light disabled:cursor-auto disabled:border-none disabled:hover:text-white">
                Proceed
              </button>
              <p className="text-xs  py-5">
                Have a problem?{" "}
                <Link
                  to="/contact"
                  className="text-secondary-dark cursor-pointer"
                >
                  Contact us
                </Link>
              </p>
            </form>
          </div>
        )}
      </div>
      {/* Success modal */}
      {isSuccessfull && (
        <div className="fixed top-0 left-0 w-full h-full bg-backdrop flex justify-center items-center z-[80] p-5">
          <div
            className="max-w-2xl w-full bg-white p-5 rounded-2xl shadow-md z-10 h-[450px] no-scrollbar overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col justify-center items-center p-5 gap-8 sm:gap-10 text-center ">
              <img src={SuccessImg} alt="" className="w-1/2 sm:w-fit" />
              <h2 className="font-subHeading2 text-base sm:text-xl">
                Successful
              </h2>
              <div>
                <p className="text-sm">
                  We sent a reset password link to your email address{" "}
                  <span className="text-secondary-dark">{email}</span>
                </p>
                <p className="text-sm">
                  Check your email and click on the link to change your
                  password.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
