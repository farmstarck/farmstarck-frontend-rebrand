import { useEffect, useState } from "react";
import { Filter, Search } from "lucide-react";
import Image from "next/image";
import OrderCard from "@/components/dashboard/ui/OrderCard";
import Pagination from "@/components/common/ui/Pagination";
import { useNavigate } from "@/hooks/useNavigate";
import { orders } from "@/utils/PageUtils";

interface OrdersListPanelProps {
  emptyActionPath?: string;
  emptyActionText?: string;
  orderDetailsBasePath: string;
}

const statusOptions = [
  { value: "delivered", label: "Delivered" },
  { value: "ready to ship", label: "Ready to Ship" },
  { value: "pending", label: "Pending" },
  { value: "shipped", label: "Shipped" },
  { value: "cancelled", label: "Cancelled" },
];

const OrdersListPanel = ({
  emptyActionPath = "/market/marketplace",
  emptyActionText = "Start Shopping",
  orderDetailsBasePath,
}: OrdersListPanelProps) => {
  const { navigate } = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const handleClearFilters = () => {
    setSelectedStatuses([]);
    setDateFrom("");
    setDateTo("");
    setSearchQuery("");
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((item) => item !== status)
        : [...prev, status],
    );
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatuses, dateFrom, dateTo]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.totalAmount.toString().includes(searchQuery) ||
      order.items.some((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(order.status);

    const matchesDate =
      (!dateFrom || new Date(order.date) >= new Date(dateFrom)) &&
      (!dateTo || new Date(order.date) <= new Date(dateTo));

    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder,
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden relative">
      <div className="p-4 lg:p-6 border-gray-200">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by order number or product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
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

      {showFilters && (
        <div className="px-4 lg:px-6 pb-5 border-b border-gray-100">
          <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4 flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => {
                const isActive = selectedStatuses.includes(status.value);

                return (
                  <button
                    key={status.value}
                    type="button"
                    onClick={() => toggleStatus(status.value)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-white border border-gray-200 text-gray-700 hover:border-primary/40"
                    }`}
                  >
                    {status.label}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  From
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  To
                </label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                />
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

      {currentOrders.length === 0 ? (
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
            {currentOrders.map((order) => (
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
                totalItems={filteredOrders.length}
                itemsPerPage={ordersPerPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrdersListPanel;
