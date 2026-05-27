"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { ChevronLeft } from "lucide-react";
import BaseLoader from "@/Loaders/BaseLoader";
import { useNavigate } from "@/hooks/useNavigate";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderMutations, orderQueries } from "@/queries/order.queries";
import { OrderItem, OrderItemStatus } from "@/types/prisma-schema-types";
import {
  ErrorMessage,
  SuccessMessage,
  getStatusColor,
} from "@/utils/PageUtils";
import { renderAxiosOrAuthError } from "@/lib/axios-client";

// ── Valid transitions per item status ────────────────────────────

const NEXT_STATUSES: Partial<
  Record<string, { value: string; label: string }[]>
> = {
  pending: [
    { value: "ready_to_ship", label: "Mark Ready to Ship" },
    { value: "out_of_stock", label: "Mark as Out of Stock" },
    { value: "cancelled", label: "Cancel Item" },
  ],
  ready_to_ship: [{ value: "cancelled", label: "Cancel Item" }],
};

const ITEM_STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  ready_to_ship: "bg-orange-100 text-orange-600",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
  out_of_stock: "bg-teal-100 text-teal-700",
};

const SellerItemRow = ({
  item,
  onUpdate,
  isUpdating,
}: {
  item: OrderItem;
  onUpdate: (itemId: string, status: string) => void;
  isUpdating: boolean;
}) => {
  const [selected, setSelected] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const options = NEXT_STATUSES[item.status] ?? [];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  const selectedLabel = options.find((o) => o.value === selected)?.label;

  const OPTION_STYLES: Record<string, string> = {
    ready_to_ship: "text-orange-600",
    shipped: "text-blue-600",
    delivered: "text-green-600",
    cancelled: "text-red-500",
  };

  return (
    <div className="flex flex-col gap-3 p-4 border-b border-gray-100 last:border-0">
      <div className="flex gap-4">
        {/* Image */}
        <div className="w-20 h-20 rounded-xl bg-gray-100 shrink-0 overflow-hidden">
          {item.productImage && (
            <img
              src={item.productImage}
              alt={item.productTitle}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/80x80/f3f4f6/9ca3af?text=IMG";
              }}
            />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm capitalize truncate">
            {item.productTitle}
          </p>
          <p className="text-sm font-bold text-gray-900">
            ₦{item.price.toLocaleString()} × {item.quantity}
          </p>
          <p className="text-xs text-gray-500">SKU: {item.productSku}</p>
          <p className="text-xs font-semibold text-gray-700">
            Subtotal: ₦{(item.price * item.quantity).toLocaleString()}
          </p>
          <span
            className={`mt-1 self-start px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${
              ITEM_STATUS_COLORS[item.status] ?? "bg-gray-100 text-gray-500"
            }`}
          >
            {item.status.replace(/_/g, " ")}
          </span>
        </div>
      </div>

      {/* Action */}
      {options.length > 0 ? (
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          {/* Custom dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen((p) => !p)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors whitespace-nowrap ${
                selected
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
              }`}
            >
              <span>{selectedLabel ?? "Update status"}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-[9999]">
                {options.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => {
                      setSelected(o.value);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                      OPTION_STYLES[o.value] ?? "text-gray-700"
                    } ${selected === o.value ? "bg-gray-50" : ""}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        o.value === "ready_to_ship"
                          ? "bg-orange-400"
                          : o.value === "shipped"
                            ? "bg-blue-400"
                            : o.value === "delivered"
                              ? "bg-green-500"
                              : o.value === "cancelled"
                                ? "bg-red-400"
                                : "bg-gray-300"
                      }`}
                    />
                    {o.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Apply button */}
          <button
            disabled={!selected || isUpdating}
            onClick={() => {
              if (selected) {
                onUpdate(item.id, selected);
                setSelected("");
              }
            }}
            className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 disabled:opacity-40 transition-opacity whitespace-nowrap"
          >
            {isUpdating ? "Updating..." : "Apply"}
          </button>
        </div>
      ) : (
        <p className="text-xs text-gray-600 italic pt-2 border-t border-gray-100">
          {item.status === "delivered"
            ? "Delivered — no further actions"
            : item.status === "cancelled"
              ? "Item cancelled"
              : item.status === "out_of_stock"
                ? "Out of stock — contact support"
                : item.status === "shipped"
                  ? "Shipped — awaiting delivery confirmation by Admin"
                  : item.status === "ready_to_ship"
                    ? "Ready to ship — awaiting pickup"
                    : "No actions available"}
        </p>
      )}

      {!item.productId && (
        <p className="text-xs font-medium text-red-500">
          This product is no longer available
        </p>
      )}
    </div>
  );
};

// ── Seller order response shape ───────────────────────────────────
interface SellerOrderResponse {
  data: {
    items: OrderItem[];
    status: string;
    subTotal?: number;
    commission?: number;
    sellerEarning?: number;
    paidOut?: boolean;
    eligibleForPayout?: boolean;
    eligibleAt?: string;
    createdAt?: string;
    order?: {
      orderId?: string;
      buyer?: { fullName?: string; email?: string };
      address?: {
        street?: string;
        city?: string;
        state?: string;
        phoneNumber?: string;
      };
      createdAt?: string;
      shippingMethod?: string;
    };
  };
}

// ── Main component ────────────────────────────────────────────────
interface Props {
  backHref: string;
}

const SellerOrderDetails: React.FC<Props> = ({ backHref }) => {
  const { navigate } = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id: orderId } = router.query;

  const { data: orderData, isLoading } = useQuery({
    ...orderQueries.getSellerOrderById(orderId as string),
    select: (res: unknown) => res as SellerOrderResponse,
    enabled: !!orderId && router.isReady,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: orderQueries.all });

  const { mutate: updateItemStatus, isPending: isUpdating } = useMutation({
    ...orderMutations.updateOrderItemStatus(),
    onSuccess: () => {
      SuccessMessage("Item status updated");
      invalidate();
    },
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  if (isLoading || !router.isReady) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <BaseLoader />
      </div>
    );
  }
  const order = orderData?.data;

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center text-gray-500">
        Order not found.
      </div>
    );
  }

  const items: OrderItem[] = order.items ?? [];
  const buyer = order.order?.buyer;
  const address = order.order?.address;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(backHref)}
          className="flex rounded-md border items-center p-1.5 text-dark hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize ${getStatusColor(order.status)}`}
        >
          {order.status.replace(/_/g, " ")}
        </span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm ">
        {/* Meta */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">Order Details</h1>
            <p className="text-xs text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full">
              Update each item individually below
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Order ID</p>
              <p className="font-semibold text-gray-900">
                #{order.order?.orderId}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Items</p>
              <p className="font-semibold text-gray-900">{items.length}</p>
            </div>
            <div>
              <p className="text-gray-500">Date</p>
              <p className="font-semibold text-gray-900">
                {new Date(
                  order.order?.createdAt ?? order.createdAt ?? "",
                ).toLocaleDateString()}
              </p>
            </div>
            {order.order?.shippingMethod && (
              <div>
                <p className="text-gray-500">Shipping</p>
                <p className="font-semibold text-gray-900 capitalize">
                  {order.order.shippingMethod.replace(/_/g, " ")}
                </p>
              </div>
            )}
            {buyer && (
              <>
                <div>
                  <p className="text-gray-500">Buyer</p>
                  <p className="font-semibold text-gray-900 capitalize">
                    {buyer.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Buyer Email</p>
                  <p className="font-semibold text-gray-900">{buyer.email}</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Items */}
        <div className="p-6">
          <div className="border border-gray-200 rounded-xl">
            <h2 className="font-bold text-gray-900 py-3 px-6 border-b border-gray-200 text-sm uppercase tracking-wide">
              Order Items — Update Status Per Item
            </h2>
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <SellerItemRow
                  key={item.id}
                  item={item}
                  isUpdating={isUpdating}
                  onUpdate={(itemId, status) =>
                    updateItemStatus({ orderItemId: itemId, status })
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* Earnings */}
        <div className="p-6 border-t border-gray-100">
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <h2 className="font-bold text-gray-900 px-6 py-3 border-b border-gray-200 text-sm uppercase tracking-wide">
              Earnings Summary
            </h2>
            <div className="px-6 py-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <p className="text-gray-500">Subtotal</p>
                <p className="font-semibold">
                  ₦{order.subTotal?.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Platform Commission</p>
                <p className="font-semibold text-red-500">
                  {order.status === "cancelled"
                    ? "N/A"
                    : `- ₦${order.commission?.toLocaleString()}`}
                </p>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-3">
                <p className="font-bold text-gray-900">Your Earnings</p>
                <p className="font-bold text-primary text-base">
                  ₦{order.sellerEarning?.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500">Payout Status</p>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    order.paidOut
                      ? "bg-green-100 text-green-700"
                      : order.eligibleForPayout
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.paidOut
                    ? "Paid Out"
                    : order.eligibleForPayout
                      ? "Eligible for Payout"
                      : "Pending Payout"}
                </span>
              </div>
              {order.eligibleAt && !order.paidOut && (
                <p className="text-xs text-gray-400">
                  Eligible from:{" "}
                  {new Date(order.eligibleAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Delivery */}
        {/* {address && (
          <div className="p-6 border-t border-gray-100">
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <h2 className="font-bold text-gray-900 px-6 py-3 border-b border-gray-200 text-sm uppercase tracking-wide">
                Delivery Information
              </h2>
              <div className="space-y-3 text-sm px-6 py-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-0.5">Address</p>
                  <p className="text-gray-500 capitalize">
                    {address.street}, {address.city}, {address.state}
                  </p>
                </div>
                {address.phoneNumber && (
                  <div>
                    <p className="font-semibold text-gray-900 mb-0.5">
                      Recipient Phone
                    </p>
                    <p className="text-gray-500">{address.phoneNumber}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default SellerOrderDetails;
