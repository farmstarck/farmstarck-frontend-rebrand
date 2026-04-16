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
  ClipboardList,
  Package,
} from "lucide-react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCartStore } from "@/store/slices/cart.slice";
import { ShoppingCartIcon as ShoppingCartSolidIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "@/hooks/useNavigate";
import { useAuthStore } from "@/store/slices/auth.slice";

interface MerchantDashboardLayoutProps {
  children: React.ReactNode;
}

const MerchantDashboardLayout: React.FC<MerchantDashboardLayoutProps> = ({
  children,
}) => {
  const { cart } = useCartStore();
  const { user, logout } = useAuthStore();

  // Check if cart and wishlist have items
  const hasItemsInCart = cart.length > 0;
  const { navigate } = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  

const menuItems = [
  {
    icon: <LayoutDashboard size={20} />,
    label: "Overview",
    href: "/dashboard/merchant",
    more: "#",
  },
  {
    icon: <ShoppingBag size={20} />,
    label: "Manage Products",
    href: "/dashboard/merchant/manage-products",
    more: "/products",
  },
  {
    icon: <Package size={20} />, 
    label: "Manage Orders",
    href: "/dashboard/merchant/manage-orders",
    more: "/orders",
  },
  {
    icon: <Wallet size={20} />,
    label: "My Wallet",
    href: "/dashboard/merchant/my-wallet",
    more: "/my-wallet",
  },
  {
    icon: <Heart size={20} />, 
    label: "My Wishlist",
    href: "/market/marketplace/wishlist-items",
    more: "#",
  },
  {
    icon: <ClipboardList size={20} />, 
    label: "My Orders",
    href: "/dashboard/merchant/my-orders",
    more: "/my_orders",
  },
  {
    icon: <Settings size={20} />,
    label: "Settings",
    href: "/dashboard/merchant/settings",
    more: "/settings",
  },
  {
    icon: <HelpCircle size={20} />,
    label: "Help/Support",
    href: "/dashboard/merchant/support",
    more: "/help",
  },
];

  const menuToggle = () => {
    setIsSidebarOpen((s) => !s);
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const handleLogout = async () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
    // Add your logout logic here
    await logout();
    router.push("/signin");
  };

  return (
    <div className="min-h-screen ">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={menuToggle}
        />
      )}

      {/* Sidebar - Fixed on all screens */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-primary text-white z-50 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-72`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="py-5 px-3 flex items-center justify-between border-b w-11/12 mx-auto border-white/20">
            <Image
              src="/assets/images/dashboard/farmstarck-white.png"
              alt="farmstarck logo"
              width={150}
              height={150}
              className=""
            />
            {/* Close button (X icon) - Only visible on mobile when sidebar is open */}
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

          {/* Menu Items */}
          <nav className="flex-1 pt-10 overflow-y-auto">
            {menuItems.map((item, index) => {
              const isActive =
                router.pathname === item.href ||
                router.pathname.includes(item.more);

              return (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.href)}
                  className={`flex items-center gap-3 px-6 py-3.5 w-full text-left transition-colors group ${
                    isActive ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  {/* Icon */}
                  <span className="text-white opacity-90 group-hover:opacity-100">
                    {item.icon}
                  </span>

                  {/* Label */}
                  <span className="flex-1">{item.label}</span>

                  {/* Chevron — only visible when active */}
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

          {/* Logout Button */}
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

      {/* Main Content Area */}
      <div className="lg:ml-64">
        {/* Mobile Header - Fixed */}
        <header className="lg:hidden fixed top-0 left-0 right-0 bg-dark-green border-b border-gray-200 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Hamburger Menu Button with Image */}
            <button
              className="w-10 h-10   rounded-lg flex items-center justify-center transition-colors focus:outline-none"
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
              <button onClick={() => navigate("/market/marketplace/")}>
                <ShoppingCartSolidIcon className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => navigate("/dashboard/buyer/notifications")}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Bell size={16} className="text-primary fill-primary" />
              </button>
              <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <User size={16} className="text-primary fill-primary" />
              </button>
            </div>
          </div>
        </header>

        {/* Desktop Header - Fixed */}
        <header
          className="hidden lg:block fixed top-0 right-0 bg-white border-b border-gray-200 z-30"
          style={{ left: "16rem" }}
        >
          <div className="flex items-center justify-between px-10        py-4">
            <h1 className="text-xl font-bold text-gray-800">
              Welcome back, {user?.fullName.split(" ")[0]}!
            </h1>
            <div className="flex items-center gap-4">
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
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-lite border border-lite relative transition-colors">
                <Bell size={20} className="text-primary fill-primary" />
                <p className="absolute w-2 h-2 bg-red-500 top-0 right-1 rounded-full"></p>
              </button>
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-lite border border-lite transition-colors">
                <User size={20} className="text-primary fill-primary" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content - Scrollable */}
        <main className="pt-16 bg-[#ecf6ee] lg:pt-20 min-h-screen">
          <div className="px-2 pt-4 lg:pl-10">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MerchantDashboardLayout;
