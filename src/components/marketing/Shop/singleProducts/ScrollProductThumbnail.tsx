import { useNavigate } from "react-router-dom";
import { ProductProps } from "../../../../pages/marketing/shop";
import jsonProducts from "../../../../../data/products.json";
import Ratings from "../../../common/Ratings";
import AddToCartImg from "../../../../assets/svg/add-cart.svg";
import AddToWishlistImg from "../../../../assets/svg/add-wishlist.svg";
import { convertProductNameToSlugs } from "../../../../utils/slugifyProductName";
import { useShopContext } from "../../../../context/ShopContext";
import { useEffect, useState } from "react";
import ButtonSpinner from "../../../loaders/ButtonSpinner";

type ProductThumbnailProps = {
  id: string;
  name: string;
  category: string;
  pricePerUnit: number;
  discountPerUnit: number;
  type: string;
  rating: number;
  stockQuantity: number;
  imageUrl: string;
};

const ScrollProductThumbnail: React.FC<ProductThumbnailProps> = ({
  id,
  name,
  category,
  pricePerUnit,
  discountPerUnit,
  type,
  rating,
  stockQuantity,
  imageUrl,
}) => {
  const navigate = useNavigate();
  const {
    cartItems,
    handleAddToCart,
    handleDecrementUnit,
    handleIncrementUnit,
    handleToggleWishlist,
  } = useShopContext();
  const [product, setProduct] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch single product and check if item is in cart
  useEffect(() => {
    const tempProduct = jsonProducts.find((p: ProductProps) => p.id === id);

    // retrive cart items
    const cart = localStorage.getItem("cart");
    const parsedCart = cart ? JSON.parse(cart) : [];

    const filteredProduct = parsedCart.find(
      (p: any) => p.id === tempProduct?.id
    );

    if (filteredProduct) {
      setProduct(filteredProduct);
    } else {
      setProduct(tempProduct);
    }

    // setCartItems(parsedCart);
  }, [id, cartItems]);

  const navigateToRoute = () => {
    const productSlug = convertProductNameToSlugs(name);
    navigate(`/shop/product/${productSlug}/${id}`);
  };

  const handleLocalAddToCart = async (id: string) => {
    try {
      setIsLoading(true);
      await handleAddToCart(id);
    } catch (error) {
      console.log("ERRRORRRR: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="relative w-[180px] overflow-hidden flex flex-col gap-2 md:gap-5 p-3  rounded-lg bg-secondary-light md:p-6 md:w-[300px]">
        <div
          onClick={navigateToRoute}
          className="flex flex-col h-60 gap-2 cursor-pointer items-stretch md:flex-row md:h-32"
        >
          <div className="w-full h-32 overflow-hidden  md:w-1/2">
            <img
              src={imageUrl}
              alt={name}
              className="object-cover w-full h-full rounded-md overflow-hidden"
            />
          </div>
          <div className=" w-full flex flex-col md:w-1/2">
            <div className=" flex gap-2 items-baseline justify-between md:justify-start">
              <p className="uppercase text-btn-txt text-gray-400">{category}</p>
              <span
                className={`${
                  type === "bulk" ? "bg-secondary-dark" : "bg-gray-500"
                } uppercase text-white text-[0.4rem] rounded-[2px] py-[0.1rem] px-2 leading-none`}
              >
                {type}
              </span>
            </div>
            <div>
              <h3 className="text-xs md:text-sm font-subHeading2 uppercase text-gray-800 line-clamp-2">
                {name}
              </h3>
              <Ratings initialRating={rating} readonly={true} />
            </div>
            <div className="border-t border-gray-300 py-1 flex flex-col ">
              <div className="flex gap-2 items-center">
                <p className=" text-xs md:text-sm font-subHeading2  md:font-extrabold">
                  N
                  {discountPerUnit > 0
                    ? discountPerUnit.toLocaleString()
                    : pricePerUnit.toLocaleString()}
                </p>
                <p className="text-btn-txt relative text-gray-400 md:text-black">
                  {discountPerUnit > 0 && `N${pricePerUnit.toLocaleString()}`}
                  <span
                    style={{
                      position: "absolute",
                      width: " 100%",
                      height: "1.5px",
                      background: "red",
                      top: "50%",
                      left: 0,
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                    }}
                  ></span>
                </p>
              </div>
              <p className="text-btn-txt text-gray-500">
                Stock: {stockQuantity} {type}(s)
              </p>
            </div>
          </div>
        </div>
        {/* details add to cart */}
        <div className="flex  items-start gap-4 mt-3 md:mt-10  md:items-center">
          {isLoading ? (
            // Show only spinner when loading
            <div className="relative px-2 py-2 h-9 flex justify-center items-center gap-2 bg-transparent text-secondary-dark capitalize font-subHeading2 text-btn-txt md:text-sm rounded-md border border-secondary-dark  w-[100%] sm:w-52 sm:py-2">
              <ButtonSpinner />
            </div>
          ) : product?.quantity === undefined || product?.quantity < 1 ? (
            // Show "Add to Cart" button when not loading and product is unavailable
            <button
              onClick={() => handleLocalAddToCart(id)}
              className="px-2 py-2 flex justify-center items-center gap-2 bg-transparent text-secondary-dark capitalize font-subHeading2 text-btn-txt md:text-sm rounded-md border border-secondary-dark w-[100%] sm:w-52 sm:py-2"
            >
              <img src={AddToCartImg} alt="" className="w-4 md:w-30" />
              Add to Cart
            </button>
          ) : (
            // Show increment/decrement buttons when product is available
            <div className="flex flex-col gap-2 py-2 w-[100%] sm:w-fit sm:py-2">
              <div className="border border-secondary-dark p-2 rounded flex gap-5 items-center justify-between w-[100%] sm:w-52 sm:py-2">
                <span
                  onClick={() => handleDecrementUnit(id)}
                  className="cursor-pointer w-5 h-5 bg-gray-500 text-white text-base rounded flex items-center justify-center"
                >
                  -
                </span>
                <span className="text-sm">{product?.quantity}</span>
                <span
                  onClick={() => handleIncrementUnit(id)}
                  className="cursor-pointer w-5 h-5 bg-secondary-dark text-white text-base rounded flex items-center justify-center"
                >
                  +
                </span>
              </div>
            </div>
          )}

          <button
            onClick={() => handleToggleWishlist(id)}
            className="px-2 py-2 bg-secondary-cart text-white uppercase font-subHeading2 text-sm rounded-md md:px-3 hidden sm:block"
          >
            <img src={AddToWishlistImg} alt="" className="w-4" />
          </button>
        </div>
        <button
          onClick={() => handleToggleWishlist(id)}
          className="absolute top-1 right-1 px-2 py-2 bg-secondary-cart text-white uppercase font-subHeading2 text-sm rounded-full  block sm:hidden"
        >
          <img src={AddToWishlistImg} alt="" className="w-4" />
        </button>
      </div>
    </div>
  );
};

export default ScrollProductThumbnail;
