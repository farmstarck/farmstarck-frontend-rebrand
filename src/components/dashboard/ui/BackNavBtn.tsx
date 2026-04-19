import { useNavigate } from "@/hooks/useNavigate";
import { ChevronLeft } from "lucide-react";

interface BackNavBtnProps {
  label: string;
  href: string;
  linkAvailable?: boolean;
}

const BackNavBtn = ({ label, href, linkAvailable=true }: BackNavBtnProps) => {
  const { navigate } = useNavigate();
  return (
    <div className="flex items-center gap-3">
      {linkAvailable ? (
        <>
        <button
          onClick={() => navigate(href)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
        </button>
        <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
        {label}
      </h1>
        </>
      ):(
        <>
        <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
        {label}
      </h1>
        </>
      )
      
      }
      
    </div>
  );
};

export default BackNavBtn;
