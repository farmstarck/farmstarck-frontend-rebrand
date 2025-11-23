"use client"
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const categories = [
    {
        img: '/assets/images/marketplaces/food.png',
        title: "Food"
    },
    {
        img: '/assets/images/marketplaces/feeds.png',
        title: "Animal Feed & Supplement"
    },
    {
        img: '/assets/images/marketplaces/oil.png',
        title: "Agro Chemicals"
    },
    {
        img: '/assets/images/marketplaces/tracktor.png',
        title: "Machinery & Equipment"
    },

]

const ShopByCategory = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [selectedCategory, setSelectedCategory] = useState<string>('All Categories')
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(true)

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300
            const newScrollLeft = direction === 'left'
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            })
        }
    }

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
            setShowLeftArrow(scrollLeft > 0)
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    return (
        <div className="mt-6 w-11/12 lg:max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
                <div className="text-start font-bold text-2xl">Shop by Category</div>

                {/* Desktop Arrow Controls */}
                <div className="hidden md:flex items-center gap-2 ">
                    <button
                        onClick={() => scroll('left')}
                        disabled={!showLeftArrow}
                        className={`p-1 rounded-full border transition-all ${showLeftArrow
                                ? 'border-gray-300 hover:border-[#00C700] hover:bg-[#00C700] hover:text-white'
                                : 'border-gray-200 text-gray-300 cursor-not-allowed'
                            }`}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        disabled={!showRightArrow}
                        className={`p-2 rounded-full border transition-all ${showRightArrow
                                ? 'border-gray-300 hover:border-[#00C700] hover:bg-[#00C700] hover:text-white'
                                : 'border-gray-200 text-gray-300 cursor-not-allowed'
                            }`}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="relative w-full">
               

                {/* Scrollable Container */}
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="w-full flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >


                    {/* Category Items */}
                    {categories.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedCategory(item.title)}
                            className={`lg:min-w-24 items-center flex bg-gray-50 justify-center gap-2 p-2 rounded-lg border-2 transition-all ${selectedCategory === item.title
                                    ? 'border-[#00C700] bg-lite'
                                    : 'border-gray-200 hover:border-[#00C700]'
                                }`}
                        >
                            <div className="w-10 h-10 relative">
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xs lg:text-base text-start font-medium ">
                                {item.title}
                            </span>
                        </button>
                    ))}

                    {/* All Categories Button */}
                    <button
                        onClick={() => setSelectedCategory('All Categories')}
                        className={``}
                    >
                    <span className={`${selectedCategory === 'All Categories' ? 'bg-primary text-white ':'border-2  text-dark bg-white border-gray-200 hover:border-[#00C700]' } lg:text-base text-xs truncate py-5 lg:py-4 px-8 rounded-md font-medium text-center`}>All Categories</span>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ShopByCategory