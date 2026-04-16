"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  ChevronLeft,
  MoreVertical,
  CheckCircle,
  Loader2,
  X,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Package,
  CreditCard,
  User,
  Truck,
  AlertTriangle,
} from "lucide-react";
import { MerchantOrder, MerchantOrderItem, MerchantOrderStatus } from "@/types/products";
import {
  MerchantOrders,
  merchantOrderStatusMeta,
} from "@/data/MerchantOrdersData";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const fmt = (n: number) => `₦${n.toLocaleString("en-NG")}`;

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

/** What actions a merchant can take depending on the current order status */
const orderActions: Record<
  MerchantOrderStatus,
  { label: string; next: MerchantOrderStatus; color: string; icon: React.ElementType }[]
> = {
  pending: [
    { label: "Confirm Order",     next: "confirmed",  color: "text-blue-600",   icon: CheckCircle },
    { label: "Cancel Order",      next: "cancelled",  color: "text-red-500",    icon: AlertTriangle },
  ],
  confirmed: [
    { label: "Mark as Processing", next: "processing", color: "text-orange-600", icon: Loader2 },
    { label: "Cancel Order",       next: "cancelled",  color: "text-red-500",    icon: AlertTriangle },
  ],
  processing: [
    { label: "Mark as Shipped",    next: "shipped",    color: "text-indigo-600", icon: Truck },
    { label: "Cancel Order",       next: "cancelled",  color: "text-red-500",    icon: AlertTriangle },
  ],
  shipped: [
    { label: "Mark as Delivered",  next: "delivered",  color: "text-green-600",  icon: CheckCircle },
  ],
  delivered: [],
  cancelled: [],
};

/** Same for individual items */
const itemActions: Record<
  MerchantOrderStatus,
  { label: string; next: MerchantOrderStatus; color: string }[]
> = {
  pending:    [
    { label: "Confirm Item",     next: "confirmed",  color: "text-blue-600" },
    { label: "Cancel Item",      next: "cancelled",  color: "text-red-500"  },
  ],
  confirmed:  [
    { label: "Mark Processing",  next: "processing", color: "text-orange-600" },
    { label: "Cancel Item",      next: "cancelled",  color: "text-red-500"  },
  ],
  processing: [
    { label: "Mark Shipped",     next: "shipped",    color: "text-indigo-600" },
  ],
  shipped:    [
    { label: "Mark Delivered",   next: "delivered",  color: "text-green-600" },
  ],
  delivered:  [],
  cancelled:  [],
};

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────
const InfoRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
    <span className="text-xs text-gray-500 font-medium">{label}</span>
    <span className="text-xs font-semibold text-gray-800 text-right max-w-[60%]">{value}</span>
  </div>
);

const SectionCard: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({
  title,
  icon: Icon,
  children,
}) => (
  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
    <div className="flex items-center gap-2 mb-3">
      <Icon size={15} className="text-primary" />
      <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">{title}</h3>
    </div>
    {children}
  </div>
);

// ─────────────────────────────────────────────
// Status update modal
// ─────────────────────────────────────────────
type ModalScreen = "confirm" | "loading" | "success";

interface StatusModalProps {
  actionLabel: string;
  nextStatus: MerchantOrderStatus;
  onConfirm: () => void;
  onClose: () => void;
  screen: ModalScreen;
}

const StatusModal: React.FC<StatusModalProps> = ({
  actionLabel,
  nextStatus,
  onConfirm,
  onClose,
  screen,
}) => {
  const meta = merchantOrderStatusMeta[nextStatus];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={screen === "loading" ? undefined : onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {screen === "confirm" && (
          <>
            <div className="flex flex-col items-center text-center gap-3 mb-6">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${meta.bg}`}
              >
                <Package size={26} className={meta.text} />
              </div>
              <h2 className="text-base font-bold text-gray-900">{actionLabel}?</h2>
              <p className="text-sm text-gray-500">
                This will update the order status to{" "}
                <span className={`font-semibold ${meta.text}`}>{meta.label}</span>. This
                action will notify the buyer.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Yes, {actionLabel}
              </button>
            </div>
          </>
        )}

        {screen === "loading" && (
          <div className="flex flex-col items-center gap-4 py-6">
            <Loader2 size={36} className="animate-spin text-primary" />
            <p className="text-sm font-semibold text-gray-600">Updating order status…</p>
          </div>
        )}

        {screen === "success" && (
          <div className="flex flex-col items-center text-center gap-4 py-4">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle size={32} className="text-green-500" />
            </div>
            <h2 className="text-base font-bold text-gray-900">Status Updated!</h2>
            <p className="text-sm text-gray-500">
              The order is now marked as{" "}
              <span className={`font-semibold ${meta.text}`}>{meta.label}</span>.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors mt-2"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Item card with its own status + 3-dot menu
// ─────────────────────────────────────────────
interface ItemCardProps {
  item: MerchantOrderItem;
  onUpdateItem: (item: MerchantOrderItem, next: MerchantOrderStatus, label: string) => void;
}

const OrderItemRow: React.FC<ItemCardProps> = ({ item, onUpdateItem }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const meta = merchantOrderStatusMeta[item.itemStatus];
  const actions = itemActions[item.itemStatus];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex gap-3 items-start p-3 bg-gray-50 rounded-xl border border-gray-100">
      {/* Image */}
      <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-200">
        <Image
          src={item.imageUrl}
          alt={item.productName}
          fill
          className="object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/64x64/f3f4f6/9ca3af?text=IMG";
          }}
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{item.productName}</p>
        <p className="text-xs text-gray-500 mt-0.5">SKU: {item.sku}</p>
        <p className="text-xs text-gray-500">
          {item.countType && <span className="capitalize">{item.countType} · </span>}
          Qty: {item.quantity}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${meta.bg} ${meta.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
            {meta.label}
          </span>
          <p className="text-xs font-bold text-gray-800">
            {fmt(item.totalPrice)}
          </p>
        </div>
      </div>

      {/* 3-dot menu */}
      {actions.length > 0 && (
        <div ref={ref} className="relative shrink-0">
          <button
            onClick={() => setOpen((p) => !p)}
            className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <MoreVertical size={15} className="text-gray-500" />
          </button>

          {open && (
            <div className="absolute right-0 top-8 z-20 bg-white rounded-xl shadow-lg border border-gray-100 py-1 w-44">
              <div className="flex justify-end px-2 pt-1">
                <button onClick={() => setOpen(false)}>
                  <X size={13} className="text-gray-400" />
                </button>
              </div>
              {actions.map((a) => (
                <button
                  key={a.next}
                  onClick={() => {
                    setOpen(false);
                    onUpdateItem(item, a.next, a.label);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 transition-colors ${a.color}`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────
const SingleOrderPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // Local mutable copy of the order so status updates reflect immediately
  const [order, setOrder] = useState<MerchantOrder | null>(null);
  const [loading, setLoading] = useState(true);

  // Dropdown
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Modal
  const [pendingAction, setPendingAction] = useState<{
    label: string;
    next: MerchantOrderStatus;
    itemId?: string; // set when updating a specific item
  } | null>(null);
  const [modalScreen, setModalScreen] = useState<ModalScreen>("confirm");

  useEffect(() => {
    if (id) {
      const found = MerchantOrders.find((o) => o.id === id);
      setOrder(found ?? null);
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3">
        <Loader2 size={28} className="animate-spin text-primary" />
        <p className="text-sm text-gray-500">Loading order…</p>
      </div>
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

  const meta    = merchantOrderStatusMeta[order.status];
  const actions = orderActions[order.status];

  // ── Trigger modal for order-level status change ──
  const triggerOrderAction = (label: string, next: MerchantOrderStatus) => {
    setMenuOpen(false);
    setModalScreen("confirm");
    setPendingAction({ label, next });
  };

  // ── Trigger modal for item-level status change ──
  const triggerItemAction = (
    item: MerchantOrderItem,
    next: MerchantOrderStatus,
    label: string
  ) => {
    setModalScreen("confirm");
    setPendingAction({ label, next, itemId: item.productId });
  };

  // ── Confirm button in modal ──
  const handleConfirm = () => {
    if (!pendingAction) return;
    setModalScreen("loading");
    setTimeout(() => {
      setOrder((prev) => {
        if (!prev) return prev;
        if (pendingAction.itemId) {
          // Update only the specific item
          return {
            ...prev,
            items: prev.items.map((it) =>
              it.productId === pendingAction.itemId
                ? { ...it, itemStatus: pendingAction.next }
                : it
            ),
          };
        }
        // Update overall order status + all items that haven't been cancelled
        return {
          ...prev,
          status: pendingAction.next,
          items: prev.items.map((it) =>
            it.itemStatus !== "cancelled"
              ? { ...it, itemStatus: pendingAction.next }
              : it
          ),
        };
      });
      setModalScreen("success");
    }, 1800);
  };

  // ── Close modal ──
  const handleCloseModal = () => {
    setPendingAction(null);
    setModalScreen("confirm");
  };

  return (
    <>
      <div className="w-full max-w-3xl pb-12 mx-auto">
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                Order Details
              </h1>
              <p className="text-xs text-gray-400">{order.orderNumber}</p>
            </div>
          </div>

          {/* ── Top-right 3-dot actions menu ── */}
          {actions.length > 0 && (
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setMenuOpen((p) => !p)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700"
              >
                <MoreVertical size={16} />
                <span className="hidden sm:inline">Actions</span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-11 z-30 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1">
                  <div className="flex items-center justify-between px-3 pt-2 pb-1 border-b border-gray-50">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Update Order
                    </span>
                    <button onClick={() => setMenuOpen(false)}>
                      <X size={14} className="text-gray-400" />
                    </button>
                  </div>
                  {actions.map((a) => {
                    const Icon = a.icon;
                    return (
                      <button
                        key={a.next}
                        onClick={() => triggerOrderAction(a.label, a.next)}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors ${a.color}`}
                      >
                        <Icon size={15} />
                        {a.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Status Hero ── */}
        <div
          className={`rounded-2xl p-5 mb-5 flex items-center gap-4 ${meta.bg} border border-opacity-20`}
        >
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-500 mb-0.5">Current Status</p>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${meta.dot}`} />
              <h2 className={`text-xl font-bold ${meta.text}`}>{meta.label}</h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Ordered on {formatDate(order.date)}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-gray-400 font-medium">Total</p>
            <p className="text-2xl font-extrabold text-gray-900">{fmt(order.totalAmount)}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* ── Buyer Information ── */}
          <SectionCard title="Buyer Information" icon={User}>
            <InfoRow label="Name"    value={order.buyerName} />
            <InfoRow label="Phone"   value={
              <a href={`tel:${order.buyerPhone}`} className="text-primary underline">
                {order.buyerPhone}
              </a>
            } />
            <InfoRow label="Email"   value={
              <a href={`mailto:${order.buyerEmail}`} className="text-primary underline">
                {order.buyerEmail}
              </a>
            } />
            <InfoRow label="Address" value={order.deliveryAddress} />
            <InfoRow label="Region"  value={order.location} />
            {order.notes && (
              <div className="mt-3 p-3 rounded-lg bg-yellow-50 border border-yellow-100">
                <p className="text-xs font-semibold text-yellow-700 mb-0.5">Buyer Notes</p>
                <p className="text-xs text-yellow-900">{order.notes}</p>
              </div>
            )}
          </SectionCard>

          {/* ── Order Items ── */}
          <SectionCard title={`Items (${order.items.length})`} icon={Package}>
            <div className="flex flex-col gap-2">
              {order.items.map((item) => (
                <OrderItemRow
                  key={item.productId}
                  item={item}
                  onUpdateItem={triggerItemAction}
                />
              ))}
            </div>
          </SectionCard>

          {/* ── Payment Summary ── */}
          <SectionCard title="Payment Summary" icon={CreditCard}>
            <InfoRow label="Items Total"    value={fmt(order.itemsTotal)} />
            <InfoRow label="Delivery Fee"   value={fmt(order.deliveryFee)} />
            <InfoRow
              label="Service Charge"
              value={
                <span className={order.serviceCharge < 0 ? "text-green-600" : ""}>
                  {order.serviceCharge < 0
                    ? `- ${fmt(Math.abs(order.serviceCharge))} (discount)`
                    : fmt(order.serviceCharge)}
                </span>
              }
            />
            <div className="flex justify-between items-center pt-3 mt-1 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-800">Grand Total</span>
              <span className="text-base font-extrabold text-gray-900">
                {fmt(order.totalAmount)}
              </span>
            </div>
          </SectionCard>

          {/* ── Order Meta ── */}
          <SectionCard title="Order Information" icon={Calendar}>
            <InfoRow label="Order Number"     value={order.orderNumber} />
            <InfoRow label="Date Placed"      value={formatDate(order.date)} />
            <InfoRow label="Payment Method"   value={order.paymentMethod} />
            <InfoRow
              label="Delivery Location"
              value={
                <span className="flex items-center gap-1 justify-end">
                  <MapPin size={11} className="text-primary shrink-0" />
                  {order.location}
                </span>
              }
            />
          </SectionCard>
        </div>
      </div>

      {/* ── Status Update Modal ── */}
      {pendingAction && (
        <StatusModal
          actionLabel={pendingAction.label}
          nextStatus={pendingAction.next}
          screen={modalScreen}
          onConfirm={handleConfirm}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default SingleOrderPage;
