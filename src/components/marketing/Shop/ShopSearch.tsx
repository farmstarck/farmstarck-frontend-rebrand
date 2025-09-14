import { useState, useRef, useEffect } from "react";
import jsonProducts from "../../../../data/products.json";
import CloseImg from "../../../assets/svg/close.svg";
import SearchImg from "../../../assets/svg/magnifier.svg";
import LargSearchImg from "../../../assets/svg/large-magnifier.svg";

type ShopSearchProps = {
  setIsFocused: (query: boolean) => void;
  setIsModalOpen: (query: boolean) => void;
};

const ShopSearch: React.FC<ShopSearchProps> = ({
  setIsFocused,
  setIsModalOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products] = useState(jsonProducts);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Filter products based on the search query
  const filteredProducts =
    searchQuery.trim() === ""
      ? [] // If the query is empty, return an empty array
      : products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const handleRequestProduct = () => {
    setIsFocused(false);
    setIsModalOpen(true);
  };

  useEffect(() => {
    // Focus the input when the form is rendered
    inputRef.current?.focus();
  }, []);

  return (
    <>
      {/* mobile search display */}
      <div className="absolute top-0 left-0 w-full h-screen z-50 bg-white p-5 flex flex-col gap-6 md:hidden">
        <div className="flex justify-end">
          <img
            src={CloseImg}
            alt=""
            loading="lazy"
            onClick={() => setIsFocused(false)}
            className="cursor-pointer w-4"
          />
        </div>
        <div className="relative w-full">
          <input
            type="search"
            placeholder="Search Product"
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full h-9 md:h-12  p-3  border border-secondary-dark rounded-md  bg-secondary-light placeholder-gray-500 font-light text-xs pl-12 md:pl-20 focus:outline-none`}
          />

          <img
            src={SearchImg}
            alt=""
            loading="lazy"
            className="z-10 absolute top-3 w-3 md:top-4 left-4 "
          />
        </div>
        {/* Display Results mobile*/}
        <div className="mt-4 space-y-2">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-2  border-b shadow-sm cursor-pointer"
              >
                <div className="flex gap-2 items-center">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-9 h-9 md:h-32 object-cover rounded-md"
                  />
                  <p className="capitalize text-xs text-gray-600">
                    {product.name}
                  </p>
                </div>
              </div>
            ))
          ) : searchQuery.trim() !== "" ? (
            <div className="flex flex-col gap-3 items-center">
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
                className="w-full block bg-secondary-dark border border-secondary-dark py-2 rounded-md text-white text-xs hover:bg-white hover:text-secondary-dark md:text-base"
                onClick={handleRequestProduct}
              >
                Request a Product
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ShopSearch;
