import SingleOrderDetails from "@/components/dashboard/ui/SingleOrderDetails";
import { orders } from "@/utils/PageUtils";

const MerchantSingleOrderPage = () => {
  return (
    <SingleOrderDetails
      backHref="/dashboard/merchant/my-orders"
      ordersData={orders}
    />
  );
};

export default MerchantSingleOrderPage;
