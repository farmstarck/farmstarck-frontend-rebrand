"use client";

import React from "react";
import { useMemo, useState, useEffect } from "react";
import { WalletMinimal, ShoppingCart } from "lucide-react";
import Pagination from "@/components/common/ui/Pagination";
import TitleHeader from "@/components/dashboard/buyer/TitleHeader";
import SearchInput from "@/components/common/SearchInput";
import { useQuery } from "@tanstack/react-query";
import { walletQueries } from "@/queries/wallet.queries";
import { useDebounce } from "@/hooks/useDebounce";
import {
  TransactionType,
  WalletTransaction,
} from "@/types/prisma-schema-types";
import { Filter } from "lucide-react";
import { QueryTransactionParams, TimeFilterOption } from "@/types";
import DashboardLayout from "@/layouts/DashboardLayout";

const fmt = (n: number) =>
  "₦" +
  n.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const TYPE_OPTIONS = [
  { value: "credit", label: "Credit" },
  { value: "debit", label: "Debit" },
  { value: "refund", label: "Refund" },
];

const DATE_OPTIONS: { value: TimeFilterOption; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "lastweek", label: "Last Week" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
];

const TRANSACTIONS_PER_PAGE = 10;

const TransactionHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined,
  );
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined,
  );
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery, 500);

  const isDateRangeComplete = !!dateFrom && !!dateTo;
  const isMissingEndDate = !!dateFrom && !dateTo;
  const isMissingStartDate = !dateFrom && !!dateTo;

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedType, selectedDate]);

  const params = useMemo((): QueryTransactionParams => {
    const p: QueryTransactionParams = {
      page: currentPage,
      size: TRANSACTIONS_PER_PAGE,
      type: selectedType as TransactionType | undefined,
      date: isDateRangeComplete
        ? "custom"
        : (selectedDate as TimeFilterOption | undefined),
      startDate: isDateRangeComplete ? dateFrom : undefined,
      endDate: isDateRangeComplete ? dateTo : undefined,
    };

    if (debouncedSearch) {
      p.search = debouncedSearch;
    }

    return p;
  }, [
    currentPage,
    selectedType,
    selectedDate,
    isDateRangeComplete,
    dateFrom,
    dateTo,
    debouncedSearch,
  ]);

  const { data, isLoading } = useQuery(walletQueries.transactions(params));

  const transactions = data?.transactions ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalRecords = data?.totalRecords ?? 0;

  const handleClearFilters = () => {
    setSelectedType(undefined);
    setSelectedDate(undefined);
    setDateFrom("");
    setDateTo("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className="lg:max-w-7xl mx-auto px-4">
      <TitleHeader title="Transaction History" />

      <div className="py-4 flex flex-col gap-4 text-dark">
        {/* Search + Filter */}
        <div className="bg-white rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex gap-3">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search transactions by reference"
            />
            <button
              onClick={() => setShowFilters((p) => !p)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={20} />
              <span className="text-sm">Filter</span>
            </button>
          </div>

          {showFilters && (
            <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4 flex flex-col gap-4">
              {/* Type filter */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">Type</p>
                <div className="flex flex-wrap gap-2">
                  {TYPE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        setSelectedType((prev) =>
                          prev === opt.value ? undefined : opt.value,
                        )
                      }
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        selectedType === opt.value
                          ? "bg-primary text-white"
                          : "bg-white border border-gray-200 text-gray-700 hover:border-primary/40"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date quick filter */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">Period</p>
                <div className="flex flex-wrap gap-2">
                  {DATE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        setSelectedDate((prev) =>
                          prev === opt.value ? undefined : opt.value,
                        )
                      }
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        selectedDate === opt.value
                          ? "bg-primary text-white"
                          : "bg-white border border-gray-200 text-gray-700 hover:border-primary/40"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom date range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">
                    From
                  </label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => {
                      setDateFrom(e.target.value);
                      setSelectedDate(undefined);
                    }}
                    className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:border-primary transition-colors ${
                      isMissingStartDate ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                  {isMissingStartDate && (
                    <p className="mt-1 text-xs text-red-500">
                      Please select a start date
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">
                    To
                  </label>
                  <input
                    type="date"
                    value={dateTo}
                    min={dateFrom || undefined}
                    onChange={(e) => {
                      setDateTo(e.target.value);
                      setSelectedDate(undefined);
                    }}
                    className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:border-primary transition-colors ${
                      isMissingEndDate ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                  {isMissingEndDate && (
                    <p className="mt-1 text-xs text-red-500">
                      Please select an end date
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleClearFilters}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Transaction List */}
        <div className="bg-white rounded-2xl py-5">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-gray-200">
              {transactions.map((tx) => {
                const isCredit = tx.type === "credit" || tx.type === "refund";
                return (
                  <li
                    key={tx.id}
                    className="flex px-4 items-center justify-between py-3.5"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${isCredit ? "bg-lite" : "bg-[#ffcccc]"}`}
                      >
                        {isCredit ? (
                          <WalletMinimal size={20} className="text-[#28d028]" />
                        ) : (
                          <ShoppingCart size={20} className="text-red-500" />
                        )}
                      </div>
                      <div>
                        <p
                          className={`text-sm md:text-base font-semibold ${isCredit ? "text-[#28d028]" : "text-red-500"}`}
                        >
                          {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                        </p>
                        <p className="text-sm text-gray-400 leading-tight">
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
                      className={`text-sm md:text-base font-bold shrink-0 ml-3 ${isCredit ? "text-[#28d028]" : "text-red-500"}`}
                    >
                      {isCredit ? "+" : "-"}
                      {fmt(tx.amount)}
                    </p>
                  </li>
                );
              })}

              {transactions.length === 0 && (
                <p className="text-center text-sm text-gray-400 py-10">
                  No transactions found.
                </p>
              )}
            </ul>
          )}

          {totalPages > 1 && (
            <div className="px-4 mt-2">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={totalRecords ?? 0}
                itemsPerPage={TRANSACTIONS_PER_PAGE}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

TransactionHistory.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default TransactionHistory;
