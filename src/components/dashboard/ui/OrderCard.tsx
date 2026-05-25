import Image from "next/image";
import { getStatusColor } from "@/utils/PageUtils";
import { Order } from "@/types/prisma-schema-types";
import BasketImg from "../../../../public/assets/images/order-basket.png";
import { format } from "date-fns";

interface OrderCardProps {
  onClick: () => void;
  order: Order;
}

const OrderCard = ({ onClick, order }: OrderCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full min-h-[164px] p-4 lg:p-6 text-left border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
    >
      <div className="flex flex-col sm:flex-row gap-4 h-full">
        <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-lg shrink-0 overflow-hidden flex justify-center items-center relative">
          <Image
            src={BasketImg}
            alt="order-basket"
            className="object-cover"
            width={60}
            height={60}
          />
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <p className="font-semibold text-gray-800">
                Order ID: {order.orderId}
              </p>
              <p className="text-sm font-semibold text-gray-800">
                Items: {order.items.length}
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-1">
                Amount: ₦{order.totalAmount.toLocaleString()}
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-1">
                Order Date:{" "}
                {order.createdAt
                  ? format(new Date(order.createdAt), "MMM dd, yyyy")
                  : "—"}
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
        </div>
      </div>
    </button>
  );
};

export default OrderCard;
