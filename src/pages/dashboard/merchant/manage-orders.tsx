"use client";

import React, { useState, useMemo } from "react";
import { MerchantOrders, merchantOrderStatusMeta } from "@/data/MerchantOrdersData";
import { MerchantOrderStatus } from "@/types/products";
import MerchantOrderCard from "@/components/dashboard/merchant/MerchantOrderCard";
import SearchAndFilter from "@/components/common/ui/SearchAndFilter";
import Pagination from "@/components/common/ui/Pagination";
import { FilterOption } from "@/components/dashboard/buyer/ReusableFilter";
import Image from "next/image";

const ITEMS_PER_PAGE = 5;

const statusFilterOptions: FilterOption[] = [
  { value: "pending",    label: "Pending" },
  { value: "confirmed",  label: "Confirmed" },
  { value: "processing", label: "Processing" },
  { value: "shipped",    label: "Shipped" },
  { value: "delivered",  label: "Delivered" },
  { value: "cancelled",  label: "Cancelled" },
];

// /** Summary counts for the tab strip at the top */
// const TABS: { label: string; value: MerchantOrderStatus | "all" }[] = [
//   { label: "All",        value: "all" },
//   { label: "Pending",    value: "pending" },
//   { label: "Confirmed",  value: "confirmed" },
//   { label: "Processing", value: "processing" },
//   { label: "Shipped",    value: "shipped" },
//   { label: "Delivered",  value: "delivered" },
//   { label: "Cancelled",  value: "cancelled" },
// ];

const ManageOrders: React.FC = () => {
  const [search, setSearch]                     = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [activeTab, setActiveTab]   = useState<MerchantOrderStatus | "all">("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return MerchantOrders.filter((order) => {
      const q = search.toLowerCase();
      const matchSearch =
        order.orderNumber.toLowerCase().includes(q) ||
        order.buyerName.toLowerCase().includes(q) ||
        order.buyerPhone.includes(q) ||
        order.items.some((i) => i.productName.toLowerCase().includes(q));

      const matchStatus =
        selectedStatuses.length === 0 || selectedStatuses.includes(order.status);

      const matchTab = activeTab === "all" || order.status === activeTab;

      const matchDateFrom = !dateFrom || new Date(order.date) >= new Date(dateFrom);
      const matchDateTo   = !dateTo   || new Date(order.date) <= new Date(dateTo);

      return matchSearch && matchStatus && matchTab && matchDateFrom && matchDateTo;
    });
  }, [search, selectedStatuses, activeTab, dateFrom, dateTo]);

  const totalPages   = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated    = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleSearchChange = (val: string) => { setSearch(val); setPage(1); };
  const handleTabChange    = (tab: MerchantOrderStatus | "all") => {
    setActiveTab(tab); setPage(1); setSelectedStatuses([]);
  };
  const handleClear = () => {
    setSelectedStatuses([]); setDateFrom(""); setDateTo(""); setPage(1);
  };

  return (
    <div className="w-full pb-10">
      {/* Page title */}
      <h1 className="text-xl font-bold mb-5">Manage Orders</h1>

      <div className="w-full bg-white rounded-xl min-h-[80vh] overflow-hidden">
        {/* ── Summary strip ── */}
        {/* <div className="px-4 pt-4 pb-0 border-b border-gray-100">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => {
              const count =
                tab.value === "all"
                  ? MerchantOrders.length
                  : MerchantOrders.filter((o) => o.status === tab.value).length;
              const isActive = activeTab === tab.value;
              const dotColor =
                tab.value !== "all"
                  ? merchantOrderStatusMeta[tab.value as MerchantOrderStatus].dot
                  : "bg-gray-400";

              return (
                <button
                  key={tab.value}
                  onClick={() => handleTabChange(tab.value)}
                  className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.value !== "all" && (
                    <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                  )}
                  {tab.label}
                  <span
                    className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div> */}

        {/* ── Search + Filter ── */}
        <div className="p-4 border-b border-gray-100">
          <SearchAndFilter
            search={search}
            onSearchChange={handleSearchChange}
            searchPlaceholder="Search by order #, buyer name, or product…"
            statusText="Status"
            statusOptions={statusFilterOptions}
            selectedStatuses={selectedStatuses}
            setSelectedStatuses={(v) => { setSelectedStatuses(v); setPage(1); }}
            dateFrom={dateFrom}
            dateTo={dateTo}
            setDateFrom={(v) => { setDateFrom(v); setPage(1); }}
            setDateTo={(v) => { setDateTo(v); setPage(1); }}
            onClearFilters={handleClear}
          />
        </div>

        {/* ── Orders list or empty state ── */}
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center px-4">
            <div className="w-44 h-44 relative">
              <Image
                src="/assets/images/dashboard/buyer/empty_order.png"
                alt="No orders"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-gray-500 font-semibold max-w-xs">
              {search || selectedStatuses.length || dateFrom || dateTo
                ? "No orders match your current filters."
                : "You have not received any order requests yet. They will appear here when buyers place orders."}
            </p>
            {(search || selectedStatuses.length > 0 || dateFrom || dateTo) && (
              <button
                onClick={handleClear}
                className="text-sm text-primary font-semibold hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="p-4 flex flex-col gap-3">
            {paginated.map((order) => (
              <MerchantOrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        {filtered.length > ITEMS_PER_PAGE && (
          <div className="px-4 border-t border-gray-100">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalItems={filtered.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;