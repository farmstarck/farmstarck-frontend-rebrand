import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ProductsGrid } from "@/components/common/MarketPlace/ProductGrid";
import ProductService from "@/services/product.service";
import { ProductFilter } from "@/hooks/useProductFilter";
import { Product } from "@/types/prisma-schema-types";
import { ListOrdered, Timer, Wallet } from "lucide-react";

const MerchantOverview: React.FC = () => {
  const [products, setProducts] = useState<Product[] | null>(null);

  const recentActivities = [
    {
      title: "Order Delivered",
      desc: "Your order #ORD1023 was delivered successfully",
      time: "16-03-2026   10:15AM",
      icon: <ListOrdered size={18} />,
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Payment Processed",
      desc: "Payment of N25,000 was successful",
      time: "16-03-2026   10:15AM",
      icon: <Timer size={18} />,
      bg: "bg-red-100",
      iconColor: "text-red-500",
    },
    {
      title: "Deposit",
      desc: "N5,000 has been deposited to your wallet",
      time: "16-03-2026   10:15AM",
      icon: <Wallet size={18} />,
      bg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Review",
      desc: "You reviewed Organic Maize",
      time: "16-03-2026   10:15AM",
      icon: <ListOrdered size={18} />,
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Refund Created",
      desc: "Refund for order #ORD1023 has been processed",
      time: "16-03-2026   10:15AM",
      icon: <Wallet size={18} />,
      bg: "bg-gray-100",
      iconColor: "text-gray-500",
    },
  ];

  useEffect(() => {
    ProductService.getBestSellingProducts({
      page: 1,
      size: 5,
    } as ProductFilter)
      .then((res) => setProducts(res.data.data))
      .catch(console.error);
  }, []);

  const OverviewMetrics = [
    {
      title: "Total Revenue",
      value: "N45,000",
      bg: "bg-dark-primary",
      textColor: "text-white",
    },
    {
      title: "Orders Today",
      value: "149",
      bg: "bg-red",
      textColor: "text-white",
    },
    {
      title: "Products Listed",
      value: "05",
      bg: "bg-yellowish",
      textColor: "text-white",
    },
    {
      title: "Best Selling Product",
      value: "120",
      bg: "bg-primary",
      textColor: "text-white",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Order Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {OverviewMetrics.map((metric, index) => (
          <div
            key={index}
            className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow ${metric.bg} ${metric.textColor}`}
          >
            <h3 className="text-sm font-medium opacity-90 mb-2">
              {metric.title}
            </h3>
            <p className="text-4xl font-bold">{metric.value}</p>
          </div>
        ))}
        {/* <div className="bg-red-500 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-sm font-medium opacity-90 mb-2">
            Cancelled Orders
          </h3>
          <p className="text-4xl font-bold">05</p>
        </div> */}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-6">
          Recent Activity
        </h2>
        <div className="space-y-1">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0"
            >
              {/* Icon circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.bg}`}
              >
                <span className={activity.iconColor}>{activity.icon}</span>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-0.5">
                <p className="text-sm md:text-base font-semibold text-gray-800">
                  {activity.title}
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  {activity.desc}
                </p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="bg-lite rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg  md:text-xl lg:text-2xl font-bold text-gray-800">
            Best Sellers
          </h2>
          <Link
            href="/market/marketplace"
            className="text-primary text-sm md:text-lg lg:text-xl font-medium hover:underline transition-all"
          >
            Go to Marketplace
          </Link>
        </div>
        <div className="w-full gap-6">
          <ProductsGrid products={products ?? []} />
        </div>
      </div>
    </div>
  );
};

export default MerchantOverview;
