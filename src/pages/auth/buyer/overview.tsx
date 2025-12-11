import React from 'react';
import { Bell, User, Globe } from 'lucide-react';
import { ProductsGrid } from '@/components/common/MarketPlace/ProductGrid';
import { AllProducts } from '@/data/ProductsData';

const BuyerOverview: React.FC = () => {
  const recentActivities = [
    {
      type: 'payment',
      title: 'Payment for Order',
      time: '4 month ago',
      status: 'inactive',
      color: 'red'
    },
    {
      type: 'delivery',
      title: 'Delivery Completed',
      time: '5 seconds ago',
      status: 'active',
      color: 'green'
    },
    {
      type: 'reward',
      title: 'Redeemed Staroks Point',
      time: '5 seconds ago',
      status: 'pending',
      color: 'yellow'
    },
    {
      type: 'vault',
      title: 'Food Vault Created',
      time: '5 seconds ago',
      status: 'active',
      color: 'green'
    },
    {
      type: 'payment',
      title: 'Payment for Order',
      time: '2 month ago',
      status: 'inactive',
      color: 'red'
    },
    {
      type: 'delivery',
      title: 'Delivery Completed',
      time: '8 seconds ago',
      status: 'active',
      color: 'green'
    },
  ];

  const filteredProducts = [
    {
      id: 1,
    },
    {
      id: 2,
    }]

  return (
    <div className="max-w-7xl mx-auto">

      {/* Order Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-green-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-sm font-medium opacity-90 mb-2">Completed Orders</h3>
          <p className="text-4xl font-bold">120</p>
        </div>
        <div className="bg-red-500 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-sm font-medium opacity-90 mb-2">Cancelled Orders</h3>
          <p className="text-4xl font-bold">05</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors rounded-lg px-2"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${activity.color === 'green'
                    ? 'bg-green-500'
                    : activity.color === 'red'
                      ? 'bg-red-500'
                      : 'bg-yellow-500'
                    }`}
                />
                <div>
                  <p className="font-medium text-gray-800 text-sm">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${activity.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : activity.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                  }`}
              >
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="bg-lite rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg  md:text-xl lg:text-2xl font-bold text-gray-800">Best Sellers</h2>
          <a
            href="/market/marketplace"
            className="text-primary text-sm md:text-lg lg:text-xl font-medium hover:underline transition-all"
          >
            Go to Marketplace
          </a>
        </div>
        <div className="w-full   gap-6">
            <ProductsGrid
              products={AllProducts.slice(0,4)}
            />
        </div>
      </div>
    </div>
  );
};

export default BuyerOverview;