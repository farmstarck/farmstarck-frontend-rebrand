import ApiLoader from "@/components/common/ui/ApiLoader";
import DashBoardWrapper from "@/components/dashboard/ui/DashBoardWrapper";
import SuccessConfirmationModal from "@/components/dashboard/ui/SuccessConfirmationModal";
import { useState } from "react";

type Submit = 'submitting'|'success' |'failure' | null

const AutoPaySchedule = () => {
  const options = ["48hours (After Sales)", "Weekly", "Monthly"];
  const [checked, setChecked] = useState(options[0]);
  const [isSubmitting,setIsSubmitting] = useState<Submit>(null)

  const handleToggle = (value: string) => {
    setIsSubmitting("submitting")
    setTimeout(()=>{
      setChecked(value);
      setIsSubmitting("success")
    },1500)
  };

  if(isSubmitting === "submitting"){
    return <ApiLoader loading={isSubmitting === "submitting"}/>
  }

  return (
    <DashBoardWrapper
      href="/dashboard/merchant/settings"
      label="Auto Payout Schedule"
    >
      <div className="w-full min-h-[70dvh] flex items-center justify-center">
       <div className="w-full md:max-w-md ">
         <div className="w-full flex items-start flex-col gap-3">
          {options.map((item) => {
            const isSelected = checked === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => handleToggle(item)}
                className={`flex items-center w-full justify-between rounded-xl border px-4 py-4 text-left transition-colors ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/40"
                }`}
              >
                <span className="text-sm font-medium text-gray-800">
                  {item}
                </span>
                <span
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? "border-primary"
                      : "border-gray-300 group-hover:border-primary"
                  }`}
                >
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary block" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
       </div>

        {isSubmitting === "success" && (
          <SuccessConfirmationModal
           onClose={()=> setIsSubmitting(null)}
           title="Auto payout change"
           boldTitle={checked}
           message="has been selected as your auto-payout schedule"
          />
        )}
      </div>
    </DashBoardWrapper>
  );
};

export default AutoPaySchedule;
