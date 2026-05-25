"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  ShoppingCartIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  ShoppingCartIcon as ShoppingCartSolidIcon,
  HeartIcon as HeartSolidIcon,
} from "@heroicons/react/24/solid";
import { useCartStore, useWishlistStore } from "@/store/slices/cart.slice";
import CustomSearch from "./CustomSearch";
import { useNavigate } from "@/hooks/useNavigate";
import Link from "next/link";
import { useAuthStore } from "@/store/slices/auth.slice";
import { useRouter } from "next/router";
import { getInitials } from "@/utils/PageUtils";

const MarketSearch = () => {
  const { cart } = useCartStore();
  const { wishlist } = useWishlistStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const { navigate } = useNavigate();

  const [profileOpen, setProfileOpen] = React.useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const hasItemsInCart = cart.length > 0;
  const hasFavorites = wishlist.length > 0;

  // ← useRef-based outside click — same pattern as main navbar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative bg-dark-primary w-full px-4 lg:px-6 py-4 text-white flex items-center justify-between gap-4">
      {/* Logo */}
      <Image
        src="/assets/svg/logo-primary.svg"
        alt="Farmstarck"
        width={192}
        height={48}
        className="w-32 md:w-44 lg:block hidden shrink-0"
      />

      {/* Search */}
      <div className="flex-1 lg:max-w-2xl p-2 flex items-center bg-white rounded-lg">
        <CustomSearch />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Cart */}
        <button
          onClick={() => navigate("/market/marketplace/cart-items")}
          className="flex items-center gap-1.5 text-white hover:opacity-80 transition-opacity"
        >
          <div className="relative">
            {hasItemsInCart ? (
              <ShoppingCartSolidIcon className="w-6 h-6" />
            ) : (
              <ShoppingCartIcon className="w-6 h-6" />
            )}
            {hasItemsInCart && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-0.5 font-bold">
                {cart.length > 99 ? "99+" : cart.length}
              </span>
            )}
          </div>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => navigate("/market/marketplace/wishlist-items")}
          className="flex items-center gap-1.5 text-white hover:opacity-80 transition-opacity"
        >
          <div className="relative">
            {hasFavorites ? (
              <HeartSolidIcon className="w-6 h-6" />
            ) : (
              <HeartIcon className="w-6 h-6" />
            )}
            {hasFavorites && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-0.5 font-bold">
                {wishlist.length > 99 ? "99+" : wishlist.length}
              </span>
            )}
          </div>
        </button>

        {/* Auth */}
        {!isAuthenticated ? (
          <Link
            href="/signin"
            className="flex items-center gap-1.5 text-white hover:opacity-80 transition-opacity"
          >
            <UserIcon className="w-6 h-6" />
            <span className="hidden md:inline text-sm font-medium">
              Sign In
            </span>
          </Link>
        ) : (
          <div className="relative" ref={profileRef}>
            {/* Avatar */}
            <button
              onClick={() => setProfileOpen((p) => !p)}
              className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white text-dark-primary flex items-center justify-center font-extrabold text-xs hover:opacity-90 transition-opacity"
            >
              {getInitials(user?.fullName)}
            </button>

            {/* Dropdown — matches main navbar style */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 py-1">
                {/* User info header */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                    Signed in as
                  </p>
                  <p className="text-sm font-semibold text-gray-900 truncate mt-0.5">
                    {user?.fullName}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>

                {/* Nav links */}
                <Link
                  href="/dashboard"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/orders"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  My Orders
                </Link>
                <Link
                  href="/dashboard/my-wallet"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  My Wallet
                </Link>
                <Link
                  href="/dashboard/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Settings
                </Link>

                {/* Logout */}
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button
                    onClick={async () => {
                      setProfileOpen(false);
                      await logout();
                      router.push("/signin");
                    }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketSearch;
