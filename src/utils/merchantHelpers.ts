import { MerchantOrderStatus } from "@/types/products";

export const fmt = (n: number) => `₦${n.toLocaleString("en-NG")}`;

export const MARK_ALL_STATUSES: { value: MerchantOrderStatus; label: string }[] = [
  { value: "pending",   label: "Pending" },
  { value: "shipped",   label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];