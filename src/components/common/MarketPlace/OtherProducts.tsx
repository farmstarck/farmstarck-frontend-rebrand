"use client"
import React from 'react'
import Image from 'next/image'
import { ShoppingCart, Heart, MapPin, Headphones, Smartphone, ShieldCheck, BadgeCheck, Truck, BadgeDollarSign } from 'lucide-react'
import { AllProducts } from '@/data/ProductsData'
import { useCartStore, useWishlistStore } from '@/store/Client/CartSlice'
import { SuccessMessage } from '@/utils/PageUtils'
import Button from '@/ui/Button'
import { useRouter } from 'next/router'
import { productsProps } from '@/types/products'

const Features = [
    {
        title: 'Great Value',
        icon: BadgeDollarSign,
        desc: 'Competitive prices on over 3 thousands of items.'
    },
    {
        title: 'Nationwide Shipping',
        desc: 'We ship to over 10 states and regions in Nigeria',
        icon: Truck
    },
    {
        title: 'Secure Payment',
        desc: 'Pay with the most popular and secure payment methods.',
        icon: ShieldCheck
    },
    {
        title: 'Buyer Protection Policy',
        desc: 'Protection policy covers all your purchase journey.',
        icon: BadgeCheck
    },
    {
        title: 'Help Center',
        desc: '24/7 assistance for a smooth shopping experience.',
        icon: Headphones
    },
    {
        title: 'Shop Better',
        desc: 'Our Mobile App is coming soon for the best experience.',
        icon: Smartphone
    }
]

const ProductCard = ({ product }: { product: productsProps }) => {
    const { addToCart, cart, removeFromCart } = useCartStore()
    const { addToWishlist, removeFromWishlist, wishlist } = useWishlistStore()

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
        }).format(price)
    }

    // Add/Remove from Cart
    const addToCartFunction = (item: productsProps) => {
        const foundItem = cart.find(it => it.id === item.id)
        if (foundItem) {
            removeFromCart(item.id)
            SuccessMessage('Item removed from cart')
        } else {
            addToCart(item)
            SuccessMessage('Item added to cart')
        }
    }

    // Add/Remove from Wishlist (FIXED FUNCTION)
    const toggleWishlist = (item: productsProps) => {
        const foundWish = wishlist.find(it => it.id === item.id)
        if (foundWish) {
            removeFromWishlist(item.id) // Fixed: was removeFromCart
            SuccessMessage('Item removed from wishlist')
        } else {
            addToWishlist(item) // Fixed: was addToCart
            SuccessMessage('Item added to wishlist')
        }
    }

    const idFound = cart.some(item => item.id === product.id)
    const isWishlisted = wishlist.some(item => item.id === product.id)

    return (
        <div className='bg-white satoshi rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full '>
            {/* Image Container */}
            <div className='relative w-full h-40'>
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className='object-contain pt-2'
                />
            </div>

            {/* Content */}
            <div className='p-4 flex flex-col flex-grow relative'>
                <div className='w-fit flex items-center gap-1 bg-[#a5faa5] text-primary py-1 text-[10px] font-medium px-3 rounded-full'>
                    <Image
                        width={8}
                        height={8}
                        src='/assets/images/marketplaces/productIcon.png'
                        alt='size image'
                    />
                    {product.size}
                </div>
                <h3 className='font-semibold text-base mb-1 line-clamp-2 mt-2'>{product.title}</h3>

                {/* Price */}
                <div className='text-[#00C700] font-bold text-lg mb-2'>
                    {formatPrice(product.amountFrom)} - {formatPrice(product.amountTo)}
                </div>

                {/* Location */}
                <div className='flex items-center gap-1 text-gray-500 text-sm mb-4'>
                    <MapPin size={14} />
                    <span>{product.location}</span>
                </div>
                <hr className="my-3 border-0.5  border-gray-300" />

                {/* Actions */}
                <div className="flex items-center gap-2 mt-auto">
                    {/* ADD TO CART BUTTON */}
                    <button
                        onClick={() => addToCartFunction(product)}
                        className={`flex-1 border rounded-lg py-2 px-4 flex items-center justify-center gap-2 transition-all duration-300 text-sm font-medium ${idFound
                            ? "border-primary bg-primary text-white"
                            : "border-primary text-primary hover:bg-primary hover:text-white"
                            }`}
                    >
                        <ShoppingCart size={16} />
                        {idFound ? "Added" : "Add"}
                    </button>

                    {/* WISHLIST BUTTON - FIXED STYLING */}
                    <button
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${isWishlisted
                            ? "bg-[#00C700] border-[#00C700]"
                            : " bg-red-500"
                            }`}
                        onClick={() => toggleWishlist(product)}
                    >
                        <Heart
                            size={14}
                            className={`fill-white text-white transition-all`}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

const OtherProducts = () => {

    const router = useRouter()
    const switchPage = (route: string) => {
        router.push(route)
    }
    return (
        <div className='w-full py-8'>
            <div className='w-11/12 lg:max-w-6xl mx-auto flex items-start flex-col gap-10'>
                {/* All Products Section */}
                <div className=' w-full'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-2xl font-bold text-gray-900'>All Products</h2>
                        <button
                            onClick={() => switchPage('marketplace/allproducts')}
                            className='text-[#00C700] font-medium hover:underline text-sm'>
                            View All
                        </button>
                    </div>

                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                        {AllProducts.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                </div>

                {/* Most Viewed Products Section */}
                <div className='w-full'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-2xl font-bold text-gray-900'>Most Viewed Products</h2>
                        <button
                            onClick={() => switchPage('marketplace/most_viewed')}
                            className='text-[#00C700] font-medium hover:underline text-sm'>
                            View All
                        </button>
                    </div>

                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                        {AllProducts.slice(0, 5).map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                </div>

                <div className="w-full mt-10 bg-primary p-4  rounded-lg flex items-start lg:items-center gap-5 flex-col lg:flex-row">
                    <div className="w-full h-72 lg:h-96 lg:w-1/2 relative">
                        <Image src='/assets/images/marketplaces/foodVeges.png' alt='food image' fill />
                    </div>
                    <div className="w-full lg:w-1/2 max-w-md flex items-start flex-col gap-5">
                        <h2 className='leading-normal font-bold text-white text-2xl'>Buy and Pay directly from whatsapp, and get your produce delivered at your doorstep </h2>
                        <Button label='Order Now' textClass='!bg-yellowish text-sm text-dark-green' />
                    </div>
                </div>

                <div className='w-full '>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-2xl font-bold text-gray-900'>Best Selling Products</h2>
                        <button
                            onClick={() => switchPage('marketplace/best_selling')}
                            className='text-[#00C700] font-medium hover:underline text-sm'>
                            View All
                        </button>
                    </div>

                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                        {AllProducts.slice(0, 5).map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full bg-white p-10 my-10 lg:py-20 ">
                <div className="w-11/12 mx-auto flex lg:items-center gap-10 flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2 flex items-start flex-col gap-4">
                        <div className="text-4xl font-bold max-w-md">Looking for a product that is not listed here?</div>
                        <p className='font-medium satoshi'>Request the product right away and we will help you source for it</p>
                        <Button label='Request a Product' />
                    </div>
                    <div className="w-full lg:w-1/2 lg:h-96 h-72 relative">
                        <Image src='/assets/images/marketplaces/vegetables.png' alt='veges image' fill />
                    </div>
                </div>
            </div>

            <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {Features.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                        <div
                            key={index}
                            className="flex items-center flex-col gap-3 p-4 rounded-lg  "
                        >
                            <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className='flex items-center flex-col'>
                                <h3 className="font-extrabold text-lg">{feature.title}</h3>
                                <p className="font-normal text-sm max-w-2/3 text-center">{feature.desc}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default OtherProducts