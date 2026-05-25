import { Order } from "@/types/prisma-schema-types";

interface Props {
  order: Order;
}

export default function PaymentSummary({ order }: Props) {
  return (
    <div className="p-6">
      <div className="w-full border border-gray-200 rounded-xl overflow-hidden">
        <h2 className="font-bold text-gray-900 py-3 px-6 border-b border-gray-200 text-sm uppercase tracking-wide">
          Payment Information
        </h2>

        <div className="px-6 py-4 space-y-3 text-sm">
          <div>
            <p className="font-semibold text-gray-900 mb-0.5">Payment Method</p>
            <p className="text-gray-500 capitalize">{order.paymentMethod}</p>
          </div>

          <div className="pt-1">
            <p className="font-semibold text-gray-900 mb-2">Payment Details</p>
            <div className="space-y-1.5 text-gray-600">
              <div className="flex justify-between">
                <span>Items Total:</span>
                <span className="font-medium text-gray-800">
                  ₦{order.totalAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fees:</span>
                <span className="font-medium text-gray-800">
                  ₦{order.shippingFee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Service Charge:</span>
                <span className="font-medium text-gray-800">
                  ₦
                  {order.serviceCharge < 0
                    ? `-${Math.abs(order.serviceCharge).toLocaleString()}`
                    : order.serviceCharge.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between font-bold text-base">
            <span>Total:</span>
            <span>₦{order.totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
