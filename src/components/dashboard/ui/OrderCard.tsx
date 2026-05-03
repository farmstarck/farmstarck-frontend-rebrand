import Image from "next/image";
import { getStatusColor } from "@/utils/PageUtils";
import { Order } from "@/types/products";

interface OrderCardProps {
  onClick: () => void;
  order: Order;
}

const OrderCard = ({ onClick, order }: OrderCardProps) => {
  const [firstItem, ...remainingItems] = order.items;
  const remainingItemsCount = remainingItems.length;

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full min-h-[164px] p-4 lg:p-6 text-left border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
    >
      <div className="flex flex-col sm:flex-row gap-4 h-full">
        <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-lg shrink-0 overflow-hidden relative">
          <Image
            src={firstItem.image}
            alt={firstItem.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <p className="font-semibold text-gray-800">
                Order ID: {order.orderNumber}
              </p>
              <p className="text-sm text-gray-600">Items: {order.items.length}</p>
              <p className="text-sm font-semibold text-gray-800 mt-1">
                Amount: ₦{order.totalAmount.toLocaleString()}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize whitespace-nowrap ${getStatusColor(
                order.status,
              )}`}
            >
              {order.status}
            </span>
          </div>

          <div className="space-y-1 min-h-[44px]">
            <p className="text-sm text-gray-600 truncate">
              • {firstItem.title} ({firstItem.size}) - Qty: {firstItem.quantity} -
              ₦{(firstItem.price * firstItem.quantity).toLocaleString()}
            </p>

            {remainingItemsCount > 0 && (
              <p className="text-sm font-medium text-gray-500">
                +{remainingItemsCount} more item
                {remainingItemsCount > 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default OrderCard;
