"use client"
import React, { useState, useEffect } from 'react'
import MarketPlaceLayout from '@/layouts/MarketPlaceLayout'
import Image from 'next/image'
import ShopByCategory from '@/components/common/MarketPlace/ShopByCategory'
import OtherProducts from '@/components/common/MarketPlace/OtherProducts'

// Each slide contains 2 items
const ShopNowSlides = [
  // Slide 1
  [
    {
      bg: "bg-[#ff6e6f]",
      btn_color: "bg-[#f61726]",
      txt: "Skip the hassle",
      btn_txt: "Shop Now",
      img: "/assets/images/marketplaces/veges.png",
      desc: "Get direct from farm produce delivered at your doorstep"
    },
    {
      bg: "bg-[#592b03]",
      btn_color: "bg-[#ffbb28]",
      btn_txt: "Request Quote",
      title: "YAM FULL GROUND OOO!",
      img: "/assets/images/marketplaces/yam.png",
      desc: "How many truck you need?"
    }
  ],
  // Slide 2
  [
    {
      bg: "bg-[#34a853]",
      btn_color: "bg-[#1e7e34]",
      txt: "Fresh & Organic",
      btn_txt: "Buy Fresh",
      img: "/assets/images/marketplaces/veges.png",
      desc: "Premium organic vegetables from local farmers"
    },
    {
      bg: "bg-[#4285f4]",
      btn_color: "bg-[#1967d2]",
      btn_txt: "Order Now",
      title: "CASSAVA SEASON!",
      img: "/assets/images/marketplaces/yam.png",
      desc: "Best prices on fresh cassava tubers"
    }
  ],
  // Slide 3
  [
    {
      bg: "bg-[#fbbc04]",
      btn_color: "bg-[#f29900]",
      txt: "Limited Offer",
      btn_txt: "Get Discount",
      img: "/assets/images/marketplaces/veges.png",
      desc: "Special discount on bulk vegetable orders"
    },
    {
      bg: "bg-[#ea4335]",
      btn_color: "bg-[#c5221f]",
      btn_txt: "Bulk Order",
      title: "PLANTAIN BONANZA!",
      img: "/assets/images/marketplaces/yam.png",
      desc: "Wholesale plantain at unbeatable prices"
    }
  ],
  // Slide 4
  [
    {
      bg: "bg-[#9c27b0]",
      btn_color: "bg-[#7b1fa2]",
      txt: "Farm Direct",
      btn_txt: "Shop Now",
      img: "/assets/images/marketplaces/veges.png",
      desc: "Connect directly with farmers for fresh produce"
    },
    {
      bg: "bg-[#ff5722]",
      btn_color: "bg-[#e64a19]",
      btn_txt: "View Stock",
      title: "COCOYAM AVAILABLE!",
      img: "/assets/images/marketplaces/yam.png",
      desc: "Quality cocoyam in large quantities"
    }
  ]
]

const Marketplace = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-change slides every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ShopNowSlides.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleDotClick = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className='text-dark w-full  mx-auto  py-8'>
      {/* Carousel Container */}
      <div className="w-11/12 lg:max-w-6xl mx-auto relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {ShopNowSlides.map((slide, slideIndex) => (
            <div 
              key={slideIndex}
              className="w-full flex-shrink-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {slide.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className={`${item.bg} text-white rounded-lg pl-4 min-h-52 pt-2 w-full flex items-center gap-1`}
                  >
                    <div className="flex w-1/2 items-start flex-col gap-2">
                      {item.txt && <p className='text-normal'>{item.txt}</p>}
                      {item.title && <h1 className='text-2xl font-bold'>{item.title}</h1>}
                      <div className="text-xl">{item.desc}</div>
                      <button className={`mt-4 text-sm px-8 py-2 mb-4 ${item.btn_color} rounded-full`}>
                        {item.btn_txt}
                      </button>
                    </div>
                    <div className="w-1/2">
                      <Image
                        height={400}
                        width={300}
                        src={item.img}
                        className='w-auto h-auto max-w-full max-h-full object-contain'
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
        {ShopNowSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index 
                ? 'bg-primary w-5 h-3' 
                : 'border border-primary w-3 h-3 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>


      {/* Shops Category */}
      <ShopByCategory/>
      <OtherProducts/>
    </div>
  )
}

Marketplace.getLayout = (page: React.ReactNode) => (
  <MarketPlaceLayout>{page}</MarketPlaceLayout>
)

export default Marketplace