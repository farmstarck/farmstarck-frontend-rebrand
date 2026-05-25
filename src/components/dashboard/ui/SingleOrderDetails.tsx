"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { ChevronLeft, Menu } from "lucide-react";
import RateProductModal from "@/components/dashboard/buyer/RateProductModal";
import RateExperienceModal from "@/components/dashboard/buyer/RateExperienceModal";
import BaseLoader from "@/Loaders/BaseLoader";
import { getStatusColor } from "@/utils/PageUtils";
import TrackOrder from "@/components/dashboard/buyer/TrackOrder";
import TrackOrderItem from "@/components/dashboard/buyer/TrackOrder";
import CancelOrder from "@/components/dashboard/buyer/CancelOrder";
import { useNavigate } from "@/hooks/useNavigate";
import OrderItemCard from "@/components/dashboard/buyer/OrderItemCard";
import PaymentSummary from "@/components/dashboard/buyer/PaymentSummary";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderMutations, orderQueries } from "@/queries/order.queries";
import { OrderItem } from "@/types/prisma-schema-types";
import { ErrorMessage, SuccessMessage } from "@/utils/PageUtils";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { RateExperiencePayload } from "@/types";
import { useBuyAgain } from "@/hooks/useBuyAgain";

interface SingleOrderDetailsProps {
  backHref: string;
}

const BuyOrderAgainButton = ({ items }: { items: OrderItem[] }) => {
  const { buyAgain } = useBuyAgain();

  const handleBuyOrderAgain = async () => {
    const deliveredItems = items.filter(
      (i) => i.status === "delivered" && i.productId,
    );
    for (const item of deliveredItems) {
      await buyAgain(item);
    }
  };

  return (
    <button
      onClick={handleBuyOrderAgain}
      className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
    >
      Buy Again
    </button>
  );
};

const SingleOrderDetails: React.FC<SingleOrderDetailsProps> = ({
  backHref,
}) => {
  const { navigate } = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id: orderId } = router.query;

  const [showMenu, setShowMenu] = useState(false);
  const [trackingItemId, setTrackingItemId] = useState<string | null>(null);
  const [cancelOrder, setCancelOrder] = useState(false);
  const [showRateProduct, setShowRateProduct] = useState(false);
  const [showRateExperience, setShowRateExperience] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<OrderItem | null>(
    null,
  );

  const { data: order, isLoading } = useQuery({
    ...orderQueries.getBuyerOrderById(orderId as string),
    select: (res: any) => res.data,
    enabled: !!orderId && router.isReady,
  });

  const invalidateOrder = () =>
    queryClient.invalidateQueries({ queryKey: orderQueries.all });

  const { mutate: cancelOrderMutation } = useMutation({
    ...orderMutations.cancelOrder(),
    onSuccess: () => {
      SuccessMessage("Order cancelled successfully");
      invalidateOrder();
      setCancelOrder(false);
    },
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  const { mutate: cancelOrderItem, isPending: isCancellingItem } = useMutation({
    ...orderMutations.cancelOrderItem(),
    onSuccess: () => {
      SuccessMessage("Item cancelled successfully");
      invalidateOrder();
    },
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  const { mutate: rateProduct, isPending: isRatingProduct } = useMutation({
    ...orderMutations.rateProduct(),
    onSuccess: () => {
      SuccessMessage("Product rated successfully");
      setShowRateProduct(false);
      setSelectedProduct(null);
    },
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  const { mutate: rateExperience, isPending: isRatingExperience } = useMutation(
    {
      ...orderMutations.rateExperience(),
      onSuccess: () => {
        SuccessMessage("Experience rated successfully");
        setShowRateExperience(false);
      },
      onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
    },
  );

  const { mutate: requestRefund } = useMutation({
    ...orderMutations.requestRefund(),
    onSuccess: () => SuccessMessage("Refund requested successfully"),
    onError: (err) => ErrorMessage(renderAxiosOrAuthError(err)),
  });

  if (isLoading || !router.isReady) {
    return (
      <div className="max-w-4xl mx-auto p-4 lg:p-6">
        <BaseLoader />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto p-4 lg:p-6 text-center text-gray-500">
        Order not found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(backHref)}
          className="flex rounded-md border items-center gap-2 p-1.5 text-dark hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="relative">
          {order.status === "delivered" && (
            <button
              onClick={() => setShowMenu((p) => !p)}
              className="p-2 bg-white border-2 border-green-700 rounded-lg"
            >
              <Menu size={16} color="green" />
            </button>
          )}
          {(order.status === "shipped" ||
            order.status === "partially_shipped") && (
            <button
              onClick={() => {
                const firstShippedItem = order.items.find(
                  (i: OrderItem) =>
                    i.status === "shipped" || i.status === "ready_to_ship",
                );
                if (firstShippedItem) setTrackingItemId(firstShippedItem.id);
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 text-sm font-medium"
            >
              Track Order
            </button>
          )}
          {order.status === "pending" && (
            <button
              onClick={() => setCancelOrder(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium"
            >
              Cancel Order
            </button>
          )}
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={() => {
                    setShowRateExperience(true);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                >
                  Rate Experience
                </button>
                {/* Buy Again for the whole order — adds all delivered items back */}
                <BuyOrderAgainButton items={order.items} />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900 mb-4">
            Order Details
          </h1>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Order ID</p>
              <p className="font-semibold text-gray-900">#{order.orderId}</p>
            </div>
            <div>
              <p className="text-gray-500">Items</p>
              <p className="font-semibold text-gray-900">
                {order.items.length}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Date</p>
              <p className="font-semibold text-gray-900">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Shipping Method</p>
              <p className="font-semibold text-gray-900 capitalize">
                {order.shippingMethod.replace(/_/g, " ")}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Status</p>
              <span
                className={`inline-block px-3 py-1.5 capitalize rounded-md text-sm font-semibold ${getStatusColor(order.status)}`}
              >
                {order.status.replace(/_/g, " ")}
              </span>
            </div>
            {order.status === "delivered" && order.deliveredAt && (
              <div>
                <p className="text-gray-500">Delivery Date</p>
                <p className="font-semibold text-gray-900">
                  {new Date(order.deliveredAt).toLocaleDateString()}
                </p>
              </div>
            )}
            {order.status === "shipped" && order.shippedAt && (
              <div>
                <p className="text-gray-500">Shipped Date</p>
                <p className="font-semibold text-gray-900">
                  {new Date(order.shippedAt).toLocaleDateString()}
                </p>
              </div>
            )}
            {order.status === "cancelled" && order.cancelledAt && (
              <div>
                <p className="text-gray-500">Cancelled Date</p>
                <p className="font-semibold text-gray-900">
                  {new Date(order.cancelledAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="w-full border border-gray-200 rounded-xl overflow-hidden">
            <h2 className="font-bold text-gray-900 py-3 px-6 border-b border-gray-200 text-sm uppercase tracking-wide">
              Items in your order
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:gap-px overflow-hidden">
              {order.items.map((item: OrderItem) => (
                <OrderItemCard
                  key={item.id}
                  item={item}
                  OrderItemStatus={order.status}
                  onRateProduct={(item) => {
                    setSelectedProduct(item);
                    setShowRateProduct(true);
                  }}
                  onTrackOrder={(itemId) => setTrackingItemId(itemId)}
                  onCancelOrder={() => setCancelOrder(true)}
                  onCancelOrderItem={(itemId) =>
                    cancelOrderItem({ orderId: orderId as string, itemId })
                  }
                  isCancellingItem={isCancellingItem}
                />
              ))}
            </div>
          </div>
        </div>

        <PaymentSummary order={order} />

        <div className="p-6">
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <h2 className="font-bold text-gray-900 px-6 py-3 border-b border-gray-200 text-sm uppercase tracking-wide">
              Delivery Information
            </h2>
            <div className="space-y-3 text-sm px-6 py-4">
              <div>
                <p className="font-semibold text-gray-900 mb-0.5">
                  Delivery Method
                </p>
                <p className="text-gray-500 capitalize">
                  {order.shippingMethod.replace(/_/g, " ")}
                </p>
              </div>
              {order.address && (
                <div>
                  <p className="font-semibold text-gray-900 mb-0.5">
                    Shipping Address
                  </p>
                  <p className="text-gray-500 capitalize">
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.state}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showRateProduct && selectedProduct && (
        <RateProductModal
          product={selectedProduct}
          orderId={orderId as string}
          onSubmit={(payload) => rateProduct(payload)}
          isLoading={isRatingProduct}
          onClose={() => {
            setShowRateProduct(false);
            setSelectedProduct(null);
          }}
        />
      )}
      {showRateExperience && (
        <RateExperienceModal
          orderId={orderId as string}
          onSubmit={(payload) =>
            rateExperience(payload as RateExperiencePayload)
          }
          isLoading={isRatingExperience}
          onClose={() => setShowRateExperience(false)}
        />
      )}
      <TrackOrderItem
        isOpen={!!trackingItemId}
        itemId={trackingItemId ?? ""}
        onClose={() => setTrackingItemId(null)}
      />
      <CancelOrder
        isOpen={cancelOrder}
        onClose={() => setCancelOrder(false)}
        onConfirm={() => cancelOrderMutation(orderId as string)}
        onRequestRefund={(reason) =>
          requestRefund({ orderId: orderId as string, reason })
        }
      />
    </div>
  );
};

export default SingleOrderDetails;
