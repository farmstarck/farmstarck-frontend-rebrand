import React, { useState } from "react";
import { Trash2, ShoppingCart, Ban } from "lucide-react";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { wishlistQueries, wishlistMutations } from "@/queries/wishlist.queries";
import { WishlistItemResponse } from "@/types";
import { addToCartAction } from "@/store/actions/cart.action";
import { SuccessMessage } from "@/utils/PageUtils";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import TitleHeader from "@/components/dashboard/buyer/TitleHeader";
import { Product } from "@/types/prisma-schema-types";
import DashboardLayout from "@/layouts/DashboardLayout";

const fmt = (n: number) =>
  "₦" + n.toLocaleString("en-NG", { minimumFractionDigits: 2 });

const DashboardWishlist = () => {
  const queryClient = useQueryClient();
  const [showClearModal, setShowClearModal] = useState(false);

  const { data: items = [], isLoading } = useQuery(
    wishlistQueries.getWishlist(),
  );

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: wishlistQueries.all });

  const { mutate: removeItem } = useMutation({
    ...wishlistMutations.removeFromWishlist(),
    onSuccess: () => {
      SuccessMessage("Item removed from wishlist");
      invalidate();
    },
  });

  const { mutate: clearWishlist } = useMutation({
    ...wishlistMutations.clearWishlist(),
    onSuccess: () => {
      SuccessMessage("Wishlist cleared");
      invalidate();
      setShowClearModal(false);
    },
  });

  const handleAddToCart = (item: WishlistItemResponse) => {
    if (!item.isAvailable || !item.productId) return;
    addToCartAction({
      id: item.productId,
      imageUrl: item.productImage,
      name: item.productTitle,
      pricePerUnit: item.livePrice,
    } as Product);
    SuccessMessage(`${item.productTitle} added to cart`);
    if (item.productId) removeItem(item.productId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <TitleHeader title="My Wishlist" />

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 flex flex-col items-center gap-4 text-center shadow-sm">
          <Image
            src="/assets/images/wishimg.png"
            alt="empty wishlist"
            width={160}
            height={160}
          />
          <h2 className="text-xl font-bold text-gray-900">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 text-sm">
            Save items you love and come back to them later
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Desktop Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 text-sm font-semibold text-gray-700 bg-litegreen">
            <div className="col-span-1">Image</div>
            <div className="col-span-4">Product</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Availability</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {items.map((item) => (
              <div key={item.id} className="px-4 md:px-6 py-4">
                {/* Mobile */}
                <div className="md:hidden space-y-3">
                  <div className="flex gap-3 items-start">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                      {item.productImage ? (
                        <Image
                          src={item.productImage}
                          alt={item.productTitle}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Ban size={20} className="text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-semibold text-sm ${!item.isAvailable ? "text-gray-400" : "text-gray-900"}`}
                      >
                        {item.productTitle}
                      </p>
                      {item.productSku && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          SKU: {item.productSku}
                        </p>
                      )}
                      <p className="font-bold text-primary mt-1">
                        {fmt(item.livePrice)}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        item.productId && removeItem(item.productId)
                      }
                      className="text-red-400 hover:text-red-600 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    {!item.isAvailable ? (
                      <span className="text-xs font-medium text-red-500 flex items-center gap-1 border border-red-200 px-2 py-1 rounded-full">
                        <Ban size={12} /> Not Available
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        In Stock
                      </span>
                    )}
                    <button
                      disabled={!item.isAvailable}
                      onClick={() => handleAddToCart(item)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                        item.isAvailable
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart size={14} />
                      {item.isAvailable ? "Add to Cart" : "Unavailable"}
                    </button>
                  </div>
                </div>

                {/* Desktop */}
                <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 relative">
                      {item.productImage ? (
                        <Image
                          src={item.productImage}
                          alt={item.productTitle}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Ban size={18} className="text-gray-300" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-span-4">
                    <p
                      className={`font-semibold text-sm ${!item.isAvailable ? "text-gray-400" : "text-gray-900"}`}
                    >
                      {item.productTitle}
                    </p>
                    {item.productSku && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        SKU: {item.productSku}
                      </p>
                    )}
                    {!item.productId && (
                      <p className="text-xs text-red-400 mt-1">
                        Product no longer exists
                      </p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <p className="font-bold text-gray-900">
                      {fmt(item.livePrice)}
                    </p>
                  </div>

                  <div className="col-span-2">
                    {item.isAvailable ? (
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-red-500 border border-red-200 flex items-center gap-1 w-fit px-3 py-1 rounded-full">
                        <Ban size={11} /> Not Available
                      </span>
                    )}
                  </div>

                  <div className="col-span-3 flex items-center justify-end gap-3">
                    <button
                      disabled={!item.isAvailable}
                      onClick={() => handleAddToCart(item)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                        item.isAvailable
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart size={15} />
                      {item.isAvailable ? "Add to Cart" : "Out of Stock"}
                    </button>
                    <button
                      onClick={() =>
                        item.productId && removeItem(item.productId)
                      }
                      className="p-2 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
            <button
              onClick={() => setShowClearModal(true)}
              className="flex items-center gap-2 px-5 py-2 bg-red-500 text-white rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
            >
              <Trash2 size={16} />
              Clear All
            </button>
          </div>
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={showClearModal}
        closeModal={setShowClearModal}
        onConfirm={clearWishlist}
        title="Clear Wishlist"
        message="Are you sure you want to remove all items from your wishlist?"
        confirmText="Clear All"
        cancelText="Cancel"
      />
    </div>
  );
};

DashboardWishlist.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default DashboardWishlist;
