"use client";
import React, { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { orderQueries } from "@/queries/order.queries";
import { useDebounce } from "@/hooks/useDebounce";
import SearchAndFilter from "@/components/common/ui/SearchAndFilter";
import Pagination from "@/components/common/ui/Pagination";
import MerchantOrderCard from "@/components/dashboard/merchant/MerchantOrderCard";
import Image from "next/image";
import { OrderStatus } from "@/types/prisma-schema-types";
import { useSellerGuard } from "@/hooks/useSellerGuard";
import DashboardLayout from "@/layouts/DashboardLayout";

const ITEMS_PER_PAGE = 10;

const statusFilterOptions = Object.entries(OrderStatus).map(([key, value]) => ({
  value,
  label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
}));

const ManageOrders = () => {
  useSellerGuard();

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    undefined,
  );
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedStatus, dateFrom, dateTo]);

  const isDateRangeComplete = !!dateFrom && !!dateTo;

  const params = useMemo(
    () => ({
      page,
      size: ITEMS_PER_PAGE,
      status: selectedStatus as OrderStatus | undefined,
      date: isDateRangeComplete ? ("custom" as const) : undefined,
      startDate: isDateRangeComplete ? dateFrom : undefined,
      endDate: isDateRangeComplete ? dateTo : undefined,
    }),
    [page, selectedStatus, isDateRangeComplete, dateFrom, dateTo],
  );

  const { data, isLoading } = useQuery({
    ...orderQueries.getSellerOrders(params),
    select: (res: any) => ({
      orders: res.data,
      totalPages: res.pagination?.totalPages ?? 1,
      totalRecords: res.pagination?.totalRecords ?? 0,
    }),
  });

  const orders = data?.orders.data ?? [];
  const totalPages = data?.orders.pagination.totalPages ?? 1;
  const totalRecords = data?.orders.pagination.totalRecords ?? 0;

  const handleClear = () => {
    setSelectedStatus(undefined);
    setDateFrom("");
    setDateTo("");
    setSearch("");
    setPage(1);
  };

  return (
    <div className="w-full pb-10">
      <h1 className="text-xl font-bold mb-5">Manage Orders</h1>

      <div className="w-full bg-white rounded-xl min-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <SearchAndFilter
            search={search}
            onSearchChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            searchPlaceholder="Search by order # or buyer name…"
            statusText="Status"
            statusOptions={statusFilterOptions}
            selectedStatuses={selectedStatus ? [selectedStatus] : []}
            setSelectedStatuses={(v) => setSelectedStatus(v[0] ?? undefined)}
            dateFrom={dateFrom}
            dateTo={dateTo}
            setDateFrom={(v) => {
              setDateFrom(v);
              setPage(1);
            }}
            setDateTo={(v) => {
              setDateTo(v);
              setPage(1);
            }}
            onClearFilters={handleClear}
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
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
              {search || selectedStatus || dateFrom || dateTo
                ? "No orders match your current filters."
                : "You have not received any orders yet."}
            </p>
            {(search || selectedStatus || dateFrom || dateTo) && (
              <button
                onClick={handleClear}
                className="text-sm text-white rounded-full font-semibold px-4 py-1.5 bg-primary"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="p-4 flex flex-col gap-3">
            {orders.map((order: any) => (
              <MerchantOrderCard
                key={order.id}
                order={order}
                basePath="/dashboard/manage-orders"
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="px-4 border-t border-gray-100">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalItems={totalRecords}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </div>
        )}
      </div>
    </div>
  );
};

ManageOrders.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default ManageOrders;
