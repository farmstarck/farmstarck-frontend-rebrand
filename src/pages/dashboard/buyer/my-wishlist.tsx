import ConfirmationModal from "@/components/common/MarketPlace/ConfirmationModal";
import { addToCartAction } from "@/store/actions/cart.action";
import {
  clearWishlistAction,
  removeFromWishlistAction,
} from "@/store/actions/wishlist.action";
import { useWishlistStore } from "@/store/slices/cart.slice";
import { Product } from "@/types/prisma-schema-types";
import { SuccessMessage } from "@/utils/PageUtils";
import { LucideTrash2, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const MyWishlist = () => {
  const { wishlist } = useWishlistStore();
  const [showClearModal, setShowClearModal] = useState(false);

  const handleAddToCart = (item: Product) => {
    addToCartAction(item);
    removeFromWishlistAction(item.id);
    SuccessMessage("Item added to cart");
  };

  const handleClearAll = () => {
    clearWishlistAction();
    setShowClearModal(false);
  };

  const handleRemoveItem = (id: string) => {
    removeFromWishlistAction(id);
    SuccessMessage("Item removed from wishlist");
  };

  return (
    <div className="w-full min-h-screen lg:p-6">
      <div className="w-full max-w-7xl mx-auto ">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            My Wishlist
          </h1>
          {wishlist.length > 0 && (
            <button
              onClick={() => setShowClearModal(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <LucideTrash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear All</span>
            </button>
          )}
        </div>

        {/* Wishlist Items */}
        <div className="space-y-4 bg-white p-6 rounded-2xl">
          {wishlist.length === 0 ? (
            <div className="w-full py-5">
              <div className="w-11/12 lg:max-w-7xl mx-auto">
                <div className="flex w-full flex-col items-center  bg-white max-w-4xl rounded-md mx-auto justify-center mb-20 py-20">
                  <div className="bg-white rounded-full ">
                    <Image
                      src={"/assets/images/wishimg.png"}
                      alt="cart image"
                      height={200}
                      width={200}
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Your wishlist is empty
                  </h2>
                  <p className="text-gray-600 mb-3">
                    Your have not added any item to your wishlist
                  </p>
                  <div className="w-full flex items-center justify-center">
                    <Link
                      className="w-1/2 lg:w-1/3 text-center mx-auto text-white rounded-full bg-primary py-2.5 px-10 gap-1"
                      href="/market/marketplace/allproducts"
                    >
                      Contine Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                >
                  <div className="flex gap-4 flex-col">
                    <div className="flex items-center gap-4">
                      {/* Product Image */}
                      <div className="relative w-40 h-40 flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start  justify-between gap- ">
                          <div className="flex-1">
                            {/* Size Badge */}
                            <div className="inline-flex items-center gap-1 bg-green-100 text-primary px-2 py-1 rounded-md text-xs font-medium">
                              <Image
                                width={10}
                                height={10}
                                src="/assets/images/marketplaces/productIcon.png"
                                alt="size"
                              />
                              <span>Crate</span>
                            </div>

                            {/* Product Title */}
                            <h3 className="font-semibold capitalize text-gray-900 text-sm sm:text-base line-clamp-2">
                              {item.name}
                            </h3>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors flex-shrink-0"
                          >
                            <Trash2Icon className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Price */}
                        <p className="text-lg sm:text-xl font-bold text-gray-900">
                          ₦{item?.pricePerUnit?.toLocaleString()}
                        </p>

                        {/* Date and Status */}
                        <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-600">
                          {/* <span>Date Added{item.wi}</span> */}
                          <span className="font-medium">
                            Status:{" "}
                            <span className="font-semibold">In Stock</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      {item.stockQuantity === 0 ? (
                        <button
                          onClick={() => handleAddToCart(item)}
                          className={`w-full bg-gray-600 text-white  py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-colors`}
                        >
                          Contact Us
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(item)}
                          className={`w-full bg-primary text-white  py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-colors`}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmationModal
        closeModal={() => setShowClearModal(false)}
        isOpen={showClearModal}
        onConfirm={handleClearAll}
        type="wishlist"
      />
    </div>
  );
};

export default MyWishlist;
