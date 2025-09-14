import { useEffect, useState } from "react";
import jsonProducts from "../../../../data/products.json";
import LargSearchImg from "../../../assets/svg/large-magnifier.svg";
import WishListImg from "../../../assets/svg/wishlist.svg";
import CartImg from "../../../assets/svg/cart.svg";
import SearchImg from "../../../assets/svg/magnifier.svg";
import ShopSearch from "./ShopSearch";
import { Link } from "react-router-dom";

type ShopNavbarProps = {
  setIsModalOpen: (query: boolean) => void;
  updateCart: any;
  updateWishlist: any;
};

const ShopNavbar: React.FC<ShopNavbarProps> = ({
  setIsModalOpen,
  updateCart,
  updateWishlist,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  const [wishlistLength, setWishlistLength] = useState(0);
  const [products] = useState(jsonProducts);

  const handleFocus = () => setIsFocused(true);

  // Filter products based on the search query
  const filteredProducts =
    searchQuery.trim() === ""
      ? [] // If the query is empty, return an empty array
      : products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

  useEffect(() => {
    // retrive cart items
    const cart = localStorage.getItem("cart");
    const parsedCart = cart ? JSON.parse(cart) : [];

    setCartLength(parsedCart.length);
  }, [updateCart]);

  useEffect(() => {
    // retrive wishlist items
    const wishlist = localStorage.getItem("wishlist");
    const parsedWishlist = wishlist ? JSON.parse(wishlist) : [];

    setWishlistLength(parsedWishlist.length);
  }, [updateWishlist]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRequestProduct = () => {
    setSearchQuery("");
    setIsModalOpen(true);
  };
  return (
    <>
      <div
        className={`fixed w-full top-[65px] md:top-[66px] z-40 md:px-5 py-3 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl m-auto px-5 md:px-0   w-full relative flex items-center justify-between gap-5  ">
          <div className="relative w-5/6 hidden md:block">
            <input
              type="search"
              placeholder="Search Product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full h-9 md:h-12  p-3  border border-gray-300 rounded-md  bg-none placeholder-gray-500 font-light text-sm pl-12 md:pl-20 focus:outline-none`}
            />

            <img
              src={SearchImg}
              alt=""
              loading="lazy"
              className="z-10 absolute top-3 w-4 md:top-4 left-4 md:w-5"
            />
          </div>
          <div className="relative w-5/6 block md:hidden">
            <input
              type="search"
              placeholder="Search Product"
              onFocus={handleFocus}
              // onBlur={handleBlur}
              className={`w-full h-9 md:h-12  p-3  border border-gray-300 rounded-md  bg-none placeholder-gray-500 font-light text-xs pl-12 md:pl-20 focus:outline-none`}
            />

            <img
              src={SearchImg}
              alt=""
              loading="lazy"
              className="z-10 absolute top-3 w-3 md:top-4 left-4 md:w-5"
            />
          </div>
          <Link to="/shop/cart" className="cursor-pointer relative">
            <img src={CartImg} alt="" loading="lazy" className="w-6 md:w-7" />
            <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-btn-txt">
              {cartLength}
            </span>
          </Link>
          <Link to="/shop/wishlist" className="cursor-pointer relative">
            <img
              src={WishListImg}
              alt=""
              loading="lazy"
              className="w-6 md:w-7"
            />
            <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-btn-txt">
              {wishlistLength}
            </span>
          </Link>
        </div>
        <div className="absoulte top-0 left-0 max-w-6xl m-auto px-5 w-full h-full z-50 bg-white hidden md:block">
          {/* Display Results mobile*/}
          <div className="mt-4 space-y-2">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="p-2 cursor-pointer">
                  <div className="flex gap-2 items-center">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-md"
                    />
                    <p className="capitalize text-sm text-gray-600">
                      {product.name}
                    </p>
                  </div>
                </div>
              ))
            ) : searchQuery.trim() !== "" ? (
              <div className="flex flex-col max-w-md m-auto gap-3 items-center py-5">
                <img
                  src={LargSearchImg}
                  alt=""
                  loading="lazy"
                  className="w-7 pb-5"
                />
                <p className="font-subHeading2 text-xs">Not Found</p>
                <p className="text-center text-xs font-light">
                  Sorry, the keyword you entered cannot be found. Please check
                  again or search with another keyword.
                </p>
                <button
                  className="w-1/3 block bg-secondary-dark border border-secondary-dark mt-3 py-2 rounded-md text-white text-sm  hover:bg-white hover:text-secondary-dark "
                  onClick={handleRequestProduct}
                >
                  Request a Product
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {/* mobile search display */}
      {isFocused && (
        <ShopSearch
          setIsFocused={setIsFocused}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default ShopNavbar;
