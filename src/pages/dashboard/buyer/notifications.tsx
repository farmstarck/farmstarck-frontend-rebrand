"use client";
import React, { useState } from 'react';
import { Package, Bell, Activity, CheckCircle, Trash2 } from 'lucide-react';
import DeleteConfirmationModal from '@/components/common/DeleteConfirmationModal';
import Image from 'next/image';

interface Notification {
    id: string;
    type: 'notification' | 'service' | 'activity' |'none';
    category: 'order' | 'service' | 'activity' | 'promotion';
    title: string;
    message: string;
    date: string;
    time: string;
    isRead: boolean;
}

const Notifications = () => {
    const [activeTab, setActiveTab] = useState<'notification' | 'services' | 'activities'|'none'>('notification');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [notificationToDelete, setNotificationToDelete] = useState<string | null>(null);

    // Mock notifications data
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            type: 'notification',
            category: 'order',
            title: 'Order Completed',
            message: 'Your order 14O98765 has been delivered successfully. Thank you',
            date: '06-12-2025',
            time: '14:09',
            isRead: false
        },
        {
            id: '2',
            type: 'notification',
            category: 'order',
            title: 'Order Completed',
            message: 'Your order 14O98765 has been delivered successfully. Thank you',
            date: '06-12-2025',
            time: '14:09',
            isRead: false
        },
        {
            id: '3',
            type: 'notification',
            category: 'order',
            title: 'Order Completed',
            message: 'Your order 14O98765 has been delivered successfully. Thank you',
            date: '06-12-2025',
            time: '14:09',
            isRead: false
        },
        {
            id: '4',
            type: 'notification',
            category: 'order',
            title: 'Order Completed',
            message: 'Your order 14O98765 has been delivered successfully. Thank you',
            date: '04-12-2025',
            time: '14:09',
            isRead: false
        },
        {
            id: '5',
            type: 'service',
            category: 'service',
            title: 'Service Request Approved',
            message: 'Your service request for farm consultation has been approved',
            date: '05-12-2025',
            time: '10:30',
            isRead: false
        },
        {
            id: '6',
            type: 'service',
            category: 'service',
            title: 'Payment Received',
            message: 'Payment of ₦50,000 has been received for your service',
            date: '05-12-2025',
            time: '09:15',
            isRead: false
        },
        {
            id: '7',
            type: 'activity',
            category: 'activity',
            title: 'New Product Added',
            message: 'You have successfully added a new product to your store',
            date: '03-12-2025',
            time: '16:45',
            isRead: false
        },
        {
            id: '8',
            type: 'activity',
            category: 'activity',
            title: 'Profile Updated',
            message: 'Your profile information has been updated successfully',
            date: '02-12-2025',
            time: '11:20',
            isRead: false
        }
    ]);

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'order':
                return <Package size={20} className="text-white" />;
            case 'service':
                return <Bell size={20} className="text-white" />;
            case 'activity':
                return <Activity size={20} className="text-white" />;
            default:
                return <CheckCircle size={20} className="text-white" />;
        }
    };

    const handleDeleteClick = (id: string) => {
        setNotificationToDelete(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (notificationToDelete) {
            setNotifications(prev => prev.filter(notif => notif.id !== notificationToDelete));
            setNotificationToDelete(null);
        }
    };

    const filteredNotifications = notifications.filter(notif => {
        if (activeTab === 'notification') return notif.type === 'notification';
        if (activeTab === 'services') return notif.type === 'service';
        if (activeTab === 'activities') return notif.type === 'activity';
        if (activeTab === 'none') return notif.type === 'none';
        return true;
    });

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">Notifications</h1>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl w-full p-6">
                <div className="flex flex-wrap gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('notification')}
                        className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                            activeTab === 'notification'
                                ? 'bg-primary text-white'
                                : 'bg-white text-gray-700 border border-primary hover:bg-primary/10'
                        }`}
                    >
                        Notification
                    </button>
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                            activeTab === 'services'
                                ? 'bg-primary text-white'
                                : 'bg-white text-gray-700 border border-primary hover:bg-primary/10'
                        }`}
                    >
                        Services
                    </button>
                    <button
                        onClick={() => setActiveTab('activities')}
                        className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                            activeTab === 'activities'
                                ? 'bg-primary text-white'
                                : 'bg-white text-gray-700 border border-primary hover:bg-primary/10'
                        }`}
                    >
                        Activities
                    </button>
                    <button
                        onClick={() => setActiveTab('none')}
                        className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                            activeTab === 'none'
                                ? 'bg-primary text-white'
                                : 'bg-white text-gray-700 border border-primary hover:bg-primary/10'
                        }`}
                    >
                        None
                    </button>
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {filteredNotifications.length === 0 ? (
                        <div className="bg-white flex items-center flex-col gap-5 rounded-2xl p-8 text-center">
                            <Image 
                            src='/assets/images/dashboard/buyer/notify.png'
                            alt='notice img' 
                            lazyBoundary='100'
                             width={200} 
                             height={200} 
                             />
                            <p className="text-gray-500">You do not have any notification yet. Check back later</p>
                        </div>
                    ) : (
                        filteredNotifications.map((notif) => (
                            <div
                                key={notif.id}
                                className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-200 hover:shadow-md transition-shadow group"
                            >
                                <div className="flex gap-3 lg:gap-4">
                                    {/* Icon */}
                                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                                        {getCategoryIcon(notif.category)}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">
                                            {notif.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm lg:text-base mb-2">
                                            {notif.message}
                                        </p>
                                        <p className="text-gray-400 text-xs lg:text-sm">
                                            {notif.date} {notif.time}
                                        </p>
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDeleteClick(notif.id)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-lg h-fit"
                                        aria-label="Delete notification"
                                    >
                                        <Trash2 size={20} className="text-red-500" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                closeModal={setShowDeleteModal}
                onConfirm={handleConfirmDelete}
                title="Delete Notification"
                message="Are you sure you want to delete this notification? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
            />
        </div>
    );
};

export default Notifications;