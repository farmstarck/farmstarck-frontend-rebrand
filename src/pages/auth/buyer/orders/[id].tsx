import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ChevronLeft, Menu } from 'lucide-react';
import RateProductModal from '@/components/dashboard/buyer/RateProductModal';
import RateExperienceModal from '@/components/dashboard/buyer/RateExperienceModal';
import BaseLoader from '@/Loaders/BaseLoader';
import { Order, OrderItem } from '@/types/products';
import { getStatusColor, orders } from '@/utils/PageUtils';
import TrackOrder from '@/components/dashboard/buyer/TrackOrder';
import { useNavigate } from '@/hooks/useNavigate';
import CancelOrder from '@/components/dashboard/buyer/CancelOrder';

interface SingleOrderProps {
    ordersData: Order[];
}

const SingleOrder: React.FC<SingleOrderProps> = ({ ordersData }) => {
    const { navigate } = useNavigate();
    const router = useRouter();
    const { id } = router.query;
    const [showMenu, setShowMenu] = useState(false);
    const [trackOrder, setTrackOrder] = useState(false);
    const [cancelOrder, setCancelOrder] = useState(false);
    const [showRateProduct, setShowRateProduct] = useState(false);
    const [showRateExperience, setShowRateExperience] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<OrderItem | null>(null);
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        if (id) {
            const foundOrder = orders.find((o) => o.id === id);
            setOrder(foundOrder || null);
        }
        // console.log('Order ID:', id);
        // console.log('Orders Data:', orders);
    }, [id, ordersData]);



    if (!router.isReady || !order) {
        return (
            <div className="max-w-4xl mx-auto p-4 lg:p-6">
                <BaseLoader />
            </div>
        );
    }

    const handleBuyAgain = () => {
        console.log('Buy again');
        setShowMenu(false);
    };

    const handleGetInvoice = () => {
        console.log('Download invoice');
        setShowMenu(false);
    };

    const handleRateExperience = () => {
        setShowRateExperience(true);
        setShowMenu(false);
    };

    const handleRateProduct = (product: OrderItem) => {
        setSelectedProduct(product);
        setShowRateProduct(true);
        setShowMenu(false);
    };

    const handleCancelOrder = () => {
        setCancelOrder(prev => !prev)
    };

    const handleTrackOrder = () => {
        setTrackOrder(prev => !prev);
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => navigate('/auth/buyer/orders')}
                    className="flex px-3 py-1 bg-dark-green rounded-full items-center gap-2 text-white transition-colors "
                >
                    <ChevronLeft size={20} />
                    <span className="font-bold">Back</span>
                </button>

                <div className="relative">
                    {order.status === 'delivered' && (
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-2 bg-white rounded-lg transition-colors"
                        >
                            <Menu size={20} />
                        </button>
                    )}
                    {(order.status === 'shipped' || order.status === 'ready to ship') && (
                        <button
                            onClick={handleTrackOrder}
                            className="px-4 py-2 bg-primary text-white rounded-lg transition-opacity hover:opacity-90"
                        >
                            Track Order
                        </button>
                    )}

                    {/* Menu Dropdown */}
                    {showMenu && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                            <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                <button
                                    onClick={handleBuyAgain}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm"
                                >
                                    Buy Again
                                </button>
                                <button
                                    onClick={handleGetInvoice}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm"
                                >
                                    Get Invoice (PDF)
                                </button>
                                <button
                                    onClick={handleRateExperience}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm"
                                >
                                    Rate Experience
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Order Details Header */}
                <div className="p-6  border-gray-200">
                    <h1 className="text-xl font-bold text-gray-900 mb-4">Order Details</h1>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-600">Order ID:</p>
                            <p className="font-semibold">{order.orderNumber}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Items:</p>
                            <p className="font-semibold">{order.items.length}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Date:</p>
                            <p className="font-semibold">{order.date}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Location:</p>
                            <p className="font-semibold">{order.location}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-gray-600 mb-1">Status:</p>
                            <span
                                className={`inline-block px-3 py-1.5 capitalize rounded-md text-sm ${getStatusColor(
                                    order.status
                                )} font-semibold`}
                            >
                                {order.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Items in Order */}
                <div className="p-6 ">
                    <div className="w-full border border-gray-200 rounded-lg">
                        <h2 className="font-bold text-gray-900 py-3 px-6 border-b border-gray-200 ">
                            ITEMS IN YOUR ORDER
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex flex-col gap-4">
                                    <div className="w-full flex gap-4">
                                        <div className="w-1/2 h-40 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden relative">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                                                <p className="text-sm text-primary font-semibold">
                                                    ₦{item.price.toLocaleString()}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Size: {item.size} | Qty: {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {order.status === 'delivered' && (
                                        <button
                                            onClick={() => handleRateProduct(item)}
                                            className="text-sm w-full px-5 py-2 rounded-full bg-white text-[#ffbe33] transition-all duration-200 border hover:bg-[#ffbe33] hover:text-white border-[#ffbe33]"
                                        >
                                            Rate this product
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Payment Information */}
                <div className="p-6 ">
                    <div className="w-full border border-gray-200 rounded-lg">
                        <h2 className="font-bold text-gray-900 py-3 px-6 border-b border-gray-200 ">
                            PAYMENT INFORMATION
                        </h2>
                        <div className="space-y-3 text-sm px-6 py-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Payment Method</span>
                                <span className="font-medium">Card Payment</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Payment Status</span>
                                <span className="font-medium text-primary">Paid</span>
                            </div>
                        </div>
                        <div className="px-6 py-3  ">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span className="text-primary">₦{order.totalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Delivery Information */}
                <div className="p-6 ">
                    <div className="border border-gray-200 rounded-lg">
                        <h2 className="font-bold text-gray-900 px-6 py-3 border-b border-gray-200 ">
                            DELIVERY INFORMATION
                        </h2>
                        <div className="space-y-3 text-sm px-6 py-4">
                            <div>
                                <p className="text-gray-900 font-semibold mb-1">Delivery Method</p>
                                <p className="font-medium text-gray-600">Standard Delivery</p>
                            </div>
                            <div>
                                <p className="text-gray-900 font-semibold mb-1">Shipping Address</p>
                                <p className="font-medium text-gray-600">
                                    123 Sample Street, {order.location}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-900 font-semibold mb-1">Delivery Status</p>
                                <p className="font-medium text-gray-600 capitalize">{order.status}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 w-full lg:w-1/2 mx-auto">
                    {order.status === 'pending' && (
                        <button
                            onClick={handleCancelOrder}
                            className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                        >
                            Cancel Order
                        </button>
                    )}
                    {order.status === 'shipped' && (
                        <button
                            onClick={handleTrackOrder}
                            className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                        >
                            Track Order
                        </button>
                    )}
                    {order.status === 'ready to ship' && (
                        <button
                            onClick={handleTrackOrder}
                            className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                        >
                            Track Order
                        </button>
                    )}
                    {order.status === 'delivered' && (
                        <button
                            onClick={handleBuyAgain}
                            className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                        >
                            Buy Again
                        </button>
                    )}
                </div>
            </div>

            {/* Modals */}
            {showRateProduct && selectedProduct && (
                <RateProductModal
                    product={selectedProduct}
                    onClose={() => {
                        setShowRateProduct(false);
                        setSelectedProduct(null);
                    }}
                />
            )}

            {showRateExperience && (
                <RateExperienceModal
                    orderNumber={order.orderNumber}
                    onClose={() => setShowRateExperience(false)}
                />
            )}

            <TrackOrder
                isOpen={trackOrder}
                onClose={() => setTrackOrder(false)}
            />
            <CancelOrder
                isOpen={cancelOrder}
                onClose={() => setCancelOrder(false)}
            />
        </div>
    );
};

export default SingleOrder;