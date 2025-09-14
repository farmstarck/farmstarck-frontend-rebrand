import { useState } from "react";
import jsonProducts from "../../../../../data/products.json";
import ScrollProductThumbnail from "./ScrollProductThumbnail";
import { Link } from "react-router-dom";
import { convertProductNameToSlugs } from "../../../../utils/slugifyProductName";

type MayAlsoLikeProps = {
  tag: string;
};

const MayAlsoLike: React.FC<MayAlsoLikeProps> = ({ tag }) => {
  const [products] = useState(jsonProducts);

  return (
    <div className="flex flex-col gap-5  py-3 md:py-10">
      <div className="flex justify-between items-center">
        <h5 className="capitalize text-gray-600 text-sm md:text-base">{tag}</h5>
        <Link
          to={`../products/${convertProductNameToSlugs(tag)}`}
          className="text-gray-500 text-sm transition ease-out duration-200 hover:text-secondary-dark"
        >
          View All
        </Link>
      </div>
      <div className="overflow-x-auto no-scrollbar w-full">
        <div className="flex gap-x-3 md:gap-x-16 items-stretch">
          {products?.map((product) => (
            <ScrollProductThumbnail key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MayAlsoLike;
