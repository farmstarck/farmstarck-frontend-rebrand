// AutoPaySchedule.tsx — wire to real backend
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userMutations, userQueries } from "@/queries/user.queries";
import { ErrorMessage, SuccessMessage } from "@/utils/PageUtils";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { useRouter } from "next/router";
import { ChevronLeft } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { AutoPayoutSchedule } from "@/types/prisma-schema-types";

const OPTIONS = [
  {
    value: "immediate",
    label: "48 hours after eligibility",
    desc: "Paid out automatically 48 hours after delivery confirmation",
  },
  {
    value: "weekly",
    label: "Weekly",
    desc: "Every Monday — all eligible earnings from the past week",
  },
  {
    value: "monthly",
    label: "Monthly",
    desc: "1st of every month — all eligible earnings from the past month",
  },
  {
    value: "none",
    label: "Manual only",
    desc: "I'll request payouts myself from the Payouts page",
  },
];

const AutoPaySchedule = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: profile } = useQuery(userQueries.profile());
  const current = profile?.autoPayoutSchedule ?? "none";

  const { mutate: updateSchedule, isPending } = useMutation({
    ...userMutations.updateAutoPayoutSchedule(),
    onSuccess: () => {
      SuccessMessage("Auto payout schedule updated");
      queryClient.invalidateQueries({ queryKey: userQueries.all });
    },
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 flex items-center gap-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft size={20} />
          <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
            Auto Payout Schedule
          </h1>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
        <p className="text-sm md:text-base text-gray-800 mb-6">
          Choose when you&apos;d like eligible earnings to be automatically paid out
          to your default bank account.
        </p>

        <div className="flex flex-col gap-3">
          {OPTIONS.map((option) => {
            const isSelected = current === option.value;
            return (
              <button
                key={option.value}
                onClick={() =>
                  updateSchedule(option.value as AutoPayoutSchedule)
                }
                disabled={isPending}
                className={`flex items-center justify-between w-full rounded-xl border px-5 py-4 text-left transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/40 hover:bg-gray-50"
                }`}
              >
                <div>
                  <p
                    className={`text-sm md:text-base font-semibold ${isSelected ? "text-primary" : "text-gray-800"}`}
                  >
                    {option.label}
                  </p>
                  <p className="text-xs md:text-sm  text-gray-600 mt-0.5">
                    {option.desc}
                  </p>
                </div>
                <span
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ml-4 ${
                    isSelected ? "border-primary" : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-primary block" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

AutoPaySchedule.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default AutoPaySchedule;
