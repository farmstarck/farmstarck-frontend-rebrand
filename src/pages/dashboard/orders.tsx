import React from "react";
import OrdersListPanel from "@/components/dashboard/ui/OrdersListPanel";
import DashboardLayout from "@/layouts/DashboardLayout";

const MyOrders = () => {
  return (
    <div className="max-w-7xl p-4 mx-auto">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
        My Orders
      </h1>
      <OrdersListPanel orderDetailsBasePath="/dashboard/orders" />
    </div>
  );
};

MyOrders.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default MyOrders;
