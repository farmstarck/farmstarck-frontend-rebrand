import React, { useState } from 'react';
import { Search, Filter, X, ChevronLeft, ChevronRight, ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import { useNavigate } from '@/hooks/useNavigate';
import { getStatusColor, orders } from '@/utils/PageUtils';
import ReusableFilter from '@/components/dashboard/buyer/ReusableFilter';




const MyOrders = () => {
    const { navigate } = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    // Sample orders data based on your products structure


    const statusOptions = [
        { value: 'delivered', label: 'Delivered', color: 'primary' },
        { value: 'ready to ship', label: 'Ready to Ship', color: 'blue' },
        { value: 'pending', label: 'Pending', color: 'yellow' },
        { value: 'shipped', label: 'Shipped', color: 'primary' },
        { value: 'cancelled', label: 'Cancelled', color: 'red' },
    ];



    const handleStatusToggle = (status: string) => {
        setSelectedStatuses(prev =>
            prev.includes(status)
                ? prev.filter(s => s !== status)
                : [...prev, status]
        );
    };

    const handleClearFilters = () => {
        setSelectedStatuses([]);
        setDateFrom('');
        setDateTo('');
        setSearchQuery('');
    };

    const filteredOrders = orders.filter(order => {
        // Search filter
        const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.totalAmount.toString().includes(searchQuery) ||
            order.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

        // Status filter
        const matchesStatus = selectedStatuses.length === 0 ||
            selectedStatuses.includes(order.status);

        // Date filter
        const matchesDate = (!dateFrom || new Date(order.date) >= new Date(dateFrom)) &&
            (!dateTo || new Date(order.date) <= new Date(dateTo));

        return matchesSearch && matchesStatus && matchesDate;
    });

    // Pagination
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="max-w-7xl p-4 mx-auto">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">My Orders</h1>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden relative">
                {/* Header */}
                <div className="p-4 lg:p-6  border-gray-200">

                    {/* Search and Filter Bar */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by order number or product"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Filter size={20} />
                            <span>Filter</span>
                        </button>
                    </div>
                </div>

                <ReusableFilter
                    selectedStatuses={selectedStatuses}
                    setSelectedStatuses={setSelectedStatuses}
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    setDateFrom={setDateFrom}
                    setDateTo={setDateTo}
                    isOpen={showFilters}
                    onClear={handleClearFilters}
                    onClose={() => setShowFilters(false)}
                    statusOptions={statusOptions}
                />

                {/* Orders List or Empty State */}
                {currentOrders.length === 0 ? (
                    // Empty State
                    <div className="p-8  lg:p-16 flex flex-col items-center justify-center text-center">
                        <div className="w-32 h-32 mb-6 relative">

                            <Image
                                src="/assets/images/dashboard/buyer/empty_order.png"
                                alt="No orders"
                                fill
                                className="object-contain"
                            />

                        </div>
                        <p className="text-gray-600 mb-6 max-w-sm">
                            You have not added any order yet, complete your checkout to see order here
                        </p>
                        <button
                            onClick={() => navigate('market/marketplace')}
                            className="px-8 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Orders List */}
                        <div className="p-4 space-y-3">
                            {currentOrders.map((order) => (
                                <div
                                    key={order.id}
                                    onClick={() => navigate(`orders/${order.id}`)}
                                    className="p-4 lg:p-6 cursor-pointer border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {/* First Item Image */}
                                        <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden relative">
                                            <Image
                                                src={order.items[0].image}
                                                alt={order.items[0].title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Order Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                                <div>
                                                    <p className="font-semibold text-gray-800">
                                                        Order ID: {order.orderNumber}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Items: {order.items.length}
                                                    </p>
                                                    <p className="text-sm font-semibold text-gray-800 mt-1">
                                                        Amount: ₦{order.totalAmount.toLocaleString()}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize whitespace-nowrap ${getStatusColor(
                                                        order.status
                                                    )}`}
                                                >
                                                    {order.status}
                                                </span>
                                            </div>

                                            {/* Order Items List */}
                                            <div className="space-y-1">
                                                {order.items.map((item, idx) => (
                                                    <p key={idx} className="text-sm text-gray-600">
                                                        • {item.title} ({item.size}) - Qty: {item.quantity} - ₦{(item.price * item.quantity).toLocaleString()}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="p-4 lg:p-6 border-t border-gray-200 flex items-center justify-between">
                                <p className="text-sm text-gray-600">
                                    Page {currentPage} of {totalPages}
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handlePreviousPage}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                                    >
                                        <ChevronLeft size={16} />
                                        <span className="hidden sm:inline">Previous</span>
                                    </button>
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                                    >
                                        <span className="hidden sm:inline">Next</span>
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default MyOrders;