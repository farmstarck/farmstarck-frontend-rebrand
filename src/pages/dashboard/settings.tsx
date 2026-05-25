import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import CollapsibleSection from "@/components/common/toggle/CollapsibleSection";
import { useNavigate } from "@/hooks/useNavigate";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { userQueries } from "@/queries/user.queries";
import { useUserRole } from "@/hooks/useUserRole";

export const NavigateButton = ({
  label,
  href,
  kyc = false,
  badge,
}: {
  label: string;
  href: string;
  kyc?: boolean;
  badge?: string;
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
        {badge && (
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
            {badge}
          </span>
        )}
      </div>
      <ChevronRight size={18} className="text-gray-400" />
    </button>
  );
};

const SELLER_ROLES = ["merchant", "farmer", "business"];

const Settings = () => {
  const [expandedSections, setExpandedSections] = useState({
    account: true,
    store: true,
    payout: true,
    security: true,
  });

  // ── Get user role from profile ──────────────────────────────────
  const { isSeller, role } = useUserRole();

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
        Settings
      </h1>

      <div className="bg-white py-10 flex items-start flex-col gap-5 w-full rounded-2xl shadow-sm overflow-hidden">
        {/* ── ACCOUNT — all roles ──────────────────────────────── */}
        <CollapsibleSection
          title="Account Settings"
          isOpen={expandedSections.account}
          onToggle={() => toggleSection("account")}
        >
          <NavigateButton label="Profile Information" href="settings/profile" />
          <NavigateButton
            label="Shipping Information"
            href="settings/shipping-info"
          />
          {/* <NavigateButton label="KYC Verification" href="settings/kyc" kyc /> */}
        </CollapsibleSection>

        {/* ── STORE — sellers only ─────────────────────────────── */}
        {isSeller && (
          <CollapsibleSection
            title="Store Settings"
            isOpen={expandedSections.store}
            onToggle={() => toggleSection("store")}
          >
            <NavigateButton
              label="Store Information"
              href="settings/store-info"
              badge={role.charAt(0).toUpperCase() + role.slice(1)}
            />
          </CollapsibleSection>
        )}

        {/* ── PAYOUT — sellers only ────────────────────────────── */}
        {isSeller && (
          <CollapsibleSection
            title="Payout Settings"
            isOpen={expandedSections.payout}
            onToggle={() => toggleSection("payout")}
          >
            <NavigateButton
              label="Payout Accounts"
              href="settings/payout-account"
            />
            <NavigateButton
              label="Auto-Payout Schedule"
              href="settings/auto-pay-schedule"
            />
          </CollapsibleSection>
        )}

        {/* ── SECURITY — all roles ─────────────────────────────── */}
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
      </div>
    </div>
  );
};

Settings.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Settings;
