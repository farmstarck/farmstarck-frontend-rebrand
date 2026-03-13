import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { ChevronLeft, Menu } from "lucide-react"
import RateProductModal from "@/components/dashboard/buyer/RateProductModal"
import RateExperienceModal from "@/components/dashboard/buyer/RateExperienceModal"
import BaseLoader from "@/Loaders/BaseLoader"
import { Order, OrderItem } from "@/types/products"
import { getStatusColor, orders } from "@/utils/PageUtils"
import TrackOrder from "@/components/dashboard/buyer/TrackOrder"
import CancelOrder from "@/components/dashboard/buyer/CancelOrder"
import { useNavigate } from "@/hooks/useNavigate"
import OrderItemCard from "@/components/dashboard/buyer/OrderItemCard"
import PaymentSummary from "@/components/dashboard/buyer/PaymentSummary"

interface SingleOrderProps {
  ordersData: Order[]
}

const SingleOrder: React.FC<SingleOrderProps> = ({ ordersData }) => {
  const { navigate } = useNavigate()
  const router = useRouter()
  const { id } = router.query
  const [showMenu, setShowMenu] = useState(false)
  const [trackOrder, setTrackOrder] = useState(false)
  const [cancelOrder, setCancelOrder] = useState(false)
  const [showRateProduct, setShowRateProduct] = useState(false)
  const [showRateExperience, setShowRateExperience] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<OrderItem | null>(null)
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (id) {
      const found = orders.find((o) => o.id === id)
      setOrder(found || null)
    }
  }, [id, ordersData])

  if (!router.isReady || !order) {
    return (
      <div className="max-w-4xl mx-auto p-4 lg:p-6">
        <BaseLoader />
      </div>
    )
  }
  

  const handleRateExperience = () => {
    setShowRateExperience(true)
  }

  const handleBuyAgain = () => console.log("Buy again")
  const handleRateProduct = (item: OrderItem) => {
    setSelectedProduct(item)
    setShowRateProduct(true)
  }


  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/dashboard/buyer/orders")}
          className="flex rounded-md border items-center gap-2 text-dark transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="relative">
          {order.status === "delivered" && (
            <button
              onClick={() => setShowMenu(p => !p)}
              className="p-2 bg-white rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
          )}
          {(order.status === "shipped" || order.status === "partially_shipped") && (
            <button
              onClick={() => setTrackOrder(true)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Track Order
            </button>
          )}

          {showMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={() => { handleRateExperience(); setShowMenu(false) }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm"
                >
                  Rate Experience
                </button>
                <button
                  onClick={() => { handleBuyAgain(); setShowMenu(false) }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm"
                >
                  Buy Again
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        {/* Order Details Header */}
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Order Details</h1>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Order ID</p>
              <p className="font-semibold text-gray-900">{order.orderNumber}</p>
            </div>
            <div>
              <p className="text-gray-500">Items</p>
              <p className="font-semibold text-gray-900">{order.items.length}</p>
            </div>
            <div>
              <p className="text-gray-500">Date</p>
              <p className="font-semibold text-gray-900">{order.date}</p>
            </div>
            <div>
              <p className="text-gray-500">Location</p>
              <p className="font-semibold text-gray-900">{order.location}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-500 mb-1">Status</p>
              <span className={`inline-block px-3 py-1.5 capitalize rounded-md text-sm font-semibold ${getStatusColor(order.status)}`}>
                {order.status.replace("_", " ")}
              </span>
            </div>
          </div>
        </div>

        {/* Items in Order */}
        <div className="p-6">
          <div className="w-full border border-gray-200 rounded-xl overflow-hidden">
            <h2 className="font-bold text-gray-900 py-3 px-6 border-b border-gray-200 text-sm uppercase tracking-wide">
              Items in your order
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:gap-px rounded-xl overflow-hidden">
              {order.items.map((item) => (
                <OrderItemCard
                  key={item.productId}
                  item={item}
                  orderStatus={order.status}
                  onRateProduct={handleRateProduct}
                  onBuyAgain={handleBuyAgain}
                  onTrackOrder={() => setTrackOrder(true)}
                  onCancelOrder={() => setCancelOrder(true)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <PaymentSummary order={order} />

        {/* Delivery Information */}
        <div className="p-6">
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <h2 className="font-bold text-gray-900 px-6 py-3 border-b border-gray-200 text-sm uppercase tracking-wide">
              Delivery Information
            </h2>
            <div className="space-y-3 text-sm px-6 py-4">
              <div>
                <p className="font-semibold text-gray-900 mb-0.5">Delivery Method</p>
                <p className="text-gray-500">Standard Delivery</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-0.5">Shipping Address</p>
                <p className="text-gray-500">123 Sample Street, {order.location}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-0.5">Delivery Status</p>
                <p className="text-gray-500 capitalize">{order.status.replace("_", " ")}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modals */}
      {showRateProduct && selectedProduct && (
        <RateProductModal
          product={selectedProduct}
          onClose={() => { setShowRateProduct(false); setSelectedProduct(null) }}
        />
      )}
      {showRateExperience && (
        <RateExperienceModal
          orderNumber={order.orderNumber}
          onClose={() => setShowRateExperience(false)}
        />
      )}
      <TrackOrder isOpen={trackOrder} onClose={() => setTrackOrder(false)} />
      <CancelOrder isOpen={cancelOrder} onClose={() => setCancelOrder(false)} />
    </div>
  )
}

export default SingleOrder