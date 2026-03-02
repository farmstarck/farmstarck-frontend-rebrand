import { useState } from "react";
import MarketPlaceLayout from "@/layouts/MarketPlaceLayout";
import Navigation from "@/components/common/MarketPlace/Navigation";
import { Trash2Icon, LucideTrash2 } from "lucide-react";
import { useWishlistStore } from "@/store/slices/cart.slice";
import Link from "next/link";
import { SuccessMessage } from "@/utils/PageUtils";
import Image from "next/image";
import ConfirmationModal from "@/components/common/MarketPlace/ConfirmationModal";
import {
  clearWishlistAction,
  removeFromWishlistAction,
} from "@/store/actions/wishlist.action";
import { addToCartAction } from "@/store/actions/cart.action";
import { Product } from "@/types/prisma-schema-types";

const WishListItems = () => {
  const { wishlist } = useWishlistStore();
  const [showClearModal, setShowClearModal] = useState(false);

  const handleAddToCart = (item: Product) => {
    addToCartAction(item);
    SuccessMessage("Item added to cart");
    removeFromWishlistAction(item.id);
  };

  const handleClearAll = () => {
    clearWishlistAction();
    setShowClearModal(false);
  };

  const handleRemoveItem = (id: string) => {
    removeFromWishlistAction(id);
    SuccessMessage("Item removed from wishlist");
  };

  if (wishlist.length === 0) {
    return (
      <div className="w-full py-5" style={{ backgroundColor: "#E8F5E9" }}>
        <div className="w-11/12 lg:max-w-7xl mx-auto">
          <Navigation routes={[{ name: "Wishlist", href: "" }]} />
          <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-6">
            My Wishlist
          </h1>

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
                href="allproducts"
              >
                Contine Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="w-full py-5"
        style={{ backgroundColor: "#E8F5E9", minHeight: "100vh" }}
      >
        <div className="w-11/12 lg:max-w-7xl mx-auto">
          <Navigation routes={[{ name: "Wishlist", href: "" }]} />

          <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-6">
            My Wishlist
          </h1>

          <div className="bg-white satoshi rounded-2xl shadow-sm overflow-hidden">
            {/* Header — visible only on large screens */}
            <div className="hidden md:grid grid-cols-10 gap-4 px-6 text-sm py-4 font-semibold text-gray-900 bg-litegreen">
              <div className="col-span-2">Image</div>
              <div className="col-span-3">Item Description</div>
              <div className="col-span-2">Price</div>
              {/* <div className="col-span-2">Date Added</div> */}
              <div className="col-span-2">Availability</div>
              <div className="col-span-1">Actions</div>
            </div>

            {/* Body */}
            <div>
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-b-gray-200 px-4 md:px-6 py-4"
                >
                  {/* Mobile Layout */}
                  <div className="md:hidden space-y-4">
                    {/* Header Row with Image and Delete */}
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold capitalize text-gray-900 text-sm mb-1 line-clamp-2">
                            {item.name}
                          </h3>
                          <div className="w-fit capitalize flex items-center gap-1 bg-[#a5faa5] text-primary py-1 text-[10px] font-medium px-2 rounded-full">
                            <Image
                              width={6}
                              height={6}
                              src="/assets/images/marketplaces/productIcon.png"
                              alt="size image"
                            />
                            {item.countType}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromWishlistAction(item.id)}
                        className="text-red-600 hover:text-red-700 p-1 flex-shrink-0"
                      >
                        <Trash2Icon className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Details Row */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 text-xs">Price:</span>
                        <p className="font-semibold text-gray-900">
                          ₦{item?.pricePerUnit?.toLocaleString()}
                        </p>
                      </div>
                      {/* <div>
                        <span className="text-gray-500 text-xs">
                          Date Added:
                        </span>
                        <p className="font-semibold text-gray-900">
                          22/11/2025
                        </p>
                      </div> */}
                      <div>
                        <span className="text-gray-500 text-xs">
                          Availability:
                        </span>
                        <p
                          className={
                            item.stockQuantity === 0
                              ? "text-red-500 font-semibold"
                              : "text-green-500 font-semibold"
                          }
                        >
                          {item.stockQuantity === 0
                            ? "Out of Stock"
                            : "In Stock"}
                        </p>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    {item.stockQuantity < 1 ? (
                      <button
                        className="w-full text-sm text-white rounded-full bg-gray-600 py-2.5 transition-colors"
                        onClick={() => handleAddToCart(item)}
                      >
                        Contact US
                      </button>
                    ) : (
                      <button
                        className="w-full text-sm text-white rounded-full bg-primary py-2.5 hover:bg-primary/90 transition-colors"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to cart
                      </button>
                    )}
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:grid grid-cols-10 gap-4 items-center">
                    {/* Image */}
                    <div className="col-span-2">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="lg:w-24 lg:h-24 md:w-20 md:h-20 object-cover rounded-lg"
                      />
                    </div>

                    {/* Item Description */}
                    <div className="col-span-3">
                      <h3 className="font-semibold capitalize text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      <div className="w-fit flex capitalize items-center gap-1 bg-[#a5faa5] text-primary py-1 text-[10px] font-medium px-3 rounded-full">
                        <Image
                          width={8}
                          height={8}
                          src="/assets/images/marketplaces/productIcon.png"
                          alt="size image"
                        />
                        {item.countType}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2">
                      <p className="font-semibold text-gray-900">
                        ₦{item?.pricePerUnit?.toLocaleString()}
                      </p>
                    </div>

                    {/* Date Added */}
                    {/* <div className="col-span-2">
                      <p className="font-semibold text-gray-900">22/11/2025</p>
                    </div> */}

                    {/* Availability */}
                    <div className="col-span-2">
                      <p
                        className={`font-semibold text-gray-900 ${item.stockQuantity < 1 ? "text-red-500" : "text-green-500"}`}
                      >
                        {item.stockQuantity < 1 ? "Out of Stock" : "In Stock"}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center justify-end gap-3">
                      {item.stockQuantity < 1 ? (
                        <button
                          className="text-sm text-white rounded-full bg-gray-600 py-2 px-4 transition-colors whitespace-nowrap"
                          onClick={() => handleAddToCart(item)}
                        >
                          Contact Us
                        </button>
                      ) : (
                        <button
                          className="text-sm text-white rounded-full bg-primary py-2 px-4 hover:bg-primary/90 transition-colors whitespace-nowrap"
                          onClick={() => handleAddToCart(item)}
                        >
                          Add to Cart
                        </button>
                      )}

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2Icon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 md:px-6 my-4 flex w-full md:w-fit md:ml-auto justify-center md:justify-end">
              <button
                onClick={() => setShowClearModal(true)}
                className="w-full md:w-auto rounded-full bg-red-500 py-2 px-5 flex items-center justify-center gap-1"
              >
                <LucideTrash2 className="w-4 h-4 text-white" />
                <span className="text-white text-sm">Delete All</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        closeModal={() => setShowClearModal(false)}
        isOpen={showClearModal}
        onConfirm={handleClearAll}
      />
    </>
  );
};

WishListItems.getLayout = (page: React.ReactNode) => (
  <MarketPlaceLayout>{page}</MarketPlaceLayout>
);

export default WishListItems;
