import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import NotificationToggle from "@/components/common/toggle/NotificationToggle";
import CollapsibleSection from "@/components/common/toggle/CollapsibleSection";
import { useNavigate } from "@/hooks/useNavigate";

const notificationItems = [
  { label: "Order Updates", key: "orderUpdates" },
  { label: "Delivery Tracking", key: "deliveryTracking" },
  { label: "Promotions & Discounts", key: "promotions" },
  { label: "Payment Activities", key: "paymentActivities" },
] as const;

export const NavigateButton = ({
  label,
  href,
  kyc = false,
}: {
  label: string;
  href: string;
  kyc?: boolean;
}) => {
  const { navigate } = useNavigate();
  return (
    <button
      onClick={() => navigate(href)}
      className="w-full flex items-center justify-between py-3 hover:bg-gray-50 transition-colors rounded-lg px-3"
    >
      <div className="flex items-center gap-2">
        <span className="text-gray-700">{label}</span>
        {kyc && (
          <span className="text-xs bg-yellow-500 text-white px-2 py-0.5 rounded-full">
            Tier 1
          </span>
        )}
      </div>
      <ChevronRight size={18} className="text-gray-400" />
    </button>
  );
};

const Settings = () => {
  const [expandedSections, setExpandedSections] = useState({
    account: true,
    security: true,
    notifications: true,
    preferences: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    deliveryTracking: true,
    promotions: true,
    paymentActivities: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
        Settings
      </h1>

      <div className="bg-white py-10 flex items-start flex-col gap-5 w-full rounded-2xl shadow-sm overflow-hidden">
        {/* ACCOUNT */}
        <CollapsibleSection
          title="Account Settings"
          isOpen={expandedSections.account}
          onToggle={() => toggleSection("account")}
        >
          <NavigateButton label="Profile Information" href="settings/profile" />
          <NavigateButton
            label="KYC Verification"
            href="settings/kyc"
            kyc={true}
          />
          <NavigateButton
            label="Shipping Information"
            href="settings/shipping-info"
          />
        </CollapsibleSection>

        {/* SECURITY */}
        <CollapsibleSection
          title="Security Settings"
          isOpen={expandedSections.security}
          onToggle={() => toggleSection("security")}
        >
          <NavigateButton
            label="Change Password"
            href="settings/change-password"
          />
          <NavigateButton
            label="Two Factor Authentication"
            href="settings/two-factor"
          />
        </CollapsibleSection>

        {/* NOTIFICATIONS */}
        {/* <CollapsibleSection
          title="Notifications Settings"
          isOpen={expandedSections.notifications}
          onToggle={() => toggleSection("notifications")}
        >
          <div className="space-y-3">
            {notificationItems.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between py-2"
              >
                <span className="text-gray-700">{item.label}</span>
                <NotificationToggle
                  checked={notificationSettings[item.key]}
                  onToggle={() => toggleNotification(item.key)}
                  ariaLabel={`Toggle ${item.label}`}
                />
              </div>
            ))}
          </div>
        </CollapsibleSection> */}

        {/* PREFERENCES */}
        {/* <CollapsibleSection
          title="Preferences"
          isOpen={expandedSections.preferences}
          onToggle={() => toggleSection("preferences")}
        >
          <NavigateButton label="Language" href="settings/language" />
        </CollapsibleSection> */}
      </div>
    </div>
  );
};

export default Settings;
