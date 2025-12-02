"use client"
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const categories = [
    {
        img: '/assets/images/marketplaces/food.png',
        title: "Food",
        slug: "foods"
    },
    {
        img: '/assets/images/marketplaces/feeds.png',
        title: "Animal Feed & Supplement",
        slug: 'animal-feeds'
    },
    {
        img: '/assets/images/marketplaces/oil.png',
        title: "Agro Chemicals",
        slug: 'agro-chemicals'
    },
    {
        img: '/assets/images/marketplaces/tracktor.png',
        title: "Machinery & Equipment",
        slug: 'machinery-and-equipments'
    },

]

const ShopByCategory = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All Categories')


    return (
        <div className="mt-6 w-11/12 lg:max-w-6xl mx-auto">
            <div className="mb-4">
                <div className="text-start font-bold text-2xl">Shop by Category</div>
            </div>

            <div className="w-full">
                {/* Category Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Category Items */}
                    {categories.map((item, i) => (
                        <Link
                            key={i}
                            href={`/market/marketplace/${item.slug}`}
                            onClick={() => { setSelectedCategory(item.title) }}
                            className={`flex  items-center  bg-gray-50 gap-3 p-4 rounded-lg border-2 transition-all hover:shadow-md ${selectedCategory === item.title
                                    ? 'border-[#00C700] bg-lite'
                                    : 'border-gray-200 hover:border-[#00C700]'
                                }`}
                        >
                            <div className="w-10 h-10  relative">
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xs md:text-sm  text-start font-medium">
                                {item.title}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ShopByCategory