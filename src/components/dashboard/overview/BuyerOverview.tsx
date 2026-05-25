import React from "react";
import { useQuery } from "@tanstack/react-query";
import { notificationQueries } from "@/queries/notification.queries";
import { productQueries } from "@/queries/product.queries";
import {
  ListOrdered,
  Timer,
  Wallet,
  Activity,
  ShoppingBag,
  XCircle,
  Clock,
  BarChart3,
  Heart,
} from "lucide-react";
import overviewService from "@/services/overview.service";
import Link from "next/link";
import { ProductsGrid } from "@/components/common/MarketPlace/ProductGrid";
import { Product } from "@/types/prisma-schema-types";
import MetricCard from "./MetricCard";

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
  const { data: overview, isLoading } = useQuery({
    queryKey: ["buyer-overview"],
    queryFn: () =>
      overviewService.getBuyerOverviewMetric().then((res) => res.data),
  });

  const { data: activityData } = useQuery(
    notificationQueries.activities({ size: 5 }),
  );

  const { data: productsData } = useQuery({
    ...productQueries.bestSelling({
      page: 1,
      size: 5,
      subcategoryId: undefined,
      sortBy: undefined,
      priceRange: undefined,
      locations: [],
      attributes: [],
      minRating: undefined,
    }),
    select: (res: { data: { data: Product[] } }) => res.data.data,
  });

  const recentActivities = activityData?.items ?? [];

  return (
    <div className="max-w-7xl mx-auto">
      {/* ── Metrics ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Spent"
          value={
            isLoading ? "—" : `₦${(overview?.totalSpent ?? 0).toLocaleString()}`
          }
          sub="On delivered orders"
          icon={BarChart3}
          bg="bg-dark-primary"
          dark
        />
        <MetricCard
          title="Completed Orders"
          value={isLoading ? "—" : (overview?.completedOrder ?? 0)}
          sub="Successfully delivered"
          icon={ShoppingBag}
          bg="bg-white border border-gray-100"
        />
        <MetricCard
          title="Pending Orders"
          value={isLoading ? "—" : (overview?.pendingOrder ?? 0)}
          sub="In progress"
          icon={Clock}
          bg="bg-white border border-gray-100"
        />
        <MetricCard
          title="Cancelled Orders"
          value={isLoading ? "—" : (overview?.cancelledOrder ?? 0)}
          sub="Total cancellations"
          icon={XCircle}
          bg="bg-white border border-gray-100"
        />
      </div>

      {/* ── Quick links ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link
          href="/dashboard/orders"
          className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <ShoppingBag size={18} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">My Orders</p>
              <p className="text-xs text-gray-400">View all your orders</p>
            </div>
          </div>
          <ListOrdered
            size={16}
            className="text-gray-300 group-hover:text-primary transition-colors"
          />
        </Link>

        <Link
          href="/dashboard/wishlist"
          className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <Heart size={18} className="text-red-400" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Wishlist</p>
              <p className="text-xs text-gray-400">
                {isLoading
                  ? "—"
                  : `${overview?.wishlistCount ?? 0} saved item${
                      overview?.wishlistCount !== 1 ? "s" : ""
                    }`}
              </p>
            </div>
          </div>
          <ListOrdered
            size={16}
            className="text-gray-300 group-hover:text-primary transition-colors"
          />
        </Link>
      </div>

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

export default BuyerOverview;
