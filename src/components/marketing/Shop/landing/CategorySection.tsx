import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../../assets/svg/shop-cat-icon.svg";
import fetchedCategotries from "../../../../../data/categories.json";

const CategorySection = () => {
  const [categories, setCategories] = useState(fetchedCategotries);

  useEffect(() => {
    setCategories((prev) => prev.filter((_, index) => index < 6));
  }, []);
  return (
    <div className="flex flex-col gap-5 sm:p-5">
      <div className="flex justify-between">
        <h5 className="text-gray-600 text-sm md:text-base">Categories</h5>
        <Link
          to="categories"
          className="text-gray-500 text-sm transition ease-out duration-200 hover:text-secondary-dark"
        >
          View All
        </Link>
      </div>
      <div className="flex  justify-between gap-5 overflow-x-scroll snap-x snap-mandatory no-scrollbar ">
        {categories?.map((category) => (
          <Link
            to={`/shop/categories/${category.name}`}
            key={category.name}
            className="flex flex-col justify-center flex-shrink-0 snap-center  border border-secondary-light w-20 py-2 rounded-xl items-center gap-2"
          >
            <div className="border border-secondary-dark rounded-full p-2">
              <img src={Icon} alt="" className="w-4" loading="lazy" />
            </div>
            <span className="text-btn-txt capitalize text-gray-500">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
