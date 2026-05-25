import { useQuery } from "@tanstack/react-query";
import { notificationQueries } from "@/queries/notification.queries";
import { productQueries } from "@/queries/product.queries";
import { useQuery as useRQQuery } from "@tanstack/react-query";
import { ListOrdered, Timer, Wallet, Activity } from "lucide-react";
import overviewService from "@/services/overview.service";
import { useEffect, useState } from "react";
import { FetchBuyerOverResponse } from "@/types";
import Link from "next/link";
import { ProductsGrid } from "@/components/common/MarketPlace/ProductGrid";

const ACTIVITY_ICON: Record<
  string,
  { icon: JSX.Element; bg: string; iconColor: string }
> = {
  order_placed: {
    icon: <ListOrdered size={18} />,
    bg: "bg-green-100",
    iconColor: "text-green-600",
  },
  order_delivered: {
    icon: <ListOrdered size={18} />,
    bg: "bg-green-100",
    iconColor: "text-green-600",
  },
  order_cancelled: {
    icon: <ListOrdered size={18} />,
    bg: "bg-red-100",
    iconColor: "text-red-500",
  },
  payment_made: {
    icon: <Timer size={18} />,
    bg: "bg-red-100",
    iconColor: "text-red-500",
  },
  wallet_funded: {
    icon: <Wallet size={18} />,
    bg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  wallet_debited: {
    icon: <Wallet size={18} />,
    bg: "bg-gray-100",
    iconColor: "text-gray-500",
  },
  refund_requested: {
    icon: <Wallet size={18} />,
    bg: "bg-gray-100",
    iconColor: "text-gray-500",
  },
  refund_processed: {
    icon: <Wallet size={18} />,
    bg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  product_reviewed: {
    icon: <ListOrdered size={18} />,
    bg: "bg-green-100",
    iconColor: "text-green-600",
  },
};

const BuyerOverview: React.FC = () => {
  const [overview, setOverview] = useState<FetchBuyerOverResponse>();

  useEffect(() => {
    overviewService
      .getBuyerOverviewMetric()
      .then((res) => setOverview(res.data))
      .catch(console.error);
  }, []);

  const { data: activityData } = useQuery(
    notificationQueries.activities({ size: 5 }),
  );

  const { data: productsData } = useQuery({
    ...productQueries.bestSelling({ page: 1, size: 5 } as any),
    select: (res: any) => res.data.data,
  });

  const recentActivities = activityData?.items ?? [];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Order Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-green-800 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-sm font-bold opacity-90 mb-2">
            Completed Orders
          </h3>
          <p className="text-4xl font-bold">{overview?.completedOrder ?? 0}</p>
        </div>
        <div className="bg-red-500 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-sm font-bold opacity-90 mb-2">
            Cancelled Orders
          </h3>
          <p className="text-4xl font-bold">{overview?.cancelledOrder ?? 0}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-6">
          Recent Activity
        </h2>
        <div className="space-y-1">
          {recentActivities.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">
              No recent activity
            </p>
          ) : (
            recentActivities.map((activity) => {
              const style = ACTIVITY_ICON[activity.type] ?? {
                icon: <Activity size={18} />,
                bg: "bg-gray-100",
                iconColor: "text-gray-500",
              };
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${style.bg}`}
                  >
                    <span className={style.iconColor}>{style.icon}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm md:text-base font-semibold text-gray-800">
                      {activity.title}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(activity.createdAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}{" "}
                      {new Date(activity.createdAt).toLocaleTimeString(
                        "en-GB",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Best Sellers */}
      <div className="bg-lite rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
            Best Sellers
          </h2>
          <Link
            href="/market/marketplace"
            className="text-primary text-sm font-medium hover:underline"
          >
            Go to Marketplace
          </Link>
        </div>
        <ProductsGrid products={productsData ?? []} />
      </div>
    </div>
  );
};

export default BuyerOverview;
