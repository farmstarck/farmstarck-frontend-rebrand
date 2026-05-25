"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ArrowRight, ShoppingBag, Store } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/slices/auth.slice";
import { getInitials } from "@/utils/PageUtils";
import { useNavigate } from "@/hooks/useNavigate";
import { useCartStore } from "@/store/slices/cart.slice";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

type SubMenuItem = {
  img: string;
  title: string;
  link: string;
  description?: string;
  comingSoon?: boolean;
};

type MenuItem = {
  title: string;
  href?: string;
  submenu?: SubMenuItem[];
};

const menuItems: MenuItem[] = [
  {
    title: "Our Products",
    submenu: [
      {
        img: "/assets/images/product-menu1.png",
        title: "Market Place",
        description:
          "Get direct from farm & agro-processed produce delivered at your doorstep",
        link: "/market/marketplace",
        comingSoon: false,
      },
      {
        img: "/assets/images/product-menu2.png",
        title: "Procurement",
        description:
          "Streamline your agricultural supply chain with tailored procurement solutions",
        link: "/marketing/procurement",
        comingSoon: false,
      },
      {
        img: "/assets/images/product-menu3.png",
        title: "Food Vault",
        description:
          "Our Food Vault helps you securely save for food purchases while earning exclusive benefits",
        link: "/marketing/foodvault",
        comingSoon: false,
      },
      {
        img: "/assets/images/product-menu4.png",
        title: "Smart Inventory",
        description: "Manage all your agricultural assets in one place",
        link: "/marketing/smartinventory",
        comingSoon: true,
      },
    ],
  },
  {
    title: "Your Journey",
    submenu: [
      {
        img: "/assets/images/journey-menu1.png",
        title: "Farmer",
        link: "/marketing/farm_empowerment",
      },
      {
        img: "/assets/images/journey-menu2.png",
        title: "Merchant",
        link: "/marketing/become_merchant",
      },
      {
        img: "/assets/images/journey-menu3.png",
        title: "Business",
        link: "/marketing/business_journey",
      },
      {
        img: "/assets/images/journey-menu4.png",
        title: "Investment",
        link: "/marketing/investment",
      },
    ],
  },
  {
    title: "About Us",
    href: "/about",
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const { user, isAuthenticated, logout } = useAuthStore();
  const { cart } = useCartStore();
  const { navigate } = useNavigate();

  const hasItemsInCart = cart.length > 0;

  // ── Submenu hover handling ────────────────────────────────────
  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleItemEnter = (idx: number) => {
    clearCloseTimer();
    setOpenMenu(idx);
  };

  const handleItemLeave = () => {
    closeTimerRef.current = window.setTimeout(() => {
      setOpenMenu(null);
      closeTimerRef.current = null;
    }, 200);
  };

  const handleSubmenuEnter = () => clearCloseTimer();
  const handleSubmenuLeave = () => {
    closeTimerRef.current = window.setTimeout(() => {
      setOpenMenu(null);
      closeTimerRef.current = null;
    }, 200);
  };

  const menuToggle = () => setMobileMenuOpen((s) => !s);

  const handleLinkClick = () => {
    if (mobileMenuOpen) setMobileMenuOpen(false);
    setOpenAccordion(null);
    setOpenMenu(null);
  };

  // ── Close profile dropdown on outside click ───────────────────
  useEffect(() => {
    const close = () => setProfileOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  // ── Scroll detection ──────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearCloseTimer();
    };
  }, []);

  return (
    <div className={`md:py-8 ${!isScrolled && "p-0 md:p-5"} bg-[#e4f9e4]`}>
      <nav
        className={`shadow-md z-50 transition-all duration-300 bg-[var(--dark-primary)] py-5 md:py-1 ${
          isScrolled ? "fixed top-0 w-full" : "max-w-6xl m-auto md:rounded-lg"
        }`}
      >
        <div className="relative max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* ── Logo ─────────────────────────────────────────────── */}
          <Link href="/">
            <Image
              src="/assets/svg/logo-primary.svg"
              alt="Farmstarck"
              width={192}
              height={48}
              className="w-32 md:w-48"
            />
          </Link>

          {/* ── Desktop Menu ──────────────────────────────────────── */}
          <div className="hidden lg:flex gap-10 items-center">
            {menuItems.map((item, idx) => (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => item.submenu && handleItemEnter(idx)}
                onMouseLeave={() => item.submenu && handleItemLeave()}
              >
                {item.submenu ? (
                  <span className="flex cursor-pointer items-center gap-1 font-subHeading text-white hover:text-[#d4f5d5] transition-colors">
                    {item.title}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        openMenu === idx ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                ) : (
                  <Link
                    href={item.href ?? "/"}
                    className="font-subHeading text-white hover:text-[#d4f5d5] transition-colors"
                  >
                    {item.title}
                  </Link>
                )}

                {/* Submenu */}
                {/* Replace the submenu wrapper div with this: */}
                {item.submenu && openMenu === idx && (
                  <div
                    className={`absolute ${
                      idx === 0
                        ? "lg:-left-[365px] w-[1200px]"
                        : "lg:-left-[480px] w-[1100px]"
                    } right-0 top-full z-40`}
                    onMouseEnter={handleSubmenuEnter}
                    onMouseLeave={handleSubmenuLeave}
                  >
                    {/* Invisible bridge — fills the gap between nav and dropdown */}
                    <div className="h-3 w-full" />

                    {/* Actual dropdown content */}
                    <div className="flex dark-primary-bg px-4 py-10 shadow-lg rounded-lg">
                      {item.submenu[0]?.description ? (
                        item.submenu.map((sub, sIdx) => (
                          <Link
                            href={sub.link}
                            key={sIdx}
                            onClick={handleLinkClick}
                            className="flex gap-3 items-center p-2 rounded w-1/4 hover:bg-white/5 transition-colors"
                          >
                            <Image
                              src={sub.img}
                              alt={sub.title}
                              width={64}
                              height={64}
                              className="rounded shrink-0"
                            />
                            <div className="flex flex-col gap-2">
                              <span className="font-subHeading2 text-white text-base">
                                {sub.title}
                              </span>
                              <span className="text-white/70 text-sm leading-snug">
                                {sub.description}
                              </span>
                              {sub.comingSoon && (
                                <span className="font-btnBody font-bold uppercase bg-[#FFBB28] px-1.5 py-0.5 rounded text-[0.5rem] w-fit dark-primary-txt">
                                  Coming Soon
                                </span>
                              )}
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="flex justify-between gap-3 flex-wrap">
                          {item.submenu.map((sub, sIdx) => (
                            <Link
                              href={sub.link}
                              key={sIdx}
                              onClick={handleLinkClick}
                              className="flex gap-3 flex-col items-start w-1/5 hover:opacity-80 transition-opacity"
                            >
                              <Image
                                src={sub.img}
                                alt={sub.title}
                                width={640}
                                height={640}
                                className="rounded"
                              />
                              <span className="font-subHeading2 text-white text-base flex items-center justify-between w-full gap-2">
                                {sub.title}
                                <ArrowRight size={20} color="#00C700" />
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Desktop Right Actions ─────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Marketplace button */}
            <button
              onClick={() => navigate("/market/marketplace")}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors"
            >
              <ShoppingBag size={15} className="text-white" />
              <span className="text-white text-sm font-semibold">
                Marketplace
              </span>
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate("/market/marketplace/cart-items")}
              className="relative w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <ShoppingCartIcon className="w-5 h-5 text-white" />
              {hasItemsInCart && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-0.5">
                  {cart.length > 99 ? "99+" : cart.length}
                </span>
              )}
            </button>

            {!isAuthenticated ? (
              <>
                <Link
                  href="/signin"
                  className="px-5 py-2 bg-primary text-white text-sm rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Sign In
                </Link>
                <Link
                  href="/onboarding/signup"
                  className="px-5 py-2 bg-white text-primary text-sm rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileOpen((p) => !p);
                  }}
                  className="w-10 h-10 rounded-full bg-white text-dark-primary flex items-center justify-center font-extrabold text-sm hover:bg-gray-100 transition-colors"
                >
                  {getInitials(user?.fullName)}
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 py-1">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {user?.fullName}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={async () => {
                        setProfileOpen(false);
                        await logout();
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Mobile Toggle ─────────────────────────────────────── */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Marketplace icon — matches dashboard layout */}
            <button
              onClick={() => navigate("/market/marketplace")}
              className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <Store size={17} className="text-white" />
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate("/market/marketplace/cart-items")}
              className="relative w-9 h-9 flex items-center justify-center"
            >
              <ShoppingCartIcon className="w-5 h-5 text-white" />
              {hasItemsInCart && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-0.5">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Animated hamburger */}
            <button
              className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
              onClick={menuToggle}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-0.5 rounded transition-all duration-300 origin-center ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
                style={{ background: "#fff" }}
              />
              <span
                className={`block w-5 h-0.5 rounded transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0 scale-x-0" : ""
                }`}
                style={{ background: "#fff" }}
              />
              <span
                className={`block w-5 h-0.5 rounded transition-all duration-300 origin-center ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
                style={{ background: "#fff" }}
              />
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ───────────────────────────────────────────── */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-3 pb-6 bg-secondary-dark space-y-2">
            {/* Shortcut buttons — 2 col grid same style */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={() => {
                  navigate("/market/marketplace");
                  handleLinkClick();
                }}
                className="flex items-center gap-2 px-4 py-3 bg-primary/20 border border-primary/30 rounded-xl"
              >
                <ShoppingBag size={16} className="text-white shrink-0" />
                <span className="text-white font-semibold text-sm">
                  Marketplace
                </span>
              </button>
              <button
                onClick={() => {
                  navigate("/market/marketplace/cart-items");
                  handleLinkClick();
                }}
                className="flex items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl"
              >
                <ShoppingCartIcon className="w-4 h-4 text-white shrink-0" />
                <span className="text-white font-semibold text-sm flex items-center gap-1.5">
                  Cart
                  {hasItemsInCart && (
                    <span className="bg-red-500 text-white text-[9px] font-bold rounded-full px-1.5 py-0.5 leading-none">
                      {cart.length}
                    </span>
                  )}
                </span>
              </button>
            </div>

            {/* Menu items */}
            {menuItems.map((item, idx) => (
              <div key={idx} className="overflow-hidden">
                {item.submenu ? (
                  <>
                    {/* Accordion trigger — same pill style as shortcuts */}
                    <button
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-colors ${
                        openAccordion === idx
                          ? "bg-white/15 rounded-b-none"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                      onClick={() =>
                        setOpenAccordion(openAccordion === idx ? null : idx)
                      }
                    >
                      <span className="text-white font-semibold text-sm">
                        {item.title}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-white/60 transition-transform duration-300 ${
                          openAccordion === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Accordion content */}
                    {openAccordion === idx && (
                      <div className="bg-white/5 rounded-b-xl px-3 py-3 space-y-1 max-h-72 overflow-y-auto">
                        {item.submenu[0]?.description
                          ? item.submenu.map((sub, sIdx) => (
                              <Link
                                href={sub.link}
                                key={sIdx}
                                onClick={handleLinkClick}
                                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 transition-colors"
                              >
                                <Image
                                  src={sub.img}
                                  alt={sub.title}
                                  width={40}
                                  height={40}
                                  className="rounded-lg shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-white text-sm font-semibold">
                                    {sub.title}
                                  </p>
                                  <p className="text-white/50 text-xs leading-snug mt-0.5 line-clamp-2">
                                    {sub.description}
                                  </p>
                                </div>
                                {sub.comingSoon ? (
                                  <span className="shrink-0 text-[9px] font-bold uppercase bg-[#FFBB28] px-1.5 py-0.5 rounded">
                                    Soon
                                  </span>
                                ) : (
                                  <ArrowRight
                                    size={14}
                                    className="text-primary shrink-0"
                                  />
                                )}
                              </Link>
                            ))
                          : item.submenu.map((sub, sIdx) => (
                              <Link
                                href={sub.link}
                                key={sIdx}
                                onClick={handleLinkClick}
                                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 transition-colors"
                              >
                                <Image
                                  src={sub.img}
                                  alt={sub.title}
                                  width={44}
                                  height={44}
                                  className="rounded-lg object-cover shrink-0"
                                />
                                <span className="text-white text-sm font-semibold flex-1">
                                  {sub.title}
                                </span>
                                <ArrowRight
                                  size={14}
                                  className="text-primary shrink-0"
                                />
                              </Link>
                            ))}
                      </div>
                    )}
                  </>
                ) : (
                  // Non-submenu items get same card style
                  <Link
                    href={item.href ?? "/"}
                    onClick={handleLinkClick}
                    className="flex items-center justify-between w-full px-4 py-3.5 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <span className="text-white font-semibold text-sm">
                      {item.title}
                    </span>
                    <ArrowRight size={14} className="text-white/40" />
                  </Link>
                )}
              </div>
            ))}

            {/* Auth */}
            <div className="pt-3 mt-1 border-t border-white/10 flex flex-col gap-2">
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/signin"
                    onClick={handleLinkClick}
                    className="w-full px-4 py-3 text-center bg-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/onboarding/signup"
                    onClick={handleLinkClick}
                    className="w-full px-4 py-3 text-center bg-white text-primary rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors"
                  >
                    Create Account
                  </Link>
                </>
              ) : (
                <>
                  {/* User info card */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-white text-dark-primary flex items-center justify-center font-extrabold text-xs shrink-0">
                      {getInitials(user?.fullName)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-semibold text-sm truncate">
                        {user?.fullName}
                      </p>
                      <p className="text-white/50 text-xs truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={handleLinkClick}
                    className="w-full px-4 py-3 text-center bg-white text-primary rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={async () => {
                      handleLinkClick();
                      await logout();
                    }}
                    className="w-full px-4 py-3 text-center bg-red-600 text-white rounded-xl font-semibold text-sm hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
