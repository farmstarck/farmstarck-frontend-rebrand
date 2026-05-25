import { useQuery } from "@tanstack/react-query";
import { notificationQueries } from "@/queries/notification.queries";
import { productQueries } from "@/queries/product.queries";
import {
  ListOrdered,
  Timer,
  Wallet,
  Activity,
  Package,
  TrendingUp,
  ShoppingBag,
  Clock,
  BadgeDollarSign,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { ProductsGrid } from "@/components/common/MarketPlace/ProductGrid";
import MetricCard from "./MetricCard";

const SELLER_ACTIVITY_ICON: Record<
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
  product_added: {
    icon: <Package size={18} />,
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  product_updated: {
    icon: <Package size={18} />,
    bg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  payout_processed: {
    icon: <TrendingUp size={18} />,
    bg: "bg-green-100",
    iconColor: "text-green-600",
  },
  payout_requested: {
    icon: <TrendingUp size={18} />,
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
};

const SellerOverview: React.FC = () => {
  // ── Queries ──────────────────────────────────────────────────────
  const { data: overview, isLoading: isLoadingOverview } = useQuery({
    queryKey: ["seller-overview"],
    queryFn: () =>
      import("@/services/overview.service")
        .then((m) => m.default.getSellerOverviewMetric())
        .then((res) => res.data),
  });

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
      {/* ── Metrics ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Revenue — dark primary */}
        <MetricCard
          title="Total Revenue"
          value={
            isLoadingOverview
              ? "—"
              : `₦${(overview?.totalRevenue ?? 0).toLocaleString()}`
          }
          sub="From delivered orders"
          icon={BarChart3}
          bg="bg-dark-primary"
          dark
        />

        {/* Unpaid Earnings */}
        <MetricCard
          title="Awaiting Payout"
          value={
            isLoadingOverview
              ? "—"
              : `₦${(overview?.unpaidEarnings ?? 0).toLocaleString()}`
          }
          sub={
            overview?.unpaidEarnings > 0
              ? "Ready to request"
              : "No pending earnings"
          }
          icon={BadgeDollarSign}
          bg="bg-white border border-gray-100"
        />

        {/* Pending Orders */}
        <MetricCard
          title="Pending Orders"
          value={isLoadingOverview ? "—" : (overview?.pendingOrders ?? 0)}
          sub="Needs your attention"
          icon={Clock}
          bg="bg-white border border-gray-100"
        />

        {/* Orders Today */}
        <MetricCard
          title="Orders Today"
          value={isLoadingOverview ? "—" : (overview?.ordersToday ?? 0)}
          sub="New orders received"
          icon={ShoppingBag}
          bg="bg-white border border-gray-100"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* Products Listed */}
        <MetricCard
          title="Products Listed"
          value={isLoadingOverview ? "—" : (overview?.totalListedProducts ?? 0)}
          sub={
            overview
              ? `${overview.totalActiveProducts} active & in stock`
              : undefined
          }
          icon={Package}
          bg="bg-white border border-gray-100"
        />

        {/* Best Selling Product */}
        <div className="rounded-2xl p-5 shadow-sm bg-primary/5 border border-primary/10">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm font-medium text-gray-500">
              Best Selling Product
            </p>
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <TrendingUp size={16} className="text-primary" />
            </div>
          </div>
          {overview?.bestSellingProduct ? (
            <>
              <p className="text-lg font-bold text-gray-900 capitalize truncate">
                {overview.bestSellingProduct.name}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {overview.bestSellingProduct.soldCount} units sold
              </p>
            </>
          ) : (
            <p className="text-base font-semibold text-gray-400">
              {isLoadingOverview ? "—" : "No sales yet"}
            </p>
          )}
        </div>
      </div>

      {/* ── Recent Orders from overview ──────────────────────────── */}
      {overview?.recentOrders?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
            <Link
              href="/dashboard/manage-orders"
              className="text-primary text-sm font-medium hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="space-y-1">
            {overview.recentOrders.map((order: any) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold text-gray-800">
                    Order #{order.order?.orderId}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">
                    {order.order?.buyer?.fullName}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "cancelled"
                          ? "bg-red-100 text-red-600"
                          : order.status === "shipped"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status.replace(/_/g, " ")}
                  </span>
                  <p className="text-sm font-bold text-gray-900">
                    ₦{order.sellerEarning?.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Recent Activity ──────────────────────────────────────── */}
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
              const style = SELLER_ACTIVITY_ICON[activity.type] ?? {
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
                        { day: "2-digit", month: "short", year: "numeric" },
                      )}{" "}
                      {new Date(activity.createdAt).toLocaleTimeString(
                        "en-GB",
                        { hour: "2-digit", minute: "2-digit" },
                      )}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── Best Sellers ─────────────────────────────────────────── */}
      <div className="bg-lite rounded-2xl shadow-sm p-3 md:p-6">
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

export default SellerOverview;
