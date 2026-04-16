"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  ChevronLeft,
  AlignJustify,
  Package,
  Check,
} from "lucide-react";
import { MerchantOrder, MerchantOrderItem, MerchantOrderStatus } from "@/types/products";
import {
  MerchantOrders,
  merchantOrderStatusMeta,
} from "@/data/MerchantOrdersData";
import { fmt, MARK_ALL_STATUSES } from "@/utils/merchantHelpers";
import OrderItemRow, { RadioGroup } from "@/components/dashboard/merchant/OrderItemRow";
import ApiLoader from "@/components/common/ui/ApiLoader";
import ModalLayout from "@/layouts/ModalLayout";
import Image from "next/image";





// ─────────────────────────────────────────────
// InfoRow
// ─────────────────────────────────────────────
const InfoRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
    <span className="text-sm text-gray-500 font-medium">{label}</span>
    <span className="text-sm font-semibold text-gray-800 text-right max-w-[60%]">{value}</span>
  </div>
);





// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────
const SingleOrderPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [order, setOrder] = useState<MerchantOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false)

  // "Mark all as" hamburger menu
  const [menuOpen, setMenuOpen] = useState(false);
  const [markAllSelected, setMarkAllSelected] = useState<MerchantOrderStatus>("pending");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      const found = MerchantOrders.find((o) => o.id === id);
      setOrder(found ?? null);
      if (found) setMarkAllSelected(found.status);
      setLoading(false);
    }
  }, [id]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Apply "Mark all as" ──
  const handleMarkAllUpdate = () => {
    setLoading(true)
    setOrder((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        status: markAllSelected,
        items: prev.items.map((it) => ({ ...it, itemStatus: markAllSelected })),
      };
    });
    setMenuOpen(false);

    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true)
    }, 1000);
  };

  // ── Apply single item status update ──
  const handleUpdateItem = (item: MerchantOrderItem, next: MerchantOrderStatus) => {
    setLoading(true);
    setOrder((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        items: prev.items.map((it) =>
          it.productId === item.productId ? { ...it, itemStatus: next } : it
        ),
      };
    });
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true)
    }, 1000);
  };

  if (loading) {
    return (
      <ApiLoader loading={loading} />
    );
  }


  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-center px-4">
        <Package size={40} className="text-gray-300" />
        <p className="text-gray-500 font-semibold">Order not found.</p>
        <button
          onClick={() => router.back()}
          className="text-sm text-primary font-semibold hover:underline"
        >
          ← Back to orders
        </button>
      </div>
    );
  }

  const meta = merchantOrderStatusMeta[order.status];

  return (
    <>
      <div className="w-full max-w-6xl pb-12 mx-auto">
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
              Order Details
            </h1>
          </div>

          {/* Hamburger → "Mark all as" */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => {
                setMarkAllSelected(order.status);
                setMenuOpen((p) => !p);
              }}
              className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <AlignJustify size={18} className="text-gray-700" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-11 z-30 bg-white rounded-2xl shadow-2xl border border-gray-100 w-56 overflow-hidden">
                <RadioGroup
                  title="Mark all as"
                  statuses={MARK_ALL_STATUSES}
                  onClose={() => setMenuOpen(false)}
                  selectedValue={markAllSelected}
                  onChange={setMarkAllSelected}
                  onAction={handleMarkAllUpdate}
                />

              </div>
            )}
          </div>
        </div>

        {/* ── Order summary card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm mb-4">
          <InfoRow label="Order ID:" value={order.orderNumber} />
          <InfoRow label="Items:" value={order.items.length} />
          <InfoRow label="Total:" value={fmt(order.totalAmount)} />
          <InfoRow label="Commission:" value={fmt(order.serviceCharge < 0 ? 0 : order.serviceCharge)} />
          <InfoRow label="Your Earning:" value={fmt(order.totalAmount - (order.serviceCharge > 0 ? order.serviceCharge : 0))} />
          <InfoRow label="Date:" value={new Date(order.date).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "-")} />
          <InfoRow
            label="Status:"
            value={
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${meta.bg} ${meta.text}`}>
                {meta.label}
              </span>
            }
          />
        </div>

        {/* ── Items in your order ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
            Items in your order
          </p>
          <div className="flex flex-col gap-3">
            {order.items.map((item) => (
              <OrderItemRow
                key={item.productId}
                item={item}
                onUpdateItem={handleUpdateItem}
              />
            ))}
          </div>
        </div>


        {showSuccess &&
          <ModalLayout onClose={() => setShowSuccess(false)} >
            <div className="w-full max-w-md mx-auto py-5 " >
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex justify-center mb-4">
                  <div className="">
                    <Image width={100} height={100} src="/assets/images/status/success.png" alt="success img" />
                  </div>
                </div>
                <h2 className="text-lg font-bold text-gray-900">Status updated successfully</h2>
                <button onClick={() => setShowSuccess(false)} className="bg-primary text-white px-4 py-1.5 rounded-full">Close</button>
              </div>
            </div>
          </ModalLayout>
        }
      </div>
    </>
  );
};

export default SingleOrderPage;
