"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MoreVertical, X } from "lucide-react";
import {
  OrderItem,
  OrderItemStatus,
  OrderStatus,
} from "@/types/prisma-schema-types";
import { useBuyAgain } from "@/hooks/useBuyAgain";

interface Props {
  item: OrderItem;
  OrderItemStatus: OrderItemStatus;
  onRateProduct: (item: OrderItem) => void;
  onTrackOrder: (itemId: string) => void; // ← now receives itemId
  onCancelOrder: () => void;
  onCancelOrderItem: (itemId: string) => void;
  isCancellingItem?: boolean;
}

// per-item status badge derived from order status
const itemStatusLabel: Record<
  OrderItemStatus,
  { label: string; style: string }
> = {
  delivered: {
    label: "Delivered",
    style: "bg-green-100 text-green-700 border border-green-300",
  },
  shipped: {
    label: "Shipped",
    style: "bg-blue-100 text-blue-700 border border-blue-300",
  },
  pending: {
    label: "Pending",
    style: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  },
  ready_to_ship: {
    label: "Ready To Ship",
    style: "bg-orange-100 text-orange-600 border border-orange-300",
  },
  out_of_stock: {
    label: "Out of Stock",
    style: "bg-teal-100 text-teal-700 border border-teal-300",
  },
  cancelled: {
    label: "Cancelled",
    style: "bg-red-100 text-red-600 border border-red-300",
  },
};

export default function OrderItemCard({
  item,
  OrderItemStatus,
  onRateProduct,
  onTrackOrder,
  onCancelOrder,
  onCancelOrderItem,
  isCancellingItem,
}: Props) {
  const { buyAgain } = useBuyAgain();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const badge = itemStatusLabel[item.status];

  return (
    <div className="flex flex-col gap-3 p-4 bg-white h-full">
      <div className="flex gap-4  w-full">
        {/* Image */}
        <div className="w-50 h-40 rounded-xl bg-gray-100 shrink-0 overflow-hidden relative">
          <Image
            src={item.productImage || ""}
            alt={item.productTitle ?? "No Image"}
            fill
            className="object-contain"
          />
        </div>

        {/* Info + 3-dot */}
        <div className="flex-1 flex justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <p className="font-semibold text-gray-900 text-sm capitalize">
              {item.productTitle}
            </p>
            <p className="text-base font-bold text-gray-900">
              ₦{item.price.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">QTY - {item.quantity}</p>
            <p className="text-xs text-gray-500">SKU: {item.productSku}</p>
            {/* Status badge */}
            <span
              className={`mt-1 inline-block self-start px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${badge.style}`}
            >
              {badge.label}
            </span>
          </div>

          {/* 3-dot menu */}
          <div className="relative shrink-0" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <MoreVertical size={16} className="text-gray-400" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-8 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                <div className="w-fit ml-auto px-3">
                  <button onClick={() => setMenuOpen(false)}>
                    <X size={16} className="text-gray-700" />
                  </button>
                </div>

                {/* Rate product — only if THIS item is delivered */}
                {item.status === "delivered" && (
                  <>
                    <button
                      onClick={() => {
                        onRateProduct(item);
                        setMenuOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Rate Product
                    </button>
                    <button
                      onClick={() => {
                        buyAgain(item);
                        setMenuOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Buy Again
                    </button>
                  </>
                )}

                {item.status === "cancelled" && (
                  <button
                    onClick={() => {
                      buyAgain(item);
                      setMenuOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Buy Again
                  </button>
                )}

                {/* Track — only if THIS item is shipped or ready_to_ship */}
                {(item.status === "shipped" ||
                  item.status === "ready_to_ship") && (
                  <button
                    onClick={() => {
                      onTrackOrder(item.id);
                      setMenuOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Track Item
                  </button>
                )}

                {/* Cancel — only if THIS item is still pending or ready_to_ship */}
                {(item.status === "pending" ||
                  item.status === "ready_to_ship") && (
                  <button
                    onClick={() => {
                      onCancelOrderItem(item.id);
                      setMenuOpen(false);
                    }}
                    disabled={isCancellingItem}
                    className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    {isCancellingItem ? "Cancelling..." : "Cancel Item"}
                  </button>
                )}

                {/* No actions available */}
                {![
                  "delivered",
                  "shipped",
                  "ready_to_ship",
                  "pending",
                  "cancelled",
                ].includes(item.status) && (
                  <p className="px-4 py-2.5 text-xs text-gray-400 italic">
                    No actions available
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* No longer available */}
      {!item.productId && (
        <p className="text-xs font-medium text-red-500">
          This product is no longer available
        </p>
      )}
    </div>
  );
}
