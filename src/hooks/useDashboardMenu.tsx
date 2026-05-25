"use client";
import React from "react";
import {
  ShoppingBag,
  Heart,
  Wallet,
  Settings,
  HelpCircle,
  Bell,
  LayoutDashboard,
  HistoryIcon,
  Package,
  ClipboardList,
  Banknote,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { notificationQueries } from "@/queries/notification.queries";
import { useAuthStore } from "@/store/slices/auth.slice";
import { Role } from "@/types/prisma-schema-types";

const SELLER_ROLES: string[] = [
  Role.merchant,
  Role.farmer,
  Role.business,
  Role.admin,
  Role.super_admin,
];

export interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  more: string;
}

export function useDashboardMenu(): MenuItem[] {
  const { user } = useAuthStore();
  const { data: unreadCount = 0 } = useQuery(notificationQueries.unreadCount());

  const isSellerRole = user?.role ? SELLER_ROLES.includes(user.role) : false;

  const overviewItem: MenuItem = {
    icon: <LayoutDashboard size={20} />,
    label: "Overview",
    href: "/dashboard",
    more: "#",
  };

  const sellerItems: MenuItem[] = isSellerRole
    ? [
        {
          icon: <ShoppingBag size={20} />,
          label: "Manage Products",
          href: "/dashboard/manage-products",
          more: "/manage-products",
        },
        {
          icon: <Package size={20} />,
          label: "Manage Orders",
          href: "/dashboard/manage-orders",
          more: "/manage-orders",
        },
        {
          icon: <Banknote size={20} />,
          label: "Payouts",
          href: "/dashboard/payouts",
          more: "/payouts",
        },
      ]
    : [];

  const commonItems: MenuItem[] = [
    {
      icon: <ClipboardList size={20} />,
      label: "My Orders",
      href: "/dashboard/orders",
      more: "/orders",
    },
    {
      icon: <Heart size={20} />,
      label: "My Wishlist",
      href: "/dashboard/wishlist",
      more: "/wishlist",
    },
    {
      icon: <Wallet size={20} />,
      label: "My Wallet",
      href: "/dashboard/my-wallet",
      more: "/my-wallet",
    },
    {
      icon: (
        <div className="relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-0.5">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>
      ),
      label: "Notifications",
      href: "/dashboard/notifications",
      more: "/notifications",
    },
    {
      icon: <HistoryIcon size={20} />,
      label: "Transactions",
      href: "/dashboard/transaction-history",
      more: "/transaction-history",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      href: "/dashboard/settings",
      more: "/settings",
    },
    {
      icon: <HelpCircle size={20} />,
      label: "Help/Support",
      href: "/dashboard/support",
      more: "/help",
    },
  ];

  return [overviewItem, ...sellerItems, ...commonItems];
}
