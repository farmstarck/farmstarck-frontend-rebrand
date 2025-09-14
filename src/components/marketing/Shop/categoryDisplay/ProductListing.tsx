import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import jsonProducts from "../../../../../data/products.json";
import ProductThumbnail from "../landing/ProductThumbnail";
import FilterIcon from "../../../../assets/svg/filter-icon.svg";

type ProductListingProps = {
  setIsFilterModalOpen?: Dispatch<SetStateAction<boolean>>;
};
const ProductListing: React.FC<ProductListingProps> = ({
  setIsFilterModalOpen,
}) => {
  const location = useLocation();
  const [products] = useState(jsonProducts);
  const [categoryName, setCategoryName] = useState("");

  const handleOpenFilter = () => {
    if (setIsFilterModalOpen) setIsFilterModalOpen(true);
  };

  useEffect(() => {
    const categoryPath = location?.pathname?.split("/");
    setCategoryName(categoryPath[3]);
  }, [location]);
  return (
    <div>
      <div className="px-5">
        <div className=" mt-36 max-w-6xl m-auto px-5 py-8 md:px-0 md:py-20 flex flex-col item-center justify-center w-full bg-gradient-to-b p-3 md:p-10 from-secondary-dark via-secondary-dark to-secondary-veryDark mix-blend-plus-lighter rounded-lg md:flex-row gap-3 md:justify-between  md:gap-0 md:mt-44 ">
          <div className="w-full flex flex-col space-y-2 sm:space-y-8 items-center justify-center">
            <h2 className="md:text-4xl uppercase text-white">{categoryName}</h2>
            <p className="text-xs font-light w-full text-white text-center leading-tight md:leading-relaxed sm:w-5/12 sm:text-sm">
              Get direct from farm produce in large, small quantity delivered at
              your door step
            </p>
          </div>
        </div>
      </div>
      <div className=" relative w-full flex flex-col gap-8 max-w-6xl m-auto px-5 py-8 md:px-0 md:py-20">
        <div
          className="flex gap-3 cursor-pointer w-fit"
          onClick={handleOpenFilter}
        >
          <img src={FilterIcon} alt="" className="w-4" />
          <p className="font-subHeading text-gray-700 text-xs md:text-sm">
            Filter
          </p>
        </div>
        <div className="grid grid-cols-2 w-full gap-y-5  md:gap-y-10 gap-x-3 md:gap-x-16 lg:grid-cols-3 justify-center items-stretch">
          {products?.map((product) => (
            <ProductThumbnail key={product.id} {...product} />
          ))}
          {products?.map((product) => (
            <ProductThumbnail key={product.id} {...product} />
          ))}
          {products?.map((product) => (
            <ProductThumbnail key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
