import { SellerOrderStatus } from "@/types/prisma-schema-types";

/** Helper: human-readable label + styling for each merchant order status */
export const merchantOrderStatusMeta: Record<
  SellerOrderStatus,
  { label: string; bg: string; text: string }
> = {
  pending: { label: "Pending", bg: "bg-[#febb29]", text: "text-white" },
  partially_shipped: {
    label: "Partially Shipped",
    bg: "bg-primary",
    text: "text-white",
  },
  shipped: { label: "Shipped", bg: "bg-primary", text: "text-white" },
  delivered: { label: "Delivered", bg: "bg-dark-primary", text: "text-white" },
  partially_delivered: {
    label: "Partially Delivered",
    bg: "bg-dark-primary",
    text: "text-white",
  },
  cancelled: { label: "Cancelled", bg: "bg-red", text: "text-white" },
};
