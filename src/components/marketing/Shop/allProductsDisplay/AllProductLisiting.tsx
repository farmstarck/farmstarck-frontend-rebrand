import { Dispatch, SetStateAction, useState } from "react";
import jsonProducts from "../../../../../data/products.json";
import ProductThumbnail from "../landing/ProductThumbnail";
import FilterIcon from "../../../../assets/svg/filter-icon.svg";

type ProductListingProps = {
  setIsFilterModalOpen?: Dispatch<SetStateAction<boolean>>;
};
const AllProductListing: React.FC<ProductListingProps> = ({
  setIsFilterModalOpen,
}) => {
  const [products] = useState(jsonProducts);

  const handleOpenFilter = () => {
    if (setIsFilterModalOpen) setIsFilterModalOpen(true);
  };

  return (
    <div>
      <div className="mt-36 relative w-full flex flex-col gap-8 max-w-6xl m-auto px-5 py-8 md:px-0 md:py-20">
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

export default AllProductListing;
