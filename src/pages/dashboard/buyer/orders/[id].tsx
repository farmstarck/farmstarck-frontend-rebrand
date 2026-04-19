import SingleOrderDetails from "@/components/dashboard/ui/SingleOrderDetails";
import { orders } from "@/utils/PageUtils";

const BuyerSingleOrderPage = () => {
  return (
    <SingleOrderDetails
      backHref="/dashboard/buyer/orders"
      ordersData={orders}
    />
  );
};

export default BuyerSingleOrderPage;
