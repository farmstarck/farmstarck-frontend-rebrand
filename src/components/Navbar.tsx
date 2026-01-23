"use client"
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useNavigate } from "@/hooks/useNavigate";

type SubMenuItem = {
  img: string;
  title: string;
  link: string;
  description?: string;
  comingSoon?: boolean;
};

type MenuItem = {
  title: string;
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
        link: "/marketing/marketplace",
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
      { img: "/assets/images/journey-menu1.png", title: "Farmer", link: "/marketing/farm_empowerment" },
      { img: "/assets/images/journey-menu2.png", title: "Merchant", link: "/marketing/become_merchant" },
      { img: "/assets/images/journey-menu3.png", title: "Business", link: "/marketing/business_journey" },
      { img: "/assets/images/journey-menu4.png", title: "Investment", link: "/marketing/investment" },
    ],
  },
  {
    title: "About Us",
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  // Desktop submenu state
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  // clear any pending close timeout
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
    clearCloseTimer();
    // small delay so user can move from nav label -> submenu without it closing
    closeTimerRef.current = window.setTimeout(() => {
      setOpenMenu(null);
      closeTimerRef.current = null;
    }, 200);
  };

  const handleSubmenuEnter = () => {
    clearCloseTimer();
    // keep it open while inside submenu
  };

  const handleSubmenuLeave = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenMenu(null);
      closeTimerRef.current = null;
    }, 200);
  };

  const menuToggle = () => {
    const menu = document.getElementById("menu");
    const btn = document.getElementById("menu-btn");

    // guard in case elements don't exist
    if (btn) btn.classList.toggle("open");
    if (menu) menu.classList.toggle("flex");

    setMobileMenuOpen((s) => !s);
  };

  const handleLinkClick = () => {
    // Only toggle the hamburger when mobile menu is open
    if (mobileMenuOpen) {
      menuToggle();
    }
    setOpenAccordion(null);
    setOpenMenu(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearCloseTimer();
    };
  }, []);

  const { navigate } = useNavigate()

  const gotoMarket = () => {
    navigate('/market/marketplace')
  }

  return (
    <div className={`md:py-8 ${!isScrolled && "p-0 md:p-5"} bg-[#e4f9e4]`}>
      <nav
        className={`shadow-md z-50 transition-all duration-300 bg-[var(--dark-primary)] py-5 md:py-1 ${isScrolled ? " fixed top-0 w-full" : "max-w-6xl m-auto md:rounded-lg"
          }`}
      >
        <div className="relative max-w-6xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/assets/svg/logo-primary.svg"
              alt="farmstarck logo"
              width={192}
              height={48}
              className="w-32 md:w-48"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-10 items-center">
            {menuItems.map((item: MenuItem, idx) => (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => item.submenu && handleItemEnter(idx)}
                onMouseLeave={() => item.submenu && handleItemLeave()}
              >
                {item.submenu ? (
                  <span className="flex cursor-pointer extra-loose items-center gap-1 font-subHeading ease-in-out duration-75 text-white hover:text-[#d4f5d5] transition">
                    {item.title}
                    <ChevronDown size={16} />
                  </span>
                ) : (
                  <Link
                    href="/about"
                    className="flex extra-loose items-center gap-1 font-subHeading ease-in-out duration-75 text-white hover:primary-txt transition"
                  >
                    {item.title}
                  </Link>
                )}

                {/* Submenu: visible when openMenu === idx */}
                {item.submenu && openMenu === idx && (
                  <div
                    className={`absolute ${idx === 0 ? "lg:-left-[365px] w-[1200px]" : "lg:-left-[480px] w-[1100px]"
                      } right-0 top-12 flex dark-primary-bg px-4 py-10 shadow-lg rounded-lg z-40`}
                    onMouseEnter={handleSubmenuEnter}
                    onMouseLeave={handleSubmenuLeave}
                  >
                    {item.submenu[0]?.description ? (
                      item.submenu.map((sub, sIdx) => (
                        <Link
                          href={sub.link}
                          key={sIdx}
                          onClick={handleLinkClick}
                          className="flex gap-3 items-center p-2 rounded w-1/4"
                        >
                          <Image
                            src={sub.img}
                            alt={sub.title}
                            width={64}
                            height={64}
                            className="rounded"
                          />

                          <div className="flex flex-col items-start gap-2">
                            <span className="font-subHeading2 text-white text-base">
                              {sub.title}
                            </span>
                            <span className="font-base text-white text-sm">
                              {sub.description}
                            </span>
                            {sub?.comingSoon && (
                              <span className="font-btnBody font-bold uppercase bg-[#FFBB28] p-1 rounded-sm dark-primary-txt text-[0.5rem]">
                                coming soon
                              </span>
                            )}
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="flex justify-between gap-3 space-y-4 flex-wrap">
                        {item.submenu.map((sub, sIdx) => (
                          <Link
                            href={sub.link}
                            key={sIdx}
                            className="flex gap-3 flex-col items-start w-1/5"
                            onClick={handleLinkClick}
                          >
                            <Image
                              src={sub.img}
                              alt={sub.title}
                              width={640}
                              height={640}
                              className="rounded"
                            />

                            <span className="font-subHeading2 text-white text-base w-full flex justify-between gap-2 items-center">
                              {sub.title}
                              <ArrowRight size={20} color="#00C700" />
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex gap-4">
            <Link
              href="/signin"
              className="px-7 py-2 bg-[var(--primary)] text-white text-base rounded-md font-btnBody transition-all duration-300 hover:bg-white hover:text-[var(--primary)]"
            >
              Sign In
            </Link>
            <Link
              href="/onboarding/signup"
              className="px-7 py-2 text-secondary-light bg-white text-base rounded-md font-btnBody transition-all duration-300 hover:bg-[var(--primary)]  hover:text-white text-[var(--primary)]"
            >
              Create Account
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div id="menu" className="flex  lg:hidden flex-row items-center gap-5 sm:self">
            <div
              onClick={gotoMarket}
              className={`${mobileMenuOpen ? 'hidden' : ''}`}>
              <ShoppingCart
                className="text-white cursor-pointer" />
            </div>
            <div className="w-full flex justify-end">
              <button
                id="menu-btn"
                className=" block hamburger focus:outline-none"
                onClick={menuToggle}
              >
                <span className="hamburger-top" style={{ background: "#fff" }}></span>
                <span className="hamburger-middle" style={{ background: "#fff" }}></span>
                <span className="hamburger-bottom" style={{ background: "#fff" }}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 py-6 bg-secondary-dark space-y-3">
            {menuItems.map((item: MenuItem, idx) => (
              <div key={idx}>
                <button
                  className="w-full text-left border-b border-b-secondary-cart flex justify-between items-center text-md transition font-subHeading text-white py-4"
                  onClick={() =>
                    setOpenAccordion(openAccordion === idx ? null : idx)
                  }
                >
                  {item.submenu ? (
                    item.title
                  ) : (
                    <Link onClick={handleLinkClick} href="/about">
                      {item.title}
                    </Link>
                  )}
                  {item.submenu && (
                    <ChevronDown
                      className={`transition-transform ${openAccordion === idx ? "rotate-180" : ""
                        }`}
                    />
                  )}
                </button>

                {openAccordion === idx && item.submenu && (
                  <div className="px-4 py-4  space-y-4 dark-green-bg h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-transparent">
                    {item.submenu[0]?.description ? (
                      item.submenu.map((sub, sIdx) => {
                        return (
                          <Link
                            href={sub.link}
                            key={sIdx}
                            onClick={handleLinkClick}
                            className="flex gap-3 items-center p-2 rounded"
                          >
                            <Image
                              src={sub.img}
                              alt={sub.title}
                              width={64}
                              height={64}
                              className="rounded"
                            />

                            <div className="flex flex-col items-start gap-2">
                              <span className="font-subHeading2 text-white text-base">
                                {sub.title}
                              </span>
                              <span className="font-base text-white text-sm">
                                {sub.description}
                              </span>
                              {sub?.comingSoon && (
                                <span className=" font-btnBody font-bold uppercase bg-[#FFBB28] p-1 rounded-sm dark-primary-txt text-[0.5rem]">
                                  coming soon
                                </span>
                              )}
                            </div>
                          </Link>
                        );
                      })
                    ) : (
                      <div className="flex justify-between gap-3 space-y-4 flex-wrap">
                        {item.submenu.map((sub, sIdx) => (
                          <Link
                            href={sub.link}
                            key={sIdx}
                            onClick={handleLinkClick}
                            className="flex gap-3 flex-col w-[130px] items-center "
                          >
                            <Image
                              src={sub.img}
                              alt={sub.title}
                              width={500}
                              height={500}
                              className="rounded w-full h-auto"
                            />

                            <span className="font-subHeading2 text-white text-base">
                              {sub.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Buttons */}
            <div className="pt-4  mt-4 flex flex-col gap-3">
              <Link
                href="signin"
                onClick={handleLinkClick}
                className="  w-full px-4 py-3 text-center bg-primary text-white text-base rounded-md font-btnBody transition-all duration-300 hover:bg-white hover:text-primary"
              >
                Sign In
              </Link>
              <Link
                href="/onboarding/signup"
                onClick={handleLinkClick}
                className="w-full px-4 py-3 text-center text-primary bg-white text-base rounded-md font-btnBody transition-all duration-300 hover:text-white hover:bg-primary"
              >
                Create Account
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
