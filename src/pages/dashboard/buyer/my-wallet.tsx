"use client";

import { useEffect, useState } from "react";
import {
  EyeOff,
  Eye,
  ChevronRight,
  WalletMinimal,
  ShoppingCart,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import TitleHeader from "@/components/dashboard/buyer/TitleHeader";
import { useNavigate } from "@/hooks/useNavigate";
import FundWallet from "@/components/dashboard/buyer/FundWallet";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { walletQueries } from "@/queries/wallet.queries";
import { WalletTransaction } from "@/types/prisma-schema-types";
import { useRouter } from "next/router";

const fmt = (n: number) =>
  "₦" +
  n.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const TRANSACTION_ICON: Record<string, { bg: string; icon: JSX.Element }> = {
  credit: {
    bg: "bg-green-500/10",
    icon: <WalletMinimal size={20} className="text-green-400" />,
  },
  debit: {
    bg: "bg-orange-500/10",
    icon: <ShoppingCart size={20} className="text-orange-400" />,
  },
  refund: {
    bg: "bg-blue-500/10",
    icon: <WalletMinimal size={20} className="text-blue-400" />,
  },
};

const MyWallet = () => {
  const { navigate } = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [viewBal, setViewBal] = useState(true);
  const [fundWallet, setFundWallet] = useState(false);

  // ── Queries ──────────────────────────────────────────────────────

  const { data: wallet } = useQuery(walletQueries.info());

  const { data: summary } = useQuery(walletQueries.summary());

  const { data: txData } = useQuery(
    walletQueries.transactions({ page: 1, size: 5 }),
  );

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.funded === "true") {
      queryClient.invalidateQueries({ queryKey: walletQueries.all });
      // Clean the URL without triggering a navigation
      router.replace("/dashboard/buyer/my-wallet", undefined, {
        shallow: true,
      });
    }
  }, [router.isReady, router.query.funded]);

  const chartData = [
    {
      name: "Deposits",
      value: summary?.creditPercentage ?? 0,
      color: "#00c700",
    },
    {
      name: "Purchase Debit",
      value: summary?.debitPercentage ?? 0,
      color: "#ffbb28",
    },
  ];

  {
    viewBal ? fmt(wallet?.balance ?? 0) : "₦••••••••";
  }

  return (
    <div className="max-w-6xl mx-auto">
      <TitleHeader title="My Wallet" />

      <div className="px-4 py-4 bg-[#fbfbfb] flex flex-col gap-4 rounded-2xl">
        {/* Balance Card */}
        <div className="bg-white text-dark rounded-2xl px-5 py-10">
          <p className="text-base md:text-lg mb-1">Available Funds</p>
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-2xl font-bold tracking-tight">
              {viewBal ? fmt(wallet?.balance ?? 0) : "₦••••••••"}
            </h1>
            <button onClick={() => setViewBal((p) => !p)}>
              {viewBal ? (
                <EyeOff size={17} className="text-gray-500" />
              ) : (
                <Eye size={17} className="text-gray-500" />
              )}
            </button>
          </div>
          <button
            onClick={() => setFundWallet(true)}
            className="w-full py-3 bg-primary active:scale-[0.98] transition-all text-white text-sm md:text-base font-semibold rounded-full"
          >
            Fund Wallet
          </button>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white text-dark rounded-2xl py-6 border border-gray-200">
          <div className="flex px-5 items-center justify-between mb-4">
            <p className="text-base md:text-xl font-bold">
              Transaction History
            </p>
            <button
              onClick={() => navigate("/dashboard/buyer/transaction-history")}
              className="text-sm flex items-center gap-0.5 hover:text-dark/50 transition-colors"
            >
              See all <ChevronRight size={12} />
            </button>
          </div>

          <ul className="flex flex-col gap-4">
            {(txData?.transactions ?? []).map((tx, index) => {
              const icon = TRANSACTION_ICON[tx.type] ?? TRANSACTION_ICON.debit;
              const isCredit = tx.type === "credit" || tx.type === "refund";

              return (
                <div
                  key={tx.id}
                  className={
                    index !== (txData?.transactions?.length ?? 0) - 1
                      ? "border-b border-b-gray-200 pb-3"
                      : ""
                  }
                >
                  <li className="flex px-5 pb-1 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${icon.bg}`}
                      >
                        {icon.icon}
                      </div>
                      <div>
                        <p
                          className={`text-sm md:text-base font-semibold ${isCredit ? "text-[#28d028]" : "text-red-500"}`}
                        >
                          {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                        </p>
                        <p className="text-sm text-gray-400">
                          {tx.description ?? tx.reference ?? "—"}
                        </p>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {new Date(tx.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`text-sm md:text-base font-bold ${isCredit ? "text-[#28d028]" : "text-red-500"}`}
                    >
                      {isCredit ? "+" : "-"}
                      {fmt(tx.amount)}
                    </p>
                  </li>
                </div>
              );
            })}

            {(txData?.transactions ?? []).length === 0 && (
              <p className="text-center text-sm text-gray-400 py-6">
                No transactions yet
              </p>
            )}
          </ul>
        </div>

        {/* Account Summary */}
        <div className="bg-[#eaffe8] rounded-2xl p-4 text-dark">
          <p className="text-base lg:text-xl font-bold mb-4">Account Summary</p>
          <div className="flex items-center justify-center flex-col py-4">
            <div className="w-28 h-28 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={28}
                    outerRadius={50}
                    paddingAngle={3}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {chartData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="flex flex-col gap-3 mt-4">
              {chartData.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between gap-10"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <span
                      className="w-3.5 h-3.5 rounded-[3px] shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.name}
                  </span>
                  <span className="text-sm font-bold">{item.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {fundWallet && <FundWallet onClose={() => setFundWallet(false)} />}
    </div>
  );
};

export default MyWallet;
