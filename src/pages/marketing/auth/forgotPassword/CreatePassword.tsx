import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../../context/AuthContext";
import AuthService from "../../../../services/AuthenticationService";
import VerifyImg from "../../../../assets/svg/auth-verify.svg";
import OpenEyeIcon from "../../../../assets/svg/eye-open.svg";
import CloseEyeIcon from "../../../../assets/svg/eye-close.svg";
import SuccessImg from "../../../../assets/svg/success-icon.svg";
import { errorMessageRetreiver } from "../../../../utils/errorRetriever";
import FormSpinner from "../../../../components/loaders/FormLaoder";

const CreatePassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { dispatch, state } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isSuccessfull, setIsSuccessfull] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const credentials = {
      newPassword,
      token,
    };

    try {
      dispatch({ type: "DATA_LOADING" });

      const {
        status,
        data: { data },
      } = await AuthService.changePassword(credentials);
      if (status === 200) {
        toast.success("Password reset successful");
        setIsSuccessfull(true);
      } else {
        throw new Error(data.message || "Password reset failed");
      }
    } catch (error) {
      const message = errorMessageRetreiver(error);

      toast.error(message);
    } finally {
      dispatch({ type: "DATA_LOADED" });
    }
  };

  const handleNavigate = () => {
    setIsSuccessfull(false);

    navigate("/auth/login");
  };

  useEffect(() => {
    dispatch({ type: "DATA_LOADING" });
    async function verifyToken() {
      if (!token) return;
      const credential = {
        token,
      };
      try {
        await AuthService.verifyToken(credential);
      } catch (error) {
        const message = errorMessageRetreiver(error);

        toast.error(message);
        navigate("/auth/forgot-password");
      } finally {
        dispatch({ type: "DATA_LOADED" });
      }
    }

    verifyToken();
  }, [dispatch, navigate, token]);

  return (
    <div className="w-full h-screen flex justify-center items-center p-5">
      <div className="max-w-4xl mx-auto w-full">
        {state?.isLoading ? (
          <FormSpinner />
        ) : (
          <div className="w-full flex flex-col gap-7">
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <img src={VerifyImg} alt="lock-icon" className="w-20" />
              <h1 className="font-subHeading2 text-2xl">Create New Password</h1>
              <p>
                Use a password that is strong and can easily accessed by you
              </p>
            </div>
            <form
              className="flex flex-col items-center justify-center gap-4 text-center max-w-md mx-auto w-full"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col items-start gap-1 w-full">
                <label className="font-subHeading2 text-xs md:text-sm text-gray-500">
                  New Password
                </label>
                <div className="relative w-full">
                  <input
                    required
                    value={newPassword}
                    type={showPassword1 ? "text" : "password"}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full h-12  p-3 pr-10 relative  border rounded-md  bg-white font-light text-sm focus:outline-none placeholder-gray-500"
                  />
                  {showPassword1 ? (
                    <img
                      src={CloseEyeIcon}
                      alt=""
                      className="absolute top-4 right-3 w-5 cursor-pointer"
                      onClick={() => setShowPassword1(!showPassword1)}
                    />
                  ) : (
                    <img
                      src={OpenEyeIcon}
                      alt=""
                      className="absolute top-4 right-3 w-5 cursor-pointer"
                      onClick={() => setShowPassword1(!showPassword1)}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col items-start gap-1 w-full">
                <label className="font-subHeading2 text-xs md:text-sm text-gray-500">
                  Confirm Password
                </label>
                <div className="relative w-full">
                  <input
                    required
                    value={confirmPassword}
                    type={showPassword2 ? "text" : "password"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full h-12  p-3 pr-10 relative  border rounded-md  bg-white font-light text-sm focus:outline-none placeholder-gray-500"
                  />
                  {showPassword2 ? (
                    <img
                      src={CloseEyeIcon}
                      alt=""
                      className="absolute top-4 right-3 w-5 cursor-pointer"
                      onClick={() => setShowPassword2(!showPassword2)}
                    />
                  ) : (
                    <img
                      src={OpenEyeIcon}
                      alt=""
                      className="absolute top-4 right-3 w-5 cursor-pointer"
                      onClick={() => setShowPassword2(!showPassword2)}
                    />
                  )}
                </div>
              </div>

              <button className="w-full  bg-secondary-dark mt-2 py-2 rounded-md cursor-pointer border border-secondary-dark text-white hover:bg-white hover:text-secondary-dark disabled:bg-secondary-light disabled:cursor-auto disabled:border-none disabled:hover:text-white">
                Confirm
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
                Password reset successful
              </h2>
              <div
                className="bg-secondary-dark py-2 w-full sm:py-2 text-white text-sm sm:text-base rounded-md cursor-pointer font-subHeading2"
                onClick={handleNavigate}
              >
                Go to Login
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePassword;
