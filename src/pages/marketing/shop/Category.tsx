import { useState } from "react";
import categories from "../../../../data/categories.json";
import SearchImg from "../../../assets/svg/magnifier.svg";
import Icon from "../../../assets/svg/shop-cat-icon.svg";
import LargSearchImg from "../../../assets/svg/large-magnifier.svg";
import { Link } from "react-router-dom";

const Category = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" relative w-full flex flex-col mt-36 gap-8 max-w-6xl m-auto px-5 md:px-0 py-5">
      <div className="flex flex-col item-center justify-center w-full bg-gradient-to-b p-3 md:p-10 from-secondary-dark via-secondary-dark to-secondary-veryDark mix-blend-plus-lighter rounded-lg md:flex-row gap-3 md:justify-between  md:gap-0">
        <div className="w-full flex flex-col space-y-2 sm:space-y-8 items-center justify-center">
          <h2 className="md:text-4xl uppercase text-white">Categories</h2>
          <p className="text-xs font-light w-full text-white text-center leading-tight md:leading-relaxed sm:w-5/12 sm:text-sm">
            Get direct from farm produce in large, small quantity delivered at
            your door step
          </p>
        </div>
      </div>
      <div className="relative w-full  max-w-3xl m-auto ">
        <input
          type="search"
          placeholder="Search Category"
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
      <div>
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-2 w-full gap-y-5  md:gap-y-10 gap-x-3 md:gap-x-16 sm:grid-cols-3  lg:grid-cols-5 py-5 md:py-10 justify-items-center items-center">
            {filteredCategories.map((category) => (
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
              Sorry, the keyword you entered cannot be found. Please check again
              or search with another keyword.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Category;
