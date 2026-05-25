import SingleOrderDetails from "@/components/dashboard/ui/SingleOrderDetails";
import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";

const SingleOrderPage = () => {
  return <SingleOrderDetails backHref="/dashboard/orders" />;
};

SingleOrderPage.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default SingleOrderPage;
