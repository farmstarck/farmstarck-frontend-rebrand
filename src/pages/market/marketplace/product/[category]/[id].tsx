import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, MessageCircle, Minus, Plus, Star } from 'lucide-react';
import { useRouter } from 'next/router';
import { AllProducts } from '@/data/ProductsData';
import Image from 'next/image';
import MarketPlaceLayout from '@/layouts/MarketPlaceLayout';
import Navigation from '@/components/common/MarketPlace/Navigation';
import { productsProps } from '@/types/products';
import { useCartStore, useWishlistStore } from '@/store/Client/CartSlice';
import { SuccessMessage } from '@/utils/PageUtils';
import BaseLoader from '@/Loaders/BaseLoader';
import DeliveryAccordion from '@/components/common/MarketPlace/DeliveryAccordion';
import { ProductsGrid } from '@/components/common/MarketPlace/ProductGrid';

// Hardcoded seller data
const SELLER_INFO = {
    name: "Marof Enterprise",
    rating: 4.5,
    reviewCount: 20,
    sku: 'FOO-LIV-000679',
};

// Hardcoded reviews
const PRODUCT_REVIEWS = [
    {
        id: 1,
        title: "John Doe",
        rating: 5,
        comment: "The eggs are so big and healthy, I saved over N6,000 from my last purchase",
        date: "22/06/2025"
    },
    {
        id: 2,
        title: "Malechi Chidera",
        rating: 3,
        comment: "I got few big ones and few medium size instead of all",
        date: "22/06/2025"
    }
];

const ProductDetailPage = () => {
    const { addToCart, cart, removeFromCart, updateQuantity } = useCartStore()
    const { addToWishlist, wishlist, removeFromWishlist } = useWishlistStore()
    const router = useRouter();
    const { category, id } = router.query;

    // State
    const [quantities, setQuantities] = useState<{ [key: number]: number }>(
        cart.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
    );
    const [selectedImage, setSelectedImage] = useState(0);
    const [product, setProduct] = useState<productsProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [isInCart, setIsInCart] = useState(false);
    const [categorySlug, setCategorySlug] = useState('')
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [categoryName, setCategoryName] = useState("");


    useEffect(() => {
        if (category) {
            if (category === 'Food') {
                setCategorySlug('foods')
            }
            else if (category.includes('Animal Feed')) {
                setCategorySlug('animal-feeds')
            }
            else if (category.includes('Agro Chemicals')) {
                setCategorySlug('agro-chemicals')
            } else {
                setCategorySlug('machinery-and-equipments')
            }
        }
    }, [category])

    // Single useEffect to handle all data fetching
    useEffect(() => {
        if (!router.isReady) return;

        // Safely extract query params
        const productId = Array.isArray(id) ? id[0] : id;
        const categoryParam = Array.isArray(category) ? category[0] : category;

        if (!productId) {
            setLoading(false);
            return;
        }

        // Find product
        const foundProduct = AllProducts.find(item => item.id === Number(productId));
        setProduct(foundProduct || null);

        // Check cart
        const foundInCart = cart.find(item => item.id === Number(productId));
        setIsInCart(!!foundInCart);

        // Check wishlist
        const foundInWishlist = wishlist.find(item => item.id === Number(productId));
        setIsWishlisted(!!foundInWishlist);

        // Set category name
        if (categoryParam) {
            setCategoryName(categoryParam.replace(/-/g, " "));
        } else if (foundProduct?.category) {
            setCategoryName(foundProduct.category);
        }

        setLoading(false);
    }, [router.isReady, id, category, cart, wishlist]);


    const handleQuantityChange = (id: number, value: number) => {
        if (value < 1) return;
        setQuantities(prev => ({ ...prev, [id]: value }));
        updateQuantity(id, value);
    };

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                size={16}
                className={index < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}
            />
        ));
    };



    // Add/Remove from Cart
    const addToCartFunction = (item: productsProps) => {
        const foundItem = cart.find(it => it.id === item.id);
        if (foundItem) {
            removeFromCart(item.id);
            SuccessMessage('Item removed from cart');
            setIsInCart(false);
        } else {
            addToCart(item);
            SuccessMessage('Item added to cart');
            setIsInCart(true);
        }
    };

    // Add/Remove from Wishlist
    const toggleWishlist = (item: productsProps) => {
        const foundWish = wishlist.find(it => it.id === item.id);
        if (foundWish) {
            removeFromWishlist(item.id);
            SuccessMessage('Item removed from wishlist');
            setIsWishlisted(false);
        } else {
            addToWishlist(item);
            SuccessMessage('Item added to wishlist');
            setIsWishlisted(true);
        }
    };

    // Loading state
    if (loading || !router.isReady) {
        return (
            <>
                <BaseLoader />
            </>
        );
    }

    const OtherProducts = AllProducts.filter(prod => prod.id !== Number(product?.id))
    // Product not found state
    if (!product) {
        return (
            <div className="min-h-screen bg-[#E8F5E9] py-6">
                <div className="max-w-7xl  mx-auto px-4">
                    <div className="flex flex-col items-center justify-center h-[60vh]">
                        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShoppingCart className="text-red-500" size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
                            <p className="text-gray-600 mb-6">
                                Sorry, we couldn't find the product you're looking for. It may have been removed or the ID is incorrect.
                            </p>
                            <button
                                onClick={() => router.push('/market/marketplace')}
                                className="bg-[#00C700] text-white px-6 py-3 rounded-lg  hover:bg-[#00B000] transition-colors"
                            >
                                Back to Marketplace
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Create image gallery (using same image 4 times for now)
    const images = Array(4).fill(product.image);
    // console.log(category)
    return (
        <div className="min-h-screen satoshi bg-lite py-3 lg:py-5">
            <div className="lg:max-w-7xl  mx-auto px-4">
                <div className="mb-5">
                    <Navigation
                        routes={[
                            { name: categoryName, href: `/market/marketplace/${categorySlug}` },
                            { name: product.title, href: `#` }
                        ]}
                    />
                </div>

                {/* Main Product Section */}
                <div className="rounded-lg p-1 lg:p-5 mb-6 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
                        {/* Left - Images */}
                        <div className="flex  md:flex-row flex-col-reverse gap-4 md:gap-6 w-full">
                            {/* Thumbnail Column */}
                            <div className="flex md:flex-col flex-row gap-3 md:overflow-visible overflow-x-auto scrollbar-hide">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 overflow-hidden transition-all duration-300 flex-shrink-0 p-0.5 ${selectedImage === index
                                            ? 'border-primary bg-primary bg-opacity-10'
                                            : 'border-gray-200 hover:border-primary hover:bg-gray-50'
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Product ${index + 1}`}
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-cover rounded-md transition-transform duration-300 hover:scale-105"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Main Image Container */}
                            <div className="flex-1">
                                <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 p-2 h-[300px] md:h-full">
                                    {/* Main Image */}
                                    <div className="relative h-full">
                                        <Image
                                            src={images[selectedImage]}
                                            alt={product.title}
                                            fill
                                            className="object-contain rounded-lg"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>

                                    {/* Wishlist Button */}
                                    <button
                                        onClick={() => toggleWishlist(product)}
                                        className={`absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${isWishlisted
                                            ? "bg-primary hover:bg-primary/90"
                                            : "bg-red-500 hover:bg-red-600"
                                            }`}
                                    >
                                        <Heart
                                            size={14}
                                            className="text-white fill-white"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right - Product Info */}
                        <div>
                            <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                            <p className="text-sm text-gray-500 mb-4">SKU: {SELLER_INFO.sku}</p>

                            <div className="mb-6">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-2xl md:text-4xl font-bold text-[#00C700]">
                                        ₦{product.amount.toLocaleString()}.00
                                    </span>
                                    {product.discount && (
                                        <span className="text-lg md:text-xl text-gray-400 line-through">
                                            ₦{product.discount.toLocaleString()}.00
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="mb-6 w-full">
                                <div className="flex items-center justify-between w-full gap-2 bg-white rounded-lg p-1 lg:w-fit">
                                    <button
                                        onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) - 1)}
                                        disabled={(quantities[product.id] || 1) <= 1}
                                        className="w-10 h-10 flex items-center justify-center bg-dark-green text-white rounded-md hover:bg-dark-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Minus size={20} />
                                    </button>
                                    <span className="w-16 text-center font-semibold">{quantities[product.id] || 1}</span>
                                    <button
                                        onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) + 1)}
                                        className="w-10 h-10 flex items-center justify-center bg-[#00C700] text-white rounded-md hover:bg-[#00B000] transition-colors"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3 w-full mb-6">
                                <button
                                    onClick={() => addToCartFunction(product)}
                                    className={`py-3 md:py-4 text-sm border rounded-lg px-4 flex items-center justify-center w-full gap-2 transition-all duration-300 font-medium ${isInCart
                                        ? "border-primary bg-primary text-white"
                                        : "border-primary text-primary hover:bg-primary bg-white hover:text-white"
                                        }`}
                                >
                                    <ShoppingCart size={16} />
                                    {isInCart ? "Remove" : "Add to Cart"}
                                </button>
                                <button className="w-full bg-[#1B5E20] text-white py-3 md:py-4 rounded-lg font-semibold hover:bg-[#164418] transition-colors flex items-center justify-center gap-2">
                                    <MessageCircle size={20} />
                                    Buy via Whatsapp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Information & Seller Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Product Information */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-4">Product Information</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Category:</span>
                                <span className="font-semibold">{product.category}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Sub-Category:</span>
                                <span className="font-semibold">{product.subCategory}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Count:</span>
                                <span className="font-semibold">{product.size}</span>
                            </div>
                        </div>
                    </div>

                    {/* Seller Information */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-4">Seller Information</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Store Name:</span>
                                <span className="font-semibold">{SELLER_INFO.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Ratings:</span>
                                <div className="flex items-center gap-2">
                                    <div className="flex">{renderStars(SELLER_INFO.rating)}</div>
                                    <span className="text-sm text-gray-600">
                                        {SELLER_INFO.rating} ({SELLER_INFO.reviewCount} Reviews)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Ratings & Reviews */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-bold mb-6">Product Ratings & Reviews</h2>
                    <div className="space-y-4">
                        {PRODUCT_REVIEWS.map((review) => (
                            <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <p className="text-gray-700 mb-1">"{review.comment}"</p>
                                        <div className="flex items-center gap-3">
                                            <span className="font-semibold text-sm">{review.title}</span>
                                            <div className="flex">{renderStars(review.rating)}</div>
                                            <span className="text-sm text-gray-500">{review.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="my-10">
                    <DeliveryAccordion />
                </div>

                <div className="mb-10 flex items-start w-full flex-col gap-4">
                    <div className="text-lg font-semibold">You might also like</div>
                    <div className='w-full  gap-4'>
                        <ProductsGrid url='/market/marketplace/product' products={OtherProducts.slice(0, 4)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductDetailPage.getLayout = (page: React.ReactNode) => (
    <MarketPlaceLayout>{page}</MarketPlaceLayout>
);

export default ProductDetailPage;