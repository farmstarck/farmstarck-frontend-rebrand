import { useEffect, useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import Image from "next/image";
import OrderCard from "@/components/dashboard/ui/OrderCard";
import Pagination from "@/components/common/ui/Pagination";
import { useNavigate } from "@/hooks/useNavigate";
import { Order, OrderStatus } from "@/types/prisma-schema-types";
import { useQuery } from "@tanstack/react-query";
import { orderQueries } from "@/queries/order.queries";
import { TimeFilterOption } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import SearchInput from "@/components/common/SearchInput";

interface OrdersListPanelProps {
  emptyActionPath?: string;
  emptyActionText?: string;
  orderDetailsBasePath: string;
}

const STATUS_OPTIONS = Object.entries(OrderStatus).map(([key, value]) => ({
  value,
  label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
}));
const ORDERS_PER_PAGE = 5;

const OrdersListPanel = ({
  emptyActionPath = "/market/marketplace",
  emptyActionText = "Start Shopping",
  orderDetailsBasePath,
}: OrdersListPanelProps) => {
  const { navigate } = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | undefined>(
    undefined,
  );
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce the search so we don't fire a request on every keystroke
  const debouncedSearch = useDebounce(searchQuery, 500);

  // ── Date validation ──────────────────────────────────────────────
  const isDateRangeComplete = !!dateFrom && !!dateTo;
  const isMissingEndDate = !!dateFrom && !dateTo;
  const isMissingStartDate = !dateFrom && !!dateTo;

  // ── Query params ─────────────────────────────────────────────────
  const params = useMemo(
    () => ({
      page: currentPage,
      size: ORDERS_PER_PAGE,
      status: selectedStatus,
      date: dateFrom && dateTo ? ("custom" as TimeFilterOption) : undefined,
      startDate: isDateRangeComplete ? new Date(dateFrom) : undefined,
      endDate: isDateRangeComplete ? new Date(dateTo) : undefined,
      search: debouncedSearch || undefined,
    }),
    [
      currentPage,
      selectedStatus,
      isDateRangeComplete,
      dateFrom,
      dateTo,
      debouncedSearch,
    ],
  );
  // ── Query ────────────────────────────────────────────────────────
  const { data, isLoading } = useQuery({
    ...orderQueries.getBuyerOrders(params),
    select: (res) => ({
      orders: res.data as Order[],
      totalPages: res.pagination?.totalPages ?? 1,
    }),
  });

  const orders = data?.orders ?? [];
  const totalPages = data?.totalPages ?? 1;

  // ── Handlers ─────────────────────────────────────────────────────
  const toggleStatus = (status: OrderStatus) => {
    setCurrentPage(1);
    // Clicking the active status deselects it, otherwise select the new one
    setSelectedStatus((prev) => (prev === status ? undefined : status));
  };

  const handleClearFilters = () => {
    setSelectedStatus(undefined);
    setDateFrom("");
    setDateTo("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  // Reset page only when debounced value settles
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const handleDateChange = (field: "from" | "to", value: string) => {
    field === "from" ? setDateFrom(value) : setDateTo(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden relative">
      {/* Search & Filter Toggle */}
      <div className="p-4 lg:p-6 border-gray-200">
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by order number or product"
          />
          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter size={20} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="px-4 lg:px-6 pb-5 border-b border-gray-100">
          <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4 flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((status) => (
                <button
                  key={status.value}
                  type="button"
                  onClick={() => toggleStatus(status.value)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedStatus === status.value
                      ? "bg-primary text-white"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-primary/40"
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  From
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => handleDateChange("from", e.target.value)}
                  className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:border-primary transition-colors ${
                    isMissingStartDate
                      ? "border-red-400 focus:border-red-400"
                      : "border-gray-200"
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
                  onChange={(e) => handleDateChange("to", e.target.value)}
                  className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:border-primary transition-colors ${
                    isMissingEndDate
                      ? "border-red-400 focus:border-red-400"
                      : "border-gray-200"
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
                type="button"
                onClick={handleClearFilters}
                className="text-sm font-medium text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Orders List */}
      {isLoading ? (
        <div className="p-8 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <div className="p-8 lg:p-16 flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 mb-6 relative">
            <Image
              src="/assets/images/dashboard/buyer/empty_order.png"
              alt="No orders"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-gray-600 mb-6 max-w-sm">
            You have not added any order yet, complete your checkout to see
            order here
          </p>
          <button
            type="button"
            onClick={() => navigate(emptyActionPath)}
            className="px-8 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            {emptyActionText}
          </button>
        </div>
      ) : (
        <>
          <div className="p-4 space-y-3">
            {orders.map((order: Order) => (
              <OrderCard
                key={order.id}
                order={order}
                onClick={() => navigate(`${orderDetailsBasePath}/${order.id}`)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="px-4 lg:px-6 border-t border-gray-200">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={orders.length}
                itemsPerPage={ORDERS_PER_PAGE}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrdersListPanel;
