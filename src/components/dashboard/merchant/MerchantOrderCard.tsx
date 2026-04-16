"use client";
import React from "react";
import Image from "next/image";
import { Calendar, MapPin, Package, ChevronRight, User } from "lucide-react";
import { MerchantOrder } from "@/types/products";
import { merchantOrderStatusMeta } from "@/data/MerchantOrdersData";
import { useNavigate } from "@/hooks/useNavigate";

interface Props {
  order: MerchantOrder;
}

const MerchantOrderCard: React.FC<Props> = ({ order }) => {
  const { navigate } = useNavigate();
  const meta = merchantOrderStatusMeta[order.status];
  const firstItem = order.items[0];
  const extraCount = order.items.length - 1;

  const formattedDate = new Date(order.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      onClick={() => navigate(`/dashboard/merchant/orders/${order.id}`)}
      className="w-full flex flex-col sm:flex-row items-start gap-4 bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
    >
      {/* Product thumbnail */}
      <div className="relative w-full sm:w-24 h-[30dvh] sm:h-24 shrink-0 rounded-lg overflow-hidden bg-[#d0dad1]">
        <Image
          src="/assets/images/dashboard/buyer/empty_order.png"
          alt={firstItem.productName}
          fill
          className="object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/96x96/f3f4f6/9ca3af?text=IMG";
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 w-full">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              {order.orderNumber}
            </p>
            {/* <p className="font-semibold text-gray-800 text-sm leading-tight mt-0.5">
              {firstItem.productName}
              {extraCount > 0 && (
                <span className="text-gray-400 font-normal">
                  {" "}
                  +{extraCount} more
                </span>
              )}
            </p> */}
          </div>
          {/* Status badge */}
          <span
            className={`inline-flex items-center gap-1.5 shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold ${meta.bg} ${meta.text}`}
          >
            {meta.label}
          </span>
        </div>

        {/* Buyer */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
          <User size={12} className="shrink-0" />
          <span className="font-medium text-gray-700">{order.buyerName}</span>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Package size={11} />
            {order.items.length} {order.items.length === 1 ? "item" : "items"}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={11} />
            {order.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {formattedDate}
          </span>
        </div>

        {/* Bottom row: amount + arrow */}
        <div className="flex items-center justify-between">
          <p className="text-base font-bold text-gray-900">
            ₦{order.totalAmount.toLocaleString("en-NG")}
          </p>
          <ChevronRight
            size={16}
            className="text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default MerchantOrderCard;
