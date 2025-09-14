import { useEffect, useState } from "react";
import { useShopContext } from "../../../context/ShopContext";
import { Link } from "react-router-dom";
import AddToCartImg from "../../../assets/svg/add-cart-white.svg";
import DeleteImg from "../../../assets/svg/delete-bin.svg";
import DefaultImg from "../../../assets/svg/wishlist-default.svg";

const wishlistHeaders = [
  { key: 1, item: "product" },
  { key: 2, item: "price" },
  { key: 3, item: "add to cart" },
  { key: 4, item: "delete" },
];

const Wishlist = () => {
  const { handleAddToCart, clearWishlist, removeFromWishlist, updateWishlist } =
    useShopContext();
  const [wishlistItems, setWishlistItems] = useState([]);

  const handleLocalAddToCart = async (id: string) => {
    try {
      // setIsLoading(true);
      await handleAddToCart(id);
      await removeFromWishlist(id);
    } catch (error) {
      console.log("ERRRORRRR: ", error);
    } finally {
      // setIsLoading(false);
    }
  };

  // Fetch products in wishlist
  useEffect(() => {
    // retrive wishlist items
    const wishlist = localStorage.getItem("wishlist");
    const parsedWishlist = wishlist ? JSON.parse(wishlist) : [];

    setWishlistItems(parsedWishlist);
  }, [updateWishlist]);

  return (
    <div className="w-full  pt-36 px-5 md:pt-48">
      <div className="max-w-4xl mx-auto w-full">
        {wishlistItems?.length > 0 && (
          <>
            <header className="w-full flex items-center justify-between">
              <h2 className="font-subHeading2 text-xl text-gray-700">
                My Wishlist{" "}
                <span className="text-gray-400 text-base font-light pl-1">
                  ({wishlistItems?.length})
                </span>
              </h2>
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => clearWishlist()}
              >
                <img src={DeleteImg} alt="" className="w-4" />
                <span className="text-[.9rem]">Delete All</span>
              </div>
            </header>

            {/* Web view */}

            <div className="mt-10 w-full overflow-scroll whitespace-nowrap hidden sm:block">
              <table className="border-collapse w-full px-5 overflow-hidden min-w-[550px]">
                <thead className="">
                  <tr className="text-left border-b border-gray-300">
                    {wishlistHeaders.map((header) => (
                      <th
                        key={header.key}
                        className="uppercase text-xs text-gray-600 font-normal  py-5 "
                      >
                        {header.item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {wishlistItems.map((item: any) => {
                    console.log("zzzzzzzzz", item);

                    const price = item?.discountPerUnit || item?.pricePerUnit;
                    return (
                      <tr key={item?.id}>
                        <td className="flex items-center gap-1  w-[250px] sm:w-auto">
                          <div className="flex gap-2 items-center">
                            <img
                              src={item?.imageUrl}
                              alt="product image"
                              className="w-12 h-12 rounded-md"
                            />
                            <div>
                              <p className="text-[0.5rem] uppercase text-gray-500">
                                {item?.category}
                              </p>
                              <p className="text-xs uppercase ">{item?.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="font-subHeading text-sm text-gray-600">
                          N {price?.toLocaleString()}
                        </td>
                        <td className="">
                          <button
                            onClick={() => handleLocalAddToCart(item?.id)}
                            className=" px-2 py-2 flex justify-center items-center gap-2  text-white capitalize font-subHeading2 text-sm rounded-md  bg-secondary-dark w-44 sm:py-2"
                          >
                            <img
                              src={AddToCartImg}
                              alt=""
                              className="w-4 md:w-30"
                            />
                            Add to Cart
                          </button>
                        </td>
                        <td>
                          <img
                            src={DeleteImg}
                            alt=""
                            className="w-[16px] cursor-pointer"
                            onClick={() => removeFromWishlist(item?.id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="flex flex-col gap-10 w-full mt-10 sm:hidden">
              {wishlistItems?.map((item: any, i: number) => {
                const price = item?.discountPerUnit || item?.pricePerUnit;
                return (
                  <div
                    key={i}
                    className="flex flex-col gap-3 shadow-md p-5 rounded-md"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item?.imageUrl}
                        alt={item?.name}
                        className="w-20 h-20 rounded-md"
                      />
                      <div>
                        <p className="text-btn-txt uppercase text-gray-500">
                          {item?.category}
                        </p>
                        <p className="capitalize text-xs">{item?.name}</p>
                        <div className="flex gap-10 pt-1">
                          <div className="leading-none">
                            <p className="text-btn-txt uppercase text-gray-500">
                              Unit:
                            </p>
                            <p className="capitalize text-sm text-gray-700 font-subHeading2">
                              N {price?.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between pt-5 items-center w-full">
                      <img
                        src={DeleteImg}
                        alt=""
                        className="w-[20px] cursor-pointer"
                        onClick={() => removeFromWishlist(item?.id)}
                      />
                      <button
                        onClick={() => handleLocalAddToCart(item?.id)}
                        className=" px-2 py-2 flex justify-center items-center gap-2  text-white capitalize font-subHeading2  text-sm rounded-md border bg-secondary-dark w-32 sm:w-44 sm:py-2"
                      >
                        <img
                          src={AddToCartImg}
                          alt=""
                          className="w-4 md:w-30"
                        />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {/* No wishlist found */}
        {wishlistItems?.length === 0 && (
          <div className="flex flex-col items-center gap-4 text-center w-full mt-10">
            <img
              src={DefaultImg}
              alt="no cart image"
              className="w-32 sm:w-52"
            />
            <p className="text-base sm:text-xl text-gray-600">
              You have not added any item to your wishlist!
            </p>
            <Link
              to="/shop"
              className="bg-secondary-dark py-2 px-14 sm:px-20 sm:py-2 text-white text-sm sm:text-base rounded-md cursor-pointer font-subHeading2"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
