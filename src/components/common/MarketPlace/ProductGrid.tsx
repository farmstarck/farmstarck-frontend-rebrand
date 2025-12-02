import React, { useState } from "react";
import { productsProps } from "@/types/products";
import { Heart, ShoppingCart, MapPin } from "lucide-react";
import Image from "next/image";
import { useCartStore, useWishlistStore } from "@/store/Client/CartSlice";
import { SuccessMessage } from "@/utils/PageUtils";
import { useNavigate } from "@/hooks/useNavigate";

export interface ProductsGridProps {
    products: productsProps[];
    url: string
}

export const ProductsGrid: React.FC<ProductsGridProps> = ({ products, url }) => {
    const { addToCart, cart, removeFromCart } = useCartStore();
    const { addToWishlist, removeFromWishlist, wishlist } = useWishlistStore();
    const { navigate } = useNavigate()

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
        }).format(price);
    };

    // Add/Remove from Cart
    const addToCartFunction = (item: productsProps) => {
        const foundItem = cart.find(it => it.id === item.id);
        if (foundItem) {
            removeFromCart(item.id);
            SuccessMessage('Item removed from cart');
        } else {
            addToCart(item);
            SuccessMessage('Item added to cart');
        }
    };

    // Add/Remove from Wishlist
    const toggleWishlist = (item: productsProps) => {
        const foundWish = wishlist.find(it => it.id === item.id);
        if (foundWish) {
            removeFromWishlist(item.id);
            SuccessMessage('Item removed from wishlist');
        } else {
            addToWishlist(item);
            SuccessMessage('Item added to wishlist');
        }
    };



    // Empty state
    if (products.length === 0) {
        return (
            <div className="flex satoshi flex-col items-center justify-center py-16 px-4">
                <div className="w-52 h-52 mb-6 relative">
                    <Image
                        fill
                        src={'/assets/images/marketplaces/notfound.png'}
                        alt="not found img"
                    />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h3>
                <p className="text-gray-500 text-center max-w-md">
                    We couldn't find any products matching your filters. Try adjusting your search criteria or browse all products.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 satoshi lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => {
                const idFound = cart.some(item => item.id === product.id);
                const isWishlisted = wishlist.some(item => item.id === product.id);
                

                return (
                    <div
                        className='bg-white satoshi pb-4 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full '>
                        <div
                            onClick={() => navigate(`${url}/${product.category}/${product.id}`)}
                            className="flex items-start cursor-pointer  flex-col ">
                            {/* Image Container */}
                            <div className='relative w-full h-72 lg:h-40'>
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className='object-contain pt-2'
                                />
                            </div>
                            {/* Content */}
                            <div className='px-3 pt-3 flex flex-col flex-grow relative'>
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
                                <div className='text-[#00C700] font-bold text-base mb-2'>
                                    {formatPrice(product.amount)}
                                </div>

                                {/* Location */}
                                <div className='flex items-center gap-1 text-gray-500 text-sm mb-4'>
                                    <MapPin size={14} />
                                    <span>{product.location}</span>
                                </div>
                            </div>


                        </div>
                        <div className="w-11/12 mx-auto ">
                            <hr className="mb-3 border-0.5  border-gray-300" />

                            {/* Actions */}
                            <div className="flex items-center gap-2 mt-auto">
                                {/* ADD TO CART BUTTON */}
                                <button
                                    onClick={() => addToCartFunction(product)}
                                    className={`flex-1 text-sm border rounded-lg py-2 px-4 flex items-center justify-center gap-2 transition-all duration-300  font-medium ${idFound
                                        ? "border-primary bg-primary text-white"
                                        : "border-primary text-primary hover:bg-primary hover:text-white"
                                        }`}
                                >
                                    <ShoppingCart size={16} />
                                    {idFound ? "Remove" : "Add"}
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
                );
            })}
        </div>
    );
};