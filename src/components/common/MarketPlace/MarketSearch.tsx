"use client"
import React from 'react'
import Image from 'next/image'
import { ShoppingCartIcon, HeartIcon, UserIcon } from '@heroicons/react/24/outline'
import { ShoppingCartIcon as ShoppingCartSolidIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useCartStore, useWishlistStore } from '@/store/Client/CartSlice'
import CustomSearch from './CustomSearch'
import { useNavigate } from '@/hooks/useNavigate'
import Link from 'next/link'

const MarketSearch = () => {
    const { cart } = useCartStore()
    const { wishlist } = useWishlistStore()


    // Check if cart and wishlist have items
    const hasItemsInCart = cart.length > 0
    const hasFavorites = wishlist.length > 0
    const { navigate } = useNavigate()


    return (
        <div className='bg-dark-primary w-full p-5  text-white flex items-center justify-between'>
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
            <div className='flex items-center gap-4'>
                {/* Cart Button with Count */}
                <button
                    onClick={() => navigate('/market/marketplace/cart-items')}
                    className='flex items-center gap-2 text-white hover:opacity-80 transition-opacity'>
                    <div
                        className='relative'>
                        {hasItemsInCart ? (
                            <ShoppingCartSolidIcon
                                className='w-6 h-6' />
                        ) : (
                            <ShoppingCartIcon className='w-6 h-6' />
                        )}
                        {hasItemsInCart && (
                            <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 font-semibold'>
                                {cart.length > 99 ? '99+' : cart.length}
                            </span>
                        )}
                    </div>
                </button>

                {/* Wishlist Button with Count */}
                <button 
                onClick={() => navigate('/market/marketplace/wishlist-items')}
                className='flex items-center gap-2 text-white hover:opacity-80 transition-opacity'>
                    <div className='relative'>
                        {hasFavorites ? (
                            <HeartSolidIcon className='w-6 h-6' />
                        ) : (
                            <HeartIcon className='w-6 h-6' />
                        )}
                        {hasFavorites && (
                            <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 font-semibold'>
                                {wishlist.length > 99 ? '99+' : wishlist.length}
                            </span>
                        )}
                    </div>
                </button>

                {/* Sign In Button */}
                <Link
                href={'/signin'}
                className='flex items-center gap-2 text-white hover:opacity-80 transition-opacity'>
                    <UserIcon className='w-6 h-6' />
                    <span className='hidden md:inline'>Sign In</span>
                </Link>
            </div>
        </div>
    )
}

export default MarketSearch