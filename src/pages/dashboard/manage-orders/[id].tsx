import SellerOrderDetails from "@/components/dashboard/merchant/SellerOrderDetails";
import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";

const SellerSingleOrderPage = () => {
  return <SellerOrderDetails backHref="/dashboard/manage-orders" />;
};

SellerSingleOrderPage.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default SellerSingleOrderPage;
