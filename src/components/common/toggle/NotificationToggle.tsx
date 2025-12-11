import { Check } from 'lucide-react';
import React from 'react';

interface ToggleProps {
  notificationSettings: {
    orderUpdates: boolean;
    deliveryTracking: boolean;
    promotions: boolean;
    paymentActivities: boolean;
  };
  toggleNotification: (
    key: 'orderUpdates' | 'deliveryTracking' | 'promotions' | 'paymentActivities'
  ) => void;
  type: 'orderUpdates' | 'deliveryTracking' | 'promotions' | 'paymentActivities';
}

const NotificationToggle = ({ notificationSettings, toggleNotification, type }: ToggleProps) => {
  const isActive = notificationSettings[type];

  return (
    <button
      onClick={() => toggleNotification(type)}
      className={`w-12 h-6 rounded-full transition-colors relative ${
        isActive ? 'bg-primary' : 'bg-gray-300'
      }`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5  bg-white rounded-full transition-transform ${
          isActive ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      >
        {isActive && (
          <Check size={14} className="text-primary m-auto mt-0.5" />
        )}
      </div>
    </button>
  );
};

export default NotificationToggle;
