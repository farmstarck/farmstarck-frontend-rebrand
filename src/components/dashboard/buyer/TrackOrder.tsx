"use client";
import ModalLayout from "@/layouts/ModalLayout";
import { Check, Clock, MapPin, PackageCheck, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { orderQueries } from "@/queries/order.queries";
import BaseLoader from "@/Loaders/BaseLoader";

interface TrackOrderItemProps {
  isOpen: boolean;
  itemId: string;
  onClose: () => void;
}

const STEP_COLORS = {
  completed: {
    circle: "bg-primary text-white",
    title: "text-primary",
    line: "border-primary/30",
  },
  pending: {
    circle: "bg-gray-200 text-gray-400",
    title: "text-gray-400",
    line: "border-gray-200",
  },
  skipped: {
    circle: "bg-gray-100 text-gray-300",
    title: "text-gray-300",
    line: "border-gray-100",
  },
  cancelled: {
    circle: "bg-red-100 text-red-500",
    title: "text-red-500",
    line: "border-red-100",
  },
};

const TrackOrderItem = ({ onClose, isOpen, itemId }: TrackOrderItemProps) => {
  const { data, isLoading } = useQuery({
    ...orderQueries.trackOrderItem(itemId),
    enabled: isOpen && !!itemId,
    select: (res: any) => res.data,
  });

  if (!isOpen) return null;

  return (
    <ModalLayout onClose={onClose}>
      <div className="max-w-md mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <MapPin className="text-primary animate-pulse" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900">Track Item</h2>
            {data?.productTitle && (
              <p className="text-sm text-gray-500 truncate capitalize">
                {data.productTitle}
              </p>
            )}
          </div>
        </div>

        {/* Item image + status */}
        {data && (
          <div className="mt-4 flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            {data.productImage && (
              <img
                src={data.productImage}
                alt={data.productTitle}
                className="w-12 h-12 rounded-lg object-cover shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/48x48/f3f4f6/9ca3af?text=IMG";
                }}
              />
            )}
            <div>
              <p className="text-xs text-gray-500">Current Status</p>
              <span
                className={`text-xs font-semibold capitalize px-2 py-0.5 rounded-full ${
                  data.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : data.status === "shipped"
                      ? "bg-blue-100 text-blue-700"
                      : data.status === "ready_to_ship"
                        ? "bg-orange-100 text-orange-600"
                        : data.status === "cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {data.status?.replace(/_/g, " ")}
              </span>
            </div>
          </div>
        )}

        <hr className="my-5" />

        {/* Timeline */}
        {isLoading ? (
          <BaseLoader />
        ) : (
          <div className="space-y-8">
            {data?.timeline.map((step: any, index: number, arr: any[]) => {
              const isLast = index === arr.length - 1;
              const colors =
                STEP_COLORS[step.status as keyof typeof STEP_COLORS] ??
                STEP_COLORS.pending;

              return (
                <div key={step.step} className="relative pl-10">
                  {!isLast && (
                    <div
                      className={`absolute left-3 top-7 w-[2px] h-full border border-dashed ${colors.line}`}
                    />
                  )}
                  <div
                    className={`absolute left-0 w-6 h-6 flex items-center justify-center rounded-full ${colors.circle}`}
                  >
                    {step.status === "cancelled" ? (
                      <X size={12} />
                    ) : isLast ? (
                      <PackageCheck size={14} />
                    ) : (
                      <Check size={14} />
                    )}
                  </div>
                  <h3 className={`font-semibold text-sm ${colors.title}`}>
                    {step.step}
                  </h3>
                  {step.timestamp ? (
                    <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
                      <Clock size={12} />
                      <span>
                        {new Date(step.timestamp).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        {new Date(step.timestamp).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  ) : (
                    step.status === "pending" && (
                      <p className="text-xs text-gray-400 mt-1">
                        Awaiting update
                      </p>
                    )
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/contact"
            className="text-center text-sm text-gray-500 block"
          >
            Have a problem?{" "}
            <span className="text-primary font-medium cursor-pointer">
              Contact us
            </span>
          </Link>
        </div>
      </div>
    </ModalLayout>
  );
};

export default TrackOrderItem;
