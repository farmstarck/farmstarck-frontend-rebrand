import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import VerifyImg from "../../../assets/svg/auth-verify.svg";
import CountdownTimer from "../../../components/common/CountdownTimer";
import CodeInput from "../../../components/marketing/auth/CodeInput";
import { errorMessageRetreiver } from "../../../utils/errorRetriever";
import FormSpinner from "../../../components/loaders/FormLaoder";
import AuthService from "../../../services/AuthenticationService";

const VerifyEmail = () => {
  const { verifyEmail, state, dispatch } = useAuth();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isCountingdown, setIsCountingdown] = useState(true);
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");

  const handleComplete = (code: string) => {
    setCode(code);
  };

  const handleResendCode = async () => {
    if (isCountingdown === true) {
      toast.error("Verification code already sent");
      return;
    }

    const credential = {
      email,
    };

    try {
      dispatch({ type: "DATA_LOADING" });

      const {
        status,
        data: { data },
      } = await AuthService.resendOTP(credential);
      if (status === 200) {
        toast.success(data);
        setIsCountingdown(true);
      }
    } catch (error) {
      const message = errorMessageRetreiver(error);

      toast.error(message);
    } finally {
      dispatch({ type: "DATA_LOADED" });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (code === "") {
      toast.error("Please enter the verification code");
      return;
    }

    const formData = {
      email,
      otp: code,
    };

    const response: any = await verifyEmail(formData);
    if (response?.user) {
      setCode("");
      setIsDisabled(true);
      navigate("/shop");
    }
  };

  useEffect(() => {
    if (state.user?.email) {
      setEmail(state.user?.email);
    }
  }, [state]);

  return (
    <div className="w-full h-screen flex justify-center items-center p-5">
      <div className="max-w-4xl mx-auto w-full">
        {state?.loading ? (
          <FormSpinner />
        ) : (
          <div className="w-full flex flex-col gap-7">
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <img src={VerifyImg} alt="lock-icon" className="w-20" />
              <h1 className="font-subHeading2 text-2xl">Email Verification</h1>
              <p>Please check your email for an OTP Verification code</p>
            </div>
            <form
              className="flex flex-col items-center justify-center gap-4 text-center"
              onSubmit={handleSubmit}
            >
              <p className="text-sm">
                Expires in 60 seconds{" "}
                <span>
                  {isCountingdown && (
                    <CountdownTimer
                      initialMinutes={5}
                      initialSeconds={0}
                      setIsCountingdown={setIsCountingdown}
                    />
                  )}
                </span>
              </p>
              <CodeInput
                length={5}
                onComplete={handleComplete}
                setIsDisabled={setIsDisabled}
              />
              <button
                className="w-full md:w-1/3 bg-secondary-dark mt-2 py-2 rounded-md cursor-pointer border border-secondary-dark text-white hover:bg-white hover:text-secondary-dark disabled:bg-secondary-light disabled:cursor-auto disabled:border-none disabled:hover:text-white"
                disabled={isDisabled}
              >
                Proceed
              </button>
              <p className="text-xs  w-1/3  py-5">
                Didn’t receive the OTP code ? Please check your spam folder or
                try to resend the OTP code{" "}
                <span
                  className={`${
                    isCountingdown
                      ? "text-gray-400 cursor-auto"
                      : "text-secondary-dark cursor-pointer"
                  } `}
                  onClick={handleResendCode}
                >
                  {state?.isLoading ? "Resending OTP....." : "Resend OTP"}
                </span>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
