import React from "react";
import { useAuthStore } from "@/store/slices/auth.slice";
import DashboardLayout from "@/layouts/DashboardLayout";
import SellerOverview from "@/components/dashboard/overview/SellerOverview";
import BuyerOverview from "@/components/dashboard/overview/BuyerOverview";

const SELLER_ROLES = ["merchant", "farmer", "business", "admin", "super_admin"];

const DashboardIndex = () => {
  const { user } = useAuthStore();
  const isSeller = user?.role && SELLER_ROLES.includes(user.role);

  return isSeller ? <SellerOverview /> : <BuyerOverview />;
};

DashboardIndex.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default DashboardIndex;
