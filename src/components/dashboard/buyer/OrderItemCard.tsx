"use client";
 import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { MoreVertical, X } from "lucide-react"
import { OrderItem, OrderStatus } from "@/types/products"

interface Props {
  item: OrderItem
  orderStatus: OrderStatus
  onRateProduct: (item: OrderItem) => void
  onBuyAgain: () => void
  onTrackOrder: () => void
  onCancelOrder: () => void
}

// per-item status badge derived from order status
const itemStatusLabel: Record<OrderStatus, { label: string; style: string }> = {
  delivered:           { label: "Delivered",          style: "bg-green-100 text-green-700 border border-green-300" },
  shipped:             { label: "Shipped",             style: "bg-blue-100 text-blue-700 border border-blue-300" },
  pending:             { label: "Pending",             style: "bg-yellow-100 text-yellow-700 border border-yellow-300" },
  partially_shipped:   { label: "Partially Shipped",   style: "bg-orange-100 text-orange-600 border border-orange-300" },
  partially_delivered: { label: "Partially Delivered", style: "bg-teal-100 text-teal-700 border border-teal-300" },
  cancelled:           { label: "Cancelled",           style: "bg-red-100 text-red-600 border border-red-300" },
}

export default function OrderItemCard({
  item,
  orderStatus,
  onRateProduct,
  onBuyAgain,
  onTrackOrder,
  onCancelOrder,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const badge = itemStatusLabel[orderStatus]

  return (
    <div className="flex flex-col gap-3 p-4 bg-white h-full">
      <div className="flex gap-4  w-full">
        {/* Image */}
        <div className="w-50 h-40 rounded-xl bg-gray-100 shrink-0 overflow-hidden relative">
          <Image src={item.image} alt={item.title} fill className="object-contai" />
        </div>

        {/* Info + 3-dot */}
        <div className="flex-1 flex justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
            <p className="text-base font-bold text-gray-900">
              ₦{item.price.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">QTY - {item.quantity}</p>
            <p className="text-xs text-gray-500">SKU: {item.sku}</p>
            {/* Status badge */}
            <span className={`mt-1 inline-block self-start px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${badge.style}`}>
              {badge.label}
            </span>
          </div>

          {/* 3-dot menu */}
          <div className="relative shrink-0" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(p => !p)}
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

                {/* delivered */}
                {orderStatus === "delivered" && (
                  <>
                    <button
                      onClick={() => { onRateProduct(item); setMenuOpen(false) }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Rate Product
                    </button>
                    <button
                      onClick={() => { onBuyAgain(); setMenuOpen(false) }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Buy Again
                    </button>
                  </>
                )}

                {/* shipped / partially_shipped / partially_delivered */}
                {(orderStatus === "shipped" || orderStatus === "partially_shipped" || orderStatus === "partially_delivered") && (
                  <button
                    onClick={() => { onTrackOrder(); setMenuOpen(false) }}
                    className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Track Order
                  </button>
                )}

                {/* pending */}
                {orderStatus === "pending" && (
                  <button
                    onClick={() => { onCancelOrder(); setMenuOpen(false) }}
                    className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Cancel Order
                  </button>
                )}

                {/* cancelled */}
                {orderStatus === "cancelled" && (
                  <button
                    onClick={() => { onBuyAgain(); setMenuOpen(false) }}
                    className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Buy Again
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* No longer available */}
      {!item.available && (
        <p className="text-xs font-medium text-red-500">This product is no longer available</p>
      )}
    </div>
  )
}