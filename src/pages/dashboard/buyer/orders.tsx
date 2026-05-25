import OrdersListPanel from "@/components/dashboard/ui/OrdersListPanel";

const MyOrders = () => {
  return (
    <div className="max-w-7xl p-4 mx-auto">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
        My Orders
      </h1>
      <OrdersListPanel orderDetailsBasePath="/dashboard/buyer/orders" />
    </div>
  );
};

export default MyOrders;
