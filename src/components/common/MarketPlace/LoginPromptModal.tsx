import { useNavigate } from "@/hooks/useNavigate";

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectAfter?: string;
  message?: string;
}

const LoginPromptModal = ({
  isOpen,
  onClose,
  redirectAfter = "/market/marketplace/cart/checkout",
  message,
}: LoginPromptModalProps) => {
  const { navigate } = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    localStorage.setItem("redirectAfterAuth", redirectAfter);
    navigate("/signin");
    onClose();
  };

  const handleSignup = () => {
    localStorage.setItem("redirectAfterAuth", redirectAfter);
    navigate("/onboarding/signup");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 px-4 pb-4 sm:pb-0"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full sm:max-w-sm p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#015401"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        {/* Text */}
        <div className="text-center">
          <h3 className="font-bold text-gray-900 text-lg mb-1">
            Sign in to continue
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            {message ??
              "You need to be signed in to proceed to checkout. Your cart items will be saved."}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 mt-1">
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Sign In
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-primary font-bold text-sm hover:text-gray-600 transition-colors cursor-pointer"
          >
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptModal;
