"use client";
import React, { useState } from "react";
import {
  ShoppingBag,
  Heart,
  Wallet,
  Settings,
  HelpCircle,
  ChevronRight,
  Bell,
  User,
  LogOutIcon,
  LayoutDashboard,
  ShoppingCartIcon,
  HistoryIcon,
} from "lucide-react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCartStore } from "@/store/slices/cart.slice";
import { ShoppingCartIcon as ShoppingCartSolidIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "@/hooks/useNavigate";
import { useAuthStore } from "@/store/slices/auth.slice";
import { useQuery } from "@tanstack/react-query";
import { notificationQueries } from "@/queries/notification.queries";
import { useDashboardMenu } from "@/hooks/useDashboardMenu";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { cart } = useCartStore();
  const { user, logout } = useAuthStore();
  const hasItemsInCart = cart.length > 0;
  const { navigate } = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  // ── Unread notification count ────────────────────────────────────
  const { data: unreadCount = 0 } = useQuery(notificationQueries.unreadCount());

  const menuItems = useDashboardMenu();

  const menuToggle = () => setIsSidebarOpen((s) => !s);

  const handleNavigation = (href: string) => {
    router.push(href);
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  const handleLogout = async () => {
    if (isSidebarOpen) setIsSidebarOpen(false);
    await logout();
    router.push("/signin");
  };

  return (
    <div className="min-h-screen">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={menuToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-green-800 text-white z-50 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-72`}
      >
        <div className="flex flex-col h-full">
          <div className="py-5 px-3 flex items-center justify-between border-b w-11/12 mx-auto border-white/20">
            <Image
              src="/assets/svg/logo-primary.svg"
              alt="farmstarck logo"
              width={192}
              height={48}
              className="w-32 md:w-40"
            />
            <button
              className="lg:hidden w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
              onClick={menuToggle}
              aria-label="Close menu"
            >
              <Image
                src="/assets/images/status/cancel_white.png"
                alt="Close menu"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>
          </div>

          <nav className="flex-1 pt-10 overflow-y-auto">
            {menuItems.map((item, index) => {
              const isActive =
                router.pathname === item.href ||
                router.pathname.includes(item.more);

              return (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.href)}
                  className={`flex items-center gap-3 px-6 py-2 w-full text-left transition-colors group ${
                    isActive ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  <span className="text-white opacity-90 group-hover:opacity-100">
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <ChevronRight
                      size={16}
                      className="text-white opacity-100"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-6 border-t border-white/20">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-[#33d233] rounded-lg transition-colors"
            >
              <LogOutIcon size={20} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden fixed top-0 left-0 right-0 bg-dark-green border-b border-gray-200 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors focus:outline-none"
              onClick={menuToggle}
              aria-label="Open menu"
            >
              <Image
                src="/assets/images/status/menu.png"
                alt="Open menu"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>

            <div className="flex items-center gap-2">
              {/* ← Add marketplace icon for mobile */}
              <button
                onClick={() => navigate("/market/marketplace")}
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ShoppingBag size={15} className="text-white" />
              </button>

              <button
                onClick={() => navigate("/market/marketplace/cart-items")}
              >
                <ShoppingCartSolidIcon className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={() => navigate("/dashboard/notifications")}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors relative"
              >
                <Bell size={16} className="text-primary fill-primary" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-0.5">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </button>

              <button
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                onClick={() => navigate("/dashboard/settings/profile")}
              >
                <User size={16} className="text-primary fill-primary" />
              </button>
            </div>
          </div>
        </header>

        {/* Desktop Header */}
        <header
          className="hidden lg:block fixed top-0 right-0 bg-white border-b border-gray-200 z-30"
          style={{ left: "16rem" }}
        >
          <div className="flex items-center justify-between px-10 py-4">
            <h1 className="text-xl font-bold text-gray-800">
              Welcome back, {user?.fullName.split(" ")[0]}!
            </h1>
            <div className="flex items-center gap-3">
              {/* ← Add this — Marketplace button */}
              <button
                onClick={() => navigate("/market/marketplace")}
                className="flex items-center gap-2 px-4 py-2 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-xl transition-colors group"
              >
                <ShoppingBag size={16} className="text-primary" />
                <span className="text-sm font-semibold text-primary">
                  Marketplace
                </span>
              </button>

              <button
                onClick={() => navigate("/market/marketplace/cart-items")}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-lite border border-lite transition-colors"
              >
                <div className="relative">
                  {hasItemsInCart ? (
                    <ShoppingCartSolidIcon className="w-6 h-6 text-primary" />
                  ) : (
                    <ShoppingCartIcon className="w-6 h-6" />
                  )}
                  {hasItemsInCart && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1 font-semibold">
                      {cart.length > 99 ? "99+" : cart.length}
                    </span>
                  )}
                </div>
              </button>

              <button
                onClick={() => navigate("/dashboard/notifications")}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-lite border border-lite relative transition-colors"
              >
                <Bell size={20} className="text-primary fill-primary" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-0.5">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </button>

              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-lite border border-lite transition-colors">
                <User size={20} className="text-primary fill-primary" />
              </button>
            </div>
          </div>
        </header>

        <main className="pt-16 bg-[#ecf6ee] lg:pt-20 min-h-screen">
          <div className="px-2 pt-4 lg:pl-10">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
