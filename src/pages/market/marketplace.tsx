"use client";
import React, { useState, useEffect } from "react";
import MarketPlaceLayout from "@/layouts/MarketPlaceLayout";
import Image from "next/image";
import ShopByCategory from "@/components/common/MarketPlace/ShopByCategory";
import OtherProducts from "@/components/common/MarketPlace/OtherProducts";
import { useHydrateUserData } from "@/hooks/useHydrateUserData";

// Each slide contains 2 items
const ShopNowSlides = [
  {
    bg: "bg-[#ff6e6f]",
    btn_color: "bg-[#f61726]",
    txt: "Skip the hassle",
    btn_txt: "Shop Now",
    img: "/assets/images/marketplaces/veges.png",
    desc: "Get direct from farm produce delivered at your doorstep",
  },
  {
    bg: "bg-[#592b03]",
    btn_color: "bg-[#ffbb28]",
    btn_txt: "Request Quote",
    title: "YAM FULL GROUND OOO!",
    img: "/assets/images/marketplaces/yam.png",
    desc: "How many truck you need?",
  },

  {
    bg: "bg-[#34a853]",
    btn_color: "bg-[#1e7e34]",
    txt: "Fresh & Organic",
    btn_txt: "Buy Fresh",
    img: "/assets/images/marketplaces/veges.png",
    desc: "Premium organic vegetables from local farmers",
  },
  {
    bg: "bg-[#4285f4]",
    btn_color: "bg-[#1967d2]",
    btn_txt: "Order Now",
    title: "CASSAVA SEASON!",
    img: "/assets/images/marketplaces/yam.png",
    desc: "Best prices on fresh cassava tubers",
  },

  {
    bg: "bg-[#fbbc04]",
    btn_color: "bg-[#f29900]",
    txt: "Limited Offer",
    btn_txt: "Get Discount",
    img: "/assets/images/marketplaces/veges.png",
    desc: "Special discount on bulk vegetable orders",
  },
  {
    bg: "bg-[#ea4335]",
    btn_color: "bg-[#c5221f]",
    btn_txt: "Bulk Order",
    title: "PLANTAIN BONANZA!",
    img: "/assets/images/marketplaces/yam.png",
    desc: "Wholesale plantain at unbeatable prices",
  },

  {
    bg: "bg-[#9c27b0]",
    btn_color: "bg-[#7b1fa2]",
    txt: "Farm Direct",
    btn_txt: "Shop Now",
    img: "/assets/images/marketplaces/veges.png",
    desc: "Connect directly with farmers for fresh produce",
  },
  {
    bg: "bg-[#ff5722]",
    btn_color: "bg-[#e64a19]",
    btn_txt: "View Stock",
    title: "COCOYAM AVAILABLE!",
    img: "/assets/images/marketplaces/yam.png",
    desc: "Quality cocoyam in large quantities",
  },
];

const Marketplace = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const chunkArray = <T,>(array: T[], size: number): T[][] => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }

    return result;
  };

  const slides = chunkArray(ShopNowSlides, isDesktop ? 2 : 1);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Auto-change slides every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [slides.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  // Hydrate Cart and Wishlist on login
  useHydrateUserData();

  return (
    <div className="text-dark w-full  mx-auto  py-8">
      {/* Carousel Container */}
      <div className="w-11/12 lg:max-w-6xl mx-auto relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, slideIndex) => (
            <div key={slideIndex} className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {slide.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`${item.bg} text-white rounded-lg p-6 w-full flex items-center gap-4 h-[220px] md:h-[240px]`}
                  >
                    <div className="flex w-full md:w-1/2 flex-col gap-2">
                      {item.txt && <p className="text-normal">{item.txt}</p>}
                      {item.title && (
                        <h1 className="text-2xl font-bold">{item.title}</h1>
                      )}
                      <div className="text-xl">{item.desc}</div>
                      {/* <button className={`mt-4 text-sm px-8 py-2 mb-4 ${item.btn_color} rounded-full`}>
                        {item.btn_txt}
                      </button> */}
                    </div>
                    <div className="w-full md:w-1/2">
                      <Image
                        height={400}
                        width={300}
                        src={item.img}
                        className="w-auto h-auto max-w-full max-h-full object-contain"
                        alt={`market image ${itemIndex}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="w-11/12 lg:max-w-6xl flex items-center justify-center gap-3 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? "bg-primary w-5 h-3"
                : "border border-primary w-3 h-3 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Shops Category */}
      <ShopByCategory />
      <OtherProducts />
    </div>
  );
};

Marketplace.getLayout = (page: React.ReactNode) => (
  <MarketPlaceLayout>{page}</MarketPlaceLayout>
);

export default Marketplace;
