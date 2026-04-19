import DashBoardWrapper from "@/components/dashboard/ui/DashBoardWrapper";
import OrdersListPanel from "@/components/dashboard/ui/OrdersListPanel";
import React from "react";

const MyOrders = () => {
  return (
    <DashBoardWrapper
      href="/dashboard/merchant"
      label="My Orders"
      linkAvailable={false}
    >
      <OrdersListPanel orderDetailsBasePath="/dashboard/merchant/orders" />
    </DashBoardWrapper>
  );
};

export default MyOrders;
