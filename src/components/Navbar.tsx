import { useEffect, useState } from "react";
import LogoDarkImg from "../assets/svg/logo-primary.svg";
import ProductImg1 from "../assets/images/product-menu1.png";
import ProductImg2 from "../assets/images/product-menu2.png";
import ProductImg3 from "../assets/images/product-menu3.png";
import ProductImg4 from "../assets/images/product-menu4.png";
import JourneyImg1 from "../assets/images/journey-menu1.png";
import JourneyImg2 from "../assets/images/journey-menu2.png";
import JourneyImg3 from "../assets/images/journey-menu3.png";
import JourneyImg4 from "../assets/images/journey-menu4.png";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
type SubMenuItem = {
  img: string | StaticImageData;
  title: string;
  link: string;
  description?: string;
  comingSoon?: boolean;
};

type MenuItem = {
  title: string;
  submenu?: SubMenuItem[];
};

const menuItems = [
  {
    title: "Our Products",
    submenu: [
      {
        img: ProductImg1,
        title: "Market Place",
        description:
          "Get direct from farm & agro-processed produce delivered at your doorstep",
        link: "marketplace",
        comingSoon: false,
      },
      {
        img: ProductImg2,
        title: "Procurement",
        description:
          "Streamline your agricultural supply chain with tailored procurement solutions",
        link: "procurement",
        comingSoon: false,
      },
      {
        img: ProductImg3,
        title: "Food Vault",
        description:
          "Our Food Vault helps you securely save for food purchases while earning exclusive benefits",
        link: "foodvault",
        comingSoon: false,
      },
      {
        img: ProductImg4,
        title: "Smart Inventory",
        description: "Manage all your agricultural assets in one place",
        link: "inventory",
        comingSoon: true,
      },
    ],
  },
  {
    title: "Your Journey",
    submenu: [
      { img: JourneyImg1, title: "Farmer", link: "farm-empowerment" },
      { img: JourneyImg2, title: "Merchant", link: "become-merchant" },
      { img: JourneyImg3, title: "Business", link: "business" },
      { img: JourneyImg4, title: "Investment", link: "investment" },
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

  const menuToggle = () => {
    const menu = document.getElementById("menu")!;
    const btn = document.getElementById("menu-btn")!;

    btn.classList.toggle("open");
    menu.classList.toggle("flex");
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setOpenAccordion(null); // Optionally close open accordion too
    menuToggle();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`md:py-8 ${!isScrolled && "p-0 md:p-5"} bg-secondary-navBg`}
    >
      <nav
        className={`shadow-md  z-50 transition-all duration-300 bg-secondary-dark py-5 md:py-0 ${
          isScrolled ? " fixed top-0 w-full" : "max-w-6xl m-auto md:rounded-lg"
        }`}
      >
        <div className="relative max-w-6xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <img
              src={LogoDarkImg}
              className="w-32 md:w-48"
              alt="farmstarck logo"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-10 items-center">
            {menuItems.map((item: MenuItem, idx) => (
              <div className="group relative" key={idx}>
                <div className="flex flex-col group">
                  {item.submenu ? (
                    <>
                      <span className="flex cursor-pointer extra-loose items-center gap-1 font-subHeading ease-in-out duration-75 text-white hover:text-secondary-light transition">
                        {item.title}
                        <ChevronDown size={16} />
                      </span>
                    </>
                  ) : (
                    <Link
                      href="/about"
                      className="flex extra-loose items-center gap-1 font-subHeading ease-in-out duration-75 text-white hover:text-secondary-light transition"
                    >
                      {item.title}
                    </Link>
                  )}

                  {item.submenu && (
                    <div
                      className={`absolute  ${
                        idx === 0
                          ? "lg:-left-[350px] w-[1200px]"
                          : "lg:-left-[480px] w-[1100px]"
                      } right-0 top-full hidden group-hover:flex bg-secondary-dark px-4 py-10 shadow-lg border rounded-lg z-40`}
                    >
                      {item.submenu[0]?.description ? (
                        item.submenu.map((sub, sIdx) => {
                          return (
                            <Link
                              href={sub.link}
                              key={sIdx}
                              onClick={handleLinkClick}
                              className="flex gap-3 items-center p-2 rounded w-1/4"
                            >
                              <Image
                                src={sub.img}
                                alt={sub.title}
                                className="w-16 h-16 rounded"
                              />
                              <div className="flex flex-col items-start gap-2">
                                <span className="font-subHeading2 text-white text-base">
                                  {sub.title}
                                </span>
                                <span className="font-base text-white text-sm">
                                  {sub.description}
                                </span>
                                {sub?.comingSoon && (
                                  <span className=" font-btnBody font-bold uppercase bg-[#FFBB28] p-1 rounded-sm text-secondary-dark text-[0.5rem]">
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
                              className="flex gap-3 flex-col items-start w-1/5"
                              onClick={handleLinkClick}
                            >
                              <Image
                                src={sub.img}
                                alt={sub.title}
                                className="w-full h-full rounded"
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
              </div>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex gap-4">
            <Link
              href="/signin"
              className="px-7 py-2 bg-secondary-light text-white text-base rounded-md font-btnBody transition-all duration-300 hover:bg-white hover:text-secondary-light"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-7 py-2 text-secondary-light bg-white text-base rounded-md font-btnBody transition-all duration-300 hover:text-white hover:bg-secondary-light"
            >
              Create Account
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div
            id="menu"
            className="flex lg:hidden flex-col items-start sm:self"
          >
            <div className="w-full flex justify-end">
              <button
                id="menu-btn"
                className=" block hamburger focus:outline-none"
                onClick={menuToggle}
              >
                <span
                  className="hamburger-top"
                  style={{
                    background: "#fff",
                  }}
                ></span>
                <span
                  className="hamburger-middle"
                  style={{
                    background: "#fff",
                  }}
                ></span>
                <span
                  className="hamburger-bottom"
                  style={{
                    background: "#fff",
                  }}
                ></span>
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
                    <Link onClick={handleLinkClick} href="about">
                      {item.title}
                    </Link>
                  )}
                  {item.submenu && (
                    <ChevronDown
                      className={`transition-transform ${
                        openAccordion === idx ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {openAccordion === idx && item.submenu && (
                  <div className="px-4 py-4  space-y-4 bg-secondary-veryDark h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-transparent">
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
                              className="w-16 h-16 rounded"
                            />
                            <div className="flex flex-col items-start gap-2">
                              <span className="font-subHeading2 text-white text-base">
                                {sub.title}
                              </span>
                              <span className="font-base text-white text-sm">
                                {sub.description}
                              </span>
                              {sub?.comingSoon && (
                                <span className=" font-btnBody font-bold uppercase bg-[#FFBB28] p-1 rounded-sm text-secondary-dark text-[0.5rem]">
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
                              className="w-full h-full rounded"
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
                href="#"
                onClick={handleLinkClick}
                className="  w-full px-4 py-3 text-center bg-secondary-light text-white text-base rounded-md font-btnBody transition-all duration-300 hover:bg-white hover:text-secondary-light"
              >
                Sign In
              </Link>
              <Link
                href="#"
                onClick={handleLinkClick}
                className="w-full px-4 py-3 text-center text-secondary-light bg-white text-base rounded-md font-btnBody transition-all duration-300 hover:text-white hover:bg-secondary-light"
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
