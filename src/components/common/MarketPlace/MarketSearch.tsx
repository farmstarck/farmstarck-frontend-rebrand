"use client";
import React, { useEffect } from "react";
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

  const [profileOpen, setProfileOpen] = React.useState(false);

  // Check if cart and wishlist have items
  const hasItemsInCart = cart.length > 0;
  const hasFavorites = wishlist.length > 0;
  const { navigate } = useNavigate();

  useEffect(() => {
    const close = () => setProfileOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div className="bg-dark-primary w-full p-5  text-white flex items-center justify-between">
      <Image
        src="/assets/svg/logo-primary.svg"
        alt="farmstarck logo"
        width={192}
        height={48}
        className="w-32 md:w-48 lg:block hidden"
      />
      <div className="w-3/5 lg:w-[50%] p-2 flex items-center gap-4 bg-white rounded-lg">
        <CustomSearch />
      </div>

      {/* Cart, Favorites, Sign In */}
      <div className="flex items-center gap-4">
        {/* Cart Button with Count */}
        <button
          onClick={() => navigate("/market/marketplace/cart-items")}
          className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
        >
          <div className="relative">
            {hasItemsInCart ? (
              <ShoppingCartSolidIcon className="w-6 h-6" />
            ) : (
              <ShoppingCartIcon className="w-6 h-6" />
            )}
            {hasItemsInCart && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 font-semibold">
                {cart.length > 99 ? "99+" : cart.length}
              </span>
            )}
          </div>
        </button>

        {/* Wishlist Button with Count */}
        <button
          onClick={() => navigate("/market/marketplace/wishlist-items")}
          className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
        >
          <div className="relative">
            {hasFavorites ? (
              <HeartSolidIcon className="w-6 h-6" />
            ) : (
              <HeartIcon className="w-6 h-6" />
            )}
            {hasFavorites && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 font-semibold">
                {wishlist.length > 99 ? "99+" : wishlist.length}
              </span>
            )}
          </div>
        </button>
        {/* Auth Section */}
        {!isAuthenticated ? (
          <Link
            href="/signin"
            className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
          >
            <UserIcon className="w-6 h-6" />
            <span className="hidden md:inline">Sign In</span>
          </Link>
        ) : (
          <div className="relative">
            {/* Avatar */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setProfileOpen((p) => !p);
              }}
              className="w-7 h-7 rounded-full bg-white  text-dark-primary flex items-center justify-center font-extrabold md:w-9 md:h-9"
            >
              {getInitials(user?.fullName)}
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-white rounded-md shadow-lg overflow-hidden z-50">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    router.push("/dashboard/buyer");
                  }}
                  className="w-full text-left px-4 py-2 font-bold text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </button>

                <button
                  onClick={async () => {
                    setProfileOpen(false);
                    await logout();
                    router.push("/signin");
                  }}
                  className="w-full text-left px-4 py-2 font-bold text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketSearch;
