import DashboardLayout from "@/layouts/DashboardLayout";
import React, { useMemo, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { payoutQueries, payoutMutations } from "@/queries/payout.queries";
import { QueryPayoutParams } from "@/types";
import { useSellerGuard } from "@/hooks/useSellerGuard";
import { useDebounce } from "@/hooks/useDebounce";
import { ErrorMessage, SuccessMessage } from "@/utils/PageUtils";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import Pagination from "@/components/common/ui/Pagination";
import {
  Wallet,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  Banknote,
  RefreshCw,
} from "lucide-react";
import FilterOnly from "@/components/common/ui/FilterOnly";

const ITEMS_PER_PAGE = 10;

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "success", label: "Success" },
  { value: "failed", label: "Failed" },
];

const PAYOUT_STATUS_META: Record<
  string,
  { label: string; icon: React.ElementType; bg: string; text: string }
> = {
  pending: {
    label: "Pending",
    icon: Clock,
    bg: "bg-yellow-100",
    text: "text-yellow-700",
  },
  processing: {
    label: "Processing",
    icon: RefreshCw,
    bg: "bg-blue-100",
    text: "text-blue-700",
  },
  success: {
    label: "Paid Out",
    icon: CheckCircle,
    bg: "bg-green-100",
    text: "text-green-700",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    bg: "bg-red-100",
    text: "text-red-600",
  },
};

// ── Eligible order card ───────────────────────────────────────────
const EligibleOrderCard = ({
  order,
  onRequest,
  isRequesting,
}: {
  order: any;
  onRequest: (sellerOrderId: string) => void;
  isRequesting: boolean;
}) => {
  const isEligible = order.eligibleAt
    ? new Date() >= new Date(order.eligibleAt)
    : false;

  const daysLeft = order.eligibleAt
    ? Math.max(
        0,
        Math.ceil(
          (new Date(order.eligibleAt).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24),
        ),
      )
    : 0;

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-bold text-gray-900">
          Order #{order.order?.orderId}
        </p>
        <p className="text-xs text-gray-500">
          {order.items?.length ?? 0} item
          {order.items?.length !== 1 ? "s" : ""}
        </p>
        {!isEligible && daysLeft > 0 && (
          <div className="flex items-center gap-1 mt-0.5">
            <Clock size={11} className="text-orange-400" />
            <p className="text-xs text-orange-500 font-medium">
              Available in {daysLeft} day{daysLeft !== 1 ? "s" : ""}
            </p>
          </div>
        )}
        {isEligible && (
          <div className="flex items-center gap-1 mt-0.5">
            <CheckCircle size={11} className="text-green-500" />
            <p className="text-xs text-green-600 font-medium">
              Ready for payout
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-bold text-gray-900">
            ₦{order.sellerEarning?.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400">Your earnings</p>
        </div>
        <button
          onClick={() => onRequest(order.id)}
          disabled={!isEligible || isRequesting}
          className="px-3 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:opacity-90 disabled:opacity-40 transition-opacity whitespace-nowrap"
        >
          {isRequesting ? "Processing..." : "Request Payout"}
        </button>
      </div>
    </div>
  );
};

// ── Payout history row ────────────────────────────────────────────
const PayoutRow = ({ payout }: { payout: any }) => {
  const meta = PAYOUT_STATUS_META[payout.status] ?? PAYOUT_STATUS_META.pending;
  const Icon = meta.icon;

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${meta.bg}`}
        >
          <Icon size={16} className={meta.text} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Order #{payout.sellerOrder?.order?.orderId}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {new Date(payout.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
            {payout.bankAccount && (
              <span className="ml-2 text-gray-400">
                · {payout.bankAccount.bank?.name} ···{" "}
                {payout.bankAccount.accountNumber?.slice(-4)}
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-bold text-gray-900">
            ₦{payout.amount?.toLocaleString()}
          </p>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${meta.bg} ${meta.text}`}
          >
            {meta.label}
          </span>
        </div>
      </div>
    </div>
  );
};

// ── Main page ─────────────────────────────────────────────────────
const PayoutsPage = () => {
  useSellerGuard();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<"eligible" | "history">(
    "eligible",
  );
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    undefined,
  );
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);

  const isDateRangeComplete = !!dateFrom && !!dateTo;

  useEffect(() => {
    setPage(1);
  }, [selectedStatus, dateFrom, dateTo]);

  const historyParams = useMemo<QueryPayoutParams>(
    () => ({
      page,
      size: ITEMS_PER_PAGE,
      status: selectedStatus as any,
      date: isDateRangeComplete ? "custom" : undefined,
      startDate: isDateRangeComplete ? dateFrom : undefined,
      endDate: isDateRangeComplete ? dateTo : undefined,
    }),
    [page, selectedStatus, isDateRangeComplete, dateFrom, dateTo],
  );

  // ── Queries ───────────────────────────────────────────────────────
  const { data: eligibleData, isLoading: isLoadingEligible } = useQuery({
    ...payoutQueries.eligible(),
    select: (res: any) => res.data ?? [],
  });

  const { data: historyData, isLoading: isLoadingHistory } = useQuery({
    ...payoutQueries.history(historyParams),
    enabled: activeTab === "history",
    select: (res: any) => ({
      payouts: res.data ?? [],
      pagination: res.pagination,
    }),
  });

  // ── Summary stats from history ────────────────────────────────────
  const { data: allHistoryData } = useQuery({
    ...payoutQueries.history({ size: 100 }),
    select: (res: any) => res.data ?? [],
  });

  const allHistory = allHistoryData?.data ?? [];
  const eligibleOrders: any[] = eligibleData ?? [];
  const payouts: any[] = historyData?.payouts.data ?? [];
  const pagination = historyData?.payouts?.pagination;

  const stats = useMemo(() => {
    if (!allHistory) return { total: 0, pending: 0, success: 0 };
    return {
      total: allHistory.reduce(
        (s: number, p: any) =>
          p.status === "success" ? s + (p.amount ?? 0) : s,
        0,
      ),
      pending: allHistory.filter((p: any) =>
        ["pending", "processing"].includes(p.status),
      ).length,
      success: allHistory.filter((p: any) => p.status === "success").length,
    };
  }, [allHistory]);

  // ── Mutations ─────────────────────────────────────────────────────
  const { mutate: requestPayout, isPending: isRequesting } = useMutation({
    ...payoutMutations.requestPayout(),
    onSuccess: () => {
      SuccessMessage("Payout initiated successfully!");
      queryClient.invalidateQueries({ queryKey: payoutQueries.all });
    },
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  const handleClearFilters = () => {
    setSelectedStatus(undefined);
    setDateFrom("");
    setDateTo("");
    setPage(1);
  };

  const hasFilters = !!selectedStatus || !!dateFrom || !!dateTo;

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Payouts</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Manage your earnings and payout requests
        </p>
      </div>

      {/* ── Stats cards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-dark-primary text-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <Banknote size={16} className="text-white" />
            </div>
            <p className="text-sm font-medium opacity-80">Total Paid Out</p>
          </div>
          <p className="text-2xl font-bold">₦{stats.total.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock size={16} className="text-yellow-500" />
            </div>
            <p className="text-sm font-medium text-gray-500">Pending Payouts</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle size={16} className="text-green-500" />
            </div>
            <p className="text-sm font-medium text-gray-500">
              Successful Payouts
            </p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.success}</p>
        </div>
      </div>

      {/* ── Tabs ─────────────────────────────────────────────────── */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
        {(["eligible", "history"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "eligible" ? (
              <span className="flex items-center gap-2">
                Eligible Orders
                {eligibleOrders.length > 0 && (
                  <span className="w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {eligibleOrders.length}
                  </span>
                )}
              </span>
            ) : (
              "Payout History"
            )}
          </button>
        ))}
      </div>

      {/* ── Eligible Orders Tab ───────────────────────────────────── */}
      {activeTab === "eligible" && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900">Orders Ready for Payout</h2>
            <p className="text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full">
              3-day hold after delivery
            </p>
          </div>

          {isLoadingEligible ? (
            <div className="flex justify-center py-16">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : eligibleOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                <Wallet size={24} className="text-gray-300" />
              </div>
              <p className="text-gray-500 font-semibold text-sm">
                No orders eligible for payout yet
              </p>
              <p className="text-xs text-gray-400 text-center max-w-xs">
                Orders become eligible 3 days after delivery confirmation. Keep
                fulfilling orders to earn!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {/* Info banner */}
              <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-xl mb-2">
                <AlertCircle
                  size={15}
                  className="text-blue-500 mt-0.5 shrink-0"
                />
                <p className="text-xs text-blue-700">
                  Payouts are sent to your default bank account. Make sure your
                  bank details are up to date in{" "}
                  <a
                    href="/dashboard/settings"
                    className="font-semibold underline"
                  >
                    Settings
                  </a>
                  .
                </p>
              </div>

              {eligibleOrders.map((order: any) => (
                <EligibleOrderCard
                  key={order.id}
                  order={order}
                  isRequesting={isRequesting}
                  onRequest={(id) => requestPayout(id)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── History Tab ───────────────────────────────────────────── */}
      {activeTab === "history" && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          {/* Filters */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-gray-900">Payout History</h2>
            <FilterOnly
              statusText="Status"
              statusOptions={STATUS_OPTIONS}
              selectedStatuses={selectedStatus ? [selectedStatus] : []}
              setSelectedStatuses={(v) => setSelectedStatus(v[0] ?? undefined)}
              dateFrom={dateFrom}
              dateTo={dateTo}
              setDateFrom={setDateFrom}
              setDateTo={setDateTo}
              onClearFilters={handleClearFilters}
            />
          </div>

          {isLoadingHistory ? (
            <div className="flex justify-center py-16">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : payouts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                <Banknote size={24} className="text-gray-300" />
              </div>
              <p className="text-gray-500 font-semibold text-sm">
                {hasFilters
                  ? "No payouts match your filters"
                  : "No payout history yet"}
              </p>
              {hasFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-white bg-primary rounded-full px-4 py-1.5 font-semibold"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div>
                {payouts.map((payout: any) => (
                  <PayoutRow key={payout.id} payout={payout} />
                ))}
              </div>

              {pagination && pagination.totalPages > 1 && (
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <Pagination
                    currentPage={page}
                    totalPages={pagination.totalPages}
                    onPageChange={setPage}
                    totalItems={pagination.totalRecords}
                    itemsPerPage={ITEMS_PER_PAGE}
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

PayoutsPage.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default PayoutsPage;
